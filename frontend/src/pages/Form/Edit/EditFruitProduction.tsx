import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SpinnerObject from "../../../components/Spinner/Spinner";
import { ReusableMethods } from "../../../methods/ReusableMethods";
import formReturnMessage from "../../../components/Forms/FormAlerts/formReturnMessage";
import { httpRequest } from "../../../methods/Requests";
import { useTranslation } from "react-i18next";

const EditFruitProduction = (props: any) => {
  const { setIsLoading, Spinner } = SpinnerObject();
  const user = useSelector((state: any) => state.user.value);
  const { allRequest } = ReusableMethods();
  const [value, setValue] = useState(props.componentData);
  const [returnDataArray, setReturnDataArray] = useState([]);
  const { formSubmit } = ReusableMethods();
  const { MessageBox, setFormMessage } = formReturnMessage();
  const [openModal, setOpenModal] = useState(false);
  const { fetchApi } = httpRequest();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    date: "",
    section_id: "",
    status: "",
    cause_id: "",
    deviation_type_id: "",
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
    fetchData("fruit_production_form_related_data", setReturnDataArray);

    ////// Set Default form data
    setFormData({
      date: new Date(value.date).toISOString().split("T")[0], // Format date for input
      section_id: value.section_id,
      status: value.status,
      cause_id: value.cause_id,
      deviation_type_id: value.deviation_type_id,
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
              {t("update")} {t("fruit_production")} {t("values")}
            </h3>
          </div>
          <MessageBox />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsLoading(true);
              fetchApi({
                url: "fruitproduction/" + value.id, // End Point
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
                      date: "", // Format date for input
                      section: "",
                      status: "",
                      cause: "",
                      deviation_type: "",
                    });
                    setFormMessage({
                      message: response.message,
                      status: "success",
                    });
                    setTimeout(() => {
                      window.location.reload();
                    }, 1500);
                    // modalQueryData.modalData.setData((data: any) =>
                    //   data.filter(
                    //     (value: any, i: any) =>
                    //       i !== modalQueryData.modalData.index
                    //   )
                    // );
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
            id="editFruitProdution"
            method="POST"
          >
            <Spinner />
            <div className="mb-4.5 flex flex-row gap-6 xl:flex-row">
              <div className="w-1/2 xl:w-1/2">
                <div className="w-full">
                  <label className="mb-1 text-sm block text-black dark:text-white">
                    {t("date")}
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    //onChange={(e) => setFormattedDate(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full">
                  <label className="mb-1 text-sm block text-black dark:text-white">
                    {t("section")}
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formData.section_id}
                    required
                    name="section_id"
                    onChange={handleChange}
                  >
                    <option value="">--Select--</option>
                    {returnDataArray.sections?.original.data.map(
                      (value: any, key) => (
                        <option key={key} value={value.id}>
                          {t(value.name_key)}
                        </option>
                      )
                    )}
                  </select>

                  <label className="mb-1 text-sm block text-black dark:text-white">
                    {t("status")}
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formData.status}
                    onChange={handleChange}
                    required
                    name="status"
                  >
                    <option value="">--Select--</option>
                    {returnDataArray.statuses &&
                      returnDataArray.statuses.original.data.map(
                        (value: any, key: any) => (
                          <option key={key} value={value.id}>
                            {t(value.name_key)}
                          </option>
                        )
                      )}
                  </select>
                </div>
              </div>
              <div className="w-1/2">
                <div className="w-full">
                  <label className="mb-1 text-sm text-black dark:text-white">
                    {t("cause")}
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                    value={formData.cause_id}
                    name="cause_id"
                    onChange={handleChange}
                  >
                    <option value="">--Select--</option>
                    {returnDataArray.causes &&
                      returnDataArray.causes.original.data.map(
                        (value: any, key: any) => (
                          <option key={key} value={value.id}>
                            {t(value.name_key)}
                          </option>
                        )
                      )}
                  </select>
                </div>

                <div className="w-full">
                  <label className="mb-1 text-sm text-black dark:text-white">
                    {t("deviation_type")}
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formData.deviation_type_id}
                    onChange={handleChange}
                    required
                    name="deviation_type_id"
                  >
                    <option value="">--Select--</option>
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
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-xl  bg-cyan-800 p-2 font-medium text-gray hover:bg-opacity-90"
            >
              {t("save")}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditFruitProduction;
