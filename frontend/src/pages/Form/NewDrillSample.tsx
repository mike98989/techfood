import React, { useState, useEffect } from "react";
import { DynamicInputFieldsDrillSamples } from "../../methods/DynamicInputFields"; // Import the hook
import { ReusableMethods } from "../../methods/ReusableMethods";
import SpinnerObject from "../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import formReturnMessage from "../../components/Forms/FormAlerts/formReturnMessage";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useTranslation } from "react-i18next";
import { DynamicInputFieldsSettings } from "../../methods/DynamicInputFields";

export default function NewDrillSample() {
  const { setIsLoading, Spinner } = SpinnerObject();
  const { formSubmit } = ReusableMethods();
  const user = useSelector((state: any) => state.user.value);
  const { MessageBox, setFormMessage } = formReturnMessage();
  const { t } = useTranslation();
  const pageTitle = t("drill_samples_in_slaughter");
  const { allRequest } = ReusableMethods();
  const [returnDataArray, setReturnDataArray] = useState([]);
  const { settings, setSettings } = DynamicInputFieldsSettings();

  const {
    drillSamples,
    computeValues,
    handleAddDrillsSample,
    handleInputChange,
    handleRemoveRow,
    clearStateData,
    handleCompute,
  } = DynamicInputFieldsDrillSamples();

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
    fetchData("drill_sample_form_related_data", setReturnDataArray);
  }, []);

  useEffect(() => {
    user.data?.settings &&
      setSettings(JSON.parse(user.data?.settings.settings));
  }, [user.data?.settings]);

  return (
    <>
      <Breadcrumb
        links={[
          {
            title: pageTitle,
            link: "/",
          },
          { title: "New", link: null },
        ]}
        showNewButton={false}
        pageTitle={pageTitle}
      />
      <div className="grid grid-cols-1 md:grid-cols-[100%] gap-4">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex border-b justify-between  border-stroke py-2 px-3 dark:border-strokedark">
            <h3 className="text-md left-content uppercase text-black dark:text-white items-start">
              {t("heading_drill_sample")}
            </h3>
          </div>

          <div
            className="lg:flex flex-row p-4 mb-4 text-sm text-green-800 rounded-xs bg-cyan-50 dark:bg-black dark:text-whiten"
            role="alert"
          >
            <div className="lg:w-1/2 flex">
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Danger</span>
              <div>
                <span className="font-medium">
                  {t("aerobic") +
                    " " +
                    t("limit") +
                    ": " +
                    settings.aerobicConstantLimit}
                </span>

                <ul className="mt-1.5 list-none list-inside">
                  <li className="flex flex-row">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2 mt-1"></div>
                    {t(settings.approvedText)} |
                    <span className="ml-1">Total</span> =
                    {computeValues.countAerobicValid}{" "}
                    <span className="ml-1">Percent</span> =
                    {computeValues.countAerobicValid
                      ? Math.round(
                          ((computeValues.countAerobicValid * 1) /
                            computeValues.totalAerobicCount) *
                            1 *
                            100
                        )
                      : 0}
                    %
                  </li>
                  <li className="flex flex-row">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2 mt-1"></div>
                    {t(settings.unApprovedText)} |
                    <span className="ml-1">Total</span> =
                    {computeValues.countAerobicInvalid}
                    <span className="ml-1">Percent</span> =
                    {computeValues.countAerobicInvalid
                      ? Math.round(
                          ((computeValues.countAerobicInvalid * 1) /
                            computeValues.totalAerobicCount) *
                            1 *
                            100
                        )
                      : 0}
                    %
                  </li>
                  <li className="font-bold">
                    Total = {computeValues.totalAerobicCount}
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:w-1/2 flex">
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Danger</span>
              <div>
                <span className="font-medium">
                  {t("enterobacta") +
                    " " +
                    t("limit") +
                    ": " +
                    settings.enterobactaConstantLimit}
                </span>

                <ul className="mt-1.5 list-none list-inside">
                  <li className="flex flex-row">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2 mt-1"></div>
                    {t(settings.approvedText)} |
                    <span className="ml-1">Total</span> =
                    {computeValues.countEnterobactaValid}{" "}
                    <span className="ml-1">Percent</span> =
                    {computeValues.countEnterobactaValid
                      ? Math.round(
                          ((computeValues.countEnterobactaValid * 1) /
                            computeValues.totalEnterobactaCount) *
                            1 *
                            100
                        )
                      : 0}
                    %
                  </li>
                  <li className="flex flex-row">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2 mt-1"></div>
                    {t(settings.unApprovedText)} |
                    <span className="ml-1">Total</span> =
                    {computeValues.countEnterobactaInvalid}
                    <span className="ml-1">Percent</span> =
                    {computeValues.countEnterobactaInvalid
                      ? Math.round(
                          ((computeValues.countEnterobactaInvalid * 1) /
                            computeValues.totalEnterobactaCount) *
                            1 *
                            100
                        )
                      : 0}
                    %
                  </li>
                  <li className="font-bold">
                    Total = {computeValues.totalEnterobactaCount}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex flex-row justify-end pr-3">
              <button
                type="button"
                className="px-3 py-2 text-xs font-medium text-center text-white bg-cyan-900 rounded-lg  dark:bg-black"
                onClick={handleAddDrillsSample}
              >
                {t("add_new")}
              </button>
            </div>
            <MessageBox />

            <form
              onSubmit={(e) => {
                formSubmit({
                  event: e,
                  action_url: "drillsamples",
                  method: "POST",
                  formId: "",
                  formData: drillSamples,
                  contentType: "application/json",
                  authentication: user.token,
                  setIsLoading,
                  setReturnData: setFormMessage,
                });
                //clearStateData();
              }}
              method="POST"
              className="pb-5 items-center justify-center"
            >
              {drillSamples.map((drill, index) => (
                <div key={index}>
                  {/* Top indicator row for protein lactose and water */}
                  <div className="flex flex-row pt-2">
                    <span className="pl-2 text-xs text-graydark flex flex-row">
                      {/* Protein Value */}
                      {drill.aerobic != "" && (
                        <>
                          {parseFloat(drill.aerobic) * 1 <
                          settings.aerobicConstantLimit * 1 ? (
                            <div className="h-3.5 w-3.5 rounded-full bg-green-500 me-1 mt-1"></div>
                          ) : (
                            <div className="h-3.5 w-3.5 rounded-full bg-red-500 me-1 mt-1"></div>
                          )}
                          <span className="mt-1 dark:text-white">
                            {t("aerobic")}
                          </span>
                        </>
                      )}
                      {/* Lactose Value */}
                      {drill.enterobacta != "" && (
                        <>
                          {parseFloat(drill.enterobacta) * 1 <
                          settings.enterobactaConstantLimit * 1 ? (
                            <div className="h-3.5 w-3.5 rounded-full bg-green-500 me-1 mt-1 ml-2"></div>
                          ) : (
                            <div className="h-3.5 w-3.5 rounded-full bg-red-500 me-1 mt-1 ml-2"></div>
                          )}
                          <span className="mt-1 dark:text-white">
                            {t("enterobacta")}
                          </span>
                        </>
                      )}
                    </span>
                  </div>
                  <div className="flex md:flex-row md:flex-wrap p-2">
                    <div className="flex-1 md:w-1/2 md:mb-0 mr-1">
                      <label className="text-black dark:text-white text-xs flex flex-row pl-1">
                        {t("slaughter_number")}
                      </label>
                      <input
                        type="number"
                        min="1"
                        name="slaughter_number[]"
                        required
                        value={drill.slaughter_number}
                        onChange={(e) =>
                          handleInputChange({
                            index,
                            field: "slaughter_number",
                            value: e.target.value,
                          })
                        }
                        placeholder={t("slaughter_number")}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="flex-1 md:w-1/2 md:mb-0 mr-1">
                      <label className="text-black dark:text-white text-xs flex flex-row pl-1">
                        {t("week")}
                      </label>
                      <input
                        type="number"
                        min="1"
                        name="week[]"
                        required
                        value={drill.week}
                        onChange={(e) =>
                          handleInputChange({
                            index,
                            field: "week",
                            value: e.target.value,
                          })
                        }
                        placeholder={t("week")}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    {/* <!-- Row 2 for inputs 3, 4, and 5 --> */}
                    <div className="flex-1 w-1/2 md:mb-0 mr-1">
                      <label className="block text-black dark:text-white text-xs">
                        {t("slaughter_house")}
                      </label>
                      <input
                        type="number"
                        min="1"
                        id="small-input"
                        name="slaughter_house[]"
                        required
                        onChange={(e) =>
                          handleInputChange({
                            index,
                            field: "slaughter_house",
                            value: e.target.value,
                          })
                        }
                        placeholder={t("slaughter_house")}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="flex-1 md:w-1/2 md:mb-0 mr-1">
                      <label className="block text-black dark:text-white text-xs">
                        {t("product")}
                      </label>
                      <select
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        required
                        name="product_id[]"
                        value={drill.product_id}
                        onChange={(e) =>
                          handleInputChange({
                            index,
                            field: "product_id",
                            value: e.target.value,
                          })
                        }
                      >
                        <option value="">--{t("select")}--</option>
                        {returnDataArray?.products?.original.data.map(
                          (value: any, key: any) => (
                            <option key={key} value={value.id}>
                              {t(value.name_key)}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div className="flex-1 md:w-1/2 md:mb-0 mr-1">
                      <label className="block text-black dark:text-white text-xs">
                        {t("slaughter_date")}
                      </label>
                      <input
                        type="date"
                        name="slaughter_date[]"
                        value={drill.slaughter_date}
                        // onBlur={() => handleCompute()}
                        onChange={(e) =>
                          handleInputChange({
                            index,
                            field: "slaughter_date",
                            value: e.target.value,
                          })
                        }
                        placeholder={t("slaughter_date")}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="flex md:flex-row md:flex-wrap p-2">
                    <div className="flex-1 md:w-1/2 md:mb-0 mr-1">
                      <label className="block text-black dark:text-white text-xs">
                        {t("piece_date")}
                      </label>
                      <input
                        type="date"
                        value={drill.pieces_id}
                        name="pieces_date[]"
                        onChange={(e) =>
                          handleInputChange({
                            index,
                            field: "pieces_date",
                            value: e.target.value,
                          })
                        }
                        placeholder={t("pieces_date")}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>

                    <div className="flex-1 md:w-1/2 md:mb-0 mr-1">
                      <label className="block text-black dark:text-white text-xs">
                        {t("kind_of_animal")}
                      </label>
                      <select
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        required
                        name="animal_id[]"
                        onChange={(e) =>
                          handleInputChange({
                            index,
                            field: "animal_id",
                            value: e.target.value,
                          })
                        }
                      >
                        <option value="">--{t("select")}--</option>
                        {returnDataArray?.animal?.original.data.map(
                          (value: any, key: any) => (
                            <option key={key} value={value.id}>
                              {t(value.name_key)}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div className="flex-1 md:w-1/2 md:mb-0 mr-1">
                      <label className="block text-black dark:text-white text-xs">
                        {t("aerobic")}
                      </label>
                      <input
                        type="number"
                        id="small-input"
                        name="aerobic[]"
                        value={drill.aerobic}
                        onBlur={() => handleCompute()}
                        onChange={(e) =>
                          handleInputChange({
                            index,
                            field: "aerobic",
                            value: e.target.value,
                          })
                        }
                        placeholder={t("aerobic")}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
                    </div>
                    <div className="flex-1 md:w-1/2 md:mb-0">
                      <label className="block text-black dark:text-white text-xs">
                        {t("enterobacta")}
                      </label>
                      <input
                        type="number"
                        id="small-input"
                        name="enterobacta[]"
                        value={drill.enterobacta}
                        onBlur={() => handleCompute()}
                        onChange={(e) =>
                          handleInputChange({
                            index,
                            field: "enterobacta",
                            value: e.target.value,
                          })
                        }
                        placeholder={t("enterobacta")}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      />
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
                            index,
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
                        onClick={() => handleAddDrillsSample()}
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
              ))}

              {drillSamples.length > 0 && (
                <div className="flex flex-row justify-center">
                  <button
                    // onClick={() => setIsLoading(!isLoading)}
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
