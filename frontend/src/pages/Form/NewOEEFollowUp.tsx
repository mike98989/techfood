import React, { useEffect, useState } from "react";
import { DynamicInputFieldsCCPFollowUp } from "../../methods/DynamicInputFields"; // Import the hook
import { ReusableMethods } from "../../methods/ReusableMethods";
import SpinnerObject from "../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import formReturnMessage from "../../components/Forms/FormAlerts/formReturnMessage";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useTranslation } from "react-i18next";

export default function NewOEEFollowUp() {
  const { setIsLoading, Spinner } = SpinnerObject();
  const { formSubmit, getWeekNumber } = ReusableMethods();
  const user = useSelector((state: any) => state.user.value);
  const { MessageBox, setFormMessage } = formReturnMessage();
  const { allRequest } = ReusableMethods();
  const [defaultYear, setDefaultYear] = useState(2024);
  const initialNumberOfPersonnel = {
    total_working_hours_daily: 480,
    number_of_planned_break: 0,
    default_planned_break_in_min: 30,
    default_meal_break_in_min: 15,
    number_of_meal_break: 0,
    down_time_in_min: 0,
    planned_production_time: 0,
    operation_time: 0,
    total_planned_break: 0,
    total_meal_break: 0,
    total_quality_piece: 1,
    run_rate_in_ppm: 200,
    good_piece: 0,
    rejected_piece: 0,
    availability: 0,
    performance: 0,
    quality: 0,
    overall_oee: 0,
  };
  const [values, setValues] = useState(initialNumberOfPersonnel);

  const { t } = useTranslation();
  const pageTitle = t("oee_and_efficiency");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the state with new input value
    setValues((prevValues) => {
      const updatedValues = { ...prevValues, [name]: value };

      // Perform the calculation
      const total_planned_break =
        parseFloat(updatedValues.number_of_planned_break * 1) *
        parseFloat(updatedValues.default_planned_break_in_min * 1);

      const total_meal_break =
        parseFloat(updatedValues.number_of_meal_break * 1) *
        parseFloat(updatedValues.default_meal_break_in_min * 1);

      const planned_production_time = parseFloat(
        updatedValues.total_working_hours_daily * 1 -
          total_planned_break -
          total_meal_break
      );

      const operation_time =
        planned_production_time - updatedValues.down_time_in_min;
      const good_piece =
        updatedValues.total_quality_piece - updatedValues.rejected_piece;

      const availability = parseFloat(
        operation_time / planned_production_time
      ).toFixed(2);

      const performance = parseFloat(
        updatedValues.total_quality_piece /
          operation_time /
          updatedValues.run_rate_in_ppm
      ).toFixed(2);

      // const quality =
      // parseFloat(
      //   (good_piece / updatedValues.total_quality_piece) * 100
      // ).toFixed(2) + "%";

      const quality = parseFloat(
        good_piece / updatedValues.total_quality_piece
      ).toFixed(2);

      const overall_oee = parseFloat(
        availability * performance * quality
      ).toFixed(2);

      updatedValues["total_planned_break"] = total_planned_break;
      updatedValues["total_meal_break"] = total_meal_break;
      updatedValues["planned_production_time"] = planned_production_time;
      updatedValues["operation_time"] = operation_time;
      updatedValues["good_piece"] = good_piece;
      updatedValues["availability"] = availability;
      updatedValues["performance"] = performance;
      updatedValues["quality"] = quality;
      updatedValues["overall_oee"] = overall_oee;
      console.log(updatedValues);
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
              {t("oee_and_efficiency_title")}
            </h3>
          </div>

          <div className="">
            <MessageBox />

            <div
              className="p-4 mb-4 text-sm text-green-800 rounded-xs bg-cyan-50 dark:bg-black dark:text-whiten"
              role="alert"
            >
              <div className="w-full pl-4">
                <span className="font-medium">{t("oee_factor")}</span>
              </div>
              <div className="lg:flex flex-row ">
                <div className="lg:w-2/3 flex">
                  <div>
                    <ul className="mt-1.5 list-none list-inside">
                      <li className="flex flex-row">
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
                        {t("total_work_time_in_min") +
                          " (" +
                          t("day") +
                          ")"} = {values.total_working_hours_daily}
                      </li>

                      <li className="flex flex-row">
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
                        {t("total_planned_break")} ={" "}
                        {values.total_planned_break}
                      </li>
                      <li className="flex flex-row">
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
                        {t("total_meal_break")} = {values.total_meal_break}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="lg:w-1/3 flex">
                  <ul className="mt-1.5 list-none list-inside">
                    <li className="flex flex-row">
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
                      {t("planned_production_time")} ={" "}
                      {values.planned_production_time}
                    </li>

                    <li className="flex flex-row">
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
                      {t("operating_time")} = {values.operation_time}
                    </li>
                    <li className="flex flex-row">
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
                      {t("good_piece")} = {values.good_piece}
                    </li>
                  </ul>
                </div>
                <div className="lg:w-1/3 flex">
                  <ul className="mt-1.5 list-none list-inside">
                    <li className="flex flex-row">
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
                      {t("availability")} = {values.availability * 100}%
                    </li>

                    <li className="flex flex-row">
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
                      {t("performance")} = {values.performance * 100}%
                    </li>
                    <li className="flex flex-row">
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
                      {t("quality")} = {values.quality * 100}%
                    </li>
                  </ul>
                </div>
                <div className="lg:w-1/3 flex">
                  <ul className="mt-1.5 list-none list-inside">
                    <li className="flex flex-row">
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
                      {t("overall_oee")} = {values.overall_oee * 100}%
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <form
              onSubmit={(e) =>
                formSubmit({
                  event: e,
                  action_url: "oeefollowups",
                  method: "POST",
                  formId: "new_oee_followups",
                  formData: null,
                  contentType: "application/json",
                  authentication: user.token,
                  setIsLoading,
                  setReturnData: setFormMessage,
                })
              }
              method="POST"
              id="new_oee_followups"
              className="pb-5 items-center justify-center"
            >
              <div className="px-6.5">
                <Spinner />
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white">
                      {t("date")}
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      placeholder={t("date")}
                      //onChange={(e) => handleChange(e)}
                      defaultValue={values.total_working_hours_daily}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white">
                      {t("total_work_time_in_min")}
                    </label>
                    <input
                      type="number"
                      name="total_working_hours_daily"
                      min="0"
                      placeholder={t("total_work_time_in_min")}
                      onChange={(e) => handleChange(e)}
                      defaultValue={values.total_working_hours_daily}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("number_of_planned_break")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="number_of_planned_break"
                      required
                      onChange={(e) => handleChange(e)}
                      placeholder={t("number_of_planned_break")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>
                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("default_planned_break_in_min")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="default_planned_break_in_min"
                      required
                      defaultValue={values.default_planned_break_in_min}
                      placeholder={t("default_planned_break_in_min")}
                      onChange={(e) => handleChange(e)}
                      //   onChange={(e) => {
                      //     setValues((prev) => {
                      //       const updatedValues = { ...prev };
                      //       updatedValues["planned_break_in_min"] =
                      //         e.target.value;
                      //       return updatedValues;
                      //     });
                      //   }}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row text-sm">
                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("number_of_meal_break")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="number_of_meal_break"
                      required
                      placeholder={t("number_of_meal_break")}
                      onChange={(e) => handleChange(e)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>
                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("default_meal_break_in_min")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="default_meal_break_in_min"
                      required
                      defaultValue={values.default_meal_break_in_min}
                      placeholder={t("default_meal_break_in_min")}
                      onChange={(e) => handleChange(e)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>
                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("total_planned_break")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="total_planned_break"
                      required
                      readOnly
                      value={values.total_planned_break}
                      placeholder={t("total_planned_meal_break")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("total_meal_break")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="total_meal_break"
                      required
                      readOnly
                      value={values.total_meal_break}
                      placeholder={t("meal_break_time")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("down_time")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="down_time_in_min"
                      defaultValue={values.down_time_in_min}
                      onChange={(e) => handleChange(e)}
                      placeholder={t("down_time_in_min")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row text-sm">
                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("run_rate_in_ppm")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="run_rate_in_ppm"
                      onChange={(e) => handleChange(e)}
                      defaultValue={values.run_rate_in_ppm}
                      placeholder={t("run_rate_in_ppm")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>
                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white">
                      {t("total_quality")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="total_quality_piece"
                      onChange={(e) => handleChange(e)}
                      defaultValue={values.total_quality_piece}
                      placeholder={t("total_quality_piece")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white">
                      {t("rejected_piece")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      //onChange={(e) => setTotalHours(e.target.value)}
                      name="rejected_piece"
                      placeholder={t("rejected_piece")}
                      onChange={(e) => handleChange(e)}
                      defaultValue={values.rejected_piece}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white">
                      {t("planned_production_time")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      readOnly
                      value={values.planned_production_time}
                      //onChange={(e) => setTotalHours(e.target.value)}
                      name="planned_production_time"
                      placeholder={t("planned_production_time")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>
                </div>
                <div className="">
                  <div className="w-full xl:w-2/6">
                    <input
                      type="hidden"
                      name="operating_time"
                      value={values.operation_time}
                    />
                    <input
                      type="hidden"
                      name="good_piece"
                      value={values.good_piece}
                    />

                    <input
                      type="hidden"
                      name="availability"
                      value={values.availability * 100}
                    />
                    <input
                      type="hidden"
                      name="performance"
                      value={values.performance * 100}
                    />
                    <input
                      type="hidden"
                      name="quality"
                      value={values.quality * 100}
                    />
                    <input
                      type="hidden"
                      name="overall_oee"
                      value={values.overall_oee * 100}
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
