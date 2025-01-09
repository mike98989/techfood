import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import chartData from "../../../methods/chartData";
import { ReusableMethods } from "../../../methods/ReusableMethods";
import SpinnerObject from "../../../components/Spinner/Spinner";
import { colors, constant } from "../../../Utils/Constants";
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

type SeriesData = {
  name: string;
  data: number[];
};
const formatDataForChart = (dataArray: any[], t: any) => {
  const weeklyResult: Record<string, Record<string, number>> = {};
  const hoursAndRateResult: Record<string, Record<string, number>> = {};
  const lambPorkBeefResult: Record<string, Record<string, number>> = {};
  const avgDeviationResult: Record<string, Record<string, number>> = {};
  const weeksSet: Set<string> = new Set();
  const inputdata = dataArray.sort((a, b) => a.week - b.week);

  // Loop through the data to collect occurrences and unique months
  inputdata.forEach((entry) => {
    //const date = new Date(entry.date);
    const year_week = entry.year + "- wk -" + entry.week;
    weeksSet.add(year_week);

    // Initialize structure for each week
    if (!weeklyResult[year_week]) {
      weeklyResult[year_week] = {
        ack_output_qty: 0,
        ack_target_qty: 0,
        weekly_output: 0,
      };
      hoursAndRateResult[year_week] = {
        weekly_available_hours: 0,
        weekly_maintenance_hours: 0,
        weekly_production_hours: 0,
        weekly_output_percent: 0,
      };
      lambPorkBeefResult[year_week] = {
        lamb: 0,
        pork: 0,
        beef: 0,
      };
      avgDeviationResult[year_week] = {
        qty: 0,
        time: 0,
      };
    }

    weeklyResult[year_week].weekly_target = entry.weekly_target;
    // weeklyResult[year_week].ack_output_qty += entry.ack_output_qty + 0;
    // weeklyResult[year_week].ack_target_qty += entry.ack_target_qty + 0;
    weeklyResult[year_week].weekly_output += entry.output_per_day + 0;

    hoursAndRateResult[year_week].weekly_available_hours += Math.round(
      entry.total_available_hours + 0
    );
    hoursAndRateResult[year_week].weekly_maintenance_hours += Math.round(
      entry.maintenance_hours + 0
    );
    hoursAndRateResult[year_week].weekly_production_hours += Math.round(
      entry.available_production_hours + 0
    );
    hoursAndRateResult[year_week].weekly_rate = entry.weekly_rate;
    hoursAndRateResult[year_week].weekly_output_percent += Math.round(
      (entry.output_percent * 1) / inputdata.length
    );

    lambPorkBeefResult[year_week].lamb += entry.lamb * 1;
    lambPorkBeefResult[year_week].pork += entry.pork * 1;
    lambPorkBeefResult[year_week].beef += entry.beef * 1;

    avgDeviationResult[year_week].qty += Math.round(
      (entry.deviation_from_contract_qty * 1) / inputdata.length
    );
    avgDeviationResult[year_week].time += Math.round(
      (entry.deviation_from_contract_time * 1) / inputdata.length
    );
  });

  // Convert the Set of weeks to an array and sort it in ascending order
  const sortedWeeks: string[] = Array.from(weeksSet);
  // Prepare the weekly Series array for the chart
  const weeklySeries: any[] = Object.keys(weeklyResult).map((name) => {
    return {
      name: name,
      data: weeklyResult[name],
    };
  });

  // Prepare the weekly Series for hours and rate array for the chart
  const weeklySeriesHoursAndRateSeries: any[] = Object.keys(
    hoursAndRateResult
  ).map((name) => {
    return {
      name: name,
      data: hoursAndRateResult[name],
    };
  });

  // Prepare the weekly Series for lamb pork beef array for the chart
  const weeklySeriesLambPorkBeef: any[] = Object.keys(lambPorkBeefResult).map(
    (name) => {
      return {
        name: name,
        data: lambPorkBeefResult[name],
      };
    }
  );

  // Prepare the weekly Series for deviaiton quantity and time array for the chart
  const weeklySeriesDeviationFromQtyAndTime: any[] = Object.keys(
    avgDeviationResult
  ).map((name) => {
    return {
      name: name,
      data: avgDeviationResult[name],
    };
  });
  const ack_weekly_fields = [
    // { key: "ack_output_qty", label: t("ack_output_qty") },
    // { key: "ack_target_qty", label: t("ack_target_qty") },
    { key: "weekly_output", label: t("weekly_output") },
    { key: "weekly_target", label: t("weekly_target") },
  ];

  const hours_and_rate_fields = [
    { key: "weekly_available_hours", label: t("available_hours") },
    { key: "weekly_maintenance_hours", label: t("maintenance_hours") },
    { key: "weekly_production_hours", label: t("production_hours") },
    { key: "weekly_rate", label: t("weekly_rate") },
    { key: "weekly_output_percent", label: t("output_percent") },
  ];

  const lamb_pork_beef_fields = [
    { key: "lamb", label: t("lamb") },
    { key: "pork", label: t("pork") },
    { key: "beef", label: t("beef") },
  ];

  const avg_deviaiton_qty_time_fields = [
    { key: "qty", label: t("deviation_from_contract_qty") },
    { key: "time", label: t("deviation_from_contract_time") },
  ];
  // Transform the data into the ideal format
  const transformedAckWeeklyData = {
    series: ack_weekly_fields.map((field) => ({
      name: field.label,
      data: weeklySeries.map((item) => item.data[field.key]),
    })),
  };

  const transformedHoursAndRateWeeklyData = {
    series: hours_and_rate_fields.map((field) => ({
      name: field.label,
      data: weeklySeriesHoursAndRateSeries.map((item) => item.data[field.key]),
    })),
  };

  const transformedLambPorkBeefWeeklyData = {
    series: lamb_pork_beef_fields.map((field) => ({
      name: field.label,
      data: weeklySeriesLambPorkBeef.map((item) => item.data[field.key]),
    })),
  };

  const transformedAvgDeviationWeeklyData = {
    series: avg_deviaiton_qty_time_fields.map((field) => ({
      name: field.label,
      data: weeklySeriesDeviationFromQtyAndTime.map(
        (item) => item.data[field.key]
      ),
    })),
  };
  console.log("deviation", transformedAvgDeviationWeeklyData);

  return {
    transformedAckWeeklyData,
    transformedHoursAndRateWeeklyData,
    transformedLambPorkBeefWeeklyData,
    transformedAvgDeviationWeeklyData,
    weeks: sortedWeeks,
  };
};

