import { useLocation, useParams } from "react-router-dom";
import useBoard from "../api/useBoard";
import type { AxiosError } from "axios";
import { statusLabels, type Status, type Task } from "../types/task";
import { useState } from "react";
import TaskFormModal from "../component/TaskFormModal";
import { toast } from "react-toastify";

const BoardPage = () => {
  const { id } = useParams();
  const boardId = Number(id);
  const location = useLocation();
  const boardName = location.state?.boardName ?? 'Доска';

  const { data, isError, error } = useBoard(boardId);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  if (isError) {
      const axiosError = error as AxiosError<{ error: string; message: string }>;
      const errorMessage = axiosError.response?.data?.message || 'Ошибка сервера';
      return <div>Ошибка: {errorMessage}</div>;
  }

  const tasksWithBoardInfo = data?.map(task => ({
    ...task,
    boardId: boardId,
  })) ?? [];

  const statuses: Status[] = ['ToDo', 'InProgress', 'Done'];
  const tasksByStatus = statuses.reduce<Record<Status, Task[]>>((acc, status) => {
    if (status === 'ToDo') {
      acc[status] = tasksWithBoardInfo.filter((task) => task.status === 'ToDo' || task.status === 'Backlog');
    } else if (status !== 'Backlog') {
      acc[status] = tasksWithBoardInfo.filter((task) => task.status === status);
    }
    return acc;
  }, {} as Record<Status, Task[]>);

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">{boardName}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 border border-gray-400 divide-x divide-gray-400 overflow-hidden">
          {statuses.map((status) => (
            <div key={status}>
              <h2 className="font-semibold p-2 border-b border-gray-400 ">{statusLabels[status]}</h2>
              <div className="flex flex-col space-y-2 m-2">
                {tasksByStatus[status].length === 0 ? (
                  <p className="text-[#A079A4]">Нет задач</p>
                ) : (
                  tasksByStatus[status].map((task) => (
                    <div 
                      key={task.id} 
                      className="flex items-center p-2 text-white bg-[#5E4261] rounded-xl shadow min-h-16"
                      onClick={() => handleTaskClick(task)}
                    >
                      <div className="truncate overflow-hidden whitespace-nowrap max-w-full">
                        {task.title}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {isModalOpen && selectedTask && (
        <TaskFormModal
          mode="edit"
          task={selectedTask}
          isBoardPredetermined={true}
          onClose={() => setIsModalOpen(false)}
          onSuccess={(msg) => {
            setIsModalOpen(false);
            setSelectedTask(null);
            toast.success(msg);
          }}
          onError={(msg) => toast.error(msg)}
        />
      )}
    </>
  );
};

export default BoardPage;