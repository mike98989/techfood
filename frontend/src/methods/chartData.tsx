import { useState, useEffect } from "react";
import { httpRequest } from "./Requests";
import { useSelector } from "react-redux";

const chartData = ({
  proteinLactoseChart,
}: {
  proteinLactoseChart: boolean;
}) => {
  const [proteinLactoseData, setProteinLactoseData] = useState([]);
  const user = useSelector((state: any) => state.user.value);
  const { fetchApi } = httpRequest();
  const proteinLactoseWater = () => {
    fetchApi({
      url: "labinputs", // End Point
      method: "GET", // Method
      formData: null,
      contentType: "application/json", //Content Type
      authentication: user.token,
    }).then((response: any) => {
      setProteinLactoseData(response);
    });
  };

  useEffect(() => {
    proteinLactoseChart && proteinLactoseWater();
  }, []);

  return { proteinLactoseWater, proteinLactoseData };
};
export default chartData;
