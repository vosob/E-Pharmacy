import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const getCustomers = async (req, res, next) => {
  try {
    const customers = await prisma.customers.findMany();
    res.status(200).json(customers);
  } catch (error) {
    next(error);
  }
};

const createCustomer = async (req, res, next) => {
  try {
    const { name, email, address, phone } = req.body;
    const newCustomer = await prisma.customers.create({
      data: {
        name,
        email,
        address,
        phone,
      },
    });
    res.status(201).json({
      message: "Customer created successfully",
      customer: newCustomer,
    });
  } catch (error) {
    next(error);
  }
};

export default { getCustomers, createCustomer };
