import type { AxiosError } from "axios";

type DataLoaderProps<T> = {
  data: T[] | undefined;
  isError: boolean;
  error: Error | null;
  renderItem: (Item: T) => React.ReactNode;
};

function DataLoader<T>({ data, isError, error, renderItem }: DataLoaderProps<T>) {
  
  if (isError) {
    const axiosError = error as AxiosError<{ error: string; message: string }>;
    const errorMessage = axiosError.response?.data?.message || 'Ошибка сервера';
    return <div>Ошибка: {errorMessage}</div>;
  }

  return (
    <div className="flex flex-col gap-2 mt-2">
      {data?.map(renderItem)}
    </div>
  );
}

export default DataLoader;
