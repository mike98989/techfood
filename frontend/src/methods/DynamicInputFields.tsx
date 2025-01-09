import { useState } from "react";
import { httpRequest } from "./Requests";
import { constant } from "../Utils/Constants";
import DrillSamples from "../pages/DrillSamples";

const { fetchApi } = httpRequest();

interface Batch {
  batchNumber: string;
  proteinValue: string;
  lactoseValue: string;
  waterValue: string;
  derivedDate: string;
  // Index signature to allow dynamic access by string
  [key: string]: string;
}
interface PONumber {
  poNumber: string;
  batches: Batch[];
}
interface compute {
  countValid: number;
  countInValid: number;
  countProteinValid: number;
  countProteinInvalid: number;
  countLactoseValid: number;
  countLactoseInvalid: number;
  countWaterValid: number;
  countWaterInvalid: number;
  totalProteinCount: number;
  totalLactoseCount: number;
  totalWaterCount: number;
  totalCount: number;
}
/// Dynamic input field for protein, lactose and water content
export const DynamicInputFields = () => {
  //const [poNumbers, setPoNumbers] = useState([]);
  const [poNumbers, setPoNumbers] = useState<PONumber[]>([]);
  const [computeValues, setComputValues] = useState<compute>({
    countValid: 0,
    countInValid: 0,
    countProteinValid: 0,
    countProteinInvalid: 0,
    countLactoseValid: 0,
    countLactoseInvalid: 0,
    countWaterValid: 0,
    countWaterInvalid: 0,
    totalProteinCount: 0,
    totalLactoseCount: 0,
    totalWaterCount: 0,
    totalCount: 0,
  });
  const [proteinChartValues, setProteinChartValues] = useState({});

  const handleAddPoNumber = () => {
    setPoNumbers((prev) => [
      ...prev,
      {
        poNumber: "",
        batches: [
          {
            batchNumber: "",
            proteinValue: "",
            lactoseValue: "",
            waterValue: "",
            derivedDate: "",
          },
        ],
      },
    ]);
  };

  const handleAddBatch = (poIndex: number) => {
    setPoNumbers((prev) => {
      const updatedPoNumbers = [...prev];

      updatedPoNumbers[poIndex] = {
        ...updatedPoNumbers[poIndex], // Ensure you're not mutating the original state
        batches: [
          ...updatedPoNumbers[poIndex].batches, // Copy existing batches
          {
            batchNumber: "",
            proteinValue: "",
            lactoseValue: "",
            waterValue: "",
            derivedDate: "",
          }, // Add new batch
        ],
      };
      return updatedPoNumbers;
    });
  };

  const handleRemoveBatch = ({
    poIndex,
    batchIndex,
    batchCount,
  }: {
    poIndex: number;
    batchIndex: number;
    batchCount: number;
  }) => {
    setPoNumbers((prev) => {
      const updatedPoNumbers = [...prev];
      ///////Check if it is the last batch else delete both the po index
      if (batchCount != 1) {
        updatedPoNumbers[poIndex].batches.splice(batchIndex, 1);
      } else {
        updatedPoNumbers.splice(poIndex, 1);
      }
      return updatedPoNumbers;
    });

    // setFruitProduction((prev) => {
    //   const updatedValues = [...prev];
    //   updatedValues.splice(index, 1);
    //   return updatedValues;
    // });
  };

  const handleInputChange = ({
    poIndex,
    batchIndex,
    field,
    value,
  }: {
    poIndex: number;
    batchIndex?: number | null;
    field: string;
    value: string;
  }) => {
    setPoNumbers((prev) => {
      const updatedPoNumbers = [...prev];
      if (batchIndex != null) {
        if (field === "batchNumber") {
          updatedPoNumbers[poIndex].batches[batchIndex]["derivedDate"] =
            getDateFromBatchInput(value);
        }
        updatedPoNumbers[poIndex].batches[batchIndex][field] = value;
      } else {
        updatedPoNumbers[poIndex][field] = value; // Update PO Number field
      }
      return updatedPoNumbers;
    });
  };

  // const handleProteinCompute = (constant: any) => {
  //   const resultCount = { countValid: 0, countInValid: 0, totalCount: 0 };
  //   const inputedValues = poNumbers;
  //   inputedValues.map((po, poIndex) => {
  //     po.batches.map((batch, index) => {
  //       if (batch.proteinValue != "0") {
  //         resultCount.totalCount++;
  //         if (batch.proteinValue > constant.constants) {
  //           resultCount.countValid++;
  //         } else {
  //           resultCount.countInValid++;
  //         }
  //       }
  //     });
  //   });
  //   setComputValues(resultCount);
  // };

  const handleCompute = () => {
    const resultCount = {
      countValid: 0,
      countInValid: 0,
      countProteinValid: 0,
      countProteinInvalid: 0,
      countLactoseValid: 0,
      countLactoseInvalid: 0,
      countWaterValid: 0,
      countWaterInvalid: 0,
      totalProteinCount: 0,
      totalLactoseCount: 0,
      totalWaterCount: 0,
      totalCount: 0,
    };
    const inputedValues = poNumbers;
    inputedValues.map((po, poIndex) => {
      po.batches.map((batch, index) => {
        //// Protein
        if (batch.proteinValue != "") {
          resultCount.totalCount++;
          resultCount.totalProteinCount++;
          if (parseFloat(batch.proteinValue) > constant.proteinConstantLimit) {
            resultCount.countValid++;
            resultCount.countProteinValid++;
          } else {
            resultCount.countInValid++;
            resultCount.countProteinInvalid++;
          }
        }
        //// Lactose
        if (batch.lactoseValue != "") {
          resultCount.totalCount++;
          resultCount.totalLactoseCount++;
          if (parseFloat(batch.lactoseValue) > constant.lactoseConstantLimit) {
            resultCount.countValid++;
            resultCount.countLactoseValid++;
          } else {
            resultCount.countInValid++;
            resultCount.countLactoseInvalid++;
          }
        }
        //// Water
        if (batch.waterValue != "") {
          resultCount.totalCount++;
          resultCount.totalWaterCount++;
          if (parseFloat(batch.waterValue) > constant.waterConstantLimit) {
            resultCount.countValid++;
            resultCount.countWaterValid++;
          } else {
            resultCount.countInValid++;
            resultCount.countWaterInvalid++;
          }
        }
      });
    });
    setComputValues(resultCount);
  };

  const getDateFromBatchInput = (batchNumber: any) => {
    let split = batchNumber.slice(0, 6);
    let formatedDateString = "20" + split.replace(/(\d{2})(?=\d)/g, "$1-");
    const [year, month, day] = formatedDateString.split("-").map(Number);
    const dateValue = new Date(year, month - 1, day); // Months are 0-based in JS (Jan = 0)
    let checkDate = false;
    if (
      dateValue.getFullYear() === year &&
      dateValue.getMonth() === month - 1 &&
      dateValue.getDate() === day
    ) {
      checkDate = true;
    }

    let formatted =
      !isNaN(split * 1) && batchNumber.length > 5 && checkDate // Check if the value is a number and that the length of the value is above 5 and also if the value is a valid date value
        ? formatedDateString
        : "Invalid Input";
    return formatted;
  };

  const computeProteinChart = () => {
    const resultMap = new Map();
    // Iterate through the parent array `data` and its nested `batches`
    poNumbers.forEach(({ batches }) => {
      batches.forEach(({ proteinValue, derivedDate }) => {
        if (!resultMap.has(derivedDate)) {
          resultMap.set(derivedDate, { good: 0, bad: 0 });
        }
        const dateEntry = resultMap.get(derivedDate);

        if (proteinValue > constant.proteinConstantLimit) {
          dateEntry.good += 1;
        } else {
          dateEntry.bad += 1;
        }
      });
    });

    // Convert the Map to an array of objects
    const resultArray = Array.from(
      resultMap,
      ([derivedDate, { good, bad }]) => ({
        derivedDate,
        good,
        bad,
      })
    );
    setProteinChartValues({ resultArray });
    //console.log(resultArray);
  };

  return {
    poNumbers,
    computeValues,
    proteinChartValues,
    handleAddPoNumber,
    handleAddBatch,
    handleRemoveBatch,
    handleInputChange,
    handleCompute,
    computeProteinChart,
  };
};

