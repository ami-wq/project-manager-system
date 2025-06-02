import { useDispatch, useSelector } from "react-redux";
import TaskFormModal from "./TaskFormModal";
import type { RootState } from "../store/store";
import { closeModal } from "../store/taskModalSlice";
import { toast } from "react-toastify";

const TaskFormModalContainer = () => {
  const dispatch = useDispatch();
  const { isOpen, mode, selectedTask, boardId, isBoardPredetermined } = useSelector((state: RootState) => state.taskModal);

  if (!isOpen) return null;

  return (
    <TaskFormModal
      mode={mode}
      task={selectedTask ?? undefined}
      boardId={boardId}
      isBoardPredetermined={isBoardPredetermined}
      onClose={() => dispatch(closeModal())}
      onSuccess={(msg) => {
        dispatch(closeModal());
        toast.success(msg);
      }}
      onError={(msg) => toast.error(msg)}
    />
  );
};

export default TaskFormModalContainer;