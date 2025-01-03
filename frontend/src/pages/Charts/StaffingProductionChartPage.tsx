import React from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import ChartOne from "../../components/Charts/StaffingProduction/StaffingProductionChart1";
//import ChartTwo from "../../components/Charts/ChartTwo";
import { useTranslation } from "react-i18next";
import chartData from "../../methods/chartData";

const Chart: React.FC = () => {
  const { staffingProductionData } = chartData({
    proteinLactoseChart: false,
    fruitProductionChart: false,
    deviationComplaintsDataChart: false,
    drillSampleDataChart: false,
    headMidRiffDataChart: false,
    ccpFollowUpDataChart: false,
    staffingProductionDataChart: true,
    oeeFollowUpDataChart: false,
    hygieneRoundsDataChart: false,
  });

  const { t } = useTranslation();
  const pageTitle = t("staffing_of_production");
  return (
    <>
      <Breadcrumb
        links={[
          { title: pageTitle, link: "/" },
          { title: t("chart"), link: null },
        ]}
        showNewButton={true}
        pageTitle={pageTitle}
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne chartData={staffingProductionData} />
        {/* <ChartTwo /> */}
      </div>
    </>
  );
};

export default Chart;