///////Dynamic input field for fruit production
export const DynamicInputFieldsCCPFollowUp = () => {
  //const [poNumbers, setPoNumbers] = useState([]);
  ////Set the first values to be an object with empty values
  const [CCPSummation, setCCPSummation] = useState<any[]>([
    {
      total: "",
      ren: "",
      percent: "",
      slaughtered_total: "",
      slaughtered: "",
    },
  ]);

  const handleCCPSummation = (CCPFollowUp: any) => {
    const total: number =
      CCPFollowUp.ham * 1 +
      CCPFollowUp.front_leg * 1 +
      CCPFollowUp.sternum * 1 +
      CCPFollowUp.belly_cut * 1 +
      CCPFollowUp.back * 1 +
      CCPFollowUp.neck * 1 +
      CCPFollowUp.flank * 1 +
      CCPFollowUp.ribs * 1 +
      CCPFollowUp.inside * 1 +
      CCPFollowUp.hind_leg * 1;
    CCPFollowUp.total = total;
    CCPFollowUp.clean =
      CCPFollowUp.slaughtered_total != "0"
        ? CCPFollowUp.slaughtered_total - total
        : total;
    CCPFollowUp.percent = Math.ceil(
      (CCPFollowUp.total / CCPFollowUp.slaughtered_total) * 100
    );

    return CCPFollowUp;
  };

  return {
    CCPSummation,
    handleCCPSummation,
  };
};

