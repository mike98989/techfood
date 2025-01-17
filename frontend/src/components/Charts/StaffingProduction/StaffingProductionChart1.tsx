import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import chartData from "../../../methods/chartData";
import { ReusableMethods } from "../../../methods/ReusableMethods";
import SpinnerObject from "../../../components/Spinner/Spinner";
import { colors, constant } from "../../../Utils/Constants";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}
interface ChartProps {
  chartData: any; // Make sure this matches the type of data you're passing
}

const computeChart = (data: any, t: any) => {
  if (data) {
    const inputdata = data.sort((a, b) => a.week - b.week);
    const resultMap = new Map();
    const year_week: any = [];
    const productionValues: any = [];
    const efficiencyValues: any = [];
    const productivityValues: any = [];
    const workedHoursValues: any = [];
    //const currentYear = new Date().getFullYear(); // Get the current year
    for (let i = 0; i < inputdata.length; i++) {
      const year_week = inputdata[i].year + "- wk " + inputdata[i].week;
      //console.log("month", month + "-" + week);
      if (!resultMap.has(year_week)) {
        resultMap.set(year_week, {
          productionValues: 0,
          efficiencyValues: 0,
          productivityValues: 0,
          totalWorkersCount: 0,
          totalWorkHours: 0,
          totalProductionQuantity: 0,
        });
      }

      const dateEntry = resultMap.get(year_week);
      dateEntry.productionValues += inputdata[i].production_quantity;
      dateEntry.totalWorkersCount +=
        inputdata[i].supervisor * 1 +
        inputdata[i].quality_control * 1 +
        inputdata[i].operator_staff * 1;

      dateEntry.totalWorkHours += inputdata[i].total_hours * 1;

      dateEntry.totalProductionQuantity += inputdata[i].production_quantity * 1;
      /////Calculatate efficiency, and productivity
      const total_work_hours = inputdata[i].total_hours * 1;

      dateEntry.efficiencyValues = (
        (dateEntry.totalProductionQuantity * 1) /
        dateEntry.totalWorkersCount /
        100
      ).toFixed(1);

      dateEntry.productivityValues += Math.floor(
        (inputdata[i].production_quantity * 1) / total_work_hours
      );
    }

    // Convert the Map to an array of objects
    const resultArray = Array.from(
      resultMap,
      ([
        year_week,
        {
          productionValues,
          efficiencyValues,
          productivityValues,
          totalWorkHours,
        },
      ]) => ({
        year_week,
        productionValues,
        efficiencyValues,
        productivityValues,
        totalWorkHours,
      })
    );

    // Using forEach to loop through the Map
    resultArray.forEach((value) => {
      year_week.push(value.year_week);
      productionValues.push(value.productionValues);
      efficiencyValues.push(value.efficiencyValues);
      productivityValues.push(value.productivityValues);
      workedHoursValues.push(value.totalWorkHours);
    });

    // Set processed value for chat
    //let processedProteinData: any[] = [];
    let processedProductionData = [
      { name: t("total_production"), data: productionValues },
    ];
    let processedEfficiencynData = [
      { name: t("efficiency"), data: efficiencyValues },
    ];
    let processedProductivityData = [
      { name: t("productivity"), data: productivityValues },
    ];
    let processedWorkedHoursData = [
      { name: t("total_work_hours"), data: workedHoursValues },
    ];
    return [
      processedProductionData,
      processedEfficiencynData,
      processedProductivityData,
      processedWorkedHoursData,
      year_week,
    ];
  }
};
const staffingProductionChart: React.FC<ChartProps> = (props: any) => {
  const [chartData, setChartData] = useState([]);
  const [filteredChartData, setFilteredChartData] = useState([]);
  const [startDate, setStartData] = useState("");
  const [endDate, setEndData] = useState("");
  const { setIsLoading, Spinner } = SpinnerObject();
  const [chartType, setChartType] = useState("bar");
  const [chartStacked, setChartStacked] = useState(false);
  const [firstDate, setFirstDate] = useState(false);
  const [lastDate, setLastDate] = useState(false);
  const [queryParams] = useState({});
  const { t } = useTranslation();
  const [year_weeks, setYearWeeks] = useState([]);
  const user = useSelector((state: any) => state.user.value);
  const { getWeekNumber } = ReusableMethods();
  const [productionSeries, setProductionSeries] = useState<ChartOneState>({
    series: [],
  });
  const [efficiencySeries, setEfficiencySeries] = useState<ChartOneState>({
    series: [],
  });
  const [productivitySeries, setProductivitySeries] = useState<ChartOneState>({
    series: [],
  });
  const [workedHoursSeries, setWorkedHoursSeries] = useState<ChartOneState>({
    series: [],
  });

  useEffect(() => {
    setChartData(props.chartData.data);
    setFilteredChartData(props.chartData.data);

    if (chartData) {
      const [firstDate, lastDate] = [...chartData].sort(
        (a, b) => a.week - b.week
      );
      firstDate && setFirstDate(firstDate.created_at.split("T")[0]);
      lastDate && setLastDate(lastDate.created_at.split("T")[0]);
    }

    setIsLoading(false);
  }, [props]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (filteredChartData) {
      let productionEfficiencyProductivityMatch: any = [];
      //let verifyMonitorLimitMatch: any = [];

      chartData &&
        (productionEfficiencyProductivityMatch = computeChart(
          filteredChartData,
          t
        ));

      setProductionSeries({ series: productionEfficiencyProductivityMatch[0] });
      setEfficiencySeries({ series: productionEfficiencyProductivityMatch[1] });
      setProductivitySeries({
        series: productionEfficiencyProductivityMatch[2],
      });
      setWorkedHoursSeries({
        series: productionEfficiencyProductivityMatch[3],
      });
      setYearWeeks(productionEfficiencyProductivityMatch[4]);
    }
  }, [filteredChartData, chartType]);

  useEffect(() => {
    if (chartData) {
      //   const start = Date.parse(startDate);
      //   const end = Date.parse(endDate);
      const startWeek = getWeekNumber(new Date(startDate));
      const endWeek = getWeekNumber(new Date(endDate));

      let filteredData: any = chartData;
      if (!isNaN(startWeek) && !isNaN(endWeek)) {
        filteredData = chartData.filter(
          (data: any, i) => data.week >= startWeek && data.week <= endWeek
        );
        setFilteredChartData(filteredData);
      }
      if (Object.keys(queryParams).length > 0) {
        filteredData = filteredData.filter((item) =>
          Object.entries(queryParams).some(([key, value]) =>
            value ? item[key] === value : item[key] != value
          )
        );
        setFilteredChartData(filteredData);
      }
    }
  }, [startDate, endDate, queryParams]);

  const ChartProductionOptions: ApexOptions = {
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
    },
    annotations: {
      yaxis: [
        {
          y: constant.staffProductionOutputLimit, // Threshold value
          borderColor: "#000000",
          strokeDashArray: 4, // Optional: makes the line dashed
          opacity: 0.8, // Optional: sets line opacity
          label: {
            borderColor: "#000000",
            style: {
              color: "#000000",
              background: "#000000",
              fontWeight: "bold",
              fontSize: "13px",
            },
            text:
              t("total_production") +
              " " +
              t("limit") +
              " (" +
              constant.staffProductionOutputLimit +
              ")",
            position: "right", // Positions label on the left side
            offsetX: 0,
          },
        },
      ],
    },
    //colors: ["#3C50E0", "#80CAEE"],
    colors: ["#006400", "#f84c0b"], // Array of colors
    chart: {
      type: chartType,
      fontFamily: "Satoshi, sans-serif",
      stacked: chartStacked,
      toolbar: {
        show: true,
      },
    },

    stroke: {
      width: [2, 2],
      curve: "straight",
    },

    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      //strokeColors: ["#3056D3", "#80CAEE"],
      strokeColors: ["#006400", "#f84c0b", "#F7DC6F", "#D4AC0D"], // Array of colors
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      categories: year_weeks,
      labels: {
        show: true, // Hides the X-axis labels
        //format: "MM dd, yyyy",
      },
      tickAmount: 10, // Number of labels on x-axis to control grouping interval
    },
  };

  const ChartEfficiencyOptions: ApexOptions = {
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
    },
    annotations: {
      yaxis: [
        {
          y: constant.staffProductionEfficiencyLimit, // Threshold value
          borderColor: "#000000",
          strokeDashArray: 4, // Optional: makes the line dashed
          opacity: 0.8, // Optional: sets line opacity
          label: {
            borderColor: "#000000",
            style: {
              color: "#000000",
              background: "#000000",
              fontWeight: "bold",
              fontSize: "13px",
            },
            text:
              t("efficiency") +
              " " +
              t("limit") +
              " (" +
              constant.staffProductionEfficiencyLimit +
              " %)",
            position: "right", // Positions label on the left side
            offsetX: 0,
          },
        },
      ],
    },
    colors: ["#3C50E0", "#80CAEE"],
    //colors: ["#006400", "#f84c0b"], // Array of colors
    chart: {
      type: chartType,
      fontFamily: "Satoshi, sans-serif",
      stacked: chartStacked,
      toolbar: {
        show: true,
      },
    },

    stroke: {
      width: [2, 2],
      curve: "straight",
    },

    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      //strokeColors: ["#3056D3", "#80CAEE"],
      strokeColors: ["#006400", "#f84c0b", "#F7DC6F", "#D4AC0D"], // Array of colors
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      categories: year_weeks,
      labels: {
        show: true, // Hides the X-axis labels
        //format: "MM dd, yyyy",
      },
      tickAmount: 10, // Number of labels on x-axis to control grouping interval
    },
    //   tooltip: {
    //     x: {
    //       format: "MMM dd, yyyy", // Format for tooltip date
    //     },
    //   },
  };

  const ChartProductivityOption: ApexOptions = {
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
    },
    annotations: {
      yaxis: [
        {
          y: constant.staffProductionProductivityLimit, // Threshold value
          borderColor: "#000000",
          strokeDashArray: 4, // Optional: makes the line dashed
          opacity: 0.8, // Optional: sets line opacity
          label: {
            borderColor: "#000000",
            style: {
              color: "white",
              background: "#000000",
            },
            text:
              t("productivity") +
              " " +
              t("limit") +
              " (" +
              constant.staffProductionProductivityLimit +
              ")",
            position: "right", // Positions label on the left side
            offsetX: 0,
          },
        },
      ],
    },
    colors: ["#f84c0b", "#f84c0b"],
    //colors: ["#006400", "#f84c0b"], // Array of colors
    chart: {
      type: chartType,
      fontFamily: "Satoshi, sans-serif",
      stacked: chartStacked,
      toolbar: {
        show: true,
      },
    },

    stroke: {
      width: [2, 2],
      curve: "straight",
    },

    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      //strokeColors: ["#3056D3", "#80CAEE"],
      strokeColors: ["#006400", "#f84c0b", "#F7DC6F", "#D4AC0D"], // Array of colors
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      categories: year_weeks,
      labels: {
        show: true, // Hides the X-axis labels
        //format: "MM dd, yyyy",
      },
      tickAmount: 10, // Number of labels on x-axis to control grouping interval
    },
  };

  const ChartWorkHoursOption: ApexOptions = {
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
    },
    colors: colors,
    //colors: ["#006400", "#f84c0b"], // Array of colors
    chart: {
      type: chartType,
      fontFamily: "Satoshi, sans-serif",
      stacked: chartStacked,
      toolbar: {
        show: true,
      },
    },

    stroke: {
      width: [2, 2],
      curve: "straight",
    },

    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      //strokeColors: ["#3056D3", "#80CAEE"],
      strokeColors: ["#006400", "#f84c0b", "#F7DC6F", "#D4AC0D"], // Array of colors
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      categories: year_weeks,
      labels: {
        show: true, // Hides the X-axis labels
        //format: "MM dd, yyyy",
      },
      tickAmount: 10, // Number of labels on x-axis to control grouping interval
    },
  };
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-gray px-3 pt-3.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-3.5 xl:col-span-12">
      <Spinner />
      {firstDate && lastDate && (
        <h5 className="text-center text-title-sm font-thin text-black dark:text-white dark:text-whit ml-3 mt-0 mb-3">
          {t("staffing_of_production") +
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
        <div className="md:flex md:flex-row w-full rounded-md bg-whiter p-1.5 dark:bg-meta-4 mb-3">
          <div className="w-2/10 mr-2">
            <span className="text-sm pl-3">{t("from")}</span>
            <input
              type="date"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              onChange={(e) => {
                setStartData(e.target.value);
                setFirstDate(e.target.value);
              }}
            />
          </div>
          <div className="w-2/10 mr-2">
            <span className="text-sm pl-3">{t("to")}</span>
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
          <div className="w-2/10 mr-2">
            <span className="text-sm pl-1">{t("chart_type")}</span>
            <select
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter  dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
              onChange={(e) => {
                setChartType(e.target.value);
              }}
            >
              <option value="bar">{t("bar")}</option>
              <option value="area">{t("area")}</option>
              <option value="line">{t("line")}</option>
            </select>
          </div>

          <div className="w-2/10">
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

      {/* Satisfactory and not satisfactory chart */}
      <div className="md:flex md:flex-row w-full">
        <div className="md:w-1/2 text-center justify-center ">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("total_production")}
            </p>
          </div>
          <ReactApexChart
            key={"1"}
            options={ChartProductionOptions}
            series={productionSeries.series}
            type={chartType}
            height={320}
          />
        </div>

        <div className="md:w-1/2 text-center justify-center ">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("efficiency")} %
            </p>
          </div>
          <ReactApexChart
            key={"1"}
            options={ChartEfficiencyOptions}
            series={efficiencySeries.series}
            type={chartType}
            height={320}
          />
        </div>
      </div>

      <div className="md:flex md:flex-row w-full">
        <div className="md:w-1/2 text-center justify-center ">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("productivity")} %
            </p>
          </div>
          <ReactApexChart
            key={"1"}
            options={ChartProductivityOption}
            series={productivitySeries.series}
            type={chartType}
            height={320}
          />
        </div>

        <div className="md:w-1/2 text-center justify-center ">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("total_work_time_in_min")}
            </p>
          </div>
          <ReactApexChart
            key={"1"}
            options={ChartWorkHoursOption}
            series={workedHoursSeries.series}
            type={chartType}
            height={320}
          />
        </div>
      </div>
    </div>
  );
};

export default staffingProductionChart;
