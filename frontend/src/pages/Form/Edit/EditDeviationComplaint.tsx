import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SpinnerObject from "../../../components/Spinner/Spinner";
import { ReusableMethods } from "../../../methods/ReusableMethods";
import formReturnMessage from "../../../components/Forms/FormAlerts/formReturnMessage";
import { httpRequest } from "../../../methods/Requests";
import { useTranslation } from "react-i18next";

const EditFrutProduction = (props: any) => {
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
    reference_number: "",
    occurance_date: "", // Format date for input
    title: "",
    deviation_type_id: "",
    deviation_code_id: "",
    risk_category_id: "",
    product_id: "",
    article_no: "",
    batch_no: "",
    location_id: "",
    section_id: "",
    deviation_description: "",
    suggested_correction: "",
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
    fetchData("deviation_form_related_data", setReturnDataArray);

    ////// Set Default form data
    setFormData({
      reference_number: value.reference_number,
      occurance_date: new Date(value.occurance_date)
        .toISOString()
        .split("T")[0], // Format date for input
      title: value.title,
      deviation_type_id: value.deviation_type_id,
      deviation_code_id: value.deviation_code_id,
      risk_category_id: value.risk_category_id,
      product_id: value.product_id,
      article_no: value.article_no,
      batch_no: value.batch_no,
      location_id: value.location_id,
      section_id: value.section_id,
      deviation_description: value.deviation_description,
      suggested_correction: value.suggested_correction,
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
                t("deviation_complaints") +
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
                url: "deviationcomplaints/" + value.id, // End Point
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
                      reference_number: "",
                      occurance_date: "", // Format date for input
                      title: "",
                      deviation_type_id: "",
                      deviation_code_id: "",
                      risk_category_id: "",
                      product_id: "",
                      article_no: "",
                      batch_no: "",
                      location_id: "",
                      section_id: "",
                      deviation_description: "",
                      suggested_correction: "",
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
            id="editDeviationComplaint"
            method="POST"
          >
            <div className="p-0.5">
              <Spinner />
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-2/6">
                  <label className="mb-1 block text-black dark:text-white text-sm">
                    {t("reference_number")}
                  </label>
                  <input
                    type="text"
                    name="reference_number"
                    value={formData.reference_number}
                    onChange={handleChange}
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
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter Title"
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
                    value={formData.occurance_date}
                    onChange={handleChange}
                    placeholder="Enter Occurance Date"
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
                    value={formData.deviation_type_id}
                    onChange={handleChange}
                    name="deviation_type_id"
                    //   onChange={(e) =>
                    //     handleInputChange({
                    //       index: fruitProductionIndex,
                    //       field: "section",
                    //       value: e.target.value,
                    //     })
                    //   }
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

                <div className="w-full xl:w-2/6">
                  <label className="mb-1 block text-black dark:text-white text-sm">
                    {t("article") + " " + t("number")}
                  </label>
                  <input
                    type="text"
                    name="article_no"
                    value={formData.article_no}
                    onChange={handleChange}
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
                    value={formData.batch_no}
                    onChange={handleChange}
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

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-3/6">
                  <label className="mb-2.5 block text-black dark:text-white text-sm">
                    {t("deviation_description")}
                  </label>
                  <textarea
                    rows={2}
                    name="deviation_description"
                    defaultValue={formData.deviation_description}
                    onChange={handleChange}
                    placeholder="Type of deviation"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                  ></textarea>
                </div>

                <div className="w-full xl:w-3/6">
                  <label className="mb-2.5 block text-black dark:text-white text-sm">
                    {t("suggested_correction")}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={t("suggested_correction") + "/" + t("actions")}
                    name="suggested_correction"
                    defaultValue={formData.suggested_correction}
                    onChange={handleChange}
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
    </>
  );
};

export default EditFrutProduction;
