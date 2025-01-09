import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import chartData from "../../../methods/chartData";
import { ReusableMethods } from "../../../methods/ReusableMethods";
import SpinnerObject from "../../../components/Spinner/Spinner";
import { colors } from "../../../Utils/Constants";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { DynamicInputFieldsSettings } from "../../../methods/DynamicInputFields";

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
    const inputdata = data.sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    //console.log("inputdata", inputdata);
    const resultMap = new Map();
    const date: any = [];
    const availabilityValues: any = [];
    const performanceValues: any = [];
    const qualityValues: any = [];
    const overallOEEValues: any = [];

    //const currentYear = new Date().getFullYear(); // Get the current year
    for (let i = 0; i < inputdata.length; i++) {
      const date = inputdata[i].date;
      //console.log("month", month + "-" + week);
      if (!resultMap.has(date)) {
        resultMap.set(date, {
          availabilityValues: 0,
          performanceValues: 0,
          qualityValues: 0,
          overallOEEValues: 0,
        });
      }

      const dateEntry = resultMap.get(date);
      dateEntry.availabilityValues = Math.round(inputdata[i].availability);

      dateEntry.performanceValues = Math.round(inputdata[i].performance);

      dateEntry.qualityValues = Math.round(inputdata[i].quality);
      dateEntry.overallOEEValues = Math.round(inputdata[i].overall_oee);
    }

    // Convert the Map to an array of objects
    const resultArray = Array.from(
      resultMap,
      ([
        date,
        {
          availabilityValues,
          performanceValues,
          qualityValues,
          overallOEEValues,
        },
      ]) => ({
        date,
        availabilityValues,
        performanceValues,
        qualityValues,
        overallOEEValues,
      })
    );

    // Using forEach to loop through the Map
    resultArray.forEach((value) => {
      date.push(value.date);
      availabilityValues.push(value.availabilityValues);
      performanceValues.push(value.performanceValues);
      qualityValues.push(value.qualityValues);
      overallOEEValues.push(value.overallOEEValues);
    });

    // Set processed value for chat
    //let processedProteinData: any[] = [];
    let processedAvailabilityData = [
      { name: t("availability"), data: availabilityValues },
    ];
    let processedPerformanceData = [
      { name: t("performance"), data: performanceValues },
    ];
    let processedQualityData = [{ name: t("quality"), data: qualityValues }];
    let processedOverAllOEEData = [
      { name: t("overall_oee"), data: overallOEEValues },
    ];
    return [
      processedAvailabilityData,
      processedPerformanceData,
      processedQualityData,
      processedOverAllOEEData,
      date,
    ];
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
  const [firstDate, setFirstDate] = useState(false);
  const [lastDate, setLastDate] = useState(false);
  const [queryParams, setQuetyParams] = useState({});
  const { t } = useTranslation();
  const [dates, setDates] = useState([]);
  const { settings, setSettings } = DynamicInputFieldsSettings();
  //   const [monthsChart2, setMonthsChart2] = useState([]);
  //   const [returnDataArray, setReturnDataArray] = useState([]);
  const user = useSelector((state: any) => state.user.value);
  //   const [parameterValue, setParameterValue] = useState("");

  const [availabilitySeries, setAvailabilitySeries] = useState<ChartOneState>({
    series: [],
  });
  const [performanceSeries, setPerformanceSeries] = useState<ChartOneState>({
    series: [],
  });
  const [qualitySeries, setQualitySeries] = useState<ChartOneState>({
    series: [],
  });

  const [overallOEESeries, setOverallOEESeries] = useState<ChartOneState>({
    series: [],
  });

  useEffect(() => {
    setChartData(props.chartData.data);
    setFilteredChartData(props.chartData.data);

    if (chartData) {
      const [firstDate, lastDate] = [...chartData].sort(
        (a, b) => a.date - b.date
      );
      firstDate && setFirstDate(firstDate.date);
      lastDate && setLastDate(lastDate.date);
    }

    setIsLoading(false);
  }, [props]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    user.data?.settings &&
      setSettings(JSON.parse(user.data?.settings.settings));
  }, [user.data?.settings]);

  useEffect(() => {
    if (filteredChartData) {
      let availabilityPerformanceQualityMatch: any = [];
      //let verifyMonitorLimitMatch: any = [];

      chartData &&
        (availabilityPerformanceQualityMatch = computeChart(
          filteredChartData,
          t
        ));

      setAvailabilitySeries({ series: availabilityPerformanceQualityMatch[0] });
      setPerformanceSeries({ series: availabilityPerformanceQualityMatch[1] });
      setQualitySeries({
        series: availabilityPerformanceQualityMatch[2],
      });
      setOverallOEESeries({ series: availabilityPerformanceQualityMatch[3] });
      setDates(availabilityPerformanceQualityMatch[4]);
    }
  }, [filteredChartData, chartType]);

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
          y: settings.OEEAvailabilityLimit, // Threshold value
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
              t("availability") +
              " " +
              t("limit") +
              " (" +
              settings.OEEAvailabilityLimit +
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
          y: settings.OEEPerformanceLimit, // Threshold value
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
              t("performance") +
              " " +
              t("limit") +
              " (" +
              settings.OEEPerformanceLimit +
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
          y: settings.OEEQualityLimit, // Threshold value
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
              t("performance") +
              " " +
              t("limit") +
              " (" +
              settings.OEEQualityLimit +
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
          y: settings.OEEOverAllLimit, // Threshold value
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
              t("overall_oee") +
              " " +
              t("limit") +
              " (" +
              settings.OEEOverAllLimit +
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
    <div className="col-span-12 rounded-sm border border-stroke bg-gray px-3 pt-3.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-3.5 xl:col-span-12">
      <Spinner />
      {firstDate && lastDate && (
        <h5 className="text-center text-title-sm font-thin text-black dark:text-white dark:text-whit ml-3 mt-0 mb-3">
          {t("oee_and_efficiency_title") +
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
              {t("availability")}(%)
            </p>
          </div>
          <ReactApexChart
            key={"1"}
            options={ChartAvailabilityOptions}
            series={availabilitySeries.series}
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
              {t("performance")}(%)
            </p>
          </div>
          <ReactApexChart
            key={"1"}
            options={ChartPerformanceOption}
            series={performanceSeries.series}
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
              {t("quality")}(%)
            </p>
          </div>
          <ReactApexChart
            key={"1"}
            options={ChartQualityOption}
            series={qualitySeries.series}
            type={chartType}
            height={320}
          />
        </div>

        <div className="md:w-1/2 text-center justify-center ">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">OEE (%)</p>
          </div>
          <ReactApexChart
            key={"1"}
            options={ChartOEEOverallOption}
            series={overallOEESeries.series}
            type={chartType}
            height={320}
          />
        </div>
      </div>
    </div>
  );
};

export default OEEFollowUpChart;
