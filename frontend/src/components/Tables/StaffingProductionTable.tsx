import { Package } from "../../types/package";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SpinnerObject from "../Spinner/Spinner";
import { ReusableMethods } from "../../methods/ReusableMethods";
import AlertModal from "../Modals/AlertModals";
import { useTranslation } from "react-i18next";
const computValues = (values: any[], setSortedStaffingProduction: any) => {
  console.log("values", values);
  //const dataArray: string[] = [];
  const groupedData = values.reduce((acc, item) => {
    // Check if the week already exists in the accumulator
    const key = item.year + "-week-" + item.week;

    if (!acc[key]) {
      acc[key] = {
        sum_all_quality_control_hours: 0,
        percent_quality_control_hours: 0,
        sum_all_supervisor_hours: 0,
        percent_supervisor_hours: 0,
        sum_all_weekly_total_hours: 0,
        percent_operator_staff_hours: 0,
        sum_all_operator_staff_hours: 0,
        sum_all_production_quantity: 0,
        sum_total_number_of_workers: 0,
        efficiency: 0,
        productivity: 0,
        data: [],
      };
    }
    //dataArray.push(item);
    acc[key].data.push(item);
    acc[key].sum_all_weekly_total_hours += item.total_hours;
    acc[key].sum_all_production_quantity += parseInt(item.production_quantity);
    acc[key].sum_total_number_of_workers +=
      item.supervisor + item.quality_control + item.operator_staff;
    acc[key].sum_all_supervisor_hours +=
      item.weekly_total_hours_worked * item.supervisor;
    acc[key].sum_all_quality_control_hours +=
      item.weekly_total_hours_worked * item.quality_control;

    /////According to the formular saturdays and sundays have a different formular
    //if (item.day != "saturday" && item.day != "sunday") {
    acc[key].sum_all_operator_staff_hours +=
      item.weekly_total_hours_worked * item.operator_staff;

    //hours_for_work_and_clean+=item.
    //}

    acc[key].percent_supervisor_hours = Math.floor(
      (acc[key].sum_all_supervisor_hours /
        acc[key].sum_all_weekly_total_hours) *
        100
    );
    acc[key].percent_quality_control_hours = Math.floor(
      (acc[key].sum_all_quality_control_hours /
        acc[key].sum_all_weekly_total_hours) *
        100
    );

    acc[key].percent_quality_control_hours = Math.ceil(
      (acc[key].sum_all_quality_control_hours /
        acc[key].sum_all_weekly_total_hours) *
        100
    );

    acc[key].percent_operator_staff_hours = Math.ceil(
      (acc[key].sum_all_operator_staff_hours /
        acc[key].sum_all_weekly_total_hours) *
        100
    );

    acc[key].efficiency = parseFloat(
      (
        acc[key].sum_all_production_quantity /
        acc[key].sum_total_number_of_workers
      ).toFixed(1)
    ); //// Round up to 1 decimal place

    acc[key].productivity = parseFloat(
      (
        acc[key].sum_all_production_quantity /
        acc[key].sum_all_weekly_total_hours
      ).toFixed(1)
    ); //// Round up to 1 decimal place

    return acc;
  }, {});

  //   const nestedArray = Object.entries(obj).map(([key, value]) => ({
  //     key,
  //     ...value,
  //   }));

  /// Convert to an array of objects
  const formattedData = Object.entries(groupedData).map(([key, value]) => ({
    key,
    ...value,
  }));
  console.log("result is ", formattedData);
  setSortedStaffingProduction(formattedData);
  //return formattedData;
};

