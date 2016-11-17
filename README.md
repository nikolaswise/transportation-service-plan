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


