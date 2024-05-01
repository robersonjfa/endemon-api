import jwt from "jsonwebtoken";

function AuthenticationToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const JWT_SECRET = process.env.JWT_SECRET;

  if (token == null)
    return res
      .status(401)
      .json({ statusCode: 401, message: "You're unauthorized to do that." });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({
        statusCode: 403,
        message: "You are forbidden from doing that.",
      });

    req.user = user;
    next();
  });
}

export default AuthenticationToken;