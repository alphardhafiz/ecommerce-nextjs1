import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImageIcon, Upload, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  initialPreview?: string | null; // Tambahkan properti ini
  initialFileName?: string | null;
  label: string;
}

export default function FileUpload({
  onFileSelect,
  initialPreview = null,
  initialFileName = null,
  label,
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(initialPreview);
  const [fileName, setFileName] = useState<string>(initialFileName || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(initialPreview);
    setFileName(initialFileName || "");
  }, [initialPreview, initialFileName]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setFileName("");
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="grid gap-3">
      <Label htmlFor="logo">{label}</Label>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        id="logo"
        type="file"
        name="image"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />

      {/* Custom file upload area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 cursor-pointer
          ${
            isDragOver
              ? "border-blue-500 bg-blue-950/50"
              : "border-gray-600 hover:border-gray-500"
          }
          ${preview ? "bg-gray-900" : "bg-gray-950"}
        `}
      >
        {preview ? (
          // Preview mode
          <div className="relative">
            <div className="flex items-center gap-4">
              <div className="relative w-36 h-36 rounded-lg overflow-hidden bg-gray-800">
                <Image
                  src={preview}
                  alt="Preview"
                  className="object-cover"
                  fill
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-100">{fileName}</p>
                <p className="text-xs text-gray-400">
                  Klik untuk mengubah atau drag & drop gambar baru
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="text-red-700 hover:bg-red-950"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          // Upload prompt
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800">
              <Upload className="h-6 w-6 text-gray-400" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-100">
                Drag & drop gambar atau klik untuk upload
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, GIF hingga 10MB</p>
            </div>
          </div>
        )}
      </div>

      {/* File format info */}
      <div className="flex items-center gap-2 text-xs text-gray-400">
        <ImageIcon className="h-3 w-3" />
        <span>Format yang didukung: PNG, JPG, JPEG, GIF, WebP</span>
      </div>
    </div>
  );
}
