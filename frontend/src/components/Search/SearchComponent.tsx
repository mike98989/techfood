import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { httpRequest } from "../../methods/Requests";
import { settings } from "../../Utils/Constants";
import SpinnerObject from "../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import { ReusableMethods } from "../../methods/ReusableMethods";
import { PAGINATE_ITEM_COUNT } from "../../Utils/Constants";
import { Form } from "react-router-dom";
import { DynamicInputFieldsSettings } from "../../methods/DynamicInputFields";

const searchObject = ({
  autoLoadApi,
  dateRange,
  proteinLactoseWaterLimit,
  aerobicEnterobactaLimit,
  aerobicEcoliStaphylococcusLimit,
  statuses,
  causes,
  deviationTypes,
  sections,
  products,
  oee,
  dangers,
  locations,
}: {
  autoLoadApi: string;
  dateRange: boolean;
  proteinLactoseWaterLimit: boolean;
  aerobicEnterobactaLimit: boolean;
  aerobicEcoliStaphylococcusLimit: boolean;
  statuses: boolean;
  causes: boolean;
  deviationTypes: boolean;
  sections: boolean;
  products: boolean;
  oee: boolean;
  dangers: boolean;
  locations: boolean;
}) => {
  const { t } = useTranslation();
  const [searchData, setSearchData] = useState({});
  const { setIsLoading, Spinner } = SpinnerObject();
  const { fetchApi } = httpRequest();
  const user = useSelector((state: any) => state.user.value);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [satisfactoryOrNot, setSatisfactoryOrNot] = useState();
  const [column, setColumn] = useState();
  const [searchParams, setSearchParams] = useState();
  const { settings, setSettings } = DynamicInputFieldsSettings();
  const [cause, setCause] = useState();
  const [status, setStatus] = useState();
  const [deviationType, setDeviationType] = useState();
  const [section, setSection] = useState();
  const [product, setProduct] = useState();
  const [availability, setAvailablity] = useState();
  const [performance, setPerformance] = useState();
  const [quality, setQuality] = useState();
  const [danger, setDanger] = useState();
  const [location, setLocation] = useState();
  const [overallOEE, setOverallOEE] = useState();
  const [comparisonOperator, setComparisonOperator] = useState("");
  const [returnDataArray, setReturnDataArray] = useState([]);
  const { allRequest } = ReusableMethods();

  useEffect(() => {
    const fetchData = async (endpoint: string, returnStateObject: any) => {
      setIsLoading(true);
      allRequest({
        event: null,
        action_url: endpoint, // End Point
        method: "GET", // Method
        formId: "",
        formData: null,
        contentType: "application/json", //Content Type
        authentication: user.token,
        setIsLoading,
        setReturnData: returnStateObject,
      });
    };
    (causes || statuses || sections || deviationTypes || products) &&
      fetchData(autoLoadApi, setReturnDataArray);
  }, [causes, statuses, sections, deviationTypes, products]);

  useEffect(() => {
    user.data?.settings &&
      setSettings(JSON.parse(user.data?.settings.settings));
  }, [user.data?.settings]);

  const SearchComponent = (props: any) => {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setIsLoading(true);
          const form = document.getElementById("search");
          const searchForm = new FormData(form);
          const formObject = Object.fromEntries(searchForm.entries());
          const filteredParams = Object.fromEntries(
            Object.entries(formObject).filter(([_, value]) => value)
          );
          const params = new URLSearchParams(filteredParams).toString();
          const queryParams = "?paginate=" + PAGINATE_ITEM_COUNT + "&" + params;
          //   console.log(queryParams);
          setSearchParams(queryParams);
          fetchApi({
            url: props.endpoint + "/search" + queryParams, // End Point
            method: "GET", // Method
            formData: null,
            contentType: "application/json", //Content Type
            authentication: user.token,
          })
            .then((response_value: any) => {
              const response = JSON.parse(response_value);
              setIsLoading(false);
              setSearchData(response.data);
            })
            .catch((error) => {
              setIsLoading(false);
            });
        }}
        action="#"
        id="search"
        method="POST"
        className="pb-5 items-center justify-center"
      >
        {/* <div className="w-full flex justify-center">
          <Spinner />
        </div> */}
        <div className="w-full mx-3 my-2 md:flex md:flex-row">
          <div className="md:flex">
            {dateRange && (
              <>
                <div className="w-2/10 mr-2">
                  <span className="text-sm pl-3">{t("from")}</span>
                  <input
                    type="date"
                    name="start_date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-2/10 mr-2">
                  <span className="text-sm pl-3">{t("to")}</span>
                  <input
                    type="date"
                    name="end_date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </>
            )}
            {proteinLactoseWaterLimit && (
              <>
                <div className="w-2/10 mr-2">
                  <span className="text-sm pl-3">{t("limit")}</span>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="satisfactory_or_not"
                    onChange={(e) => setSatisfactoryOrNot(e.target.value)}
                    value={satisfactoryOrNot}
                  >
                    <option value="">--{t("select")}--</option>
                    <option value="1">{t("satisfactory")}</option>
                    <option value="-1">{t("actions_required")}</option>
                  </select>
                </div>
                <div className="w-2/10 mr-2">
                  <span className="text-sm pl-3">{t("column")}</span>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required={satisfactoryOrNot}
                    name="column"
                    onChange={(e) => setColumn(e.target.value)}
                    value={column}
                  >
                    <option value="">--{t("select_column")}--</option>
                    <option
                      value={"protein_value-" + settings.proteinConstantLimit}
                    >
                      {t("protein_value")}
                    </option>
                    <option
                      value={"lactose_value-" + settings.lactoseConstantLimit}
                    >
                      {t("lactose_value")}
                    </option>
                    <option
                      value={"water_value-" + settings.waterConstantLimit}
                    >
                      {t("water_value")}
                    </option>
                  </select>
                </div>
              </>
            )}

            {aerobicEcoliStaphylococcusLimit && (
              <>
                <div className="w-2/10 mr-2">
                  <span className="text-sm pl-3">{t("limit")}</span>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="satisfactory_or_not"
                    onChange={(e) => setSatisfactoryOrNot(e.target.value)}
                    value={satisfactoryOrNot}
                  >
                    <option value="">--{t("select")}--</option>
                    <option value="1">{t("satisfactory")}</option>
                    <option value="-1">{t("actions_required")}</option>
                  </select>
                </div>
                <div className="w-2/10 mr-2">
                  <span className="text-sm pl-3">{t("column")}</span>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required={satisfactoryOrNot}
                    name="column"
                    onChange={(e) => setColumn(e.target.value)}
                    value={column}
                  >
                    <option value="">--{t("select_column")}--</option>
                    <option value={"aerobic-" + settings.aerobicConstantLimit}>
                      {t("aerobic")}
                    </option>
                    <option value={"e_coli-" + settings.ecoliConstantLimit}>
                      {t("e_coli")}
                    </option>
                    <option
                      value={
                        "staphylococcus-" + settings.staphylococcusConstantLimit
                      }
                    >
                      {t("staphylococcus")}
                    </option>
                  </select>
                </div>
              </>
            )}

            {aerobicEnterobactaLimit && (
              <>
                <div className="w-2/10 mr-2">
                  <span className="text-sm pl-3">{t("limit")}</span>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="satisfactory_or_not"
                    onChange={(e) => setSatisfactoryOrNot(e.target.value)}
                    value={satisfactoryOrNot}
                  >
                    <option value="">--{t("select")}--</option>
                    <option value="1">{t("satisfactory")}</option>
                    <option value="-1">{t("actions_required")}</option>
                  </select>
                </div>
                <div className="w-2/10 mr-2">
                  <span className="text-sm pl-3">{t("column")}</span>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required={satisfactoryOrNot}
                    name="column"
                    onChange={(e) => setColumn(e.target.value)}
                    value={column}
                  >
                    <option value="">--{t("select_column")}--</option>
                    <option value={"aerobic-" + settings.aerobicConstantLimit}>
                      {t("aerobic")}
                    </option>
                    <option
                      value={"enterobacta-" + settings.enterobactaConstantLimit}
                    >
                      {t("enterobacta")}
                    </option>
                  </select>
                </div>
              </>
            )}

            {causes && (
              <>
                <div className="w-2/10 mr-2">
                  <span className="text-sm pl-3">{t("cause")}</span>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="cause"
                    onChange={(e) => setCause(e.target.value)}
                    value={cause}
                  >
                    <option value="">--{t("select")}--</option>
                    {returnDataArray.causes?.original.data.map(
                      (value: any, key: any) => (
                        <option key={key} value={value.id}>
                          {t(value.name_key)}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </>
            )}

            {statuses && (
              <>
                <div className="w-2/10 mr-2">
                  <span className="text-sm pl-3">{t("status")}</span>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="status_id"
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                  >
                    <option value="">--{t("select")}--</option>
                    {returnDataArray.statuses?.original.data.map(
                      (value: any, key: any) => (
                        <option key={key} value={value.id}>
                          {value.id}: {t(value.name_key)}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </>
            )}

            {sections && (
              <>
                <div className="w-2/10 mr-2">
                  <span className="text-sm pl-3">{t("section")}</span>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="section"
                    onChange={(e) => setSection(e.target.value)}
                    value={section}
                  >
                    <option value="">--{t("select")}--</option>
                    {returnDataArray.sections?.original.data.map(
                      (value: any, key: any) => (
                        <option key={key} value={value.id}>
                          {t(value.name_key)}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </>
            )}

            {deviationTypes && (
              <>
                <div className="w-2/10 mr-2">
                  <span className="text-sm pl-3">{t("deviation_type")}</span>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="deviation_type"
                    onChange={(e) => setDeviationType(e.target.value)}
                    value={deviationType}
                  >
                    <option value="">--{t("select")}--</option>
                    {returnDataArray.deviation_types?.original.data.map(
                      (value: any, key) => (
                        <option key={key} value={value.id}>
                          {t(value.name_key)}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </>
            )}

            {products && (
              <>
                <div className="w-2/10 mr-2">
                  <span className="text-sm pl-3">{t("product")}</span>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="product"
                    onChange={(e) => setProduct(e.target.value)}
                    value={product}
                  >
                    <option value="">--{t("select")}--</option>
                    {returnDataArray.product_types?.original.data.map(
                      (value: any, key) => (
                        <option key={key} value={value.id}>
                          {t(value.name_key)}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </>
            )}

            {dangers && (
              <>
                <div className="w-2/10 mr-2">
                  <span className="text-sm pl-3">{t("danger")}</span>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="danger"
                    onChange={(e) => setDanger(e.target.value)}
                    value={danger}
                  >
                    <option value="">--{t("select")}--</option>
                    {returnDataArray.danger_types?.original.data.map(
                      (value: any, key) => (
                        <option key={key} value={value.id}>
                          {t(value.name_key)}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </>
            )}

            {locations && (
              <>
                <div className="w-2/10 mr-2">
                  <span className="text-sm pl-3">{t("location")}</span>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="location"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                  >
                    <option value="">--{t("select")}--</option>
                    {returnDataArray.line_types?.original.data.map(
                      (value: any, key) => (
                        <option key={key} value={value.id}>
                          {t(value.name_key)}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </>
            )}

            {oee && (
              <>
                <div className="w-1/10 mr-2">
                  <span className="text-sm">{t("comparison")}</span>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    name="operator"
                    onChange={(e) => setComparisonOperator(e.target.value)}
                    value={comparisonOperator}
                  >
                    <option value="">--{t("select")}--</option>
                    <option value="!=">{"!="}</option>
                    <option value="=">{"="}</option>
                    <option value=">">{">"}</option>
                    <option value="<">{"<"}</option>
                    <option value=">=">{">="}</option>
                    <option value="<=">{"<="}</option>
                  </select>
                </div>
                <div className="w-2/10 mr-2">
                  <span className="text-sm pl-3">
                    {t("availability") + " " + comparisonOperator}
                  </span>
                  <input
                    type="number"
                    min={0}
                    name="availability"
                    value={availability}
                    onChange={(e) => setAvailablity(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-2/10 mr-2">
                  <span className="text-sm pl-3">
                    {t("performance") + " " + comparisonOperator}
                  </span>
                  <input
                    type="number"
                    min="0"
                    name="performance"
                    value={performance}
                    onChange={(e) => setPerformance(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-2/10 mr-2">
                  <span className="text-sm pl-3">
                    {t("quality") + " " + comparisonOperator}
                  </span>
                  <input
                    type="number"
                    min="0"
                    name="quality"
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-2/10 mr-2">
                  <span className="text-sm pl-3">
                    {t("overall_oee") + " " + comparisonOperator}
                  </span>
                  <input
                    type="number"
                    name="overall_oee"
                    min={0}
                    value={overallOEE}
                    onChange={(e) => setOverallOEE(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </>
            )}
          </div>

          <div className="md:w-1/6 mt-6">
            <button
              type="submit"
              className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-1 text-center inline-flex items-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 ml-3 pl-2"
            >
              <Spinner />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-search"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>

              <span className="mx-2 text-xs text-white">{t("search")}</span>
            </button>
          </div>
        </div>
      </form>
    );
  };
  return { SearchComponent, searchData, searchParams, setSearchParams };
};
export default searchObject;
