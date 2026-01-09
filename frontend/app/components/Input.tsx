import { FieldError } from "react-hook-form";

interface Props {
  label: string;
  type?: string;
  register: any;
  error?: FieldError;
}

const Input: React.FC<Props> = ({ label, type = "text", register, error }) => {
  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <input
        type={type}
        {...register}
        className={`w-full border rounded px-3 py-2 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default Input;
