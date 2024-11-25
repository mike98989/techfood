import React, { useEffect, useState } from "react";
import { DynamicInputFieldsCCPFollowUp } from "../../methods/DynamicInputFields"; // Import the hook
import { ReusableMethods } from "../../methods/ReusableMethods";
import SpinnerObject from "../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import formReturnMessage from "../../components/Forms/FormAlerts/formReturnMessage";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useTranslation } from "react-i18next";

export default function StaffingProduction() {
  const { setIsLoading, Spinner } = SpinnerObject();
  const { formSubmit, getWeekNumber } = ReusableMethods();
  const user = useSelector((state: any) => state.user.value);
  const { MessageBox, setFormMessage } = formReturnMessage();
  const { allRequest } = ReusableMethods();
  const [defaultYear, setDefaultYear] = useState(2024);
  const initialNumberOfPersonnel = {
    supervisor: 0,
    operator_staff: 0,
    quality_control: 0,
  };
  const [values, setValues] = useState(initialNumberOfPersonnel);
  const [totalHours, setTotalHours] = useState(0);
  const [week, setWeek] = useState(1);
  const [weeklyTotalHoursWorked, setWeeklyTotalHoursWorked] = useState(40);

  const { t } = useTranslation();
  const pageTitle = t("staffing_of_production");

  const computTotalWorkHours = (e: any, field: string) => {
    setValues((prev) => {
      const updatedValues = { ...prev };
      updatedValues[field] = e.target.value;

      setTotalHours(
        Object.values(updatedValues).reduce(
          (sum, value) => sum * 1 + value * 1 * weeklyTotalHoursWorked,
          0
        )
      );
      return updatedValues;
    });
  };
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
          <div className="flex border-b justify-between  border-stroke py-2 px-3 dark:border-strokedark">
            <h3 className="text-md left-content uppercase text-black dark:text-white items-start">
              {t("staffing_of_production")}
            </h3>
          </div>

          <div className="">
            <MessageBox />

            <form
              onSubmit={(e) =>
                formSubmit({
                  event: e,
                  action_url: "staffingproduction",
                  method: "POST",
                  formId: "new_staffing_production",
                  formData: null,
                  contentType: "application/json",
                  authentication: user.token,
                  setIsLoading,
                  setReturnData: setFormMessage,
                })
              }
              method="POST"
              id="new_staffing_production"
              className="pb-5 items-center justify-center"
            >
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
                      defaultValue={week}
                      //   onChange={(e) =>
                      //     setCCPFollowUps((prev) => {
                      //       const updatedValues = { ...prev };
                      //       updatedValues["week"] = e.target.value; // Update PO Number field
                      //       return updatedValues;
                      //     })
                      //   }
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
                      //onBlur={() => handleCCPSummation(CCPFollowUp)}
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

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("weekly_total_hours_worked")}
                    </label>
                    <input
                      type="number"
                      defaultValue={weeklyTotalHoursWorked}
                      min="0"
                      name="weekly_total_hours_worked"
                      placeholder={t("hours_worked")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row text-sm">
                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("supervisor")}
                    </label>
                    <input
                      type="number"
                      name="supervisor"
                      placeholder={t("supervisor")}
                      //   onBlur={(e) =>
                      //     setWeek(getWeekNumber(new Date(e.target.value)))
                      //   }
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
                      onChange={(e) =>
                        computTotalWorkHours(e, "quality_control")
                      }
                      placeholder={t("control")}
                      //   onBlur={(e) =>
                      //     setWeek(getWeekNumber(new Date(e.target.value)))
                      //   }
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>
                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white">
                      {t("operator")}
                    </label>
                    <input
                      type="number"
                      name="operator_staff"
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
                      onChange={(e) => setTotalHours(e.target.value)}
                      name="total_hours"
                      placeholder={t("total_hours")}
                      //   onBlur={(e) =>
                      //     setWeek(getWeekNumber(new Date(e.target.value)))
                      //   }
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white">
                      {t("total_production")}
                    </label>
                    <input
                      type="number"
                      name="production_quantity"
                      placeholder={t("total_production")}
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
