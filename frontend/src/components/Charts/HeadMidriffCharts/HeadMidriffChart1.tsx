import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import chartData from "../../../methods/chartData";
import { ReusableMethods } from "../../../methods/ReusableMethods";
import SpinnerObject from "../../../components/Spinner/Spinner";
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

const processData = (dataArray: any[], t: any) => {
  if (dataArray) {
    console.log("data", dataArray);
    //////Sort the Data first
    const data = dataArray.sort(
      (a: any, b: any) =>
        new Date(a.slaughter_date).getTime() -
        new Date(b.slaughter_date).getTime()
    );
    let aerobicValue: any[] = [];
    let ecoliValue: any[] = [];
    let staphylococcusValue: any[] = [];
    let months: any[] = [];
    for (let i = 0; i < data.length; i++) {
      !months.includes(data[i].slaughter_date) &&
        (months = [...months, data[i].slaughter_date]);

      data[i].aerobic != null &&
        (aerobicValue = [...aerobicValue, data[i].aerobic]);
      data[i].e_coli != null && (ecoliValue = [...ecoliValue, data[i].e_coli]);
      data[i].staphylococcus != null &&
        (staphylococcusValue = [
          ...staphylococcusValue,
          data[i].staphylococcus,
        ]);
    }

    let processedAerobicData = [{ name: t("aerobic"), data: aerobicValue }];
    let processedEcoliData = [{ name: t("e_coli"), data: ecoliValue }];
    let processedStaphylococcusData = [
      { name: t("staphylococcus"), data: staphylococcusValue },
    ];

    return [
      processedAerobicData,
      processedEcoliData,
      processedStaphylococcusData,
      months,
    ];
  }
};

