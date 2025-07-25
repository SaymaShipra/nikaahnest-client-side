import React, { useContext, useState } from "react";
// Adjust path as needed
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { toast } from "sonner";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Save } from "lucide-react";

const divisions = [
  "Dhaka",
  "Chattagram",
  "Rangpur",
  "Barisal",
  "Khulna",
  "Mymensingh",
  "Sylhet",
];
const heights = [
  "4'0\"",
  "4'1\"",
  "4'2\"",
  "4'3\"",
  "4'4\"",
  "4'5\"",
  "4'6\"",
  "4'7\"",
  "4'8\"",
  "4'9\"",
  "4'10\"",
  "4'11\"",
  "5'0\"",
  "5'1\"",
  "5'2\"",
  "5'3\"",
  "5'4\"",
  "5'5\"",
  "5'6\"",
  "5'7\"",
  "5'8\"",
  "5'9\"",
  "5'10\"",
  "5'11\"",
  "6'0\"",
  "6'1\"",
  "6'2\"",
  "6'3\"",
  "6'4\"",
  "6'5\"",
];
const weights = [
  "40kg",
  "45kg",
  "50kg",
  "55kg",
  "60kg",
  "65kg",
  "70kg",
  "75kg",
  "80kg",
  "85kg",
  "90kg",
  "95kg",
  "100kg",
  "105kg",
  "110kg",
];
const occupations = [
  "Student",
  "Software Engineer",
  "Teacher",
  "Doctor",
  "Business",
  "Government Service",
  "Private Service",
  "Freelancer",
];
const races = ["Fair", "Medium", "Dark", "Very Fair"];

