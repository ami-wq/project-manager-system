import useBoards from "../api/useBoards";
import DataLoader from "../component/DataLoader";

const BoardsPage = () => {
  const { data, error, isError } = useBoards(); 

  return (
    <DataLoader
      data={data}
      isError={isError}
      error={error}
      renderItem={(board) => (
        <div
          key={board.id}
          className="mx-2 py-5 px-2 max-w-400 bg-[#5E4261] rounded-xl text-white"
        >
          <div className="flex justify-between items-center sm:flex-row flex-col sm:gap-0 gap-2">
            <span>{board.name}</span>
            <button className="bg-[#A079A4] p-2 rounded-xl sm:ml-2 sm:w-[148px] w-full">
              Перейти к доске
            </button>
          </div>
        </div>
      )}
    />
  );
};

export default BoardsPage;