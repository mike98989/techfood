import React, { useEffect, useState } from "react";
import { DynamicInputFieldsCCPFollowUp } from "../../methods/DynamicInputFields"; // Import the hook
import { ReusableMethods } from "../../../methods/ReusableMethods";
import SpinnerObject from "../../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import formReturnMessage from "../../../components/Forms/FormAlerts/formReturnMessage";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import { useTranslation } from "react-i18next";
import { httpRequest } from "../../../methods/Requests";

export default function EditOEEFollowUp(props: any) {
  const { setIsLoading, Spinner } = SpinnerObject();
  //const { formSubmit, getWeekNumber } = ReusableMethods();
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
    operating_time: 0,
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
  const [values, setValues] = useState(props.componentData);
  const { t } = useTranslation();
  const pageTitle = t("oee_follow_up_title");
  const { fetchApi } = httpRequest();

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

      const operating_time =
        planned_production_time - updatedValues.down_time_in_min;
      const good_piece =
        updatedValues.total_quality_piece - updatedValues.rejected_piece;

      const availability = (
        parseFloat(operating_time / planned_production_time) * 100
      ).toFixed(2);

      const performance = (
        parseFloat(
          updatedValues.total_quality_piece /
            operating_time /
            updatedValues.run_rate_in_ppm
        ) * 100
      ).toFixed(2);

      const quality = (
        parseFloat(good_piece / updatedValues.total_quality_piece) * 100
      ).toFixed(2);

      const overall_oee = (
        parseFloat(availability * performance * quality) / 10000
      ).toFixed(2);

      updatedValues["total_planned_break"] = total_planned_break;
      updatedValues["total_meal_break"] = total_meal_break;
      updatedValues["planned_production_time"] = planned_production_time;
      updatedValues["operating_time"] = operating_time;
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
      <div className=" dark:bg-boxdark">
        <div className="border-b border-stroke py-2 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white pl-3">
            {t("update") + " " + t("oee_follow_up") + " " + t("values")}
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
              <div className="lg:w-2/4 flex">
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
                      {t("total_work_time_in_min")} ={" "}
                      {values.total_working_hours_daily}
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
                      {t("total_planned_break")} = {values.total_planned_break}
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
                      {t("operating_time")} = {values.operating_time}
                    </li>
                  </ul>
                </div>
              </div>

              <div className="lg:w-2/4 flex">
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
                    {t("good_piece")} = {values.good_piece}
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
                    {t("availablity")} = {values.availability}%
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
                    {t("performance")} = {values.performance}%
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
                    {t("quality")} = {values.quality}%
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
                    {t("overall_oee")} = {values.overall_oee}%
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsLoading(true);
              fetchApi({
                url: "oeefollowups/" + values.id, // End Point
                method: "PUT", // Method
                formData: values,
                contentType: "application/json", //Content Type
                authentication: user.token,
              })
                .then((response_value: any) => {
                  const response = JSON.parse(response_value);
                  setIsLoading(false);
                  if (response.status == "1") {
                    //setOpenModal(false);
                    setValues({});
                    setFormMessage({
                      message: response.message,
                      status: "success",
                    });
                    setTimeout(() => {
                      window.location.reload();
                    }, 1500);
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
            id="editOEEFollowUp"
            method="POST"
          >
            <div className="px-6.5">
              <Spinner />
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-2/6">
                  <label className="mb-1 block text-black dark:text-white text-sm">
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
                    defaultValue={values.number_of_planned_break}
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
                    {t("no_of_meal_break")}
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="number_of_meal_break"
                    required
                    defaultValue={values.number_of_meal_break}
                    placeholder={t("no_of_meal_break")}
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
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row text-sm">
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
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row text-sm">
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

              <div className="flex flex-row justify-center">
                <button
                  type="submit"
                  className="text-white bg-gradient-to-br from-cyan-600 to-cyan-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-2 mb-3"
                >
                  <Spinner />
                  {t("save")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
