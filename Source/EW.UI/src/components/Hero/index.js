import React from "react";
import PropTypes from "prop-types";

/**
 * Return component Hero with data
 * @param {Object} object
 * @param {JSX.Element} object.children is component or html element
 * @param {String} object.hero is string, class of hero
 * @returns component Hero with data
 * @example
 * <Hero children title subtitle/>
 */
const Hero = ({ children, hero }) => {
    return (
        <>
            <header className={hero}>{children}</header>
        </>
    );
};

Hero.displayName = "Hero";

Hero.propTypes = {
    children: PropTypes.node,
    hero: PropTypes.string,
};

Hero.defaultProps = {
    hero: "defaultHero",
};
export default Hero;
