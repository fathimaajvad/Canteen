import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth, googleProvider } from "../../firebase";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(
        auth,
        googleProvider
      );
      const idToken = await result.user.getIdToken();

      const user = result.user;

      if (
        !user.email?.endsWith(
          "@adishankara.ac.in"
        )
      ) {
        alert(
          "Only Adi Shankara college email accounts are allowed."
        );

        await signOut(auth);

        return;
      }

      const registeredUser =
        localStorage.getItem(
          "campus_bites_registered_user"
        );

      localStorage.setItem(
        "campus_bites_google_user",
        JSON.stringify({
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
        })
      );

      if (!registeredUser) {
        navigate("/register");
      } else {
        navigate("/menu");
      }
    } catch (error) {
      console.error(error);

      alert("Google Sign-In failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#fff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            color: "#f97316",
            marginBottom: "10px",
          }}
        >
          Campus Bites
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          Smart Canteen Ordering System
        </p>

        <button
          onClick={handleGoogleLogin}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "12px",
            border: "1px solid #ddd",
            background: "#fff",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "15px",
          }}
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}