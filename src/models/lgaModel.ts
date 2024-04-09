import mongoose, { Schema, Document, model } from "mongoose";

interface LgaDocument extends Document {
  state: string;
  region: string;
  localGvt: string;
}

const LgaSchema: Schema<LgaDocument> = new Schema({
  localGvt: [{ type: String, required: true }],

  state: {
    type: String,
    required: true,
  },

  region: {
    type: String,
    required: true,
  },
});
const LgaModel = mongoose.model<LgaDocument>("LGA", LgaSchema);

// async function insertLGAs(data: any[]) {
//   try {
//     const result = await LgaModel.insertMany(data);
//     console.log(`${result.length} LGAs inserted successfully.`);
//   } catch (error) {
//     console.error("Error inserting LGAs:", error);
//   }
// }

export { LgaDocument, LgaModel };
