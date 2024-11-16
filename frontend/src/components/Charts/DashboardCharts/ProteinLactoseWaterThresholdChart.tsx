import { ApexOptions } from "apexcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { constant } from "../../../Utils/Constants";
import Badge from "../../Badges/Badge";
interface ChartProps {
  chartData: any; // Make sure this matches the type of data you're passing
}

const computeChart = (inputdata: any, parameter: String, t: any) => {
  if (inputdata) {
    const data = inputdata.sort(
      (a: any, b: any) =>
        new Date(a.result_date).getTime() - new Date(b.result_date).getTime()
    );
    const resultMap = new Map();
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
        const month = dateToCheck.toLocaleString("default", { month: "short" });
        if (!resultMap.has(month)) {
          resultMap.set(month, { good: 0, bad: 0 });
        }
        const dateEntry = resultMap.get(month);

        ///////If the parameter is set to protein
        if (parameter == "protein") {
          /////// If the protein value is greater than the constant increament good by 1 else increament bad by 1
          if (data[i].protein_value > constant.proteinConstantLimit) {
            dateEntry.good += 1;
          } else {
            dateEntry.bad += 1;
          }
        }

        ///////If the parameter is set to lactose
        if (parameter == "lactose") {
          /////// If the water value is greater than the constant increament good by 1 else increament bad by 1
          if (data[i].lactose_value > constant.lactoseConstantLimit) {
            dateEntry.good += 1;
          } else {
            dateEntry.bad += 1;
          }
        }

        ///////If the parameter is set to water
        if (parameter == "water") {
          /////// If the water value is greater than the constant increament good by 1 else increament bad by 1
          if (data[i].water_value > constant.waterConstantLimit) {
            dateEntry.good += 1;
          } else {
            dateEntry.bad += 1;
          } //// Sort the map in ascending order
        }
      }
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
      { name: t(constant.approvedText), data: goodValues },
      { name: t(constant.unApprovedText), data: badValues },
    ];
    //setProteinChartValues(resultArray);
    return [processedData, months];
  }
};

const ProteinLactoseWaterThresholdChart: React.FC<ChartProps> = ({
  chartData,
}) => {
  const [months, setMonths] = useState([]);
  const [state, setState] = useState({ series: [] });
  const [parameter, setParameter] = useState("protein");
  const { t } = useTranslation();
  const language = useSelector((state: any) => state.language.value);

  useEffect(() => {
    let value: any[] = [];
    chartData.data && (value = computeChart(chartData.data, parameter, t));
    value[0] && setState({ series: value[0] });
    value[1] && setMonths(value[1]);
  }, [chartData, parameter]);

  // useEffect(() => {
  //   // let value: any[] = [];
  //   // chartData.data && (value = computeChart(chartData.data, t));
  //   // value[0] && setState({ series: value[0] });
  //   // value[1] && setMonths(value[1]);

  //   if (language.language) {
  //     //handleReset();
  //     //console.log("currentState:", state);
  //     //console.log("appproved", t(constant.approvedText));
  //     //console.log("newState:", state);
  //   }
  // }, [language.language]);

  const options: ApexOptions = {
    chart: {
      id: "threshold-bar-chart",
      type: "bar",
      stacked: true,

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

    colors: ["#006400", "#f84c0b", "#F7DC6F", "#D4AC0D"], // Array of colors
  };

  // const handleReset = () => {
  //   setState((prevState) => ({
  //     ...prevState,
  //   }));
  // };
  //handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex w-full">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>
            <div className="w-full flex flex-row">
              <p className=" text-cyan-900 dark:text-white font-thin">
                {t("protein_lactose_water")} - {t(parameter)}
              </p>

              <select
                className="w-1/4 ml-3 -mt-1 rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                name="select_parameter"
                onChange={(e) => setParameter(e.target.value)}
              >
                <option value="protein">{t("protein")}</option>
                <option value="lactose">{t("lactose")}</option>
                <option value="water">{t("water")}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div id="chartTwo" className="-ml-5">
          {chartData && chartData.data?.length > 0 ? (
            <ReactApexChart
              options={options}
              series={state.series}
              type="bar"
              height={320}
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

export default ProteinLactoseWaterThresholdChart;
