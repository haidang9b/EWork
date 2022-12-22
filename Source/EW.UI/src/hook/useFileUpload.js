const useFileUpload = () => {
    /**
     * return exact path with backend file
     * @param {string} url is path file save in database
     * @returns {string} path with API url
     */
    const getFilePathUpload = (url) => {
        return `${process.env.REACT_APP_BACKEND_URL}/Uploads/${url}`;
    };
    return {
        getFilePathUpload,
    };
};

export default useFileUpload;
