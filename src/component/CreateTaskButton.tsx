import { useState } from "react";
import TaskFormModal from "./TaskFormModal";
import { toast } from 'react-toastify';

const CreateTaskButton = ({ className = '' }: { className?: string }) => {
  const [isOpen, setIsOpen] = useState(false);

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
          onSuccess={(msg) => toast.success(msg)}
          onError={(msg) => toast.error(msg)}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default CreateTaskButton;