import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, NavLink } from "react-router";
import {
  ArrowLeft,
  Heart,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Briefcase,
} from "lucide-react";
import { Button, Card, Badge, Spin, message } from "antd";
import { AuthContext } from "../../context/AuthContext";

const { Meta } = Card;

const ProfileDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [biodata, setBiodata] = useState(null);
  const [similarProfiles, setSimilarProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    async function fetchBiodata() {
      try {
        setLoading(true);
        const res = await fetch(
          `https://nikaahnest-server-side.vercel.app/biodatas/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch biodata");
        const data = await res.json();
        setBiodata(data);
        setIsPremium(data.isPremium || false);

        const type = data.type || "";
        const similarRes = await fetch(
          `https://nikaahnest-server-side.vercel.app/biodatas?type=${type}&excludeId=${id}&limit=3`
        );
        if (!similarRes.ok) throw new Error("Failed to fetch similar profiles");
        const similarData = await similarRes.json();
        setSimilarProfiles(similarData);
      } catch (error) {
        message.error("Error loading biodata or similar profiles.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchBiodata();
  }, [id]);

  useEffect(() => {
    async function checkFavoriteStatus() {
      if (!user?.email) {
        setIsFavorite(false);
        return;
      }

      try {
        const res = await fetch(
          `https://nikaahnest-server-side.vercel.app/favourites?userEmail=${encodeURIComponent(
            user.email
          )}`
        );
        if (!res.ok) throw new Error("Failed to fetch favorites");
        const favorites = await res.json();

        const fav = favorites.find((fav) => fav._id === id);
        setIsFavorite(!!fav);
      } catch (err) {
        console.error("Error checking favorite status", err);
        setIsFavorite(false);
      }
    }

    checkFavoriteStatus();
  }, [id, user?.email]);

  const handleAddToFavorites = async () => {
    if (!user?.email) {
      message.warning("Please log in to add favorites.");
      return;
    }
    try {
      if (!isFavorite) {
        const res = await fetch(
          "https://nikaahnest-server-side.vercel.app/favourites",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userEmail: user.email,
              biodataId: biodata._id,
            }),
          }
        );

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to add to favourites");
        }

        message.success("Added to Favorites");
        setIsFavorite(true);
      } else {
        const res = await fetch(
          "https://nikaahnest-server-side.vercel.app/favourites",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userEmail: user.email,
              biodataId: biodata._id,
            }),
          }
        );

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to remove from favourites");
        }

        message.success("Removed from Favorites");
        setIsFavorite(false);
      }
    } catch (err) {
      console.error(err);
      message.error(err.message || "Something went wrong.");
    }
  };

  const handleRequestContact = () => {
    navigate(`/checkout/${id}`);
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spin size="large" />
      </div>
    );

  if (!biodata)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Biodata not found</h2>
        <Button
          onClick={() => navigate("/biodata")}
          icon={<ArrowLeft size={16} />}
        >
          Back to Biodatas
        </Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 max-w-7xl mx-auto">
      <Button
        htmlType="button"
        onClick={() => navigate("/biodata")}
        icon={<ArrowLeft size={16} />}
        type="default"
        className="mb-4"
      >
        Back to Biodatas
      </Button>

      <div className="flex justify-between items-center pt-8">
        <h1 className="text-3xl font-bold">Biodata Details</h1>
        <div className="flex items-center gap-4 mb-6">
          <Button
            type={isFavorite ? "primary" : "default"}
            danger={isFavorite}
            icon={<Heart size={16} />}
            onClick={handleAddToFavorites}
          >
            {isFavorite ? "Remove Favorite" : "Add to Favorites"}
          </Button>

          {!isPremium && (
            <NavLink to={`/checkout/${biodata._id}`}>
              <Button
                type="primary"
                onClick={handleRequestContact}
                className="!bg-gradient-to-r !from-rose-500 !to-pink-600 !text-white !font-semibold !rounded-lg hover:!from-rose-600 hover:!to-pink-700 shadow-lg flex items-center space-x-2 !text-lg"
                icon={<Phone size={16} />}
              >
                Request Contact Info
              </Button>
            </NavLink>
          )}
        </div>
      </div>

      <div className="mb-6 mt-5 flex justify-between items-center"></div>
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        <Card
          cover={
            <img
              alt={biodata.name}
              src={biodata.image}
              style={{ height: 400, objectFit: "cover" }}
            />
          }
          style={{ flex: "1" }}
        >
          <Meta
            title={
              <div className="flex items-center space-x-2">
                <span>{biodata.name}</span>
                <Badge
                  count={biodata.type}
                  style={{
                    backgroundColor:
                      biodata.type === "Male" ? "#1890ff" : "#eb2f96",
                  }}
                />
                {isPremium && (
                  <span className="bg-rose-400 text-white text-xs font-semibold px-2 py-1 rounded-full ml-2">
                    Premium
                  </span>
                )}
              </div>
            }
            description={
              <>
                <p>
                  <MapPin size={16} /> {biodata.location || "N/A"}
                </p>
                <p>
                  <Calendar size={16} /> {biodata.age} years old
                </p>
                <p>
                  <Briefcase size={16} /> {biodata.occupation || "N/A"}
                </p>
              </>
            }
          />
        </Card>

        <div style={{ flex: 2 }}>
          <Card title="Personal Information" className="mb-6">
            <p>
              <b>Height:</b> {biodata.height || "N/A"}
            </p>
            <p>
              <b>Weight:</b> {biodata.weight || "N/A"}
            </p>
            <p>
              <b>Marital Status:</b> {biodata.maritalStatus || "N/A"}
            </p>
            <p>
              <b>Religion:</b> {biodata.religion || "N/A"}
            </p>
          </Card>

          <Card title="Education & Career" className="mb-6">
            <p>
              <b>Education:</b> {biodata.education || "N/A"}
            </p>
            <p>
              <b>Occupation:</b> {biodata.occupation || "N/A"}
            </p>
            <p>
              <b>Income:</b> {biodata.income || "N/A"}
            </p>
          </Card>

          <Card title="Family Information" className="mb-6">
            <p>
              <b>Father's Name:</b> {biodata.fatherName || "N/A"}
            </p>
            <p>
              <b>Mother's Name:</b> {biodata.motherName || "N/A"}
            </p>
            <p>
              <b>Siblings:</b> {biodata.siblings || "N/A"}
            </p>
          </Card>

          {isPremium && biodata.contactInfo && (
            <Card
              title={
                <span className="text-rose-400 font-bold">
                  Contact Information (Premium)
                </span>
              }
              className="mb-6"
            >
              <p>
                <Mail size={16} /> {biodata.contactInfo.email || "N/A"}
              </p>
              <p>
                <Phone size={16} /> {biodata.contactInfo.phone || "N/A"}
              </p>
              {biodata.contactInfo.whatsapp && (
                <p>
                  <Phone size={16} /> WhatsApp: {biodata.contactInfo.whatsapp}
                </p>
              )}
            </Card>
          )}

          <Card title="About & Preferences" className="mb-6">
            <p>
              <b>About Me:</b> {biodata.aboutMe || "N/A"}
            </p>
            <p>
              <b>Expected Partner:</b> {biodata.expectedPartner || "N/A"}
            </p>
            <p>
              <b>Hobbies:</b> {biodata.hobbies || "N/A"}
            </p>
          </Card>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Similar Profiles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {similarProfiles.map((profile) => (
            <Card
              key={profile._id}
              hoverable
              cover={
                <img
                  alt={profile.name}
                  src={profile.image}
                  style={{ height: 240, objectFit: "cover" }}
                />
              }
              onClick={() => navigate(`/biodatas/${profile._id}`)}
              style={{ cursor: "pointer" }}
            >
              <Meta
                title={
                  <div className="flex items-center space-x-2">
                    <span>{profile.name}</span>
                    <Badge
                      count={profile.type}
                      style={{
                        backgroundColor:
                          profile.type === "Male" ? "#1890ff" : "#eb2f96",
                      }}
                    />
                  </div>
                }
                description={
                  <>
                    <p>
                      <MapPin size={14} /> {profile.location || "N/A"}
                    </p>
                    <p>
                      <Calendar size={14} /> {profile.age} years
                    </p>
                    <p>
                      <Briefcase size={14} /> {profile.occupation || "N/A"}
                    </p>
                  </>
                }
              />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