const computeChart = (inputdata: any, t: any, settings: any) => {
  if (inputdata) {
    const data = inputdata.sort(
      (a: any, b: any) =>
        new Date(a.slaughter_date).getTime() -
        new Date(b.slaughter_date).getTime()
    );
    const resultMap = new Map();
    const months: any = [];
    const goodAerobicValues: any = [];
    const badAerobicValues: any = [];
    const goodEcoliValues: any = [];
    const badEcoliValues: any = [];
    const goodStaphylococcusValue: any = [];
    const badStaphylococcusValue: any = [];

    //const currentYear = new Date().getFullYear(); // Get the current year
    for (let i = 0; i < data.length; i++) {
      //// Check the date
      const dateToCheck = new Date(data[i].slaughter_date);
      /////// If the date is this year
      //if (dateToCheck.getFullYear() === currentYear) {
      //const month = dateToCheck.getMonth() + 1; //// Get the month
      const month =
        dateToCheck.toLocaleString("default", { month: "short" }) +
        " " +
        dateToCheck.getFullYear().toString().slice(-2);
      if (!resultMap.has(month)) {
        resultMap.set(month, {
          goodAerobic: 0,
          badAerobic: 0,
          goodEcoli: 0,
          badEcoli: 0,
          goodStaphylococcus: 0,
          badStaphylococcus: 0,
        });
      }
      const dateEntry = resultMap.get(month);

      /////// If the aerobic value is less than the settings increament good by 1 else increament bad by 1
      if (data[i].aerobic < settings.aerobicConstantLimit) {
        dateEntry.goodAerobic += 1;
      } else if (data[i].aerobic > settings.aerobicConstantLimit) {
        dateEntry.badAerobic += 1;
      }

      /////// If the E coli value is less than the settings increament good by 1 else increament bad by 1
      if (data[i].e_coli < settings.ecoliConstantLimit) {
        dateEntry.goodEcoli += 1;
      } else if (data[i].e_coli > settings.ecoliConstantLimit) {
        dateEntry.badEcoli += 1;
      }

      /////// If the Staphylococcus value is less than the settings increament good by 1 else increament bad by 1
      if (data[i].staphylococcus < settings.staphylococcusConstantLimit) {
        dateEntry.goodStaphylococcus += 1;
      } else if (
        data[i].staphylococcus > settings.staphylococcusConstantLimit
      ) {
        dateEntry.badStaphylococcus += 1;
      }
    }

    // Convert the Map to an array of objects
    const resultArray = Array.from(
      resultMap,
      ([
        month,
        {
          goodAerobic,
          badAerobic,
          goodEcoli,
          badEcoli,
          goodStaphylococcus,
          badStaphylococcus,
        },
      ]) => ({
        month,
        goodAerobic,
        badAerobic,
        goodEcoli,
        badEcoli,
        goodStaphylococcus,
        badStaphylococcus,
      })
    );

    // Using forEach to loop through the Map
    resultArray.forEach((value) => {
      months.push(value.month);
      goodAerobicValues.push(value.goodAerobic);
      badAerobicValues.push(value.badAerobic);
      goodEcoliValues.push(value.goodEcoli);
      badEcoliValues.push(value.badEcoli);
      goodStaphylococcusValue.push(value.goodStaphylococcus);
      badStaphylococcusValue.push(value.badStaphylococcus);
    });

    // Set processed value for chat
    //let processedProteinData: any[] = [];
    let processedAerobicData = [
      { name: t(settings.approvedText), data: goodAerobicValues },
      { name: t(settings.unApprovedText), data: badAerobicValues },
    ];

    let processedEcoliData = [
      { name: t(settings.approvedText), data: goodEcoliValues },
      { name: t(settings.unApprovedText), data: badEcoliValues },
    ];

    let processedStaphylococcusData = [
      { name: t(settings.approvedText), data: goodStaphylococcusValue },
      { name: t(settings.unApprovedText), data: badStaphylococcusValue },
    ];

    //console.log("LactoseSeries", processedLactoseData);
    return [
      processedAerobicData,
      processedEcoliData,
      processedStaphylococcusData,
      months,
    ];
  }
};
const DrillSamplesChart1: React.FC<ChartProps> = (props: any) => {
  const [chartData, setChartData] = useState([]);
  const [filteredChartData, setFilteredChartData] = useState([]);
  const [startDate, setStartData] = useState("");
  const [endDate, setEndData] = useState("");
  const { isDateInRange, allRequest } = ReusableMethods();
  const { setIsLoading, Spinner } = SpinnerObject();
  const [chartType, setChartType] = useState("area");
  const [chartStacked, setChartStacked] = useState(false);
  const [firstDate, setFirstDate] = useState(false);
  const [lastDate, setLastDate] = useState(false);
  const [queryParams, setQuetyParams] = useState({});
  const user = useSelector((state: any) => state.user.value);
  const [returnDataArray, setReturnDataArray] = useState([]);
  const [parameterValue, setParameterValue] = useState("");
  const { t } = useTranslation();
  const [months, setMonths] = useState([]);
  const [monthsChart2, setMonthsChart2] = useState([]);
  const { settings, setSettings } = DynamicInputFieldsSettings();

  const [aerobicSeries, setAerobicSeries] = useState<ChartOneState>({
    series: [],
  });
  const [ecoliSeries, setEcoliSeries] = useState<ChartOneState>({
    series: [],
  });

  const [staphylococcusSeries, setStaphylococcusSeries] =
    useState<ChartOneState>({
      series: [],
    });

  const [aerobicSeriesChart2, setAerobicSeriesChart2] = useState<ChartOneState>(
    {
      series: [],
    }
  );
  const [ecoliSeriesChart2, setEcoliSeriesChart2] = useState<ChartOneState>({
    series: [],
  });
  const [staphylococcusSeriesChart2, setStaphylococcusSeriesChart2] =
    useState<ChartOneState>({
      series: [],
    });

  useEffect(() => {
    setChartData(props.chartData.data);
    setFilteredChartData(props.chartData.data);

    if (chartData) {
      const [firstDate, lastDate] = [...chartData].sort(
        (a, b) => new Date(a.slaughter_date) - new Date(b.slaughter_date)
      );
      firstDate && setFirstDate(firstDate.slaughter_date);
      lastDate && setLastDate(lastDate.slaughter_date);
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
    user.data?.settings &&
      setSettings(JSON.parse(user.data?.settings.settings));
  }, [user.data?.settings]);

  useEffect(() => {
    if (filteredChartData) {
      let aerobicEcoliStaphylococcusLimitMatch: any = [];
      let aerobicEcoliStaphylococcusValueMatch: any = [];

      chartData &&
        (aerobicEcoliStaphylococcusLimitMatch = computeChart(
          filteredChartData,
          t,
          settings
        ));
      chartData &&
        (aerobicEcoliStaphylococcusValueMatch = processData(
          filteredChartData,
          t
        ));
      //value[0] && (setState({ series: value[0] }), setMonths(value[1]));

      setAerobicSeries({ series: aerobicEcoliStaphylococcusLimitMatch[0] });
      setEcoliSeries({ series: aerobicEcoliStaphylococcusLimitMatch[1] });
      setStaphylococcusSeries({
        series: aerobicEcoliStaphylococcusLimitMatch[2],
      });
      setMonths(aerobicEcoliStaphylococcusLimitMatch[3]);

      //////Set the second chart series data
      setAerobicSeriesChart2({
        series: aerobicEcoliStaphylococcusValueMatch[0],
      });
      setEcoliSeriesChart2({ series: aerobicEcoliStaphylococcusValueMatch[1] });
      setStaphylococcusSeriesChart2({
        series: aerobicEcoliStaphylococcusValueMatch[2],
      });
      setMonthsChart2(aerobicEcoliStaphylococcusValueMatch[3]);
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
            dateToCheck: data.slaughter_date,
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

      ////Check if the query parameter is not empty

      //   if (Object.keys(queryParams).length > 0) {
      //     const start = Date.parse(startDate);
      //     const end = Date.parse(endDate);
      //     let setData = [];
      //     if (!isNaN(start) && !isNaN(end)) {
      //       console.log("start date is valid");
      //       setData = filteredChartData;
      //     } else {
      //       setData = chartData;
      //     }
      //     const filteredData = setData.filter((item) =>
      //       Object.entries(queryParams).some(([key, value]) =>
      //         value ? item[key] === value : item[key] != value
      //       )
      //     );

      //     console.log("filtered", filteredData);
      //     setFilteredChartData(filteredData);
      //   }
    }
  }, [startDate, endDate, queryParams]);

  const aerobicChartOptions: ApexOptions = {
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

  const ecoliChartOptions: ApexOptions = {
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

  const staphylococcusChartOptions: ApexOptions = {
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

  const aerobicChart2Options: ApexOptions = {
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
          y: settings.aerobicConstantLimit, // Threshold value
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
              t("aerobic") +
              " " +
              t("limit") +
              " (" +
              settings.aerobicConstantLimit +
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

  const ecoliChart2Options: ApexOptions = {
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
          y: settings.ecoliConstantLimit, // Threshold value
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
              t("e_coli") +
              " " +
              t("limit") +
              " (" +
              settings.ecoliConstantLimit +
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

  const staphylococcusChart2Options: ApexOptions = {
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
          y: settings.staphylococcusConstantLimit, // Threshold value
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
              t("staphylococcus") +
              " " +
              t("limit") +
              " (" +
              settings.staphylococcusConstantLimit +
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

  return (
    <div className="w-full col-span-12 rounded-sm border border-stroke bg-gray px-3 pt-3.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-3.5 xl:col-span-12">
      <Spinner />
      {firstDate && lastDate && (
        <h5 className="text-center text-title-sm font-thin text-black dark:text-white dark:text-whit ml-3 mt-0 mb-3">
          {t("slaughtered_head_meat_midriff") +
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
      <div className="flex w-full justify-center">
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
              <option value="">--{t("all")}--</option>
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
              <option value="area">{t("area")}</option>
              <option value="bar">{t("bar")}</option>
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
        <div className="md:w-2/6 text-center justify-center ">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("aerobic")} {parameterValue && " -" + parameterValue}
            </p>
          </div>
          <ReactApexChart
            key={"1"}
            options={aerobicChartOptions}
            series={aerobicSeries.series}
            type={chartType}
            height={320}
          />
        </div>

        <div className="md:ml-3 md:w-2/6 text-center justify-center">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("e_coli")} {parameterValue && " -" + parameterValue}
            </p>
          </div>
          <ReactApexChart
            options={ecoliChartOptions}
            series={ecoliSeries.series}
            type={chartType}
            height={320}
          />
        </div>

        <div className="md:ml-3 md:w-2/6 text-center justify-center">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("staphylococcus")} {parameterValue && " -" + parameterValue}
            </p>
          </div>
          <ReactApexChart
            options={staphylococcusChartOptions}
            series={staphylococcusSeries.series}
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
              {t("aerobic")} {parameterValue && " -" + parameterValue}
            </p>
          </div>
          <ReactApexChart
            key={"1"}
            options={aerobicChart2Options}
            series={aerobicSeriesChart2.series}
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
              {t("e_coli")} {parameterValue && " -" + parameterValue}
            </p>
          </div>
          <ReactApexChart
            key={"1"}
            options={ecoliChart2Options}
            series={ecoliSeriesChart2.series}
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
              {t("staphylococcus")} {parameterValue && " -" + parameterValue}
            </p>
          </div>
          <ReactApexChart
            key={"1"}
            options={staphylococcusChart2Options}
            series={staphylococcusSeriesChart2.series}
            type={chartType}
            height={320}
          />
        </div>
      </div>
    </div>
  );
};

export default DrillSamplesChart1;
