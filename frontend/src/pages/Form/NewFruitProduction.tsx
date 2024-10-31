import React, { useEffect, useState } from "react";
import { DynamicInputFieldsFruitProduction } from "../../methods/DynamicInputFields"; // Import the hook
import { ReusableMethods } from "../../methods/ReusableMethods";
import SpinnerObject from "../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import formReturnMessage from "../../components/Forms/FormAlerts/formReturnMessage";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useTranslation } from "react-i18next";
export default function Protein() {
  const { setIsLoading, Spinner } = SpinnerObject();
  const { formSubmit } = ReusableMethods();
  const user = useSelector((state: any) => state.user.value);
  const { MessageBox, setFormMessage } = formReturnMessage();
  const { allRequest } = ReusableMethods();
  // const [sections, setSections] = useState([]);
  // const [causes, setCauses] = useState([]);
  // const [derivationTypes, setDerivationTypes] = useState([]);
  const [returnDataArray, setReturnDataArray] = useState([]);

  const { t } = useTranslation();
  const pageTitle = t("fruit_production");
  const {
    fruitProduction,
    handleAddFruitProduction,
    handleInputChange,
    handleRemoveRow,
  } = DynamicInputFieldsFruitProduction();

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
    // fetchData("fruits", setSections);
    // fetchData("causes", setCauses);
    // fetchData("deviation_types", setDerivationTypes);
    fetchData("fruit_production_form_related_data", setReturnDataArray);
  }, []);

  return (
    <>
      <Breadcrumb
        links={[
          { title: pageTitle, link: "./fruit_production" },
          { title: "New", link: null },
        ]}
        showNewButton={false}
        pageTitle={pageTitle}
      />

      <div className="grid grid-cols-1 md:grid-cols-[100%] gap-4">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex border-b justify-between  border-stroke py-2 px-3 dark:border-strokedark">
            <h3 className="text-md left-content uppercase text-black dark:text-white items-start">
              {t("heading_fruit_production")}
            </h3>
            <button
              type="button"
              className="px-3 py-2 text-xs font-medium text-center text-white bg-cyan-900 rounded-lg  dark:bg-black"
              onClick={handleAddFruitProduction}
            >
              Add Row
            </button>
          </div>

          <div className="">
            <MessageBox />

            <form
              onSubmit={(e) =>
                formSubmit({
                  event: e,
                  action_url: "fruitproduction",
                  method: "POST",
                  formId: "",
                  formData: fruitProduction,
                  contentType: "application/json",
                  authentication: user.token,
                  setIsLoading,
                  setReturnData: setFormMessage,
                })
              }
              method="POST"
              className="pb-5 items-center justify-center"
            >
              {fruitProduction.map((production, fruitProductionIndex) => (
                <div
                  className="w-full border-whiten border-b py-2 px-2"
                  key={fruitProductionIndex}
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
                        {production.date}
                      </span>
                    </div>
                    <div className="flex flex-row md:flex-row md:flex-wrap pt-2">
                      <div className="flex-1 md:w-1/5 md:mb-0 mr-1">
                        <label className="text-black dark:text-white text-xs flex flex-row">
                          Date{" "}
                        </label>
                        <input
                          type="date"
                          id="small-input"
                          name="date[]"
                          required
                          value={production.date}
                          onChange={(e) =>
                            handleInputChange({
                              index: fruitProductionIndex,
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
                        <label className="block text-black dark:text-white text-xs">
                          Section
                        </label>
                        <select
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          value={production.section}
                          required
                          name="section"
                          onChange={(e) =>
                            handleInputChange({
                              index: fruitProductionIndex,
                              field: "section",
                              value: e.target.value,
                            })
                          }
                        >
                          <option value="">--Select--</option>
                          {returnDataArray.fruits &&
                            returnDataArray.fruits.original.data.map(
                              (value: any, key: any) => (
                                <option key={key} value={value.name}>
                                  {value.name}
                                </option>
                              )
                            )}
                        </select>
                      </div>
                      <div className="flex-1 md:w-1/5 md:mb-0 mr-1">
                        <label className="block text-black dark:text-white text-xs">
                          Cause
                        </label>
                        <select
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          value={production.cause}
                          required
                          name="cause[]"
                          onChange={(e) =>
                            handleInputChange({
                              index: fruitProductionIndex,
                              field: "cause",
                              value: e.target.value,
                            })
                          }
                        >
                          <option value="">--Select--</option>
                          {returnDataArray.causes &&
                            returnDataArray.causes.original.data.map(
                              (value: any, key: any) => (
                                <option key={key} value={value.cause}>
                                  {value.cause}
                                </option>
                              )
                            )}
                        </select>
                      </div>
                      <div className="flex-1 md:w-1/5 md:mb-0 mr-1">
                        <label className="block text-black dark:text-white text-xs">
                          Deviation Type
                        </label>

                        <select
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          value={production.deviation_type}
                          required
                          name="deviation_type[]"
                          onChange={(e) =>
                            handleInputChange({
                              index: fruitProductionIndex,
                              field: "deviation_type",
                              value: e.target.value,
                            })
                          }
                        >
                          <option value="">--Select--</option>
                          {returnDataArray.deviation_types &&
                            returnDataArray.deviation_types.original.data.map(
                              (value: any, key) => (
                                <option key={key} value={value.type}>
                                  {value.type}
                                </option>
                              )
                            )}
                        </select>
                      </div>

                      <div className="flex-1 md:w-1/5 md:mb-0">
                        <label className="block text-black dark:text-white text-xs">
                          Status
                        </label>

                        <select
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          value={production.status}
                          required
                          name="status[]"
                          onChange={(e) =>
                            handleInputChange({
                              index: fruitProductionIndex,
                              field: "status",
                              value: e.target.value,
                            })
                          }
                        >
                          <option value="">--Select--</option>
                          {returnDataArray.statuses &&
                            returnDataArray.statuses.original.data.map(
                              (value: any, key: any) => (
                                <option key={key} value={value.id}>
                                  {value.id}:{value.name}
                                </option>
                              )
                            )}
                        </select>
                      </div>

                      <div className="flex flex-row mt-4">
                        <svg
                          className="xs:w-4 xs:h-4 w-6 h-6 cursor-pointer ml-2 mt-1 text-red-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                          onClick={() =>
                            handleRemoveRow({
                              index: fruitProductionIndex,
                            })
                          }
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                          />
                        </svg>

                        <svg
                          className="w-6 h-6 text-cyan-900 cursor-pointer mt-1 ml-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                          onClick={() => handleAddFruitProduction()}
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 12h14m-7 7V5"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {fruitProduction.length > 0 && returnDataArray.fruits > 0 && (
                <div className="flex flex-row justify-center">
                  <button
                    type="submit"
                    className="text-white bg-gradient-to-br from-cyan-600 to-cyan-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-2"
                  >
                    <Spinner />
                    Submit
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
