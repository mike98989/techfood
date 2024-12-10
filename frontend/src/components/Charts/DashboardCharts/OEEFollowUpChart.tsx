import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import chartData from "../../../methods/chartData";
import { ReusableMethods } from "../../../methods/ReusableMethods";
import SpinnerObject from "../../../components/Spinner/Spinner";
import { constant, colors } from "../../../Utils/Constants";
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

const computeChart = (data: any, t: any, parameterValue: string) => {
  if (data) {
    const inputdata = data.sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const resultMap = new Map();
    const date: any = [];
    const dataValues: any = [];

    //const currentYear = new Date().getFullYear(); // Get the current year
    for (let i = 0; i < inputdata.length; i++) {
      const date = inputdata[i].date;
      const dateToCheck = new Date(date);
      const currentYear = new Date().getFullYear(); // Get the current year

      /////// If the date is this year
      if (dateToCheck.getFullYear() === currentYear) {
        if (!resultMap.has(date)) {
          resultMap.set(date, {
            dataValues: 0,
          });
        }

        const dateEntry = resultMap.get(date);

        if (parameterValue == "availability") {
          dateEntry.dataValues = Math.round(inputdata[i].availability);
        }
        if (parameterValue === "performance") {
          dateEntry.dataValues = Math.round(inputdata[i].performance);
        }
        if (parameterValue === "quality") {
          dateEntry.dataValues = Math.round(inputdata[i].quality);
        }
        if (parameterValue === "oee") {
          dateEntry.dataValues = Math.round(inputdata[i].overall_oee);
        }
      }
    }

    // Convert the Map to an array of objects
    const resultArray = Array.from(resultMap, ([date, { dataValues }]) => ({
      date,
      dataValues,
    }));

    // Using forEach to loop through the Map
    resultArray.forEach((value) => {
      date.push(value.date);
      dataValues.push(value.dataValues);
    });

    let processeData = [
      { name: t(parameterValue.toLowerCase()), data: dataValues },
    ];

    return [processeData, date];
  }
};
const OEEFollowUpChart: React.FC<ChartProps> = (props: any) => {
  const [chartData, setChartData] = useState([]);
  const [filteredChartData, setFilteredChartData] = useState([]);
  const [startDate, setStartData] = useState("");
  const [endDate, setEndData] = useState("");
  const { isDateInRange, allRequest, getWeekNumber } = ReusableMethods();
  const { setIsLoading, Spinner } = SpinnerObject();
  const [chartType, setChartType] = useState("bar");
  const [chartStacked, setChartStacked] = useState(false);
  const [queryParams, setQuetyParams] = useState({});
  const { t } = useTranslation();
  const [dates, setDates] = useState([]);
  const [parameterValue, setParameterValue] = useState("availability");
  const [constantLimit, setConstantLimit] = useState(
    constant.OEEAvailabilityLimit
  );

  const [dataSeries, setDataSeries] = useState<ChartOneState>({
    series: [],
  });

  useEffect(() => {
    setChartData(props.chartData.data);
    setFilteredChartData(props.chartData.data);

    setIsLoading(false);
  }, [props]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (filteredChartData) {
      let availabilityPerformanceQualityMatch: any = [];
      //let verifyMonitorLimitMatch: any = [];

      chartData &&
        (availabilityPerformanceQualityMatch = computeChart(
          filteredChartData,
          t,
          parameterValue
        ));

      setDataSeries({ series: availabilityPerformanceQualityMatch[0] });
      setDates(availabilityPerformanceQualityMatch[1]);
    }
  }, [filteredChartData, chartType, parameterValue]);

  useEffect(() => {
    if (chartData) {
      const start = Date.parse(startDate);
      const end = Date.parse(endDate);

      //let filteredData: any = chartData;
      if (!isNaN(start) && !isNaN(end)) {
        const filteredData = chartData.filter((data: any, i) =>
          isDateInRange({
            dateToCheck: data.date,
            startDate: startDate,
            endDate: endDate,
          })
        );
        setFilteredChartData(filteredData);
      }
    }
  }, [startDate, endDate, queryParams]);

  const ChartAvailabilityOptions: ApexOptions = {
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
              color: "white",
              background: "#000000",
            },
            text:
              t("availability") + " " + t("limit") + " (" + constantLimit + ")",
            position: "right", // Positions label on the left side
            offsetX: 0,
          },
        },
      ],
    },
    //colors: ["#3C50E0", "#80CAEE"],
    colors: colors,
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
      strokeColors: colors, // Array of colors
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
      categories: dates,
      labels: {
        show: true, // Hides the X-axis labels
        //format: "MM dd, yyyy",
      },
      tickAmount: 6, // Number of labels on x-axis to control grouping interval
    },
  };

  const ChartPerformanceOption: ApexOptions = {
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
    },
    annotations: {
      yaxis: [
        {
          y: constant.OEEPerformanceLimit, // Threshold value
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
              t("performance") +
              " " +
              t("limit") +
              " (" +
              constant.OEEPerformanceLimit +
              ")",
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
      strokeColors: colors[2], // Array of colors
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
      categories: dates,
      labels: {
        show: true, // Hides the X-axis labels
        //format: "MM dd, yyyy",
      },
      tickAmount: 6, // Number of labels on x-axis to control grouping interval
    },
    //   tooltip: {
    //     x: {
    //       format: "MMM dd, yyyy", // Format for tooltip date
    //     },
    //   },
  };

  const ChartQualityOption: ApexOptions = {
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
    },
    annotations: {
      yaxis: [
        {
          y: constant.OEEQualityLimit, // Threshold value
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
              t("performance") +
              " " +
              t("limit") +
              " (" +
              constant.OEEQualityLimit +
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
      strokeColors: colors[1], // Array of colors
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
      categories: dates,
      labels: {
        show: true, // Hides the X-axis labels
        //format: "MM dd, yyyy",
      },
      tickAmount: 6, // Number of labels on x-axis to control grouping interval
    },
  };

  const ChartOEEOverallOption: ApexOptions = {
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
    },
    annotations: {
      yaxis: [
        {
          y: constant.OEEOverAllLimit, // Threshold value
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
              t("overall_oee") +
              " " +
              t("limit") +
              " (" +
              constant.OEEOverAllLimit +
              ")",
            position: "right", // Positions label on the left side
            offsetX: 0,
          },
        },
      ],
    },
    colors: colors,
    //colors: ["#F7DC6F", "#f84c0b"],
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
      strokeColors: colors[4], // Array of colors
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
      categories: dates,
      labels: {
        show: true, // Hides the X-axis labels
        //format: "MM dd, yyyy",
      },
      tickAmount: 6, // Number of labels on x-axis to control grouping interval
    },
  };
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-3 pt-3.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-3.5 xl:col-span-12">
      <div className="md:flex md:flex-row w-full">
        <div className="md:w-full text-center justify-center ">
          <div className="flex w-full">
            <div className="mb-3 w-full flex flex-row mt-2">
              <span className="mt-1 mr-2 ml-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
              </span>
              <div className="w-full flex flex-row">
                <div className="w-2/3 text-cyan-900 dark:text-white font-thin">
                  {t("oee_and_efficiency")} -{" "}
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
                      if (e.target.value == "availability") {
                        constValue = constant.OEEAvailabilityLimit;
                      }
                      if (e.target.value == "performance") {
                        constValue = constant.OEEPerformanceLimit;
                      }
                      if (e.target.value == "quality") {
                        constValue = constant.OEEQualityLimit;
                      }

                      if (e.target.value == "oee") {
                        constValue = constant.OEEOverAllLimit;
                      }
                      setConstantLimit(constValue);
                      setParameterValue(e.target.value);

                      //   setQuetyParams((prev) => ({
                      //     ...prev, // Copy previous state
                      //     ["parameterValues"]: e.target.value, // Update the specific field
                      //   }));
                    }}
                  >
                    <option value="availability">{t("availability")}</option>
                    <option value="performance">{t("performance")}</option>
                    <option value="quality">{t("quality")}</option>
                    <option value="oee">{t("overall_oee")}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <ReactApexChart
            key={"1"}
            options={ChartAvailabilityOptions}
            series={dataSeries.series}
            type={chartType}
            height={320}
          />
        </div>
      </div>
    </div>
  );
};

export default OEEFollowUpChart;
