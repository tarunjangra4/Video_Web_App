import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const TextEditor = ({ setDescription, initialScript = "" }) => {
  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current);
      setDescription(editorRef.current.getContent());
    }
  };

  return (
    <>
      <Editor
        apiKey="ozas0k3imit46jvcman64faw0rhpp58u12yquii27eqws1jv"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={initialScript}
        onEditorChange={log}
        init={{
          plugins:
            " preview autosave save directionality fullscreen image link media insertdatetime advlist lists wordcount charmap emoticons",
          menubar: false,
          toolbar:
            " undo redo | fontsize | bold underline | forecolor | p strong em ul ol li | alignleft aligncenter alignjustify | numlist bullist | outdent indent | link",
          selector: "textarea",
          font_size_formats:
            "8px 10px 12px 14px 16px 18px 20px 24px 28px 32px 36px 40px",
          content_style:
            "body { font-family:roboto,Arial,sans-serif; font-size:14px }",
          content_css: "./TextEditor.css",
        }}
      />
    </>
  );
};

export default TextEditor;
