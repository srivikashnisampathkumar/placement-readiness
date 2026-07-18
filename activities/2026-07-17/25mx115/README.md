# Dynamic JSON Form Generator — Deloitte USI Mission 2

## Problem Statement

Build a dynamic, JSON-schema-driven form generator in React/Next.js that:
- Renders form fields based on a config array (not hardcoded JSX per field)
- Enforces validation rules (e.g., age must be greater than 18)
- Supports conditional logic (e.g., show "Company Name" only if "Employed" is Yes)

## Architecture

### Core idea: Schema-driven rendering

Instead of writing a fixed set of `<input>` elements, the entire form is described as an array of field objects (`formSchema.ts`). The `DynamicForm` component loops over this array and decides *how* to render each field based on its `type`, and *whether* to render it based on its `showIf` condition.

```
formSchema.ts  →  DynamicForm.tsx  →  Rendered UI
   (config)         (interpreter)      (React elements)
```

This separates **what the form contains** (data) from **how the form behaves** (logic). Adding a new field to the questionnaire means adding an object to the schema array — no changes to the rendering component are needed, unless a genuinely new input `type` is introduced.

### Schema shape

Each field is an object with:

| Key        | Purpose                                                              |
|------------|-----------------------------------------------------------------------|
| `id`       | Unique key, used as the form-state key and React `key`               |
| `label`    | Display text                                                          |
| `type`     | Controls which input renders: `text`, `number`, `select`, `checkbox`, `radio` |
| `required` | Whether validation should reject an empty value                      |
| `options`  | Used by `select` and `radio` types                                    |
| `showIf`   | Optional `{ field, value }` pair — field only renders if `formData[field] === value` |

### Conditional logic (`showIf`)

Before rendering a field, `DynamicForm` checks:

```ts
if (field.showIf && formData[field.showIf.field] !== field.showIf.value) {
  return null;
}
```

This is a **direct dependency lookup**, not a full dependency graph — a field can depend on exactly one other field's exact value. It's intentionally simple: sufficient for this questionnaire's needs (radio "Employed" → text "Company Name"), and easy to reason about. It does not currently support multi-condition logic (AND/OR across multiple fields) — see Trade-offs below.

### Validation

Validation runs once, on submit, over the full schema:

```ts
formSchema.forEach((field) => {
  if (field.required && !formData[field.id]) { ... }
  if (field.id === "age" && Number(formData.age) <= 18) { ... }
});
```

Two validation rules are enforced:
1. **Required-field check** — generic, driven by the `required` flag in the schema.
2. **Age check** — currently hardcoded to the `age` field id, enforcing `age > 18` per the brief.

## Big-O Analysis

Let **n** = number of fields in the schema, **m** = number of keys currently in `formData`.

| Operation                         | Complexity | Why |
|------------------------------------|------------|-----|
| Rendering the form                 | O(n)       | Single pass over the schema array; each field renders independently |
| `showIf` check per field           | O(1)       | Direct object-key lookup (`formData[field]`), not a search |
| Total conditional-render overhead  | O(n)       | O(1) check × n fields |
| Validation on submit               | O(n)       | Single pass over schema, each rule is O(1) work |
| Field update (`handleChange`)      | O(m)       | Spreading `formData` (`{ ...prev, [id]: value }`) copies all existing keys; this is the main cost of every keystroke |
| Overall form interaction (typing)  | O(m) per keystroke | Acceptable for small forms (m stays in single digits to low tens); would need optimization (e.g. field-level state, `useReducer` with targeted updates, or a library like React Hook Form) if the schema scaled to hundreds of fields |

**Space complexity:** O(n) for the schema itself, O(m) for `formData`/`errors`, both bounded by the number of fields — no hidden growth.

## Design Trade-offs

- **Single flat schema array vs. nested schema tree.** A flat array keeps the renderer simple (one loop, one `switch`-like ternary chain) and is easy to validate and iterate. The trade-off is that deeply nested/repeatable question groups (e.g. "list your last 3 jobs") aren't naturally expressible without extending the schema to support arrays-of-schemas per field. This wasn't required by the current questionnaire, so it was deferred.
- **`showIf` as single-condition equality vs. an expression engine.** A full rule engine (supporting AND/OR/NOT across multiple fields) would be more powerful but adds real complexity and a class of bugs (short-circuit ordering, comparator functions, serialization) that isn't justified for a two-branch questionnaire. The simple equality check covers the required case (`employed === "Yes"` → show company name) with minimal surface area.
- **Full-object spread on every keystroke vs. field-level state.** Using one `formData` object with `{ ...prev, [id]: value }` is simple and keeps all form values in one place for easy validation and submission. At small scale (a handful of fields) this is negligible; it would need revisiting (e.g. `useReducer`, or splitting state per field) if the form grew to dozens/hundreds of fields, since every keystroke currently re-copies the entire object.
- **Radio buttons vs. checkbox for "Employed".** A checkbox only naturally represents a boolean toggle and doesn't label its two states explicitly. Since the requirement was showing/hiding a field based on an explicit "Yes"/"No" answer, radio buttons were used instead — they make both states equally visible and avoid ambiguity about what an unchecked box means (declined to answer vs. "No").

## Known Limitations / Future Improvements

- `showIf` supports only one dependency and one equality comparison; extending to multiple conditions would require changing it to accept an array of conditions or a small predicate function.
- Validation rules are partly generic (`required`) and partly hardcoded (`age > 18`). A more scalable version would move validation rules into the schema itself (e.g. `validate: { min: 19 }`) so `DynamicForm` stays fully generic and doesn't need field-specific `if` branches as more custom rules are added.
- No nested/repeatable field groups yet (e.g. arrays of sub-forms), which would be the natural next step for a "complex nested questionnaire."

## Tech Stack

- Next.js (App Router, Turbopack dev server)
- React (client component, `useState` for form + error state)
- Tailwind CSS for styling
- TypeScript