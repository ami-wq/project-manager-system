import useTasks from "../api/useTasks";
import DataLoader from "../component/DataLoader";

const IssuesPage = () => {
  const { data, error, isError } = useTasks();

  return (
    <DataLoader
      data={data}
      isError={isError}
      error={error}
      renderItem={(task) => (
        <div key={task.id} className="mx-2 py-[20px] px-[8px] bg-[#5E4261] text-white">
          <span>{task.title}</span>
        </div>
      )}
    />
  );
};

export default IssuesPage;