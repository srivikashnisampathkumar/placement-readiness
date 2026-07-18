README.md Points
Architecture
JSON Schema
      |
      |
Dynamic Form Renderer
      |
      |
React Components
      |
      |
Validation Engine
      |
      |
User Input
Design Decisions

1. JSON-driven approach

Forms can be changed without modifying UI code.

2. Component-based design

Reusable components:
Text field
Dropdown
Number field

3. Conditional rendering

Improves user experience by hiding irrelevant fields.
Big-O Analysis
Rendering fields

For n fields:

Time Complexity: O(n)
Space Complexity: O(n)
Validation

Each field is checked once:

Time Complexity: O(n)
Conditional checks

Each condition is evaluated once:

Time Complexity: O(n)
