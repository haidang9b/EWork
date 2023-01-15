import React from "react";

const Title = ({ title }) => {
    return (
        <div className="section-title">
            <h4>{title}</h4>
        </div>
    );
};
Title.displayName = "Title";
Title.defaultProps = {
    title: "",
};
export default Title;
