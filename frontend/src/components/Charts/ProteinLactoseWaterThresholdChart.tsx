import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useEffect } from "react";

interface ChartProps {
  chartData: any; // Make sure this matches the type of data you're passing
  constant: any;
}

const computeChart = (data: any, constant: any) => {
  const resultMap = new Map();
  const sortedArray = [];

  const months: any = [];
  const goodValues: any = [];
  const badValues: any = [];

  const currentYear = new Date().getFullYear(); // Get the current year
  for (let i = 0; i < data.length; i++) {
    //// Check the date
    const dateToCheck = new Date(data[i].result_date);
    /////// If the date is this year
    if (dateToCheck.getFullYear() === currentYear) {
      //const month = dateToCheck.getMonth() + 1; //// Get the month
      const month = dateToCheck.toLocaleString("default", { month: "long" });
      if (!resultMap.has(month)) {
        resultMap.set(month, { good: 0, bad: 0 });
      }
      const dateEntry = resultMap.get(month);

      /////// If the water value is greater than the constant increament good by 1 else increament bad by 1
      if (data[i].protein_value > constant.constants) {
        dateEntry.good += 1;
      } else {
        dateEntry.bad += 1;
      }

      /////// If the water value is greater than the constant increament good by 1 else increament bad by 1
      if (data[i].lactose_value > constant.constants) {
        dateEntry.good += 1;
      } else {
        dateEntry.bad += 1;
      }

      /////// If the water value is greater than the constant increament good by 1 else increament bad by 1
      if (data[i].water_value > constant.constants) {
        dateEntry.good += 1;
      } else {
        dateEntry.bad += 1;
      } //// Sort the map in ascending order
    }
  }

  console.log("resultss", resultMap);
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
    { name: constant.approvedText, data: goodValues },
    { name: constant.unApprovedText, data: badValues },
  ];
  //setProteinChartValues(resultArray);
  return [processedData, months];
};

const ProteinLactoseWaterThresholdChart: React.FC<ChartProps> = ({
  chartData,
  constant,
}) => {
  useEffect(() => {
    let value: any[] = [];
    chartData.data &&
      ((value = computeChart(chartData.data, constant)),
      console.log("valuesss", value));
    value[0] && setState({ series: value[0] });
    value[1] && setMonths(value[1]);
  }, [chartData]);

  const [months, setMonths] = useState([]);
  const [state, setState] = useState({ series: [] });

  const options: ApexOptions = {
    chart: {
      id: "threshold-bar-chart",
      type: "bar",
      zoom: {
        enabled: true,
      },
    },
    xaxis: {
      categories: months,
    },
    plotOptions: {
      bar: {
        horizontal: false, // Set to true for horizontal bars
        //endingShape: 'rounded'
      },
    },

    colors: ["#006400", "#FF0000", "#F7DC6F", "#D4AC0D"], // Array of colors
  };

  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options}
            series={state.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ProteinLactoseWaterThresholdChart;
