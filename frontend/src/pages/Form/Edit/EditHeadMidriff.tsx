import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SpinnerObject from "../../../components/Spinner/Spinner";
import { ReusableMethods } from "../../../methods/ReusableMethods";
import formReturnMessage from "../../../components/Forms/FormAlerts/formReturnMessage";
import { httpRequest } from "../../../methods/Requests";
import { useTranslation } from "react-i18next";

const EditHeadMidriff = (props: any) => {
  const { setIsLoading, Spinner } = SpinnerObject();
  const user = useSelector((state: any) => state.user.value);
  const { allRequest } = ReusableMethods();
  const [returnDataArray, setReturnDataArray] = useState([]);
  const [value, setValue] = useState(props.componentData);
  const { MessageBox, setFormMessage } = formReturnMessage();
  const { fetchApi } = httpRequest();
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({
    week: "",
    slaughter_number: "",
    slaughter_house: "",
    product_id: "",
    slaughter_date: "",
    pieces_date: "",
    animal_id: "",
    aerobic: "",
    e_coli: "",
    staphylococcus: "",
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
    fetchData("drill_sample_form_related_data", setReturnDataArray);

    ////// Set Default form data
    setFormData({
      week: value.week,
      slaughter_number: value.slaughter_number,
      slaughter_house: value.slaughter_house,
      product_id: value.product_id,
      slaughter_date: value.slaughter_date, // Format date for input
      pieces_date: value.pieces_date, // Format date for input
      animal_id: value.animal_id,
      aerobic: value.aerobic,
      e_coli: value.e_coli,
      staphylococcus: value.staphylococcus,
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
                t("slaughtered_head_meat_midriff") +
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
                url: "headmidriffs/" + value.id, // End Point
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
                      week: "",
                      slaughter_number: "",
                      slaughter_house: "",
                      product_id: "",
                      slaughter_date: "",
                      pieces_date: "",
                      animal_id: "",
                      aerobic: "",
                      e_coli: "",
                      staphylococcus: "",
                    });
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
            id="editHeadMidriff"
            method="POST"
          >
            <Spinner />
            <div className="mb-4.5 flex flex-row gap-1 xl:flex-row">
              <div className="w-1/2 xl:w-1/2">
                <div className="w-full flex flex-row">
                  <div className="w-1/2 mr-1">
                    <label className="mb-1 text-sm block text-black dark:text-white">
                      {t("slaughter_number")}
                    </label>
                    <input
                      type="text"
                      name="slaughter_number"
                      defaultValue={formData.slaughter_number}
                      onChange={handleChange}
                      //onChange={(e) => setFormattedDate(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="mb-1 text-sm block text-black dark:text-white">
                      {t("week")}
                    </label>
                    <input
                      type="number"
                      name="week"
                      min="0"
                      defaultValue={formData.week}
                      onChange={handleChange}
                      //onChange={(e) => setFormattedDate(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <label className="mb-1 text-sm block text-black dark:text-white">
                    {t("slaughter_date")}
                  </label>
                  <input
                    type="date"
                    name="slaughter_date"
                    defaultValue={formData.slaughter_date}
                    onChange={handleChange}
                    //onChange={(e) => setFormattedDate(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full">
                  <label className="mb-1 text-sm block text-black dark:text-white">
                    {t("pieces_date")}
                  </label>
                  <input
                    type="date"
                    name="pieces_date"
                    defaultValue={formData.pieces_date}
                    onChange={handleChange}
                    //onChange={(e) => setFormattedDate(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="flex flex-row">
                  <div className="w-1/2 mr-1">
                    <label className="mb-1 text-sm block text-black dark:text-white">
                      {t("product")}
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      value={formData.product_id}
                      required
                      name="product_id"
                      onChange={handleChange}
                    >
                      <option value="">--{t("select")}--</option>
                      {returnDataArray.products?.original.data.map(
                        (value: any, key) => (
                          <option key={key} value={value.id}>
                            {t(value.name_key)}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="w-1/2">
                    <label className="mb-1 text-sm text-black dark:text-white">
                      {t("staphylococcus")}
                    </label>
                    <input
                      type="number"
                      name="staphylococcus"
                      value={formData.staphylococcus}
                      onChange={handleChange}
                      //onChange={(e) => setFormattedDate(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
              </div>
              <div className="w-1/2 xl:w-1/2">
                <div className="w-full">
                  <label className="mb-1 text-sm block text-black dark:text-white">
                    {t("kind_of_animal")}
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formData.animal_id}
                    onChange={handleChange}
                    required
                    name="status"
                  >
                    <option value="">--{t("select")}--</option>
                    {returnDataArray.animal &&
                      returnDataArray.animal.original.data.map(
                        (value: any, key: any) => (
                          <option key={key} value={value.id}>
                            {t(value.name_key)}
                          </option>
                        )
                      )}
                  </select>
                </div>

                <div className="w-full">
                  <label className="mb-1 text-sm block text-black dark:text-white">
                    {t("aerobic")}
                  </label>
                  <input
                    type="number"
                    name="aerobic"
                    defaultValue={formData.aerobic}
                    onChange={handleChange}
                    //onChange={(e) => setFormattedDate(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full">
                  <div className="w-full">
                    <label className="mb-1 text-sm block text-black dark:text-white">
                      {t("slaughter_house")}
                    </label>
                    <input
                      type="number"
                      name="slaughter_house"
                      value={formData.slaughter_house}
                      onChange={handleChange}
                      //onChange={(e) => setFormattedDate(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <div className="w-full">
                    <label className="mb-1 text-sm text-black dark:text-white">
                      {t("e_coli")}
                    </label>
                    <input
                      type="number"
                      name="e_coli"
                      value={formData.e_coli}
                      onChange={handleChange}
                      //onChange={(e) => setFormattedDate(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-xl  bg-cyan-800 p-2 font-medium text-gray hover:bg-opacity-90"
            >
              Save Data
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditHeadMidriff;
