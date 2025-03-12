interface InputProps {
  name?: string;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: string;
}

export function TextInput({ id, name, value, onChange, width }: InputProps) {
  return (
    <input
      id={id}
      name={name}
      type="text"
      value={value}
      onChange={onChange}
      style={{
        width: width || "12rem",
        padding: "6px",
        border: "1px solid",
        borderRadius: "5px",
      }}
    />
  );
}
