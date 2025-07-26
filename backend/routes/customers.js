import express from "express";
import CustomersController from "../controllers/customers.js";

const router = express.Router();

router.get("/", CustomersController.getCustomers);

router.post("/", CustomersController.createCustomer);

// router.put("/:id", CustomersController.updateSupplier);

export default router;
