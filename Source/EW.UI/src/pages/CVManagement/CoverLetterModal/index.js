import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";
import { Quill } from "quill";
import { useSelector } from "react-redux";
import { profileSelector } from "../profile.slice";

const CoverLetterModal = (props) => {
    const { coverLetterDialog, setCoverLetterDialog } = props;
    const profile = useSelector(profileSelector);
    const [text, setText] = useState("");
    useEffect(() => setText(profile.coverLetter), [profile]);

    return (
        <Dialog
            open={coverLetterDialog.isOpen}
            onClose={() =>
                setCoverLetterDialog({ ...coverLetterDialog, isOpen: false })
            }
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>
                <Typography variant="h6" component={"div"}>
                    Thư giới thiệu(Cover Letter)
                </Typography>
            </DialogTitle>

            <DialogContent>
                {/* <div id="quill-editor"></div> */}
                <TextField
                    id="outlined-basic"
                    label="Thư giới thiệu"
                    variant="outlined"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                ></TextField>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={async () => {
                        return await coverLetterDialog.onOK(text);
                    }}
                >
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default CoverLetterModal;
