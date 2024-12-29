import React from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import ChartOne from "../../components/Charts/ProductivityFollowUpCharts/ProductivityFollowUpChart1";
import { useTranslation } from "react-i18next";
import chartData from "../../methods/chartData";

const Chart: React.FC = () => {
  const { productivityFollowUpData } = chartData({
    proteinLactoseChart: false,
    fruitProductionChart: false,
    deviationComplaintsDataChart: false,
    drillSampleDataChart: false,
    headMidRiffDataChart: false,
    ccpFollowUpDataChart: false,
    staffingProductionDataChart: false,
    oeeFollowUpDataChart: false,
    hygieneRoundsDataChart: false,
    productivityDataChart: true,
  });

  const { t } = useTranslation();
  const pageTitle = t("followup_of_productivity");
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
        <ChartOne chartData={productivityFollowUpData} />
        {/* <ChartTwo /> */}
      </div>
    </>
  );
};

export default Chart;
