import { useMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "../store/taskModalSlice";

const CreateTaskButton = ({ className = '' }: { className?: string }) => {
  const dispatch = useDispatch();

  const match = useMatch('/board/:id')
  const boardId = match ? Number(match.params.id) : undefined;

  return (
    <button
      className={`text-white bg-[#5E4261] rounded-xl p-3 ${className}`}
      aria-label="Add new task"
      onClick={() => dispatch(openModal({
        mode: 'create',
        boardId,
        selectedTask: null,
        isBoardPredetermined: !!boardId,
      }))}
    >
      Создать задачу
    </button>
  );
};

export default CreateTaskButton;