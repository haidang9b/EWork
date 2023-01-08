import React from "react";
import PropTypes from "prop-types";

/**
 * Render background hero by hero (class name)
 * @param {Object} object
 * @param {JSX.Element} object.children
 * @param {String} object.title
 * @param {String} object.subtitle
 * @example
 * <Banner/>
 */
const Banner = ({ children, title, subtitle }) => {
    return (
        <div className="banner">
            <h1>{title}</h1>
            <div></div>
            <p>{subtitle}</p>
            {children}
        </div>
    );
};

Banner.displayName = "Banner";
Banner.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    subtitle: PropTypes.string,
};
Banner.defaultProps = {
    title: "",
    subtitle: "",
};

export default Banner;
