import pkg from "@prisma/client";
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

const getSuppliers = async (req, res, next) => {
  try {
    let page = parseInt(req.query.page) || 1;

    const limit = parseInt(req.query.limit) || 10;

    const totalCount = await prisma.suppliers.count();
    const totalPages = Math.ceil(totalCount / limit) || 1;

    if (page > totalPages) page = totalPages;

    const skip = (page - 1) * limit;

    const suppliers = await prisma.suppliers.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({
      data: suppliers,
      page,
      totalPages,
      totalItems: totalCount,
    });
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
