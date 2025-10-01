const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://tandemtask-admin:TandemTask2025!@cluster0.eeoivuk.mongodb.net/tandemtask?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error al conectar:", error.message);
  }
};

// Connect to database
connectDB();

// Task Schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  assignee: { type: String, required: true },
  dueDate: { type: String, required: true },
  completed: { type: Boolean, default: false }
}, {
  timestamps: true
});

const Task = mongoose.model('Task', taskSchema);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

// API Info endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'TandemTask API',
    version: '1.0.0',
    endpoints: {
      tasks: '/api/tareas',
      health: '/health'
    }
  });
});

// Get all tasks
app.get('/api/tareas', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
});

// Create new task
app.post('/api/tareas', async (req, res) => {
  try {
    const { title, assignee, dueDate } = req.body;
    
    if (!title || !assignee || !dueDate) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    const task = new Task({
      title,
      assignee,
      dueDate,
      completed: false
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Error al crear tarea' });
  }
});

// Update task
app.put('/api/tareas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, assignee, dueDate, completed } = req.body;

    const task = await Task.findByIdAndUpdate(
      id,
      { title, assignee, dueDate, completed },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json(task);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ error: 'Error al actualizar tarea' });
  }
});

// Delete task
app.delete('/api/tareas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json({ message: 'Tarea eliminada exitosamente' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ error: 'Error al eliminar tarea' });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint no encontrado',
    path: req.path,
    method: req.method
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

module.exports = app;