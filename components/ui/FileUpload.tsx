"use client";

import { useRef, useState } from "react";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE_MB } from "@/lib/constants";

interface FileUploadProps {
  label: string;
  fieldName: string;
  hint?: string;
  required?: boolean;
  optional?: boolean;
  error?: string;
  onFileSelect: (file: File, fieldName: string, base64: string) => void;
  onFileRemove: (fieldName: string) => void;
  currentFileName?: string;
}

export default function FileUpload({
  label,
  fieldName,
  hint,
  required,
  optional: _optional,
  error,
  onFileSelect,
  onFileRemove,
  currentFileName,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [localError, setLocalError] = useState<string>();

  const validate = (file: File): string | null => {
    if (!ALLOWED_FILE_TYPES.includes(file.type))
      return "Nur PDF, JPG und PNG erlaubt.";
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024)
      return `Datei darf max. ${MAX_FILE_SIZE_MB} MB groß sein.`;
    return null;
  };

  const handle = (file: File) => {
    const err = validate(file);
    if (err) { setLocalError(err); return; }
    setLocalError(undefined);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1] ?? result;
      onFileSelect(file, fieldName, base64);
    };
    reader.readAsDataURL(file);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handle(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handle(file);
  };

  const displayError = localError ?? error;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="text-sm font-semibold text-neutral-800">
        {label}
        {required && <span className="text-brand-danger ml-1" aria-label="Pflichtfeld">*</span>}
      </div>

      {currentFileName ? (
        <div className="flex items-center gap-3 p-4 border border-brand-success rounded-sm bg-green-50">
          <svg width={20} height={20} viewBox="0 0 20 20" fill="none" stroke="#6BAD7A" strokeWidth={1.7} strokeLinecap="round" aria-hidden>
            <path d="M5 3h7l3 3v11H5z" /><path d="M12 3v3h3" />
          </svg>
          <span className="flex-1 text-sm font-medium text-neutral-800 truncate">{currentFileName}</span>
          <button
            type="button"
            onClick={() => { onFileRemove(fieldName); if (inputRef.current) inputRef.current.value = ""; }}
            className="text-xs text-neutral-500 hover:text-brand-danger underline"
          >
            Entfernen
          </button>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          className={`border-2 border-dashed rounded-sm p-6 text-center transition-colors cursor-pointer
            ${dragging ? "border-brand-accent bg-brand-accent-soft" : displayError ? "border-brand-danger" : "border-neutral-300 hover:border-neutral-500"}`}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          aria-label={`${label} – Datei auswählen`}
        >
          <svg className="mx-auto mb-2 text-neutral-400" width={24} height={24} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" aria-hidden>
            <path d="M10 14V4m-4 4 4-4 4 4" /><path d="M3 14v2a1 1 0 001 1h12a1 1 0 001-1v-2" />
          </svg>
          <p className="text-sm font-medium text-neutral-700">Datei auswählen oder hierher ziehen</p>
          <p className="text-xs text-neutral-500 mt-1">PDF, JPG, PNG · max. {MAX_FILE_SIZE_MB} MB</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={onInputChange}
        className="hidden"
        aria-hidden
      />

      {hint && !displayError && <p className="text-xs text-neutral-600">{hint}</p>}
      {displayError && (
        <p role="alert" className="field-error">
          <svg width={14} height={14} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" aria-hidden>
            <path d="M10 3 2.5 16h15z" /><path d="M10 8v4m0 2v.01" />
          </svg>
          {displayError}
        </p>
      )}
    </div>
  );
}
