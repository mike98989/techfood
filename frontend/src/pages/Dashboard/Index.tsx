import React, { useEffect } from "react";
import CardDataStats from "../../components/CardDataStats";

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import FoodProductionChart from "../../components/Charts/DashboardCharts/FoodProductionChart";
import FoodProductionLineChart from "../../components/Charts/DashboardCharts/FoodProductionChart_Line";
import DeviationComplaintsPie from "../../components/Charts/DashboardCharts/DeviationComplaintsChart_Pie";
import ProteinLactoseWaterChart from "../../components/Charts/DashboardCharts/ProteinLactoseWaterChart";
import ProteinLactoseWaterThreshold from "../../components/Charts/DashboardCharts/ProteinLactoseWaterThresholdChart";
import DrillSamplesChart from "../../components/Charts/DashboardCharts/DrillSamplesChart";
import chartData from "../../methods/chartData";
import CCPFollowUpChart from "../../components/Charts/DashboardCharts/CCPFollowUpChart";
import OEEFollowUpChart from "../../components/Charts/DashboardCharts/OEEFollowUpChart";
import StaffingProductionChart from "../../components/Charts/DashboardCharts/StaffingProductionChart";
import { ReusableMethods } from "../../methods/ReusableMethods";
import SpinnerObject from "../../components/Spinner/Spinner";

const Index: React.FC = () => {
  const { doesUserHaveProduct } = ReusableMethods();
  const { setIsLoading, Spinner } = SpinnerObject();
  const {
    proteinLactoseData,
    fruitProductionData,
    deviationComplaintsData,
    drillSamplesData,
    headMidRiffData,
    ccpFollowUpData,
    oeeFollowUpData,
    staffingProductionData,
  } = chartData({
    proteinLactoseChart: doesUserHaveProduct("protein_lactose_water"),
    fruitProductionChart: doesUserHaveProduct("fruit_production"),
    deviationComplaintsDataChart: doesUserHaveProduct("deviation_complaints"),
    drillSampleDataChart: doesUserHaveProduct("drill_samples"),
    headMidRiffDataChart: doesUserHaveProduct("head_midriff"),
    ccpFollowUpDataChart: doesUserHaveProduct("ccp_followup"),
    staffingProductionDataChart: doesUserHaveProduct("staffing_production"),
    oeeFollowUpDataChart: doesUserHaveProduct("oee_and_efficiency"),
    hygieneRoundsDataChart: false,
  });
  const user = useSelector((state: any) => state.user.value);
  const { t } = useTranslation();

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <>
      <h2 className="mt-3 ml-3 text-md font-thin text-black dark:text-white md:text-left xs:text-center text-center">
        {t("greeting") + " " + user.data.name}!
      </h2>
      <h2 className="ml-3 text-md font-thin text-black dark:text-white sm:text-title-xl2 md:text-left xs:text-center text-center">
        {t("dashboard")}
      </h2>

      {/* <div className="w-full text-center justify-items-center">
        {" "}
        <Spinner /> Loading
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {proteinLactoseData.data && (
          <>
            <div className="p-2">
              <ProteinLactoseWaterChart chartData={proteinLactoseData} />
            </div>
            <div className="p-2">
              <ProteinLactoseWaterThreshold chartData={proteinLactoseData} />
            </div>
          </>
        )}
        {fruitProductionData.data && (
          <div className="p-2 rounded">
            <FoodProductionChart chartData={fruitProductionData} />
          </div>
        )}
        {deviationComplaintsData.data && (
          <div className="p-2 rounded">
            <DeviationComplaintsPie chartData={deviationComplaintsData} />
          </div>
        )}
        {drillSamplesData.data && (
          <div className="p-2 rounded">
            <DrillSamplesChart chartData={drillSamplesData} />
          </div>
        )}
        {ccpFollowUpData.data && (
          <div className=" p-2 rounded">
            <CCPFollowUpChart chartData={ccpFollowUpData} />
          </div>
        )}
        {oeeFollowUpData.data && (
          <div className="p-2 rounded">
            <OEEFollowUpChart chartData={oeeFollowUpData} />
          </div>
        )}
        {staffingProductionData.data && (
          <div className="p-2 rounded">
            <StaffingProductionChart chartData={staffingProductionData} />
          </div>
        )}
      </div>

      <div className="w-full">
        {/* {proteinLactoseData.data && (
          <div className="w-full md:flex md:flex-row mb-2">
            <div className="w-full md:w-3/5 mr-3 mb-2">
              <ProteinLactoseWaterChart chartData={proteinLactoseData} />
            </div>

            <div className="w-full md:w-3/5">
              <ProteinLactoseWaterThreshold chartData={proteinLactoseData} />
            </div>
          </div>
        )} */}
        <div className="w-full md:flex md:flex-row">
          {/* {fruitProductionData.data && (
            <>
              <div className="w-full md:w-2/6 mr-3 mb-2">
                <FoodProductionChart chartData={fruitProductionData} />
              </div>
            </>
          )} */}
          {/* {deviationComplaintsData.data && (
            <div className="w-full md:w-4/6">
              <DeviationComplaintsPie chartData={deviationComplaintsData} />
            </div>
          )} */}
        </div>

        <div className="w-full md:flex md:flex-row">
          {/* {drillSamplesData.data && (
            <>
              <div className="w-full md:w-3/6 mr-3 mb-2">
                <DrillSamplesChart chartData={drillSamplesData} />
              </div>
            </>
          )} */}

          {/* {ccpFollowUpData.data && (
            <>
              <div className="w-full md:w-3/6 mr-3 mb-2">
                <CCPFollowUpChart chartData={ccpFollowUpData} />
              </div>
            </>
          )} */}
        </div>
        <div className="w-full md:flex md:flex-row">
          {/* {oeeFollowUpData.data && (
            <>
              <div className="w-full md:w-3/6 mr-3 mb-2">
                <OEEFollowUpChart chartData={oeeFollowUpData} />
              </div>
            </>
          )} */}
          {/* {staffingProductionData.data && (
            <>
              <div className="w-full md:w-3/6 mr-3 mb-2">
                <StaffingProductionChart chartData={staffingProductionData} />
              </div>
            </>
          )} */}
        </div>
      </div>
    </>
  );
};

export default Index;
