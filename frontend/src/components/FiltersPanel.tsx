import { statusLabels, type Status } from '../types/task';
import type { Board } from '../types/board';

type FiltersPanelProps = {
  statuses: Status[];
  selectedStatuses: Status[];
  toggleStatus: (status: Status) => void;

  boards?: Board[];
  isLoadingBoards?: boolean;
  isErrorBoards?: boolean;
  boardsError?: Error | null;

  selectedBoardIds: number[];
  toggleBoard: (boardId: number) => void;

  onClose: () => void;
};

const FiltersPanel = ({
  statuses,
  selectedStatuses,
  toggleStatus,
  boards,
  isLoadingBoards,
  isErrorBoards,
  boardsError,
  selectedBoardIds,
  toggleBoard,
  onClose,
}: FiltersPanelProps) => {
  return (
    <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-4 overflow-auto z-50">
      <h3 className="text-xl font-semibold mb-2">Фильтры</h3>

      <div className="mb-4">
        <h4 className="font-medium mb-1">Статусы</h4>
        {statuses.map(status => (
          <label key={status} className="flex items-center mb-1 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedStatuses.includes(status)}
              onChange={() => toggleStatus(status)}
              className="mr-2"
            />
            {statusLabels[status]}
          </label>
        ))}
      </div>

      <div>
        <h4 className="font-medium mb-1">Доски</h4>

        {isLoadingBoards && (
          <div className="text-gray-500">Загрузка досок...</div>
        )}

        {isErrorBoards && (
          <div>
            Ошибка загрузки досок: {boardsError?.message || 'Неизвестная ошибка'}
          </div>
        )}

        {!isLoadingBoards && !isErrorBoards && boards?.map(board => (
          <label key={board.id} className="flex items-center mb-1 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedBoardIds.includes(board.id)}
              onChange={() => toggleBoard(board.id)}
              className="mr-2"
            />
            {board.name}
          </label>
        ))}
      </div>

      <button
        className="cursor-pointer mt-4 p-3 bg-[#5E4261] text-white rounded-xl"
        onClick={onClose}
      >
        Закрыть
      </button>
    </div>
  );
};

export default FiltersPanel;
