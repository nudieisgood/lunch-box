import mongoose from "mongoose";

const FeatureSchema = new mongoose.Schema(
  {
    featureNo: String,
    date: String,
    mainPhoto: "String",
    featureTitle1: "String",
    featureTitle2: "String",
    photos: [String],
    section1Photos: [String],
    section2Photos: [String],
    section3Photos: [String],
    section4Photos: [String],
    mainContent: String,
    section1Content: String,
    section2Content: String,
    section3Content: String,
    section4Content: String,
  },
  { timestamps: true }
);

export default mongoose.model("Feature", FeatureSchema);
