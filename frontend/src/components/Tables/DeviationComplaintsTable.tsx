import { Package } from "../../types/package";
import { httpRequest } from "../../methods/Requests";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SpinnerObject from "../Spinner/Spinner";
import { ReusableMethods } from "../../methods/ReusableMethods";
import formReturnMessage from "../Forms/FormAlerts/formReturnMessage";
import AlertModal from "../Modals/AlertModals";
import { useTranslation } from "react-i18next";
import { constant, PAGINATE_ITEM_COUNT } from "../../Utils/Constants";
import PaginationObject from "../Pagination/Paginate";

const DeviationComplaintsWater = () => {
  const { fetchApi } = httpRequest();
  const [deviationComplaintsData, setDeviationComplaintsData] = useState([]);
  const user = useSelector((state: any) => state.user.value);
  const { isLoading, setIsLoading, Spinner } = SpinnerObject();
  const { allRequest } = ReusableMethods();
  const { ModalUIComponent, setOpenModal, setModalQueryData } = AlertModal();
  const { t } = useTranslation();
  const { Paginate, currentPage, setCurrentPage, PaginateSpanHeader } =
    PaginationObject();

  //const { MessageBox, setFormMessage } = formReturnMessage();

  useEffect(() => {
    setIsLoading(true);
    allRequest({
      event: null,
      action_url:
        `deviationcomplaints?paginate=` +
        PAGINATE_ITEM_COUNT +
        `&page=${currentPage}`, // End Point
      method: "GET", // Method
      formId: "",
      formData: null,
      contentType: "application/json", //Content Type
      authentication: user.token,
      setIsLoading,
      setReturnData: setDeviationComplaintsData,
    });
  }, [currentPage]);
  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  return (
    <>
      <ModalUIComponent />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {!isLoading && (
          <div className="px-4 py-4">
            <PaginateSpanHeader
              totalPageItemCount={deviationComplaintsData.to}
              TotalItemCount={deviationComplaintsData.total}
            />
          </div>
        )}
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-3 font-thin text-sm text-black dark:text-white xl:pl-3">
                  #
                </th>
                <th className="py-2 px-2 text-xs text-black dark:text-white">
                  {t("header")}
                </th>
                <th className="py-2 px-2 text-xs text-black dark:text-white">
                  {t("date")}
                </th>

                <th className="py-2 px-2 text-xs text-black dark:text-white">
                  {t("deviation_type")}/{t("code")}
                </th>
                <th className="py-2 px-2 text-xs text-black dark:text-white">
                  {t("product")}
                </th>
                <th className="py-2 px-2 text-xs text-black dark:text-white">
                  {t("article")} {t("number")}
                </th>
                <th className="py-2 px-2 text-xs text-black dark:text-white">
                  {t("batch_number")}
                </th>
                <th className="py-2 px-2 text-xs text-black dark:text-white">
                  {t("location") + "/" + t("line")}
                </th>
                <th className="py-2 px-2 text-xs text-black dark:text-white">
                  {t("section")}
                </th>
                <th className="py-2 px-2 text-xs text-black dark:text-white">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {deviationComplaintsData?.data?.length > 0 &&
                deviationComplaintsData?.data?.map((input: any, key) => (
                  <tr key={key} className="even:bg-gray-2 dark:even:bg-boxdark">
                    <td className="text-sm border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3">
                      {deviationComplaintsData.from + key}
                    </td>

                    <td className="border-b border-[#eee] py-2 px-2 pl-3 dark:border-strokedark">
                      <h5 className="text-sm font-bold text-black dark:text-white">
                        {input.reference_number + " - " + input.title}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-2 px-1 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {input.occurance_date.split("T")[0]}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-2 px-1 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {t(input.deviation.name_key)} / {t(input.code.name_key)}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-2 px-1 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {t(input.product.name_key)}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-2 px-1 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {input.article_no}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-2 px-1 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {input.batch_no}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-2 px-1 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {t(input.location.name_key)}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-2 px-1 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {t(input.section.name_key)}
                      </p>
                    </td>

                    <td className="border-b border-[#eee] py-2 px-1 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button
                          onClick={() => {
                            setOpenModal(true),
                              setModalQueryData({
                                modalType: "form",
                                modalSize: "lg",
                                modalData: {
                                  form: "EditDeviationComplaint",
                                  data: input,
                                },
                              });
                          }}
                          className="hover:text-primary"
                        >
                          <svg
                            className="w-[24px] h-[24px] text-gray-800 dark:text-white hover:text-primary"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="0.5"
                              d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                            />
                          </svg>
                        </button>
                        <button
                          className="hover:text-primary"
                          onClick={() => {
                            setOpenModal(true),
                              setModalQueryData({
                                modalType: "delete",
                                modalSize: "sm",
                                modalData: {
                                  index: key,
                                  endPoint: "deviationcomplaints/" + input.id,
                                  action: "DELETE",
                                  token: user.token,
                                  title:
                                    input.reference_number + ", " + input.title,
                                  data: deviationComplaintsData,
                                  setData: setDeviationComplaintsData,
                                },
                              });
                          }}
                        >
                          <svg
                            className="fill-current"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                              fill=""
                            />
                            <path
                              d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                              fill=""
                            />
                            <path
                              d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                              fill=""
                            />
                            <path
                              d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                              fill=""
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

              {!isLoading && deviationComplaintsData?.data?.length == 0 && (
                <tr>
                  <td
                    className="text-md text-center border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3"
                    colSpan={10}
                  >
                    {t("no_record_found")}
                  </td>
                </tr>
              )}

              {isLoading && deviationComplaintsData?.data?.length == 0 && (
                <tr>
                  <td
                    className="text-md text-center border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3"
                    colSpan={10}
                  >
                    <Spinner /> Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="pl-3 pt-2">
            {!isLoading && (
              <div className="px-4 py-4">
                <PaginateSpanHeader
                  totalPageItemCount={deviationComplaintsData.to}
                  TotalItemCount={deviationComplaintsData.total}
                />
              </div>
            )}
            <Spinner />
            <Paginate
              currentPage={deviationComplaintsData.current_page}
              totalPages={deviationComplaintsData.last_page}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeviationComplaintsWater;
