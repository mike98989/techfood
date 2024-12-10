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

const Index: React.FC = () => {
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
    proteinLactoseChart: true,
    fruitProductionChart: true,
    deviationComplaintsDataChart: true,
    drillSampleDataChart: true,
    headMidRiffDataChart: true,
    ccpFollowUpDataChart: true,
    staffingProductionDataChart: true,
    oeeFollowUpDataChart: true,
    hygieneRoundsDataChart: false,
  });
  const user = useSelector((state: any) => state.user.value);
  const { t } = useTranslation();

  // const foodConstant = {
  //   constants: 72.5,
  //   approvedText: "satisfactory",
  //   unApprovedText: "actions_required",
  // };
  // useEffect(() => {
  //   proteinLactoseWater();
  // }, []);
  return (
    <>
      <h2 className="mt-3 ml-3 text-md font-thin text-black dark:text-white md:text-left xs:text-center text-center">
        {t("greeting") + " " + user.data.name}!
      </h2>
      <h2 className="ml-3 text-md font-thin text-black dark:text-white sm:text-title-xl2 md:text-left xs:text-center text-center">
        {t("dashboard")}
      </h2>

      <div className="w-full">
        {proteinLactoseData.data && (
          <div className="w-full md:flex md:flex-row mb-2">
            <div className="w-full md:w-3/5 mr-3 mb-2">
              <ProteinLactoseWaterChart chartData={proteinLactoseData} />
            </div>

            <div className="w-full md:w-3/5">
              <ProteinLactoseWaterThreshold chartData={proteinLactoseData} />
            </div>
          </div>
        )}
        <div className="w-full md:flex md:flex-row">
          {fruitProductionData.data && (
            <>
              <div className="w-full md:w-2/6 mr-3 mb-2">
                <FoodProductionChart chartData={fruitProductionData} />
              </div>
            </>
          )}
          {deviationComplaintsData.data && (
            <div className="w-full md:w-4/6">
              <DeviationComplaintsPie chartData={deviationComplaintsData} />
            </div>
          )}
        </div>

        <div className="w-full md:flex md:flex-row">
          {drillSamplesData.data && (
            <>
              <div className="w-full md:w-3/6 mr-3 mb-2">
                <DrillSamplesChart chartData={drillSamplesData} />
              </div>
            </>
          )}

          {ccpFollowUpData.data && (
            <>
              <div className="w-full md:w-3/6 mr-3 mb-2">
                <CCPFollowUpChart chartData={ccpFollowUpData} />
              </div>
            </>
          )}
        </div>
        <div className="w-full md:flex md:flex-row">
          {oeeFollowUpData.data && (
            <>
              <div className="w-full md:w-3/6 mr-3 mb-2">
                <OEEFollowUpChart chartData={oeeFollowUpData} />
              </div>
            </>
          )}
          {staffingProductionData.data && (
            <>
              <div className="w-full md:w-3/6 mr-3 mb-2">
                <StaffingProductionChart chartData={staffingProductionData} />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Index;
