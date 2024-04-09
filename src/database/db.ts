import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.DATABASE_URL}`);
    console.log(
      "database connected!",
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connect;
