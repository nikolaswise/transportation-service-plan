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
- [x] Tooltip to explain what layers are and what they mean
- [x] Disabled state for the layer toggles
- [x] Projects: => TSP Projects
  - [X] One Toggle Button
  - [x] One GIS Layer
- [x] Programs: => TSP Projects`
- [x] View Reset Button on Map
- [x] UX Sidebar => More Washington Posty
- [ ] 'PDF this Section'
- [x] Slide in the subsections on sidebar
- [x] add currenty showing block in footer og map
- [ ] sortable table of gis endpoint
	- [ ] i need endpoints
	- [ ] fields to show
- [ ] check event binding
- [ ] close things on esc bind

## Today

- [ ] Drop Erin's new Docx files into the site

## This Week

- [ ] Explore the rest of the docx files that Erin is getting done

## My Blockers

- [ ] New cover
- [ ] Project and Program Endpoints
- [ ] Cool Extra PDFs
- [ ] .Docx Files of the TSP
- [ ] Domain to Host on

---

