import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Bold, Italic, Underline, Undo2, Redo2 } from 'lucide-react'

interface Props {
    content: string
    onChange: (html: string) => void
}

export default function CoverLetterEditor({ content, onChange }: Props) {
    const editor = useEditor({
        extensions: [StarterKit],
        content,
        onUpdate: ({ editor }) => {
            onChange(editor.getText())
        }
    })

    if (!editor) return null

    return (
        <div className="border border-slate-200 rounded-xl overflow-hidden">

            {/* Toolbar */}
            <div className="flex flex-row items-center gap-1 px-3 py-2 border-b border-slate-100 bg-slate-50">
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    className={`p-1.5 rounded hover:bg-slate-200 transition-colors ${editor.isActive('bold') ? 'bg-slate-200' : ''}`}
                >
                    <Undo2 className="w-6 h-6 text-slate-600" />
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    className={`p-1.5 rounded hover:bg-slate-200 transition-colors ${editor.isActive('bold') ? 'bg-slate-200' : ''}`}
                >
                    <Redo2 className="w-6 h-6 text-slate-600" />
                </button>

                <div className="w-px h-6 bg-slate-200" />

                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`p-1.5 rounded hover:bg-slate-200 transition-colors ${editor.isActive('bold') ? 'bg-slate-200' : ''}`}
                >
                    <Bold className="w-6 h-6 text-slate-600" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`p-1.5 rounded hover:bg-slate-200 transition-colors ${editor.isActive('italic') ? 'bg-slate-200' : ''}`}
                >
                    <Italic className="w-6 h-6 text-slate-600" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`p-1.5 rounded hover:bg-slate-200 transition-colors ${editor.isActive('italic') ? 'bg-slate-200' : ''}`}
                >
                    <Underline className="w-6 h-6 text-slate-600" />
                </button>

            </div>

            {/* Editor */}
            <EditorContent
                editor={editor}
                className="p-6 min-h-64 text-sm text-slate-800 leading-relaxed focus:outline-none prose prose-sm max-w-none"
            />
        </div>
    )
}