///////Dynamic input field for fruit production
export const DynamicInputFieldsFruitProduction = () => {
  //const [poNumbers, setPoNumbers] = useState([]);
  ////Set the first values to be an object with empty values
  const [fruitProduction, setFruitProduction] = useState<any[]>([
    {
      date: "",
      month: "",
      section_id: "",
      status: "",
      cause_id: "",
      deviation_type_id: "",
    },
  ]);

  const handleAddFruitProduction = () => {
    setFruitProduction((prev) => [
      ...prev,
      {
        date: "",
        month: "",
        section_id: "",
        status: "",
        cause_id: "",
        deviation_type_id: "",
      },
    ]);
  };

  const handleInputChange = ({
    index,
    field,
    value,
  }: {
    index: number;
    field: any;
    value: string;
  }) => {
    setFruitProduction((prev) => {
      const updatedValues = [...prev];
      updatedValues[index][field] = value; // Update PO Number field

      return updatedValues;
    });
  };

  const handleRemoveRow = ({ index }: { index: number }) => {
    setFruitProduction((prev) => {
      const updatedValues = [...prev];
      updatedValues.splice(index, 1);
      return updatedValues;
    });
  };

  return {
    fruitProduction,
    handleAddFruitProduction,
    handleInputChange,
    handleRemoveRow,
  };
};

