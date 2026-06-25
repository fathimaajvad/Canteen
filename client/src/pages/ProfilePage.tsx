import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

interface User {
  firstName: string;
  lastName: string;
  admissionNumber: string;
  email: string;
  password?: string;
}

const STORAGE_KEY = "campus_bites_registered_user";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const getRole = (id: string) => {
    return id.startsWith("F")
      ? "Faculty"
      : "Student";
  };

  const handleChange = (
    field: keyof User,
    value: string
  ) => {
    if (!user) return;

    setUser({
      ...user,
      [field]: value,
    });
  };

  const saveChanges = () => {
    if (!user) return;

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(user)
    );

    setIsEditing(false);

    alert("Profile updated successfully!");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);

      localStorage.removeItem(
        "campus_bites_google_user"
      );

      localStorage.removeItem(
        "campus_bites_current_user"
      );

      window.location.replace(
        "/campus-canteen-app/login"
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return (
      <MainLayout>
        <div className="p-6 text-center">
          No profile data found.
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto p-4 pb-24">

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-28 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500" />

          <div className="px-6 pb-6">
            <div className="flex justify-center -mt-12">
              <div className="h-24 w-24 rounded-full bg-white shadow-lg flex items-center justify-center text-3xl font-bold text-orange-600 border-4 border-white">
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </div>
            </div>

            <div className="text-center mt-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                {getRole(user.admissionNumber)}
              </p>
            </div>

            <div className="mt-6 flex justify-center">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-medium transition shadow-md"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  onClick={saveChanges}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-medium transition shadow-md"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 mt-4 p-5">
          <h2 className="text-lg font-semibold mb-5">
            Personal Information
          </h2>

          <div className="space-y-4">
            <input
              value={user.firstName}
              disabled={!isEditing}
              onChange={(e) =>
                handleChange(
                  "firstName",
                  e.target.value
                )
              }
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              value={user.lastName}
              disabled={!isEditing}
              onChange={(e) =>
                handleChange(
                  "lastName",
                  e.target.value
                )
              }
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              value={user.admissionNumber}
              disabled={!isEditing}
              onChange={(e) =>
                handleChange(
                  "admissionNumber",
                  e.target.value
                )
              }
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              value={user.email}
              disabled={!isEditing}
              onChange={(e) =>
                handleChange(
                  "email",
                  e.target.value
                )
              }
              className="w-full border rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-5">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl font-medium transition"
          >
            Logout
          </button>
        </div>

      </div>
    </MainLayout>
  );
}