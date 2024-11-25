import React from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import CCPFollowUpChart from "../../components/Charts/CCPFollowUpCharts/CCPFollowUpChart1";
//import ChartTwo from "../../components/Charts/ChartTwo";
import { useTranslation } from "react-i18next";
import chartData from "../../methods/chartData";

const Chart: React.FC = () => {
  const { ccpFollowUpData } = chartData({
    proteinLactoseChart: false,
    fruitProductionChart: false,
    deviationComplaintsDataChart: false,
    drillSampleDataChart: false,
    headMidRiffDataChart: false,
    ccpFollowUpDataChart: true,
    staffingProductionDataChart: false,
  });

  const { t } = useTranslation();
  const pageTitle = t("ccp_follow_up");
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
        <CCPFollowUpChart chartData={ccpFollowUpData} />
        {/* <ChartTwo /> */}
      </div>
    </>
  );
};

export default Chart;
