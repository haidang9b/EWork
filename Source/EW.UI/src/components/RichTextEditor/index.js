import React, { useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import PropTypes from "prop-types";

const RichTextEditor = ({ editor, setEditor, initialHTML }) => {
    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return;
        wrapper.innerHTML = "";
        const editorTag = document.createElement("div");
        wrapper.append(editorTag);
        const q = new Quill(editorTag, {
            theme: "snow",
        });
        if (initialHTML) {
            q.root.innerHTML = initialHTML;
        }
        setEditor(q);
        // eslint-disable-next-line
    }, []);
    return <div id="quill-editor" ref={wrapperRef}></div>;
};

RichTextEditor.propTypes = {
    editor: PropTypes.object,
    setEditor: PropTypes.func,
    initialHTML: PropTypes.string,
};

RichTextEditor.defaultProps = {
    initialHTML: "",
};
export default RichTextEditor;
