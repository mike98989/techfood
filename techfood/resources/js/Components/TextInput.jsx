import React, { forwardRef, useEffect, useRef } from "react";
import PropTypes from "prop-types";

export default forwardRef(function TextInput(
    // eslint-disable-next-line react/prop-types
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm " +
                className
            }
            ref={input}
        />
    );
});

TextInput.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    isFocused: PropTypes.bool,
};
