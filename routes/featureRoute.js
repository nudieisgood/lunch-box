import { Router } from "express";
import {
  createFeature,
  editFeature,
  getAllFeatures,
  getLastFiveFeatures,
  getFeatureById,
  getRandomFeatures,
} from "../controllers/featureController.js";
//middlewares
import upload from "../middlewares/multerMiddleware.js";
import {
  authenticateUser,
  authenticateAdmin,
} from "../middlewares/authMiddleware.js";

const router = Router();
router
  .route("/")
  .post(
    upload.array("photos", 100),
    authenticateUser,
    authenticateAdmin,
    createFeature
  );

router.route("/").get(getAllFeatures);
router.route("/last-five-features").get(getLastFiveFeatures);
router.route("/random-features").get(getRandomFeatures);

router
  .route("/:id")
  .get(getFeatureById)
  .patch(
    upload.array("photos", 100),
    authenticateUser,
    authenticateAdmin,
    editFeature
  );

export default router;
