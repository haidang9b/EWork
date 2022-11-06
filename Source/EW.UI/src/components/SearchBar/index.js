import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";

const SearchBar = () => {
    return (
        <Box
            sx={{
                paddingTop: "6px",
            }}
            textAlign="center"
        >
            <TextField
                id="TextSearch"
                label="Tìm kiếm kỹ năng, chức vụ, công ti,..."
                variant="outlined"
                sx={{
                    padding: "6px",
                    width: {
                        sm: "100%",
                        md: "59%",
                        lg: "59%",
                    },
                }}
            />
            <TextField
                id="TextLocation"
                label="Vị trí"
                variant="outlined"
                sx={{
                    padding: "6px",
                    width: {
                        sm: "100%",
                        md: "24%",
                        lg: "24%",
                    },
                }}
            />

            <Button
                type="button"
                variant="contained"
                sx={{
                    padding: "6px",
                    width: {
                        sm: "100%",
                        md: "10%",
                        lg: "10%",
                    },
                    alignItems: "center",
                }}
            >
                Tìm kiếm
            </Button>
        </Box>
    );
};

export default SearchBar;
