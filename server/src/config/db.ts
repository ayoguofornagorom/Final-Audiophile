import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`❌ MongoDB Connection Error:${error as Error}`);
    process.exit(1);
  }
};

export default connectDB;

// ayoguofornagorom9_db_user
// kVQ6BbiGsBysmnyi

// mongodb+srv://ayoguofornagorom9_db_user:kVQ6BbiGsBysmnyi@cluster0.y7myhc9.mongodb.net/?appName=Cluster0
