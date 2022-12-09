import { Dialog } from "@mui/material";
import { func, object } from "prop-types";
import React from "react";

/**
 *
 * @param recruitmentPostModal object data for recruitment post modal
 * @param setRecruitmentPostModal function setter data for recruitment post modal
 * @returns AddRecruitmentPostModal component
 */
const AddRecruitmentPostModal = ({
    recruitmentPostModal,
    setRecruitmentPostModal,
}) => {
    return <Dialog></Dialog>;
};

AddRecruitmentPostModal.displayName = "AddRecruitmentPostModel";

AddRecruitmentPostModal.propsType = {
    recruitmentPostModal: object.isRequired,
    setRecruitmentPostModal: func.isRequired,
};

export default AddRecruitmentPostModal;
