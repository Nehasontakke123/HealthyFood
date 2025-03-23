import mongoose from "mongoose";

const connectDB = async (DBURL, DBNAME) => {
    try {
        if (!DBURL || !DBNAME) {
            throw new Error("DBURL or DBNAME is missing in .env file!");
        }

        await mongoose.connect(DBURL, {
            dbName: DBNAME,   // Ensure the correct database is used
            useNewUrlParser: true,
            // useUnifiedTopology: true,
        });

        console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;
