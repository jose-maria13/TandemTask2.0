const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://admin:admin@tandemtask.gkh2wtd.mongodb.net/?retryWrites=true&w=majority&appName=TandemTask", {
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
