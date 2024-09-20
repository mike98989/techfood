import { useState } from "react";

export const DynamicInputFields = () => {
    const [poNumbers, setPoNumbers] = useState([]);
    const [proteinComputeValues, setProteinComputValues] = useState([]);
    const [batchComputeValues, setBatchComputValues] = useState([]);

    const handleAddPoNumber = () => {
        setPoNumbers((prev) => [
            ...prev,
            { poNumber: "", batches: [{ batchNumber: "", proteinValue: "" }] },
        ]);
    };

    const handleAddBatch = (poIndex) => {
        setPoNumbers((prev) => {
            const updatedPoNumbers = [...prev];
            console.log(updatedPoNumbers);
            updatedPoNumbers[poIndex].batches.push({
                batchNumber: "",
                proteinValue: "",
            });
            return updatedPoNumbers;
        });
    };

    const handleRemoveBatch = (poIndex, batchIndex) => {
        setPoNumbers((prev) => {
            const updatedPoNumbers = [...prev];
            updatedPoNumbers[poIndex].batches.splice(batchIndex, 1);
            return updatedPoNumbers;
        });
    };

    const handleInputChange = (poIndex, batchIndex, field, value) => {
        setPoNumbers((prev) => {
            const updatedPoNumbers = [...prev];
            //console.log(updatedPoNumbers);
            if (batchIndex != null) {
                updatedPoNumbers[poIndex].batches[batchIndex][field] = value;
            } else {
                updatedPoNumbers[poIndex][field] = value; // Update PO Number field
            }
            return updatedPoNumbers;
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(poNumbers); // Your final JSON-like object
    };

    const handleProteinCompute = (constant) => {
        const resultCount = { countValid: 0, countInValid: 0, totalCount: 0 };
        const inputedValues = poNumbers;
        inputedValues.map((po, poIndex) => {
            po.batches.map((batch, index) => {
                if (batch.proteinValue != 0) {
                    resultCount.totalCount++;
                    if (batch.proteinValue > constant.constants) {
                        resultCount.countValid++;
                    } else {
                        resultCount.countInValid++;
                    }
                }
            });
        });
        setProteinComputValues(resultCount);
    };

    const handleBatchCompute = (constant) => {
        const inputedValues = poNumbers;
        let batchCompute = [];
        inputedValues.map((po, poIndex) => {
            po.batches.map((batch, index) => {
                if (batch.batchNumber != "") {
                    let split = batch.batchNumber.slice(0, 6);
                    let formatted =
                        !isNaN(split * 1) & (batch.batchNumber.length > 5) // Check if the value is a number and that the length of the value is above 5
                            ? split.replace(/(\d{2})(?=\d)/g, "$1-")
                            : "Invalid Input";
                    let computed = {
                        date: formatted,
                        original: batch.batchNumber,
                    };
                    batchCompute = [...batchCompute, computed];
                    console.log(batchCompute);
                }
            });
        });
        setBatchComputValues(batchCompute);
    };
    return {
        poNumbers,
        proteinComputeValues,
        batchComputeValues,
        handleAddPoNumber,
        handleAddBatch,
        handleRemoveBatch,
        handleInputChange,
        handleSubmit,
        handleProteinCompute,
        handleBatchCompute,
    };
};
