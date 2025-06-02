import useTasks from "../api/useTasks";
import CreateTaskButton from "../component/CreateTaskButton";
import DataLoader from "../component/DataLoader";
import type { Task } from "../types/task";
import { useDispatch } from "react-redux";
import { openModal } from "../store/taskModalSlice";
import { useMemo, useState } from "react";

const IssuesPage = () => {
  const dispatch = useDispatch();
  const { data, error, isError } = useTasks();

  const [searchTerm, setSearchTerm] = useState('');

  const handleTaskClick = (task: Task) => {
    dispatch(openModal({
      mode: 'edit',
      selectedTask: task,
    }));
  };

  const filteredTasks = useMemo(() => {
    if (!data) return [];

    const lowerSearch = searchTerm.toLowerCase();

    return data.filter(task => {
      const titleMatch = task.title.toLowerCase().includes(lowerSearch);
      const assigneeMatch = task.assignee?.fullName.toLowerCase().includes(lowerSearch);
      return titleMatch || assigneeMatch;
    });
  }, [data, searchTerm]);


  return (
    <>
      <div className="flex justify-between mt-4 mb-2 mx-8">
        <input
          type="text"
          placeholder="Поиск"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
          data={filteredTasks}
          isError={isError}
          error={error}
          renderItem={(task) => (
            <div 
              key={task.id} 
              className="mx-2 py-5 px-2 bg-[#5E4261] text-white"
              onClick={() => handleTaskClick(task)}
            >
              <span>{task.title}</span>
              <div className="text-sm text-gray-300">Исполнитель: {task.assignee.fullName}</div>
            </div>
          )}
        />
        <div className="flex justify-end my-2">
          <CreateTaskButton className="mr-2" />
        </div>
      </div>
    </>
  );
};

export default IssuesPage;