const productivityFollowUpChart: React.FC<ChartProps> = (props: any) => {
  const [chartData, setChartData] = useState([]);
  const [filteredChartData, setFilteredChartData] = useState([]);
  const [startDate, setStartData] = useState("");
  const [endDate, setEndData] = useState("");
  const { setIsLoading, Spinner } = SpinnerObject();
  const [chartType, setChartType] = useState("bar");
  const [chartStacked, setChartStacked] = useState(false);
  const [firstDate, setFirstDate] = useState(false);
  const [lastDate, setLastDate] = useState(false);
  const [queryParams] = useState({});
  const { t } = useTranslation();
  const [yearWeeks, setYearWeeks] = useState([]);
  const user = useSelector((state: any) => state.user.value);
  const { getWeekNumber } = ReusableMethods();
  //const [weeklyChartSeries, setWeeklyChartSeries] = useState();
  const [ackWeeklySeries, setAckWeeklySeries] = useState<ChartOneState>({
    series: [],
  });

  const [HoursAndRateWeeklySeries, setHoursAndRateWeeklySeries] =
    useState<ChartOneState>({
      series: [],
    });

  const [lambPorkBeefeWeeklySeries, setLambPorkBeefSeries] =
    useState<ChartOneState>({
      series: [],
    });

  const [avgDeviaitonWeeklySeries, setAvgDeviationSeries] =
    useState<ChartOneState>({
      series: [],
    });

  useEffect(() => {
    props.chartData.data &&
      (setChartData(props.chartData.data),
      setFilteredChartData(props.chartData.data));

    if (chartData.length > 0) {
      const [firstDate, lastDate] = [...chartData].sort(
        (a, b) => a.week - b.week
      );
      firstDate && setFirstDate(firstDate.created_at.split("T")[0]);
      lastDate && setLastDate(lastDate.created_at.split("T")[0]);
    }

    setIsLoading(false);
  }, [props]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  useEffect(() => {
    if (filteredChartData.length > 0) {
      let weeklyData: any = [];
      chartData && (weeklyData = formatDataForChart(filteredChartData, t));
      setAckWeeklySeries({
        series: weeklyData.transformedAckWeeklyData.series,
      });
      setHoursAndRateWeeklySeries({
        series: weeklyData.transformedHoursAndRateWeeklyData.series,
      });
      setLambPorkBeefSeries({
        series: weeklyData.transformedLambPorkBeefWeeklyData.series,
      });
      setAvgDeviationSeries({
        series: weeklyData.transformedAvgDeviationWeeklyData.series,
      });
      setYearWeeks(weeklyData.weeks);
    }
  }, [filteredChartData, chartType]);

  useEffect(() => {
    if (chartData) {
      const startWeek = getWeekNumber(new Date(startDate));
      const endWeek = getWeekNumber(new Date(endDate));

      let filteredData: any = chartData;
      if (!isNaN(startWeek) && !isNaN(endWeek)) {
        filteredData = chartData.filter(
          (data: any, i) => data.week >= startWeek && data.week <= endWeek
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
    colors: colors, // Array of colors
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

    xaxis: {
      categories: yearWeeks,
      labels: {
        show: true, // Hides the X-axis labels
        //format: "MM dd, yyyy",
      },
      tickAmount: 10, // Number of labels on x-axis to control grouping interval
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-gray px-3 pt-3.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-3.5 xl:col-span-12">
      <Spinner />
      {firstDate && lastDate && (
        <h5 className="text-center text-title-sm font-thin text-black dark:text-white dark:text-whit ml-3 mt-0 mb-3">
          {t("followup_of_productivity") +
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

      {/* Weekly productivity follow up chart */}
      <div className="md:flex md:flex-row w-full">
        <div className="md:w-1/2 text-center justify-center ">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("output") + " / " + t("target")}
            </p>
          </div>
          <ReactApexChart
            key={"1"}
            options={ChartOptions1}
            series={ackWeeklySeries.series}
            type={chartType}
            height={320}
          />
        </div>

        <div className="md:w-1/2 text-center justify-center ">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("hours_and_rate")}
            </p>
          </div>
          <ReactApexChart
            key={"1"}
            options={ChartOptions1}
            series={HoursAndRateWeeklySeries.series}
            type={chartType}
            height={320}
          />
        </div>
      </div>

      <div className="md:flex md:flex-row w-full">
        <div className="md:w-1/2 text-center justify-center ">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("lamb") + " " + t("pork") + " " + t("beef")}
            </p>
          </div>
          <ReactApexChart
            key={"1"}
            options={ChartOptions1}
            series={lambPorkBeefeWeeklySeries.series}
            type={chartType}
            height={320}
          />
        </div>

        <div className="md:w-1/2 text-center justify-center ">
          <div className="flex w-full text-center justify-center content-center self-center items-center my-3">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>

            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("deviation_from_contract_qty") + " / " + t("time")}
            </p>
          </div>
          <ReactApexChart
            key={"1"}
            options={ChartOptions1}
            series={avgDeviaitonWeeklySeries.series}
            type={chartType}
            height={320}
          />
        </div>
      </div>
    </div>
  );
};

export default productivityFollowUpChart;
