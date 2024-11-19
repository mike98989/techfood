import React from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import DrillSamplesChart from "../../components/Charts/DrillSamplesCharts/DrillSamplesChart1";
//import ChartTwo from "../../components/Charts/ChartTwo";
import { useTranslation } from "react-i18next";
import chartData from "../../methods/chartData";

const Chart: React.FC = () => {
  const { drillSamplesData } = chartData({
    proteinLactoseChart: false,
    fruitProductionChart: false,
    deviationComplaintsDataChart: false,
    drillSampleDataChart: true,
    headMidRiffDataChart: false,
  });

  const { t } = useTranslation();
  const pageTitle = t("drill_samples_in_slaughter");
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
        <DrillSamplesChart chartData={drillSamplesData} />
        {/* <ChartTwo /> */}
      </div>
    </>
  );
};

export default Chart;
