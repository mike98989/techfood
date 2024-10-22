import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

interface ChartProps {
  chartData: any; // Make sure this matches the type of data you're passing
}

const processData = (data: any[]) => {
  let proteinValue: any[] = [];
  let lactoseValue: any[] = [];
  let waterValue: any[] = [];
  let months: any[] = [];
  for (let i = 0; i < data.length; i++) {
    let year_month = data[i].result_date;
    year_month = year_month.substring(0, 7);
    //// If the month is not in the month array, then add a month
    //!months.includes(year_month) && (months = [...months, year_month]);

    data[i].protein_value != null &&
      (proteinValue = [...proteinValue, data[i].protein_value]);
    data[i].lactose_value != null &&
      (lactoseValue = [...lactoseValue, data[i].lactose_value]);
    data[i].water_value != null &&
      (waterValue = [...waterValue, data[i].water_value]);
  }
  let processedData: any[] = [];
  processedData = [
    { name: "protein", data: proteinValue },
    { name: "lactose", data: lactoseValue },
    { name: "water", data: waterValue },
  ];
  //   processedData.protein = proteinValue;
  //   processedData.lactose = lactoseValue;
  //   processedData.water = waterValue;

  return [processedData];
};

const ProteinLactoseWaterChart: React.FC<ChartProps> = ({ chartData }) => {
  useEffect(() => {
    let value: any[] = [];
    chartData.data && (value = processData(chartData.data));
    value[0] && (setState({ series: value[0] }), setMonths(value[1]));
    setMonths(value[1]);
  }, [chartData]);
  const [months, setMonths] = useState([]);
  const [state, setState] = useState({
    series: [],
  });

  const options: ApexOptions = {
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

    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // alternating colors
        opacity: 0.5,
      },
    },
    xaxis: {
      //   categories: [
      //     "Jan",
      //     "Feb",
      //     "Mar",
      //     "Apr",
      //     "May",
      //     "Jun",
      //     "Jul",
      //     "Aug",
      //     "Sep",
      //   ], // X-axis labels
      categories: months,
      labels: {
        show: false, // Hides the X-axis labels
      },
    },
  };

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex w-full">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>
            <div className="w-full">
              <p className=" text-cyan-900 font-thin">
                Protein, Lactose & Water
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="line"
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default ProteinLactoseWaterChart;
