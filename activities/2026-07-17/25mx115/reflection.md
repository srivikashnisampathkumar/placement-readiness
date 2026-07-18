# Reflection — Dynamic JSON Form Generator

## What I Built

A schema-driven form generator where a single JSON config (`formSchema.ts`) describes every field, and one React component (`DynamicForm.tsx`) interprets that config to render inputs, apply conditional visibility (`showIf`), and validate on submit. Adding or changing a question means editing the schema, not the component.

## What Was Hard

**1. A rendering bug that looked like a styling bug, but wasn't.**
My "Are you employed?" field was supposed to become a Yes/No choice with a conditional "Company Name" field underneath, but on screen it just showed an empty, non-functional-looking square. My first instinct was to blame Tailwind or a caching issue. I cleared `.next`, restarted the dev server, hard-refreshed the browser — all reasonable things to check, and worth knowing how to do, but none of them were the actual problem.

**2. The real bug was a mismatch between what I thought I'd saved and what was actually on disk.**
When I finally ran `cat data/formSchema.ts` directly in the terminal, the `employed` field was still `type: "checkbox"` — not the `select` version I'd been describing. That was the moment I learned the most important debugging lesson from this project: **stop trusting your memory of what you changed, and go read the actual file.** A console.log at the top of the component (`"NEW DYNAMIC FORM LOADED"`) helped confirm the dev server *was* picking up my file — the disconnect was between my mental model of the code and the code itself.

**3. Checkboxes have a different API than every other input, and I was using the wrong half of it.**
Once I knew it really was a checkbox, the actual code bug was:
```tsx
<input type="checkbox" value={formData[field.id] || ""} onChange={(e) => handleChange(field.id, e.target.value)} />
```
Text inputs use `value` + `e.target.value`. Checkboxes use `checked` (a boolean) + `e.target.checked`. I had copy-pasted the text-input pattern onto a checkbox, so the box's visual state was never actually wired to my state, and even if I clicked it, `formData.employed` would only ever receive the string `"on"` — never `true`. This meant my `showIf` condition (`value: true`) could never match, no matter what I clicked.

## What I'd Do Differently

- **Check the source of truth (the file on disk) earlier**, instead of trusting what I remembered typing. A `cat` or `view` of the actual file would have caught the mismatch in the first message, not several messages in.
- **Treat different input types as genuinely different components**, not variations of the same `<input>` pattern. Checkbox, radio, select, and text/number all have different state shapes (boolean vs. string vs. option list), and trying to force one generic branch to handle all of them is what caused the bug in the first place.
- **Add the conditional field's ID to `required` validation carefully.** I initially didn't realize that a naive `!formData[field.id]` required-check would treat a valid `false` checkbox value as "missing" — I avoided this by switching to radio buttons with explicit "Yes"/"No" string values instead of a boolean, which sidesteps the ambiguity entirely.

## What I Learned

- The difference between a **caching problem** (server serving stale code) and a **source problem** (the file itself hasn't been changed the way I think) — and how to tell them apart by checking a console log and the raw file content directly, rather than guessing.
- The React "controlled component" pattern isn't one-size-fits-all: `value`/`onChange` for text, `checked`/`onChange` for booleans. Using the wrong pair silently breaks the component without throwing any error.
- Keeping the schema and the renderer cleanly separated made every one of these fixes a small, localized change (one field type branch, one schema field) rather than a rewrite — which is the actual point of building it schema-driven in the first place.