import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import chartData from "../../../methods/chartData";
import { ReusableMethods } from "../../../methods/ReusableMethods";
// import SpinnerObject from "../../../components/Spinner/Spinner";
import { constant } from "../../../Utils/Constants";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Badge from "../../Badges/Badge";

interface ChartOneState {
  series: {
    name: string;
    data: number[];
  }[];
}
interface ChartProps {
  chartData: any; // Make sure this matches the type of data you're passing
}

// const processData = (dataArray: any[], t: any) => {
//   if (dataArray) {
//     //////Sort the Data first
//     const data = dataArray.sort(
//       (a: any, b: any) =>
//         new Date(a.slaughter_date).getTime() -
//         new Date(b.slaughter_date).getTime()
//     );
//     let aerobicValue: any[] = [];
//     let enterobactaValue: any[] = [];
//     let months: any[] = [];
//     for (let i = 0; i < data.length; i++) {
//       !months.includes(data[i].slaughter_date) &&
//         (months = [...months, data[i].slaughter_date]);

//       data[i].aerobic != null &&
//         (aerobicValue = [...aerobicValue, data[i].aerobic]);
//       data[i].enterobacta != null &&
//         (enterobactaValue = [...enterobactaValue, data[i].enterobacta]);
//     }

//     let processedAerobicData = [{ name: t("aerobic"), data: aerobicValue }];
//     let processedEnterobactaData = [
//       { name: t("enterobacta"), data: enterobactaValue },
//     ];

//     return [processedAerobicData, processedEnterobactaData, months];
//   }
// };

