import {
    Button,
    Card,
    CardContent,
    InputAdornment,
    TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import { LocationOn } from "@mui/icons-material";

const SearchBar = () => {
    return (
        <Card
            sx={{
                marginTop: "20px",
            }}
        >
            <CardContent>
                <Box textAlign="center" justifyContent="flex-end">
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
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
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
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocationOn />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        type="button"
                        variant="contained"
                        sx={{
                            width: {
                                sm: "100%",
                                md: "10%",
                                lg: "10%",
                            },
                            marginTop: {
                                md: "1.2%",
                                lg: "1.2%",
                            },
                        }}
                    >
                        Tìm kiếm
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

SearchBar.displayName = "SearchBar";

export default SearchBar;
