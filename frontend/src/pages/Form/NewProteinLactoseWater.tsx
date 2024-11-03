import React, { useState } from "react";
import { DynamicInputFields } from "../../methods/DynamicInputFields"; // Import the hook
import { ReusableMethods } from "../../methods/ReusableMethods";
import SpinnerObject from "../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import formReturnMessage from "../../components/Forms/FormAlerts/formReturnMessage";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useTranslation } from "react-i18next";

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
    computeProteinChart,
  } = DynamicInputFields();
  //const { countValid, countInValid, totalCount } = proteinChartValues;
  const proteinConstant = {
    constants: 72.5,
    approvedText: "Tillfredställande",
    unApprovedText: "Åtgärder krävs",
  };

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
            className="flex p-4 mb-4 text-sm text-green-800 rounded-xs bg-cyan-50 dark:bg-black dark:text-whiten"
            role="alert"
          >
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
                Protein: Gränsvärde = {proteinConstant.constants}
              </span>
              <ul className="mt-1.5 list-none list-inside">
                <li className="flex flex-row">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2 mt-1"></div>
                  {proteinConstant.approvedText} |
                  <span className="ml-1">Total</span> =
                  {computeValues.countValid}{" "}
                  <span className="ml-1">Percent</span> =
                  {computeValues.countValid
                    ? Math.round(
                        ((computeValues.countValid * 1) /
                          computeValues.totalCount) *
                          1 *
                          100
                      )
                    : 0}
                  %
                </li>
                <li className="flex flex-row">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2 mt-1"></div>
                  {proteinConstant.unApprovedText} |{" "}
                  <span className="ml-1">Total</span> =
                  {computeValues.countInValid}
                  <span className="ml-1">Percent</span> =
                  {computeValues.countInValid
                    ? Math.round(
                        ((computeValues.countInValid * 1) /
                          computeValues.totalCount) *
                          1 *
                          100
                      )
                    : 0}
                  %
                </li>
                <li className="font-bold">
                  Total = {computeValues.totalCount}
                </li>
              </ul>
            </div>
          </div>
          <div className="">
            <div className="flex flex-row justify-end pr-3">
              <button
                type="button"
                className="px-3 py-2 text-xs font-medium text-center text-white bg-cyan-900 rounded-lg  dark:bg-black"
                onClick={handleAddPoNumber}
              >
                Add PO
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
                      PO Number
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
                          {batch.derivedDate}
                        </span>
                        <span className="pl-2 text-xs text-graydark flex flex-row">
                          {/* Protein Value */}
                          {batch.proteinValue != "" && (
                            <>
                              {parseInt(batch.proteinValue) * 1 >
                              proteinConstant.constants * 1 ? (
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-1 mt-1"></div>
                              ) : (
                                <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-1 mt-1"></div>
                              )}
                              Protein
                            </>
                          )}
                          {/* Lactose Value */}
                          {batch.lactoseValue != "" && (
                            <>
                              {parseInt(batch.lactoseValue) * 1 >
                              proteinConstant.constants * 1 ? (
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-1 mt-1 ml-2"></div>
                              ) : (
                                <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-1 mt-1 ml-2"></div>
                              )}
                              Lactose
                            </>
                          )}
                          {/* Water Value */}
                          {batch.waterValue != "" && (
                            <>
                              {parseInt(batch.waterValue) * 1 >
                              proteinConstant.constants * 1 ? (
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-1 mt-1 ml-2"></div>
                              ) : (
                                <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-1 mt-1 ml-2"></div>
                              )}
                              Water
                            </>
                          )}
                        </span>
                      </div>
                      <div className="flex flex-row md:flex-row md:flex-wrap pt-2">
                        <div className="flex-1 md:w-1/5 md:mb-0 mr-1">
                          <label className="text-black dark:text-white text-xs flex flex-row">
                            Batch{" "}
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
                            placeholder="Batch"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>

                        {/* <!-- Row 2 for inputs 3, 4, and 5 --> */}
                        <div className="flex-1 md:w-1/5 md:mb-0 mr-1">
                          <label className="block text-black dark:text-white text-xs">
                            Protein
                          </label>
                          <input
                            type="number"
                            id="small-input"
                            name="protein_value[]"
                            value={batch.proteinValue}
                            //onBlur={() => handleCompute(proteinConstant)}
                            onChange={(e) => {
                              handleInputChange({
                                poIndex: poIndex,
                                batchIndex,
                                field: "proteinValue",
                                value: e.target.value,
                              });
                              handleCompute(proteinConstant);
                            }}
                            placeholder="Protein"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="flex-1 md:w-1/5 md:mb-0 mr-1">
                          <label className="block text-black dark:text-white text-xs">
                            Lactose
                          </label>
                          <input
                            type="number"
                            id="small-input"
                            name="_value[]"
                            value={batch.lactoseValue}
                            //onBlur={() => handleCompute(proteinConstant)}
                            onChange={(e) => {
                              handleInputChange({
                                poIndex: poIndex,
                                batchIndex,
                                field: "lactoseValue",
                                value: e.target.value,
                              });
                              handleCompute(proteinConstant);
                            }}
                            placeholder="Lactose"
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                          />
                        </div>
                        <div className="flex-1 md:w-1/5 md:mb-0">
                          <label className="block text-black dark:text-white text-xs">
                            Water
                          </label>
                          <input
                            type="number"
                            id="small-input"
                            name="water_value[]"
                            value={batch.waterValue}
                            //onBlur={() => handleCompute(proteinConstant)}
                            onChange={(e) => {
                              handleInputChange({
                                poIndex: poIndex,
                                batchIndex,
                                field: "waterValue",
                                value: e.target.value,
                              });
                              handleCompute(proteinConstant);
                            }}
                            placeholder="Water"
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
                    Submit
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="2/5">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-800 dark:text-gray-400">
                  <tr>
                    <th scope="col" colSpan={3} className="px-2 py-3">
                      Protein: Gränsvärde = {proteinConstant.constants}
                    </th>
                  </tr>
                </thead>

                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Antal
                    </th>
                    <th scope="col" className="px-4 py-3">
                      %
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-200 border-gray-500">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {proteinConstant.approvedText}
                    </th>
                    <td className="px-6 py-4">
                      {proteinComputeValues.countValid}
                    </td>
                    <td className="px-6 py-4">
                      {proteinComputeValues.countValid
                        ? Math.round(
                            ((proteinComputeValues.countValid * 1) /
                              proteinComputeValues.totalCount) *
                              1 *
                              100
                          )
                        : 0}
                      %
                    </td>
                  </tr>
                  <tr className="bg-gray-600">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {proteinConstant.unApprovedText}
                    </th>
                    <td className="px-6 py-4">
                      {proteinComputeValues.countInValid}
                    </td>
                    <td className="px-6 py-4">
                      {proteinComputeValues.countInValid
                        ? Math.round(
                            ((proteinComputeValues.countInValid * 1) /
                              proteinComputeValues.totalCount) *
                              1 *
                              100
                          )
                        : 0}
                      %
                    </td>
                  </tr>
                </tbody>
                <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                  <tr>
                    <th scope="col" className="px-6 py-3"></th>
                    <th colSpan={2} className="px-6 py-3">
                      Total = {proteinComputeValues.totalCount}
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