export const DynamicInputFieldsDrillSamples = () => {
  const initialState = {
    week: "",
    slaughter_number: "",
    slaughter_house: "",
    product_id: "",
    slaughter_date: "",
    pieces_date: "",
    animal_id: "",
    aerobic: "",
    enterobacta: "",
    e_coli: "",
  };

  const [drillSamples, setDrillSamples] = useState<any[]>([]);
  const initialComputeValues = {
    countValid: 0,
    countInValid: 0,
    countAerobicValid: 0,
    countAerobicInvalid: 0,
    countEnterobactaValid: 0,
    countEnterobactaInvalid: 0,
    totalAerobicCount: 0,
    totalEnterobactaCount: 0,
    totalCount: 0,
  };
  const [computeValues, setComputValues] = useState<any>(initialComputeValues);

  const handleAddDrillsSample = () => {
    setDrillSamples((prev) => [...prev, initialState]);
  };

  const handleInputChange = ({
    index,
    field,
    value,
  }: {
    index: number;
    field: any;
    value: String;
  }) => {
    setDrillSamples((prev) => {
      const updatedValues = [...prev];
      updatedValues[index][field] = value; // Update PO Number field

      return updatedValues;
    });
  };

  const handleRemoveRow = ({ index }: { index: number }) => {
    alert(index);
    setDrillSamples((prev) => {
      const updatedValues = [...prev];
      updatedValues.splice(index, 1);
      return updatedValues;
    });
  };

  const clearStateData = () => {
    setDrillSamples([initialState]);
  };

  const handleCompute = () => {
    const inputedValues = drillSamples;
    //const initValues = initialComputeValues;
    const resultCount = {
      countValid: 0,
      countInValid: 0,
      countAerobicValid: 0,
      countAerobicInvalid: 0,
      countEnterobactaValid: 0,
      countEnterobactaInvalid: 0,
      totalAerobicCount: 0,
      totalEnterobactaCount: 0,
      totalCount: 0,
    };
    inputedValues.map((drill, index) => {
      //// Aerobic
      if (drill.aerobic != "") {
        resultCount.totalCount++;
        resultCount.totalAerobicCount++;
        if (parseFloat(drill.aerobic) < constant.aerobicConstantLimit) {
          resultCount.countValid++;
          resultCount.countAerobicValid++;
        } else {
          resultCount.countInValid++;
          resultCount.countAerobicInvalid++;
        }
      }
      //// Enterobacta
      if (drill.enterobacta != "") {
        resultCount.totalCount++;
        resultCount.totalEnterobactaCount++;
        if (parseFloat(drill.enterobacta) < constant.enterobactaConstantLimit) {
          resultCount.countValid++;
          resultCount.countEnterobactaValid++;
        } else {
          resultCount.countInValid++;
          resultCount.countEnterobactaInvalid++;
        }
      }
    });
    setComputValues(resultCount);
  };

  return {
    drillSamples,
    computeValues,
    handleAddDrillsSample,
    handleInputChange,
    handleRemoveRow,
    clearStateData,
    handleCompute,
  };
};

