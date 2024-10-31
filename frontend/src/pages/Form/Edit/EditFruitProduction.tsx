import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SpinnerObject from "../../../components/Spinner/Spinner";
import { ReusableMethods } from "../../../methods/ReusableMethods";
import formReturnMessage from "../../../components/Forms/FormAlerts/formReturnMessage";
import { httpRequest } from "../../../methods/Requests";

const EditFrutProduction = (props: any) => {
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
    date: "",
    section: "",
    status: "",
    cause: "",
    deviation_type: "",
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
      section: value.section,
      status: value.status,
      cause: value.cause,
      deviation_type: value.deviation_type,
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
              Update Fruit Production Values
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
                .then((response: any) => {
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
                    Date
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
                    Section
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={value.section}
                    required
                    name="section"
                    onChange={handleChange}
                  >
                    <option value="">--Select--</option>
                    {returnDataArray.fruits &&
                      returnDataArray.fruits.original.data.map(
                        (value: any, key) => (
                          <option key={key} value={value.name}>
                            {value.name}
                          </option>
                        )
                      )}
                  </select>

                  <label className="mb-1 text-sm block text-black dark:text-white">
                    Status
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
                            {value.name}
                          </option>
                        )
                      )}
                  </select>
                </div>
              </div>
              <div className="w-1/2">
                <div className="w-full">
                  <label className="mb-1 text-sm text-black dark:text-white">
                    Cause
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                    value={formData.cause}
                    name="cause"
                    onChange={handleChange}
                  >
                    <option value="">--Select--</option>
                    {returnDataArray.causes &&
                      returnDataArray.causes.original.data.map(
                        (value: any, key: any) => (
                          <option key={key} value={value.cause}>
                            {value.cause}
                          </option>
                        )
                      )}
                  </select>
                </div>

                <div className="w-full">
                  <label className="mb-1 text-sm text-black dark:text-white">
                    Deviation Type
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    value={formData.deviation_type}
                    onChange={handleChange}
                    required
                    name="deviation_type"
                  >
                    <option value="">--Select--</option>
                    {returnDataArray.deviation_types &&
                      returnDataArray.deviation_types.original.data.map(
                        (value: any, key: any) => (
                          <option key={key} value={value.type}>
                            {value.type}
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
              Save Data
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditFrutProduction;
