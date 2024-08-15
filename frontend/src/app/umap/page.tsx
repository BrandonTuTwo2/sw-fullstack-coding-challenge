"use client";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import { useTargets } from "@/lib/target";
import { useSamples, useMetaFilter, Sample } from "@/lib/sample";
import { useUmapplotpoint } from "@/lib/umapplotpoint";
import { ChangeEvent, useEffect, useState } from "react";
import { Data } from "plotly.js";
import useSWR from "swr";
import { fetchJson } from "../../lib/fetching";


export default function Page() {
  const { samples } = useSamples(); //imports all without filtering
  const { points } = useUmapplotpoint();
  const [shouldFetch, setShouldFetch] = useState(false);
  const [chosenDataSet, setChosenDataSet] = useState(1);
  const [targetDisplay, setTargetDisplay] = useState("April");
  const [donorState, setDonorState] = useState([true, true]);
  const [donorChosen, setDonorChosen] = useState(["Donor 1", "Donor 2"]);
  const [buffersChosen, setbuffersChosen] = useState(["NaCl", "PBS"]);
  //const { sampleFiltered } = useMetaFilter(shouldFetch, donorChosen);
  //console.log("HIII");
  //console.log(samples);
  const { data } = useSWR<Sample[]>(
    shouldFetch
      ? `/api/metaFilter/?dataset_id__in=${chosenDataSet}&donor=${donorChosen.toString()}&buffer=NaCl`
      : null,
    fetchJson
  );
  //let dataArr: Data[] = [];
  let [dataArr, setDataArr] = useState(Array<Data>);
  //const donorFilter = ["Donor 1", "Donor 2"];
  //console.log(samples);
  //console.log(points);
  //console.log("HEY");
  //console.log(sampleFiltered);
  const changeDataSet = (e: ChangeEvent<HTMLInputElement>) => {
    setChosenDataSet(parseInt(e.target.value));
    setPoints(samples);
  };

  const handleInputChange = (e) => {
    const exists = donorChosen.find((filter) => filter === e.target.value);
    if (exists) {
      const updatedFilters = donorChosen.filter(
        (filter) => filter !== e.target.value
      );
      setDonorChosen(updatedFilters);
    } else {
      setDonorChosen([...donorChosen, e.target.value]);
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

  const filterClicked = () => {
    console.log("CLICKED!");
    console.log(donorChosen);
    console.log(data);
    setShouldFetch(true);
    console.log("HERE IS SHOULD FETCH");
    console.log(shouldFetch);
    if (data !== null) {
      //samples = data;
      //setPoints(data);
      //console.log("Here is sampleFiltered");
      //console.log(data);
    }
  };

  const setPoints = (info) => {
    console.log("HI BEING CALLED HERE");
    const tempDataArr: Data[] = [];
    if (info) {
      for (let i = 0; i < info?.length; i++) {
        tempDataArr.push({
          showlegend: false,
          x: [info[i].umapPlotPoint[0].x_coor],
          y: [info[i].umapPlotPoint[0].y_coor],
          text: [
            `Buffer:${info[i].metadata.buffer} Donor:${info[i].metadata.donor} Incubation Time(hr):${info[i].metadata["incubation time (hr)"]}`
          ],
          name: `Sample ${i + 1}`
        });
      }
    }
    setDataArr(tempDataArr);
  };

  //setPoints(samples);

  useEffect(() => {
    console.log("DID SOMETHING CHANGE?");
    console.log("CLICKED!");
    setShouldFetch(true);
    console.log("Here is sampleFiltered");
    console.log(data);
    if (data) {
      console.log("PLEASE?");
      const tempDataArr: Data[] = [];
      for (let i = 0; i < data?.length; i++) {
        if (data[i].dataset_id === chosenDataSet) {
          tempDataArr.push({
            showlegend: false,
            x: [data[i].umapPlotPoint[0].x_coor],
            y: [data[i].umapPlotPoint[0].y_coor],
            text: [
              `Buffer:${data[i].metadata.buffer} Donor:${data[i].metadata.donor} Incubation Time(hr):${data[i].metadata["incubation time (hr)"]}`
            ],
            name: `Sample ${i + 1}`
          });
        }
      }
      setDataArr(tempDataArr);
    }
  }, [data, shouldFetch]);

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
                checked={donorChosen.includes(filter.value)}
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
      <button
        onClick={filterClicked}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Use Filter
      </button>
    </>
  );
}
