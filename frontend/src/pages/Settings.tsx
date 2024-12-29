// import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import { t } from "i18next";
import userThree from "../images/user/user-03.png";
import { useTranslation } from "react-i18next";
import { DynamicInputFieldsSettings } from "../methods/DynamicInputFields";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { ReusableMethods } from "../methods/ReusableMethods";
import SpinnerObject from "../components/Spinner/Spinner";
import formReturnMessage from "../components/Forms/FormAlerts/formReturnMessage";
import { httpRequest } from "../methods/Requests";
import { setUser, clearUser } from "../methods/reducers/user";
import { useDispatch } from "react-redux";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";

const Settings = () => {
  const { t } = useTranslation();
  const pageTitle = t("settings");

  const { settings, setSettings, handleInputChange } =
    DynamicInputFieldsSettings();
  const user = useSelector((state: any) => state.user.value);
  // const { formSubmit } = ReusableMethods();
  const { setIsLoading, Spinner } = SpinnerObject();
  const { MessageBox, setFormMessage } = formReturnMessage();
  const { fetchApi } = httpRequest();
  const dispatch = useDispatch();

  useEffect(() => {
    user.data?.settings &&
      setSettings(JSON.parse(user.data?.settings.settings));
  }, [user.data?.settings]);
  return (
    <>
      <div className="mx-auto max-w-270">
        <Breadcrumb
          links={[{ title: pageTitle, link: null }]}
          showNewButton={true}
          pageTitle={pageTitle}
        />
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  {t("products") + " " + t("constants")}
                </h3>
              </div>
              <div className="p-7">
                <MessageBox />
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsLoading(true);
                    fetchApi({
                      url: "settings", // End Point
                      method: "POST", // Method
                      formData: { settings: settings },
                      contentType: "application/json", //Content Type
                      authentication: user.token,
                    })
                      .then((response_value: any) => {
                        const response = JSON.parse(response_value);
                        setIsLoading(false);

                        if (response.status == "1") {
                          ////// Update User data
                          const updatedUser = {
                            ...user,
                            data: {
                              ...user.data,
                              settings: {
                                ...user.data.settings,
                                settings: JSON.stringify(settings),
                              },
                            },
                          };

                          // Save the updated user to localStorage
                          localStorage.setItem(
                            "user_data",
                            JSON.stringify(updatedUser.data)
                          );
                          dispatch(setUser(updatedUser));
                          ////Updated display message
                          setFormMessage({
                            message: response.message,
                            status: "success",
                          });
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
                  id="constants"
                >
                  <div className="text-center justify-center my-5">
                    {t("protein_lactose_water")}
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="protein"
                      >
                        {t("protein") + " " + t("limit")}
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray  py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          step="0.01"
                          min={0}
                          name="proteinConstantLimit"
                          value={settings.proteinConstantLimit}
                          onChange={(e) =>
                            handleInputChange({
                              field: "proteinConstantLimit",
                              value: e.target.value,
                            })
                          }
                          id="protein"
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="lactose"
                      >
                        {t("lactose") + " " + t("limit")}
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        step="0.01"
                        min={0}
                        name="lactoseConstantLimit"
                        value={settings.lactoseConstantLimit}
                        onChange={(e) =>
                          handleInputChange({
                            field: "lactoseConstantLimit",
                            value: e.target.value,
                          })
                        }
                        id="lactose"
                      />
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="water"
                      >
                        {t("water") + " " + t("limit")}
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        step="0.01"
                        min={0}
                        name="waterConstantLimit"
                        value={settings.waterConstantLimit}
                        onChange={(e) =>
                          handleInputChange({
                            field: "waterConstantLimit",
                            value: e.target.value,
                          })
                        }
                        id="water"
                      />
                    </div>
                  </div>

                  <div className="text-center justify-center my-5">
                    {t("drill_samples_in_slaughter")}
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="aerobic"
                      >
                        {t("aerobic") + " " + t("limit")}
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          name="aerobicConstantLimit"
                          step="0.01"
                          min={0}
                          value={settings.aerobicConstantLimit}
                          onChange={(e) =>
                            handleInputChange({
                              field: "aerobicConstantLimit",
                              value: e.target.value,
                            })
                          }
                          id="aerobic"
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="enterobacta"
                      >
                        {t("enterobacta") + " " + t("limit")}
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        name="enterobactaConstantLimit"
                        step="0.01"
                        min={0}
                        value={settings.enterobactaConstantLimit}
                        onChange={(e) =>
                          handleInputChange({
                            field: "enterobactaConstantLimit",
                            value: e.target.value,
                          })
                        }
                        id="enterobactaConstantLimit"
                      />
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="ecoli"
                      >
                        {t("e_coli") + " " + t("limit")}
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="ecoliConstantLimit"
                        step="0.01"
                        min={0}
                        value={settings.ecoliConstantLimit}
                        onChange={(e) =>
                          handleInputChange({
                            field: "ecoliConstantLimit",
                            value: e.target.value,
                          })
                        }
                        id="ecoliConstantLimit"
                      />
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="staphylococcus"
                      >
                        {t("staphylococcus") + " " + t("limit")}
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        name="staphylococcusConstantLimit"
                        step="0.01"
                        min={0}
                        value={settings.staphylococcusConstantLimit}
                        onChange={(e) =>
                          handleInputChange({
                            field: "staphylococcusConstantLimit",
                            value: e.target.value,
                          })
                        }
                        id="staphylococcusConstantLimit"
                      />
                    </div>
                  </div>

                  <div className="text-center justify-center my-5">
                    {t("productivity")}
                  </div>
                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="average_rate"
                      >
                        {t("average_rate") +
                          " " +
                          t("limit") +
                          " (" +
                          t("productivity") +
                          ")"}
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          name="productivityAverageRate"
                          value={settings.productivityAverageRate}
                          onChange={(e) =>
                            handleInputChange({
                              field: "productivityAverageRate",
                              value: e.target.value,
                            })
                          }
                          id="productivityAverageRate"
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="average_rate"
                      >
                        {t("average_weekly_rate") +
                          " " +
                          t("per_week") +
                          +t("limit") +
                          " (" +
                          t("productivity") +
                          ")"}
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          name="productivityWeeklyRate"
                          value={settings.productivityWeeklyRate}
                          onChange={(e) =>
                            handleInputChange({
                              field: "productivityWeeklyRate",
                              value: e.target.value,
                            })
                          }
                          id="productivityWeeklyRate"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="text-center justify-center my-5">
                    {t("staffing_of_production")}
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="productionEfficiency"
                      >
                        {t("efficiency") + " " + t("limit")}
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray  py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          step="0.01"
                          name="staffProductionEfficiencyLimit"
                          value={settings.staffProductionEfficiencyLimit}
                          onChange={(e) =>
                            handleInputChange({
                              field: "staffProductionEfficiencyLimit",
                              value: e.target.value,
                            })
                          }
                          id="staffProductionEfficiencyLimit"
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="productivity"
                      >
                        {t("productivity") + " " + t("limit")}
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        min={0}
                        name="staffProductionProductivityLimit"
                        value={settings.staffProductionProductivityLimit}
                        onChange={(e) =>
                          handleInputChange({
                            field: "staffProductionProductivityLimit",
                            value: e.target.value,
                          })
                        }
                        id="staffProductionProductivityLimit"
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="production_output"
                      >
                        {t("output") + " " + t("limit")}
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        min={0}
                        name="staffProductionOutputLimit"
                        value={settings.staffProductionOutputLimit}
                        onChange={(e) =>
                          handleInputChange({
                            field: "staffProductionOutputLimit",
                            value: e.target.value,
                          })
                        }
                        id="staffProductionOutputLimit"
                      />
                    </div>
                  </div>

                  <div className="text-center justify-center my-5">
                    {t("oee_and_efficiency")}
                  </div>

                  <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="productionEfficiency"
                      >
                        {t("overall") + " " + t("limit")}
                      </label>
                      <div className="relative">
                        <input
                          className="w-full rounded border border-stroke bg-gray  py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          step="0.01"
                          name="OEEOverAllLimit"
                          value={settings.OEEOverAllLimit}
                          onChange={(e) =>
                            handleInputChange({
                              field: "OEEOverAllLimit",
                              value: e.target.value,
                            })
                          }
                          id="OEEOverAllLimit"
                        />
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="productionProductivity"
                      >
                        {t("quality") + " " + t("limit")}
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        min={0}
                        name="OEEQualityLimit"
                        value={settings.OEEQualityLimit}
                        onChange={(e) =>
                          handleInputChange({
                            field: "OEEQualityLimit",
                            value: e.target.value,
                          })
                        }
                        id="OEEQualityLimit"
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="production_output"
                      >
                        {t("performance") + " " + t("limit")}
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        min={0}
                        name="OEEPerformanceLimit"
                        value={settings.OEEPerformanceLimit}
                        onChange={(e) =>
                          handleInputChange({
                            field: "OEEPerformanceLimit",
                            value: e.target.value,
                          })
                        }
                        id="OEEPerformanceLimit"
                      />
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label
                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                        htmlFor="production_output"
                      >
                        {t("availability") + " " + t("limit")}
                      </label>
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="number"
                        min={0}
                        name="OEEAvailabilityLimit"
                        value={settings.OEEAvailabilityLimit}
                        onChange={(e) =>
                          handleInputChange({
                            field: "OEEAvailabilityLimit",
                            value: e.target.value,
                          })
                        }
                        id="OEEAvailabilityLimit"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded bg-cyan-900 py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      <Spinner />
                      Save
                    </button>
                  </div>
                  <MessageBox />
                </form>
              </div>
            </div>
          </div>
          {/* <div className="col-span-5 xl:col-span-2">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Your Photo
                </h3>
              </div>
              <div className="p-7">
                <form action="#">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full">
                      <img src={userThree} alt="User" />
                    </div>
                    <div>
                      <span className="mb-1.5 text-black dark:text-white">
                        Edit your photo
                      </span>
                      <span className="flex gap-2.5">
                        <button className="text-sm hover:text-primary">
                          Delete
                        </button>
                        <button className="text-sm hover:text-primary">
                          Update
                        </button>
                      </span>
                    </div>
                  </div>

                  <div
                    id="FileUpload"
                    className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4 sm:py-7.5"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                    />
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                            fill="#3C50E0"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                            fill="#3C50E0"
                          />
                        </svg>
                      </span>
                      <p>
                        <span className="text-primary">Click to upload</span> or
                        drag and drop
                      </p>
                      <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                      <p>(max, 800 X 800px)</p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4.5">
                    <button
                      className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Settings;
