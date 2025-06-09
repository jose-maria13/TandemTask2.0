import { useState, useEffect } from 'react';

interface TaskFormProps {
  onSubmit: (task: {
    title: string;
    assignee: string;
    dueDate: string;
  }) => void;
  initialTask?: {
    title: string;
    assignee: string;
    dueDate: string;
  };
}

export default function TaskForm({ onSubmit, initialTask }: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [assignee, setAssignee] = useState(initialTask?.assignee || '');
  const [dueDate, setDueDate] = useState(initialTask?.dueDate || '');

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setAssignee(initialTask.assignee);
      setDueDate(initialTask.dueDate);
    }
  }, [initialTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, assignee, dueDate });
    if (!initialTask) {
      setTitle('');
      setAssignee('');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow">
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Título
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="assignee" className="block text-sm font-medium text-gray-700 mb-1">
          Responsable
        </label>
        <input
          type="text"
          id="assignee"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
          Fecha límite
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {initialTask ? 'Actualizar' : 'Guardar'}
      </button>
    </form>
  );
} 