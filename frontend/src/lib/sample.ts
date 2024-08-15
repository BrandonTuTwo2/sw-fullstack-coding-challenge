import useSWR from "swr";
import { fetchJson } from "./fetching";

export type Sample = {
  id: number;
  metadata: metadata;
  dataset_id: number;
  plate_barcode: string;
  well_id: number;
  umapPlotPoint: Umapplotpoint[];
  sampleSignals: sampleSignal[];
};

type Umapplotpoint = {
  id: number;
  x_coor: number;
  y_coor: number;
  sample_id: number;
};

type metadata = {
  donor: string;
  buffer: string;
  "incubation time (hr)": number;
};

type sampleSignal = {
  id: number;
  signal: number;
  sample_id: number;
  target_id: number;
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

export function useMetaFilter(shouldFetch: boolean, donorChoice: string[]) {
  const { data, error, isLoading } = useSWR<Sample[]>(
    shouldFetch ? `/api/metaFilter?donors=${donorChoice.toString()}` : null,
    fetchJson
  );

  return {
    sampleFiltered: data,
    isLoading,
    isError: error
  };
}
