// components/QuillEditor.tsx
import Quill from "quill";
import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css"; // Import Quill's CSS

// Define toolbar options
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image", "video", "formula"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

// Define component props
type QuillEditorProps = {
  value: string;
  onChange: (content: string) => void;
};

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow", // or 'bubble'
        modules: {
          toolbar: toolbarOptions,
        },
        placeholder: "Description...",
        readOnly: false,
      });

      quillRef.current.on("text-change", () => {
        if (quillRef.current) {
          onChange(quillRef.current.root.innerHTML);
        }
      });
    }
  }, [onChange]);

  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      // Save the cursor position
      const selection = quillRef.current.getSelection();
      const cursorPosition = selection ? selection.index : 0;

      quillRef.current.root.innerHTML = value;

      // Restore the cursor position
      quillRef.current.setSelection(cursorPosition);
    }
  }, [value]);

  return (
    <div
      ref={editorRef}
      style={{
        height: 100,
      }}
      className="text-black"
    />
  );
};

export default QuillEditor;
