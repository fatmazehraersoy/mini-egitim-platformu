import { useEffect } from "react"

import {
  EditorContent,
  useEditor,
} from "@tiptap/react"

import StarterKit from "@tiptap/starter-kit"

import {
  FontSize,
  TextStyle,
} from "@tiptap/extension-text-style"

type RichTextEditorProps = {
  value: string
  onChange: (html: string) => void
}

function RichTextEditor({
  value,
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontSize,
    ],

    content: value,

    editorProps: {
      attributes: {
        class: "rich-text-content",
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (!editor) {
      return
    }

    if (editor.getHTML() !== value) {
      editor.commands.setContent(
        value,
        {
          emitUpdate: false,
        },
      )
    }
  }, [editor, value])

  if (!editor) {
    return null
  }

  function changeFontSize(
    size: string,
  ) {
    if (!size) {
      editor
        .chain()
        .focus()
        .unsetFontSize()
        .run()

      return
    }

    editor
      .chain()
      .focus()
      .setFontSize(size)
      .run()
  }

  return (
    <div className="rich-text-editor">
      <div className="rich-text-toolbar">
       
        

        <button
          type="button"
          className={
            editor.isActive("bold")
              ? "toolbar-button toolbar-button-active"
              : "toolbar-button"
          }
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
        >
          <strong>B</strong>
        </button>

        <button
          type="button"
          className={
            editor.isActive("italic")
              ? "toolbar-button toolbar-button-active"
              : "toolbar-button"
          }
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
        >
          <em>I</em>
        </button>

        <span className="toolbar-divider" />

        <select
          className="toolbar-select"
          aria-label="Yazı boyutu"
          onChange={(event) =>
            changeFontSize(
              event.target.value,
            )
          }
          defaultValue=""
        >
          <option value="">
            Boyut
          </option>

          <option value="14px">
            14 px
          </option>

          <option value="16px">
            16 px
          </option>

          <option value="18px">
            18 px
          </option>

          <option value="22px">
            22 px
          </option>

          <option value="26px">
            26 px
          </option>
        </select>

        <span className="toolbar-divider" />

        <button
          type="button"
          className={
            editor.isActive(
              "bulletList",
            )
              ? "toolbar-button toolbar-button-active"
              : "toolbar-button"
          }
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBulletList()
              .run()
          }
        >
          • Liste
        </button>

        <button
          type="button"
          className={
            editor.isActive(
              "orderedList",
            )
              ? "toolbar-button toolbar-button-active"
              : "toolbar-button"
          }
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleOrderedList()
              .run()
          }
        >
          1. Liste
        </button>
      </div>

      <EditorContent
        editor={editor}
      />
    </div>
  )
}

export default RichTextEditor