export const DynamicInputFieldsHeadMidRiff = () => {
  const initialState = {
    week: "",
    slaughter_number: "",
    slaughter_house: "",
    product_id: "",
    slaughter_date: "",
    pieces_date: "",
    animal_id: "",
    aerobic: "",
    e_coli: "",
    staphylococcus: "",
  };

  const [headMidRiffs, setheadMidRiffs] = useState<any[]>([]);
  const initialComputeValues = {
    countValid: 0,
    countInValid: 0,
    countAerobicValid: 0,
    countAerobicInvalid: 0,
    countEcoliValid: 0,
    countEcoliInvalid: 0,
    countStaphylococcusValid: 0,
    countStaphylococcusInvalid: 0,
    totalAerobicCount: 0,
    totalEcoliCount: 0,
    totalStaphylococcusCount: 0,
    totalCount: 0,
  };
  const [computeValues, setComputValues] = useState<any>(initialComputeValues);

  const handleAddDrillsSample = () => {
    setheadMidRiffs((prev) => [...prev, initialState]);
  };

  const handleInputChange = ({
    index,
    field,
    value,
  }: {
    index: number;
    field: any;
    value: String;
  }) => {
    setheadMidRiffs((prev) => {
      const updatedValues = [...prev];
      updatedValues[index][field] = value; // Update PO Number field

      return updatedValues;
    });
  };

  const handleRemoveRow = ({ index }: { index: number }) => {
    alert(index);
    setheadMidRiffs((prev) => {
      const updatedValues = [...prev];
      updatedValues.splice(index, 1);
      return updatedValues;
    });
  };

  const clearStateData = () => {
    setheadMidRiffs([initialState]);
  };

  const handleCompute = () => {
    const inputedValues = headMidRiffs;
    //const initValues = initialComputeValues;
    const resultCount = {
      countValid: 0,
      countInValid: 0,
      countAerobicValid: 0,
      countAerobicInvalid: 0,
      countEcoliValid: 0,
      countEcoliInvalid: 0,
      countStaphylococcusValid: 0,
      countStaphylococcusInvalid: 0,
      totalAerobicCount: 0,
      totalEcoliCount: 0,
      totalStaphylococcusCount: 0,
      totalCount: 0,
    };
    inputedValues.map((headmidriff, index) => {
      //// Aerobic
      if (headmidriff.aerobic != "") {
        resultCount.totalCount++;
        resultCount.totalAerobicCount++;
        if (parseFloat(headmidriff.aerobic) < constant.aerobicConstantLimit) {
          resultCount.countValid++;
          resultCount.countAerobicValid++;
        } else {
          resultCount.countInValid++;
          resultCount.countAerobicInvalid++;
        }
      }
      //// E coli
      if (headmidriff.e_coli != "") {
        resultCount.totalCount++;
        resultCount.totalEcoliCount++;
        if (parseFloat(headmidriff.e_coli) < constant.ecoliConstantLimit) {
          resultCount.countValid++;
          resultCount.countEcoliValid++;
        } else {
          resultCount.countInValid++;
          resultCount.countEcoliInvalid++;
        }
      }

      //// Staphylococcus
      if (headmidriff.staphylococcus != "") {
        resultCount.totalCount++;
        resultCount.totalStaphylococcusCount++;
        if (
          parseFloat(headmidriff.staphylococcus) <
          constant.staphylococcusConstantLimit
        ) {
          resultCount.countValid++;
          resultCount.countStaphylococcusValid++;
        } else {
          resultCount.countInValid++;
          resultCount.countStaphylococcusInvalid++;
        }
      }
    });
    setComputValues(resultCount);
  };

  return {
    headMidRiffs,
    computeValues,
    handleAddDrillsSample,
    handleInputChange,
    handleRemoveRow,
    clearStateData,
    handleCompute,
  };
};

///////Dynamic input field for map detected bacteria
export const DynamicInputFieldsMapDetectedBacteria = () => {
  const [detectedBacteria, setDetectedBacteria] = useState<any[]>([
    {
      date: "",
      data: [],
      coordinateId: "",
    },
  ]);

  const handleInputChange = ({
    bacteriaIndex,
    dataIndex,
    field,
    value,
  }: {
    bacteriaIndex: number;
    dataIndex?: number | null;
    field: string;
    value: string;
  }) => {
    setDetectedBacteria((prev) => {
      const updatedData = [...prev];
      if (dataIndex != null) {
        updatedData[bacteriaIndex].data[dataIndex][field] = value;
      } else {
        updatedData[bacteriaIndex][field] = value; // Update PO Number field
      }

      return updatedData;
    });
  };

  const handleChartCoordinatesOptionChange = (id, coordinates) => {
    const filtered = coordinates.filter(
      (value: object, i: any) => value.id == id
    );
    return filtered;
  };

  const handleUpdateDetectedBacteriaRow = (coordinates: any) => {
    setDetectedBacteria((prev) => {
      const updatedBacteriaData = [...prev];
      updatedBacteriaData[0] = {
        ...updatedBacteriaData[0], // Ensure you're not mutating the original state
        data: coordinates.map((value, i) => ({
          ecoli: value.ecoli,
        })),
      };
      return updatedBacteriaData;
    });
  };

  return {
    detectedBacteria,
    handleUpdateDetectedBacteriaRow,
    handleInputChange,
    handleChartCoordinatesOptionChange,
  };
};

