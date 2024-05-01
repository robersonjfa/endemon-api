import jwt from "jsonwebtoken";
//import dotenv from "dotenv";
//import path from 'path';
//dotenv.config({path: path.resolve('.env')});

const JWT_SECRET = process.env.JWT_SECRET;

class JwtService {
  /**
   * Signs a JWT token.
   * @param {Object} payload payload data
   * @param {String} expiration optional expiresIn
   * @returns
   */
  static async sign(payload, expiration) {
    const token = await jwt.sign(payload, JWT_SECRET, {
      expiresIn: expiration,
    });

    return token;
  }

  /**
   * Verifies a token integrity by a secret key.
   * @param {string} token token
   * @returns true or false
   */
  static async verify(token) {
    return await jwt.verify(token, JWT_SECRET);
  }
}

export default JwtService;
