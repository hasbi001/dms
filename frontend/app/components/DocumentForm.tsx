import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../services/api";
import { documentSchema } from "../schemas/document.schema";

type DocForm = {
  title: string;
  description: string;
  documentType: string;
  file: FileList;
};

export default function DocumentForm({ onUploaded }: { onUploaded: () => void }) {
  const { register, handleSubmit, formState: { errors } } =
    useForm<DocForm>({ resolver: zodResolver(documentSchema) });

  const onSubmit = async (data: DocForm) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("documentType", data.documentType);
    formData.append("file", data.file[0]);

    await api.post("http://localhost:8080/api/documents", formData);
    onUploaded();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded shadow mb-4">
      <h2 className="font-bold mb-2">Upload Document</h2>

      <input {...register("title")} placeholder="Title" className="input" />
      <p className="error">{errors.title?.message}</p>

      <input {...register("description")} placeholder="Description" className="input" />
      <p className="error">{errors.description?.message}</p>

      <input {...register("documentType")} placeholder="Type" className="input" />
      <p className="error">{errors.documentType?.message}</p>

      <input type="file" {...register("file")} />
      <p className="error">{errors.file?.message as string}</p>

      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        Upload
      </button>
    </form>
  );
}
