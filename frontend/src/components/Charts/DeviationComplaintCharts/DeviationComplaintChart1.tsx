import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import chartData from "../../../methods/chartData";
import { ReusableMethods } from "../../../methods/ReusableMethods";
import SpinnerObject from "../../../components/Spinner/Spinner";
import { useTranslation } from "react-i18next";
import { colors } from "../../../Utils/Constants";

interface ChartProps {
  chartData: any; // Make sure this matches the type of data you're passing
}

const formatDataForChart = (
  dataArray: any,
  t: any
): {
  sectionSeries: any;
  sectionLabels: any;
  deviationTypeSeries: any;
  riskCategoriesSeries: any;
  productsSeries: any;
  months: String;
} => {
  const obj: any = {};
  const deviationTypes: Record<string, Record<string, number>> = {};
  const riskCategories: Record<string, Record<string, number>> = {};
  const products: Record<string, Record<string, number>> = {};
  const monthsSet: Set<string> = new Set();

  const data = dataArray.sort(
    (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  for (let i = 0; i < data.length; i++) {
    //////Section values for bar chart
    if (obj.hasOwnProperty(t(data[i].section.name_key))) {
      obj[t(data[i].section.name_key)]++;
    } else {
      obj[t(data[i].section.name_key)] = 1;
    }

    const date = new Date(data[i].occurance_date);
    let yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    monthsSet.add(yearMonth);

    ////////// Deviation Type
    // Initialize structure for each deviation type
    deviationTypes[data[i].deviation.name_key] ||= {};
    deviationTypes[data[i].deviation.name_key][yearMonth] ||= 0;
    deviationTypes[data[i].deviation.name_key][yearMonth]++;

    // Initialize structure for each Risk Category
    riskCategories[data[i].risk_category.name] ||= {};
    riskCategories[data[i].risk_category.name][yearMonth] ||= 0;
    riskCategories[data[i].risk_category.name][yearMonth]++;

    // Initialize structure for each Products
    products[data[i].product.name_key] ||= {};
    products[data[i].product.name_key][yearMonth] ||= 0;
    products[data[i].product.name_key][yearMonth]++;
  }

  const sectionSeries = Object.values(obj);
  const sectionLabels = Object.keys(obj);

  // Convert the Set of months to an array and sort it in ascending order
  const sortedMonths: string[] = Array.from(monthsSet);
  // Prepare the causeSeries array for the chart
  const deviationTypeSeries: any[] = Object.keys(deviationTypes).map(
    (deviationResult) => {
      return {
        name: t(deviationResult),
        data: sortedMonths.map(
          (month) => deviationTypes[deviationResult][month] || 0
        ), // Fill in counts for each month
      };
    }
  );

  // Prepare the riskCategoriesSeries array for the chart
  const riskCategoriesSeries: any[] = Object.keys(riskCategories).map(
    (riskCategoriesResult) => {
      return {
        name: riskCategoriesResult,
        data: sortedMonths.map(
          (month) => riskCategories[riskCategoriesResult][month] || 0
        ), // Fill in counts for each month
      };
    }
  );

  // Prepare the riskCategoriesSeries array for the chart
  const productsSeries: any[] = Object.keys(products).map((productsResult) => {
    return {
      name: t(productsResult),
      data: sortedMonths.map((month) => products[productsResult][month] || 0), // Fill in counts for each month
    };
  });
  return {
    sectionSeries,
    sectionLabels,
    deviationTypeSeries,
    riskCategoriesSeries,
    productsSeries,
    months: sortedMonths,
  };
};

const DeviationComplaintChart1: React.FC<ChartProps> = (props: any) => {
  const [chartData, setChartData] = useState([]);
  const [filteredChartData, setFilteredChartData] = useState([]);
  const [startDate, setStartData] = useState("");
  const [endDate, setEndData] = useState("");
  const { isDateInRange } = ReusableMethods();
  const { setIsLoading, Spinner } = SpinnerObject();
  const [months, setMonths] = useState([]);
  const [chartType, setChartType] = useState("area");
  const [chartStacked, setChartStacked] = useState(false);
  const [firstDate, setFirstDate] = useState(false);
  const [lastDate, setLastDate] = useState(false);
  const { t } = useTranslation();
  //const [months, setSectionLabels] = useState([]);
  const [chartSectionLabels, setSectionLabels] = useState([]);
  const [chartSectionSeries, setChartSectionSeries] = useState({ series: [] });
  const [chartDeviationSeries, setChartDeviationSeries] = useState({
    series: [],
  });
  const [chartRiskCategoriesSeries, setChartRiskCategoriesSeries] = useState({
    series: [],
  });
  const [chartProductsSeries, setChartProductsSeries] = useState({
    series: [],
  });

  const sectionChartOptions = {
    chart: {
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    labels: chartSectionLabels,
    legend: {
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "50%", // Adjust the size of the donut (reduce or increase)
        },
      },
    },
  };

  const deviationChartOptions: ApexOptions = {
    colors: colors,
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
    },
    chart: {
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    stroke: {
      width: 1, // Change this value to reduce/increase line thickness
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: months,
      labels: {
        show: true, // Hides the X-axis labels
        format: "MM dd, yyyy",
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tickAmount: 6, // Number of labels on x-axis to control grouping interval
    },
    tooltip: {
      x: {
        format: "MMM dd, yyyy", // Format for tooltip date
      },
    },
    fill: {
      opacity: 1,
    },
    dataLabels: {
      enabled: false,
    },
  };

  const riskCategoriesChartOptions: ApexOptions = {
    colors: colors,
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
    },
    chart: {
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    stroke: {
      width: 1, // Change this value to reduce/increase line thickness
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: months,
      labels: {
        show: true, // Hides the X-axis labels
        format: "MM dd, yyyy",
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tickAmount: 6, // Number of labels on x-axis to control grouping interval
    },
    tooltip: {
      x: {
        format: "MMM dd, yyyy", // Format for tooltip date
      },
    },
    fill: {
      opacity: 1,
    },
    dataLabels: {
      enabled: false,
    },
  };

  const productsChartOptions: ApexOptions = {
    colors: colors,
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
    },
    chart: {
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
    stroke: {
      width: 1, // Change this value to reduce/increase line thickness
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: months,
      labels: {
        show: true, // Hides the X-axis labels
        format: "MM dd, yyyy",
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      tickAmount: 6, // Number of labels on x-axis to control grouping interval
    },
    tooltip: {
      x: {
        format: "MMM dd, yyyy", // Format for tooltip date
      },
    },
    fill: {
      opacity: 1,
    },
    dataLabels: {
      enabled: false,
    },
  };

  useEffect(() => {
    setChartData(props.chartData.data);
    setFilteredChartData(props.chartData.data);
    if (chartData) {
      const [firstDate, lastDate] = [...chartData].sort(
        (a, b) => new Date(a.occurance_date) - new Date(b.occurance_date)
      );
      firstDate && setFirstDate(firstDate.occurance_date);
      lastDate && setLastDate(lastDate.occurance_date);
    }

    setIsLoading(false);
  }, [props]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (filteredChartData) {
      let value: any[] = [];
      chartData && (value = formatDataForChart(filteredChartData, t));
      const {
        sectionSeries,
        sectionLabels,
        deviationTypeSeries,
        riskCategoriesSeries,
        productsSeries,
        months,
      } = value;

      setChartSectionSeries({ series: sectionSeries });
      setSectionLabels(sectionLabels);
      setChartDeviationSeries({ series: deviationTypeSeries });
      setChartRiskCategoriesSeries({ series: riskCategoriesSeries });
      setChartProductsSeries({ series: productsSeries });
      setMonths(months);
    }
  }, [filteredChartData, chartType]);

  useEffect(() => {
    if (chartData) {
      const start = Date.parse(startDate);
      const end = Date.parse(endDate);
      if (!isNaN(start) && !isNaN(end)) {
        const filteredData = chartData.filter((data: any, i) =>
          isDateInRange({
            dateToCheck: data.occurance_date,
            startDate: startDate,
            endDate: endDate,
          })
        );
        setFilteredChartData(filteredData);
        console.log("filtered", startDate, endDate, filteredData);
      }
    }
  }, [startDate, endDate]);

  //   const handleReset = () => {
  //     setState((prevState) => ({
  //       ...prevState,
  //     }));
  //   };
  //   handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-3 pt-3.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-3.5 xl:col-span-12">
      <Spinner />

      {firstDate && lastDate && (
        <h5 className="text-center text-title-sm font-thin text-black dark:text-white dark:text-whit ml-3 mt-0 mb-3">
          {t("deviation_complaints") +
            " " +
            t("from") +
            " " +
            firstDate +
            " " +
            t("to") +
            " " +
            lastDate}
        </h5>
      )}
      <div className="">
        <div className="flex w-full justify-center">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4 mb-3">
            <div className="w-2/8 mr-2">
              <span className="text-sm pl-3">{t("from")}</span>
              <input
                type="date"
                // min="2024-01-01"
                // max="2024-12-31"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                onChange={(e) => {
                  setStartData(e.target.value);
                  setFirstDate(e.target.value);
                }}
              />
            </div>
            <div className="w-2/8 mr-2">
              <span className="text-sm pl-3">
                {t("to")} {endDate}
              </span>
              <input
                type="date"
                // min="2024-01-01"
                // max="2024-12-31"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter  dark:bg-form-input dark:text-white dark:focus:border-primary"
                onChange={(e) => {
                  setEndData(e.target.value);
                  setLastDate(e.target.value);
                }}
              />
            </div>
            <div className="w-2/8">
              <span className="text-sm pl-1">{t("chart_type")}</span>
              <select
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter  dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                onChange={(e) => {
                  setChartType(e.target.value);
                }}
              >
                <option value="area">{t("area")}</option>
                <option value="line">{t("line")}</option>
                <option value="bar">{t("bar")}</option>
              </select>
            </div>

            <div className="w-2/8">
              <span className="text-sm pl-1">{t("stack")}</span>
              <select
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter  dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                onChange={(e) => {
                  setChartStacked(e.target.value);
                }}
              >
                <option value="false">{t("no")}</option>
                <option value="true">{t("yes")}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex mt-4 md:flex-row w-full">
        <div className="-ml-5 md:w-2/6">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("deviation_complaints") + " - " + t("section")}
            </p>
          </div>
          {chartSectionSeries.series && (
            <ReactApexChart
              options={sectionChartOptions}
              series={chartSectionSeries.series}
              type="donut"
              height={350}
            />
          )}
        </div>

        <div className="-ml-5 md:w-4/6">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("deviation_complaints") + " - " + t("deviation_type")}
            </p>
          </div>
          {chartDeviationSeries.series && (
            <ReactApexChart
              options={deviationChartOptions}
              series={chartDeviationSeries.series}
              type={chartType}
              height={350}
            />
          )}
        </div>
      </div>

      <div className="md:flex mt-4 md:flex-row w-full">
        <div className="-ml-5 md:w-3/6">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("deviation_complaints") + " - " + t("risk_category")}
            </p>
          </div>
          {chartRiskCategoriesSeries.series && (
            <ReactApexChart
              options={riskCategoriesChartOptions}
              series={chartRiskCategoriesSeries.series}
              type={chartType}
              height={350}
            />
          )}
        </div>

        <div className="-ml-5 md:w-3/6">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("deviation_complaints") + " - " + t("product")}
            </p>
          </div>
          {chartProductsSeries.series && (
            <ReactApexChart
              options={productsChartOptions}
              series={chartProductsSeries.series}
              type={chartType}
              height={350}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DeviationComplaintChart1;
