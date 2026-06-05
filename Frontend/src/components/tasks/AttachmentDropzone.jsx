import { useDropzone } from "react-dropzone";
import { UploadCloud, File as FileIcon, X, Image as ImageIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import { formatBytes } from "../../utils/format";

export const AttachmentDropzone = ({ files = [], onChange }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (accepted) => onChange([...files, ...accepted]),
    maxSize: 5 * 1024 * 1024,
  });

  const removeAt = (index) =>
    onChange(files.filter((_, i) => i !== index));

  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-4 py-6 text-center transition-colors",
          isDragActive
            ? "border-brand bg-brand-soft"
            : "border-border-strong hover:border-brand hover:bg-canvas"
        )}
      >
        <input {...getInputProps()} />
        <UploadCloud className="h-6 w-6 text-brand" />
        <p className="mt-2 text-sm font-medium text-foreground">
          {isDragActive ? "Drop files here" : "Drag & drop files, or click to browse"}
        </p>
        <p className="mt-0.5 text-xs text-faint">Up to 5MB each</p>
      </div>

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, i) => {
            const isImage = file.type?.startsWith("image/");
            return (
              <li
                key={`${file.name}-${i}`}
                className="flex items-center gap-3 rounded-xl border border-border-subtle bg-canvas/60 px-3 py-2"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand">
                  {isImage ? (
                    <ImageIcon className="h-4 w-4" />
                  ) : (
                    <FileIcon className="h-4 w-4" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {file.name}
                  </p>
                  <p className="text-xs text-faint">{formatBytes(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  className="grid h-7 w-7 place-items-center rounded-lg text-faint hover:bg-surface hover:text-danger"
                  aria-label="Remove file"
                >
                  <X className="h-4 w-4" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
