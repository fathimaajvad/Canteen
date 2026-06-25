import { useState } from "react";
import { useNavigate } from "react-router-dom";

const REGISTERED_USER_KEY = "campus_bites_registered_user";

function RegisterPage() {
  const navigate = useNavigate();

  const googleUser = JSON.parse(
    localStorage.getItem("campus_bites_google_user") || "{}"
  );

  const [form, setForm] = useState({
    firstName: googleUser.name?.split(" ")[0] || "",
    lastName:
      googleUser.name?.split(" ").slice(1).join(" ") || "",
    admissionNumber: "",
    email: googleUser.email || "",
  });

  const handle = (field) => (e) =>
    setForm({
      ...form,
      [field]: e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      REGISTERED_USER_KEY,
      JSON.stringify({
        ...form,
        uid: googleUser.uid,
        photo: googleUser.photo,
      })
    );

    localStorage.setItem(
      "campus_bites_current_user",
      JSON.stringify({
        ...form,
        uid: googleUser.uid,
        photo: googleUser.photo,
      })
    );

    navigate("/home");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>
            Complete Registration
          </h2>

          <p style={styles.sub}>
            One-time profile setup for Campus Bites
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.row}>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                First Name
              </label>

              <input
                style={styles.input}
                type="text"
                value={form.firstName}
                onChange={handle("firstName")}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                Last Name
              </label>

              <input
                style={styles.input}
                type="text"
                value={form.lastName}
                onChange={handle("lastName")}
                required
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Admission Number / Faculty ID
            </label>

            <input
              style={styles.input}
              type="text"
              placeholder="23BCT289 or FAX001"
              value={form.admissionNumber}
              onChange={handle("admissionNumber")}
              required
            />

            <p style={styles.hint}>
              Students enter Admission Number.
              Faculty enter Faculty ID.
            </p>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>
              Google Account
            </label>

            <input
              style={{
                ...styles.input,
                backgroundColor: "#f3f4f6",
              }}
              type="email"
              value={form.email}
              disabled
            />
          </div>

          <button
            type="submit"
            style={styles.btn}
          >
            Complete Registration
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8fafc",
    padding: "20px",
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "40px",
    width: "100%",
    maxWidth: "450px",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.08)",
  },

  header: {
    marginBottom: "24px",
  },

  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#f97316",
  },

  sub: {
    fontSize: "14px",
    color: "#64748b",
    marginTop: "6px",
  },

  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },

  formGroup: {
    marginBottom: "16px",
  },

  label: {
    display: "block",
    marginBottom: "6px",
    fontSize: "13px",
    fontWeight: "600",
  },

  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    fontSize: "14px",
  },

  hint: {
    fontSize: "12px",
    color: "#64748b",
    marginTop: "6px",
  },

  btn: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#f97316",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "12px",
  },
};

export default RegisterPage;