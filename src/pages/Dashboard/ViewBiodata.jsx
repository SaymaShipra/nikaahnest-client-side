import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import { toast } from "sonner";
import { AuthContext } from "../../context/AuthContext";
import { Crown, Eye } from "lucide-react";

const ViewBiodata = () => {
  const initialBiodata = useLoaderData(); // initial data from loader
  const { user } = useContext(AuthContext);
  const [biodata, setBiodata] = useState(initialBiodata);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/viewBiodata?userEmail=${user.email}`)
        .then((res) => res.json())
        .then((data) => setBiodata(data))
        .catch((error) => {
          console.error("Error fetching biodata:", error);
          setBiodata(null);
        });
    }
  }, [user]);

  const handleMakePremium = () => {
    fetch(`http://localhost:3000/requestPremium`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ biodataId: biodata._id }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to request premium");
        return res.json();
      })
      .then(() => {
        toast.success("Premium request submitted! Waiting for admin approval.");
        setShowPremiumModal(false);

        setBiodata((prev) => ({
          ...prev,
          premiumStatus: "Pending",
        }));
      })
      .catch(() => {
        toast.error("Failed to submit premium request. Please try again.");
      });
  };

  if (!biodata)
    return <p className="text-center py-10 text-gray-500">No biodata found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      {/* Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden ">
        {/* Card Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
          <h2 className="flex gap-3 items-center text-xl font-semibold text-gray-900">
            <Eye />
            View Biodata
          </h2>

          <div className="flex items-center space-x-3">
            <span
              className={`inline-flex items-center  px-2.5 py-0.5 rounded-full text-xs font-medium
              ${
                biodata.isPremium
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {biodata.isPremium ? (
                <>
                  <svg
                    className="w-3 h-3 mr-1 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-3.09 1.63 0.59-3.44-2.5-2.44 3.46-0.5L10 7l1.54 3.25 3.46 0.5-2.5 2.44 0.59 3.44z" />
                  </svg>
                  Premium
                </>
              ) : (
                "Standard"
              )}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded border border-gray-300 text-xs font-medium text-gray-700">
              ID: {biodata.biodataId || biodata._id}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Profile Image */}
          <div className="lg:col-span-1">
            <img
              src={biodata.profileImageLink || "/api/placeholder/300/400"}
              alt={biodata.name || "Profile"}
              className="w-full h-auto mb-4 rounded-lg shadow"
            />
            {/* <-- FIXED condition here --> */}
            {!biodata.isPremium &&
              (!biodata.premiumStatus ||
                biodata.premiumStatus === "Not Applied") && (
                <>
                  <button
                    onClick={() => setShowPremiumModal(true)}
                    className="mt-4 w-full bg-gradient-to-r !from-amber-600 !to-yellow-700 hover:!from-amber-700 hover:!to-yellow-800 !text-white font-semibold py-2 rounded-lg flex items-center justify-center gap-3"
                  >
                    <Crown />
                    Make Biodata Premium
                  </button>

                  {showPremiumModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                      <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4 shadow-lg">
                        <h3 className="text-lg font-semibold">
                          Make Your Biodata Premium
                        </h3>
                        <p>
                          Are you sure you want to make your biodata premium?
                          This will send your biodata to admin for approval.
                        </p>

                        <div className="bg-yellow-50 p-4 rounded text-yellow-700 text-sm space-y-1">
                          <p>
                            <strong>Premium Benefits:</strong>
                          </p>
                          <ul className="list-disc list-inside">
                            <li>Higher visibility in search results</li>
                            <li>Featured profile badge</li>
                            <li>Priority customer support</li>
                            <li>Access to premium features</li>
                          </ul>
                        </div>

                        <div className="flex space-x-3">
                          <button
                            onClick={handleMakePremium}
                            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded flex items-center justify-center"
                          >
                            Yes, Make Premium
                          </button>
                          <button
                            onClick={() => setShowPremiumModal(false)}
                            className="flex-1 border border-gray-300 rounded py-2 font-semibold"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

            {biodata.premiumStatus === "Pending" && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-center text-sm">
                Premium request is pending admin approval
              </div>
            )}
          </div>

          {/* Biodata Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <section>
              <h3 className="text-lg font-semibold mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <Info label="Biodata Type" value={biodata.biodataType} />
                <Info label="Name" value={biodata.name} />
                <Info
                  label="Date of Birth"
                  value={formatDate(biodata.dateOfBirth)}
                />
                <Info label="Age" value={`${biodata.age} years`} />
                <Info label="Height" value={biodata.height} />
                <Info label="Weight" value={biodata.weight} />
                <Info label="Occupation" value={biodata.occupation} />
                <Info label="Race" value={biodata.race} />
              </div>
            </section>

            {/* Family Information */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Family Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <Info label="Father's Name" value={biodata.fathersName} />
                <Info label="Mother's Name" value={biodata.mothersName} />
              </div>
            </section>

            {/* Location Information */}
            <section>
              <h3 className="text-lg font-semibold mb-4">
                Location Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <Info
                  label="Permanent Division"
                  value={biodata.permanentDivision}
                />
                <Info
                  label="Present Division"
                  value={biodata.presentDivision}
                />
              </div>
            </section>

            {/* Partner Expectations */}
            <section>
              <h3 className="text-lg font-semibold mb-4">
                Partner Expectations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <Info
                  label="Expected Partner Age"
                  value={biodata.expectedPartnerAge}
                />
                <Info
                  label="Expected Partner Height"
                  value={biodata.expectedPartnerHeight}
                />
                <Info
                  label="Expected Partner Weight"
                  value={biodata.expectedPartnerWeight}
                />
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h3 className="text-lg font-semibold mb-4">
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <Info label="Contact Email" value={biodata.contactEmail} />
                <Info label="Mobile Number" value={biodata.mobileNumber} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm font-medium text-gray-600">{label}</p>
    <p className="text-gray-900">{value || "-"}</p>
  </div>
);

export default ViewBiodata;