const computeChart = (inputdata: any, t: any, parameter: String) => {
  if (inputdata) {
    const data = inputdata.sort(
      (a: any, b: any) =>
        new Date(a.slaughter_date).getTime() -
        new Date(b.slaughter_date).getTime()
    );
    const resultMap = new Map();
    const months: any = [];
    const goodAerobicValues: any = [];
    const badAerobicValues: any = [];
    const goodEnterobactaValues: any = [];
    const badEnterobactaValues: any = [];

    //const currentYear = new Date().getFullYear(); // Get the current year
    for (let i = 0; i < data.length; i++) {
      //// Check the date
      const dateToCheck = new Date(data[i].slaughter_date);
      /////// If the date is this year
      //if (dateToCheck.getFullYear() === currentYear) {
      //const month = dateToCheck.getMonth() + 1; //// Get the month
      const month =
        dateToCheck.toLocaleString("default", { month: "short" }) +
        " " +
        dateToCheck.getFullYear().toString().slice(-2);
      if (!resultMap.has(month)) {
        resultMap.set(month, {
          goodAerobic: 0,
          badAerobic: 0,
          goodEnterobacta: 0,
          badEnterobacta: 0,
        });
      }
      const dateEntry = resultMap.get(month);

      /////////If the parameter is Aerobic
      if (parameter == "aerobic") {
        /////// If the aerobic value is less than the constant increament good by 1 else increament bad by 1
        if (data[i].aerobic < constant.aerobicConstantLimit) {
          dateEntry.goodAerobic += 1;
        } else if (data[i].aerobic > constant.aerobicConstantLimit) {
          dateEntry.badAerobic += 1;
        }
      }
      /////////If the parameter is Aerobic
      if (parameter == "enterobacta") {
        /////// If the Enterobacter value is less than the constant increament good by 1 else increament bad by 1
        if (data[i].enterobacta < constant.enterobactaConstantLimit) {
          dateEntry.goodEnterobacta += 1;
        } else if (data[i].enterobacta > constant.enterobactaConstantLimit) {
          dateEntry.badEnterobacta += 1;
        }
      }
    }
    // Convert the Map to an array of objects
    const resultArray = Array.from(
      resultMap,
      ([
        month,
        { goodAerobic, badAerobic, goodEnterobacta, badEnterobacta },
      ]) => ({
        month,
        goodAerobic,
        badAerobic,
        goodEnterobacta,
        badEnterobacta,
      })
    );

    // Using forEach to loop through the Map
    resultArray.forEach((value) => {
      months.push(value.month);
      goodAerobicValues.push(value.goodAerobic);
      badAerobicValues.push(value.badAerobic);
      goodEnterobactaValues.push(value.goodEnterobacta);
      badEnterobactaValues.push(value.badEnterobacta);
    });

    // Set processed value for chat
    //let processedProteinData: any[] = [];
    let processedAerobicData = [
      { name: t(constant.approvedText), data: goodAerobicValues },
      { name: t(constant.unApprovedText), data: badAerobicValues },
    ];

    let processedEnterobactaData = [
      { name: t(constant.approvedText), data: goodEnterobactaValues },
      { name: t(constant.unApprovedText), data: badEnterobactaValues },
    ];

    //console.log("LactoseSeries", processedLactoseData);
    return [processedAerobicData, processedEnterobactaData, months];
  }
};
const DrillSamplesChart1: React.FC<ChartProps> = (props: any) => {
  const [chartData, setChartData] = useState([]);
  const [filteredChartData, setFilteredChartData] = useState([]);
  const [startDate, setStartData] = useState("");
  const [endDate, setEndData] = useState("");
  // const { setIsLoading, Spinner } = SpinnerObject();
  const [chartType, setChartType] = useState("bar");
  const [chartStacked, setChartStacked] = useState(false);
  const [firstDate, setFirstDate] = useState(false);
  const [lastDate, setLastDate] = useState(false);
  const [queryParams, setQuetyParams] = useState({});
  const user = useSelector((state: any) => state.user.value);
  const [returnDataArray, setReturnDataArray] = useState([]);
  //const [parameterValue, setParameterValue] = useState("");
  const { t } = useTranslation();
  const [months, setMonths] = useState([]);
  const [monthsChart2, setMonthsChart2] = useState([]);
  const [parameter, setParameter] = useState("aerobic");
  const [series, setSeries] = useState<ChartOneState>({
    series: [],
  });

  useEffect(() => {
    setChartData(props.chartData.data);
    setFilteredChartData(props.chartData.data);

    if (chartData) {
      const [firstDate, lastDate] = [...chartData].sort(
        (a, b) => new Date(a.slaughter_date) - new Date(b.slaughter_date)
      );
      firstDate && setFirstDate(firstDate.slaughter_date);
      lastDate && setLastDate(lastDate.slaughter_date);
    }
    //setIsLoading(false);
  }, [props]);

  useEffect(() => {
    if (filteredChartData) {
      let aerobicEnterobactaLimitMatch: any = [];

      chartData &&
        (aerobicEnterobactaLimitMatch = computeChart(
          filteredChartData,
          t,
          parameter
        ));

      setMonths(aerobicEnterobactaLimitMatch[2]);
      ///////Set Final Series
      parameter === "aerobic"
        ? setSeries({ series: aerobicEnterobactaLimitMatch[0] })
        : setSeries({ series: aerobicEnterobactaLimitMatch[1] });
    }
  }, [filteredChartData, chartType, parameter]);

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

  return (
    <div className="w-full rounded-sm border border-stroke bg-white px-3 pt-3.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-3.5 xl:col-span-12">
      {/* Satisfactory and not satisfactory chart */}
      <div className="md:flex md:flex-row w-full">
        <div className="md:w-full ">
          <div className="flex w-full">
            <div className="mb-3 w-full flex flex-row mt-2">
              <span className="mt-1 mr-2 ml-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-cyan-700"></span>
              </span>
              <div className="w-full flex flex-row">
                <p className="w-full text-cyan-900 dark:text-white font-thin">
                  {t("drill_samples_in_slaughter")} - {t(parameter)}
                </p>
                <select
                  className="w-1/2 ml-3 -mt-1 rounded border-[1.5px] border-stroke bg-transparent py-1 px-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary text-sm"
                  name="select_parameter"
                  onChange={(e) => setParameter(e.target.value)}
                >
                  <option value="aerobic">{t("aerobic")}</option>
                  <option value="enterobacta">{t("enterobacta")}</option>
                </select>
              </div>
            </div>
          </div>
          {props.chartData && props.chartData?.data?.length > 0 ? (
            <ReactApexChart
              key={"1"}
              options={options}
              series={series.series}
              type={chartType}
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

export default DrillSamplesChart1;
