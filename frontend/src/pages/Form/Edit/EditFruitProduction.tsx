import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SpinnerObject from "../../../components/Spinner/Spinner";
import { ReusableMethods } from "../../../methods/ReusableMethods";

const EditFrutProduction = (props) => {
  const { setIsLoading, Spinner } = SpinnerObject();
  const user = useSelector((state: any) => state.user.value);
  const [sections, setSections] = useState([]);
  const [causes, setCauses] = useState([]);
  const [derivationTypes, setDerivationTypes] = useState([]);
  const { allRequest } = ReusableMethods();
  const [value, setValue] = useState(props.componentData);

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
    fetchData("fruits", setSections);
    fetchData("causes", setCauses);
    fetchData("deviation_types", setDerivationTypes);
  }, []);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <div className="flex">
        {/* <!-- Contact Form --> */}
        <div className="w-full">
          <div className="border-b border-stroke py-2 px-2 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Update Data
            </h3>
          </div>
          <form action="#" method="POST">
            <div className="mb-4.5 flex flex-row gap-6 xl:flex-row">
              <div className="w-1/2 xl:w-1/2">
                <div className="w-full">
                  <label className="mb-1 text-sm block text-black dark:text-white">
                    Date
                  </label>
                  <input
                    type="date"
                    name="result_date"
                    defaultValue={value.result_date}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-1 text-sm block text-black dark:text-white">
                    Section
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    defaultValue={value.section}
                    required
                    name="section[]"
                    //   onChange={(e) =>
                    //     handleInputChange({
                    //       index: fruitProductionIndex,
                    //       field: "section",
                    //       value: e.target.value,
                    //     })
                    //   }
                  >
                    <option value="">--Select--</option>
                    {sections.map((value: any, key) => (
                      <option key={key} value={value.name}>
                        {value.name}
                      </option>
                    ))}
                  </select>

                  <label className="mb-1 text-sm block text-black dark:text-white">
                    Status
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    defaultValue={props.componentData.status}
                    required
                    name="status[]"
                  >
                    <option value="">--Select--</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
              </div>
              <div className="w-1/2 xl:w-1/2">
                <div className="w-full xl:w-1/2">
                  <label className="mb-1 text-sm text-black dark:text-white">
                    Cause
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    defaultValue={props.componentData.cause}
                    required
                    name="cause[]"
                    //   onChange={(e) =>
                    //     handleInputChange({
                    //       index: fruitProductionIndex,
                    //       field: "cause",
                    //       value: e.target.value,
                    //     })
                    //   }
                  >
                    <option value="">--Select--</option>
                    {causes.map((value: any, key) => (
                      <option key={key} value={value.cause}>
                        {value.cause}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-1 text-sm text-black dark:text-white">
                    Deviation Type
                  </label>
                  <select
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    defaultValue={props.componentData.deviation_type}
                    required
                    name="deviation_type[]"
                    //   onChange={(e) =>
                    //     handleInputChange({
                    //       index: fruitProductionIndex,
                    //       field: "deviation_type",
                    //       value: e.target.value,
                    //     })
                    //   }
                  >
                    <option value="">--Select--</option>
                    {derivationTypes.map((value: any, key) => (
                      <option key={key} value={value.type}>
                        {value.type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <button className="flex w-full justify-center rounded-xl  bg-cyan-800 p-2 font-medium text-gray hover:bg-opacity-90">
              Save Data
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditFrutProduction;
