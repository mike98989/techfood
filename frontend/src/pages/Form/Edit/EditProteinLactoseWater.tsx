import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SpinnerObject from "../../../components/Spinner/Spinner";
import { ReusableMethods } from "../../../methods/ReusableMethods";
import formReturnMessage from "../../../components/Forms/FormAlerts/formReturnMessage";
import { httpRequest } from "../../../methods/Requests";

const EditProteinLactoseWater = (props: any) => {
  const { setIsLoading, Spinner } = SpinnerObject();
  const user = useSelector((state: any) => state.user.value);
  const { allRequest } = ReusableMethods();
  const [value, setValue] = useState(props.componentData);
  const { MessageBox, setFormMessage } = formReturnMessage();
  const { fetchApi } = httpRequest();
  const [formData, setFormData] = useState({
    PO_number: "",
    batch_number: "",
    protein_value: "",
    lactose_value: "",
    water_value: "",
    result_date: "",
  });

  useEffect(() => {
    ////// Set Default form data
    setFormData({
      PO_number: value.PO_number,
      batch_number: value.batch_number,
      result_date: new Date(value.result_date).toISOString().split("T")[0], // Format date for input
      protein_value: value.protein_value,
      lactose_value: value.lactose_value,
      water_value: value.water_value,
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
              Update Protein, Lactose Or Water Values
            </h3>
          </div>
          <MessageBox />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsLoading(true);
              fetchApi({
                url: "labinputs/" + value.id, // End Point
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
                      PO_number: "",
                      batch_number: "",
                      protein_value: "",
                      lactose_value: "",
                      water_value: "",
                      result_date: "",
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
            id="editProteinLactoseWater"
            method="POST"
          >
            <Spinner />
            <div className="mb-4.5 flex flex-row gap-6 xl:flex-row">
              <div className="w-1/2 xl:w-1/2">
                <div className="w-full">
                  <label className="mb-1 text-sm block text-black dark:text-white">
                    PO Number
                  </label>
                  <input
                    type="text"
                    name="PO_number"
                    value={formData.PO_number}
                    onChange={handleChange}
                    //onChange={(e) => setFormattedDate(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full">
                  <label className="mb-1 text-sm block text-black dark:text-white">
                    Date
                  </label>
                  <input
                    type="date"
                    name="result_date"
                    value={formData.result_date}
                    onChange={handleChange}
                    //onChange={(e) => setFormattedDate(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full">
                  <label className="mb-1 text-sm block text-black dark:text-white">
                    Protein Value
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="protein_value"
                    value={formData.protein_value}
                    onChange={handleChange}
                    //onChange={(e) => setFormattedDate(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
              </div>
              <div className="w-1/2">
                <div className="w-full">
                  <div className="w-full">
                    <label className="mb-1 text-sm block text-black dark:text-white">
                      Batch Number
                    </label>
                    <input
                      type="text"
                      name="batch_number"
                      value={formData.batch_number}
                      onChange={handleChange}
                      //onChange={(e) => setFormattedDate(e.target.value)}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                  </div>
                  <label className="mb-1 text-sm text-black dark:text-white">
                    Lactose Value
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="lactose_value"
                    value={formData.lactose_value}
                    onChange={handleChange}
                    //onChange={(e) => setFormattedDate(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full">
                  <label className="mb-1 text-sm text-black dark:text-white">
                    Water Value
                  </label>
                  <input
                    type="number"
                    min="0"
                    name="water_value"
                    value={formData.water_value}
                    onChange={handleChange}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
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

export default EditProteinLactoseWater;
