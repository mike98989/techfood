import { Package } from "../../types/package";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SpinnerObject from "../Spinner/Spinner";
import { ReusableMethods } from "../../methods/ReusableMethods";
import AlertModal from "../Modals/AlertModals";
import { useTranslation } from "react-i18next";
const computValues = (values: any[], setSortedProductivityFollowUp: any) => {
  console.log("values", values);
  //const dataArray: string[] = [];
  const groupedData = values.reduce((acc, item) => {
    // Check if the week already exists in the accumulator
    const key = item.year + "-week-" + item.week;

    if (!acc[key]) {
      acc[key] = {
        sum_all_total_available_hours: 0,
        sum_all_production_hours: 0,
        weekly_target: 0,
        sum_all_output_per_day: 0,
        sum_all_lamb: 0,
        sum_all_pork: 0,
        sum_all_beef: 0,
        sum_all_ack_target_qty: 0,
        sum_all_ack_output_qty: 0,
        sum_all_ack_target_time: 0,
        sum_all_ack_output_time: 0,
        data: [],
      };
    }

    //dataArray.push(item);
    acc[key].data.push(item);
    acc[key].sum_all_total_available_hours += item.total_available_hours;
    acc[key].sum_all_production_hours += parseInt(
      item.available_production_hours
    );
    acc[key].weekly_target = item.weekly_target;
    acc[key].weekly_rate = item.weekly_rate;
    acc[key].sum_all_lamb += item.lamb;
    acc[key].sum_all_pork += item.pork;
    acc[key].sum_all_beef += item.beef;
    acc[key].sum_all_ack_target_qty += item.ack_target_qty;
    acc[key].sum_all_ack_output_qty += item.ack_output_qty;
    acc[key].sum_all_ack_target_time += item.ack_target_time;
    acc[key].sum_all_ack_output_time += item.ack_output_time;
    acc[key].sum_all_output_per_day += item.output_per_day;
    return acc;
  }, {});

  /// Convert to an array of objects
  const formattedData = Object.entries(groupedData).map(([key, value]) => ({
    key,
    ...value,
  }));
  console.log("result is ", formattedData);
  setSortedProductivityFollowUp(formattedData);
  //return formattedData;
};

