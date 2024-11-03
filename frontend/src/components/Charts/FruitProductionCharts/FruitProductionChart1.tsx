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

type SeriesData = {
  name: string;
  data: number[];
};

const formatDataForChart = (
  dataArray: any[]
): { series: SeriesData[]; months: string[] } => {
  const data = dataArray.sort(
    (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  // console.log(data);
  const result: Record<string, Record<string, number>> = {};
  const monthsSet: Set<string> = new Set();

  // Loop through the data to collect occurrences and unique months
  data.forEach((entry) => {
    const date = new Date(entry.date);
    let yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    //const dateToCheck = new Date(yearMonth);
    //yearMonth = dateToCheck.toLocaleString("default", { month: "long" });
    // Track unique months
    monthsSet.add(yearMonth);

    // Initialize structure for each cause
    if (!result[entry.cause]) {
      result[entry.cause] = {};
    }

    // Increment the count for the cause in the specific month
    if (!result[entry.cause][yearMonth]) {
      result[entry.cause][yearMonth] = 0;
    }

    result[entry.cause][yearMonth]++;
  });

  // Convert the Set of months to an array and sort it in ascending order
  const sortedMonths: string[] = Array.from(monthsSet).sort();
  // Prepare the series array for the chart
  const series: any[] = Object.keys(result).map((cause) => {
    return {
      name: cause,
      data: sortedMonths.map((month) => result[cause][month] || 0), // Fill in counts for each month
    };
  });

  console.log("Series", series);
  return { series, months: sortedMonths };
};
const FruitProductionChart1: React.FC<ChartProps> = (props: any) => {
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

  const chartOptions: ApexOptions = {
    chart: {
      stacked: chartStacked,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
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
      width: 1, // Change this value to reduce/increase line thickness
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    xaxis: {
      categories: months,
    },
    legend: {
      position: "bottom",
    },
    fill: {
      opacity: 1,
    },
    dataLabels: {
      enabled: true,
    },

    // yaxis: {
    //   title: {
    //     text: "Causes",
    //   },
    // },
  };

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
    setIsLoading(false);
  }, [props]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (filteredChartData) {
      let value: any = [];
      chartData && (value = formatDataForChart(filteredChartData));
      value.series && setState({ series: value.series });
      value.months && setMonths(value.months);
    }
  }, [filteredChartData]);

  useEffect(() => {
    if (chartData) {
      const start = Date.parse(startDate);
      const end = Date.parse(endDate);
      if (!isNaN(start) && !isNaN(end)) {
        const filteredData = chartData.filter((data: any, i) =>
          isDateInRange({
            dateToCheck: data.date,
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
          Fruit Production Values from {firstDate} to {lastDate}
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
                  alert(e.target.value);
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
          <ReactApexChart
            options={chartOptions}
            series={state.series}
            type={chartType}
            height={320}
          />
        </div>
      </div>
    </div>
  );
};

export default FruitProductionChart1;
