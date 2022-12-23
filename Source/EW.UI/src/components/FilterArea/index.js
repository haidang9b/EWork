import { Search } from "@mui/icons-material";
import { Button, Grid, InputAdornment, Paper, TextField } from "@mui/material";
import { string } from "prop-types";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { filterActions } from "./filter.slice";
/**
 * List data filter with key word
 * @param {string} label
 * @example
 * <FilterArea label="Tìm kiếm thông tin"/>
 */
const FilterArea = ({ label }) => {
    const dispatch = useDispatch();
    const textSearchRef = useRef();
    const handleSearch = (event) => {
        event.preventDefault();
        dispatch(
            filterActions.searchFilterChange(textSearchRef.current?.value)
        );
    };

    useEffect(() => {
        dispatch(filterActions.searchFilterChange(""));
    }, [dispatch]);
    return (
        <form onSubmit={handleSearch}>
            <Paper>
                <Grid container padding={2} marginTop={1}>
                    <Grid item xs={12} sm={12} md={10} lg={10}>
                        <TextField
                            id="TextSearch"
                            label={label}
                            variant="outlined"
                            sx={{
                                padding: "6px",
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            inputRef={textSearchRef}
                            fullWidth
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm={12}
                        md={2}
                        lg={2}
                        className="item-center"
                    >
                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            onSubmit={handleSearch}
                        >
                            Tìm kiếm
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </form>
    );
};

FilterArea.displayName = "FilterArea";

FilterArea.propTypes = {
    label: string,
};

FilterArea.defaultProps = {
    label: "Nhập thông tin tìm kiếm",
};
export default FilterArea;
