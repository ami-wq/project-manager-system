import type { AxiosError } from "axios";
import useBoards from "../api/useBoards";

const BoardsPage = () => {
  const { data, error, isError } = useBoards();

  if (isError) {
    const axiosError = error as AxiosError<{ error: string; message: string }>;
    const errorMessage = axiosError.response?.data?.message || 'Ошибка сервера';
    return <div>Ошибка: {errorMessage}</div>;
  } 

  return (
    <div>
      <div className="flex flex-col gap-2 mt-2">
        {data?.map((board) => (
          <div 
            key={board.id}
            className="mx-2 py-[20px] px-[8px] max-w-400 bg-[#5E4261] rounded-xl text-white"
          >
            <div className="flex justify-between items-center sm:flex-row flex-col sm:gap-0 gap-2">
              <span>{board.name}</span>
              <button className="bg-[#A079A4] p-2 rounded-xl sm:ml-2 sm:w-[148px] w-full">
                Перейти к доске
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardsPage;