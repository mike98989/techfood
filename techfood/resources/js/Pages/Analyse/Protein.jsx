import React, { useState } from "react";
import Card from "@/Components/Card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import Aside from "@/Components/Aside";
import { DynamicInputFields } from "../../Methods/DynamicInputFields"; // Import the hook
import Modal from "@/Components/Modal";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    BarElement,
    Colors,
    RadialLinearScale,
} from "chart.js";

import { Doughnut, Bar, Pie, PolarArea } from "react-chartjs-2";
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    BarElement,
    Colors,
    RadialLinearScale
);

export default function Protein({ auth }) {
    const [showModal, setShowModal] = useState(false);
    const {
        poNumbers,
        proteinComputeValues,
        proteinChartValues,
        handleAddPoNumber,
        handleAddBatch,
        handleRemoveBatch,
        handleInputChange,
        handleSubmit,
        handleProteinCompute,
        computeProteinChart,
    } = DynamicInputFields();
    const proteinConstant = {
        constants: 72.5,
        approvedText: "Tillfredställande",
        unApprovedText: "Åtgärder krävs",
    };

    const asideVariants = {
        initial: { width: 0 }, // Start hidden
        animate: { width: "250px" }, // Expand to visible width
    };

    //const labels = Utils.months({ count: 7 });
    const data = {
        labels: proteinChartValues.map((item) => item.derivedDate),
        datasets: [
            {
                label: proteinConstant.approvedText,
                data: proteinChartValues.map((item) => item.good),
                backgroundColor: "green",
                borderColor: "green",
            },
            {
                label: proteinConstant.unApprovedText,
                data: proteinChartValues.map((item) => item.bad),
                backgroundColor: "red",
                borderColor: "red",
            },
        ],
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-100 leading-tight">
                    Analyse - Protein
                </h2>
            }
        >
            <Head title="Techfood - Analyse" />
            <div className="flex flex-row">
                <motion.aside
                    initial="initial"
                    animate="animate"
                    variants={asideVariants}
                    style={{
                        backgroundColor: "#ddd",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    <Aside />
                </motion.aside>

                <div className="w-3/5 py-5 px-3">
                    <div className="w-full  overflow-x-auto">
                        <form onSubmit={handleSubmit} method="POST">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 relative overflow-x-auto shadow-md rounded-lg">
                                <thead className="text-sm text-gray-700 uppercase bg-gray-800 dark:text-gray-400">
                                    <tr>
                                        <th
                                            scope="col"
                                            colSpan="6"
                                            className="px-6 py-3"
                                        >
                                            Digitalization and monitoring of
                                            analysis results for protein from
                                            production
                                        </th>
                                    </tr>
                                </thead>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-600 dark:text-gray-400">
                                    <tr>
                                        <td colSpan="6" className="py-2 px-2">
                                            <div className="grid grid-cols-5 gap-3">
                                                <div>
                                                    PO Number{" "}
                                                    <button
                                                        type="button"
                                                        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-sm text-xs p-1 ml-2 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                        onClick={
                                                            handleAddPoNumber
                                                        }
                                                    >
                                                        <svg
                                                            className="w-3 h-3 text-white cursor-pointer"
                                                            aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                stroke="currentColor"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth="2"
                                                                d="M5 12h14m-7 7V5"
                                                            />{" "}
                                                        </svg>
                                                        Add
                                                    </button>
                                                </div>
                                                <div className="col-span-2 text-center items-center justify-center">
                                                    Batch Number/Protein
                                                    Value(s)
                                                </div>
                                                <div className="col-span-1 text-center items-center justify-center">
                                                    Date
                                                </div>
                                                <div className="col-span-1 text-center items-center justify-center">
                                                    Protein Status
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </thead>
                                <tbody className="w-full border-b bg-gray-300 hover:bg-white">
                                    {poNumbers.map((po, poIndex) => (
                                        <tr
                                            key={poIndex}
                                            className="even:bg-gray-400"
                                        >
                                            <td
                                                colSpan="6"
                                                className="py-2 px-2"
                                            >
                                                <div className="grid grid-cols-5 gap-3 mb-1">
                                                    <div className="justify-center align-middle self-center">
                                                        <input
                                                            type="text"
                                                            id="small-input"
                                                            name="po_number[]"
                                                            required
                                                            value={po.poNumber}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    poIndex,
                                                                    null,
                                                                    "poNumber",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            placeholder="PO Number"
                                                        />
                                                    </div>
                                                    <div className="col-span-4">
                                                        {po.batches.map(
                                                            (
                                                                batch,
                                                                batchIndex
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        batchIndex
                                                                    }
                                                                    className="w-full flex flex-row mb-1"
                                                                >
                                                                    <div className="w-1/3 mr-1">
                                                                        <input
                                                                            type="text"
                                                                            id="small-input"
                                                                            name="batch_number[]"
                                                                            value={
                                                                                batch.batchNumber
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                handleInputChange(
                                                                                    poIndex,
                                                                                    batchIndex,
                                                                                    "batchNumber",
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            className="w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-1"
                                                                            placeholder="Batch Number"
                                                                            required
                                                                        />
                                                                    </div>

                                                                    <div className="flex flex-row w-2/3">
                                                                        <input
                                                                            type="text"
                                                                            id="small-input"
                                                                            name="protein_value[]"
                                                                            value={
                                                                                batch.proteinValue
                                                                            }
                                                                            onBlur={(
                                                                                e
                                                                            ) =>
                                                                                handleProteinCompute(
                                                                                    proteinConstant
                                                                                )
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                handleInputChange(
                                                                                    poIndex,
                                                                                    batchIndex,
                                                                                    "proteinValue",
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                            placeholder="Protein Value"
                                                                            required
                                                                        />

                                                                        <svg
                                                                            className="w-6 h-6 cursor-pointer ml-2 mt-1 text-red-500"
                                                                            aria-hidden="true"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="24"
                                                                            height="24"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            onClick={() =>
                                                                                handleRemoveBatch(
                                                                                    poIndex,
                                                                                    batchIndex
                                                                                )
                                                                            }
                                                                        >
                                                                            <path
                                                                                stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth="2"
                                                                                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                                                                            />
                                                                        </svg>

                                                                        <svg
                                                                            className="w-6 h-6 text-cyan-800 cursor-pointer mt-1 ml-1"
                                                                            aria-hidden="true"
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            width="24"
                                                                            height="24"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            onClick={() =>
                                                                                handleAddBatch(
                                                                                    poIndex
                                                                                )
                                                                            }
                                                                        >
                                                                            <path
                                                                                stroke="currentColor"
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth="2"
                                                                                d="M5 12h14m-7 7V5"
                                                                            />
                                                                        </svg>
                                                                    </div>
                                                                    <div className="w-1/3 flex mt-2 ml-1">
                                                                        <>
                                                                            <svg
                                                                                className="w-4 h-4 text-black"
                                                                                aria-hidden="true"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="24"
                                                                                height="24"
                                                                                fill="none"
                                                                                viewBox="0 0 24 24"
                                                                            >
                                                                                <path
                                                                                    stroke="currentColor"
                                                                                    strokeLinecap="round"
                                                                                    strokeLinejoin="round"
                                                                                    strokeWidth="2"
                                                                                    d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                                                                                />
                                                                            </svg>
                                                                            <span className="text-xs text-black">
                                                                                {
                                                                                    batch.derivedDate
                                                                                }
                                                                            </span>
                                                                        </>
                                                                    </div>
                                                                    <div className="flex flex-row w-1/3 text-center justify-center items-center">
                                                                        {batch.proteinValue !=
                                                                            "" &&
                                                                            (batch.proteinValue *
                                                                                1 >
                                                                            proteinConstant.constants *
                                                                                1 ? (
                                                                                <div className="flex items-center">
                                                                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                                                                                    <span className="text-gray-800">
                                                                                        {
                                                                                            proteinConstant.approvedText
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                            ) : (
                                                                                <div className="flex items-center">
                                                                                    <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div>{" "}
                                                                                    <span className="text-gray-800">
                                                                                        {
                                                                                            proteinConstant.unApprovedText
                                                                                        }
                                                                                    </span>
                                                                                </div>
                                                                            ))}
                                                                    </div>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tbody className="border-b bg-white">
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="py-2 px-2 flex justify-end"
                                        >
                                            {proteinComputeValues.length !=
                                                0 && (
                                                <button
                                                    type="submit"
                                                    className="px-3 self-end py-2 text-xs font-medium text-center text-white bg-gray-800 mr-2 rounded-lg hover:bg-gray-800"
                                                    onClick={() => {
                                                        setShowModal(true),
                                                            computeProteinChart(
                                                                proteinConstant
                                                            );
                                                    }}
                                                >
                                                    View Graph
                                                </button>
                                            )}

                                            <button
                                                type="submit"
                                                className="px-3 self-end py-2 text-xs font-medium text-center text-white bg-gray-900 rounded-lg hover:bg-gray-800"
                                            >
                                                Save & Continue
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>

                <div className="2/5 py-5 px-3">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-800 dark:text-gray-400">
                                <tr>
                                    <th
                                        scope="col"
                                        colSpan="3"
                                        className="px-6 py-3"
                                    >
                                        Protein: Gränsvärde ={" "}
                                        {proteinConstant.constants}
                                    </th>
                                </tr>
                            </thead>

                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Antal
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        %
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b bg-gray-500 border-gray-500">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {proteinConstant.approvedText}
                                    </th>
                                    <td className="px-6 py-4">
                                        {proteinComputeValues.countValid}
                                    </td>
                                    <td className="px-6 py-4">
                                        {proteinComputeValues.countValid
                                            ? Math.round(
                                                  ((proteinComputeValues.countValid *
                                                      1) /
                                                      proteinComputeValues.totalCount) *
                                                      1 *
                                                      100
                                              )
                                            : 0}
                                        %
                                    </td>
                                </tr>
                                <tr className="border-b bg-gray-600 border-gray-500">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {proteinConstant.unApprovedText}
                                    </th>
                                    <td className="px-6 py-4">
                                        {proteinComputeValues.countInValid}
                                    </td>
                                    <td className="px-6 py-4">
                                        {proteinComputeValues.countInValid
                                            ? Math.round(
                                                  ((proteinComputeValues.countInValid *
                                                      1) /
                                                      proteinComputeValues.totalCount) *
                                                      1 *
                                                      100
                                              )
                                            : 0}
                                        %
                                    </td>
                                </tr>
                            </tbody>
                            <thead className="text-xs text-gray-700 uppercase bg-gray-300">
                                <tr>
                                    <th scope="col" className="px-6 py-3"></th>
                                    <th colSpan="2" className="px-6 py-3">
                                        Total ={" "}
                                        {proteinComputeValues.totalCount}
                                    </th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>

            <Modal show={showModal}>
                <div className="relative p-0 w-auto max-w-2xl max-h-full">
                    <div className="relative rounded-lg shadow bg-gray-300">
                        <div className="flex items-center justify-between p-1 md:p-1 rounded-t">
                            <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => setShowModal(!showModal)}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>

                        <div className="p-3 md:p-5 flex justify-center items-center">
                            <div className="w-3/4 shadow-lg bg-white p-4 rounded-md text-center flex flex-col">
                                <h3 className="mb-2 text-md text-gray-700">
                                    Protein content status in production
                                </h3>
                                <Bar data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
