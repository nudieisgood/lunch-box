import { Router } from "express";
import {
  createItem,
  getItemById,
  editItem,
  activeItemById,
  getAllItems,
} from "../controllers/itemsController.js";
//middlewares
import upload from "../middlewares/multerMiddleware.js";
import {
  authenticateUser,
  authenticateAdmin,
} from "../middlewares/authMiddleware.js";
import {
  validateUpdateItemInput,
  validateAddItemInput,
} from "../middlewares/validationMiddleware.js";

const router = Router();
router
  .route("/")
  .post(
    upload.array("photos", 100),
    authenticateUser,
    authenticateAdmin,
    createItem
  );

router.route("/").get(getAllItems);

router
  .route("/:id")
  .get(getItemById)
  .patch(
    upload.array("photos", 100),
    authenticateUser,
    authenticateAdmin,
    editItem
  )
  .put(authenticateUser, authenticateAdmin, activeItemById);

export default router;
