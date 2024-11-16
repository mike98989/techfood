import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import Badge from "../../Badges/Badge";

interface ChartProps {
  chartData: any; // Make sure this matches the type of data you're passing
}

// const computeChart = (inputdata: any) => {
//   if (inputdata) {
//     const data = inputdata.sort(
//       (a: any, b: any) =>
//         new Date(a.date).getTime() - new Date(b.date).getTime()
//     );
//     const resultMap = new Map();
//     const months: any = [];
//     const causes: any = [];

//     const currentYear = new Date().getFullYear(); // Get the current year
//     for (let i = 0; i < data.length; i++) {
//       //// Check the date
//       const dateToCheck = new Date(data[i].date);
//       /////// If the date is this year
//       if (dateToCheck.getFullYear() === currentYear) {
//         //const month = dateToCheck.getMonth() + 1; //// Get the month
//         const month = dateToCheck.toLocaleString("default", { month: "long" });
//         if (!resultMap.has(month)) {
//           resultMap.set(month, {});
//         }

//         if (resultMap.get(month).hasOwnProperty(data[i].cause_id)) {
//           resultMap.get(month)[data[i].cause_id]++;
//         } else {
//           resultMap.get(month)[data[i].cause_id] = 0;
//         }
//       }
//     }

//     const valuesArray = Array.from(resultMap.values());
//     const courses = [];
//     for (let i = 0; i < valuesArray.length; i++) {
//       console.log(valuesArray[i]);
//     }

//     //console.log(resultMap);
//     // Convert the Map to an array of objects

//     // Set processed value for chat
//     // let processedData: any[] = [];
//     // processedData = [
//     //   { name: constant.approvedText, data: goodValues },
//     //   { name: constant.unApprovedText, data: badValues },
//     // ];
//     //setProteinChartValues(resultArray);
//     //return [resultMap];
//   }
// };

type Entry = {
  id: number;
  user_id: number;
  date: string;
  cause_id: string;
  section_id: string;
  status: number;
};

type SeriesData = {
  name: string;
  data: number[];
};

const formatDataForChart = (
  dataArray: Entry[],
  parameter: String,
  t: any
): { series: SeriesData[]; months: string[] } => {
  const data = dataArray.sort(
    (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  //console.log("data entry", data);
  const result: Record<string, Record<string, number>> = {};
  const monthsSet: Set<string> = new Set();
  const currentYear = new Date().getFullYear();
  const filtered = data.filter((data) => {
    const neededDate = new Date(data.date);
    return data && neededDate.getFullYear() == currentYear;
  });
  // Get the current year

  // Loop through the data to collect occurrences and unique months
  filtered.forEach((entry) => {
    const date = new Date(entry.date);
    /////// If the date is this year
    const month = date.toLocaleString("default", { month: "short" }); // "Nov" for November

    monthsSet.add(month);

    /////////If the parameter is cause
    if (parameter == "cause") {
      // Initialize structure for each cause
      if (!result[entry.cause.name_key]) {
        result[entry.cause.name_key] = {};
      }
      // Increment the count for the cause in the specific month
      if (!result[entry.cause.name_key][month]) {
        result[entry.cause.name_key][month] = 0;
      }
      result[entry.cause.name_key][month]++;
    }

    /////////If the parameter is Deviation Type
    if (parameter == "deviation_type") {
      // Initialize structure for each cause
      if (!result[entry.deviation.name_key]) {
        result[entry.deviation.name_key] = {};
      }
      // Increment the count for the cause in the specific month
      if (!result[entry.deviation.name_key][month]) {
        result[entry.deviation.name_key][month] = 0;
      }
      result[entry.deviation.name_key][month]++;
    }

    /////////If the parameter is Deviation Type
    if (parameter == "section") {
      // Initialize structure for each cause
      if (!result[entry.section.name_key]) {
        result[entry.section.name_key] = {};
      }
      // Increment the count for the cause in the specific month
      if (!result[entry.section.name_key][month]) {
        result[entry.section.name_key][month] = 0;
      }
      result[entry.section.name_key][month]++;
    }
  });

  // Convert the Set of months to an array and sort it in ascending order
  const sortedMonths: string[] = Array.from(monthsSet);
  // Prepare the series array for the chart
  const series: any[] = Object.keys(result).map((data) => {
    return {
      name: t(data),
      data: sortedMonths.map((month) => result[data][month] || 0), // Fill in counts for each month
    };
  });

  return { series, months: sortedMonths };
};

const FoodPRoductionChart: React.FC<ChartProps> = ({ chartData }) => {
  const { t } = useTranslation();
  const [months, setMonths] = useState([]);
  const [chartDataValus, setChartDataValues] = useState<any[]>([]);
  const [parameter, setParameter] = useState("cause");
  const [state, setState] = useState({
    series: [],
  });

  useEffect(() => {
    let value: any = [];
    chartData.data &&
      (value = formatDataForChart(chartData.data, parameter, t));
    //setChartDataValues(value);
    value.series && setState({ series: value.series });
    value.months && setMonths(value.months);
  }, [chartData, parameter]);

  const chartOptions = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: true,
      },
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
        text: t(parameter),
      },
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white py-4 px-2 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div className="flex w-full">
          <span className="mt-1 mr-2 ml-3 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
            <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
          </span>
          <div className="w-full flex flex-row">
            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("fruit_production")} - {t(parameter)}
            </p>
            <select
              className="w-1/2 ml-3 -mt-1 rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
              name="select_parameter"
              onChange={(e) => setParameter(e.target.value)}
            >
              <option value="cause">{t("cause")}</option>
              <option value="deviation_type">{t("deviation_type")}</option>
              <option value="section">{t("section")}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div className="flex justify-center">
          {chartData && chartData.data?.length > 0 ? (
            <ReactApexChart
              options={chartOptions}
              series={state.series}
              type="bar"
              height={330}
            />
          ) : (
            <div className="flex justify-center pt-3">
              <Badge type="danger" value={t("no_record_found")} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodPRoductionChart;
