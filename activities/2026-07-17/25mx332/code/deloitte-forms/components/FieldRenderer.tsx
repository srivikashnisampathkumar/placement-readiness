import { Field } from "@/types/forms";

type Props = {
  field: Field;
  value: any;
  onChange: (id: string, value: any) => void;
};

export default function FieldRenderer({
  field,
  value,
  onChange,
}: Props) {
  switch (field.type) {
    case "text":
      return (
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(field.id, e.target.value)}
          className="border rounded p-2 w-full"
        />
      );

    case "number":
      return (
        <input
          type="number"
          value={value || ""}
          onChange={(e) => onChange(field.id, Number(e.target.value))}
          className="border rounded p-2 w-full"
        />
      );

    case "checkbox":
      return (
        <input
          type="checkbox"
          checked={value || false}
          onChange={(e) => onChange(field.id, e.target.checked)}
        />
      );

    default:
      return null;
  }
}