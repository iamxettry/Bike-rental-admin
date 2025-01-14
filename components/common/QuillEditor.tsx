"use client";

import Quill from "quill";
import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  ["link", "image", "video", "formula"],
  [{ header: 1 }, { header: 2 }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }],
  [{ indent: "-1" }, { indent: "+1" }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  [{ font: [] }],
  [{ align: [] }],
  ["clean"],
];

type QuillEditorProps = {
  value: string;
  onChange: (content: string) => void;
  readOnly?: boolean;
};

const QuillEditor: React.FC<QuillEditorProps> = ({
  value,
  onChange,
  readOnly = false,
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules: { toolbar: readOnly ? false : toolbarOptions },
        placeholder: readOnly ? "" : "Write your content here...",
        readOnly,
      });

      quillRef.current.on("text-change", () => {
        if (quillRef.current) {
          onChange(quillRef.current.root.innerHTML);
        }
      });
    }
  }, [onChange, readOnly]);

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.clipboard.dangerouslyPasteHTML(value);
    }
  }, [value]);

  return (
    <div
      ref={editorRef}
      style={{ minHeight: 150, maxHeight: 400, overflowY: "auto" }}
      className="text-black"
    />
  );
};

export default QuillEditor;
