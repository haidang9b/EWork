import { InputLabel, MenuItem, Select } from "@mui/material";
import React, { useMemo } from "react";
import countryList from "../../common/countryList";
import PropTypes from "prop-types";

/**
 * Component Country selector help user select country by data json
 * @param country is country, it will default value of country selector
 * @param setCountry setter of country
 * @returns UI CountrySelector component and data country selected
 */
const CountrySelector = ({ country, setCountry }) => {
    const options = useMemo(() => countryList().getData(), []);
    const handleChange = (e) => {
        setCountry(e.target.value);
    };
    return (
        <>
            <InputLabel>Quốc gia</InputLabel>
            <Select
                labelId="currency-selected-item"
                label="Quốc gia"
                value={country}
                onChange={handleChange}
                fullWidth
                sx={{
                    marginBottom: "16px",
                }}
            >
                {options.map((item) => (
                    <MenuItem key={JSON.stringify(item)} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
};

CountrySelector.displayName = "CountrySelector";

CountrySelector.propTypes = {
    country: PropTypes.string.isRequired,
    setCountry: PropTypes.func.isRequired,
};

CountrySelector.defaultProps = {
    country: "VN",
};

export default CountrySelector;
