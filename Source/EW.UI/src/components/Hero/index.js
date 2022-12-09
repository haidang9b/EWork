import React from "react";
import "./hero.css";
import PropTypes from "prop-types";

/**
 * Return component Hero with data
 * @param children is component or html element
 * @param title is string, title of Hero
 * @param subtitle is string, subtitle of Hero
 * @returns component Hero with data
 */

const Hero = ({ children, title, subtitle }) => {
    return (
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>Oops!</h1>
                </div>
                <h2>{title}</h2>
                <p>{subtitle}</p>
                {children}
            </div>
        </div>
    );
};

Hero.displayName = "Hero";

Hero.propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    subtitle: PropTypes.string,
};

Hero.defaultProps = {
    title: "",
    subtitle: "",
};
export default Hero;
