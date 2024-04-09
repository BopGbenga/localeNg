import mongoose, { Schema, Document, Model } from "mongoose";

interface RegionDocument extends Document {
  Region: string;
  States: string[];
  Population: number;
  noOfStates: number;
}

const RegionSchema: Schema<RegionDocument> = new Schema({
  Region: { type: String, required: true },
  States: { type: [String], required: true },
  noOfStates: { type: Number, required: true },
  Population: { type: Number, required: true },
});

const RegionModel: Model<RegionDocument> = mongoose.model<RegionDocument>(
  "Region",
  RegionSchema
);

export { RegionModel, RegionDocument };
