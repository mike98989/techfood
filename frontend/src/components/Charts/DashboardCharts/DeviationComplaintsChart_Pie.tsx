import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import Badge from "../../Badges/Badge";

interface ChartProps {
  chartData: any; // Make sure this matches the type of data you're passing
}

const formatDataForChart = (dataArray: any, parameter: String, t: any): {} => {
  const obj: any = {};
  for (let i = 0; i < dataArray.length; i++) {
    ////If the parameter is set to section
    if (parameter == "section") {
      if (obj.hasOwnProperty(t(dataArray[i].section.name_key))) {
        obj[t(dataArray[i].section.name_key)] += 1;
      } else {
        obj[t(dataArray[i].section.name_key)] = 1;
      }
    }

    ////If the parameter is set to section
    if (parameter == "deviation_type") {
      if (obj.hasOwnProperty(t(dataArray[i].deviation.name_key))) {
        obj[t(dataArray[i].deviation.name_key)] += 1;
      } else {
        obj[t(dataArray[i].deviation.name_key)] = 1;
      }
    }

    ////If the parameter is set to section
    if (parameter == "risk_category") {
      if (obj.hasOwnProperty(t(dataArray[i].risk_category.name))) {
        obj[t(dataArray[i].risk_category.name)] += 1;
      } else {
        obj[t(dataArray[i].risk_category.name)] = 1;
      }
    }
  }
  const series = Object.values(obj);
  const labels = Object.keys(obj);
  return { series, labels };
};

const FoodPRoductionChart: React.FC<ChartProps> = ({ chartData }) => {
  const { t } = useTranslation();
  const [parameter, setParameter] = useState("section");

  useEffect(() => {
    let value: any = [];
    chartData.data &&
      (value = formatDataForChart(chartData.data, parameter, t));
    const { series, labels } = value;

    setState({ series: series });
    setLabels(labels);
  }, [chartData, parameter]);

  const [labels, setLabels] = useState([]);
  const [state, setState] = useState({ series: [] });

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
      position: "right",
      show: true,

      horizontalAlign: "center",
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
          <div className="w-full flex flex-row">
            <p className=" text-cyan-900 dark:text-white font-thin">
              {t("deviation_complaints")} - {t(parameter)}
            </p>

            <select
              className="w-2/4 ml-3 -mt-1 rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
              name="select_parameter"
              onChange={(e) => setParameter(e.target.value)}
            >
              <option value="section">{t("section")}</option>
              <option value="deviation_type">{t("deviation_type")}</option>
              <option value="risk_category">{t("risk_category")}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div className="mx-auto flex justify-center">
          {chartData && chartData.data?.length > 0 ? (
            state.series && (
              <ReactApexChart
                options={chartOptions}
                series={state.series}
                type="donut"
                width={450}
              />
            )
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
