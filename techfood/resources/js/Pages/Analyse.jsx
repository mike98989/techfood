import React, { useState } from "react";
import Card from "@/Components/Card";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import Aside from "@/Components/Aside";
import PropTypes from "prop-types";

const Analyse = ({ auth }) => {
    const [activeButton, setActiveButton] = useState("");
    // Define the variants for the divs
    const divVariants = {
        initial: { opacity: 1, x: 0 }, // Initial state
        animate: { opacity: 0, x: -100 }, // Disappear and move left
    };

    // Define the variants for the aside bar
    const asideVariants = {
        initial: { width: 0 }, // Start hidden
        animate: { width: "250px" }, // Expand to visible width
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Analyse
                </h2>
            }
        >
            <Head title="Techfood - Analyse" />
            <div className="flex flex-row">
                <motion.aside
                    initial="initial"
                    animate={activeButton == "" ? "initial" : "animate"}
                    variants={asideVariants}
                    style={{
                        backgroundColor: "#ddd",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                    }}
                >
                    <Aside />
                </motion.aside>

                <div className="flex flex-row py-5 justify-center content-center px-3">
                    <motion.div
                        initial="initial"
                        animate={activeButton == "" ? "initial" : "animate"}
                        variants={divVariants}
                        style={{
                            display: "flex",
                            flexDirection: "flex-row",
                            overflow: "hidden",
                        }}
                    >
                        <motion.div>
                            <Card
                                title="Protein"
                                content="Digitalization and monitoring of analysis results for protein from production"
                                set_active_button={() =>
                                    setActiveButton("protein")
                                }
                                href="/analyse/protein"
                            ></Card>
                        </motion.div>
                        <motion.div>
                            <Card
                                title="Lactose"
                                content="Digitalization and monitoring of analysis results for Lactose"
                                set_active_button={() =>
                                    setActiveButton("lactose")
                                }
                                href="analyse/lactose"
                            ></Card>
                        </motion.div>
                        <motion.div>
                            <Card
                                title="Water Content"
                                content="Digitalization and monitoring of analysis results for moisture content from production"
                                set_active_button={() =>
                                    setActiveButton("water")
                                }
                                href="analyse/water"
                            ></Card>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
Analyse.propTypes = {
    auth: PropTypes.object,
};

export default Analyse;
