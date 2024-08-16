import useSWR from "swr";
import { fetchJson } from "./fetching";

type Sample = {
  id: number;
  metadata: metadata;
  dataset_id: number;
  plate_barcode: string;
  well_id: number;
  umapPlotPoint: Umapplotpoint[];
  sample_signals: sample_signals[];
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

type sample_signals = {
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

//This will only run when shouldFetch is true else returns null to sampleFiltered so it esentially only runs on button clicked
export function useMetaFilter(
  shouldFetch: boolean,
  chosenDataSet: string[],
  donorChosen: string[],
  buffersChosen: string[],
  incubationChosen: string[],
  targetChosen: string[]
) {
  const { data, error, isLoading } = useSWR<Sample[]>(
    shouldFetch
      ? `/api/metaFilter/?dataset_id=${chosenDataSet}&donor=${donorChosen.toString()}&buffer=${buffersChosen}&incubation=${incubationChosen}&target=${targetChosen}`
      : null,
    fetchJson
  );

  return {
    sampleFiltered: data,
    isLoading,
    isError: error
  };
}