///////Dynamic input field for productivity followup
export const DynamicInputFieldsProductivityFollowUp = () => {
  const year = new Date();
  const [productivityFollowUp, setProductivityFollowUp] = useState<any[]>([
    {
      week: 0,
      year: year.getFullYear(),
      day: "monday",
      pork: 0,
      lamb: 0,
      beef: 0,
      available_production_hours: 0,
      output_per_day: 0,
      total_target_per_day: 0,
      accumulated: 0,
      weekly_target: 0,
      average_rate: constant.productivityAverageRate,
      output_per_day_per_time: 0,
      ack_target_qty: 0,
      ack_output_qty: 0,
      ack_target_time: 0,
      ack_output_time: 0,
      output_percent: 0,
      deviation_from_contract_qty: 0,
      deviation_from_contract_time: 0,
    },
    {
      week: 0,
      year: year.getFullYear(),
      day: "tuesday",
      pork: 0,
      lamb: 0,
      beef: 0,
      available_production_hours: 0,
      output_per_day: 0,
      total_target_per_day: 0,
      accumulated: 0,
      weekly_target: 0,
      average_rate: constant.productivityAverageRate,
      output_per_day_per_time: 0,
      ack_target_qty: 0,
      ack_output_qty: 0,
      ack_target_time: 0,
      ack_output_time: 0,
      output_percent: 0,
      deviation_from_contract_qty: 0,
      deviation_from_contract_time: 0,
    },
    {
      week: 0,
      year: year.getFullYear(),
      day: "wednesday",
      pork: 0,
      lamb: 0,
      beef: 0,
      available_production_hours: 0,
      output_per_day: 0,
      total_target_per_day: 0,
      accumulated: 0,
      weekly_target: 0,
      average_rate: constant.productivityAverageRate,
      output_per_day_per_time: 0,
      ack_target_qty: 0,
      ack_output_qty: 0,
      ack_target_time: 0,
      ack_output_time: 0,
      output_percent: 0,
      deviation_from_contract_qty: 0,
      deviation_from_contract_time: 0,
    },
    {
      week: 0,
      year: year.getFullYear(),
      day: "thursday",
      pork: 0,
      lamb: 0,
      beef: 0,
      available_production_hours: 0,
      output_per_day: 0,
      total_target_per_day: 0,
      accumulated: 0,
      weekly_target: 0,
      average_rate: constant.productivityAverageRate,
      output_per_day_per_time: 0,
      ack_target_qty: 0,
      ack_output_qty: 0,
      ack_target_time: 0,
      ack_output_time: 0,
      output_percent: 0,
      deviation_from_contract_qty: 0,
      deviation_from_contract_time: 0,
    },
    {
      week: 0,
      year: year.getFullYear(),
      day: "friday",
      pork: 0,
      lamb: 0,
      beef: 0,
      available_production_hours: 0,
      output_per_day: 0,
      total_target_per_day: 0,
      accumulated: 0,
      weekly_target: 0,
      average_rate: constant.productivityAverageRate,
      output_per_day_per_time: 0,
      ack_target_qty: 0,
      ack_output_qty: 0,
      ack_target_time: 0,
      ack_output_time: 0,
      output_percent: 0,
      deviation_from_contract_qty: 0,
      deviation_from_contract_time: 0,
    },
    {
      week: 0,
      year: year.getFullYear(),
      day: "saturday",
      pork: 0,
      lamb: 0,
      beef: 0,
      available_production_hours: 0,
      output_per_day: 0,
      total_target_per_day: 0,
      accumulated: 0,
      weekly_target: 0,
      average_rate: constant.productivityAverageRate,
      output_per_day_per_time: 0,
      ack_target_qty: 0,
      ack_output_qty: 0,
      ack_target_time: 0,
      ack_output_time: 0,
      output_percent: 0,
      deviation_from_contract_qty: 0,
      deviation_from_contract_time: 0,
    },
    {
      week: 0,
      year: year.getFullYear(),
      day: "sunday",
      pork: 0,
      lamb: 0,
      beef: 0,
      available_production_hours: 0,
      output_per_day: 0,
      total_target_per_day: 0,
      accumulated: 0,
      weekly_target: 0,
      average_rate: constant.productivityAverageRate,
      output_per_day_per_time: 0,
      ack_target_qty: 0,
      ack_output_qty: 0,
      ack_target_time: 0,
      ack_output_time: 0,
      output_percent: 0,
      deviation_from_contract_qty: 0,
      deviation_from_contract_time: 0,
    },
  ]);

  const handleInputChange = ({
    inputIndex,
    field,
    value,
  }: {
    inputIndex: number;
    field: string;
    value: string;
  }) => {
    setProductivityFollowUp((prev) => {
      const updatedProductivity = [...prev];
      updatedProductivity[inputIndex][field] = value;

      ////// Set Week
      if (
        field == "week" ||
        field == "year" ||
        field == "weekly_rate" ||
        field == "average_rate" ||
        field == "accumulated"
      ) {
        updatedProductivity.forEach((item) => {
          item[field] = parseInt(value);
          item["weekly_target"] =
            field == "accumulated" && updatedProductivity[0].weekly_target;
        });
      } else {
        updatedProductivity[inputIndex][field] = value;
      }

      /////// Updated Available Production Hours
      updatedProductivity[inputIndex]["available_production_hours"] =
        productivityFollowUp[inputIndex].total_available_hours * 1 >=
          productivityFollowUp[inputIndex].maintenance_hours * 1 &&
        productivityFollowUp[inputIndex].total_available_hours * 1 -
          productivityFollowUp[inputIndex].maintenance_hours * 1;

      /////// Update Total target per day;
      updatedProductivity[inputIndex]["total_target_per_day"] = Math.round(
        updatedProductivity[inputIndex]["available_production_hours"] *
          updatedProductivity[inputIndex]["average_rate"]
      );

      /////// Update Output per day;
      updatedProductivity[inputIndex]["output_per_day"] =
        productivityFollowUp[inputIndex].lamb * 1 +
        productivityFollowUp[inputIndex].beef * 1 +
        productivityFollowUp[inputIndex].pork * 1;

      // /////// Update weekly target;
      updatedProductivity[0]["weekly_target"] =
        updatedProductivity[0]["accumulated"] * 1 +
        updatedProductivity.reduce(
          (acc, cur) =>
            acc +
            Number(cur.total_target_per_day ? cur.total_target_per_day : 0),
          0
        );
      ////////Set all other values for weekly target to be same as the first day
      updatedProductivity.forEach((item) => {
        item["weekly_target"] = updatedProductivity[0].weekly_target;
      });

      // updatedProductivity[inputIndex]["weekly_target"] = updatedProductivity[0][
      //   "total_target_per_day"
      // ]
      //   ? updatedProductivity[0]["accumulated"] * 1 +
      //     updatedProductivity[0]["total_target_per_day"] * 1
      //   : 0 + updatedProductivity[1]["total_target_per_day"]
      //     ? updatedProductivity[1]["total_target_per_day"]
      //     : 0 + updatedProductivity[2]["total_target_per_day"]
      //       ? updatedProductivity[2]["total_target_per_day"]
      //       : 0 + updatedProductivity[3]["total_target_per_day"]
      //         ? updatedProductivity[3]["total_target_per_day"]
      //         : 0 + updatedProductivity[4]["total_target_per_day"]
      //           ? updatedProductivity[4]["total_target_per_day"]
      //           : 0 + updatedProductivity[5]["total_target_per_day"]
      //             ? updatedProductivity[5]["total_target_per_day"]
      //             : 0 + updatedProductivity[6]["total_target_per_day"]
      //               ? updatedProductivity[6]["total_target_per_day"]
      //               : 0;

      /////// Update Output per day per time;
      updatedProductivity[inputIndex]["output_per_day_per_time"] = Math.trunc(
        (updatedProductivity[inputIndex].lamb &&
          updatedProductivity[inputIndex].lamb > 0 &&
          updatedProductivity[inputIndex].lamb /
            updatedProductivity[inputIndex]["average_rate"]) +
          (updatedProductivity[inputIndex].beef &&
            updatedProductivity[inputIndex].beef > 0 &&
            updatedProductivity[inputIndex].beef /
              updatedProductivity[inputIndex]["average_rate"]) +
          (updatedProductivity[inputIndex].pork &&
            updatedProductivity[inputIndex].pork > 0 &&
            updatedProductivity[inputIndex].pork /
              updatedProductivity[inputIndex]["average_rate"])
      );

      /////// Update ack_target_qty;
      updatedProductivity[inputIndex]["ack_target_qty"] =
        inputIndex > 0
          ? updatedProductivity
              .slice(0, inputIndex + 1)
              .reduce(
                (acc, cur) =>
                  acc +
                  Number(
                    cur.total_target_per_day ? cur.total_target_per_day : 0
                  ),
                0
              )
          : updatedProductivity[inputIndex].total_target_per_day;

      /////// Update ack_output_qty;
      updatedProductivity[inputIndex]["ack_output_qty"] =
        inputIndex > 0
          ? updatedProductivity
              .slice(0, inputIndex + 1)
              .reduce(
                (acc, cur) =>
                  acc + Number(cur.output_per_day ? cur.output_per_day : 0),
                0
              )
          : updatedProductivity[inputIndex].output_per_day;

      /////// Update ack_target_time;
      updatedProductivity[inputIndex]["ack_target_time"] =
        inputIndex > 0
          ? updatedProductivity
              .slice(0, inputIndex + 1)
              .reduce(
                (acc, cur) =>
                  acc +
                  Number(
                    cur.available_production_hours
                      ? cur.available_production_hours
                      : 0
                  ),
                0
              )
          : updatedProductivity[inputIndex].available_production_hours;

      /////// Update ack_output_time;
      updatedProductivity[inputIndex]["ack_output_time"] =
        inputIndex > 0
          ? updatedProductivity
              .slice(0, inputIndex + 1)
              .reduce(
                (acc, cur) =>
                  acc +
                  Number(
                    cur.output_per_day_per_time
                      ? cur.output_per_day_per_time
                      : 0
                  ),
                0
              )
          : updatedProductivity[inputIndex].output_per_day_per_time;

      /////// Update output_percent;
      updatedProductivity[inputIndex]["output_percent"] = Math.trunc(
        ((updatedProductivity[inputIndex]?.ack_output_qty * 1) /
          updatedProductivity[inputIndex]?.ack_target_qty -
          1) *
          100
      );

      console.log("percent", updatedProductivity[inputIndex]["output_percent"]);
      /////// Update deviation_from_contract_qty;
      updatedProductivity[inputIndex]["deviation_from_contract_qty"] =
        updatedProductivity[inputIndex].output_per_day &&
        Math.round(
          Math.abs(
            updatedProductivity[inputIndex].ack_output_qty -
              updatedProductivity[inputIndex].ack_target_qty
          )
        );

      /////// Update deviation_from_contract_time;
      updatedProductivity[inputIndex]["deviation_from_contract_time"] =
        !updatedProductivity[inputIndex].lamb
          ? !updatedProductivity[inputIndex].lamb &&
            !updatedProductivity[inputIndex].beef &&
            !updatedProductivity[inputIndex].pork &&
            0
          : updatedProductivity[inputIndex].ack_output_time * 1 -
            updatedProductivity[inputIndex].ack_target_time * 1;

      //console.log("valuet", updatedProductivity);
      return updatedProductivity;
    });
  };

  return {
    productivityFollowUp,
    setProductivityFollowUp,
    handleInputChange,
  };
};

//////// Dynamic input field for Settings
export const DynamicInputFieldsSettings = () => {
  const [settings, setSettings] = useState(constant);

  const handleInputChange = ({
    field,
    value,
  }: {
    field: any;
    value: string;
  }) => {
    setSettings((prev) => {
      const updatedValues = { ...prev };
      updatedValues[field] = value; // Update PO Number field

      return updatedValues;
    });
  };

  return { settings, setSettings, handleInputChange };
};
