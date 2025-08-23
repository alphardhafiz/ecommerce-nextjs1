import { z } from "zod";

export const ALLOW_MIME_TYPES = [
  "image/jpg",
  "image/jpeg",
  "image/png",
  "image/webp",
  "images/jfif",
];

export const schemaSignIn = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(5, { message: "Password must be at least 5 characters long" }),
});

export const schemaSignUp = schemaSignIn.extend({
  name: z
    .string({ required_error: "Name is required" })
    .min(4, { message: "Name should have min 4 characters" }),
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
      message: "Only .jpg, .jpeg, .jfif, .png, .webp formats are supported",
    })
    .refine((file) => file?.name, { message: "Image is required" }),
});

export const schemaProduct = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(4, { message: "Name should have min 4 characters" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(10, { message: "Description should have min 10 characters" }),
  price: z.string({ required_error: "Price is required" }),
  stock: z.string({ required_error: "Stock is required" }),
  brand_id: z.string({ required_error: "Brand is required" }),
  category_id: z.string({ required_error: "Category is required" }),
  location_id: z.string({ required_error: "Location is required" }),
  images: z
    .any()
    .refine((files: File[]) => files.length === 3, {
      message: "Please upload 3 images of the product",
    })
    .refine(
      (files: File[]) => {
        let validate = false;

        Array.from(files).find((file) => {
          validate = ALLOW_MIME_TYPES.includes(file.type);
        });

        return validate;
      },
      {
        message: "Only .jpg, .png, .webp formats are supported",
      }
    ),
});

export const schemaProductEdit = schemaProduct
  .extend({
    id: z.number({ required_error: "Product Id is required" }),
  })
  .omit({
    images: true,
  });

export const schemaForgotPassword = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email format" }),
});

export const schemaResetPassword = z
  .object({
    password: z
      .string({ required_error: "Password is required" })
      .min(5, { message: "Password must be at least 5 characters long" }),
    confirmPassword: z.string({
      required_error: "Confirm Password is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
