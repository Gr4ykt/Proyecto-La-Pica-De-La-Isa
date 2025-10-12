import { EXPIRE_TIME, TOKEN_SECRET } from "../config.js"
import jwt from 'jsonwebtoken'

export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN_SECRET,
      { expiresIn: EXPIRE_TIME },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    );
  });
}