import { Download, Save } from "@mui/icons-material";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";
import React, { Suspense, useRef } from "react";
import { FaEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Loading } from "../../../components";
import useAuth from "../../../hook/useAuth";
import useNotify from "../../../hook/useNotify";
import { uploadNewCVThunk } from "../../CVManagement/document.slice";
const MakeCVTemplate = React.lazy(() => import("../MakeCVTemplate"));

/**
 * Component PreviewMyProfile - Hiển thị mẫu CV của người dùng
 *
 * @param {object} param0
 * @param {object} param0.myProfileDialog
 * @param {function} param0.setMyProfileDialog
 * @example
 * <PreviewMyProfile  myProfileDialog setMyProfileDialog />
 */
const PreviewMyProfile = ({ myProfileDialog, setMyProfileDialog }) => {
    const handleClose = () => {
        setMyProfileDialog({
            ...myProfileDialog,
            isOpen: false,
        });
    };
    const [language, setLanguage] = React.useState("vi");
    const [isLoading, setIsLoading] = React.useState(false);
    const { user } = useAuth();
    const nameCVRef = useRef();
    const dispatch = useDispatch();
    const { setNotify } = useNotify();
    const exportCVToPDF = async (isUploadToServer) => {
        setIsLoading(true);
        const nameCV = nameCVRef.current.value;
        const cvNeedMake = document.getElementById("cv-need-make");
        const canvas = document.createElement("canvas");
        canvas.width = cvNeedMake.offsetWidth;
        canvas.height = cvNeedMake.offsetHeight;
        const ctx = canvas.getContext("2d");
        ctx.scale(2, 2);
        ctx.translate(-cvNeedMake.offsetLeft, -cvNeedMake.offsetTop);
        html2canvas(cvNeedMake, {
            scrollX: 0,
            scrollY: -window.scrollY,
            scale: 1,
            useCORS: true,
        })
            .then(async (canvas) => {
                const image = { type: "image/jpeg", quality: 0.98 };
                const margin = [0.5, 0.5];
                const fileName = `${
                    nameCV
                        ? nameCV
                        : moment().format(`${user?.fullName}_DD_MM_YYYY`)
                }.pdf`;
                const imgWidth = 8.5;
                const pageHeightStandard = 11;

                const innerPageWidth = imgWidth - margin[0] * 2;
                const innerPageHeight = pageHeightStandard - margin[1] * 2;
                const pxFullHeight = canvas.height;
                const pxPageHeight = Math.floor(
                    canvas.width * (pageHeightStandard / imgWidth)
                );
                const nPages = Math.ceil(pxFullHeight / pxPageHeight);

                // Define pageHeight separately so it can be trimmed on the final page.
                let pageHeight = innerPageHeight;

                // Create a one-page canvas to split up the full image.
                const pageCanvas = document.createElement("canvas");
                const pageCtx = pageCanvas.getContext("2d");
                pageCanvas.width = canvas.width;
                pageCanvas.height = pxPageHeight;
                // Initialize the PDF.
                var pdf = new jsPDF("p", "in", [8.5, 11]);

                for (var page = 0; page < nPages; page++) {
                    // Trim the final page to reduce file size.
                    if (
                        page === nPages - 1 &&
                        pxFullHeight % pxPageHeight !== 0
                    ) {
                        pageCanvas.height = pxFullHeight % pxPageHeight;
                        pageHeight =
                            (pageCanvas.height * innerPageWidth) /
                            pageCanvas.width;
                    }

                    // Display the page.
                    var w = pageCanvas.width;
                    var h = pageCanvas.height;
                    pageCtx.fillStyle = "white";
                    pageCtx.fillRect(0, 0, w, h);
                    pageCtx.drawImage(
                        canvas,
                        0,
                        page * pxPageHeight,
                        w,
                        h,
                        0,
                        0,
                        w,
                        h
                    );

                    // Add the page to the PDF.
                    if (page > 0) pdf.addPage();
                    const imgData = pageCanvas.toDataURL(
                        "image/" + image.type,
                        image.quality
                    );
                    pdf.addImage(
                        imgData,
                        image.type,
                        margin[1],
                        margin[0],
                        innerPageWidth,
                        pageHeight
                    );
                }
                if (isUploadToServer) {
                    // upload to server
                    const file = new File([pdf.output("blob")], fileName);
                    const resultDispatch = await dispatch(
                        uploadNewCVThunk(file)
                    ).unwrap();
                    setNotify({
                        isOpen: true,
                        message: resultDispatch.message,
                        title: "Đăng tải CV mới",
                        type: resultDispatch.isSuccess ? "success" : "error",
                    });
                } else {
                    // download to local
                    pdf.save(fileName);
                    setNotify({
                        isOpen: true,
                        message: "Tạo và tải CV thành công",
                        title: "Tải CV",
                        type: "success",
                    });
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <Dialog
            open={myProfileDialog?.isOpen}
            onClose={handleClose}
            maxWidth={"lg"}
            fullWidth
        >
            <DialogTitle>
                <FaEye /> Xem CV từ hồ sơ
                <LinearProgress
                    color="success"
                    sx={{
                        display: isLoading ? "block" : "none",
                    }}
                />
            </DialogTitle>
            <DialogContent>
                <TextField
                    inputRef={nameCVRef}
                    label="Tên của CV"
                    placeholder="Nhập tên CV"
                    required
                    fullWidth
                    variant="outlined"
                />
                <InputLabel id="language-select-label">Ngôn ngữ CV</InputLabel>
                <Select
                    fullWidth
                    labelId="language-select-label"
                    value={language}
                    onChange={(event) => setLanguage(event.target.value)}
                >
                    <MenuItem value="vi">Tiếng Việt</MenuItem>
                    <MenuItem value="en">Tiếng Anh</MenuItem>
                </Select>
                <Suspense fallback={<Loading />}>
                    <div id="cv-need-make">
                        <MakeCVTemplate language={language} />
                    </div>
                </Suspense>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => exportCVToPDF(false)}
                    variant="contained"
                    startIcon={<Download />}
                    color="primary"
                    disabled={isLoading}
                    fullWidth
                >
                    Tải CV
                </Button>
                <Button
                    onClick={() => exportCVToPDF(true)}
                    variant="contained"
                    startIcon={<Save />}
                    color="success"
                    disabled={isLoading}
                    fullWidth
                >
                    Lưu CV
                </Button>
            </DialogActions>
        </Dialog>
    );
};

PreviewMyProfile.displayName = "PreviewMyProfile";

export default PreviewMyProfile;
