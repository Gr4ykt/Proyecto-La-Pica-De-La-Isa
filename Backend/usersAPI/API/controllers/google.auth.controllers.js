import { GOOGLE_CALLBACK_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../config.js'
import { google } from 'googleapis';
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.js"

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL
);

export const googleLogin = (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['profile', 'email'],
  });
  res.redirect(url);
};

export const googleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    
    if (!code) {
      return res.status(400).send('Código de autorización no proporcionado');
    }

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data } = await oauth2.userinfo.get();

    const totalUsers = await User.countDocuments();
    const role = totalUsers === 0 ? "Administrator" : "Client";

    let user = await User.findOne({ email: data.email });

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-10);
      const passwordHash = await bcrypt.hash(randomPassword, 10);
      
      user = await User.create({
        username: data.name,
        name: data.given_name || data.name.split(' ')[0],
        lastname: data.family_name || data.name.split(' ')[1] || '',
        email: data.email,
        password: passwordHash,
        googleId: data.id,
        role
      });
    }

    const token = await createAccessToken({ id: user._id });
    
    res.cookie("token", token, { 
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.redirect('/user/api/profile');

  } catch (error) {
    console.error('Error en Google Callback:', error);
    return res.status(500).send(`Error en la autenticación: ${error.message}`);
  }
};