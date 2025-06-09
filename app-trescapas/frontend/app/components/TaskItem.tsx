interface Task {
  id: string;
  title: string;
  assignee: string;
  dueDate: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, onToggleComplete, onEdit, onDelete }: TaskItemProps) {
  return (
    <div className={`p-4 mb-4 bg-white rounded-lg shadow ${task.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-center justify-between">
        <div className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-sm text-gray-600">
            Responsable: {task.assignee || 'Sin asignar'}
          </p>
          <p className="text-sm text-gray-600">
            Fecha límite: {task.dueDate || 'No definida'}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onToggleComplete(task.id)}
            className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200"
          >
            {task.completed ? 'Desmarcar' : 'Completar'}
          </button>
          <button
            onClick={() => onEdit(task.id)}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
