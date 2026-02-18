const jwt = require("jsonwebtoken");

function auth(req) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    throw new Error("Not authenticated");
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
}

module.exports = auth;
