const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://tandemtask-admin:TandemTask2025!@cluster0.eeoivuk.mongodb.net/tandemtask?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error al conectar:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
