import bcrypt from "bcrypt";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import jwt from "jsonwebtoken";

import { registerSchema } from "../schemas/usersSchemas.js";

const prisma = new PrismaClient();

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = registerSchema.validate(req.body);

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

// const login = async (req, res, next) => {
//   const { email, password } = req.body;
//   const normalizedEmail = email.toLowerCase();

//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         email: normalizedEmail,
//       },
//     });

//     if (user === null) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (isPasswordValid === false) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     await prisma.user.update({
//       where: {
//         id: user.id,
//       },
//       data: {
//         token,
//       },
//     });

//     res.status(200).json({ token });
//   } catch (error) {
//     next(error);
//   }
// };

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

export default { register, login };
