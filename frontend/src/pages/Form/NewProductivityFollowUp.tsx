import React, { useState, useEffect } from "react";
import { DynamicInputFieldsProductivityFollowUp } from "../../methods/DynamicInputFields"; // Import the hook
import { ReusableMethods } from "../../methods/ReusableMethods";
import SpinnerObject from "../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import formReturnMessage from "../../components/Forms/FormAlerts/formReturnMessage";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useTranslation } from "react-i18next";
import { DynamicInputFieldsSettings } from "../../methods/DynamicInputFields";

export default function NewProductivityFollowUp() {
  const { setIsLoading, Spinner } = SpinnerObject();
  const { formSubmit } = ReusableMethods();
  const user = useSelector((state: any) => state.user.value);
  const { MessageBox, setFormMessage } = formReturnMessage();
  const { t } = useTranslation();
  const pageTitle = t("followup_of_productivity");
  const { productivityFollowUp, handleInputChange } =
    DynamicInputFieldsProductivityFollowUp();
  const { settings, setSettings } = DynamicInputFieldsSettings();

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
      {/* {JSON.stringify(productivityFollowUp)} */}
      <div className="grid grid-cols-1 md:grid-cols-[100%] gap-4">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex border-b justify-between  border-stroke py-2 px-3 dark:border-strokedark">
            <h3 className="text-md left-content uppercase text-black dark:text-white items-start">
              {t("followup_of_productivity_title")}
            </h3>
          </div>

          <div
            className="lg:flex flex-row p-4 mb-4 text-sm text-green-800 rounded-xs bg-cyan-50 dark:bg-black dark:text-whiten"
            role="alert"
          >
            <div className="lg:w-1/6 mr-5">
              <label className="mb-1 block text-black dark:text-white text-xs">
                {t("week")}
              </label>
              <select
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm mb-3"
                required
                name="week"
                defaultValue={productivityFollowUp[0].week}
                onChange={(e) => {
                  handleInputChange({
                    inputIndex: 0,
                    field: "week",
                    value: e.target.value,
                  });
                }}
              >
                <option value="">--{t("select")}--</option>
                {/* /// Loop through 52 weeks in a year */}
                {Array.from({ length: 52 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {t(`Week ${i + 1}`)}
                  </option>
                ))}
              </select>
              <label className="mb-1 block text-black dark:text-white text-xs">
                {t("year")}
              </label>
              <input
                type="number"
                min={2010}
                required
                placeholder={t("year")}
                value={productivityFollowUp[0].year}
                onChange={(e) => {
                  handleInputChange({
                    inputIndex: 0,
                    field: "year",
                    value: e.target.value,
                  });
                }}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
              />
            </div>

            <div className="lg:w-1/6 mr-5">
              <label className="mb-1 block text-black dark:text-white text-xs">
                {t("weekly_rate")}
              </label>
              <input
                type="number"
                min={0}
                required
                placeholder={t("weekly_rate")}
                onChange={(e) => {
                  handleInputChange({
                    inputIndex: 0,
                    field: "weekly_rate",
                    value: e.target.value,
                  });
                }}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm mb-3"
              />

              <label className="mb-1 block text-black dark:text-white text-xs">
                {t("average_rate")}
              </label>
              <input
                type="number"
                min={0}
                required
                placeholder={t("average_rate")}
                value={productivityFollowUp[0].average_rate}
                onChange={(e) => {
                  handleInputChange({
                    inputIndex: 0,
                    field: "average_rate",
                    value: e.target.value,
                  });
                }}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
              />
            </div>
            <div className="lg:w-1/6 mr-5">
              <label className="mb-1 block text-black dark:text-white text-xs">
                {t("accumulated")}
              </label>
              <input
                type="number"
                min={0}
                required
                placeholder={t("accumulated")}
                value={productivityFollowUp[0].accumulated}
                onChange={(e) => {
                  handleInputChange({
                    inputIndex: 0,
                    field: "accumulated",
                    value: e.target.value,
                  });
                }}
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm mb-3"
              />
            </div>
            <div className="lg:w-2/6 flex">
              <div>
                <ul className="mt-1.5 list-none list-inside">
                  <li className="flex flex-row font-bold">
                    {t("accumulated")} = {productivityFollowUp[0].accumulated}
                  </li>
                  <li className="flex flex-row font-bold">
                    {t("available_time_per_week")} ={" "}
                    {productivityFollowUp.reduce(
                      (acc, cur) =>
                        acc +
                        Number(
                          cur.available_production_hours
                            ? cur.available_production_hours
                            : 0
                        ),
                      0
                    )}
                  </li>
                  <li className="font-bold">
                    {t("average_rate")} (st/h) ={" "}
                    {settings.productivityAverageRate}
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:w-2/6 flex">
              <div className="w-full">
                <ul className="mt-1.5 list-none list-inside">
                  <li className="flex flex-row">
                    {t("weekly_rate")} = {productivityFollowUp[0].weekly_rate}
                  </li>
                  <li className="flex flex-row">{t("shift_form")} =</li>
                  <li className="flex flex-row">
                    {t("starting_balance_friday")} =
                  </li>

                  <li className="font-bold">{t("target_balance")} =</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="">
            <MessageBox />

            {productivityFollowUp[0].week > 0 && (
              <form
                onSubmit={(e) =>
                  formSubmit({
                    event: e,
                    action_url: "productivityfollowups",
                    method: "POST",
                    formId: "",
                    formData: productivityFollowUp,
                    contentType: "application/json",
                    authentication: user.token,
                    setIsLoading,
                    setReturnData: setFormMessage,
                  })
                }
                method="POST"
                className="pb-5 items-center justify-center"
              >
                <div className="max-w-full overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-2 dark:bg-meta-4 text-center">
                        <th className="py-4 px-3 text-xs font-bold text-black dark:text-white xl:pl-3"></th>
                        <th className="py-2 px-2 text-xs font-bold text-black dark:text-white">
                          {t("monday")}
                        </th>
                        <th className="py-2 px-2 text-xs font-bold text-black dark:text-white">
                          {t("tuesday")}
                        </th>

                        <th className="py-2 px-2 text-xs font-bold text-black dark:text-white">
                          {t("wednesday")}
                        </th>
                        <th className="py-2 px-2 text-xs font-bold text-black dark:text-white">
                          {t("thursday")}
                        </th>
                        <th className="py-2 px-2 text-xs font-bold text-black dark:text-white">
                          {t("friday")}
                        </th>
                        <th className="py-2 px-2 text-xs font-bold text-black dark:text-white">
                          {t("saturday")}
                        </th>
                        <th className="py-2 px-2 text-xs font-bold text-black dark:text-white">
                          {t("sunday")}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="text-center even:bg-gray-2 dark:even:bg-boxdark">
                        <td className="text-sm border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3">
                          {t("available_hours")}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            required
                            placeholder={t("monday")}
                            onChange={(e) => {
                              handleInputChange({
                                inputIndex: 0,
                                field: "total_available_hours",
                                value: e.target.value,
                              });
                            }}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            required
                            placeholder={t("tuesday")}
                            onChange={(e) => {
                              handleInputChange({
                                inputIndex: 1,
                                field: "total_available_hours",
                                value: e.target.value,
                              });
                            }}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            required
                            placeholder={t("wednesday")}
                            onChange={(e) => {
                              handleInputChange({
                                inputIndex: 2,
                                field: "total_available_hours",
                                value: e.target.value,
                              });
                            }}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            required
                            placeholder={t("thursday")}
                            onChange={(e) => {
                              handleInputChange({
                                inputIndex: 3,
                                field: "total_available_hours",
                                value: e.target.value,
                              });
                            }}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            required
                            placeholder={t("friday")}
                            onChange={(e) => {
                              handleInputChange({
                                inputIndex: 4,
                                field: "total_available_hours",
                                value: e.target.value,
                              });
                            }}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            required
                            placeholder={t("saturday")}
                            onChange={(e) => {
                              handleInputChange({
                                inputIndex: 5,
                                field: "total_available_hours",
                                value: e.target.value,
                              });
                            }}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            required
                            placeholder={t("sunday")}
                            onChange={(e) => {
                              handleInputChange({
                                inputIndex: 6,
                                field: "total_available_hours",
                                value: e.target.value,
                              });
                            }}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                      </tr>
                      <tr className="text-center even:bg-gray-2 dark:even:bg-boxdark">
                        <td className="text-sm border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3">
                          {t("maintenance_hours")}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            required
                            placeholder={t("monday")}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 0,
                                field: "maintenance_hours",
                                value: e.target.value,
                              })
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            required
                            placeholder={t("tuesday")}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 1,
                                field: "maintenance_hours",
                                value: e.target.value,
                              })
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            required
                            placeholder={t("wednesday")}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 2,
                                field: "maintenance_hours",
                                value: e.target.value,
                              })
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            required
                            placeholder={t("thursday")}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 3,
                                field: "maintenance_hours",
                                value: e.target.value,
                              })
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            required
                            placeholder={t("friday")}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 4,
                                field: "maintenance_hours",
                                value: e.target.value,
                              })
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>

                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            required
                            placeholder={t("saturday")}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 5,
                                field: "maintenance_hours",
                                value: e.target.value,
                              })
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            required
                            placeholder={t("sunday")}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 6,
                                field: "maintenance_hours",
                                value: e.target.value,
                              })
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                      </tr>

                      <tr className="text-center even:bg-gray-2 dark:even:bg-boxdark font-bold">
                        <td className="text-sm border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3">
                          {t("available_production_hours")}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {
                            productivityFollowUp[0][
                              "available_production_hours"
                            ]
                          }
                          {/* <input
                          type="number"
                          min={0}
                          required
                          readOnly
                          value={
                            productivityFollowUp[0][
                              "available_production_hours"
                            ]
                          }
                          placeholder={t("monday")}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {
                            productivityFollowUp[1][
                              "available_production_hours"
                            ]
                          }
                          {/* <input
                          type="number"
                          min={0}
                          readOnly
                          value={
                            productivityFollowUp[1][
                              "available_production_hours"
                            ]
                          }
                          placeholder={t("tuesday")}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {
                            productivityFollowUp[2][
                              "available_production_hours"
                            ]
                          }
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("wednesday")}
                          readOnly
                          value={
                            productivityFollowUp[2][
                              "available_production_hours"
                            ]
                          }
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {
                            productivityFollowUp[3][
                              "available_production_hours"
                            ]
                          }
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("thursday")}
                          readOnly
                          value={
                            productivityFollowUp[3][
                              "available_production_hours"
                            ]
                          }
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {
                            productivityFollowUp[4][
                              "available_production_hours"
                            ]
                          }
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("friday")}
                          readOnly
                          value={
                            productivityFollowUp[4][
                              "available_production_hours"
                            ]
                          }
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {
                            productivityFollowUp[5][
                              "available_production_hours"
                            ]
                          }
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("saturday")}
                          readOnly
                          value={
                            productivityFollowUp[5][
                              "available_production_hours"
                            ]
                          }
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {
                            productivityFollowUp[6][
                              "available_production_hours"
                            ]
                          }
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("sunday")}
                          readOnly
                          value={
                            productivityFollowUp[6][
                              "available_production_hours"
                            ]
                          }
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                      </tr>
                      <tr className="text-center even:bg-gray-2 dark:even:bg-boxdark">
                        <td className="text-sm border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3">
                          {t("lamb")}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 0,
                                field: "lamb",
                                value: e.target.value,
                              })
                            }
                            placeholder={t("monday")}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 1,
                                field: "lamb",
                                value: e.target.value,
                              })
                            }
                            placeholder={t("tuesday")}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 2,
                                field: "lamb",
                                value: e.target.value,
                              })
                            }
                            placeholder={t("wednesday")}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            placeholder={t("thursday")}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 3,
                                field: "lamb",
                                value: e.target.value,
                              })
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            placeholder={t("friday")}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 4,
                                field: "lamb",
                                value: e.target.value,
                              })
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            placeholder={t("saturday")}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 5,
                                field: "lamb",
                                value: e.target.value,
                              })
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            placeholder={t("sunday")}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 6,
                                field: "lamb",
                                value: e.target.value,
                              })
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                      </tr>
                      <tr className="text-center even:bg-gray-2 dark:even:bg-boxdark">
                        <td className="text-sm border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3">
                          {t("beef")}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 0,
                                field: "beef",
                                value: e.target.value,
                              })
                            }
                            placeholder={t("monday")}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            placeholder={t("tuesday")}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 1,
                                field: "beef",
                                value: e.target.value,
                              })
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            placeholder={t("wednesday")}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 2,
                                field: "beef",
                                value: e.target.value,
                              })
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            placeholder={t("thursday")}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 3,
                                field: "beef",
                                value: e.target.value,
                              })
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            placeholder={t("friday")}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 4,
                                field: "beef",
                                value: e.target.value,
                              })
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            placeholder={t("saturday")}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 5,
                                field: "beef",
                                value: e.target.value,
                              })
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            placeholder={t("sunday")}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 6,
                                field: "beef",
                                value: e.target.value,
                              })
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                      </tr>
                      <tr className="text-center even:bg-gray-2 dark:even:bg-boxdark">
                        <td className="text-sm border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3">
                          {t("pork")}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 0,
                                field: "pork",
                                value: e.target.value,
                              })
                            }
                            placeholder={t("monday")}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 1,
                                field: "pork",
                                value: e.target.value,
                              })
                            }
                            placeholder={t("tuesday")}
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            placeholder={t("wednesday")}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 2,
                                field: "pork",
                                value: e.target.value,
                              })
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            placeholder={t("thursday")}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 3,
                                field: "pork",
                                value: e.target.value,
                              })
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            placeholder={t("friday")}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 4,
                                field: "pork",
                                value: e.target.value,
                              })
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            placeholder={t("saturday")}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 5,
                                field: "pork",
                                value: e.target.value,
                              })
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <input
                            type="number"
                            min={0}
                            placeholder={t("sunday")}
                            onChange={(e) =>
                              handleInputChange({
                                inputIndex: 6,
                                field: "pork",
                                value: e.target.value,
                              })
                            }
                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                          />
                        </td>
                      </tr>
                      <tr className="text-center even:bg-gray-2 dark:even:bg-boxdark font-bold">
                        <td className="text-sm border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3">
                          {t("output_per_day")}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <div className="flex justify-center">
                            {productivityFollowUp[0].output_per_day}
                            {productivityFollowUp[0].output_per_day * 1 >
                            productivityFollowUp[0].total_target_per_day * 1 ? (
                              <div className="h-3.5 w-3.5 ml-1 rounded-full bg-green-500 me-1 mt-1"></div>
                            ) : (
                              <div className="h-3.5 w-3.5 ml-1 rounded-full bg-red-500 me-1 mt-1"></div>
                            )}
                          </div>
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <div className="flex justify-center">
                            {productivityFollowUp[1].output_per_day}
                            {productivityFollowUp[1].output_per_day * 1 >
                            productivityFollowUp[1].total_target_per_day * 1 ? (
                              <div className="h-3.5 w-3.5 ml-1 rounded-full bg-green-500 me-1 mt-1"></div>
                            ) : (
                              <div className="h-3.5 w-3.5 ml-1 rounded-full bg-red-500 me-1 mt-1"></div>
                            )}
                          </div>
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <div className="flex justify-center">
                            {productivityFollowUp[2].output_per_day}
                            {productivityFollowUp[2].output_per_day * 1 >
                            productivityFollowUp[2].total_target_per_day * 1 ? (
                              <div className="h-3.5 w-3.5 ml-1 rounded-full bg-green-500 me-1 mt-1"></div>
                            ) : (
                              <div className="h-3.5 w-3.5 ml-1 rounded-full bg-red-500 me-1 mt-1"></div>
                            )}
                          </div>
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <div className="flex justify-center">
                            {productivityFollowUp[3].output_per_day}
                            {productivityFollowUp[3].output_per_day * 1 >
                            productivityFollowUp[3].total_target_per_day * 1 ? (
                              <div className="h-3.5 w-3.5 ml-1 rounded-full bg-green-500 me-1 mt-1"></div>
                            ) : (
                              <div className="h-3.5 w-3.5 ml-1 rounded-full bg-red-500 me-1 mt-1"></div>
                            )}
                          </div>
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <div className="flex justify-center">
                            {productivityFollowUp[4].output_per_day}
                            {productivityFollowUp[4].output_per_day * 1 >
                            productivityFollowUp[4].total_target_per_day * 1 ? (
                              <div className="h-3.5 w-3.5 ml-1 rounded-full bg-green-500 me-1 mt-1"></div>
                            ) : (
                              <div className="h-3.5 w-3.5 ml-1 rounded-full bg-red-500 me-1 mt-1"></div>
                            )}
                          </div>
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <div className="flex justify-center">
                            {productivityFollowUp[5].output_per_day}
                            {productivityFollowUp[5].output_per_day * 1 >
                            productivityFollowUp[5].total_target_per_day * 1 ? (
                              <div className="h-3.5 w-3.5 ml-1 rounded-full bg-green-500 me-1 mt-1"></div>
                            ) : (
                              <div className="h-3.5 w-3.5 ml-1 rounded-full bg-red-500 me-1 mt-1"></div>
                            )}
                          </div>
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <div className="flex justify-center">
                            {productivityFollowUp[6].output_per_day}
                            {productivityFollowUp[6].output_per_day * 1 >
                            productivityFollowUp[6].total_target_per_day * 1 ? (
                              <div className="h-3.5 w-3.5 ml-1 rounded-full bg-green-500 me-1 mt-1"></div>
                            ) : (
                              <div className="h-3.5 w-3.5 ml-1 rounded-full bg-red-500 me-1 mt-1"></div>
                            )}
                          </div>
                        </td>
                      </tr>
                      <tr className="text-center even:bg-gray-2 dark:even:bg-boxdark font-bold">
                        <td className="text-sm border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3">
                          {t("total_target_per_day")}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[0].total_target_per_day}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          readOnly
                          value={productivityFollowUp[0].total_target_per_day}
                          placeholder={t("monday")}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[1].total_target_per_day}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("tuesday")}
                          readOnly
                          value={productivityFollowUp[1].total_target_per_day}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[2].total_target_per_day}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("wednesday")}
                          readOnly
                          value={productivityFollowUp[2].total_target_per_day}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[3].total_target_per_day}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("thursday")}
                          readOnly
                          value={productivityFollowUp[3].total_target_per_day}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[4].total_target_per_day}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("friday")}
                          readOnly
                          value={productivityFollowUp[4].total_target_per_day}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[5].total_target_per_day}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("saturday")}
                          readOnly
                          value={productivityFollowUp[5].total_target_per_day}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[6].total_target_per_day}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("sunday")}
                          readOnly
                          value={productivityFollowUp[6].total_target_per_day}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                      </tr>
                      <tr className="text-center even:bg-gray-2 dark:even:bg-boxdark font-bold">
                        <td className="text-sm border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3">
                          {t("weekly_target")}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[0].weekly_target}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          readOnly
                          value={productivityFollowUp[0].weekly_target}
                          placeholder={t("monday")}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[1].weekly_target}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("tuesday")}
                          readOnly
                          value={productivityFollowUp[1].weekly_target}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[2].weekly_target}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("wednesday")}
                          readOnly
                          value={productivityFollowUp[2].weekly_target}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[3].weekly_target}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("thursday")}
                          readOnly
                          value={productivityFollowUp[3].weekly_target}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[4].weekly_target}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("friday")}
                          readOnly
                          value={productivityFollowUp[4].weekly_target}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[5].weekly_target}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("saturday")}
                          readOnly
                          value={productivityFollowUp[5].weekly_target}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[6].weekly_target}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("sunday")}
                          readOnly
                          value={productivityFollowUp[6].weekly_target}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                      </tr>
                      <tr className="text-center even:bg-gray-2 dark:even:bg-boxdark font-bold">
                        <td className="text-sm border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3">
                          {t("output_per_day_per_time")}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[0].output_per_day_per_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          readOnly
                          value={
                            productivityFollowUp[0].output_per_day_per_time
                          }
                          placeholder={t("monday")}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[1].output_per_day_per_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("tuesday")}
                          readOnly
                          value={
                            productivityFollowUp[1].output_per_day_per_time
                          }
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[2].output_per_day_per_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          readOnly
                          value={
                            productivityFollowUp[2].output_per_day_per_time
                          }
                          placeholder={t("wednesday")}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[3].output_per_day_per_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("thursday")}
                          readOnly
                          value={
                            productivityFollowUp[3].output_per_day_per_time
                          }
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[4].output_per_day_per_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("friday")}
                          readOnly
                          value={
                            productivityFollowUp[4].output_per_day_per_time
                          }
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[5].output_per_day_per_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("saturday")}
                          readOnly
                          value={
                            productivityFollowUp[5].output_per_day_per_time
                          }
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[6].output_per_day_per_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("sunday")}
                          readOnly
                          value={
                            productivityFollowUp[6].output_per_day_per_time
                          }
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                      </tr>

                      <tr className="text-center even:bg-gray-2 dark:even:bg-boxdark font-bold">
                        <td className="text-sm border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3">
                          {t("ack_target_qty")}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[0].ack_target_qty}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          readOnly
                          value={productivityFollowUp[0].ack_target_qty}
                          placeholder={t("monday")}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[1].ack_target_qty}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("tuesday")}
                          readOnly
                          value={productivityFollowUp[1].ack_target_qty}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[2].ack_target_qty}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("wednesday")}
                          readOnly
                          value={productivityFollowUp[2].ack_target_qty}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[3].ack_target_qty}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("thursday")}
                          readOnly
                          value={productivityFollowUp[3].ack_target_qty}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[4].ack_target_qty}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("friday")}
                          readOnly
                          value={productivityFollowUp[4].ack_target_qty}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[5].ack_target_qty}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("saturday")}
                          readOnly
                          value={productivityFollowUp[5].ack_target_qty}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[6].ack_target_qty}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("sunday")}
                          readOnly
                          value={productivityFollowUp[6].ack_target_qty}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                      </tr>
                      <tr className="text-center even:bg-gray-2 dark:even:bg-boxdark">
                        <td className="text-sm border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3">
                          {t("ack_output_qty")}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[0].ack_output_qty}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          readOnly
                          value={productivityFollowUp[0].ack_output_qty}
                          placeholder={t("monday")}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[1].ack_output_qty}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("tuesday")}
                          readOnly
                          value={productivityFollowUp[1].ack_output_qty}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[2].ack_output_qty}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("wednesday")}
                          readOnly
                          value={productivityFollowUp[2].ack_output_qty}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[3].ack_output_qty}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("thursday")}
                          readOnly
                          value={productivityFollowUp[3].ack_output_qty}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[4].ack_output_qty}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("friday")}
                          readOnly
                          value={productivityFollowUp[4].ack_output_qty}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[5].ack_output_qty}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("saturday")}
                          readOnly
                          value={productivityFollowUp[5].ack_output_qty}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[6].ack_output_qty}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("sunday")}
                          readOnly
                          value={productivityFollowUp[6].ack_output_qty}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                      </tr>
                      <tr className="text-center even:bg-gray-2 dark:even:bg-boxdark">
                        <td className="text-sm border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3">
                          {t("ack_target_time")}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[0].ack_target_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          readOnly
                          value={productivityFollowUp[0].ack_target_time}
                          placeholder={t("monday")}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[1].ack_target_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("tuesday")}
                          readOnly
                          value={productivityFollowUp[1].ack_target_time}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[2].ack_target_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("wednesday")}
                          readOnly
                          value={productivityFollowUp[2].ack_target_time}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[3].ack_target_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("thursday")}
                          readOnly
                          value={productivityFollowUp[3].ack_target_time}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[4].ack_target_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("friday")}
                          readOnly
                          value={productivityFollowUp[4].ack_target_time}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[5].ack_target_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("saturday")}
                          readOnly
                          value={productivityFollowUp[5].ack_target_time}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[6].ack_target_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("sunday")}
                          readOnly
                          value={productivityFollowUp[6].ack_target_time}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                      </tr>
                      <tr className="text-center even:bg-gray-2 dark:even:bg-boxdark">
                        <td className="text-sm border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3">
                          {t("ack_output_time")}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[0].ack_output_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          readOnly
                          value={productivityFollowUp[0].ack_output_time}
                          placeholder={t("monday")}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[1].ack_output_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("tuesday")}
                          readOnly
                          value={productivityFollowUp[1].ack_output_time}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[2].ack_output_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("wednesday")}
                          readOnly
                          value={productivityFollowUp[2].ack_output_time}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[3].ack_output_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("thursday")}
                          readOnly
                          value={productivityFollowUp[3].ack_output_time}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[4].ack_output_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("friday")}
                          readOnly
                          value={productivityFollowUp[4].ack_output_time}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[5].ack_output_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("saturday")}
                          readOnly
                          value={productivityFollowUp[5].ack_output_time}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[6].ack_output_time}
                        </td>
                      </tr>
                      <tr className="text-center even:bg-gray-2 dark:even:bg-boxdark">
                        <td className="text-sm border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3">
                          {t("output_percent")}
                        </td>
                        <td className="text-sm p1-3 px-1 pt-3 dark:border-strokedark">
                          <div className="flex justify-center">
                            {productivityFollowUp[0].output_percent
                              ? productivityFollowUp[0].output_percent + "%"
                              : 0 + "%"}

                            {productivityFollowUp[0].output_percent * 1 > 0 ? (
                              <div className="h-3.5 w-3.5 rounded-full bg-green-500 me-1 mt-1"></div>
                            ) : (
                              <div className="h-3.5 w-3.5 rounded-full bg-red-500 me-1 mt-1"></div>
                            )}
                          </div>
                        </td>
                        <td className="text-sm  p1-3 px-1 dark:border-strokedark">
                          <div className="flex justify-center">
                            {productivityFollowUp[1].output_percent
                              ? productivityFollowUp[1].output_percent + "%"
                              : 0 + "%"}

                            {productivityFollowUp[1].output_percent * 1 > 0 ? (
                              <div className="h-3.5 w-3.5 rounded-full bg-green-500 me-1 mt-1"></div>
                            ) : (
                              <div className="h-3.5 w-3.5 rounded-full bg-red-500 me-1 mt-1"></div>
                            )}
                          </div>
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <div className="flex justify-center">
                            {productivityFollowUp[2].output_percent
                              ? productivityFollowUp[2].output_percent + "%"
                              : 0 + "%"}

                            {productivityFollowUp[2].output_percent * 1 > 0 ? (
                              <div className="h-3.5 w-3.5 rounded-full bg-green-500 me-1 mt-1"></div>
                            ) : (
                              <div className="h-3.5 w-3.5 rounded-full bg-red-500 me-1 mt-1"></div>
                            )}
                          </div>
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <div className="flex justify-center">
                            {productivityFollowUp[3].output_percent
                              ? productivityFollowUp[3].output_percent + "%"
                              : 0 + "%"}

                            {productivityFollowUp[3].output_percent * 1 > 0 ? (
                              <div className="h-3.5 w-3.5 rounded-full bg-green-500 me-1 mt-1"></div>
                            ) : (
                              <div className="h-3.5 w-3.5 rounded-full bg-red-500 me-1 mt-1"></div>
                            )}
                          </div>
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <div className="flex justify-center">
                            {productivityFollowUp[4].output_percent
                              ? productivityFollowUp[4].output_percent + "%"
                              : 0 + "%"}

                            {productivityFollowUp[4].output_percent * 1 > 0 ? (
                              <div className="h-3.5 w-3.5 rounded-full bg-green-500 me-1 mt-1"></div>
                            ) : (
                              <div className="h-3.5 w-3.5 rounded-full bg-red-500 me-1 mt-1"></div>
                            )}
                          </div>
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <div className="flex justify-center">
                            {productivityFollowUp[5].output_percent
                              ? productivityFollowUp[5].output_percent + "%"
                              : 0 + "%"}

                            {productivityFollowUp[5].output_percent * 1 > 0 ? (
                              <div className="h-3.5 w-3.5 rounded-full bg-green-500 me-1 mt-1"></div>
                            ) : (
                              <div className="h-3.5 w-3.5 rounded-full bg-red-500 me-1 mt-1"></div>
                            )}
                          </div>
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          <div className="flex justify-center">
                            {productivityFollowUp[6].output_percent
                              ? productivityFollowUp[6].output_percent + "%"
                              : 0 + "%"}
                            {productivityFollowUp[6].output_percent * 1 > 0 ? (
                              <div className="h-3.5 w-3.5 rounded-full bg-green-500 me-1 mt-1"></div>
                            ) : (
                              <div className="h-3.5 w-3.5 rounded-full bg-red-500 me-1 mt-1"></div>
                            )}
                          </div>
                        </td>
                      </tr>
                      <tr className="text-center even:bg-gray-2 dark:even:bg-boxdark">
                        <td className="text-sm border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3">
                          {t("deviation_from_contract_qty")}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[0].deviation_from_contract_qty}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("monday")}
                          readOnly
                          value={
                            productivityFollowUp[0].deviation_from_contract_qty
                          }
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[1].deviation_from_contract_qty}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("tuesday")}
                          readOnly
                          value={
                            productivityFollowUp[1].deviation_from_contract_qty
                          }
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[2].deviation_from_contract_qty}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("wednesday")}
                          readOnly
                          value={
                            productivityFollowUp[2].deviation_from_contract_qty
                          }
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[3].deviation_from_contract_qty}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("thursday")}
                          readOnly
                          value={
                            productivityFollowUp[3].deviation_from_contract_qty
                          }
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[4].deviation_from_contract_qty}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("friday")}
                          readOnly
                          value={
                            productivityFollowUp[4].deviation_from_contract_qty
                          }
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[5].deviation_from_contract_qty}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("saturday")}
                          readOnly
                          value={
                            productivityFollowUp[5].deviation_from_contract_qty
                          }
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[6].deviation_from_contract_qty}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("sunday")}
                          readOnly
                          value={
                            productivityFollowUp[6].deviation_from_contract_qty
                          }
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                      </tr>
                      <tr className="text-center even:bg-gray-2 dark:even:bg-boxdark">
                        <td className="text-sm border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3">
                          {t("deviation_from_contract_time")}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[0].deviation_from_contract_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          readOnly
                          placeholder={t("monday")}
                          value={
                            productivityFollowUp[0].deviation_from_contract_time
                          }
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[1].deviation_from_contract_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          readOnly
                          value={
                            productivityFollowUp[1].deviation_from_contract_time
                          }
                          placeholder={t("tuesday")}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[2].deviation_from_contract_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("wednesday")}
                          readOnly
                          value={
                            productivityFollowUp[2].deviation_from_contract_time
                          }
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[3].deviation_from_contract_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("thursday")}
                          readOnly
                          value={
                            productivityFollowUp[3].deviation_from_contract_time
                          }
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[4].deviation_from_contract_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("friday")}
                          readOnly
                          value={
                            productivityFollowUp[4].deviation_from_contract_time
                          }
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[5].deviation_from_contract_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("saturday")}
                          readOnly
                          value={
                            productivityFollowUp[5].deviation_from_contract_time
                          }
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                        <td className="text-sm border-b border-[#eee] p1-3 px-1 dark:border-strokedark">
                          {productivityFollowUp[6].deviation_from_contract_time}
                          {/* <input
                          type="number"
                          min={0}
                          required
                          placeholder={t("sunday")}
                          readOnly
                          value={
                            productivityFollowUp[6].deviation_from_contract_time
                          }
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                        /> */}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <MessageBox />
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
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
