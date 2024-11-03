import React from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import ChartOne from "../../components/Charts/DeviationComplaintCharts/DeviationComplaintChart1";
//import ChartTwo from "../../components/Charts/ChartTwo";
import { useTranslation } from "react-i18next";
import chartData from "../../methods/chartData";

const Chart: React.FC = () => {
  const { proteinLactoseData, fruitProductionData, deviationComplaintsData } =
    chartData({
      proteinLactoseChart: true,
      fruitProductionChart: false,
      deviationComplaintsDataChart: true,
    });

  const { t } = useTranslation();
  const pageTitle = t("deviation_complaint");
  return (
    <>
      <Breadcrumb
        links={[
          { title: pageTitle, link: "/" },
          { title: "Chart", link: null },
        ]}
        showNewButton={true}
        pageTitle={pageTitle}
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne chartData={deviationComplaintsData} />
        {/* <ChartTwo /> */}
      </div>
    </>
  );
};

export default Chart;
