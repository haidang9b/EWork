import React from "react";
import "./hero.css";
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
export default Hero;
