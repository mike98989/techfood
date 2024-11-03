import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";

interface ChartProps {
  chartData: any; // Make sure this matches the type of data you're passing
}

type Entry = {
  id: number;
  user_id: number;
  date: string;
  cause: string;
  section: string;
  status: number;
};

type SeriesData = {
  name: string;
  data: number[];
};

const formatDataForChart = (
  dataArray: Entry[]
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

const FoodPRoductionChart: React.FC<ChartProps> = ({ chartData }) => {
  const { t } = useTranslation();
  useEffect(() => {
    let value: any = [];
    chartData.data && (value = formatDataForChart(chartData.data));
    //setChartDataValues(value);
    value.series && setState({ series: value.series });
    value.months && setMonths(value.months);
  }, [chartData]);

  const [months, setMonths] = useState([]);
  const [chartDataValus, setChartDataValues] = useState<any[]>([]);
  const [state, setState] = useState({
    series: [],
  });

  const chartOptions = {
    chart: {
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
    },
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
      enabled: false,
    },

    yaxis: {
      title: {
        text: "Causes",
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
            <p className=" text-cyan-900 font-thin">{t("fruit_production")}</p>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div className="mx-auto flex justify-center">
          <ReactApexChart
            options={chartOptions}
            series={state.series}
            type="line"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default FoodPRoductionChart;
