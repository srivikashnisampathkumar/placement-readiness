import FormGenerator from "@/components/FormGenerator";
import { FormSchema } from "@/types/forms";
import schemaJson from "@/schema/questionnaire.json";

export default function Home() {
  const schema = schemaJson as FormSchema;
  return (
    <main className="max-w-xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8">{schema.title}</h1>

      <FormGenerator schema={schema} />
    </main>
  );
}