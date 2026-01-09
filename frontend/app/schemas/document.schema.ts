import { z } from "zod";

export const documentSchema = z.object({
  title: z.string().min(3, "Judul wajib diisi"),
  description: z.string().min(5),
  documentType: z.string().min(2),
  file: z.any()
    .refine(file => file?.length === 1, "File wajib diupload"),
});
