import "express-async-errors";
import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { StatusCodes } from "http-status-codes";

import mongoSanitize from "express-mongo-sanitize";
import cors from "cors";

import cloudinary from "cloudinary";

import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import itemsRoute from "./routes/itemRoute.js";
import orderRoute from "./routes/orderRoute.js";
import featureRoute from "./routes/featureRoute.js";

import Item from "./models/ItemModel.js";

//middleware
import { authenticateUser } from "./middlewares/authMiddleware.js";
import upload from "./middlewares/multerMiddleware.js";

//JWT
import { createJWT, verifyJWT } from "./utlits.js";

//public folder
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

const app = express();

//dev use
app.use(
  cors({
    credentials: true,
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
  })
);

app.use(mongoSanitize());
app.use(express.json());
app.use(cookieParser());

// app.use(express.static(path.resolve(__dirname, "./public/uploads")));
app.use(express.static(path.resolve(__dirname, "./client/dist")));

//cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.post("/api/upload", upload.array("photos", 100), (req, res) => {
  const data = req.files.map((file) => file.filename);
  res.status(StatusCodes.OK).json({ data });
});

app.post("/api/checkout", async (req, res) => {
  const items = await Item.find(
    { _id: req.body.map((item) => item.itemId) },
    {
      name: 1,
      photos: 1,
      price: 1,
    }
  );

  const itemsWithInfo = req.body.map((c) => {
    const itemInfo = items.filter(
      (item) => item._id.toString() === c.itemId
    )[0];
    return { ...c, itemInfo };
  });

  const token = createJWT({ checkoutInfo: itemsWithInfo });

  res.status(StatusCodes.OK).json({ token: token });
});

app.get("/api/checkout/:token", (req, res) => {
  const { token } = req.params;

  res.cookie("checkoutInfo", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 1),
    // secure: process.env.NODE_ENV === "production",
    secure: true,
    sameSite: "none",
  });

  const data = verifyJWT(token);
  res.status(StatusCodes.OK).json({ data });
});

app.use("/api/auth", authRoute);
app.use("/api/user", authenticateUser, userRoute);
app.use("/api/items", itemsRoute);
app.use("/api/order", orderRoute);
app.use("/api/feature", featureRoute);

app.get("*", (req, res) => {
  // res.sendFile(path.resolve(__dirname, "./public/uploads", "index.html"));
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

app.use((err, req, res, next) => {
  const status = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || "Something went wrong.";
  res.status(status).json({ msg });
});

const port = process.env.PORT || 5001;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