const calculateAge = (birthDate) => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const EditBiodata = () => {
  const { user } = useContext(AuthContext);
  const currentUserEmail = user?.email || "";

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      biodataType: "Male",
      name: "",
      profileImageLink: "",
      fathersName: "",
      mothersName: "",
      expectedPartnerAge: "",
      mobileNumber: "",
      dateOfBirth: "",
      height: "",
      weight: "",
      occupation: "",
      race: "",
      permanentDivision: "",
      presentDivision: "",
      expectedPartnerHeight: "",
      expectedPartnerWeight: "",
      contactEmail: currentUserEmail,
      userEmail: currentUserEmail,
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);

    const dob = new Date(data.dateOfBirth);
    if (isNaN(dob.getTime())) {
      toast.error("Please enter a valid date of birth");
      setIsLoading(false);
      return;
    }
    if (dob > new Date()) {
      toast.error("Date of birth cannot be in the future");
      setIsLoading(false);
      return;
    }

    const age = calculateAge(dob);

    const newBiodata = {
      ...data,
      age,
      dateOfBirth: dob.toISOString(),
      contactEmail: currentUserEmail,
      userEmail: currentUserEmail,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    try {
      const response = await axios.post(
        "https://nikaahnest-server-side.vercel.app/biodatas",
        newBiodata
      );
      toast.success("Biodata published successfully!");
      console.log("Saved biodata response:", response.data);
    } catch (error) {
      console.error("Error publishing biodata:", error);
      toast.error("Failed to publish biodata");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <svg
          className="w-6 h-6 text-pink-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h11l5 5v9a2 2 0 01-2 2z" />
          <path d="M17 21v-5a2 2 0 00-2-2H7" />
        </svg>
        Edit Biodata
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Biodata Type */}
        <div>
          <label className="block mb-1 font-medium">Biodata Type *</label>
          <select
            {...register("biodataType", {
              required: "Biodata Type is required",
            })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              errors.biodataType ? "border-red-500" : "border-gray-300"
            }`}
            defaultValue="Male"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors.biodataType && (
            <p className="text-red-500 text-sm mt-1">
              {errors.biodataType.message}
            </p>
          )}
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Name *</label>
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Profile Image Link */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Profile Image Link</label>
          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            {...register("profileImageLink", {
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))/i,
                message: "Please enter a valid image URL",
              },
            })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              errors.profileImageLink ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.profileImageLink && (
            <p className="text-red-500 text-sm mt-1">
              {errors.profileImageLink.message}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block mb-1 font-medium">Date of Birth *</label>
          <input
            type="date"
            {...register("dateOfBirth", {
              required: "Date of Birth is required",
            })}
            max={format(new Date(), "yyyy-MM-dd")}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              errors.dateOfBirth ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        {/* Height */}
        <div>
          <label className="block mb-1 font-medium">Height *</label>
          <select
            {...register("height", { required: "Height is required" })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              errors.height ? "border-red-500" : "border-gray-300"
            }`}
            defaultValue=""
          >
            <option value="" disabled>
              Select height
            </option>
            {heights.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
          {errors.height && (
            <p className="text-red-500 text-sm mt-1">{errors.height.message}</p>
          )}
        </div>

        {/* Weight */}
        <div>
          <label className="block mb-1 font-medium">Weight *</label>
          <select
            {...register("weight", { required: "Weight is required" })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              errors.weight ? "border-red-500" : "border-gray-300"
            }`}
            defaultValue=""
          >
            <option value="" disabled>
              Select weight
            </option>
            {weights.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
          {errors.weight && (
            <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>
          )}
        </div>

        {/* Occupation */}
        <div>
          <label className="block mb-1 font-medium">Occupation *</label>
          <select
            {...register("occupation", { required: "Occupation is required" })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              errors.occupation ? "border-red-500" : "border-gray-300"
            }`}
            defaultValue=""
          >
            <option value="" disabled>
              Select occupation
            </option>
            {occupations.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {errors.occupation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.occupation.message}
            </p>
          )}
        </div>

        {/* Race */}
        <div>
          <label className="block mb-1 font-medium">Race (Skin Color) *</label>
          <select
            {...register("race", { required: "Race is required" })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              errors.race ? "border-red-500" : "border-gray-300"
            }`}
            defaultValue=""
          >
            <option value="" disabled>
              Select race
            </option>
            {races.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          {errors.race && (
            <p className="text-red-500 text-sm mt-1">{errors.race.message}</p>
          )}
        </div>

        {/* Father's Name */}
        <div>
          <label className="block mb-1 font-medium">Father's Name *</label>
          <input
            type="text"
            placeholder="Enter father's name"
            {...register("fathersName", {
              required: "Father's name is required",
              minLength: { value: 2, message: "Must be at least 2 characters" },
            })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              errors.fathersName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.fathersName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.fathersName.message}
            </p>
          )}
        </div>

        {/* Mother's Name */}
        <div>
          <label className="block mb-1 font-medium">Mother's Name *</label>
          <input
            type="text"
            placeholder="Enter mother's name"
            {...register("mothersName", {
              required: "Mother's name is required",
              minLength: { value: 2, message: "Must be at least 2 characters" },
            })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              errors.mothersName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.mothersName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.mothersName.message}
            </p>
          )}
        </div>

        {/* Permanent Division */}
        <div>
          <label className="block mb-1 font-medium">Permanent Division *</label>
          <select
            {...register("permanentDivision", {
              required: "Permanent division is required",
            })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              errors.permanentDivision ? "border-red-500" : "border-gray-300"
            }`}
            defaultValue=""
          >
            <option value="" disabled>
              Select permanent division
            </option>
            {divisions.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.permanentDivision && (
            <p className="text-red-500 text-sm mt-1">
              {errors.permanentDivision.message}
            </p>
          )}
        </div>

        {/* Present Division */}
        <div>
          <label className="block mb-1 font-medium">Present Division *</label>
          <select
            {...register("presentDivision", {
              required: "Present division is required",
            })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              errors.presentDivision ? "border-red-500" : "border-gray-300"
            }`}
            defaultValue=""
          >
            <option value="" disabled>
              Select present division
            </option>
            {divisions.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.presentDivision && (
            <p className="text-red-500 text-sm mt-1">
              {errors.presentDivision.message}
            </p>
          )}
        </div>

        {/* Expected Partner Age */}
        <div>
          <label className="block mb-1 font-medium">
            Expected Partner Age *
          </label>
          <input
            type="text"
            placeholder="e.g., 25-30"
            {...register("expectedPartnerAge", {
              required: "Expected partner age is required",
            })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              errors.expectedPartnerAge ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.expectedPartnerAge && (
            <p className="text-red-500 text-sm mt-1">
              {errors.expectedPartnerAge.message}
            </p>
          )}
        </div>

        {/* Expected Partner Height */}
        <div>
          <label className="block mb-1 font-medium">
            Expected Partner Height *
          </label>
          <select
            {...register("expectedPartnerHeight", {
              required: "Expected partner height is required",
            })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              errors.expectedPartnerHeight
                ? "border-red-500"
                : "border-gray-300"
            }`}
            defaultValue=""
          >
            <option value="" disabled>
              Select expected height
            </option>
            {heights.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
          {errors.expectedPartnerHeight && (
            <p className="text-red-500 text-sm mt-1">
              {errors.expectedPartnerHeight.message}
            </p>
          )}
        </div>

        {/* Expected Partner Weight */}
        <div>
          <label className="block mb-1 font-medium">
            Expected Partner Weight *
          </label>
          <select
            {...register("expectedPartnerWeight", {
              required: "Expected partner weight is required",
            })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              errors.expectedPartnerWeight
                ? "border-red-500"
                : "border-gray-300"
            }`}
            defaultValue=""
          >
            <option value="" disabled>
              Select expected weight
            </option>
            {weights.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
          {errors.expectedPartnerWeight && (
            <p className="text-red-500 text-sm mt-1">
              {errors.expectedPartnerWeight.message}
            </p>
          )}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block mb-1 font-medium">Mobile Number *</label>
          <input
            type="tel"
            placeholder="Enter your mobile number"
            {...register("mobileNumber", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "Enter a valid mobile number",
              },
            })}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 ${
              errors.mobileNumber ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.mobileNumber.message}
            </p>
          )}
        </div>

        {/* Contact Email (readonly) */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Contact Email</label>
          <input
            type="email"
            value={currentUserEmail}
            readOnly
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-pink-600 hover:bg-pink-700 !text-white font-semibold py-3 rounded flex items-center justify-center gap-3"
          >
            {" "}
            <Save />
            {isLoading ? "Publishing..." : "Save And  Publish Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBiodata;
