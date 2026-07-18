"use client";

import { useState } from "react";
import FieldRenderer from "./FieldRenderer";
import { FormSchema, Field } from "@/types/forms";

type Props = {
  schema: FormSchema;
};

export default function FormGenerator({ schema }: Props) {
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update form values
  const handleChange = (id: string, value: any) => {
    setValues((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear error while typing
    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  // Recursive validation
  const validateFields = (
    fields: Field[],
    newErrors: Record<string, string>
  ) => {
    fields.forEach((field) => {
      // Handle nested groups
      if (field.type === "group") {
        validateFields(field.children || [], newErrors);
        return;
      }

      // Skip hidden fields
      if (
        field.showIf &&
        values[field.showIf.field] !== field.showIf.equals
      ) {
        return;
      }

      const value = values[field.id];

      // Required validation
      if (field.required) {
        if (
          value === undefined ||
          value === "" ||
          value === null
        ) {
          newErrors[field.id] = "This field is required";
          return;
        }
      }

      // Number validation
      if (
        field.type === "number" &&
        field.validation?.min !== undefined
      ) {
        if (Number(value) < field.validation.min) {
          newErrors[field.id] =
            field.validation.message ??
            `Minimum value is ${field.validation.min}`;
        }
      }
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    validateFields(schema.fields, newErrors);

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    console.log("Submitted Form:", values);

    alert("Form submitted successfully!");

    // Uncomment to clear form after submission
    // setValues({});
    // setErrors({});
  };

  // Recursive renderer
  const renderFields = (fields: Field[]) => {
    return fields.map((field) => {
      // Skip hidden fields
      if (
        field.showIf &&
        values[field.showIf.field] !== field.showIf.equals
      ) {
        return null;
      }

      // Render nested group
      if (field.type === "group") {
        return (
          <div
            key={field.id}
            className="border rounded-xl p-5 bg-gray-50 shadow-sm space-y-5"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {field.label}
            </h2>

            {renderFields(field.children || [])}
          </div>
        );
      }

      // Render normal field
      return (
        <div key={field.id}>
          <label className="block mb-2 font-medium text-gray-700">
            {field.label}

            {field.required && (
              <span className="text-red-500 ml-1">*</span>
            )}
          </label>

          <FieldRenderer
            field={field}
            value={values[field.id]}
            onChange={handleChange}
          />

          {errors[field.id] && (
            <p className="text-red-500 text-sm mt-1">
              {errors[field.id]}
            </p>
          )}
        </div>
      );
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        {schema.title}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {renderFields(schema.fields)}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg"
        >
          Submit
        </button>
      </form>

      {/* Debug Panel */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-2">
          Current Form State
        </h2>

        <pre className="bg-gray-100 rounded-lg p-4 overflow-auto text-sm">
          {JSON.stringify(values, null, 2)}
        </pre>
      </div>
    </div>
  );
}