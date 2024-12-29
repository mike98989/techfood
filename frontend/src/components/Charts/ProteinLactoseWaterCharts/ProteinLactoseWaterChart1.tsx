import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import chartData from "../../../methods/chartData";
import { ReusableMethods } from "../../../methods/ReusableMethods";
import SpinnerObject from "../../../components/Spinner/Spinner";
import { useTranslation } from "react-i18next";
import { DynamicInputFieldsSettings } from "../../../methods/DynamicInputFields";
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

const processData = (dataArray: any[], t: any) => {
  if (dataArray) {
    //////Sort the Data first
    const data = dataArray.sort(
      (a: any, b: any) =>
        new Date(a.result_date).getTime() - new Date(b.result_date).getTime()
    );
    let proteinValue: any[] = [];
    let lactoseValue: any[] = [];
    let waterValue: any[] = [];
    let months: any[] = [];
    for (let i = 0; i < data.length; i++) {
      //const dateToCheck = new Date(data[i].result_date);
      //let year_month = data[i].result_date;
      //year_month = year_month.substring(0, 7);

      // const month_value =
      //   dateToCheck.toLocaleString("default", { month: "short" }) +
      //   " " +
      //   dateToCheck.getFullYear().toString().slice(-2);
      //// If the month is not in the month array, then add a month
      !months.includes(data[i].result_date) &&
        (months = [...months, data[i].result_date]);

      data[i].protein_value != null &&
        (proteinValue = [...proteinValue, data[i].protein_value]);
      data[i].lactose_value != null &&
        (lactoseValue = [...lactoseValue, data[i].lactose_value]);
      data[i].water_value != null &&
        (waterValue = [...waterValue, data[i].water_value]);
    }

    let processedProteinData = [{ name: t("protein"), data: proteinValue }];
    let processedLactoseData = [{ name: t("lactose"), data: lactoseValue }];
    let processedWaterData = [{ name: t("water"), data: waterValue }];

    return [
      processedProteinData,
      processedLactoseData,
      processedWaterData,
      months,
    ];
  }
};

