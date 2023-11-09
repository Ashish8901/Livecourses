// "use client";
// import React, { useEffect, useRef } from "react";

// const CKEditor = ({ onChange, editorLoaded, name, value }) => {
//   const editorRef = useRef();
//   const { CKEditor, ClassicEditor } = editorRef.current || {};
//   useEffect(() => {
//     editorRef.current = {
//       CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
//       ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
//     };
//     // setEditorLoaded(true);
//   }, []);
//   return (
//     <>
//       {editorLoaded ? (
//         <CKEditor
//           type=""
//           name={name}
//           editor={ClassicEditor}
//           data={value}
//           onChange={(event, editor) => {
//             const data = editor.getData();
//             onChange(data);
//           }}
//         />
//       ) : (
//         <div>Editor loading</div>
//       )}
//     </>
//   );
// }
// export default CKEditor;
"use client";
import React, { useEffect, useRef } from "react";

export default function CKEditor({
  name,
  value,
  onChangeData,
  editorLoaded,
  setEditorLoaded,
}) {
  const editorRef = useRef();
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);
  return (
    <>
      {editorLoaded ? (
        <CKEditor
          // type=""
          name={name}
          editor={ClassicEditor}
          data={value}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChangeData(data);
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </>
  );
}
