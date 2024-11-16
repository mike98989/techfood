import React from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import ChartOne from "../../components/Charts/FruitProductionCharts/FruitProductionChart1";
//import ChartTwo from "../../components/Charts/ChartTwo";
import { useTranslation } from "react-i18next";
import chartData from "../../methods/chartData";

const FruitProductionChartPage: React.FC = () => {
  const { proteinLactoseData, fruitProductionData, deviationComplaintsData } =
    chartData({
      proteinLactoseChart: false,
      fruitProductionChart: true,
      deviationComplaintsDataChart: false,
    });

  const { t } = useTranslation();
  const pageTitle = t("fruit_production");
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
        <ChartOne chartData={fruitProductionData} />
        {/* <ChartTwo /> */}
      </div>
    </>
  );
};

export default FruitProductionChartPage;
