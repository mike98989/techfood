import React from "react";
import { Link } from "@inertiajs/react";

const Card = (props) => {
    const { title, content, set_active_button, href = null } = props;
    return (
        <div className="max-w-sm p-6 mx-2 bg-white border border-gray-200 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 shadow-md">
            <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black">
                    {title}
                </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {content}
            </p>

            <a
                href={href}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-gray-900 "
                //onClick={set_active_button}
            >
                Continue
                <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                </svg>
            </a>
        </div>
    );
};

export default Card;
