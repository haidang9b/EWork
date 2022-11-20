import React, { useCallback, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const RichTextEditor = (props) => {
    const { text } = props;
    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return;
        wrapper.innerHTML = "";
        const editor = document.createElement("div");
        wrapper.append(editor);
        const quill = new Quill(editor, {
            theme: "snow",
            placeholder: "Enter here ...",
        });
        if (text) {
            quill.root.innerHTML = text;
        }
    }, []);
    return <div id="quill-editor" ref={wrapperRef}></div>;
};

export default RichTextEditor;
