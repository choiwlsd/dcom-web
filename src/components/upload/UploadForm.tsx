import { useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { IoAdd, IoAttach, IoClose } from "react-icons/io5";
import { Button } from "../ui/Button";

type UploadMode = "exam" | "gallery";

type UploadFormProps = {
  mode: UploadMode;
  title: string;
  initialSubject?: string;
  initialProfessor?: string;
};

const semesterOptions = ["2026-1", "2025-2", "2025-1", "2024-2"];
const examTypeOptions = ["중간고사", "기말고사", "퀴즈", "과제"];

export default function UploadForm({
  mode,
  title,
  initialSubject = "",
  initialProfessor = "",
}: UploadFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [descriptionHtml, setDescriptionHtml] = useState("");

  const isExam = mode === "exam";
  const placeholder = isExam ? "자료 설명을 입력하세요" : "사진 설명을 입력하세요";
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        autolink: true,
        openOnClick: false,
        defaultProtocol: "https",
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "min-h-[210px] text-sm leading-6 text-gray-800 outline-none [&_.is-editor-empty:first-child::before]:float-left [&_.is-editor-empty:first-child::before]:h-0 [&_.is-editor-empty:first-child::before]:text-gray-300 [&_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)]",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      setDescriptionHtml(currentEditor.getHTML());
    },
    immediatelyRender: false,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const removeFile = (fileToRemove: File) => {
    setFiles((currentFiles) =>
      currentFiles.filter((file) => file !== fileToRemove),
    );

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const setLink = () => {
    if (!editor) {
      return;
    }

    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("링크 URL", previousUrl ?? "");

    if (url === null) {
      return;
    }

    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <section className="mx-auto w-full max-w-[1100px] px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-9 text-center text-2xl font-bold text-[#4988C4]">
        {title}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="relative min-h-[420px] rounded-xl border border-gray-200 bg-white px-6 pb-6 pt-7 shadow-sm sm:px-8">
          <button
            type="button"
            aria-label="닫기"
            className="absolute right-5 top-5 text-gray-300 transition-colors hover:text-gray-500"
            onClick={() => window.history.back()}
          >
            <IoClose size={16} />
          </button>

          {isExam ? (
            <div className="grid gap-x-7 gap-y-5 sm:grid-cols-2">
              <Field
                label="과목명"
                name="subject"
                placeholder="과목명"
                defaultValue={initialSubject}
              />
              <Field
                label="교수명"
                name="professor"
                placeholder="OOO 교수"
                defaultValue={initialProfessor}
              />
              <SelectField label="학기" name="semester" options={semesterOptions} />
              <SelectField
                label="시험 유형"
                name="examType"
                options={examTypeOptions}
              />
            </div>
          ) : (
            <div className="grid gap-x-7 gap-y-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="제목" name="title" placeholder="제목" />
              </div>
              <IconField
                label="날짜"
                name="date"
                placeholder="날짜"
                type="date"
              />
              <IconField label="위치" name="location" placeholder="위치" />
            </div>
          )}

          <EditorContent
            editor={editor}
            aria-label="본문"
            className="mt-6 min-h-[210px] w-full"
          />
          <input
            type="hidden"
            name="description"
            value={descriptionHtml}
            readOnly
          />

          {files.length > 0 && (
            <ul className="mb-4 space-y-2">
              {files.map((file) => (
                <li
                  key={`${file.name}-${file.size}-${file.lastModified}`}
                  className="flex w-fit items-center gap-1 text-xs"
                >
                  <span className="text-[#4988C4] underline underline-offset-2">
                    {file.name}
                  </span>
                  <button
                    type="button"
                    aria-label={`${file.name} 삭제`}
                    className="flex size-4 items-center justify-center rounded-full text-gray-300 transition-colors hover:bg-gray-100 hover:text-gray-500"
                    onClick={() => removeFile(file)}
                  >
                    <IoClose size={12} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-wrap items-center gap-1 rounded-full bg-[#F4F7FB] px-2 py-1 text-[11px] text-gray-500 sm:w-fit">
            <ToolbarButton
              label="되돌리기"
              onClick={() => editor?.chain().focus().undo().run()}
              disabled={!editor?.can().undo()}
            >
              ↶
            </ToolbarButton>
            <ToolbarButton
              label="다시 실행"
              onClick={() => editor?.chain().focus().redo().run()}
              disabled={!editor?.can().redo()}
            >
              ↷
            </ToolbarButton>
            <select
              aria-label="글꼴"
              className="bg-transparent px-1 text-[11px] outline-none"
              defaultValue="Sans Serif"
            >
              <option>Sans Serif</option>
              <option>Serif</option>
              <option>Mono</option>
            </select>
            <ToolbarButton
              label="굵게"
              isActive={editor?.isActive("bold")}
              onClick={() => editor?.chain().focus().toggleBold().run()}
            >
              B
            </ToolbarButton>
            <ToolbarButton
              label="기울임"
              isActive={editor?.isActive("italic")}
              onClick={() => editor?.chain().focus().toggleItalic().run()}
            >
              I
            </ToolbarButton>
            <ToolbarButton
              label="밑줄"
              isActive={editor?.isActive("underline")}
              onClick={() => editor?.chain().focus().toggleUnderline().run()}
            >
              U
            </ToolbarButton>
            <ToolbarButton
              label="취소선"
              isActive={editor?.isActive("strike")}
              onClick={() => editor?.chain().focus().toggleStrike().run()}
            >
              S
            </ToolbarButton>
            <ToolbarButton
              label="글머리 기호"
              isActive={editor?.isActive("bulletList")}
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
            >
              •
            </ToolbarButton>
            <ToolbarButton
              label="번호 목록"
              isActive={editor?.isActive("orderedList")}
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
            >
              1.
            </ToolbarButton>
            <ToolbarButton
              label="링크"
              isActive={editor?.isActive("link")}
              onClick={setLink}
            >
              🔗
            </ToolbarButton>
            <button
              type="button"
              className="rounded-full px-2 py-1 hover:bg-white"
              onClick={() => fileInputRef.current?.click()}
            >
              <IoAttach />
            </button>
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(event) => {
            setFiles(Array.from(event.target.files ?? []));
          }}
        />

        <div className="mt-5 flex items-center gap-4">
          <button
            type="button"
            aria-label="업로드 항목 추가"
            className="mx-auto flex h-9 w-full max-w-[500px] items-center justify-center rounded-full bg-gray-200 text-[#0F2854] transition-colors hover:bg-gray-300"
          >
            <IoAdd size={14} />
          </button>

          <Button
            type="submit"
            variant="primary"
            fullWidth={false}
            className="h-9 min-w-[74px] rounded-full bg-[#4B7FF3] px-5 py-0 text-xs hover:bg-[#3767D7]"
          >
            업로드
          </Button>
        </div>
      </form>
    </section>
  );
}

function ToolbarButton({
  children,
  label,
  isActive = false,
  disabled = false,
  onClick,
}: {
  children: ReactNode;
  label: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      className={`min-w-6 rounded-full px-1 py-1 font-medium transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-35 ${
        isActive ? "bg-white text-[#4988C4] shadow-sm" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

type FieldProps = {
  label: string;
  name: string;
  placeholder: string;
  defaultValue?: string;
};

function Field({ label, name, placeholder, defaultValue }: FieldProps) {
  return (
    <label className="block border-b border-gray-200 pb-2">
      <span className="block text-xs font-medium text-gray-500">{label}</span>
      <input
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mt-2 w-full text-sm font-medium text-gray-900 outline-none placeholder:text-gray-300"
      />
    </label>
  );
}

function IconField({
  label,
  name,
  placeholder,
  type = "text",
}: FieldProps & { type?: string }) {
  return (
    <label className="block border-b border-gray-200 pb-2">
      <span className="block text-xs font-medium text-gray-500">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full text-sm font-medium text-gray-900 outline-none placeholder:text-gray-300"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="block border-b border-gray-200 pb-2">
      <span className="block text-xs font-medium text-gray-500">{label}</span>
      <select
        name={name}
        className="mt-2 w-full bg-transparent text-sm font-medium text-gray-900 outline-none"
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
