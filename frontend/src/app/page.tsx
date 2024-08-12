"use client";

import { useDatasets } from "@/lib/dataset";
import { Card } from "@tremor/react";

export default function Home() {
  const { datasets } = useDatasets();

  return (
    <div className="flex flex-col items-center space-y-5">
      <h1 className="text-xl">Datasets</h1>
      {datasets?.map((dataset) => (
        <Card className="mx-auto" key={dataset.name}>
          <p className="text-center">{dataset.name}</p>
        </Card>
      ))}
    </div>
  );
}