const StaffingProduction = () => {
  const [staffingProduction, setStaffingProduction] = useState([]);
  const [sortedStaffingProduction, setSortedStaffingProduction] = useState([]);
  const user = useSelector((state: any) => state.user.value);
  const { isLoading, setIsLoading, Spinner } = SpinnerObject();
  const { allRequest } = ReusableMethods();
  const { ModalUIComponent, setOpenModal, setModalQueryData } = AlertModal();
  const { t } = useTranslation();

  //const { MessageBox, setFormMessage } = formReturnMessage();

  useEffect(() => {
    setIsLoading(true);
    allRequest({
      event: null,
      action_url: "staffingproduction", // End Point
      method: "GET", // Method
      formId: "",
      formData: null,
      contentType: "application/json", //Content Type
      authentication: user.token,
      setIsLoading,
      setReturnData: setStaffingProduction,
    });
  }, []);

  useEffect(() => {
    if (staffingProduction.length > 1) {
      //////Sort the Data first
      const year = new Date().getFullYear();
      const data: string[] = staffingProduction
        .filter((value: any) => value.year == year)
        .sort((a: any, b: any) => a.week - b.week);
      computValues(data, setSortedStaffingProduction);
      //   console.log("computed is " + computed);
      //   setSortedStaffingProduction(computed);
    }
  }, [staffingProduction]);

  return (
    <>
      <ModalUIComponent />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <td className="text-xs font-bold text-black dark:text-white items-center py-4 px-3 xl:pl-3">
                  {t("#")}
                </td>
                <td className="text-xs font-bold text-black dark:text-white items-center py-4 px-3 xl:pl-3 border-b border-[#eee] dark:border-strokedark">
                  {t("week")}
                </td>

                <td className="text-xs font-bold text-black dark:text-white items-centerpy-4 px-3 xl:pl-3 border-b border-[#eee] dark:border-strokedark">
                  {t("supervisor")}
                </td>
                <td className="text-xs font-bold text-black dark:text-white  items-center py-4 px-3 xl:pl-3 border-b border-[#eee] dark:border-strokedark">
                  {t("control")}
                </td>
                <td className="text-xs font-bold text-black dark:text-white  items-center py-4 px-3 xl:pl-3 border-b border-[#eee] dark:border-strokedark">
                  {t("operator")}
                </td>

                <td className="text-xs font-bold text-black dark:text-white items-center py-4 px-3 xl:pl-3 border-b border-[#eee] dark:border-strokedark">
                  {t("total_workers")}
                </td>

                <td className="text-xs font-bold text-black dark:text-white items-center py-4 px-3 xl:pl-3 border-b border-[#eee] dark:border-strokedark">
                  {t("total_hours")}
                </td>
                <td className="text-xs font-bold text-black dark:text-white items-center py-4 px-3 xl:pl-3 border-b border-[#eee] dark:border-strokedark">
                  {t("total_production")}
                </td>
                <td className="text-xs font-bold text-black dark:text-white items-center py-4 px-3 xl:pl-3 border-b border-[#eee] dark:border-strokedark">
                  {t("efficiency")}
                </td>
                <td className="text-xs font-bold text-black dark:text-white items-center py-4 px-3 xl:pl-3 border-b border-[#eee] dark:border-strokedark">
                  {t("productivity")}
                </td>
              </tr>
            </thead>
            <tbody>
              {sortedStaffingProduction?.length > 0 &&
                sortedStaffingProduction.map((input: any, index: any) => (
                  <tr
                    key={index}
                    className="border-b border-[#eee] dark:border-strokedark even:bg-gray-2 dark:even:bg-boxdark"
                  >
                    <td className="text-xs text-black dark:text-white items-center  py-4 px-3 xl:pl-3">
                      {index + 1}
                    </td>
                    <td className="text-xs text-black dark:text-white items-center py-4 px-3 xl:pl-3">
                      {input.key}
                      <br />
                      <button
                        type="button"
                        onClick={() => {
                          setOpenModal(true),
                            setModalQueryData({
                              modalType: "form",
                              modalSize: "lg",
                              modalData: {
                                form: "StaffingProductionModal",
                                data: input,
                              },
                            });
                        }}
                        className="flex flex-row px-2 py-1 text-xs font-xs text-center text-white bg-cyan-700 rounded-lg hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                      >
                        <svg
                          className="w-4 h-4 text-white dark:text-black mr-1"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                          />
                          <path
                            stroke="currentColor"
                            strokeWidth="2"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>{" "}
                        {t("details")}
                      </button>
                    </td>

                    <td className="text-xs text-black dark:text-white items-center py-4 px-3 xl:pl-3">
                      {input.percent_supervisor_hours}%
                    </td>
                    <td className="text-xs text-black dark:text-white  items-center py-4 px-3 xl:pl-3">
                      {input.percent_quality_control_hours}%
                    </td>
                    <td className="text-xs text-black dark:text-white  items-center py-4 px-3 xl:pl-3">
                      {input.percent_operator_staff_hours}%
                    </td>
                    <td className="text-xs text-black dark:text-white items-center py-4 px-3 xl:pl-3">
                      {input.sum_total_number_of_workers}
                    </td>

                    <td className="text-xs text-black dark:text-white items-center py-4 px-3 xl:pl-3">
                      {input.sum_all_weekly_total_hours}
                    </td>
                    <td className="text-xs text-black dark:text-white items-center py-4 px-3 xl:pl-3">
                      {input.sum_all_production_quantity}
                    </td>
                    <td className="text-xs text-black dark:text-white items-center py-4 px-3 xl:pl-3">
                      {(input.efficiency / 100).toFixed(1)} %
                    </td>
                    <td className="text-xs text-black dark:text-white items-center py-4 px-3 xl:pl-3">
                      {input.productivity}%
                    </td>
                  </tr>
                ))}
              {!isLoading && sortedStaffingProduction?.length == 0 && (
                <tr>
                  <td
                    className="text-md text-center border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3"
                    colSpan={9}
                  >
                    {t("no_record_found")}
                  </td>
                </tr>
              )}

              {isLoading && sortedStaffingProduction?.length == 0 && (
                <tr>
                  <td
                    className="text-md text-center border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3"
                    colSpan={9}
                  >
                    <Spinner /> Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StaffingProduction;
