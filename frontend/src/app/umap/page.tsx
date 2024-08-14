"use client";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import { useTargets } from "@/lib/target";
import { useSamples, useMetaFilter } from "@/lib/sample";
import { useUmapplotpoint } from "@/lib/umapplotpoint";
import { ChangeEvent, useState } from "react";
import { Data } from "plotly.js";

export default function Page() {
  const { targets } = useTargets();
  const { samples } = useSamples(); //assuming the samples and points are of the same size
  const { points } = useUmapplotpoint();
  //const { sampleFiltered } = useMetaFilter();
  const [metaFilter, setMetaFilter] = useState([]);
  const [chosenDataSet, setChosenDataSet] = useState(1);
  const [targetDisplay, setTargetDisplay] = useState("April");
  const [donorState, setDonorState] = useState([true, true]);
  const [donorFilter, setDonorFilter] = useState(["Donor 1", "Donor 2"]);
  const [filterParams, setFilterParams] = useState(["Donor 1", "Donor 2"]);

  let dataArr: Data[] = [];
  //const donorFilter = ["Donor 1", "Donor 2"];
  //console.log(samples);
  //console.log(points);
  //console.log("HEY");
  //console.log(sampleFiltered);
  const changeDataSet = (e: ChangeEvent<HTMLInputElement>) => {
    setChosenDataSet(parseInt(e.target.value));
    setPoints();
  };

  const handleInputChange = (e) => {
    const exists = filterParams.find((filter) => filter === e.target.value);
    if (exists) {
      const updatedFilters = filterParams.filter(
        (filter) => filter !== e.target.value
      );
      setFilterParams(updatedFilters);
    } else {
      setFilterParams([...filterParams, e.target.value]);
    }
  };

  const filterCheckboxs = [
    {
      id: "Donor 1",
      label: "Donor 1",
      value: "Donor 1"
    },
    {
      id: "Donor 2",
      label: "Donor 2",
      value: "Donor 2"
    }
  ];

  const setPoints = () => {
    dataArr = [];
    if (samples && points) {
      for (let i = 0; i < samples?.length; i++) {
        if (
          samples[i].dataset_id === chosenDataSet &&
          filterParams.includes(samples[i].metadata.donor)
        ) {
          const index = points.findIndex(
            (point) => point.sample_id == samples[i].id
          );
          dataArr.push({
            showlegend: false,
            x: [points[index].x_coor],
            y: [points[index].y_coor],
            text: [
              `Buffer:${samples[index].metadata.buffer} Donor:${samples[index].metadata.donor} Incubation Time(hr):${samples[index].metadata["incubation time (hr)"]}`
            ],
            name: `Sample ${index + 1}`
          });
        }
      }
      //console.log(dataArr);
    }
  };

  setPoints();

  return (
    <>
      <p>UMap Viewer</p>
      <p>Dataset chosen</p>
      <form>
        <label>
          <input
            type="radio"
            name="Dataset 1"
            checked={chosenDataSet === 1}
            onChange={(e) => changeDataSet(e)}
            value="1"
          />
          Dataset 1
        </label>

        <label>
          <input
            type="radio"
            name="Dataset 2"
            checked={chosenDataSet === 2}
            onChange={(e) => changeDataSet(e)}
            value="2"
          />
          DataSet 2
        </label>
      </form>
      <Plot
        data={dataArr}
        layout={{ width: 1280, height: 960, title: targetDisplay }}
      />
      <p>MetaData Filters</p>
      <p>Donors</p>
      <ul className="list-group">
        {filterCheckboxs.map((filter) => (
          <li key={filter.id} className="list-group-item">
            <div className="form-check flex-grow-1">
              <input
                className="form-check-input"
                type="checkbox"
                value={filter.value}
                onChange={(e) => handleInputChange(e)}
                id={filter.id}
                checked={filterParams.find(
                  (item: string) => item === filter.value
                )}
              />
              <label className="form-check-label" htmlFor={filter.id}>
                {filter.label}
              </label>
            </div>
          </li>
        ))}
      </ul>
      <p>Buffer</p>
      <form>
        <label>
          <input type="checkbox" value="NaCl" /> NaCl
        </label>
        <label>
          <input type="checkbox" value="PBS" /> PBS
        </label>
      </form>
      <p>Incubation Time(h)</p>
      <form>
        <label>
          <input type="checkbox" value="1" /> 1
        </label>
        <label>
          <input type="checkbox" value="2" /> 2
        </label>
        <label>
          <input type="checkbox" value="3" /> 3
        </label>
        <label>
          <input type="checkbox" value="4" /> 4
        </label>
      </form>

      <p>Targets(?)</p>
      <form>
        <label>
          <input
            type="radio"
            name="April"
            checked={targetDisplay === "April"}
            onChange={(e) => setTargetDisplay(e.target.value)}
            value="April"
          />
          April
        </label>
        <label>
          <input
            type="radio"
            name="BAFF"
            checked={targetDisplay === "BAFF"}
            onChange={(e) => setTargetDisplay(e.target.value)}
            value="BAFF"
          />
          BAFF
        </label>
        <label>
          <input
            type="radio"
            name="CCL1"
            checked={targetDisplay === "CCL1"}
            onChange={(e) => setTargetDisplay(e.target.value)}
            value="CCL1"
          />
          CCL1
        </label>
        <label>
          <input
            type="radio"
            name="CNTF"
            checked={targetDisplay === "CNTF"}
            onChange={(e) => setTargetDisplay(e.target.value)}
            value="CNTF"
          />
          CNTF
        </label>
        <label>
          <input
            type="radio"
            name="IFN gamma"
            checked={targetDisplay === "IFN gamma"}
            onChange={(e) => setTargetDisplay(e.target.value)}
            value="IFN gamma"
          />
          IFN gamma
        </label>
        <label>
          <input
            type="radio"
            name="Mesothelin"
            checked={targetDisplay === "Mesothelin"}
            onChange={(e) => setTargetDisplay(e.target.value)}
            value="Mesothelin"
          />
          Mesothelin
        </label>
        <label>
          <input
            type="radio"
            name="PDGF-BB"
            checked={targetDisplay === "PDGF-BB"}
            onChange={(e) => setTargetDisplay(e.target.value)}
            value="PDGF-BB"
          />
          PDGF-BB
        </label>
        <label>
          <input
            type="radio"
            name="TWEAK"
            checked={targetDisplay === "TWEAK"}
            onChange={(e) => setTargetDisplay(e.target.value)}
            value="TWEAK"
          />
          TWEAK
        </label>
        <label>
          <input
            type="radio"
            name="uPA"
            checked={targetDisplay === "uPA"}
            onChange={(e) => setTargetDisplay(e.target.value)}
            value="uPA"
          />
          uPA
        </label>
        <label>
          <input
            type="radio"
            name="PD-1"
            checked={targetDisplay === "PD-1"}
            onChange={(e) => setTargetDisplay(e.target.value)}
            value="PD-1"
          />
          PD-1
        </label>
      </form>
    </>
  );
}
