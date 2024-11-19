import { useState, useEffect } from "react";
import { httpRequest } from "./Requests";
import { useSelector } from "react-redux";
import { ReusableMethods } from "../methods/ReusableMethods";

const chartData = ({
  proteinLactoseChart,
  fruitProductionChart,
  deviationComplaintsDataChart,
  drillSampleDataChart,
  headMidRiffDataChart,
}: {
  proteinLactoseChart: boolean;
  fruitProductionChart: boolean;
  deviationComplaintsDataChart: boolean;
  drillSampleDataChart: boolean;
  headMidRiffDataChart: boolean;
}) => {
  const [proteinLactoseData, setProteinLactoseData] = useState([]);
  const [fruitProductionData, setFruitProductionData] = useState([]);
  const [deviationComplaintsData, setDeviationComplaintsData] = useState([]);
  const [drillSamplesData, setDrillSamplesData] = useState([]);
  const [headMidRiffData, setHeadMidRiffData] = useState([]);
  const user = useSelector((state: any) => state.user.value);
  const { fetchApi } = httpRequest();
  const { allRequest } = ReusableMethods();
  const [returnDataArray, setReturnDataArray] = useState([]);

  const fetchData = async (endpoint: string) => {
    fetchApi({
      url: endpoint, // End Point
      method: "GET", // Method
      formData: null,
      contentType: "application/json", //Content Type
      authentication: user.token,
    }).then((response_value: any) => {
      const response = JSON.parse(response_value);
      fruitProductionChart &&
        setFruitProductionData(response.data.fruitproduction.original);
      proteinLactoseChart &&
        setProteinLactoseData(response.data.proteinlactosewater.original);
      deviationComplaintsDataChart &&
        setDeviationComplaintsData(response.data.deviationcomplaints.original);
      drillSampleDataChart &&
        setDrillSamplesData(response.data.drillsamples.original);
      headMidRiffDataChart &&
        setHeadMidRiffData(response.data.headmidriff.original);
    });
  };

  useEffect(() => {
    fetchData(
      "get_all_chart_data?deviationcomplaints=" +
        deviationComplaintsDataChart +
        "&fruitproduction=" +
        fruitProductionChart +
        "&proteinlactosewater=" +
        proteinLactoseChart +
        "&drillsamples=" +
        drillSampleDataChart +
        "&headmidriff=" +
        headMidRiffDataChart
    );
  }, []);

  return {
    proteinLactoseData,
    fruitProductionData,
    deviationComplaintsData,
    drillSamplesData,
    headMidRiffData,
  };
};
export default chartData;
