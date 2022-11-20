import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { profileSelector } from "../profile.slice";
import RichTextEditor from "../../../components/RichTextEditor";

const CoverLetterModal = (props) => {
    const { coverLetterDialog, setCoverLetterDialog } = props;
    const profile = useSelector(profileSelector);
    const [editor, setEditor] = useState();

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

                <RichTextEditor
                    editor={editor}
                    setEditor={setEditor}
                    initialHTML={profile?.coverLetter}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={async () => {
                        const text = editor?.root?.innerHTML;
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
