import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import chartData from "../../../methods/chartData";
import { ReusableMethods } from "../../../methods/ReusableMethods";
import SpinnerObject from "../../../components/Spinner/Spinner";

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}
interface ChartProps {
  chartData: any; // Make sure this matches the type of data you're passing
}

const foodConstant = {
  constants: 72.5,
  approvedText: "Tillfredställande",
  unApprovedText: "Åtgärder krävs",
};

const computeChart = (inputdata: any) => {
  if (inputdata) {
    const data = inputdata.sort(
      (a: any, b: any) =>
        new Date(a.result_date).getTime() - new Date(b.result_date).getTime()
    );
    const resultMap = new Map();
    const months: any = [];
    const goodValues: any = [];
    const badValues: any = [];

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
        resultMap.set(month, { good: 0, bad: 0 });
      }
      const dateEntry = resultMap.get(month);

      /////// If the water value is greater than the constant increament good by 1 else increament bad by 1
      if (data[i].protein_value > foodConstant.constants) {
        dateEntry.good += 1;
      } else {
        dateEntry.bad += 1;
      }

      /////// If the water value is greater than the constant increament good by 1 else increament bad by 1
      if (data[i].lactose_value > foodConstant.constants) {
        dateEntry.good += 1;
      } else {
        dateEntry.bad += 1;
      }

      /////// If the water value is greater than the constant increament good by 1 else increament bad by 1
      if (data[i].water_value > foodConstant.constants) {
        dateEntry.good += 1;
      } else {
        dateEntry.bad += 1;
      } //// Sort the map in ascending order
      //}
    }

    // Convert the Map to an array of objects
    const resultArray = Array.from(resultMap, ([month, { good, bad }]) => ({
      month,
      good,
      bad,
    }));

    // Using forEach to loop through the Map
    resultArray.forEach((value) => {
      months.push(value.month);
      goodValues.push(value.good);
      badValues.push(value.bad);
    });

    // Set processed value for chat
    let processedData: any[] = [];
    processedData = [
      { name: foodConstant.approvedText, data: goodValues },
      { name: foodConstant.unApprovedText, data: badValues },
    ];
    //setProteinChartValues(resultArray);
    return [processedData, months];
  }
};
const ProteinLactoseWaterChart1: React.FC<ChartProps> = (props: any) => {
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

  const options: ApexOptions = {
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "center",
    },
    //colors: ["#3C50E0", "#80CAEE"],
    colors: ["#006400", "#f84c0b", "#F7DC6F", "#D4AC0D"], // Array of colors
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      stacked: chartStacked,
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
      toolbar: {
        show: true,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },
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
      type: "category",
      categories: months,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
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
    if (filteredChartData) {
      let value: any[] = [];
      // const [firstDate, lastDate] = [...filteredChartData].sort(
      //   (a, b) => new Date(a.result_date) - new Date(b.result_date)
      // );
      // firstDate && setFirstDate(firstDate.result_date);
      // lastDate && setLastDate(lastDate.result_date);
      chartData && (value = computeChart(filteredChartData));
      value[0] && setState({ series: value[0] });
      value[1] && setMonths(value[1]);
    }
  }, [filteredChartData]);

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
        console.log("filtered", startDate, endDate, filteredData);
      }
    }
  }, [startDate, endDate]);

  const [state, setState] = useState<ChartOneState>({
    series: [],
  });

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-3 pt-3.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-3.5 xl:col-span-8">
      <Spinner />
      {firstDate && lastDate && (
        <h5 className="text-center text-title-sm font-thin text-black dark:text-white dark:text-whit ml-3 mt-0 mb-3">
          Protein, Lactose and water values from {firstDate} to {lastDate}
        </h5>
      )}
      <div className="">
        {/* <div className="flex w-full flex-wrap gap-0 sm:gap-0">
          <div className="flex min-w-40.5">
            <span className="mt-1 mr-1 flex h-3 w-full max-w-3 items-center justify-center rounded-full border border-green-800">
              <span className="block h-2 w-full max-w-2 rounded-full bg-green-900"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-sm text-green-700">
                Satisfactory
              </p>
              <p className="text-xs font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
          <div className="flex min-w-40.5">
            <span className="mt-1 mr-1 flex h-3 w-full max-w-3 items-center justify-center rounded-full border border-red-800">
              <span className="block h-2 w-full max-w-2 rounded-full bg-red-700"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-sm text-red-700">
                Action is required
              </p>
              <p className="text-xs font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
        </div> */}
        <div className="flex w-full justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4 mb-3">
            <div className="w-2/8 mr-2">
              <span className="text-sm pl-3">From</span>
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
              <span className="text-sm pl-3">To {endDate}</span>
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
              <span className="text-sm pl-1">Chart Type</span>
              <select
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter  dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                onChange={(e) => {
                  setChartType(e.target.value);
                }}
              >
                <option value="area">Area</option>
                <option value="bar">Bar</option>
                <option value="line">Line</option>
              </select>
            </div>

            <div className="w-2/8">
              <span className="text-sm pl-1">Chart Stack</span>
              <select
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter  dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                onChange={(e) => {
                  setChartStacked(e.target.value);
                }}
              >
                <option value="false">Non Stacked</option>
                <option value="true">Stacked</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          {/* <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          /> */}

          <ReactApexChart
            options={options}
            series={state.series}
            type={chartType}
            height={320}
          />
        </div>
      </div>
    </div>
  );
};

export default ProteinLactoseWaterChart1;
