const CreateTaskButton = ({ className = '', onClick }: { className?: string; onClick?: () => void }) => (
  <button
    className={`text-white bg-[#5E4261] rounded-xl p-3 ${className}`}
    aria-label="Add new task"
    onClick={onClick}
  >
    Создать задачу
  </button>
);

export default CreateTaskButton;