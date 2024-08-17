"use client";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false }); //Have to import it this way or else I get an error
import { useMetaFilter } from "@/lib/sample";
import { useTargets } from "@/lib/target";
import { useDatasets } from "@/lib/dataset";
import { ChangeEvent, useEffect, useState } from "react";
import { Data } from "plotly.js";
import {
  Button,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionList
} from "@tremor/react";

export default function Page() {
  const [shouldFetch, setShouldFetch] = useState(true);
  const { datasets } = useDatasets();
  const [chosenDataSet, setChosenDataSet] = useState(["1"]);
  const [targetChosen, setTargetChosen] = useState(["1"]);
  const [targetDisplay, setTargetDisplay] = useState("April");
  const [donorChosen, setDonorChosen] = useState(["Donor 1", "Donor 2"]);
  const [buffersChosen, setbuffersChosen] = useState(["NaCl", "PBS"]);
  const [incubationChosen, setInucationChosen] = useState(["1", "2", "3", "4"]);
  const [dataArr, setDataArr] = useState(Array<Data>);
  const { targets } = useTargets();
  const { sampleFiltered } = useMetaFilter(
    shouldFetch,
    chosenDataSet,
    donorChosen,
    buffersChosen,
    incubationChosen,
    targetChosen
  );

  //This is for updated the meta choice arrays, if the options is already inside them then it removes it and if not then it adds it
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    metaChosen: string,
    metaArr: string[]
  ) => {
    const exists = metaArr.find((filter) => filter === e.target.value);
    if (exists) {
      const updatedFilters = metaArr.filter(
        (filter) => filter !== e.target.value
      );
      if (metaChosen === "donor") {
        setDonorChosen(updatedFilters);
      } else if (metaChosen === "buffer") {
        setbuffersChosen(updatedFilters);
      } else if (metaChosen === "incubation") {
        setInucationChosen(updatedFilters);
      }
    } else {
      if (metaChosen === "donor") {
        setDonorChosen([...metaArr, e.target.value]);
      } else if (metaChosen === "buffer") {
        setbuffersChosen([...metaArr, e.target.value]);
      } else if (metaChosen === "incubation") {
        setInucationChosen([...metaArr, e.target.value]);
      }
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

  const bufferCheckBoxes = [
    {
      id: "NaCl",
      label: "NaCl",
      value: "NaCl"
    },
    {
      id: "PBS",
      label: "PBS",
      value: "PBS"
    }
  ];

  const incubationTimeBoxes = [
    {
      id: "inc1",
      label: "1",
      value: "1"
    },
    {
      id: "inc2",
      label: "2",
      value: "2"
    },
    {
      id: "inc3",
      label: "3",
      value: "3"
    },
    {
      id: "inc4",
      label: "4",
      value: "4"
    }
  ];

  useEffect(() => {
    if (sampleFiltered) {
      console.log(sampleFiltered);
      const xCoor = [];
      const yCoor = [];
      const textData = [];
      let tempDataArr: Data[] = [];
      const colours = [];
      for (let i = 0; i < sampleFiltered.length; i++) {
        xCoor.push(sampleFiltered[i].umapPlotPoint[0].x_coor);
        yCoor.push(sampleFiltered[i].umapPlotPoint[0].y_coor);
        textData.push(
          `Dataset:${sampleFiltered[i].dataset_id} Buffer:${sampleFiltered[i].metadata.buffer} Donor:${sampleFiltered[i].metadata.donor} Incubation Time(hr):${sampleFiltered[i].metadata["incubation time (hr)"]} Signal:${sampleFiltered[i].sample_signals[0].signal} Target:${sampleFiltered[i].sample_signals[0].target_id}`
        );
        colours.push(sampleFiltered[i].sample_signals[0].signal);
      }
      const plotData = {
        mode: "markers",
        x: xCoor,
        y: yCoor,
        text: textData,
        marker: {
          size: 15,
          color: colours,
          colorscale: "Viridis",
          colorbar: {
            title: targetDisplay,
            titleside: "right"
          }
        }
      };

      tempDataArr = [];
      tempDataArr.push(plotData);

      setDataArr(tempDataArr);
      setShouldFetch(false);
    }
  }, [sampleFiltered, shouldFetch, targetDisplay]);

  return (
    <>
      <h1 className="text-center text-2xl	">Umap Viewer</h1>
      <div className="flex justify-center items-center">
        {datasets.map((filter) => (
          <div
            key={filter.id}
            className="mx-2 flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700"
          >
            <input
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              type="radio"
              value={filter.id}
              checked={chosenDataSet[0] === filter.id.toString()}
              onChange={() => setChosenDataSet([filter.id.toString()])}
            />
            <label className="w-full p-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {filter.name}
            </label>
          </div>
        ))}
      </div>
      <div className="container py-10 px-10 mx-0 min-w-full flex flex-col items-center">
        <Plot
          className="flex justify-center items-center"
          data={dataArr}
          layout={{ width: 1280, height: 960, title: targetDisplay }}
        />
        <AccordionList>
          <Accordion>
            <AccordionHeader className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong text-center">
              Donors
            </AccordionHeader>
            <AccordionBody className="text-center">
              <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {filterCheckboxs.map((filter) => (
                  <li
                    key={filter.id}
                    className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                  >
                    <div className="flex items-center ps-3">
                      <input
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        type="checkbox"
                        value={filter.value}
                        onChange={(e) =>
                          handleInputChange(e, "donor", donorChosen)
                        }
                        id={filter.id}
                        checked={donorChosen.includes(filter.value)}
                      />
                      <label
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        htmlFor={filter.id}
                      >
                        {filter.label}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong text-center">
              Buffer
            </AccordionHeader>
            <AccordionBody className="text-center">
              <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {bufferCheckBoxes.map((filter) => (
                  <li
                    key={filter.id}
                    className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                  >
                    <div className="flex items-center ps-3">
                      <input
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        type="checkbox"
                        value={filter.value}
                        onChange={(e) =>
                          handleInputChange(e, "buffer", buffersChosen)
                        }
                        id={filter.id}
                        checked={buffersChosen.includes(filter.value)}
                      />
                      <label
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        htmlFor={filter.id}
                      >
                        {filter.label}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong text-center">
              Incubation Time(h)
            </AccordionHeader>
            <AccordionBody className="text-center">
              <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {incubationTimeBoxes.map((filter) => (
                  <li
                    key={filter.id}
                    className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                  >
                    <div className="flex items-center ps-3">
                      <input
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        type="checkbox"
                        value={filter.value}
                        onChange={(e) =>
                          handleInputChange(e, "incubation", incubationChosen)
                        }
                        id={filter.id}
                        checked={incubationChosen.includes(filter.value)}
                      />
                      <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {filter.label}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionBody>
          </Accordion>
          <Accordion>
            <AccordionHeader className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong text-center">
              Targets
            </AccordionHeader>
            <AccordionBody>
              <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {targets.map((filter) => (
                  <li
                    key={filter.id}
                    className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                  >
                    <div className="flex items-center ps-3">
                      <input
                        type="radio"
                        value={filter.id}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        onChange={() => {
                          setTargetDisplay(filter.name);
                          setTargetChosen([filter.id.toString()]);
                        }}
                        id={"Target" + filter.id}
                        checked={targetDisplay === filter.name}
                      />
                      <label className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {filter.name}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionBody>
          </Accordion>
        </AccordionList>
        <Button
          className="mt-3"
          onClick={() => {
            setShouldFetch(true);
          }}
        >
          Update Filters
        </Button>
      </div>
    </>
  );
}
