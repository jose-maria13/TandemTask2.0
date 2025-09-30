'use client';

import { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskItem from './components/TaskItem';

interface Task {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  completed: boolean;
}

const API_BASE = 'http://localhost:3001/api/tareas'; 

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Traer tareas desde backend
  const fetchTasks = async () => {
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error('Error al obtener tareas');
      const data = await res.json();
     
      const mappedTasks = data.map((task: any) => ({
        id: task._id,
        title: task.title,
        assignee: task.assignee,
        dueDate: task.dueDate,
        completed: task.completed,
      }));
      setTasks(mappedTasks);
    } catch (error) {
      console.error(error);
      alert('No se pudieron cargar las tareas');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Crear tarea en backend
  const createTask = async (task: Omit<Task, 'id' | 'completed'>): Promise<Task> => {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error('Error al crear tarea');
    const created = await res.json();
    return {
      id: created._id,
      title: created.title,
      assignee: created.assignee,
      dueDate: created.dueDate,
      completed: created.completed,
    };
  };

  // Actualizar tarea en backend
  const updateTask = async (id: string, task: Partial<Omit<Task, 'id'>>) => {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error('Error al actualizar tarea');
    const updated = await res.json();
    return {
      id: updated._id,
      title: updated.title,
      assignee: updated.assignee,
      dueDate: updated.dueDate,
      completed: updated.completed,
    };
  };

  // Eliminar tarea en backend
  const deleteTask = async (id: string) => {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Error al eliminar tarea');
    return await res.json();
  };

  // Submit del form (crear o editar)
  const handleSubmit = async (taskData: Omit<Task, 'id' | 'completed'>) => {
    try {
      if (editingTask) {
        // actualizar tarea
        const updated = await updateTask(editingTask.id, taskData);
        setTasks(tasks.map(t => (t.id === editingTask.id ? updated : t)));
        setEditingTask(null);
      } else {
        // crear tarea
        const newTask = await createTask(taskData);
        setTasks([...tasks, newTask]);
      }
    } catch (error) {
      alert('Error al guardar la tarea');
      console.error(error);
    }
  };

  // Toggle completo / incompleto
  const handleToggleComplete = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    try {
      const updated = await updateTask(id, { completed: !task.completed });
      setTasks(tasks.map(t => (t.id === id ? updated : t)));
    } catch (error) {
      alert('Error al actualizar estado de tarea');
    }
  };

  // Editar tarea
  const handleEdit = (id: string) => {
    const taskToEdit = tasks.find(t => t.id === id);
    if (taskToEdit) setEditingTask(taskToEdit);
  };

  // Eliminar tarea
 const handleDelete = async (id: string) => {
  const confirmDelete = window.confirm('¿Estás seguro que quieres eliminar esta tarea?');
  if (!confirmDelete) return;

  try {
    const response = await fetch(`http://localhost:3001/api/tareas/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la tarea');
    }

    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
  } catch (error) {
    alert(error.message);
  }
};


  return (
    <div>
      <h1>Gestor de Tareas - Tandem Task</h1>

      <TaskForm
        onSubmit={handleSubmit}
        initialTask={
          editingTask
            ? {
                title: editingTask.title,
                assignee: editingTask.assignee,
                dueDate: editingTask.dueDate,
              }
            : undefined
        }
      />

      <div>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={handleToggleComplete}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
