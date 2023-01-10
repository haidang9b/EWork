import {
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import React from "react";

const CustomToolbar = () => {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport
                csvOptions={{
                    utf8WithBom: true,
                }}
            />
            <GridToolbarQuickFilter />
        </GridToolbarContainer>
    );
};
CustomToolbar.displayName = "CustomToolbar";
export default CustomToolbar;
