import useTasks from "../api/useTasks";
import CreateTaskButton from "../components/CreateTaskButton";
import DataLoader from "../components/DataLoader";
import { type Status, type Task } from "../types/task";
import { useDispatch } from "react-redux";
import { openModal } from "../store/taskModalSlice";
import { useMemo, useState } from "react";
import useBoards from "../api/useBoards";
import FiltersPanel from "../components/FiltersPanel";
import useDebounce from "../hooks/useDebounce";

const IssuesPage = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error, isError } = useTasks();
  const { data: boards, isLoading: isBoardsLoading, isError: isBoardsError, error: boardsError } = useBoards();
  const statuses: Status[] = ['Backlog', 'InProgress', 'Done'];


  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([]);
  const [selectedBoardIds, setSelectedBoardIds] = useState<number[]>([]);

  const toggleStatus = (status: Status) => {
    setSelectedStatuses(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const toggleBoard = (boardId: number) => {
    setSelectedBoardIds(prev =>
      prev.includes(boardId) ? prev.filter(id => id !== boardId) : [...prev, boardId]
    );
  };

  const handleTaskClick = (task: Task) => {
    dispatch(openModal({
      mode: 'edit',
      selectedTask: task,
    }));
  };

  const filteredTasks = useMemo(() => {
    if (!data) return [];

    const lowerSearch = debouncedSearchTerm.toLowerCase();
    const searchIsActive = debouncedSearchTerm.length >= 3;

    return data.filter(task => {
      const matchesSearch =
        !searchIsActive ||
        task.title.toLowerCase().includes(lowerSearch) ||
        task.assignee?.fullName.toLowerCase().includes(lowerSearch);

      const matchesStatus =
        selectedStatuses.length === 0 || selectedStatuses.includes(task.status);

      const matchesBoard =
        selectedBoardIds.length === 0 || selectedBoardIds.includes(task.boardId);

      return matchesSearch && matchesStatus && matchesBoard;
    });
  }, [data, searchTerm, selectedStatuses, selectedBoardIds]);


  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between mt-4 mb-2 mx-8 gap-2">
        <input
          type="text"
          placeholder="Поиск"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="button"
          className="cursor-pointer p-3 bg-primary text-white"
          onClick={() => setIsFilterOpen(true)}
        >
          Фильтры
        </button>
      </div>

      {isFilterOpen && (
        <FiltersPanel
          statuses={statuses}
          selectedStatuses={selectedStatuses}
          toggleStatus={toggleStatus}
          boards={boards}
          isLoadingBoards={isBoardsLoading}
          isErrorBoards={isBoardsError}
          boardsError={boardsError}
          selectedBoardIds={selectedBoardIds}
          toggleBoard={toggleBoard}
          onClose={() => setIsFilterOpen(false)}
        />
      )}

      <div className="border border-gray-300 mb-8 mx-8">
        <DataLoader
          data={filteredTasks}
          isLoading={isLoading}
          isError={isError}
          error={error}
          renderItem={(task) => (
            <div 
              key={task.id} 
              className="cursor-pointer mx-2 py-5 px-2 bg-primary text-white"
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