const ProductivityFollowUp = () => {
  const [productivityFollowUp, setProductivityFollowUp] = useState([]);
  const [sortedProductivityFollowUp, setSortedProductivityFollowUp] = useState(
    []
  );
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
      action_url: `productivityfollowups?paginate=all`, // End Point
      method: "GET", // Method
      formId: "",
      formData: null,
      contentType: "application/json", //Content Type
      authentication: user.token,
      setIsLoading,
      setReturnData: setProductivityFollowUp,
    });
  }, []);

  useEffect(() => {
    if (productivityFollowUp.length > 1) {
      //////Sort the Data first
      const year = new Date().getFullYear();
      const data: string[] = productivityFollowUp.sort(
        (a: any, b: any) => a.week - b.week
      );
      computValues(data, setSortedProductivityFollowUp);
    }
  }, [productivityFollowUp]);

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
                  {t("weekly_target")}
                </td>
                <td className="text-xs font-bold text-black dark:text-white items-centerpy-4 px-3 xl:pl-3 border-b border-[#eee] dark:border-strokedark">
                  {t("weekly_output")}
                </td>
                <td className="text-xs font-bold text-black dark:text-white items-centerpy-4 px-3 xl:pl-3 border-b border-[#eee] dark:border-strokedark">
                  {t("weekly_rate")}
                </td>
                <td className="text-xs font-bold text-black dark:text-white  items-center py-4 px-3 xl:pl-3 border-b border-[#eee] dark:border-strokedark">
                  {t("available_hours")}
                </td>
                <td className="text-xs font-bold text-black dark:text-white  items-center py-4 px-3 xl:pl-3 border-b border-[#eee] dark:border-strokedark">
                  {t("production_hours")}
                </td>

                <td className="text-xs font-bold text-black dark:text-white items-center py-4 px-3 xl:pl-3 border-b border-[#eee] dark:border-strokedark">
                  {t("lamb")}
                </td>

                <td className="text-xs font-bold text-black dark:text-white items-center py-4 px-3 xl:pl-3 border-b border-[#eee] dark:border-strokedark">
                  {t("pork")}
                </td>
                <td className="text-xs font-bold text-black dark:text-white items-center py-4 px-3 xl:pl-3 border-b border-[#eee] dark:border-strokedark">
                  {t("beef")}
                </td>
                <td className="text-xs font-bold text-black dark:text-white items-center py-4 px-3 xl:pl-3 border-b border-[#eee] dark:border-strokedark">
                  {t("ack_target_qty")}
                </td>
                <td className="text-xs font-bold text-black dark:text-white items-center py-4 px-3 xl:pl-3 border-b border-[#eee] dark:border-strokedark">
                  {t("ack_output_qty")}
                </td>
                <td className="text-xs font-bold text-black dark:text-white items-center py-4 px-3 xl:pl-3 border-b border-[#eee] dark:border-strokedark">
                  {t("ack_target_time")}
                </td>
                <td className="text-xs font-bold text-black dark:text-white items-center py-4 px-3 xl:pl-3 border-b border-[#eee] dark:border-strokedark">
                  {t("ack_output_time")}
                </td>
              </tr>
            </thead>
            <tbody>
              {sortedProductivityFollowUp?.length > 0 &&
                sortedProductivityFollowUp.map((input: any, index: any) => (
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
                              modalSize: "2xl",
                              modalData: {
                                form: "ProductivityFollowUpModal",
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
                      {input.weekly_target}
                    </td>
                    <td className="text-xs text-black dark:text-white items-center py-4 px-3 xl:pl-3">
                      {input.sum_all_output_per_day}
                    </td>
                    <td className="text-xs text-black dark:text-white items-center py-4 px-3 xl:pl-3">
                      {input.weekly_rate}
                    </td>
                    <td className="text-xs text-black dark:text-white  items-center py-4 px-3 xl:pl-3">
                      {input.sum_all_total_available_hours}
                    </td>
                    <td className="text-xs text-black dark:text-white  items-center py-4 px-3 xl:pl-3">
                      {input.sum_all_production_hours}
                    </td>
                    <td className="text-xs text-black dark:text-white items-center py-4 px-3 xl:pl-3">
                      {input.sum_all_lamb}
                    </td>

                    <td className="text-xs text-black dark:text-white items-center py-4 px-3 xl:pl-3">
                      {input.sum_all_pork}
                    </td>
                    <td className="text-xs text-black dark:text-white items-center py-4 px-3 xl:pl-3">
                      {input.sum_all_beef}
                    </td>
                    <td className="text-xs text-black dark:text-white items-center py-4 px-3 xl:pl-3">
                      {input.sum_all_ack_target_qty}
                    </td>
                    <td className="text-xs text-black dark:text-white items-center py-4 px-3 xl:pl-3">
                      {input.sum_all_ack_output_qty}
                    </td>
                    <td className="text-xs text-black dark:text-white items-center py-4 px-3 xl:pl-3">
                      {input.sum_all_ack_target_time}
                    </td>
                    <td className="text-xs text-black dark:text-white items-center py-4 px-3 xl:pl-3">
                      {input.sum_all_ack_output_time}
                    </td>
                  </tr>
                ))}
              {!isLoading && sortedProductivityFollowUp?.length == 0 && (
                <tr>
                  <td
                    className="text-md text-center border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3"
                    colSpan={12}
                  >
                    {t("no_record_found")}
                  </td>
                </tr>
              )}

              {isLoading && sortedProductivityFollowUp?.length == 0 && (
                <tr>
                  <td
                    className="text-md text-center border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3"
                    colSpan={12}
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

export default ProductivityFollowUp;