const computeChart = (inputdata: any, t: any, settings: any) => {
  if (inputdata) {
    const data = inputdata.sort(
      (a: any, b: any) =>
        new Date(a.result_date).getTime() - new Date(b.result_date).getTime()
    );
    const resultMap = new Map();
    const months: any = [];
    const goodProteinValues: any = [];
    const badProteinValues: any = [];
    const goodLactoseValues: any = [];
    const badLactoseValues: any = [];
    const goodWaterValues: any = [];
    const badWaterValues: any = [];

    //const currentYear = new Date().getFullYear(); // Get the current year
    for (let i = 0; i < data.length; i++) {
      //// Check the date
      const dateToCheck = new Date(data[i].result_date);
      /////// If the date is this year
      //if (dateToCheck.getFullYear() === currentYear) {
      //const month = dateToCheck.getMonth() + 1; //// Get the month
      const month =
        dateToCheck.toLocaleString("default", { month: "short" }) +
        " " +
        dateToCheck.getFullYear().toString().slice(-2);
      if (!resultMap.has(month)) {
        resultMap.set(month, {
          goodProtein: 0,
          badProtein: 0,
          goodLactose: 0,
          badLactose: 0,
          goodWater: 0,
          badWater: 0,
        });
      }
      const dateEntry = resultMap.get(month);

      ///////If the parameter is set to protein
      //if (parameter == "protein") {
      /////// If the water value is greater than the settings increament good by 1 else increament bad by 1
      if (data[i].protein_value > settings.proteinConstantLimit) {
        dateEntry.goodProtein += 1;
      } else if (data[i].protein_value < settings.proteinConstantLimit) {
        dateEntry.badProtein += 1;
      }
      //}

      ///////If the parameter is set to lactose
      //if (parameter == "lactose") {
      /////// If the water value is greater than the settings increament good by 1 else increament bad by 1
      if (data[i].lactose_value > settings.lactoseConstantLimit) {
        dateEntry.goodLactose += 1;
      } else if (data[i].lactose_value < settings.lactoseConstantLimit) {
        dateEntry.badLactose += 1;
      }
      //}

      ///////If the parameter is set to protein
      //if (parameter == "water") {
      /////// If the water value is greater than the settings increament good by 1 else increament bad by 1
      if (data[i].water_value > settings.waterConstantLimit) {
        dateEntry.goodWater += 1;
      } else if (data[i].water_value < settings.waterConstantLimit) {
        dateEntry.badWater += 1;
      } //// Sort the map in ascending order
      //}
    }

    // Convert the Map to an array of objects
    const resultArray = Array.from(
      resultMap,
      ([
        month,
        {
          goodProtein,
          badProtein,
          goodLactose,
          badLactose,
          goodWater,
          badWater,
        },
      ]) => ({
        month,
        goodProtein,
        badProtein,
        goodLactose,
        badLactose,
        goodWater,
        badWater,
      })
    );

    // Using forEach to loop through the Map
    resultArray.forEach((value) => {
      months.push(value.month);
      goodProteinValues.push(value.goodProtein);
      badProteinValues.push(value.badProtein);
      goodLactoseValues.push(value.goodLactose);
      badLactoseValues.push(value.badLactose);
      goodWaterValues.push(value.goodWater);
      badWaterValues.push(value.badWater);
    });

    // Set processed value for chat
    //let processedProteinData: any[] = [];
    let processedProteinData = [
      { name: t(settings.approvedText), data: goodProteinValues },
      { name: t(settings.unApprovedText), data: badProteinValues },
    ];

    let processedLactoseData = [
      { name: t(settings.approvedText), data: goodLactoseValues },
      { name: t(settings.unApprovedText), data: badLactoseValues },
    ];
    let processedWaterData = [
      { name: t(settings.approvedText), data: goodWaterValues },
      { name: t(settings.unApprovedText), data: badWaterValues },
    ];
    //console.log("LactoseSeries", processedLactoseData);
    return [
      processedProteinData,
      processedLactoseData,
      processedWaterData,
      months,
    ];
  }
};
const ProteinLactoseWaterChart1: React.FC<ChartProps> = (props: any) => {
  const [chartData, setChartData] = useState([]);
  const [filteredChartData, setFilteredChartData] = useState([]);
  const [startDate, setStartData] = useState("");
  const [endDate, setEndData] = useState("");
  const { isDateInRange } = ReusableMethods();
  const { setIsLoading, Spinner } = SpinnerObject();
  const [chartType, setChartType] = useState("area");
  const [chartStacked, setChartStacked] = useState(false);
  const [firstDate, setFirstDate] = useState(false);
  const [lastDate, setLastDate] = useState(false);
  //const [parameter, setParameter] = useState("protein");
  const { t } = useTranslation();
  const [months, setMonths] = useState([]);
  const [monthsChart2, setMonthsChart2] = useState([]);
  const user = useSelector((state: any) => state.user.value);

  const [proteinSeries, setProteinSeries] = useState<ChartOneState>({
    series: [],
  });
  const [lactoseSeries, setLactoseSeries] = useState<ChartOneState>({
    series: [],
  });

  const [waterSeries, setWaterSeries] = useState<ChartOneState>({
    series: [],
  });

  const [proteinSeriesChart2, setProteinSeriesChart2] = useState<ChartOneState>(
    {
      series: [],
    }
  );
  const [lactoseSeriesChart2, setLactoseSeriesChart2] = useState<ChartOneState>(
    {
      series: [],
    }
  );
  const [waterSeriesChart2, setWaterSeriesChart2] = useState<ChartOneState>({
    series: [],
  });
  const { settings, setSettings } = DynamicInputFieldsSettings();

  useEffect(() => {
    setChartData(props.chartData.data);
    setFilteredChartData(props.chartData.data);

    if (chartData) {
      const [firstDate, lastDate] = [...chartData].sort(
        (a, b) => new Date(a.result_date) - new Date(b.result_date)
      );
      firstDate && setFirstDate(firstDate.result_date);
      lastDate && setLastDate(lastDate.result_date);
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
      let proteinlactosWaterLimitMatch: any = [];
      let proteinlactosWaterValueMatch: any = [];

      chartData &&
        (proteinlactosWaterLimitMatch = computeChart(
          filteredChartData,
          t,
          settings
        ));
      chartData &&
        (proteinlactosWaterValueMatch = processData(filteredChartData, t));
      //value[0] && (setState({ series: value[0] }), setMonths(value[1]));

      setProteinSeries({ series: proteinlactosWaterLimitMatch[0] });
      setLactoseSeries({ series: proteinlactosWaterLimitMatch[1] });
      setWaterSeries({ series: proteinlactosWaterLimitMatch[2] });
      setMonths(proteinlactosWaterLimitMatch[3]);

      //////Set the second chart series data
      setProteinSeriesChart2({ series: proteinlactosWaterValueMatch[0] });
      setLactoseSeriesChart2({ series: proteinlactosWaterValueMatch[1] });
      setWaterSeriesChart2({ series: proteinlactosWaterValueMatch[2] });
      setMonthsChart2(proteinlactosWaterValueMatch[3]);
    }
  }, [filteredChartData, chartType]);

  useEffect(() => {
    if (chartData) {
      const start = Date.parse(startDate);
      const end = Date.parse(endDate);
      if (!isNaN(start) && !isNaN(end)) {
        const filteredData = chartData.filter((data: any, i) =>
          isDateInRange({
            dateToCheck: data.result_date,
            startDate: startDate,
            endDate: endDate,
          })
        );
        setFilteredChartData(filteredData);
      }
    }
  }, [startDate, endDate]);

  const proteinChartOptions: ApexOptions = {
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
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
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  const lactoseChartOptions: ApexOptions = {
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
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
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  const waterChartOptions: ApexOptions = {
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
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
        sizeOffset: 6,
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
      tickAmount: 5, // Number of labels on x-axis to control grouping interval
    },
    tooltip: {
      x: {
        format: "MMM dd, yyyy", // Format for tooltip date
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
    },
  };

  const proteinChart2Options: ApexOptions = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: "smooth",
      width: 2, // Reducing the line thickness to 2px
    },

    annotations: {
      yaxis: [
        {
          y: settings.proteinConstantLimit, // Threshold value
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
              t("protein") +
              " " +
              t("limit") +
              " (" +
              settings.proteinConstantLimit +
              ")",
            position: "right", // Positions label on the left side
            offsetX: 0,
          },
        },
      ],
    },
    xaxis: {
      categories: monthsChart2,
      labels: {
        show: true, // Hides the X-axis labels
        format: "MM dd, yyyy",
      },
      tickAmount: 3, // Number of labels on x-axis to control grouping interval
    },
    tooltip: {
      x: {
        format: "MMM dd, yyyy", // Format for tooltip date
      },
    },
  };

  const lactoseChart2Options: ApexOptions = {
    colors: ["#006400"], // Array of colors
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: "smooth",
      width: 2, // Reducing the line thickness to 2px
    },

    annotations: {
      yaxis: [
        {
          y: settings.lactoseConstantLimit, // Threshold value
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
              t("lactose") +
              " " +
              t("limit") +
              " (" +
              settings.lactoseConstantLimit +
              ")",
            position: "right", // Positions label on the left side
            offsetX: 0,
          },
        },
      ],
    },
    xaxis: {
      categories: monthsChart2,
      labels: {
        show: true, // Hides the X-axis labels
        format: "MM dd, yyyy",
      },
      tickAmount: 3, // Number of labels on x-axis to control grouping interval
    },
    tooltip: {
      x: {
        format: "MMM dd, yyyy", // Format for tooltip date
      },
    },
  };

  const waterChart2Options: ApexOptions = {
    colors: ["#f84c0b"], // Array of colors
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },

    stroke: {
      curve: "smooth",
      width: 2, // Reducing the line thickness to 2px
    },

    annotations: {
      yaxis: [
        {
          y: settings.waterConstantLimit, // Threshold value
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
              t("water") +
              " " +
              t("limit") +
              " (" +
              settings.waterConstantLimit +
              ")",
            position: "right", // Positions label on the left side
            offsetX: 0,
          },
        },
      ],
    },
    xaxis: {
      categories: monthsChart2,
      labels: {
        show: true, // Hides the X-axis labels
        format: "MM dd, yyyy",
      },
      tickAmount: 3, // Number of labels on x-axis to control grouping interval
    },
    tooltip: {
      x: {
        format: "MMM dd, yyyy", // Format for tooltip date
      },
    },
  };
  // const handleReset = () => {
  //   setState((prevState) => ({
  //     ...prevState,
  //   }));
  // };
  // handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-gray px-3 pt-3.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-3.5 xl:col-span-12">
      <Spinner />
      {firstDate && lastDate && (
        <h5 className="text-center text-title-sm font-thin text-black dark:text-white dark:text-whit ml-3 mt-0 mb-3">
          {t("protein_lactose_water") +
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
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                onChange={(e) => {
                  setStartData(e.target.value);
                  setFirstDate(e.target.value);
                }}
              />
            </div>
            <div className="w-2/8 mr-2">
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
            <div className="w-2/8 mr-2">
              <span className="text-sm pl-1">{t("chart_type")}</span>
              <select
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter  dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                onChange={(e) => {
                  setChartType(e.target.value);
                }}
              >
                <option value="area">{t("area")}</option>
                <option value="bar">{t("bar")}</option>
                <option value="line">{t("line")}</option>
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

      {/* Satisfactory and not satisfactory chart */}
      <div className="md:flex md:flex-row w-full">
        <div className="md:w-3/6 text-center justify-center ">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("protein")}
            </p>
          </div>
          <ReactApexChart
            key={"1"}
            options={proteinChartOptions}
            series={proteinSeries.series}
            type={chartType}
            height={320}
          />
        </div>

        <div
          id="chartOne"
          className="md:ml-3 md:w-3/6 text-center justify-center"
        >
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("lactose")}
            </p>
          </div>
          <ReactApexChart
            options={lactoseChartOptions}
            series={lactoseSeries.series}
            type={chartType}
            height={320}
          />
        </div>

        <div id="chartOne" className="md:ml-2 md:w-3/6">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("water")}
            </p>
          </div>
          <ReactApexChart
            options={waterChartOptions}
            series={waterSeries.series}
            type={chartType}
            height={320}
          />
        </div>
      </div>

      {/* Thresh hold line and data chart */}
      <div className="md:flex mt-4 md:flex-row w-full">
        <div className="ml-2 md:w-2/6 text-center justify-center">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("protein")}
            </p>
          </div>
          <ReactApexChart
            key={"1"}
            options={proteinChart2Options}
            series={proteinSeriesChart2.series}
            type={chartType}
            height={320}
          />
        </div>

        <div className="ml-2 md:w-2/6 text-center justify-center">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("lactose")}
            </p>
          </div>
          <ReactApexChart
            key={"1"}
            options={lactoseChart2Options}
            series={lactoseSeriesChart2.series}
            type={chartType}
            height={320}
          />
        </div>

        <div className="ml-2 md:w-2/6 text-center justify-center">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("water")}
            </p>
          </div>
          <ReactApexChart
            options={waterChart2Options}
            series={waterSeriesChart2.series}
            type={chartType}
            height={320}
          />
        </div>
      </div>
    </div>
  );
};

export default ProteinLactoseWaterChart1;
