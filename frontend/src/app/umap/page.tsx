"use client";
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false });
import { useMetaFilter } from "@/lib/sample";
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
  const [chosenDataSet, setChosenDataSet] = useState(["1"]);
  const [targetChosen, setTargetChosen] = useState(["1"]);
  const [targetDisplay, setTargetDisplay] = useState("April");
  const [donorChosen, setDonorChosen] = useState(["Donor 1", "Donor 2"]);
  const [buffersChosen, setbuffersChosen] = useState(["NaCl", "PBS"]);
  const [incubationChosen, setInucationChosen] = useState(["1", "2", "3", "4"]);
  const [dataArr, setDataArr] = useState(Array<Data>);

  const { sampleFiltered } = useMetaFilter(
    shouldFetch,
    chosenDataSet,
    donorChosen,
    buffersChosen,
    incubationChosen,
    targetChosen
  );

  const changeDataSet = (e: ChangeEvent<HTMLInputElement>) => {
    setChosenDataSet([e.target.value]);
  };

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

  const targetRadio = [
    {
      id: "1",
      label: "April",
      value: "1"
    },
    {
      id: "2",
      label: "BAFF",
      value: "2"
    },
    {
      id: "3",
      label: "CCL1",
      value: "3"
    },
    {
      id: "4",
      label: "CNTF",
      value: "4"
    },
    {
      id: "5",
      label: "IFN gamma",
      value: "5"
    },
    {
      id: "6",
      label: "Mesothelin",
      value: "6"
    },
    {
      id: "7",
      label: "PDFG-BB",
      value: "7"
    },
    {
      id: "8",
      label: "TWEAK",
      value: "8"
    },
    {
      id: "9",
      label: "uPA",
      value: "9"
    },
    {
      id: "10",
      label: "PD-1",
      value: "10"
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
          `Dataset:${sampleFiltered[i].dataset_id} Buffer:${sampleFiltered[i].metadata.buffer} Donor:${sampleFiltered[i].metadata.donor} Incubation Time(hr):${sampleFiltered[i].metadata["incubation time (hr)"]} Signal:${sampleFiltered[i].sample_signals[0].signal}`
        );
        colours.push(sampleFiltered[i].sample_signals[0].signal);
      }
      const plotData = {
        mode: "markers",
        x: xCoor,
        y: yCoor,
        text: textData,
        marker: {
          size: 20,
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
      <h1 className="text-center text-2xl	">UMap Viewer</h1>
      <div className="flex justify-center items-center">
        <div className="mx-2 flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
          <input
            id="bordered-radio-1"
            type="radio"
            value="1"
            name="Dataset 1"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={chosenDataSet[0] === "1"}
            onChange={(e) => changeDataSet(e)}
          />
          <label
            htmlFor="bordered-radio-1"
            className="w-full p-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Dataset 1
          </label>
        </div>
        <div className="mx-2 flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700">
          <input
            id="bordered-radio-2"
            type="radio"
            value="2"
            name="Dataset 2"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={chosenDataSet[0] === "2"}
            onChange={(e) => changeDataSet(e)}
          />
          <label
            htmlFor="bordered-radio-2"
            className="w-full p-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Dataset 2
          </label>
        </div>
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
                {targetRadio.map((filter) => (
                  <li
                    key={filter.id}
                    className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                  >
                    <div className="flex items-center ps-3">
                      <input
                        type="radio"
                        value={filter.value}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        onChange={() => {
                          setTargetDisplay(filter.label);
                          setTargetChosen([filter.id]);
                        }}
                        id={filter.id}
                        checked={targetDisplay === filter.label}
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
