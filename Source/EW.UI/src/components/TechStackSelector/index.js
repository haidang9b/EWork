import { useTheme } from "@mui/material/styles";
import { Box, Chip, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { JobSkills } from "../../common/constants";
import { array, func } from "prop-types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const getStyles = (item, techStacks, theme) => {
    return {
        fontWeight:
            techStacks.indexOf(item) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
};

/**
 * User can multiple choice a lot tech stack
 * @param techStacks is list of techStack
 * @param setTechStacks is setter of setTechStacks
 * @returns component tech stack
 */
const TechStackSelector = ({ techStacks, setTechStacks }) => {
    const theme = useTheme();

    const handleChange = (e) => {
        const {
            target: { value },
        } = e;
        setTechStacks(typeof value === "string" ? value.split(",") : value);
    };
    return (
        <>
            <InputLabel id="currency-selected-item">
                Yêu cầu kỹ thuật
            </InputLabel>
            <Select
                labelId="currency-selected-item"
                label="Yêu cầu kỹ thuật"
                multiple
                value={techStacks}
                onChange={handleChange}
                fullWidth
                renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                            <Chip key={value} label={value} />
                        ))}
                    </Box>
                )}
                sx={{
                    marginBottom: "16px",
                }}
                MenuProps={MenuProps}
            >
                {JobSkills.map((item) => (
                    <MenuItem
                        key={item}
                        value={item}
                        style={getStyles(item, techStacks, theme)}
                    >
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </>
    );
};

TechStackSelector.displayName = "TechStackSelector";

TechStackSelector.propTypes = {
    techStacks: array.isRequired,
    setTechStacks: func.isRequired,
};

export default TechStackSelector;
