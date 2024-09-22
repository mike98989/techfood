import React from "react";
import PropTypes from "prop-types";

export default function Checkbox({ className = "", ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                "rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 " +
                className
            }
        />
    );
}
Checkbox.propTypes = {
    className: PropTypes.string,
};