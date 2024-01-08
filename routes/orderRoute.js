import { Router } from "express";
import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderById,
} from "../controllers/orderController.js";
import {
  authenticateUser,
  authenticateAdmin,
} from "../middlewares/authMiddleware.js";
import { validateCreateOrderInput } from "../middlewares/validationMiddleware.js";
const router = Router();

router.route("/").post(validateCreateOrderInput, createOrder);
router.route("/orders").get(authenticateUser, authenticateAdmin, getOrders);
router
  .route("/:id")
  .get(authenticateUser, authenticateAdmin, getOrderById)
  .patch(authenticateUser, authenticateAdmin, updateOrderById);

export default router;
