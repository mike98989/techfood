import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Badge from "../../Badges/Badge";
import { DynamicInputFieldsSettings } from "../../../methods/DynamicInputFields";

interface ChartProps {
  chartData: any; // Make sure this matches the type of data you're passing
}

const processData = (dataArray: any[], t: any) => {
  if (dataArray) {
    //////Sort the Data first
    const data = dataArray.sort(
      (a: any, b: any) =>
        new Date(a.result_date).getTime() - new Date(b.result_date).getTime()
    );
    let proteinValue: any[] = [];
    let lactoseValue: any[] = [];
    let waterValue: any[] = [];
    let months: any[] = [];
    for (let i = 0; i < data.length; i++) {
      let year_month = data[i].result_date;
      //year_month = year_month.substring(0, 7);
      //// If the month is not in the month array, then add a month
      !months.includes(year_month) && (months = [...months, year_month]);

      data[i].protein_value != null &&
        (proteinValue = [...proteinValue, data[i].protein_value]);
      data[i].lactose_value != null &&
        (lactoseValue = [...lactoseValue, data[i].lactose_value]);
      data[i].water_value != null &&
        (waterValue = [...waterValue, data[i].water_value]);
    }
    let processedData: any[] = [];
    processedData = [
      { name: t("protein"), data: proteinValue },
      { name: t("lactose"), data: lactoseValue },
      { name: t("water"), data: waterValue },
    ];
    //   processedData.protein = proteinValue;
    //   processedData.lactose = lactoseValue;
    //   processedData.water = waterValue;

    return [processedData, months];
  }
};

const ProteinLactoseWaterChart: React.FC<ChartProps> = ({ chartData }) => {
  const [months, setMonths] = useState([]);
  const { settings, setSettings } = DynamicInputFieldsSettings();
  const user = useSelector((state: any) => state.user.value);
  useEffect(() => {
    let value: any[] = [];
    chartData.data && (value = processData(chartData.data, t));
    value[0] && (setState({ series: value[0] }), setMonths(value[1]));
    //console.log("Months", value[1]);
    setMonths(value[1]);
  }, [chartData]);

  useEffect(() => {
    user.data?.settings &&
      setSettings(JSON.parse(user.data?.settings.settings));
  }, [user.data?.settings]);

  const { t } = useTranslation();
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

    annotations: {
      yaxis: [
        {
          y: settings.proteinConstantLimit, // Threshold value
          borderColor: "#000000",
          strokeDashArray: 4, // Optional: makes the line dashed
          opacity: 0.8, // Optional: sets line opacity
          label: {
            borderColor: "#000000",
            style: {
              color: "#000000",
              background: "#000000",
              fontWeight: "bold",
              fontSize: "13px",
            },
            text:
              t("protein") +
              " " +
              t("limit") +
              " (" +
              settings.proteinConstantLimit +
              ")",
            position: "right", // Positions label on the left side
            offsetX: 0,
          },
        },
        {
          y: settings.lactoseConstantLimit, // Threshold value
          borderColor: "#000000",
          strokeDashArray: 4, // Optional: makes the line dashed
          opacity: 0.8, // Optional: sets line opacity
          label: {
            borderColor: "#000000",
            style: {
              color: "#000000",
              background: "#000000",
              fontWeight: "bold",
              fontSize: "13px",
            },
            text:
              t("lactose") +
              " " +
              t("limit") +
              " (" +
              settings.lactoseConstantLimit +
              ")",
            position: "right", // Positions label on the left side
            offsetX: 0,
          },
        },
        {
          y: settings.waterConstantLimit, // Threshold value
          borderColor: "#000000",
          strokeDashArray: 4, // Optional: makes the line dashed
          opacity: 0.3, // Optional: sets line opacity
          label: {
            borderColor: "#000000",
            style: {
              color: "#000000",
              background: "#000000",
              fontWeight: "bold",
              fontSize: "13px",
            },
            text:
              t("water") +
              " " +
              t("limit") +
              " (" +
              settings.waterConstantLimit +
              ")",
            position: "right", // Positions label on the left side
            offsetX: 0,
          },
        },
      ],
    },
    xaxis: {
      categories: months,
      labels: {
        show: false, // Hides the X-axis labels
      },
    },
  };

  // const handleReset = () => {
  //   setState((prevState) => ({
  //     ...prevState,
  //   }));
  // };
  // handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex w-full">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
            </span>
            <div className="w-full">
              <p className=" text-cyan-900 dark:text-white font-thin">
                {t("protein_lactose_water")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          {chartData && chartData.data?.length > 0 ? (
            <ReactApexChart
              options={options}
              series={state.series}
              type="line"
              height={300}
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

export default ProteinLactoseWaterChart;
