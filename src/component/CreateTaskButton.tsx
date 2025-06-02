import { useState } from "react";
import TaskFormModal from "./TaskFormModal";
import { toast } from 'react-toastify';
import { useMatch } from "react-router-dom";

const CreateTaskButton = ({ className = '' }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const match = useMatch('/board/:id')
  const boardId = match ? Number(match.params.id) : undefined;

  return (
    <>
      <button
        className={`text-white bg-[#5E4261] rounded-xl p-3 ${className}`}
        aria-label="Add new task"
        onClick={() => setIsOpen(true)}
      >
        Создать задачу
      </button>
      
      {isOpen && (
        <TaskFormModal
          mode="create"
          boardId={boardId}
          isBoardPredetermined={!!boardId}
          onSuccess={(msg) => toast.success(msg)}
          onError={(msg) => toast.error(msg)}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default CreateTaskButton;