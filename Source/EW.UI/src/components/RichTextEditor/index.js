import React, { useCallback } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const RichTextEditor = (props) => {
    // eslint-disable-next-line
    const { editor, setEditor, initialHTML } = props;
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

export default RichTextEditor;
