import React from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import OEEFollowUpChart from "../../components/Charts/OEEFollowUpCharts/OEEFollowUpChart1";
//import ChartTwo from "../../components/Charts/ChartTwo";
import { useTranslation } from "react-i18next";
import chartData from "../../methods/chartData";

const Chart: React.FC = () => {
  const { oeeFollowUpData } = chartData({
    proteinLactoseChart: false,
    fruitProductionChart: false,
    deviationComplaintsDataChart: false,
    drillSampleDataChart: false,
    headMidRiffDataChart: false,
    ccpFollowUpDataChart: false,
    staffingProductionDataChart: false,
    oeeFollowUpDataChart: true,
  });

  const { t } = useTranslation();
  const pageTitle = t("oee_and_efficiency");
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
        <OEEFollowUpChart chartData={oeeFollowUpData} />
        {/* <ChartTwo /> */}
      </div>
    </>
  );
};

export default Chart;
