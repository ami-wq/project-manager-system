import { useEffect, useState } from "react";
import type { Priority, Status, Task } from "../types/task";

type TaskFormModalProps = {
  mode: 'create' | 'edit';
  task?: Task;
  boardId?: number;
  onClose: () => void;
  onSuccess?: () => void;
};

const priorities: Priority[] = ['Low', 'Medium', 'High'];
const statuses: Status[] = ['Backlog', 'InProgress', 'Done'];

const TaskFormModal = ({ mode, task, boardId, onClose, onSuccess }: TaskFormModalProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [assigneeId, setAssigneeId] = useState<number | null>(null);
  const [projectBoardId, setProjectBoardId] = useState<number | undefined>(boardId);

  useEffect(() => {
    if (mode === 'edit' && task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority);
      setStatus(task.status);
      setAssigneeId(task.assignee.id);
      setProjectBoardId(task.boardId);
    } else if (mode === 'create' && boardId) {
      setProjectBoardId(boardId);
    }
  }, [mode, task, boardId]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/80 flex justify-center items-center z-50"
    >
      <form 
        action=""
        className="bg-white rounded-xl p-6 max-w-md mx-4"
      >
        <h2 className="text-xl font-semibold mb-4">
          {mode === 'create' ? 'Создание задачи' : 'Редактирование задачи'}
        </h2>

        <label className="block mb-2">
          Название задачи
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E4261]"
          />
        </label>

        <label className="block mb-2">
          Описание задачи
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#5E4261]"
            rows={4}
          />
        </label>

        <label className="block mb-2">
          Проект
          <select
            value={projectBoardId || ''}
            onChange={(e) => setProjectBoardId(Number(e.target.value))}
            disabled={!!boardId}
            required
            className={`w-full border border-gray-300 rounded-xl px-4 py-2 ${
              boardId ? 'bg-gray-100 cursor-not-allowed' : ''
            }`}
          >
            <option value="">Выберите проект</option>
          </select>
        </label>

        <label className="block mb-2">
          Приоритет
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2"
          >
            <option value="" disabled hidden>
              Приоритет
            </option>
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-2">
          Статус
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2"
          >
            <option value="" disabled hidden>
              Статус
            </option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-4">
          Исполнитель
          <select
            value={assigneeId || ''}
            onChange={(e) => setAssigneeId(Number(e.target.value))}
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2"
          >
            <option value="">Выберите исполнителя</option>
          </select>
        </label>

        <div className="flex justify-between">
          {!boardId && (
            <button
              type="button"
              className={`text-white bg-[#5E4261] rounded-xl p-3 ${
                !projectBoardId ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => {
              }}
              disabled={!projectBoardId}
            >
              Перейти на доску
            </button>
          )}
          <button
            type="submit"
            className="p-3 bg-[#5E4261] text-white rounded-xl"
          >
            {mode === 'create' ? 'Создать' : 'Сохранить'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskFormModal;