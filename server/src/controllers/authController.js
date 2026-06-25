const auth = require("../config/firebaseAdmin");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        message: "ID Token is required",
      });
    }

    // Verify Firebase ID Token
    const decodedToken = await auth.verifyIdToken(idToken);

    const { uid, email, name, picture } = decodedToken;

    // Allow only college email IDs
    if (!email || !email.endsWith("@adishankara.ac.in")) {
      return res.status(403).json({
        success: false,
        message: "Only Adi Shankara college email addresses are allowed.",
      });
    }

    // Check if user already exists
    let user = await User.findOne({ email });

    // Create user on first login
    if (!user) {
      user = await User.create({
        googleId: uid,
        fullName: name || "",
        email,
        profileImage: picture || "",
      });
    }

    // Generate Campus Bites JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user,
    });

  } catch (error) {
    console.error("Google Login Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  googleLogin,
};