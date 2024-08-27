import mongoose from "mongoose";

export interface Connection {
  isDatabaseConnected?: number;
}
const connection: Connection = {};
export async function connectDatabase(): Promise<Connection | void> {
  if (connection.isDatabaseConnected) return;
  try {
    const db = await mongoose.connect(
      "mongodb://127.0.0.1:27017/NextJS-14-COMPLETE-AUTH"
    );
    console.log("db called");
    connection.isDatabaseConnected = db.connections[0].readyState;
    return connection;
  } catch (error) {
    connection.isDatabaseConnected = undefined;
    console.log("Database connection failed " + error);
    process.exit(1);
  }
}
