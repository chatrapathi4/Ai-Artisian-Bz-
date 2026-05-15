import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Google token is required" });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        password: Math.random().toString(36).substring(2, 15),
      });
    }

    const jwtToken = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('jwt', jwtToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });

    return res.status(200).json({
      message: "Google login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (error) {
    console.error("Google login error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
