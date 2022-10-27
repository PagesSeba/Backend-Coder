import mongoose from "mongoose";

export const connect = async () => {
  try {
    // await mongoose.connect("mongodb://localhost:27017/challenge18");
    await mongoose.connect(
      "mongodb+srv://Seba:Seba123@cluster0.coymqb5.mongodb.net/?retryWrites=true&w=majority"
    );

    console.log("Database connected!");
  } catch (error) {
    console.log(error);
  }
};

export const disconnect = async () => {
  try {
    await mongoose.connection.close();

    console.log("Database disconnected!");
  } catch (error) {
    console.log(error);
  }
};
