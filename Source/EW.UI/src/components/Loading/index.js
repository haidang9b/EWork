import React from "react";
import "./loading.css";

const Loading = () => {
    return (
        <div className="spinner-container">
            <div className="loading-spinner"></div>
        </div>
    );
};
Loading.displayName = "Loading";
export default Loading;
