import { useState, useEffect } from "react";
import { httpRequest } from "./Requests";
import { useSelector } from "react-redux";

const chartData = ({
  proteinLactoseChart,
  fruitProductionChart,
}: {
  proteinLactoseChart: boolean;
  fruitProductionChart: boolean;
}) => {
  const [proteinLactoseData, setProteinLactoseData] = useState([]);
  const [fruitProductionData, setFruitProductionData] = useState([]);

  const user = useSelector((state: any) => state.user.value);
  const { fetchApi } = httpRequest();

  ////////// Get Protein Lactose Water Data
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
  ////////// Fetch Fruit Production Data
  const fruitProduction = () => {
    fetchApi({
      url: "fruitproduction", // End Point
      method: "GET", // Method
      formData: null,
      contentType: "application/json", //Content Type
      authentication: user.token,
    }).then((response: any) => {
      console.log(response);
      setFruitProductionData(response);
    });
  };

  useEffect(() => {
    proteinLactoseChart && proteinLactoseWater();
    fruitProductionChart && fruitProduction();
  }, []);

  return { proteinLactoseData, fruitProductionData };
};
export default chartData;
