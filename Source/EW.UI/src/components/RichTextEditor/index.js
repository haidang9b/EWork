import React, { useCallback, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import PropTypes from "prop-types";
import "./RichTextEditor.css";
/**
 * Create new Rich Text Editor, using text html easy
 * @param editor object to set editor, get data from RichTextEditor
 * @param setEditor setter of editor, to set object when initial quill js
 * @param initialHTML value html for quill, if you dont fill, default is ""
 * @returns Component RichTextEditor
 */
const RichTextEditor = ({ editor, setEditor, initialHTML }) => {
    const toolbarOptions = [
        ["bold", "italic", "underline", "strike"], // toggled buttons
        ["blockquote", "code-block"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ direction: "rtl" }], // text direction
        [{ size: ["small", false, "large", "huge"] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"], // add's image support
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ["clean"], // remove formatting button
    ];
    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return;
        wrapper.innerHTML = "";
        const editorTag = document.createElement("div");
        wrapper.append(editorTag);
        const q = new Quill(editorTag, {
            theme: "snow",
            modules: {
                toolbar: toolbarOptions,
            },
        });
        setEditor(q);
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        if (editor) {
            editor.root.innerHTML = initialHTML;
        }
    }, [initialHTML, editor]);
    return <div id="quill-editor" ref={wrapperRef}></div>;
};

RichTextEditor.displayName = "RichTextEditor";

RichTextEditor.propTypes = {
    editor: PropTypes.object,
    setEditor: PropTypes.func,
    initialHTML: PropTypes.string,
};

RichTextEditor.defaultProps = {
    initialHTML: "",
};
export default RichTextEditor;
