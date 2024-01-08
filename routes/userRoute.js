import {
  getCurrentUser,
  updateCurrentUser,
} from "../controllers/userController.js";
import upload from "../middlewares/multerMiddleware.js";
import { validateUpdateUserInput } from "../middlewares/validationMiddleware.js";
import { Router } from "express";
const router = Router();

router.route("/get-current-user").get(getCurrentUser);

router
  .route("/update-user")
  .patch(upload.single("avatar"), validateUpdateUserInput, updateCurrentUser);

export default router;
