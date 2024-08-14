import useSWR from "swr";
import { fetchJson } from "./fetching";

type Sample = {
  id: number;
  metadata: metadata;
  dataset_id: number;
  plate_barcode: string;
  well_id: number;
};

type metadata = {
  donor: string;
  buffer: string;
  "incubation time (hr)": number;
};

export function useSamples() {
  const { data, error, isLoading } = useSWR<Sample[]>(
    "/api/sample/",
    fetchJson
  );

  return {
    samples: data,
    isLoading,
    isError: error
  };
}

export function MetaFilter(donorChoice: string) {
  const { data, error, isLoading } = useSWR<Sample[]>(
    `/api/metaFilter?donors=${donorChoice}`,
    fetchJson
  );

  return {
    sampleFiltered: data,
    isLoading,
    isError: error
  };
}
