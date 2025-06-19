import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AppDispatch } from "../app/store";
import { updateUser } from "../features/authSlice";

const ProfilePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state) => state.auth.user);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || "");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }
      await dispatch(updateUser(formData)).unwrap();
      alert("Profile updated successfully!");
    } catch (err: any) {
      alert(err || "Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-md shadow-xl rounded-2xl p-10 border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          👤 Profile Overview
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
          <div className="relative">
            <img
              src={avatarPreview}
              alt={user?.name}
              className="h-28 w-28 rounded-full object-cover ring-4 ring-blue-500 shadow-md"
            />
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white text-sm px-2 py-1 rounded-full cursor-pointer"
            >
              📷
            </label>
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          <div className="text-center md:text-left">
            <h3 className="text-2xl font-semibold text-gray-800">
              {user?.name}
            </h3>
            <p className="text-gray-500">{user?.email}</p>
            <p className="text-gray-500">{user?.phone}</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Full Name
            </label>
            <input
              type="text"
              defaultValue={user?.name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Email
            </label>
            <input
              type="email"
              defaultValue={user?.email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Phone
            </label>
            <input
              type="tel"
              defaultValue={user?.phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Role
            </label>
            <select
              defaultValue={user?.role || "buyer"}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            >
              <option value="buyer">Home Buyer</option>
              <option value="seller">Home Seller</option>
            </select>
          </div>
        </form>

        <div className="mt-10 text-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
