import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";

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

const FoodPRoductionChart: React.FC<ChartProps> = ({ chartData }) => {
  const { t } = useTranslation();

  useEffect(() => {
    let value: any = [];
    chartData.data && (value = formatDataForChart(chartData.data));
    const { series, labels } = value;

    setState({ series: series });
    setLabels(labels);
  }, [chartData]);

  const [labels, setLabels] = useState([
    "Apple",
    "Mango",
    "Orange",
    "Banana",
    "Pineapple",
  ]);
  const [state, setState] = useState({ series: [44, 55, 13, 43, 22] });

  //const series = [44, 55, 13, 43, 22];
  const chartOptions = {
    chart: {
      type: "donut",
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

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div className="flex w-full">
          <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
            <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
          </span>
          <div className="w-full">
            <p className=" text-cyan-900 font-thin">
              {t("deviation_complaints")}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div className="mx-auto flex justify-center">
          {state.series && (
            <ReactApexChart
              options={chartOptions}
              series={state.series}
              type="donut"
              height={350}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodPRoductionChart;
