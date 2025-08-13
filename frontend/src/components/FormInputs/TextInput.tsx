import { TextField } from "@mui/material";

interface TextInputProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string | boolean;
}

const TextInput = ({
  name,
  value,
  onChange,
  type = "text",
}: TextInputProps) => {
  return (
    <TextField
      fullWidth
      slotProps={{
        input: { className: "h-10 px-3 py-2" },
        htmlInput: { className: "!p-0" },
      }}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
    />
  );
};

export default TextInput;
