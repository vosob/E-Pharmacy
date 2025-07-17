import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (typeof authHeader === "undefined") {
    return res.status(401).send({ message: "Invalid token 1" });
  }

  const [bearer, token] = authHeader.split(" ", 2);

  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Invalid token 2" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).send({ message: "Token expired" });
      }

      return res.status(401).send({ message: "Invalid token 3" });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: decode.id },
      });

      if (!user) {
        return res.status(401).send({ message: "Invalid token 4" });
      }

      req.user = {
        id: decode.id,
        email: decode.email,
        subscription: user.subscription,
      };

      return next();
    } catch (error) {
      console.error("Database error:", error);
      return res.status(500).send({ message: "Internal server error" });
    }
  });
}

export default auth;
