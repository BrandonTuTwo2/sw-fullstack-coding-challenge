import useSWR from "swr";
import { fetchJson } from "./fetching";

type Umapplotpoint = {
  id: number;
  x_coor: number;
  y_coor: number;
  sample_id: number;
};

export function useUmapplotpoint() {
  const { data, error, isLoading } = useSWR<Umapplotpoint[]>(
    "/api/umapplotpoint/",
    fetchJson
  );

  return {
    points: data,
    isLoading,
    isError: error
  };
}
