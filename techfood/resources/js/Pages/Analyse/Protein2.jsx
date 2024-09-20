import React, { useState } from "react";
import Card from "@/Components/Card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import Aside from "@/Components/Aside";
import { DynamicInputFields } from "../../Methods/DynamicInputFields"; // Import the hook

export default function Protein({ auth }) {
    const [POInputFields, setPOInputFields] = useState([{ value: "" }]);
    //const [inputFields, setInputFields] = useState([{ value: "" }]);
    const {
        inputFields,
        handleInputChange,
        handleAddClickEvent,
        handleRemoveField,
        handleSubmit,
    } = DynamicInputFields();

    const processFormValues = (values) => {
        console.log("Submitted Values: ", values);
        // You can do further processing or send values to the server here
    };
    // // Define the variants for the aside bar
    const asideVariants = {
        initial: { width: 0 }, // Start hidden
        animate: { width: "250px" }, // Expand to visible width
    };
    // // Handle adding new input field
    // const handleAddField = () => {
    //     setInputFields([...inputFields, { value: "" }]);
    // };

    // // Handle input change
    // const handleInputChange = (index, event) => {
    //     const values = [...inputFields];
    //     values[index].value = event.target.value;
    //     setInputFields(values);
    // };

    // // Handle removing an input field
    // const handleRemoveField = (index) => {
    //     const values = [...inputFields];
    //     values.splice(index, 1);
    //     setInputFields(values);
    // };

    // // Handle form submission
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     // Collect all input field values
    //     const allValues = inputFields.map((field) => field.value);
    //     console.log("Submitted Values: ", allValues);
    //     // You can send the values to your server or further process them here
    // };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
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

                <div className="py-5 px-3">
                    <h2>Enter PO Record</h2>
                    <div className="w-full relative overflow-x-auto">
                        <form onSubmit={handleSubmit}>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 bg-gray-300 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            PO Number
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 flex flex-row"
                                        >
                                            Batch Number
                                            <button
                                                type="button"
                                                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm p-1 ml-2 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                <svg
                                                    className="w-3 h-3 text-white cursor-pointer"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="24"
                                                    height="24"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    onClick={
                                                        handleAddClickEvent
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
                                            </button>
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Protein Value(s)
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Protein Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="border-b bg-gray-300 hover:bg-white">
                                    <tr>
                                        <td
                                            scope="row"
                                            className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {POInputFields.map(
                                                (input, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex flex-row mb-1"
                                                    >
                                                        <input
                                                            type="text"
                                                            id="small-input"
                                                            name="po_number[]"
                                                            required
                                                            value={input.value}
                                                            onChange={(event) =>
                                                                handleInputChange(
                                                                    index,
                                                                    event
                                                                )
                                                            }
                                                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                            placeholder="PO Number"
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <table className="p-2">
                                                <thead>
                                                    <tr>
                                                        <td>
                                                            {inputFields.map(
                                                                (
                                                                    input,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="flex flex-row mb-1"
                                                                    >
                                                                        <input
                                                                            type="text"
                                                                            id="small-input"
                                                                            name="batch_number[]"
                                                                            value={
                                                                                input.value
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                handleInputChange(
                                                                                    index,
                                                                                    event
                                                                                )
                                                                            }
                                                                            className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                            placeholder="Batch Number"
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
                                                                                handleRemoveField(
                                                                                    index
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
                                                                    </div>
                                                                )
                                                            )}
                                                        </td>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </td>
                                        <td className="px-6 py-4">
                                            {inputFields.map((input, index) => (
                                                <div
                                                    key={index}
                                                    className="flex flex-row mb-1"
                                                >
                                                    <input
                                                        type="text"
                                                        id="small-input"
                                                        name="protein_value[]"
                                                        value={input.value}
                                                        onChange={(event) =>
                                                            handleInputChange(
                                                                index,
                                                                event
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
                                                            handleRemoveField(
                                                                index
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
                                                </div>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4">$2999</td>
                                    </tr>
                                </tbody>

                                <tbody className="border-b bg-gray-200 hover:bg-white">
                                    <tr>
                                        <td colSpan="6" className="py-2 px-2">
                                            <button
                                                type="submit"
                                                className="px-3 self-end py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                            >
                                                Continue
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
