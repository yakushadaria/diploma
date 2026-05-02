import {useRef} from "react";

import {
    FaBold,
    FaItalic,
    FaUnderline,
    FaStrikethrough,
    FaListOl,
    FaListUl,
    FaEraser
} from "react-icons/fa";

import { FaPalette } from "react-icons/fa";


function RichEditor({ value, onChange, placeholder }) {
    const editorRef = useRef(null);

    const exec = (command, val = null) => {
        document.execCommand(command, false, val);
        editorRef.current.focus();
        onChange(editorRef.current.innerHTML);
    };

    return (
        <div style={{ display: "flex", border: "1px solid #e8ddd2", borderRadius: "10px", overflow: "hidden" }}>
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={() => onChange(editorRef.current.innerHTML)}
                style={{ flex: 1, minHeight: "100px", padding: "10px 14px", outline: "none", fontSize: "16px", lineHeight: "1.6" }}
            />

            <div style={{    display: "grid",
                gridTemplateColumns: "repeat(2, 40px)",  gap: "4px", padding: "8px", borderLeft: "1px solid #e8ddd2", background: "#fffaf5" }}>
                <button onClick={() => exec("bold")}><FaBold /></button>
                <button onClick={() => exec("italic")}><FaItalic /></button>
                <button onClick={() => exec("underline")}><FaUnderline /></button>
                <button onClick={() => exec("strikeThrough")}><FaStrikethrough /></button>

                <button onClick={() => exec("insertOrderedList")}><FaListOl /></button>
                <button onClick={() => exec("insertUnorderedList")}><FaListUl /></button>

                <label className="tool-btn color-btn">
                    <FaPalette />
                    <input
                        type="color"
                        onChange={(e) => exec("foreColor", e.target.value)}
                    />
                </label>

                <button onClick={() => exec("removeFormat")}><FaEraser /></button>
               </div>
        </div>
    );
}

export default RichEditor;