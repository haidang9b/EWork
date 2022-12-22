/**
 * CountryList support method using list country
 */

class CountryList {
    constructor() {
        this.data = require("../assets/jsons/countries.json");
        this.labelMap = {};
        this.valueMap = {};

        this.data.forEach((country) => {
            this.labelMap[country.label.toLowerCase()] = country.value;
            this.valueMap[country.value.toLowerCase()] = country.label;
        });
    }
    /**
     * Get value country by label
     * @param {string} label of country
     * @returns {string} return value by label, if null, return ""
     */
    getValue(label) {
        if (label) {
            return this.labelMap[label.toLowerCase()];
        }
        return "";
    }
    /**
     * Get label country by value
     * @param {string} value is value of country
     * @returns {string} return label by value, if null, return ""
     */
    getLabel(value) {
        if (value) {
            return this.valueMap[value.toLowerCase()];
        }
        return "";
    }
    /**
     * Get labels of all countries in data .json
     * @returns {Array} List label of countries
     */
    getLabels() {
        return this.data.map((country) => country.label);
    }
    /**
     * Get values of all countries in data .json
     * @returns {Array} List value of countries
     */
    getValues() {
        return this.data.map((country) => country.value);
    }

    getLabelList() {
        return this.labelMap;
    }

    getValueList() {
        return this.valueMap;
    }

    getData() {
        return this.data;
    }

    setLabel(value, label) {
        this.data.forEach((country) => {
            if (country.value === value) {
                country.label = label;
                this.valueMap[country.value.toLowerCase()] = country.label;
            }
        });

        return this;
    }

    setEmpty(label) {
        this.data.unshift({
            value: "",
            label: label,
        });
        this.valueMap[""] = label;
        this.labelMap[label] = "";

        return this;
    }
}

const countryList = () => {
    if (!(this instanceof CountryList)) return new CountryList();
};

export default countryList;
