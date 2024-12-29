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
  ccpFollowUpDataChart,
  staffingProductionDataChart,
  oeeFollowUpDataChart,
  hygieneRoundsDataChart,
  productivityDataChart,
}: {
  proteinLactoseChart: boolean;
  fruitProductionChart: boolean;
  deviationComplaintsDataChart: boolean;
  drillSampleDataChart: boolean;
  headMidRiffDataChart: boolean;
  ccpFollowUpDataChart: boolean;
  staffingProductionDataChart: boolean;
  oeeFollowUpDataChart: boolean;
  hygieneRoundsDataChart: boolean;
  productivityDataChart: boolean;
}) => {
  const [proteinLactoseData, setProteinLactoseData] = useState([]);
  const [fruitProductionData, setFruitProductionData] = useState([]);
  const [deviationComplaintsData, setDeviationComplaintsData] = useState([]);
  const [drillSamplesData, setDrillSamplesData] = useState([]);
  const [ccpFollowUpData, setCCPFollowUpData] = useState([]);
  const [headMidRiffData, setHeadMidRiffData] = useState([]);
  const [staffingProductionData, setStaffingOfProductionData] = useState([]);
  const [oeeFollowUpData, setOEEFollowUpData] = useState([]);
  const [hygieneRoundsData, setHygieneRoundsData] = useState([]);
  const [productivityFollowUpData, setProductivityFollowUpData] = useState([]);
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
      console.log("response", response);
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
      ccpFollowUpDataChart &&
        setCCPFollowUpData(response.data.ccpfollowups.original);
      staffingProductionDataChart &&
        setStaffingOfProductionData(response.data.staffingproduction.original);
      oeeFollowUpDataChart &&
        setOEEFollowUpData(response.data.oeefollowups.original);
      hygieneRoundsDataChart &&
        setHygieneRoundsData(response.data.hygienerounds.original);
      productivityDataChart &&
        setProductivityFollowUpData(
          response.data.productivityfollowups.original
        );
    });
  };

  useEffect(() => {
    fetchData(
      "get_all_chart_data?paginate=all&deviationcomplaints=" +
        deviationComplaintsDataChart +
        "&fruitproduction=" +
        fruitProductionChart +
        "&proteinlactosewater=" +
        proteinLactoseChart +
        "&drillsamples=" +
        drillSampleDataChart +
        "&headmidriff=" +
        headMidRiffDataChart +
        "&ccpfollowups=" +
        ccpFollowUpDataChart +
        "&staffingproduction=" +
        staffingProductionDataChart +
        "&oeefollowups=" +
        oeeFollowUpDataChart +
        "&hygienerounds=" +
        hygieneRoundsDataChart +
        "&productivityfollowups=" +
        productivityDataChart
    );
  }, []);

  return {
    proteinLactoseData,
    fruitProductionData,
    deviationComplaintsData,
    drillSamplesData,
    headMidRiffData,
    ccpFollowUpData,
    staffingProductionData,
    oeeFollowUpData,
    hygieneRoundsData,
    productivityFollowUpData,
  };
};
export default chartData;
