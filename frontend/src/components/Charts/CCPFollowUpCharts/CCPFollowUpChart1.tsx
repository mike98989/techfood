import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import chartData from "../../../methods/chartData";
import { ReusableMethods } from "../../../methods/ReusableMethods";
import SpinnerObject from "../../../components/Spinner/Spinner";
import { constant } from "../../../Utils/Constants";
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

const processData = (dataArray: any[], t: any) => {
  if (dataArray) {
    //////Sort the Data first
    const data = dataArray.sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    let proteinValue: any[] = [];
    let lactoseValue: any[] = [];
    let waterValue: any[] = [];
    let months: any[] = [];
    for (let i = 0; i < data.length; i++) {
      //const dateToCheck = new Date(data[i].date);
      //let year_month = data[i].date;
      //year_month = year_month.substring(0, 7);

      // const month_value =
      //   dateToCheck.toLocaleString("default", { month: "short" }) +
      //   " " +
      //   dateToCheck.getFullYear().toString().slice(-2);
      //// If the month is not in the month array, then add a month
      !months.includes(data[i].date) && (months = [...months, data[i].date]);

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

const computeChart = (inputdata: any, t: any, getWeekNumber: any) => {
  //const { getWeekNumber } = ReusableMethods();
  if (inputdata) {
    const data = inputdata.sort(
      (a: any, b: any) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const resultMap = new Map();
    const months_week: any = [];
    const goodVerificationValues: any = [];
    const goodMonitoringValues: any = [];

    //const currentYear = new Date().getFullYear(); // Get the current year
    for (let i = 0; i < data.length; i++) {
      //// Check the date
      const dateToCheck = new Date(data[i].date);
      /////// If the date is this year
      //if (dateToCheck.getFullYear() === currentYear) {
      //const month = dateToCheck.getMonth() + 1; //// Get the month
      const month =
        dateToCheck.getFullYear().toString() +
        " " +
        dateToCheck.toLocaleString("default", { month: "short" });

      const week = getWeekNumber(dateToCheck);
      const month_week = month + "- wk " + week;
      //console.log("month", month + "-" + week);
      if (!resultMap.has(month_week)) {
        resultMap.set(month_week, {
          goodVerification: 0,
          //badVefiried: 0,
          goodMonitoring: 0,
          //badMonitoring: 0,
        });
      }
      const dateEntry = resultMap.get(month_week);

      /////// If the verify_or_monitor value is 1, increase the good monitoring value
      if (data[i].verify_or_monitor == 1) {
        dateEntry.goodMonitoring += 1;
      }

      /////// If the verify_or_monitor value is 1, increase the good monitoring value
      if (data[i].verify_or_monitor == 2) {
        dateEntry.goodVerification += 1;
      }
    }

    // Convert the Map to an array of objects
    const resultArray = Array.from(
      resultMap,
      ([month_week, { goodVerification, goodMonitoring }]) => ({
        month_week,
        goodVerification,
        goodMonitoring,
      })
    );

    // Using forEach to loop through the Map
    resultArray.forEach((value) => {
      months_week.push(value.month_week);
      goodVerificationValues.push(value.goodVerification);
      goodMonitoringValues.push(value.goodMonitoring);
    });

    // Set processed value for chat
    //let processedProteinData: any[] = [];
    let processedVerificationMonitoringData = [
      { name: t("verification"), data: goodVerificationValues },
      { name: t("monitoring"), data: goodMonitoringValues },
    ];
    //console.log("LactoseSeries", processedLactoseData);
    return [processedVerificationMonitoringData, months_week];
  }
};
const CCPFollowUpChart1: React.FC<ChartProps> = (props: any) => {
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
  const [months, setMonths] = useState([]);
  const [monthsChart2, setMonthsChart2] = useState([]);
  const [returnDataArray, setReturnDataArray] = useState([]);
  const user = useSelector((state: any) => state.user.value);
  const [parameterValue, setParameterValue] = useState("");

  const [trackingSeries, setTrackingSeries] = useState<ChartOneState>({
    series: [],
  });

  useEffect(() => {
    setChartData(props.chartData.data);
    setFilteredChartData(props.chartData.data);

    if (chartData) {
      const [firstDate, lastDate] = [...chartData].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      firstDate && setFirstDate(firstDate.date);
      lastDate && setLastDate(lastDate.date);
    }

    const fetchData = async (endpoint: string, returnStateObject: any) => {
      setIsLoading(true);
      allRequest({
        event: null,
        action_url: endpoint, // End Point
        method: "GET", // Method
        formId: "",
        formData: null,
        contentType: "application/json", //Content Type
        authentication: user.token,
        setIsLoading,
        setReturnData: returnStateObject,
      });
    };
    fetchData("drill_sample_form_related_data", setReturnDataArray);

    setIsLoading(false);
  }, [props]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (filteredChartData) {
      let verifyMonitorLimitMatch: any = [];
      //let verifyMonitorLimitMatch: any = [];

      chartData &&
        (verifyMonitorLimitMatch = computeChart(
          filteredChartData,
          t,
          getWeekNumber
        ));

      setTrackingSeries({ series: verifyMonitorLimitMatch[0] });
      setMonths(verifyMonitorLimitMatch[1]);
    }
  }, [filteredChartData, chartType]);

  useEffect(() => {
    if (chartData) {
      const start = Date.parse(startDate);
      const end = Date.parse(endDate);

      let filteredData: any = chartData;
      if (!isNaN(start) && !isNaN(end)) {
        filteredData = chartData.filter((data: any, i) =>
          isDateInRange({
            dateToCheck: data.date,
            startDate: startDate,
            endDate: endDate,
          })
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

  const ChartOptions1: ApexOptions = {
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
        //format: "MM dd, yyyy",
      },
      //tickAmount: 10, // Number of labels on x-axis to control grouping interval
    },
    //   tooltip: {
    //     x: {
    //       format: "MMM dd, yyyy", // Format for tooltip date
    //     },
    //   },
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
          {t("ccp_follow_up") +
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
            <span className="text-sm pl-3">{t("kind_of_animal")}</span>

            <select
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              required
              name="animal_id[]"
              //value={drill.product_id}
              onChange={
                (e) => {
                  const selectedIndex = e.target.selectedIndex;
                  setParameterValue(e.target.options[selectedIndex].text),
                    setQuetyParams((prev) => ({
                      ...prev, // Copy previous state
                      ["animal_id"]: e.target.value, // Update the specific field
                    }));
                }
                // handleInputChange({
                //   index,
                //   field: "product_id",
                //   value: e.target.value,
                // })
              }
            >
              <option value="">{t("all")}</option>
              {returnDataArray?.animal?.original.data.map(
                (value: any, key: any) => (
                  <option key={key} value={value.id}>
                    {t(value.name_key)}
                  </option>
                )
              )}
            </select>
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
        <div className="md:w-full text-center justify-center ">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t(parameterValue == "" ? "all" : parameterValue)}
            </p>
          </div>
          <ReactApexChart
            key={"1"}
            options={ChartOptions1}
            series={trackingSeries.series}
            type={chartType}
            height={320}
          />
        </div>

        {/* <div
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
        </div> */}

        {/* <div id="chartOne" className="md:ml-2 md:w-3/6">
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
        </div> */}
      </div>
    </div>
  );
};

export default CCPFollowUpChart1;
