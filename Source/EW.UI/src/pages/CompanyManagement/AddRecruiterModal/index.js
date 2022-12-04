import { func, object } from "prop-types";
import React from "react";

const AddRecruiterModal = ({ addRecruiterModal, setAddRecruiterModal }) => {
    return <div>AddRecruiterModal</div>;
};

AddRecruiterModal.displayName = "AddRecruiterModal";
AddRecruiterModal.propTypes = {
    addRecruiterModal: object.isRequired,
    setAddRecruiterModal: func.isRequired,
};
export default AddRecruiterModal;
