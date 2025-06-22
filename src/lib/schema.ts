import { z } from "zod";

export const ALLOW_MIME_TYPES = ["image/jpg", "image/jpeg", "image/png"];

export const schemaSignIn = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(5, { message: "Password must be at least 5 characters long" }),
});

export const schemaCategory = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(4, { message: "Name should have min 4 characters" }),
});

export const schemaLocation = schemaCategory.extend({});

export const schemaBrand = schemaCategory.extend({
  image: z
    // .any()
    .instanceof(File, { message: "Image is required" })
    .refine((file) => ALLOW_MIME_TYPES.includes(file.type), {
      message: "Only .jpg, .png, .webp formats are supported",
    })
    .refine((file) => file?.name, { message: "Image is required" }),
});
