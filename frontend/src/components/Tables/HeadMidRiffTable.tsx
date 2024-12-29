import { Package } from "../../types/package";
import { httpRequest } from "../../methods/Requests";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SpinnerObject from "../Spinner/Spinner";
import { ReusableMethods } from "../../methods/ReusableMethods";
import formReturnMessage from "../Forms/FormAlerts/formReturnMessage";
import AlertModal from "../Modals/AlertModals";
import { useTranslation } from "react-i18next";
import Badge from "../Badges/Badge";
import { PAGINATE_ITEM_COUNT } from "../../Utils/Constants";
import PaginationObject from "../Pagination/Paginate";
import SearchObject from "../Search/SearchComponent";

import { DynamicInputFieldsSettings } from "../../methods/DynamicInputFields";

const HeadMidriff = () => {
  const [headMidriffData, setHeadMidriffData] = useState([]);
  const user = useSelector((state: any) => state.user.value);
  const { isLoading, setIsLoading, Spinner } = SpinnerObject();
  const { allRequest } = ReusableMethods();
  const { ModalUIComponent, setOpenModal, setModalQueryData } = AlertModal();
  const { t } = useTranslation();
  const { settings, setSettings } = DynamicInputFieldsSettings();
  const { Paginate, currentPage, setCurrentPage, PaginateSpanHeader } =
    PaginationObject();
  const { SearchComponent, searchData, searchParams } = SearchObject({
    autoLoadApi: "fruit_production_form_related_data",
    dateRange: true,
    proteinLactoseWaterLimit: false,
    aerobicEnterobactaLimit: false,
    aerobicEcoliStaphylococcusLimit: true,
    causes: false,
    statuses: false,
    deviationTypes: false,
    sections: false,
    products: false,
    oee: false,
    locations: true,
    dangers: false,
  });
  const [queryParams, setQueryParams] = useState(
    "?paginate=" + PAGINATE_ITEM_COUNT
  );
  const [endPoint, setEndPoint] = useState("headmidriffs");

  useEffect(() => {
    setIsLoading(true);
    let url = endPoint + queryParams;
    if (searchParams) {
      url = endPoint + "/search" + queryParams;
    }
    allRequest({
      event: null,
      action_url: url + `&page=${currentPage}`, // End Point
      method: "GET", // Method
      formId: "",
      formData: null,
      contentType: "application/json", //Content Type
      authentication: user.token,
      setIsLoading,
      setReturnData: setHeadMidriffData,
    });
  }, [currentPage]);

  useEffect(() => {
    searchData?.data && setHeadMidriffData(searchData);
  }, [searchData]);

  useEffect(() => {
    user.data?.settings &&
      setSettings(JSON.parse(user.data?.settings.settings));
  }, [user.data?.settings]);

  const handlePageChange = (page: any) => {
    searchParams && setQueryParams(searchParams);
    setCurrentPage(page);
  };
  return (
    <>
      <ModalUIComponent />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {!isLoading && (
          <div className="px-4 py-4">
            <PaginateSpanHeader
              totalPageItemCount={headMidriffData.to}
              TotalItemCount={headMidriffData.total}
            />
          </div>
        )}
        <SearchComponent endpoint={endPoint} />

        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="py-4 px-3 text-xs font-bold text-black dark:text-white xl:pl-3">
                  #
                </th>
                <th className="py-2 px-2 text-xs font-bold text-black dark:text-white">
                  {t("slaughter_number")}
                </th>
                <th className="py-2 px-2 text-xs font-bold text-black dark:text-white">
                  {t("week")}
                </th>
                <th className="py-2 px-2 text-xs font-bold text-black dark:text-white">
                  {t("slaughter_house")}
                </th>
                <th className="py-2 px-2 text-xs font-bold text-black dark:text-white">
                  {t("product")}
                </th>
                <th className="py-2 px-2 text-xs font-bold text-black dark:text-white">
                  {t("slaughter_date")}
                </th>
                <th className="py-2 px-2 text-xs font-bold text-black dark:text-white">
                  {t("kind_of_animal")}
                </th>
                <th className="py-2 px-2 text-sm font-bold text-black dark:text-white">
                  {t("aerobic")} <br />
                  <span className="text-xs text-cyan-800 dark:text-white">
                    {t("limit") + " = " + settings.aerobicConstantLimit}
                  </span>
                </th>
                <th className="py-2 px-2 text-xs font-bold text-black dark:text-white">
                  {t("e_coli")} <br />
                  <span className="text-xs text-cyan-800 dark:text-white">
                    {t("limit") + " = " + settings.ecoliConstantLimit}
                  </span>
                </th>
                <th className="py-2 px-2 text-sm font-bold text-black dark:text-white">
                  {t("staphylococcus")} <br />
                  <span className="text-xs text-cyan-800 dark:text-white">
                    {t("limit") + " = " + settings.staphylococcusConstantLimit}
                  </span>
                </th>
                <th className="py-2 px-2 text-xs font-bold text-black dark:text-white">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody>
              {headMidriffData?.data?.length > 0 &&
                headMidriffData?.data?.map((input: any, key) => (
                  <tr key={key} className="even:bg-gray-2 dark:even:bg-boxdark">
                    <td className="text-sm border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3">
                      {headMidriffData.from + key}
                    </td>
                    <td className="border-b border-[#eee] py-2 px-2 pl-3 dark:border-strokedark">
                      <h5 className="text-sm text-black dark:text-white">
                        {input.slaughter_number}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-2 px-2 pl-3 dark:border-strokedark">
                      <h5 className="text-sm text-black dark:text-white">
                        {input.week}
                      </h5>
                    </td>
                    <td className="border-b border-[#eee] py-2 px-1 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {input.slaughter_house}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-2 px-1 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {t(input.product.name_key)}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-2 px-1 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {input.slaughter_date}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-2 px-1 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white">
                        {t(input.animal.name_key)}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-2 px-1 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white flex">
                        <span className="text-xs mr-1">{input.aerobic}</span>
                        <br />
                        {parseFloat(input.aerobic) >
                          settings.aerobicConstantLimit && (
                          <Badge
                            type="danger"
                            value={t(settings.unApprovedText)}
                          />
                        )}
                        {parseFloat(input.aerobic) <=
                          settings.aerobicConstantLimit && (
                          <Badge type="1" value={t(settings.approvedText)} />
                        )}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-2 px-1 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white flex">
                        <span className="text-xs mr-1">{input.e_coli}</span>
                        <br />
                        {parseFloat(input.e_coli) >
                          settings.ecoliConstantLimit && (
                          <Badge
                            type="danger"
                            value={t(settings.unApprovedText)}
                          />
                        )}
                        {parseFloat(input.e_coli) <=
                          settings.ecoliConstantLimit && (
                          <Badge type="1" value={t(settings.approvedText)} />
                        )}
                      </p>
                    </td>
                    <td className="border-b border-[#eee] py-2 px-1 dark:border-strokedark">
                      <p className="text-sm text-black dark:text-white flex">
                        <span className="text-xs mr-1">
                          {input.staphylococcus}
                        </span>
                        <br />
                        {parseFloat(input.staphylococcus) >
                          settings.staphylococcusConstantLimit && (
                          <Badge
                            type="danger"
                            value={t(settings.unApprovedText)}
                          />
                        )}
                        {parseFloat(input.staphylococcus) <=
                          settings.staphylococcusConstantLimit && (
                          <Badge type="1" value={t(settings.approvedText)} />
                        )}
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
                                  form: "EditHeadMidriff",
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
                                  endPoint: "headmidriffs/" + input.id,
                                  action: "DELETE",
                                  token: user.token,
                                  title:
                                    t(input.product.name_key) +
                                    ", - " +
                                    t("aerobic") +
                                    " = " +
                                    input.aerobic +
                                    " ," +
                                    t("e_coli") +
                                    " = " +
                                    t(input.e_coli) +
                                    " ," +
                                    t("staphylococcus") +
                                    " = " +
                                    t(input.staphylococcus),
                                  data: headMidriffData,
                                  setData: setHeadMidriffData,
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

              {!isLoading && headMidriffData?.data?.length == 0 && (
                <tr>
                  <td
                    className="text-md text-center border-b border-[#eee] py-3 px-2 pl-1 dark:border-strokedark xl:pl-3"
                    colSpan={10}
                  >
                    {t("no_record_found")}
                  </td>
                </tr>
              )}

              {isLoading && headMidriffData?.data?.length == 0 && (
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
          <div className="pl-3 pt-2">
            {!isLoading && (
              <div className="px-4 py-4">
                <PaginateSpanHeader
                  totalPageItemCount={headMidriffData.to}
                  TotalItemCount={headMidriffData.total}
                />
              </div>
            )}
            <Spinner />
            <Paginate
              currentPage={headMidriffData.current_page}
              totalPages={headMidriffData.last_page}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeadMidriff;
