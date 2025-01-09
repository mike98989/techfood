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

const computeChart = (data: any, t: any, parameterValue: String) => {
  if (data) {
    const inputdata = data.sort((a, b) => a.week - b.week);
    const resultMap = new Map();
    const year_week: any = [];
    const dataValues: any = [];

    for (let i = 0; i < inputdata.length; i++) {
      const year_week = inputdata[i].year + "- wk " + inputdata[i].week;

      const currentYear = new Date().getFullYear(); // Get the current year

      /////// If the date is this year
      //if (inputdata[i].year == currentYear) {
      //console.log("month", month + "-" + week);
      if (!resultMap.has(year_week)) {
        resultMap.set(year_week, {
          dataValues: 0,
          totalWorkersCount: 0,
          totalProductionQuantity: 0,
        });
      }

      const dateEntry = resultMap.get(year_week);
      if (parameterValue == "total_production") {
        dateEntry.dataValues += inputdata[i].production_quantity;
      }

      //const total_work_hours =
      /////Calculatate efficiency, and productivity
      if (parameterValue == "total_work_hours") {
        dateEntry.dataValues += inputdata[i].total_hours * 1;
      }

      if (parameterValue == "efficiency") {
        dateEntry.totalWorkersCount +=
          inputdata[i].supervisor * 1 +
          inputdata[i].quality_control * 1 +
          inputdata[i].operator_staff * 1;

        dateEntry.totalProductionQuantity +=
          inputdata[i].production_quantity * 1;

        dateEntry.dataValues = (
          (dateEntry.totalProductionQuantity * 1) /
          dateEntry.totalWorkersCount /
          100
        ).toFixed(1);
      }
      if (parameterValue == "productivity") {
        dateEntry.dataValues += Math.floor(
          (inputdata[i].production_quantity * 1) /
            (inputdata[i].total_hours * 1)
        );
      }

      if (parameterValue == "worked_hours") {
        dateEntry.dataValues += Math.floor(
          (inputdata[i].production_quantity * 1) /
            (inputdata[i].total_hours * 1)
        );
      }
      //}
    }

    // Convert the Map to an array of objects
    const resultArray = Array.from(
      resultMap,
      ([year_week, { dataValues }]) => ({
        year_week,
        dataValues,
      })
    );

    // Using forEach to loop through the Map
    resultArray.forEach((value) => {
      year_week.push(value.year_week);
      dataValues.push(value.dataValues);
    });

    // Set processed value for chat
    //let processedProteinData: any[] = [];
    let processedData = [{ name: t(parameterValue), data: dataValues }];

    return [processedData, year_week];
  }
};
const staffingProductionChart: React.FC<ChartProps> = (props: any) => {
  const [chartData, setChartData] = useState([]);
  const [filteredChartData, setFilteredChartData] = useState([]);
  const [startDate, setStartData] = useState("");
  const [endDate, setEndData] = useState("");
  const { getWeekNumber } = ReusableMethods();
  const { setIsLoading, Spinner } = SpinnerObject();
  const [chartType, setChartType] = useState("bar");
  const [chartStacked, setChartStacked] = useState(false);
  const [queryParams, setQuetyParams] = useState({});
  const { t } = useTranslation();
  const [year_weeks, setYearWeeks] = useState([]);
  const [parameterValue, setParameterValue] = useState("total_production");
  const [constantLimit, setConstantLimit] = useState(
    constant.staffProductionOutputLimit
  );

  const [dataSeries, setDataSeries] = useState<ChartOneState>({
    series: [],
  });

  useEffect(() => {
    setChartData(props.chartData.data);
    setFilteredChartData(props.chartData.data);
    //setIsLoading(false);
  }, [props]);

  useEffect(() => {
    //setIsLoading(true);
  }, []);

  useEffect(() => {
    if (filteredChartData) {
      let productionEfficiencyProductivityMatch: any = [];
      //let verifyMonitorLimitMatch: any = [];

      chartData &&
        (productionEfficiencyProductivityMatch = computeChart(
          filteredChartData,
          t,
          parameterValue
        ));

      setDataSeries({ series: productionEfficiencyProductivityMatch[0] });
      setYearWeeks(productionEfficiencyProductivityMatch[1]);
    }
  }, [filteredChartData, chartType, parameterValue]);

  const ChartOptions: ApexOptions = {
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
    },
    annotations: {
      yaxis: [
        {
          y: constantLimit, // Threshold value
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
              t(parameterValue) + " " + t("limit") + " (" + constantLimit + ")",
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

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-3 pt-3.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-3.5 xl:col-span-12">
      <Spinner />
      <div className="md:flex md:flex-row w-full">
        <div className="md:w-full text-center justify-center ">
          <div className="flex w-full">
            <div className="mb-3 w-full flex flex-row mt-2">
              <span className="mt-1 mr-2 ml-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
              </span>
              <div className="w-full flex flex-row">
                <div className="w-2/3 text-cyan-900 dark:text-white font-thin">
                  {t("staffing_of_production")} -{" "}
                  {t(parameterValue == "" ? "Availability" : parameterValue)}
                </div>
                <div className="w-1/2 text-cyan-900 dark:text-white font-thin">
                  <select
                    className="rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                    name="availability"
                    onChange={(e) => {
                      const selectedIndex = e.target.selectedIndex;
                      let constValue = 0;
                      if (e.target.value == "total_production") {
                        constValue = constant.staffProductionOutputLimit;
                      }
                      if (e.target.value == "efficiency") {
                        constValue = constant.staffProductionEfficiencyLimit;
                      }
                      if (e.target.value == "productivity") {
                        constValue = constant.staffProductionProductivityLimit;
                      }
                      setConstantLimit(constValue);
                      setParameterValue(e.target.value);
                    }}
                  >
                    <option value="total_production">
                      {t("total_production")}
                    </option>
                    <option value="efficiency">{t("efficiency")}</option>
                    <option value="productivity">{t("productivity")}</option>
                    <option value="total_work_hours">
                      {t("total_work_hours")}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <ReactApexChart
            key={"1"}
            options={ChartOptions}
            series={dataSeries.series}
            type={chartType}
            height={320}
          />
        </div>
      </div>
    </div>
  );
};

export default staffingProductionChart;
