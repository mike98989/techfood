import React, { useEffect, useState } from "react";
import { DynamicInputFieldsCCPFollowUp } from "../../methods/DynamicInputFields"; // Import the hook
import { ReusableMethods } from "../../methods/ReusableMethods";
import SpinnerObject from "../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import formReturnMessage from "../../components/Forms/FormAlerts/formReturnMessage";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import { useTranslation } from "react-i18next";
export default function CCPFollowUp() {
  const { setIsLoading, Spinner } = SpinnerObject();
  const { formSubmit, getWeekNumber } = ReusableMethods();
  const user = useSelector((state: any) => state.user.value);
  const { MessageBox, setFormMessage } = formReturnMessage();
  const { allRequest } = ReusableMethods();
  const initialCCPFollowUpValues = {
    slaughtered_total: "0",
    slaughter: "no",
    ham: "0",
    front_leg: "0",
    sternum: "0",
    belly_cut: "0",
    back: "0",
    neck: "0",
    flank: "0",
    ribs: "0",
    inside: "0",
    hind_leg: "0",
    total: "0",
    clean: "0",
    percent: "0",
    verify_or_monitor: "1",
  };

  const [CCPFollowUp, setCCPFollowUps] = useState(initialCCPFollowUpValues);
  const [week, setWeek] = useState(1);
  // const [sections, setSections] = useState([]);
  // const [causes, setCauses] = useState([]);
  // const [derivationTypes, setDerivationTypes] = useState([]);
  const [returnDataArray, setReturnDataArray] = useState([]);

  const { t } = useTranslation();
  const pageTitle = t("ccp_follow_up");
  const { CCPSummation, handleCCPSummation } = DynamicInputFieldsCCPFollowUp();

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
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex border-b justify-between  border-stroke py-2 px-3 dark:border-strokedark">
            <h3 className="text-md left-content uppercase text-black dark:text-white items-start">
              {t("ccp_follow_up_title")}
            </h3>
          </div>

          <div className="">
            <MessageBox />

            <form
              onSubmit={(e) =>
                formSubmit({
                  event: e,
                  action_url: "ccpfollowups",
                  method: "POST",
                  formId: "new_ccp_follow_up",
                  formData: null,
                  contentType: "application/json",
                  authentication: user.token,
                  setIsLoading,
                  setReturnData: setFormMessage,
                })
              }
              method="POST"
              id="new_ccp_follow_up"
              className="pb-5 items-center justify-center"
            >
              <div className="py-3 text-center">
                <h5 className="font-bold text-xl text-center">
                  {CCPFollowUp?.verify_or_monitor == "1"
                    ? t("monitoring")
                    : t("verification")}
                  {/* // 1 is monitoring, 2 is verification */}
                </h5>
              </div>
              <div className="px-6.5">
                <Spinner />
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("slaughtered_total")}
                    </label>
                    <input
                      type="text"
                      required
                      name="slaughtered_total"
                      //   onBlur={() =>
                      //     setCCPFollowUps(handleCCPSummation(CCPFollowUp))
                      //   }
                      onChange={(e) => {
                        setCCPFollowUps((prev) => {
                          const updatedValues = { ...prev };
                          updatedValues["slaughtered_total"] = e.target.value; // Update PO Number field
                          setCCPFollowUps(handleCCPSummation(updatedValues));
                          return updatedValues;
                        });
                      }}
                      placeholder={t("slaughtered_total")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("slaughter")}
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                      value={CCPFollowUp?.slaughter}
                      required
                      //onBlur={() => handleCCPSummation(CCPFollowUp)}
                      onChange={(e) =>
                        setCCPFollowUps((prev) => {
                          const updatedValues = { ...prev };
                          updatedValues["slaughter"] = e.target.value; // Update PO Number field
                          setCCPFollowUps(handleCCPSummation(updatedValues));
                          return updatedValues;
                        })
                      }
                      name="slaughter"
                    >
                      <option value="">--{t("select")}--</option>
                      <option value="yes">{t("yes")}</option>
                      <option value="no">{t("no")}</option>
                    </select>
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("tracking")}
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                      required
                      name="verify_or_monitor"
                      value={CCPFollowUp?.verify_or_monitor}
                      onChange={(e) =>
                        setCCPFollowUps((prev) => {
                          const updatedValues = { ...prev };
                          updatedValues["verify_or_monitor"] = e.target.value; // Update PO Number field
                          return updatedValues;
                        })
                      }
                    >
                      <option value="">--{t("select")}--</option>
                      <option value="1">{t("monitoring")}</option>
                      <option value="2">{t("verification")}</option>
                    </select>
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("date")}
                    </label>
                    <input
                      type="date"
                      name="date"
                      placeholder={t("date")}
                      required
                      onBlur={(e) =>
                        setWeek(getWeekNumber(new Date(e.target.value)))
                      }
                      onChange={(e) =>
                        setCCPFollowUps((prev) => {
                          const updatedValues = { ...prev };
                          updatedValues["date"] = e.target.value; // Update PO Number field
                          return updatedValues;
                        })
                      }
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("week")}
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                      required
                      name="week"
                      value={week}
                      onChange={(e) =>
                        setCCPFollowUps((prev) => {
                          const updatedValues = { ...prev };
                          updatedValues["week"] = e.target.value; // Update PO Number field
                          return updatedValues;
                        })
                      }
                    >
                      <option value="">--{t("select")}--</option>
                      {/* /// Loop through 52 weeks in a year */}
                      {Array.from({ length: 52 }, (_, i) => (
                        <option key={i} value={i + 1}>
                          {t(`Week ${i + 1}`)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row text-sm">
                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white">
                      {t("kind_of_animal")}
                    </label>
                    <select
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      required
                      name="animal_id"
                      // onChange={(e) =>
                      //   handleInputChange({
                      //     index,
                      //     field: "animal_id",
                      //     value: e.target.value,
                      //   })
                      // }
                    >
                      <option value="">--{t("select")}--</option>
                      {returnDataArray?.animal?.original.data.map(
                        (value: any, key: any) => (
                          <option key={key} value={value.id}>
                            {t(value.name_key)}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white">
                      {t("ccp_followup_keys.ham")}
                    </label>
                    <input
                      type="number"
                      name="ham"
                      min="0"
                      disabled={CCPFollowUp.slaughter == "no"}
                      placeholder={t("ccp_followup_keys.ham")}
                      //   onBlur={() =>
                      //     setCCPFollowUps(handleCCPSummation(CCPFollowUp))
                      //   }
                      onChange={(e) =>
                        setCCPFollowUps((prev) => {
                          const updatedValues = { ...prev };
                          updatedValues["ham"] = e.target.value; // Update PO Number field
                          setCCPFollowUps(handleCCPSummation(updatedValues));
                          return updatedValues;
                        })
                      }
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("ccp_followup_keys.sternum")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="sternum"
                      disabled={CCPFollowUp.slaughter == "no"}
                      placeholder={t("sternum")}
                      //   onBlur={() =>
                      //     setCCPFollowUps(handleCCPSummation(CCPFollowUp));
                      //   }
                      onChange={(e) =>
                        setCCPFollowUps((prev) => {
                          const updatedValues = { ...prev };
                          updatedValues["sternum"] = e.target.value; // Update PO Number field
                          setCCPFollowUps(handleCCPSummation(updatedValues));
                          return updatedValues;
                        })
                      }
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("ccp_followup_keys.front_leg")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      disabled={CCPFollowUp.slaughter == "no"}
                      name="front_leg"
                      //   onBlur={() =>
                      //     setCCPFollowUps(handleCCPSummation(CCPFollowUp))
                      //   }
                      onChange={(e) =>
                        setCCPFollowUps((prev) => {
                          const updatedValues = { ...prev };
                          updatedValues["front_leg"] = e.target.value; // Update PO Number field
                          setCCPFollowUps(handleCCPSummation(updatedValues));
                          return updatedValues;
                        })
                      }
                      placeholder={t("ccp_followup_keys.front_leg")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-3/6">
                    <label className="mb-1 block text-black dark:text-white">
                      {t("ccp_followup_keys.belly_cut")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      disabled={CCPFollowUp.slaughter == "no"}
                      name="belly_cut"
                      //   onBlur={() =>
                      //     setCCPFollowUps(handleCCPSummation(CCPFollowUp))
                      //   }
                      onChange={(e) =>
                        setCCPFollowUps((prev) => {
                          const updatedValues = { ...prev };
                          updatedValues["belly_cut"] = e.target.value; // Update PO Number field
                          setCCPFollowUps(handleCCPSummation(updatedValues));
                          return updatedValues;
                        })
                      }
                      placeholder={t("ccp_followup_keys.belly_cut")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row text-sm">
                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white">
                      {t("ccp_followup_keys.back")}
                    </label>
                    <input
                      type="number"
                      name="back"
                      min="0"
                      disabled={CCPFollowUp.slaughter == "no"}
                      //   onBlur={() =>
                      //     setCCPFollowUps(handleCCPSummation(CCPFollowUp))
                      //   }
                      onChange={(e) =>
                        setCCPFollowUps((prev) => {
                          const updatedValues = { ...prev };
                          updatedValues["back"] = e.target.value; // Update PO Number field
                          setCCPFollowUps(handleCCPSummation(updatedValues));
                          return updatedValues;
                        })
                      }
                      placeholder={t("ccp_followup_keys.back")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("ccp_followup_keys.neck")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="neck"
                      disabled={CCPFollowUp.slaughter == "no"}
                      //   onBlur={() =>
                      //     setCCPFollowUps(handleCCPSummation(CCPFollowUp))
                      //   }
                      onChange={(e) =>
                        setCCPFollowUps((prev) => {
                          const updatedValues = { ...prev };
                          updatedValues["neck"] = e.target.value; // Update PO Number field
                          setCCPFollowUps(handleCCPSummation(updatedValues));
                          return updatedValues;
                        })
                      }
                      placeholder={t("ccp_followup_keys.neck")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-2/6">
                    <label className="mb-1 block text-black dark:text-white text-sm">
                      {t("ccp_followup_keys.flank")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="flank"
                      disabled={CCPFollowUp.slaughter == "no"}
                      //   onBlur={() =>
                      //     setCCPFollowUps(handleCCPSummation(CCPFollowUp))
                      //   }
                      onChange={(e) =>
                        setCCPFollowUps((prev) => {
                          const updatedValues = { ...prev };
                          updatedValues["flank"] = e.target.value; // Update PO Number field
                          setCCPFollowUps(handleCCPSummation(updatedValues));
                          return updatedValues;
                        })
                      }
                      placeholder={t("ccp_followup_keys.flank")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-3/6">
                    <label className="mb-1 block text-black dark:text-white">
                      {t("ccp_followup_keys.ribs")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="ribs"
                      disabled={CCPFollowUp.slaughter == "no"}
                      //   onBlur={() =>
                      //     setCCPFollowUps(handleCCPSummation(CCPFollowUp))
                      //   }
                      onChange={(e) =>
                        setCCPFollowUps((prev) => {
                          const updatedValues = { ...prev };
                          updatedValues["ribs"] = e.target.value; // Update PO Number field
                          setCCPFollowUps(handleCCPSummation(updatedValues));
                          return updatedValues;
                        })
                      }
                      placeholder={t("ccp_followup_keys.ribs")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-3/6">
                    <label className="mb-1 block text-black dark:text-white">
                      {t("ccp_followup_keys.inside")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="inside"
                      disabled={CCPFollowUp.slaughter == "no"}
                      //   onBlur={() =>
                      //     setCCPFollowUps(handleCCPSummation(CCPFollowUp))
                      //   }
                      onChange={(e) =>
                        setCCPFollowUps((prev) => {
                          const updatedValues = { ...prev };
                          updatedValues["inside"] = e.target.value; // Update PO Number field
                          setCCPFollowUps(handleCCPSummation(updatedValues));
                          return updatedValues;
                        })
                      }
                      placeholder={t("ccp_followup_keys.inside")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-3/6">
                    <label className="mb-1 block text-black dark:text-white">
                      {t("ccp_followup_keys.hind_leg")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="hind_leg"
                      disabled={CCPFollowUp.slaughter == "no"}
                      //   onBlur={() =>
                      //     setCCPFollowUps(handleCCPSummation(CCPFollowUp))
                      //   }
                      onChange={(e) =>
                        setCCPFollowUps((prev) => {
                          const updatedValues = { ...prev };
                          updatedValues["hind_leg"] = e.target.value; // Update PO Number field
                          setCCPFollowUps(handleCCPSummation(updatedValues));
                          return updatedValues;
                        })
                      }
                      placeholder={t("ccp_followup_keys.hind_leg")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-3/6">
                    <label className="mb-1 block text-black dark:text-white">
                      {t("clean")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="clean"
                      readOnly
                      required
                      value={CCPFollowUp?.clean}
                      placeholder={t("clean")}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-3/6">
                    <label className="mb-1 block text-black dark:text-white">
                      {t("total")}
                    </label>
                    <input
                      type="number"
                      min="0"
                      name="total"
                      readOnly
                      required
                      placeholder={t("total")}
                      value={CCPFollowUp.total}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>

                  <div className="w-full xl:w-3/6">
                    <label className="mb-1 block text-black dark:text-white">
                      {t("percent")}
                    </label>
                    <input
                      type="text"
                      min="0"
                      name="percent"
                      readOnly
                      required
                      placeholder={t("percent")}
                      value={CCPFollowUp.percent}
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-center">
                  <button
                    type="submit"
                    className="text-white bg-gradient-to-br from-cyan-600 to-cyan-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-2"
                  >
                    <Spinner />
                    {t("save")}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
