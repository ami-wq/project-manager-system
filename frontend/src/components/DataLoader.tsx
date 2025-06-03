import type { AxiosError } from "axios";

type DataLoaderProps<T> = {
  data: T[] | undefined;
  isError: boolean;
  isLoading: boolean;
  error: Error | null;
  renderItem: (Item: T) => React.ReactNode;
};

function DataLoader<T>({ data, isError, isLoading, error, renderItem }: DataLoaderProps<T>) {
  
  if (isError) {
    const axiosError = error as AxiosError<{ error: string; message: string }>;
    const errorMessage = axiosError.response?.data?.message || 'Ошибка сервера';
    return <div>Ошибка: {errorMessage}</div>;
  }

  if (isLoading) {
    return (
      <div className="p-4 text-center text-gray-500">
        Загрузка...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 mt-2">
      {data?.map(renderItem)}
    </div>
  );
}

export default DataLoader;
