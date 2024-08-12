import useSWR from "swr";
import { fetchJson } from "./fetching";

type Dataset = {
  id: number;
  name: string;
};

export function useDatasets() {
  const { data, error, isLoading } = useSWR<Dataset[]>(
    "/api/dataset/",
    fetchJson
  );

  return {
    datasets: data,
    isLoading,
    isError: error
  };
}
