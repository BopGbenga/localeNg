import mongoose, { Schema, Document, model } from "mongoose";

interface stateDocument extends Document {
  Name: string;
  Capital: String;
  Slogan: String;
  Region: string;
  Date_Created: string;
  Governor: string;
}

const stateSchema: Schema<stateDocument> = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Capital: {
    type: String,
    required: true,
  },
  Slogan: {
    type: String,
    required: true,
  },

  Region: {
    type: String,
    required: true,
  },
  Date_Created: {
    type: String,
    required: true,
  },
  Governor: {
    type: String,
    required: true,
  },
});

//Model for state object
const stateModel = mongoose.model<stateDocument>("state", stateSchema);

async function insertStates(data: any[]) {
  try {
    const result = await stateModel.insertMany(data);
    console.log(" insertion started");
    console.log(`${result.length} states inserted successfully`);
  } catch (error) {
    console.error("Error inserting States:", error);
  }
}

export { stateDocument, stateModel, insertStates };
