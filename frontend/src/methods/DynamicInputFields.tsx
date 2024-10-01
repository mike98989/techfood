import { useState } from "react";
import { httpRequest } from "./Requests";

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
  totalCount: number;
}

export const DynamicInputFields = () => {
  //const [poNumbers, setPoNumbers] = useState([]);
  const [poNumbers, setPoNumbers] = useState<PONumber[]>([]);
  const [computeValues, setComputValues] = useState<compute>({
    countValid: 0,
    countInValid: 0,
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
      console.log(updatedPoNumbers);
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
  }: {
    poIndex: number;
    batchIndex: number;
  }) => {
    setPoNumbers((prev) => {
      const updatedPoNumbers = [...prev];
      updatedPoNumbers[poIndex].batches.splice(batchIndex, 1);
      return updatedPoNumbers;
    });
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

  const handleCompute = (constant: any) => {
    const resultCount = { countValid: 0, countInValid: 0, totalCount: 0 };
    const inputedValues = poNumbers;
    inputedValues.map((po, poIndex) => {
      po.batches.map((batch, index) => {
        //// Protein
        if (batch.proteinValue != "") {
          resultCount.totalCount++;
          if (parseInt(batch.proteinValue) > constant.constants) {
            resultCount.countValid++;
          } else {
            resultCount.countInValid++;
          }
        }
        //// Lactose
        if (batch.lactoseValue != "") {
          resultCount.totalCount++;
          if (parseInt(batch.lactoseValue) > constant.constants) {
            resultCount.countValid++;
          } else {
            resultCount.countInValid++;
          }
        }
        //// Water
        if (batch.waterValue != "") {
          resultCount.totalCount++;
          if (parseInt(batch.waterValue) > constant.constants) {
            resultCount.countValid++;
          } else {
            resultCount.countInValid++;
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

  const computeProteinChart = (constant: any) => {
    const resultMap = new Map();
    // Iterate through the parent array `data` and its nested `batches`
    poNumbers.forEach(({ batches }) => {
      batches.forEach(({ proteinValue, derivedDate }) => {
        if (!resultMap.has(derivedDate)) {
          resultMap.set(derivedDate, { good: 0, bad: 0 });
        }
        const dateEntry = resultMap.get(derivedDate);

        if (proteinValue > constant.constants) {
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
