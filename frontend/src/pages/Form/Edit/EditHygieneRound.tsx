import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SpinnerObject from "../../../components/Spinner/Spinner";
import { ReusableMethods } from "../../../methods/ReusableMethods";
import formReturnMessage from "../../../components/Forms/FormAlerts/formReturnMessage";
import { httpRequest } from "../../../methods/Requests";
import { useTranslation } from "react-i18next";

const EditHygieneRounds = (props: any) => {
  const { t } = useTranslation();
  const { setIsLoading, Spinner } = SpinnerObject();
  const user = useSelector((state: any) => state.user.value);
  const { allRequest } = ReusableMethods();
  const [value, setValue] = useState(props.componentData);
  const [returnDataArray, setReturnDataArray] = useState([]);
  const { formSubmit } = ReusableMethods();
  const { MessageBox, setFormMessage } = formReturnMessage();
  const [openModal, setOpenModal] = useState(false);
  const { fetchApi } = httpRequest();
  const [formData, setFormData] = useState({
    occurance_date: "", // Format date for input
    deviation_type_id: "",
    deviation_code_id: "",
    risk_category_id: "",
    product_id: "",
    cleared_before: "",
    implemented_by: "",
    location_id: "",
    section_id: "",
    danger_id: "",
  });

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
    fetchData("hygiene_round_form_related_data", setReturnDataArray);

    ////// Set Default form data
    setFormData({
      occurance_date: new Date(value.occurance_date)
        .toISOString()
        .split("T")[0], // Format date for input

      deviation_type_id: value.deviation_type_id,
      deviation_code_id: value.deviation_code_id,
      risk_category_id: value.risk_category_id,
      product_id: value.product_id,
      cleared_before: value.cleared_before,
      implemented_by: value.implemented_id,
      location_id: value.location_id,
      section_id: value.section_id,
      danger_id: value.danger_id,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="flex">
        {/* <!-- Contact Form --> */}
        <div className="w-full">
          <div className="border-b border-stroke py-2 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              {t("update") +
                " " +
                t("daily_hygiene_rounds") +
                " " +
                t("values")}
            </h3>
          </div>
          <MessageBox />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsLoading(true);
              fetchApi({
                url: "hygienerounds/" + value.id, // End Point
                method: "PUT", // Method
                formData: formData,
                contentType: "application/json", //Content Type
                authentication: user.token,
              })
                .then((response_value: any) => {
                  const response = JSON.parse(response_value);
                  setIsLoading(false);
                  if (response.status == "1") {
                    //setOpenModal(false);
                    setFormData({
                      occurance_date: "",
                      deviation_type_id: "",
                      deviation_code_id: "",
                      risk_category_id: "",
                      product_id: "",
                      cleared_before: "",
                      implemented_by: "",
                      location_id: "",
                      section_id: "",
                      danger_id: "",
                    });
                    setFormMessage({
                      message: response.message,
                      status: "success",
                    });
                    setTimeout(() => {
                      window.location.reload();
                    }, 1200);
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
            id="editHygieneRounds"
            method="POST"
          >
            <div className="p-0.5">
              <Spinner />
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-3/6">
                  <label className="mb-1 block text-black dark:text-white text-sm">
                    {t("occurance_date")}
                  </label>
                  <input
                    type="date"
                    name="occurance_date"
                    defaultValue={formData.occurance_date}
                    onChange={handleChange}
                    placeholder={t("enter") + " " + t("occurance_date")}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                  />
                </div>

                <div className="w-full xl:w-3/6">
                  <label className="mb-1 block text-black dark:text-white text-sm">
                    {t("deviation_type")}
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    //value={production.section}
                    required
                    value={formData.deviation_type_id}
                    onChange={handleChange}
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
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-2/6">
                  <label className="mb-1 block text-black dark:text-white text-sm">
                    {t("deviation_code")}
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    //value={production.section}
                    required
                    name="deviation_code_id"
                    value={formData.deviation_code_id}
                    onChange={handleChange}
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
                    value={formData.risk_category_id}
                    onChange={handleChange}
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
                <div className="w-full xl:w-2/6">
                  <label className="mb-1 block text-black dark:text-white">
                    {t("product_type")}
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    //value={production.section}
                    required
                    name="product_id"
                    value={formData.product_id}
                    onChange={handleChange}
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
              </div>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row text-sm">
                <div className="w-full xl:w-2/6">
                  <label className="mb-1 block text-black dark:text-white text-sm">
                    {t("cleared_before")}
                  </label>
                  <input
                    type="date"
                    name="cleared_before"
                    value={formData.cleared_before}
                    onChange={handleChange}
                    placeholder={t("Enter") + " " + t("cleared_before")}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                  />
                </div>

                <div className="w-full xl:w-2/6">
                  <label className="mb-1 block text-black dark:text-white text-sm">
                    {t("implemented_by")}
                  </label>
                  <input
                    type="text"
                    name="implemented_by"
                    value={formData.implemented_by}
                    onChange={handleChange}
                    placeholder={t("Enter") + " " + t("implemented_by")}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                  />
                </div>

                <div className="w-full xl:w-3/6">
                  <label className="mb-1 block text-black dark:text-white text-sm">
                    {t("danger")}
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    //value={production.section}
                    required
                    name="danger_id"
                    value={formData.danger_id}
                    onChange={handleChange}
                  >
                    <option value="">--{t("select")}--</option>
                    {returnDataArray.danger_types &&
                      returnDataArray.danger_types.original.data.map(
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
                  <label className="mb-1 block text-black dark:text-white">
                    {t("section")}
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    //value={production.section}
                    required
                    name="section_id"
                    value={formData.section_id}
                    onChange={handleChange}
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
                    value={formData.location_id}
                    onChange={handleChange}
                  >
                    <option value="">--{t("select")}--</option>
                    {returnDataArray.line_types &&
                      returnDataArray.line_types.original.data.map(
                        (value: any, key: any) => (
                          <option key={key} value={value.id}>
                            {t(value.name_key)}
                          </option>
                        )
                      )}
                  </select>
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
    </>
  );
};

export default EditHygieneRounds;
