import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const getSuppliers = async (req, res, next) => {
  try {
    const suppliers = await prisma.suppliers.findMany();
    res.status(200).json(suppliers);
  } catch (error) {
    next(error);
  }
};

const createSupplier = async (req, res, next) => {
  try {
    const { suppliersInfo, address, company, deliveryDate, amount, status } =
      req.body;

    const newSupplier = await prisma.suppliers.create({
      data: {
        suppliersInfo,
        address,
        company,
        deliveryDate: new Date(deliveryDate),
        amount,
        status,
      },
    });

    res.status(201).json({
      message: "Supplier created successfully",
      supplier: newSupplier,
    });
  } catch (error) {
    next(error);
  }
};

export default { getSuppliers, createSupplier };
