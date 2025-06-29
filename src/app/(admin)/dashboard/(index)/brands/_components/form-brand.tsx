"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ChevronLeft,
  Upload,
  X,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ActionResult } from "@/types";
import { useFormState, useFormStatus } from "react-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Brand } from "@prisma/client";
import { postBrand, updateBrand } from "../lib/actions";
import Image from "next/image";
import { getImageUrl } from "@/lib/supabase";
import FileUpload from "../../_components/file-upload";
import SubmitButton from "../../_components/submit-button";

const initialState: ActionResult = {
  error: "",
};

interface FormBrandProps {
  type?: "ADD" | "EDIT";
  data?: Brand | null;
}

// function FileUpload({
//   onFileSelect,
//   initialPreview = null,
//   initialFileName = null,
// }: {
//   onFileSelect: (file: File | null) => void;
//   initialPreview?: string | null; // Tambahkan properti ini
//   initialFileName?: string | null;
// }) {
//   const [isDragOver, setIsDragOver] = useState(false);
//   const [preview, setPreview] = useState<string | null>(initialPreview);
//   const [fileName, setFileName] = useState<string>(initialFileName || "");
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     setPreview(initialPreview);
//     setFileName(initialFileName || "");
//   }, [initialPreview, initialFileName]);

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(true);
//   };

//   const handleDragLeave = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(false);
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     setIsDragOver(false);

//     const files = e.dataTransfer.files;
//     if (files.length > 0) {
//       handleFileSelect(files[0]);
//     }
//   };

//   const handleFileSelect = (file: File) => {
//     if (file && file.type.startsWith("image/")) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setPreview(e.target?.result as string);
//       };
//       reader.readAsDataURL(file);
//       setFileName(file.name);
//       onFileSelect(file);
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       handleFileSelect(file);
//     }
//   };

//   const handleRemove = () => {
//     setPreview(null);
//     setFileName("");
//     onFileSelect(null);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = "";
//     }
//   };

//   const handleClick = () => {
//     fileInputRef.current?.click();
//   };

//   return (
//     <div className="grid gap-3">
//       <Label htmlFor="logo">Logo Brand</Label>

//       {/* Hidden file input */}
//       <input
//         ref={fileInputRef}
//         id="logo"
//         type="file"
//         name="image"
//         accept="image/*"
//         onChange={handleInputChange}
//         className="hidden"
//       />

//       {/* Custom file upload area */}
//       <div
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//         onClick={handleClick}
//         className={`
//           relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 cursor-pointer
//           ${
//             isDragOver
//               ? "border-blue-500 bg-blue-950/50"
//               : "border-gray-600 hover:border-gray-500"
//           }
//           ${preview ? "bg-gray-900" : "bg-gray-950"}
//         `}
//       >
//         {preview ? (
//           // Preview mode
//           <div className="relative">
//             <div className="flex items-center gap-4">
//               <div className="relative w-36 h-36 rounded-lg overflow-hidden bg-gray-800">
//                 <Image
//                   src={preview}
//                   alt="Preview"
//                   className="object-cover"
//                   fill
//                 />
//               </div>
//               <div className="flex-1">
//                 <p className="text-sm font-medium text-gray-100">{fileName}</p>
//                 <p className="text-xs text-gray-400">
//                   Klik untuk mengubah atau drag & drop gambar baru
//                 </p>
//               </div>
//               <Button
//                 type="button"
//                 variant="ghost"
//                 size="sm"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleRemove();
//                 }}
//                 className="text-red-700 hover:bg-red-950"
//               >
//                 <X className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         ) : (
//           // Upload prompt
//           <div className="text-center">
//             <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800">
//               <Upload className="h-6 w-6 text-gray-400" />
//             </div>
//             <div className="space-y-2">
//               <p className="text-sm font-medium text-gray-100">
//                 Drag & drop gambar atau klik untuk upload
//               </p>
//               <p className="text-xs text-gray-400">PNG, JPG, GIF hingga 10MB</p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* File format info */}
//       <div className="flex items-center gap-2 text-xs text-gray-400">
//         <ImageIcon className="h-3 w-3" />
//         <span>Format yang didukung: PNG, JPG, JPEG, GIF, WebP</span>
//       </div>
//     </div>
//   );
// }

export default function FormBrand({
  data = null,
  type = "ADD",
}: FormBrandProps) {
  const updateBrandWithId = (_: unknown, formData: FormData) =>
    updateBrand(_, formData, data?.id ?? 0);

  const [state, formAction] = useFormState(
    type === "ADD" ? postBrand : updateBrandWithId,
    initialState
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const initialPreview = data?.logo ? getImageUrl(data.logo) : null;
  const initialFileName = data?.logo ? data.logo : null;

  return (
    <form action={formAction}>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
              <Link href="/dashboard/brands">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Brand Controller
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <SubmitButton type="Brand" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0" className="w-[800px]">
                <CardHeader>
                  <CardTitle>Brand Details</CardTitle>
                  <CardDescription>
                    Masukkan detail brand termasuk nama dan logo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {state.error !== "" && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{state.error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Nama Brand</Label>
                      <Input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Masukkan nama brand..."
                        className="w-full"
                        defaultValue={data?.name}
                      />
                    </div>

                    <FileUpload
                      onFileSelect={setSelectedFile}
                      initialPreview={initialPreview}
                      initialFileName={initialFileName}
                      label="Logo Brand"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm">Save Brand</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
