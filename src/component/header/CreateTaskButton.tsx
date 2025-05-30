const CreateTaskButton = ({ className = '', onClick }: { className?: string; onClick?: () => void }) => (
  <button
    className={`text-white bg-[#5E4261] rounded-lg p-2 ${className}`}
    aria-label="Add new task"
    onClick={onClick}
  >
    Создать задачу
  </button>
);

export default CreateTaskButton;