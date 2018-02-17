# Transportation Service Plan

The TSP Digital Document is a small, static web application that hosts the complete text of the Transportation Service Plan 2035, as well as presenting the GIS data associated with the Plan, Projects, Programs, and Classifications.

## Project Structure

```
📂 /
	📄 200.html	       // This is the complete HTML
	📄 CHANGELOG.md	   // Changes between versions
	📄 README.md       // This document
	📄 package.json    // Dependencies and Scripts
	📂 /src            // The editable files for the project
		📂 /css        // All CSS files. Must be processed
		📂 /js         // All JS files. Must be processed
		📂 /img        // Source image files.
	📂 /css            // Built CSS. do not edit.
	📂 /img            // Built Images. Do not edit.
	📂 /js             // Compressed JS. Do not edit.
	📂 /lib            // Source `.docx` Texts. Canonical.
```

## Building the Project

```
$ npm install
$ npm run build
```

## Developing the project

```
$ npm install
$ npm start
```

## Running Tests

```
$ npm install
$ npm test
```

## Notes

### Body Classes

The following are classes set on the body of the HTML to pass information to the rest of the DOM.

| class | denotes |
| ----- | ------- |
| js-is-active | Javascript will run on this page. Go for the full experience |
| map-is-active | The map pane is visible, and the map is drawn. |

---

## My Punchlist

- [ ] Feed a table to Pandoc and see what happens
- [ ] Tooltip to explain what layers are and what they mean
- [ ] Disabled state for the layer toggles
- [ ] Projects: => TSP Projects
  - [ ] One Toggle Button
  - [ ] One GIS Layer
- [ ] Programs: => TSP Projects`
- [ ] View Reset Button on Map
- [ ] UX Sidebar => More Washington Posty

---
---

# PBOT Meeting Re: TSP

## Goals:

- Understand completely what is missing from the current document
- Identify Endpoints for all GIS Layers
- Identify Content & Data that needs to exist in Popups
- Identify latest canonical content for Word Doc of the TSP
- Are there any changes that need to happe in the Word Doc?
- What are those changes?

## Adopted plan / Word Doc Goodness

### TSP 1

- Needs a confimation of savestate on electronic doc

### TSP 2

- Ironing out some final kinks with document formats

### TSP 3

- Will have all changes from Planning commision on Jan 12th
- Diretion from Planning
- Hearing with Council Mar 21

### SuperTSP

- Similar state, needs to have some loose ends reconciled with TSP 2.
- Comp plan going into effect May 25th, everything live and ready to go.

## My Timleine

- Jan will be app edits and UX updates
- Feb will be spent wrangling data and working through text edits
- Mar will be spent putting the final polish on before Councilnik