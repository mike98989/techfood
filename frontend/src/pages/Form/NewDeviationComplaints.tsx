import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import SelectGroupOne from "../../components/Forms/SelectGroup/SelectGroupOne";
import { useTranslation } from "react-i18next";
import { ReusableMethods } from "../../methods/ReusableMethods";
import SpinnerObject from "../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import formReturnMessage from "../../components/Forms/FormAlerts/formReturnMessage";

const FormLayout = () => {
  const { t } = useTranslation();
  const pageTitle = t("deviation_complaints");
  const { allRequest, formSubmit } = ReusableMethods();
  const { setIsLoading, Spinner } = SpinnerObject();
  const user = useSelector((state: any) => state.user.value);
  const [returnDataArray, setReturnDataArray] = useState([]);
  //   const [deviationTypes, setDeviationTypes] = useState([]);
  //   const [derivationCode, setDeviationCode] = useState([]);
  //   const [hazardType, setHazardType] = useState([]);
  //   const [riskCategories, setRiskCategories] = useState([]);
  //   const [productTypes, setProductTypes] = useState([]);
  const { MessageBox, setFormMessage } = formReturnMessage();
  const [lineTypes, setLineTypes] = useState([]);

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
    // This will fetch all the drop downs data related to deviation form
    fetchData("deviation_form_related_data", setReturnDataArray);
  }, []);

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
        <div className="flex flex-col gap-9">
          {/* <!-- Contact Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="text-md left-content uppercase text-black dark:text-white items-start">
                {t("heading_deviation_complaints")}
              </h3>
            </div>
            <MessageBox />

            <form
              id="deviation_complaint"
              onSubmit={(e) => {
                formSubmit({
                  event: e,
                  action_url: "deviationcomplaints",
                  method: "POST",
                  formId: "deviation_complaint",
                  formData: null,
                  contentType: "application/json",
                  authentication: user.token,
                  setIsLoading,
                  setReturnData: setFormMessage,
                });
              }}
              method="POST"
            >
              <div className="p-6.5">
                <Spinner />
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("reference_number")}
                    </label>
                    <input
                      type="text"
                      name="reference_number"
                      required
                      placeholder="Enter Reference Number"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("title")}
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      placeholder="Enter Reference Number"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("occurance_date")}
                    </label>
                    <input
                      type="date"
                      name="occurance_date"
                      required
                      placeholder={t("enter") + " " + t("occurance_date")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("deviation_type")}
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                      //value={production.section}
                      required
                      name="deviation_type_id"
                    >
                      <option value="">--{t("select")}--</option>
                      {returnDataArray.deviation_types?.original.data.map(
                        (value: any, key: any) => (
                          <option key={key} value={value.id}>
                            {t(value.name_key)}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("deviation_code")}
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                      //value={production.section}
                      required
                      name="deviation_code_id"
                    >
                      <option value="">--{t("select")}--</option>
                      {returnDataArray.deviation_codes?.original.data.map(
                        (value: any, key: any) => (
                          <option key={key} value={value.id}>
                            {t(value.name_key)}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("risk_category")}
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                      //value={production.section}
                      required
                      name="risk_category_id"
                    >
                      <option value="">--{t("select")}--</option>
                      {returnDataArray.risk_categories?.original.data.map(
                        (value: any, key: any) => (
                          <option key={key} value={value.id}>
                            {value.name}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row text-sm">
                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white">
                      {t("product_type")}
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                      //value={production.section}
                      required
                      name="product_id"
                    >
                      <option value="">--{t("select")}--</option>
                      {returnDataArray.product_types?.original.data.map(
                        (value: any, key: any) => (
                          <option key={key} value={value.id}>
                            {t(value.name_key)}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("article")} {t("number")}
                    </label>
                    <input
                      type="text"
                      name="article_no"
                      placeholder="Enter Article number"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("batch_number")}
                    </label>
                    <input
                      type="text"
                      name="batch_no"
                      placeholder="Enter Batch number"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-3/6">
                    <label className="mb-1 block text-black dark:text-white">
                      {t("section")}
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                      //value={production.section}
                      required
                      name="section_id"
                      //   onChange={(e) =>
                      //     handleInputChange({
                      //       index: fruitProductionIndex,
                      //       field: "section",
                      //       value: e.target.value,
                      //     })
                      //   }
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

                  <div className="w-full xl:w-3/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("location")}/{t("line")}
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                      //value={production.section}
                      required
                      name="location_id"
                    >
                      <option value="">--{t("select")}--</option>
                      {returnDataArray.line_types?.original.data.map(
                        (value: any, key: any) => (
                          <option key={key} value={value.id}>
                            {t(value.name_key)}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-3/6">
                    <label className="mb-2.5 block text-black dark:text-white text-sm">
                      {t("deviation_description")}
                    </label>
                    <textarea
                      rows={2}
                      name="deviation_description"
                      placeholder={t("deviation_description")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    ></textarea>
                  </div>

                  <div className="w-full xl:w-3/6">
                    <label className="mb-2.5 block text-black dark:text-white text-sm">
                      {t("suggested_correction") + "/" + t("actions")}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={t("suggested_correction")}
                      name="suggested_correction"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    ></textarea>
                  </div>
                </div>

                <div className="flex flex-row justify-center">
                  {returnDataArray.deviation_codes && (
                    <button
                      type="submit"
                      className="text-white bg-gradient-to-br from-cyan-600 to-cyan-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-2"
                    >
                      <Spinner />
                      {t("save")}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormLayout;
