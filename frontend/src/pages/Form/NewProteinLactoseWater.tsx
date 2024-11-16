import React, { useState } from "react";
import { DynamicInputFields } from "../../methods/DynamicInputFields"; // Import the hook
import { ReusableMethods } from "../../methods/ReusableMethods";
import SpinnerObject from "../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import formReturnMessage from "../../components/Forms/FormAlerts/formReturnMessage";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useTranslation } from "react-i18next";
import { constant } from "../../Utils/Constants";

export default function NewProteinLactoseWater() {
  const { setIsLoading, Spinner } = SpinnerObject();
  const { formSubmit } = ReusableMethods();
  const user = useSelector((state: any) => state.user.value);
  const { MessageBox, setFormMessage } = formReturnMessage();
  const { t } = useTranslation();
  const pageTitle = t("protein_lactose_water");
  const {
    poNumbers,
    computeValues,
    proteinChartValues,
    handleAddPoNumber,
    handleAddBatch,
    handleRemoveBatch,
    handleInputChange,
    handleCompute,
  } = DynamicInputFields();
  //const { countValid, countInValid, totalCount } = proteinChartValues;
  // const proteinConstant = {
  //   constants: 72.5,
  //   approvedText: "Tillfredställande",
  //   unApprovedText: "Åtgärder krävs",
  // };

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
              {t("heading_protein_lactose_water")}
            </h3>
          </div>

          <div
            className="lg:flex flex-row p-4 mb-4 text-sm text-green-800 rounded-xs bg-cyan-50 dark:bg-black dark:text-whiten"
            role="alert"
          >
            <div className="lg:w-1/3 flex">
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
                  {t("protein") +
                    " " +
                    t("limit") +
                    ": " +
                    constant.proteinConstantLimit}
                </span>

                <ul className="mt-1.5 list-none list-inside">
                  <li className="flex flex-row">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2 mt-1"></div>
                    {t(constant.approvedText)} |
                    <span className="ml-1">Total</span> =
                    {computeValues.countProteinValid}{" "}
                    <span className="ml-1">Percent</span> =
                    {computeValues.countProteinValid
                      ? Math.round(
                          ((computeValues.countProteinValid * 1) /
                            computeValues.totalProteinCount) *
                            1 *
                            100
                        )
                      : 0}
                    %
                  </li>
                  <li className="flex flex-row">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2 mt-1"></div>
                    {t(constant.unApprovedText)} |
                    <span className="ml-1">Total</span> =
                    {computeValues.countProteinInvalid}
                    <span className="ml-1">Percent</span> =
                    {computeValues.countProteinInvalid
                      ? Math.round(
                          ((computeValues.countProteinInvalid * 1) /
                            computeValues.totalProteinCount) *
                            1 *
                            100
                        )
                      : 0}
                    %
                  </li>
                  <li className="font-bold">
                    Total = {computeValues.totalProteinCount}
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:w-1/3 flex">
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
                  {t("lactose") +
                    " " +
                    t("limit") +
                    ": " +
                    constant.lactoseConstantLimit}
                </span>

                <ul className="mt-1.5 list-none list-inside">
                  <li className="flex flex-row">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2 mt-1"></div>
                    {t(constant.approvedText)} |
                    <span className="ml-1">Total</span> =
                    {computeValues.countLactoseValid}{" "}
                    <span className="ml-1">Percent</span> =
                    {computeValues.countLactoseValid
                      ? Math.round(
                          ((computeValues.countLactoseValid * 1) /
                            computeValues.totalLactoseCount) *
                            1 *
                            100
                        )
                      : 0}
                    %
                  </li>
                  <li className="flex flex-row">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2 mt-1"></div>
                    {t(constant.unApprovedText)} |
                    <span className="ml-1">Total</span> =
                    {computeValues.countLactoseInvalid}
                    <span className="ml-1">Percent</span> =
                    {computeValues.countLactoseInvalid
                      ? Math.round(
                          ((computeValues.countLactoseInvalid * 1) /
                            computeValues.totalLactoseCount) *
                            1 *
                            100
                        )
                      : 0}
                    %
                  </li>
                  <li className="font-bold">
                    Total = {computeValues.totalLactoseCount}
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:w-1/3 flex">
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
                  {t("water") +
                    " " +
                    t("limit") +
                    ": " +
                    constant.waterConstantLimit}
                </span>

                <ul className="mt-1.5 list-none list-inside">
                  <li className="flex flex-row">
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2 mt-1"></div>
                    {t(constant.approvedText)} |
                    <span className="ml-1">Total</span> =
                    {computeValues.countWaterValid}{" "}
                    <span className="ml-1">Percent</span> =
                    {computeValues.countWaterValid
                      ? Math.round(
                          ((computeValues.countWaterValid * 1) /
                            computeValues.totalWaterCount) *
                            1 *
                            100
                        )
                      : 0}
                    %
                  </li>
                  <li className="flex flex-row">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2 mt-1"></div>
                    {t(constant.unApprovedText)} |
                    <span className="ml-1">Total</span> =
                    {computeValues.countWaterInvalid}
                    <span className="ml-1">Percent</span> =
                    {computeValues.countWaterInvalid
                      ? Math.round(
                          ((computeValues.countWaterInvalid * 1) /
                            computeValues.totalWaterCount) *
                            1 *
                            100
                        )
                      : 0}
                    %
                  </li>
                  <li className="font-bold">
                    Total = {computeValues.totalWaterCount}
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
                onClick={handleAddPoNumber}
              >
                {t("add_new")} PO
              </button>
            </div>
            <MessageBox />
            <form
              onSubmit={(e) =>
                formSubmit({
                  event: e,
                  action_url: "labinputs",
                  method: "POST",
                  formId: "",
                  formData: poNumbers,
                  contentType: "application/json",
                  authentication: user.token,
                  setIsLoading,
                  setReturnData: setFormMessage,
                })
              }
              method="POST"
              className="pb-5 items-center justify-center"
            >
              {poNumbers.map((po, poIndex) => (
                <div
                  className="w-full border-whiten border-b py-2 px-2"
                  key={poIndex}
                >
                  <div className="md:mb-0 mr-1">
                    <label className="block text-black dark:text-white text-xs">
                      PO {t("number")}
                    </label>

                    <input
                      type="text"
                      placeholder="PO"
                      name="po_number[]"
                      required
                      value={po.poNumber}
                      onChange={(e) =>
                        handleInputChange({
                          poIndex: poIndex,
                          batchIndex: null,
                          field: "poNumber",
                          value: e.target.value,
                        })
                      }
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  {po.batches.map((batch, batchIndex) => (
                    <div key={batchIndex}>
                      {/* Top indicator row for protein lactose and water */}
                      <div className="flex flex-row pt-2">
                        {/* Date Value */}
                        <svg
                          className="w-5 h-5 text-black"
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
                        <span className="text-xs text-black mt-1">
                          {batch.derivedDate}
                        </span>
                        <span className="pl-2 text-xs text-graydark flex flex-row">
                          {/* Protein Value */}
                          {batch.proteinValue != "" && (
                            <>
                              {parseInt(batch.proteinValue) * 1 >
                              constant.proteinConstantLimit * 1 ? (
                                <div className="h-3.5 w-3.5 rounded-full bg-green-500 me-1 mt-1"></div>
                              ) : (
                                <div className="h-3.5 w-3.5 rounded-full bg-red-500 me-1 mt-1"></div>
                              )}
                              <span className="mt-1">{t("protein")}</span>
                            </>
                          )}
                          {/* Lactose Value */}
                          {batch.lactoseValue != "" && (
                            <>
                              {parseInt(batch.lactoseValue) * 1 >
                              constant.lactoseConstantLimit * 1 ? (
                                <div className="h-3.5 w-3.5 rounded-full bg-green-500 me-1 mt-1 ml-2"></div>
                              ) : (
                                <div className="h-3.5 w-3.5 rounded-full bg-red-500 me-1 mt-1 ml-2"></div>
                              )}
                              <span className="mt-1">{t("lactose")}</span>
                            </>
                          )}
                          {/* Water Value */}
                          {batch.waterValue != "" && (
                            <>
                              {parseInt(batch.waterValue) * 1 >
                              constant.waterConstantLimit * 1 ? (
                                <div className="h-3.5 w-3.5 rounded-full bg-green-500 me-1 mt-1 ml-2"></div>
                              ) : (
                                <div className="h-3.5 w-3.5 rounded-full bg-red-500 me-1 mt-1 ml-2"></div>
                              )}
                              <span className="mt-1">{t("water")}</span>
                            </>
                          )}
                        </span>
                      </div>
                      <div className="flex md:flex-row md:flex-wrap pt-2">
                        <div className="flex-1 md:w-1/2 md:mb-0 mr-1">
                          <label className="text-black dark:text-white text-xs flex flex-row">
                            {t("batch_number")}
                          </label>
                          <input
                            type="number"
                            id="small-input"
                            name="batch_number[]"
                            required
                            value={batch.batchNumber}
                            onChange={(e) =>
                              handleInputChange({
                                poIndex: poIndex,
                                batchIndex,
                                field: "batchNumber",
                                value: e.target.value,
                              })
                            }
                            placeholder={t("batch_number")}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>

                        {/* <!-- Row 2 for inputs 3, 4, and 5 --> */}
                        <div className="flex-1 w-1/2 md:mb-0 mr-1">
                          <label className="block text-black dark:text-white text-xs">
                            {t("protein")}
                          </label>
                          <input
                            type="number"
                            id="small-input"
                            name="protein_value[]"
                            value={batch.proteinValue}
                            onBlur={() => handleCompute()}
                            onChange={(e) => {
                              handleInputChange({
                                poIndex: poIndex,
                                batchIndex,
                                field: "proteinValue",
                                value: e.target.value,
                              });
                              //handleCompute();
                            }}
                            placeholder={t("protein")}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="flex-1 md:w-1/2 md:mb-0 mr-1">
                          <label className="block text-black dark:text-white text-xs">
                            {t("lactose")}
                          </label>
                          <input
                            type="number"
                            id="small-input"
                            name="_value[]"
                            value={batch.lactoseValue}
                            onBlur={() => handleCompute()}
                            onChange={(e) => {
                              handleInputChange({
                                poIndex: poIndex,
                                batchIndex,
                                field: "lactoseValue",
                                value: e.target.value,
                              });
                              //handleCompute();
                            }}
                            placeholder={t("lactose")}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="flex-1 md:w-1/2 md:mb-0">
                          <label className="block text-black dark:text-white text-xs">
                            {t("water")}
                          </label>
                          <input
                            type="number"
                            id="small-input"
                            name="water_value[]"
                            value={batch.waterValue}
                            onBlur={() => handleCompute()}
                            onChange={(e) => {
                              handleInputChange({
                                poIndex: poIndex,
                                batchIndex,
                                field: "waterValue",
                                value: e.target.value,
                              });
                              //handleCompute();
                            }}
                            placeholder={t("water")}
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
                              handleRemoveBatch({
                                poIndex,
                                batchIndex,
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
                            onClick={() => handleAddBatch(poIndex)}
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
                </div>
              ))}
              {poNumbers.length > 0 && (
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
