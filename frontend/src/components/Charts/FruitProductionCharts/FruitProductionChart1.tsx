import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import chartData from "../../../methods/chartData";
import { ReusableMethods } from "../../../methods/ReusableMethods";
import SpinnerObject from "../../../components/Spinner/Spinner";
import { useTranslation } from "react-i18next";

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
  dataArray: any[],
  t: any
): {
  causeSeries: SeriesData[];
  sectionSeries: SeriesData[];
  deviationSeries: SeriesData[];
  statusSeries: SeriesData[];
  months: string[];
} => {
  const data = dataArray.sort(
    (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  // console.log(data);
  const causeResult: Record<string, Record<string, number>> = {};
  const sectionResult: Record<string, Record<string, number>> = {};
  const deviationResult: Record<string, Record<string, number>> = {};
  const statusResult: Record<string, Record<string, number>> = {};
  const monthsSet: Set<string> = new Set();

  // Loop through the data to collect occurrences and unique months
  data.forEach((entry) => {
    const date = new Date(entry.date);
    let yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    monthsSet.add(yearMonth);

    // Initialize structure for each cause
    if (!causeResult[entry.cause.name_key]) {
      causeResult[entry.cause.name_key] = {};
    }

    // Initialize structure for each section
    if (!sectionResult[entry.section.name_key]) {
      sectionResult[entry.section.name_key] = {};
    }

    // Initialize structure for each deviation
    if (!deviationResult[entry.deviation.name_key]) {
      deviationResult[entry.deviation.name_key] = {};
    }

    // Initialize structure for each status
    if (!statusResult[entry.status_type.name_key]) {
      statusResult[entry.status_type.name_key] = {};
    }

    // Increment the count for the cause in the specific month
    if (!causeResult[entry.cause.name_key][yearMonth]) {
      causeResult[entry.cause.name_key][yearMonth] = 0;
    }

    // Increment the count for the seciton in the specific month
    if (!sectionResult[entry.section.name_key][yearMonth]) {
      sectionResult[entry.section.name_key][yearMonth] = 0;
    }

    // Increment the count for the deviation in the specific month
    if (!deviationResult[entry.deviation.name_key][yearMonth]) {
      deviationResult[entry.deviation.name_key][yearMonth] = 0;
    }

    // Increment the count for the status in the specific month
    if (!statusResult[entry.status_type.name_key][yearMonth]) {
      statusResult[entry.status_type.name_key][yearMonth] = 0;
    }

    causeResult[entry.cause.name_key][yearMonth]++;
    sectionResult[entry.section.name_key][yearMonth]++;
    deviationResult[entry.deviation.name_key][yearMonth]++;
    statusResult[entry.status_type.name_key][yearMonth]++;
  });

  // Convert the Set of months to an array and sort it in ascending order
  const sortedMonths: string[] = Array.from(monthsSet);
  // Prepare the causeSeries array for the chart
  const causeSeries: any[] = Object.keys(causeResult).map((cause) => {
    return {
      name: t(cause),
      data: sortedMonths.map((month) => causeResult[cause][month] || 0), // Fill in counts for each month
    };
  });

  const sectionSeries: any[] = Object.keys(sectionResult).map((section) => {
    return {
      name: t(section),
      data: sortedMonths.map((month) => sectionResult[section][month] || 0), // Fill in counts for each month
    };
  });

  const deviationSeries: any[] = Object.keys(deviationResult).map(
    (deviation) => {
      return {
        name: t(deviation),
        data: sortedMonths.map(
          (month) => deviationResult[deviation][month] || 0
        ), // Fill in counts for each month
      };
    }
  );

  const statusSeries: any[] = Object.keys(statusResult).map((status_type) => {
    return {
      name: t(status_type),
      data: sortedMonths.map((month) => statusResult[status_type][month] || 0), // Fill in counts for each month
    };
  });

  return {
    causeSeries,
    sectionSeries,
    deviationSeries,
    statusSeries,
    months: sortedMonths,
  };
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
  const { t } = useTranslation();
  const [causeSeries, setCauseSeries] = useState<ChartOneState>({
    series: [],
  });
  const [sectionSeries, setSectionSeries] = useState<ChartOneState>({
    series: [],
  });
  const [deviationSeries, setDeviationSeries] = useState<ChartOneState>({
    series: [],
  });
  const [statusSeries, setStatusSeries] = useState<ChartOneState>({
    series: [],
  });

  const causeChartOptions: ApexOptions = {
    legend: {
      show: true,
      position: "right",
      horizontalAlign: "center",
    },
    chart: {
      stacked: chartStacked,
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
    fill: {
      opacity: 1,
    },
    dataLabels: {
      enabled: false,
    },
  };

  const sectionChartOptions: ApexOptions = {
    legend: {
      show: true,
      position: "right",
      horizontalAlign: "center",
    },
    chart: {
      stacked: chartStacked,
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

    fill: {
      opacity: 1,
    },
    dataLabels: {
      enabled: false,
    },
  };

  const deviationChartOptions: ApexOptions = {
    legend: {
      show: true,
      position: "right",
      horizontalAlign: "center",
    },
    chart: {
      stacked: chartStacked,
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

    fill: {
      opacity: 1,
    },
    dataLabels: {
      enabled: false,
    },
  };

  const statusChartOptions: ApexOptions = {
    legend: {
      show: true,
      position: "right",
      horizontalAlign: "center",
    },
    chart: {
      stacked: chartStacked,
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

    fill: {
      opacity: 1,
    },
    dataLabels: {
      enabled: false,
    },
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
      chartData && (value = formatDataForChart(filteredChartData, t));
      value.causeSeries && setCauseSeries({ series: value.causeSeries });
      value.sectionSeries && setSectionSeries({ series: value.sectionSeries });
      value.statusSeries && setStatusSeries({ series: value.statusSeries });
      value.deviationSeries &&
        setDeviationSeries({ series: value.deviationSeries });
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

  //   const handleReset = () => {
  //     setState((prevState) => ({
  //       ...prevState,
  //     }));
  //   };
  //   handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-gray-2 px-3 pt-3.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-3.5 xl:col-span-12">
      <Spinner />
      {firstDate && lastDate && (
        <h5 className="text-center text-title-sm font-thin text-black dark:text-white dark:text-whit ml-3 mt-0 mb-3">
          {t("fruit_production") +
            " " +
            t("values") +
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
              <span className="text-sm pl-3">{t("to") + " " + endDate}</span>
              <input
                type="date"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition  disabled:cursor-default disabled:bg-whiter  dark:bg-form-input dark:text-white dark:focus:border-primary"
                onChange={(e) => {
                  setEndData(e.target.value);
                  setLastDate(e.target.value);
                }}
              />
            </div>

            <div className="w-2/8">
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

      <div className="md:flex mt-4 md:flex-row w-full">
        <div className="-ml-5 md:w-3/6">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("cause")}
            </p>
          </div>
          <ReactApexChart
            options={causeChartOptions}
            series={causeSeries.series}
            type={chartType}
            height={320}
          />
        </div>

        <div className="ml-2 md:w-3/6">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("section")}
            </p>
          </div>
          <ReactApexChart
            options={sectionChartOptions}
            series={sectionSeries.series}
            type={chartType}
            height={320}
          />
        </div>
      </div>

      <div className="md:flex mt-4 md:flex-row w-full">
        <div className="-ml-5 md:w-3/6">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("deviation_type")}
            </p>
          </div>
          <ReactApexChart
            options={deviationChartOptions}
            series={deviationSeries.series}
            type={chartType}
            height={320}
          />
        </div>

        <div className="-ml-5 md:w-3/6">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("status")}
            </p>
          </div>
          <ReactApexChart
            options={statusChartOptions}
            series={statusSeries.series}
            type={chartType}
            height={320}
          />
        </div>
      </div>
    </div>
  );
};

export default FruitProductionChart1;
