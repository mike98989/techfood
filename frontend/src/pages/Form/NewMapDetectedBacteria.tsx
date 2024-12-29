import React, { useEffect, useState } from "react";
import {
  DynamicInputFieldsFruitProduction,
  DynamicInputFieldsMapDetectedBacteria,
} from "../../methods/DynamicInputFields"; // Import the hook
import { ReusableMethods } from "../../methods/ReusableMethods";
import SpinnerObject from "../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import formReturnMessage from "../../components/Forms/FormAlerts/formReturnMessage";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useTranslation } from "react-i18next";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import {
  PAGINATE_ITEM_COUNT,
  STORAGE,
  URL,
  PROTOCOL,
} from "../../Utils/Constants";
export default function FruitProduction() {
  const { setIsLoading, Spinner } = SpinnerObject();
  const { formSubmit } = ReusableMethods();
  const user = useSelector((state: any) => state.user.value);
  const { MessageBox, setFormMessage } = formReturnMessage();
  const { allRequest } = ReusableMethods();
  // const [sections, setSections] = useState([]);
  // const [causes, setCauses] = useState([]);
  // const [derivationTypes, setDerivationTypes] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [selectedCoordinate, setSelectedCoordinate] = useState({});
  const [file, setFile] = useState(null);
  const { t } = useTranslation();
  const pageTitle = t("map_detected_bacteria_title");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [coordinateId, setCoordinateId] = useState();
  const [percentageSpread, setPercentageSpread] = useState(0);
  const {
    detectedBacteria,
    handleInputChange,
    handleUpdateDetectedBacteriaRow,
    handleChartCoordinatesOptionChange,
  } = DynamicInputFieldsMapDetectedBacteria();

  const handleChangeBackground = (newImage: string) => {
    setBackgroundImage(PROTOCOL + URL + STORAGE + newImage);
  };

  const containerStyle = {
    backgroundImage: `url('${backgroundImage}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "500px",
    height: "300px",
  };

  const [seriesData, setSeriesData] = useState({
    series: [],
  });

  const chartOption: ApexOptions = {
    chart: {
      background: "rgba(255, 255, 255, 0.5)",
      type: "scatter",
      height: 300,
      zoom: {
        enabled: false, // Disables zooming
      },
    },
    markers: {
      size: 5, // Adjust the size of the circles
    },
    grid: {
      padding: {
        top: 5,
        right: 40, // Add padding to the right
        bottom: 5,
        left: 20, // Add padding to the left
      },
    },
    dataLabels: {
      enabled: true, // Enable data labels
      formatter: function (val, { dataPointIndex, w }) {
        const point = w.config.series[0].data[dataPointIndex]; // Access the data object
        const title = point.number_detected
          ? point.label + ", " + point.number_detected
          : point.label;
        return title; // Display the `number_detected` value
      },

      style: {
        fontSize: "12px",
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        background: "rgba(255,255,255,0.8)", // Background color
        color: "#000", // Text color
        padding: "4px 8px", // Add padding to mimic a rectangular shape
        border: "1px solid #ccc", // Add border for visual emphasis
        borderRadius: "4px", // Slightly rounded corners
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: "#000",
        opacity: 0.25,
      },
      background: {
        enabled: true,
        borderRadius: 5,
      },
    },
    xaxis: {
      type: "category",
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Define the fixed categories
      //   min: 0, // Set the minimum value
      //   max: 10, // Set the maximum value
      //   tickAmount: 9, // Number of ticks between min and max
      title: {
        text: "X-Axis",
      },
      labels: {
        formatter: (value) => Math.round(value), // Ensure integer values are displayed
        style: {
          fontSize: "15px", // Larger font size
          fontWeight: "bold", // Bold text
          colors: "#000", // Black color for the digits
        },
      },
    },
    yaxis: {
      min: 0, // Start x-axis from 0
      max: 10,
      tickAmount: 10, // Divide axis into equal parts
      title: {
        text: "Y-Axis",
      },
    },
  };

  const updateSpecificCoordinate = (data, targetIndex, newKey, newValue) => {
    // Update the specific coordinate
    console.log("data id", data);
    const selected = JSON.parse(data[0]?.coordinates);
    const updatedCoordinates = selected.map(
      (coord, index) =>
        index === targetIndex
          ? { ...coord, [newKey]: newValue } // Add the new key-value pair
          : coord // Keep other coordinates unchanged
    );

    data[0].coordinates = JSON.stringify(updatedCoordinates);
    return data;
    // Return the updated data object
    // return {
    //   ...data, // Retain all other properties of the main object
    //   coordinates: updatedCoordinates, // Replace coordinates with updated array
    // };
  };

  useEffect(() => {
    const fetchData = async (endpoint: string, returnStateObject: any) => {
      setIsLoading(true);
      allRequest({
        event: null,
        action_url: endpoint, // End Point
        method: "GET", // Method
        formId: "",
        formData: null,
        contentType: "application/json", //Content Type
        authentication: user.token,
        setIsLoading,
        setReturnData: returnStateObject,
      });
    };
    fetchData("map_detected_bacteria_coordinates", setCoordinates);
  }, []);

  useEffect(() => {
    if (selectedCoordinate[0]) {
      const selected = JSON.parse(selectedCoordinate[0]?.coordinates);
      handleUpdateDetectedBacteriaRow(selected);
      handleChangeBackground(selectedCoordinate[0]?.image.path);
      if (selectedCoordinate[0]?.type == "map") {
        let filteredMapData = selected.map((value, i) => {
          return {
            x: value.x_axis,
            y: value.y_axis,
            number_detected: value.number_detected,
            label: value.label,
          };
        });

        setSeriesData({ series: [{ name: "", data: filteredMapData }] });
      }
    }
  }, [selectedCoordinate]);
  return (
    <>
      <Breadcrumb
        links={[
          { title: pageTitle, link: "/" },
          { title: "new", link: null },
        ]}
        showNewButton={false}
        pageTitle={pageTitle}
      />

      <div className="grid grid-cols-1 md:grid-cols-[100%] gap-4">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="">
            <MessageBox />

            <form
              onSubmit={(e) => {
                formSubmit({
                  event: e,
                  action_url: "mapdetectedbacteria",
                  method: "POST",
                  formId: "",
                  formData: detectedBacteria,
                  contentType: "multipart/form-data",
                  authentication: user.token,
                  setIsLoading,
                  setReturnData: setFormMessage,
                });
              }}
              method="POST"
              className="pb-5 items-center justify-center"
            >
              {detectedBacteria.map((bacteria, bacteriaIndex) => (
                <div
                  className="w-full border-whiten border-b py-2 px-2"
                  key={bacteriaIndex}
                >
                  <Spinner />
                  <div>
                    <div className="flex flex-row pt-2">
                      {/* Date Value */}
                      <svg
                        className="w-4 h-4 text-black"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                        />
                      </svg>
                      <span className="text-xs text-black">
                        {bacteria.date}
                      </span>
                    </div>
                    <div className="flex flex-row md:flex-row md:flex-wrap pt-2">
                      <div className="flex-1 md:w-1/5 md:mb-0 mr-1">
                        <label className="text-black dark:text-white text-sm flex flex-row">
                          {t("date")}
                        </label>
                        <input
                          type="date"
                          id="small-input"
                          name="date[]"
                          required
                          value={bacteria.date}
                          onChange={(e) =>
                            handleInputChange({
                              bacteriaIndex: bacteriaIndex,
                              dataIndex: null,
                              field: "date",
                              value: e.target.value,
                            })
                          }
                          placeholder="Date"
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        />
                      </div>

                      {/* <!-- Row 2 for inputs 3, 4, and 5 --> */}
                      <div className="flex-1 md:w-1/5 md:mb-0 mr-1">
                        <label className="block text-black dark:text-white text-sm">
                          {t("title")}
                        </label>
                        <select
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          onChange={(e) => {
                            handleInputChange({
                              bacteriaIndex: 0,
                              dataIndex: null,
                              field: "coordinateId",
                              value: e.target.value,
                            });
                            //setCoordinateId(e.target.value);

                            setSelectedCoordinate(
                              handleChartCoordinatesOptionChange(
                                e.target.value,
                                coordinates
                              )
                            );
                          }}
                          //value={production.section}
                          required
                          name="title"
                        >
                          <option value="">--{t("select")}--</option>
                          {coordinates?.map((value: any, key: any) => (
                            <option key={key} value={value.id}>
                              {t(value.title)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row">
                    <div className="md:w-1/2 flex-column">
                      {bacteria?.data?.map((dataValue: any, dataIndex: any) => (
                        <div className="w-full md:flex" key={dataIndex}>
                          <div className="md:w-1/2 md:mb-0 mr-1">
                            <label className="text-black dark:text-white text-xs flex flex-row">
                              {t("label")}
                            </label>
                            <input
                              type="text"
                              id="small-input"
                              name="label[]"
                              readOnly
                              value={dataValue.label}
                              placeholder={t("label")}
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                          <div className="md:w-1/2 md:mb-0 mr-1">
                            <label className="text-black dark:text-white text-xs flex flex-row">
                              {t("number_detected")}
                            </label>
                            <input
                              type="number"
                              id="small-input"
                              name="number_detected[]"
                              min={0}
                              max={
                                selectedCoordinate[0]?.type == "spread"
                                  ? 100
                                  : undefined
                              }
                              required
                              value={dataValue.number_detected}
                              onChange={(e) => {
                                handleInputChange({
                                  bacteriaIndex: bacteriaIndex,
                                  dataIndex: dataIndex,
                                  field: "number_detected",
                                  value: e.target.value,
                                });
                                selectedCoordinate[0]?.type == "spread" &&
                                  setPercentageSpread(e.target.value);

                                // setSelectedCoordinate((prev) => {
                                //   const updatedCoordinates = [...prev];

                                //   const finalValue = updateSpecificCoordinate(
                                //     updatedCoordinates,
                                //     dataIndex,
                                //     "number_detected",
                                //     e.target.value
                                //   );

                                //   console.log("final", finalValue);
                                //   return finalValue;
                                // });
                              }}
                              placeholder={t("value")}
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="md:w-1/2">
                      {selectedCoordinate &&
                        selectedCoordinate[0]?.type == "map" && (
                          <div className="md:w-2/3 m-2 rounded-lg">
                            <div
                              style={containerStyle}
                              className="mr-2 rounded-lg"
                            >
                              <ReactApexChart
                                options={chartOption}
                                series={seriesData.series}
                                type="scatter"
                                height={300}
                              />
                            </div>
                          </div>
                        )}
                      {selectedCoordinate &&
                        selectedCoordinate[0]?.type == "spread" && (
                          <div className="md:w-2/3 m-2 rounded-lg">
                            <h5 className="text-center text-lg font-bold">
                              {percentageSpread}%
                            </h5>
                            <div
                              style={{
                                position: "relative",
                                width: "300px", // Full width of parent
                                margin: "0 auto", // Center the container
                                height: "230px",
                                overflow: "hidden", // Ensure content doesn't spill out
                              }}
                            >
                              {/* Red Background Dynamic Overlay */}
                              <div
                                style={{
                                  position: "absolute",
                                  bottom: 0,
                                  left: 0,
                                  width: "300px",
                                  height: `${percentageSpread}%`, // Reveal red from the bottom up
                                  backgroundColor: "#8B0000",
                                  zIndex: 1,
                                }}
                              ></div>

                              {/* PNG Goat Image */}
                              <img
                                src={backgroundImage}
                                alt="Goat"
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  width: "100%", // Take full width of parent
                                  height: "100%", // Match parent's height
                                  objectFit: "cover", // Maintain image proportions
                                  zIndex: 2, // Keep image above red background
                                }}
                              />
                            </div>
                          </div>
                        )}
                    </div>
                  </div>
                  {/* <input
                    type="text"
                    value={bacteria.coordinateId}
                    name="coordinate_id[]"
                  /> */}
                </div>
              ))}

              {detectedBacteria.length > 0 && (
                <div className="flex flex-row justify-center">
                  <button
                    type="submit"
                    className="text-white bg-gradient-to-br from-cyan-600 to-cyan-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-2"
                  >
                    <Spinner />
                    {t("save")}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
