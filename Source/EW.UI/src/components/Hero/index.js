import React from "react";
import "./hero.css";
import PropTypes from "prop-types";

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
