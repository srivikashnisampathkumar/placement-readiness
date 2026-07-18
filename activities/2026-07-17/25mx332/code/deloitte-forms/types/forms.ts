export interface Field {
  id: string;
  label: string;

  type: "text" | "number" | "checkbox" | "group";

  required?: boolean;

  children?: Field[];

  validation?: {
    min?: number;
    message?: string;
  };

  showIf?: {
    field: string;
    equals: any;
  };
}

export interface FormSchema {
  title: string;
  fields: Field[];
}