# Reflection - Dynamic JSON Driven Form Generator

## 1. Overview

This project involved building a dynamic JSON-driven form generator using React/Next.js. 
The objective was to create a reusable form system that can render complex questionnaires 
based on a JSON schema, support validation rules, and handle conditional field rendering.

The main focus was designing a scalable solution where the form structure can be modified 
without changing the application code.



# 2. Approach Taken

The application was designed using a schema-driven architecture.

The JSON schema defines:

- Field names
- Field types
- Labels
- Validation rules
- Dropdown options
- Conditional rendering logic

The React application reads this schema and dynamically generates form components.

The major components created were:

- DynamicForm component
- FormField component
- Validation module
- Conditional rendering logic



# 3. Technical Decisions

## JSON-Based Configuration

Instead of hardcoding form fields, a JSON configuration was used.

Advantages:

- Easy modification of forms
- Supports multiple questionnaires
- Reduces code duplication
- Improves maintainability


Example:

```json
{
 "name":"age",
 "type":"number",
 "validation":{
    "min":18
 }
}
