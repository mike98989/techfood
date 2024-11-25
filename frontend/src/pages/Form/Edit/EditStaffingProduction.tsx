import React, { useEffect, useState } from "react";
import { ReusableMethods } from "../../../methods/ReusableMethods";
import SpinnerObject from "../../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import formReturnMessage from "../../../components/Forms/FormAlerts/formReturnMessage";
import { useTranslation } from "react-i18next";
import { httpRequest } from "../../../methods/Requests";

export default function StaffingProduction(props: any) {
  const { setIsLoading, Spinner } = SpinnerObject();
  //const { formSubmit, getWeekNumber } = ReusableMethods();
  const user = useSelector((state: any) => state.user.value);
  const { MessageBox, setFormMessage } = formReturnMessage();
  const { allRequest } = ReusableMethods();
  const { fetchApi } = httpRequest();

  const [defaultYear, setDefaultYear] = useState(2024);
  const initialNumberOfPersonnel = {
    supervisor: 0,
    operator_staff: 0,
    quality_control: 0,
  };
  const [values, setValues] = useState(props.componentData);
  const [totalHours, setTotalHours] = useState(values.total_hours);
  //const [week, setWeek] = useState(1);
  //const [weeklyTotalHoursWorked, setWeeklyTotalHoursWorked] = useState();

  const { t } = useTranslation();
  const pageTitle = t("staffing_of_production");

  const computTotalWorkHours = (e: any, field: string) => {
    setValues((prev) => {
      const updatedValues = { ...prev };
      updatedValues[field] = parseInt(e.target.value);
      return updatedValues;
    });
  };
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[100%] gap-4">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex border-b justify-between  border-stroke py-2 px-3 dark:border-strokedark">
            <h3 className="text-md left-content uppercase text-black dark:text-white items-start">
              {t("staffing_of_production")}
            </h3>
          </div>

          <div className="">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsLoading(true);
                fetchApi({
                  url: "staffingproduction/" + values.id, // End Point
                  method: "PUT", // Method
                  formData: values,
                  contentType: "application/json", //Content Type
                  authentication: user.token,
                })
                  .then((response_value: any) => {
                    console.log(response_value);
                    const response = JSON.parse(response_value);
                    setIsLoading(false);

                    if (response.status == "1") {
                      //setOpenModal(false);
                      setValues([]);
                      setFormMessage({
                        message: response.message,
                        status: "success",
                      });
                      setTimeout(() => {
                        window.location.reload();
                      }, 1500);
                    } else {
                      setFormMessage({
                        message: response.message,
                        status: "error",
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
              action="#"
              id="editStaffingProduction"
              method="POST"
            >
              <MessageBox />

              <div className="px-6.5">
                <Spinner />
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("year")}
                    </label>
                    <input
                      type="number"
                      min="1900"
                      max="2099"
                      name="year"
                      defaultValue={defaultYear}
                      //onChange={(e) => setDefaultYear(e.target.value)}
                      required
                      placeholder={t("year")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("week")}
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                      required
                      name="week"
                      defaultValue={values.week}
                      onChange={(e) =>
                        setValues((prev) => {
                          const updatedValues = { ...prev };
                          updatedValues["week"] = parseInt(e.target.value); // Update PO Number field
                          return updatedValues;
                        })
                      }
                    >
                      <option value="">--{t("select")}--</option>
                      {/* /// Loop through 52 weeks in a year */}
                      {Array.from({ length: 52 }, (_, i) => (
                        <option key={i} value={i + 1}>
                          {t(`Week ${i + 1}`)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("day")}
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                      defaultValue={values.day}
                      onChange={(e) =>
                        setValues((prev) => {
                          const updatedValues = { ...prev };
                          updatedValues["day"] = e.target.value; // Update PO Number field
                          return updatedValues;
                        })
                      }
                      required
                      name="day"
                    >
                      <option value="">--{t("select")}--</option>
                      <option value="monday">{t("monday")}</option>
                      <option value="tuesday">{t("tuesday")}</option>
                      <option value="wednesday">{t("wednesday")}</option>
                      <option value="thursday">{t("thursday")}</option>
                      <option value="friday">{t("friday")}</option>
                      <option value="saturday">{t("saturday")}</option>
                      <option value="sunday">{t("sunday")}</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row text-sm">
                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("weekly_total_hours_worked")}
                    </label>
                    <input
                      type="number"
                      //defaultValue={values.weekly_total_hours_worked}
                      defaultValue={values.weekly_total_hours_worked}
                      onChange={(e) =>
                        setValues((prev) => {
                          const updatedValues = { ...prev };
                          updatedValues["weekly_total_hours_worked"] = parseInt(
                            e.target.value
                          ); // Update PO Number field
                          return updatedValues;
                        })
                      }
                      min="0"
                      name="weekly_total_hours_worked"
                      placeholder={t("hours_worked")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("supervisor")}
                    </label>
                    <input
                      type="number"
                      name="supervisor"
                      defaultValue={values.supervisor}
                      placeholder={t("supervisor")}
                      onChange={(e) => computTotalWorkHours(e, "supervisor")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>
                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("control")}
                    </label>
                    <input
                      type="number"
                      name="quality_control"
                      defaultValue={values.quality_control}
                      placeholder={t("control")}
                      onChange={(e) =>
                        computTotalWorkHours(e, "quality_control")
                      }
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row text-sm">
                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white">
                      {t("operator")}
                    </label>
                    <input
                      type="number"
                      name="operator_staff"
                      defaultValue={values.operator_staff}
                      placeholder={t("operator_staff")}
                      onChange={(e) =>
                        computTotalWorkHours(e, "operator_staff")
                      }
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white">
                      {t("total_hours")}
                    </label>
                    <input
                      type="number"
                      value={totalHours}
                      onChange={(e) => {
                        setTotalHours(e.target.value);
                        setValues((prev) => {
                          const updatedValues = { ...prev };
                          updatedValues["total_hours"] = parseInt(
                            e.target.value
                          ); // Update PO Number field
                          return updatedValues;
                        });
                      }}
                      name="total_hours"
                      placeholder={t("total_hours")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white">
                      {t("production_quantity")}
                    </label>
                    <input
                      type="number"
                      defaultValue={values.production_quantity}
                      onChange={(e) => {
                        setValues((prev) => {
                          const updatedValues = { ...prev };
                          updatedValues["production_quantity"] = parseInt(
                            e.target.value
                          ); // Update PO Number field
                          return updatedValues;
                        });
                      }}
                      name="production_quantity"
                      placeholder={t("production_quantity")}
                      //   onBlur={(e) =>
                      //     setWeek(getWeekNumber(new Date(e.target.value)))
                      //   }
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
