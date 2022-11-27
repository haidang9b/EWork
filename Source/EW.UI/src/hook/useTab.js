import { useState } from "react";

const useTab = (indexDefault) => {
    const [value, setValue] = useState(indexDefault);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`,
        };
    };

    return {
        value,
        handleChange,
        a11yProps,
    };
};

export default useTab;
