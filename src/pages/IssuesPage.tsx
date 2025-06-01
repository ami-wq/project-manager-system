import { useState } from "react";
import useTasks from "../api/useTasks";
import CreateTaskButton from "../component/CreateTaskButton";
import DataLoader from "../component/DataLoader";
import type { Task } from "../types/task";
import TaskFormModal from "../component/TaskFormModal";
import { toast } from "react-toastify";

const IssuesPage = () => {
  const { data, error, isError } = useTasks();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex justify-between mt-4 mb-2 mx-8">
        <input
          type="text"
          placeholder="Поиск"
          className="px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5E4261]"
        />
        <button
          type="button"
          className="p-3 bg-[#5E4261] text-white"
          onClick={() => {
          }}
        >
          Фильтры
        </button>
      </div>
      <div className="border border-gray-300 mb-8 mx-8">
        <DataLoader
          data={data}
          isError={isError}
          error={error}
          renderItem={(task) => (
            <div 
              key={task.id} 
              className="mx-2 py-5 px-2 bg-[#5E4261] text-white"
              onClick={() => handleTaskClick(task)}
            >
              <span>{task.title}</span>
            </div>
          )}
        />
        <div className="flex justify-end my-2">
          <CreateTaskButton className="mr-2" />
        </div>
      </div>

      {isModalOpen && selectedTask && (
        <TaskFormModal
          mode="edit"
          task={selectedTask}
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

export default IssuesPage;