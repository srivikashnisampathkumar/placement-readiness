# Reflection

This project helped me understand how large-scale applications can separate business configuration from UI implementation.

The main design decision was building a JSON-driven rendering system instead of creating individual hardcoded forms.

The biggest challenge was implementing conditional fields and nested questionnaires while keeping the components reusable.

Using recursive rendering allowed the form generator to support unlimited nesting without increasing code complexity.

The validation system was designed to work directly from schema rules, allowing new validations to be added without modifying UI components.

If I had more time, I would improve the project by adding:

- Automated tests
- API integration
- Drag-and-drop questionnaire builder
- More advanced validation rules
- Form persistence