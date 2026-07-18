# Dynamic JSON Form Generator

## Overview

A JSON-driven dynamic questionnaire builder built using Next.js, React, and TypeScript.

The application generates complex forms dynamically from a JSON schema and supports nested sections, conditional rendering, and validation.

---

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

---

## Features

### Dynamic Rendering

Forms are generated completely from JSON configuration.

Changing the JSON schema changes the UI without modifying React components.

### Nested Questionnaire

Supports recursive sections and child questions.

Example:

Personal Information

- Name
- Age

Employment

- Company
- Experience


### Conditional Logic

Fields can depend on other answers.

Example:

If:

Currently Employed = true

Show:

Company Name


### Validation

Supported validations:

- Required fields
- Minimum numeric values


---

## Architecture
JSON Schema

↓

FormGenerator

↓

Recursive Renderer

↓

FieldRenderer

↓

React State

↓

Validation

↓

Submit

---

## Folder Structure
app/
components/
schema/
types/

---

## Complexity Analysis

Let N = number of fields.

### Rendering

Each field is processed once.

Time Complexity:

O(N)


### Validation

Each field is checked once.

Time Complexity:

O(N)


### Memory

Form state stores one value per field.

Space Complexity:

O(N)

---

## Future Improvements

- Backend persistence
- Drag and drop form builder
- Async validation
- Unit testing
- JSON Schema standard support