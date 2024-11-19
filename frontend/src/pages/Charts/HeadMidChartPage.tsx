import React from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import HeadMidRiffDataChart from "../../components/Charts/HeadMidriffCharts/HeadMidriffChart1";
//import ChartTwo from "../../components/Charts/ChartTwo";
import { useTranslation } from "react-i18next";
import chartData from "../../methods/chartData";

const Chart: React.FC = () => {
  const { headMidRiffData } = chartData({
    proteinLactoseChart: false,
    fruitProductionChart: false,
    deviationComplaintsDataChart: false,
    drillSampleDataChart: false,
    headMidRiffDataChart: true,
  });

  const { t } = useTranslation();
  const pageTitle = t("slaughtered_head_meat_midriff");
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
        <HeadMidRiffDataChart chartData={headMidRiffData} />
        {/* <ChartTwo /> */}
      </div>
    </>
  );
};

export default Chart;
