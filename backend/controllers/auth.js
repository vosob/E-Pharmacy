import bcrypt from "bcrypt";
import pkg from "@prisma/client";
const { PrismaClient } = pkg;

import { registerSchema } from "../schemas/usersSchemas.js";

const prisma = new PrismaClient();

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { error } = registerSchema.validate(req.body);
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

export default { register };
