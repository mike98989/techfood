import React, { useEffect, useState } from "react";
import {
  DynamicInputFieldsFruitProduction,
  DynamicInputFieldsMapDetectedBacteria,
} from "../../../methods/DynamicInputFields"; // Import the hook
import { ReusableMethods } from "../../../methods/ReusableMethods";
import SpinnerObject from "../../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import formReturnMessage from "../../../components/Forms/FormAlerts/formReturnMessage";
import { useTranslation } from "react-i18next";
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { httpRequest } from "../../../methods/Requests";
import {
  constant,
  PAGINATE_ITEM_COUNT,
  STORAGE,
  URL,
  PROTOCOL,
} from "../../../Utils/Constants";
export default function EditMapDetectedBacteria(props: any) {
  const { setIsLoading, Spinner } = SpinnerObject();
  const { formSubmit } = ReusableMethods();
  const user = useSelector((state: any) => state.user.value);
  const { MessageBox, setFormMessage } = formReturnMessage();
  const { allRequest } = ReusableMethods();
  const { fetchApi } = httpRequest();
  const [coordinates, setCoordinates] = useState([]);
  const [detectedBacteria, setDetectedBacteria] = useState([]);
  const [selectedCoordinate, setSelectedCoordinate] = useState({});
  const [file, setFile] = useState(null);
  const { t } = useTranslation();
  const pageTitle = t("map_detected_bacteria");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [coordinateId, setCoordinateId] = useState();
  const { handleInputChange, handleUpdateDetectedBacteriaRow } =
    DynamicInputFieldsMapDetectedBacteria();

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

    let bacteriaData = props.componentData;
    const detectedValues = JSON.parse(props?.componentData?.detected_values);
    bacteriaData.updated_detected_values = detectedValues;
    console.log("data", bacteriaData);
    setDetectedBacteria(bacteriaData);

    //handleUpdateDetectedBacteriaRow(bacteriaData);
  }, [props.componentData]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[100%] gap-4">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="m-3">
            <h3 className="font-medium text-black dark:text-white">
              {t("update") +
                " " +
                t("map_detected_bacteria") +
                " " +
                t("values")}
            </h3>

            <MessageBox />

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsLoading(true);
                fetchApi({
                  url: "mapdetectedbacteria/" + detectedBacteria.id, // End Point
                  method: "PUT", // Method
                  formData: detectedBacteria,
                  contentType: "application/json", //Content Type
                  authentication: user.token,
                })
                  .then((response_value: any) => {
                    const response = JSON.parse(response_value);
                    setIsLoading(false);
                    if (response.status == "1") {
                      //setOpenModal(false);
                      setDetectedBacteria({});
                      setFormMessage({
                        message: response.message,
                        status: "success",
                      });
                      setTimeout(() => {
                        window.location.reload();
                      }, 1200);
                    }
                  })
                  .catch((error) => {
                    setIsLoading(false);
                    setFormMessage({
                      message: JSON.parse(error),
                      status: "error",
                    });
                  });
              }}
              action="#"
              id="editMapDetectedBacteria"
              method="POST"
              className="pb-5 items-center justify-center"
            >
              {/* <form
              onSubmit={(e) => {
                formSubmit({
                  event: e,
                  action_url: "mapdetectedbacteria",
                  method: "PUT",
                  formId: "",
                  formData: detectedBacteria,
                  contentType: "application/json",
                  authentication: user.token,
                  setIsLoading,
                  setReturnData: setFormMessage,
                });
              }}
              method="POST"
              className="pb-5 items-center justify-center"
            > */}
              <div className="w-full border-whiten border-b py-2 px-2">
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
                  </div>
                  <div className="flex flex-row md:flex-row md:flex-wrap pt-2">
                    <div className="flex-1 md:w-1/5 md:mb-0 mr-1">
                      <label className="text-black dark:text-white text-xs flex flex-row">
                        {t("date")}
                      </label>
                      <input
                        type="date"
                        id="small-input"
                        name="date[]"
                        required
                        value={detectedBacteria.date}
                        onChange={(e) =>
                          setDetectedBacteria((prev) => ({
                            ...prev,
                            date: e.target.value,
                          }))
                        }
                        placeholder="Date"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    {/* <!-- Row 2 for inputs 3, 4, and 5 --> */}
                    <div className="flex-1 md:w-1/5 md:mb-0 mr-1">
                      <label className="mb-1 block text-black dark:text-white text-sm">
                        {t("title")}
                      </label>
                      <select
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        value={detectedBacteria.coordinate_id}
                        onChange={(e) =>
                          setDetectedBacteria((prev) => {
                            const updated = { ...prev };
                            updated.coordinate_id = e.target.value;
                            return updated;
                          })
                        }
                        // onChange={(e) => {
                        //   handleInputChange({
                        //     bacteriaIndex: 0,
                        //     dataIndex: null,
                        //     field: "coordinateId",
                        //     value: e.target.value,
                        //   });
                        //   //setCoordinateId(e.target.value);
                        //   setSelectedCoordinate(
                        //     handleChartCoordinatesOptionChange(
                        //       e.target.value,
                        //       coordinates
                        //     )
                        //   );
                        // }}
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
                  <div className="md:w-full flex-column">
                    {detectedBacteria?.updated_detected_values?.map(
                      (dataValue: any, dataIndex: any) => (
                        <div className="w-full md:flex" key={dataIndex}>
                          <div className="md:w-1/2 md:mb-0 mr-1">
                            <label className="text-black dark:text-white text-xs flex flex-row">
                              {t("label")}
                            </label>
                            <input
                              type="text"
                              id="small-input"
                              name="label[]"
                              disabled
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
                              required
                              value={dataValue.number_detected}
                              onChange={(e) =>
                                setDetectedBacteria((prev) => {
                                  const updated = { ...prev };
                                  updated.updated_detected_values[
                                    dataIndex
                                  ].number_detected = e.target.value;
                                  updated.detected_values = JSON.stringify(
                                    updated.updated_detected_values
                                  );
                                  return updated;
                                })
                              }
                              placeholder={t("value")}
                              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
                {/* {/* <input
                    type="text"
                    value={bacteria.coordinateId}
                    name="coordinate_id[]"
                  /> */}
              </div>

              <div className="flex flex-row justify-center">
                <button
                  type="submit"
                  className="text-white bg-gradient-to-br from-cyan-600 to-cyan-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-2"
                >
                  <Spinner />
                  {t("save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
