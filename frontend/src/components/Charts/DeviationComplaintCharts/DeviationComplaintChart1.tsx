import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import chartData from "../../../methods/chartData";
import { ReusableMethods } from "../../../methods/ReusableMethods";
import SpinnerObject from "../../../components/Spinner/Spinner";

interface ChartProps {
  chartData: any; // Make sure this matches the type of data you're passing
}

const formatDataForChart = (dataArray: any): {} => {
  const obj: any = {};
  for (let i = 0; i < dataArray.length; i++) {
    if (obj.hasOwnProperty(dataArray[i].location)) {
      obj[dataArray[i].location] += 1;
    } else {
      obj[dataArray[i].location] = 1;
    }
  }
  const series = Object.values(obj);
  const labels = Object.keys(obj);
  return { series, labels };
};

const DeviationComplaintChart1: React.FC<ChartProps> = (props: any) => {
  const [chartData, setChartData] = useState([]);
  const [filteredChartData, setFilteredChartData] = useState([]);
  const [startDate, setStartData] = useState("");
  const [endDate, setEndData] = useState("");
  const { isDateInRange } = ReusableMethods();
  const { setIsLoading, Spinner } = SpinnerObject();
  const [months, setMonths] = useState([]);
  const [chartType, setChartType] = useState("donut");
  const [chartStacked, setChartStacked] = useState(false);
  const [firstDate, setFirstDate] = useState(false);
  const [lastDate, setLastDate] = useState(false);

  const [labels, setLabels] = useState([]);
  const [state, setState] = useState({ series: [] });

  const chartOptions = {
    chart: {
      type: chartType,
      toolbar: {
        show: true,
      },
    },
    labels: labels,
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
      chartData && (value = formatDataForChart(filteredChartData));
      const { series, labels } = value;

      setState({ series: series });
      setLabels(labels);
    }
  }, [filteredChartData]);

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
          Deviation Complaint data from {firstDate} to {lastDate}
        </h5>
      )}
      <div className="">
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
                <option value="donut">Donut</option>
                <option value="area">Area</option>
                <option value="bar">Bar</option>
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
          {state.series && (
            <ReactApexChart
              options={chartOptions}
              series={state.series}
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
