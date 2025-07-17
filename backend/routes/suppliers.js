import express from "express";
import SuppliersController from "../controllers/suppliers.js";

const router = express.Router();

router.get("/", SuppliersController.getSuppliers);

router.post("/", SuppliersController.createSupplier);

export default router;
