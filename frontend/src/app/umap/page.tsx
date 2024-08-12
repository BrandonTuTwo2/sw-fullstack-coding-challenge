"use client";
import Plot from "react-plotly.js";
import { useTargets } from "@/lib/target";
import { useSamples } from "@/lib/sample";
import { useUmapplotpoint } from "@/lib/umapplotpoint";

export default function Page() {
  const { targets } = useTargets();
  const { samples } = useSamples();
  const { points } = useUmapplotpoint();
  console.log("we are so boned");
  console.log(targets);
  console.log(samples);
  console.log(points);
  return (
    <>
      <p>I am lowkey screwed</p>
      <p>Add your UMAP code here</p>
      <p>Dataset chosen</p>
      <form action="">
        <label>
          <input type="radio" value="ds1" />
          Dataset 1
        </label>
        <label>
          <input type="radio" value="ds2" />
          Dataset 2
        </label>
      </form>
      <p>MetaData Filters</p>
      <p>Donors</p>
      <form action="">
        <label>
          <input type="radio" value="donor1" />
          Donor 1
        </label>
        <label>
          <input type="radio" value="donor2" />
          Donor 2
        </label>
      </form>

      <p>Buffer</p>
      <form action="">
        <label>
          <input type="radio" value="nacl" />
          NaCl
        </label>
        <label>
          <input type="radio" value="pbs" />
          PBS
        </label>
      </form>
      <p>Incubation Time(h)</p>
      <form action="">
        <label>
          <input type="radio" value="1" />1
        </label>
        <label>
          <input type="radio" value="2" />2
        </label>
        <label>
          <input type="radio" value="3" />3
        </label>
        <label>
          <input type="radio" value="4" />4
        </label>
      </form>

      <p>Target Colours(?)</p>
      <form action="">
        <label>
          <input type="radio" value="April" />
          April
        </label>
        <label>
          <input type="radio" value="BAFF" />
          BAFF
        </label>
        <label>
          <input type="radio" value="CCL1" />
          CCL1
        </label>
        <label>
          <input type="radio" value="CNTF" />
          CNTF
        </label>
        <label>
          <input type="radio" value="IFN_gamma" />
          IFN gamma
        </label>
        <label>
          <input type="radio" value="Mesothelin" />
          Mesothelin
        </label>
        <label>
          <input type="radio" value="PDGF_BB" />
          PDGF-BB
        </label>
        <label>
          <input type="radio" value="TWEAK" />
          TWEAK
        </label>
        <label>
          <input type="radio" value="uPA" />
          uPA
        </label>
        <label>
          <input type="radio" value="PD_1" />
          PD-1
        </label>
      </form>
      <p>Placeholder Graph</p>
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: "scatter",
            mode: "markers",
            marker: { color: "red" }
          }
        ]}
        layout={{ width: 320, height: 240, title: "Oh god" }}
      />
    </>
  );
}
