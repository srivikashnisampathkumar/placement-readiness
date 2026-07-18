# Reflection

## Approach

The primary objective was to create a reusable form engine rather than building a static form.

I chose a JSON-driven architecture because consulting projects frequently require questionnaires that change over time. Instead of modifying React components, only the JSON schema needs to be updated.

The application separates responsibilities into three layers:

- Schema Definition
- Rendering Engine
- Validation Engine

This improves maintainability and scalability.

---

## Challenges

### Conditional Rendering

One challenge was ensuring fields appear and disappear dynamically based on previous answers.

Example:

```
Employed

↓

Company Name
```

The solution was to add a `showIf` property in the schema.

---

### Validation

The validation logic had to remain generic instead of being hardcoded.

Using React Hook Form with Zod simplified this process while keeping the code reusable.

---

## Design Decisions

- JSON schema for flexibility
- React Hook Form for performance
- Zod for validation
- Component-based rendering
- TypeScript for type safety

---

## What Could Be Improved

If more time were available, I would implement:

- Recursive nested forms
- Multi-page questionnaires
- Schema editor UI
- Server-side schema loading
- Unit tests
- Accessibility improvements

---

## Key Learning

This project reinforced the importance of separating data from presentation. A JSON-driven architecture makes applications easier to maintain, extend, and reuse across multiple consulting projects.
