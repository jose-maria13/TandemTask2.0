const Tarea = require("../models/Tarea");

// Obtener todas las tareas
exports.getTareas = async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tareas" });
  }
};

// Crear una tarea
exports.createTarea = async (req, res) => {
  try {
    const nuevaTarea = new Tarea(req.body);
    await nuevaTarea.save();
    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(400).json({ error: "Error al crear tarea" });
  }
};

// Actualizar una tarea
exports.updateTarea = async (req, res) => {
  try {
    const tareaActualizada = await Tarea.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!tareaActualizada) return res.status(404).json({ error: "Tarea no encontrada" });
    res.json(tareaActualizada);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar tarea" });
  }
};

// Eliminar una tarea
exports.deleteTarea = async (req, res) => {
  try {
    const { id } = req.params;
    await Tarea.findByIdAndDelete(id);
    res.status(200).json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea', error: error.message });
  }
};
