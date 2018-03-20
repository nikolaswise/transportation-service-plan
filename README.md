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
- [ ] check a11y with francesca's blind people
- [ ] make a screencap video for a 'how to do' section
	- [ ] put it in!
- [ ] close things on esc bind
- [ ] A11y! Wow!

---

Nik,

Attached is the TSP presentation for the City Council on Wednesday at 2pm. You’ll see we have a placeholder toward the end for you and Kevin to show off the online document. We do need a link to what you are planning to show so that it can be ready to go ahead of time. Could you please send us a link by end of day today?

Thank you,

Bob

---

Reminder we are at City Council on Wednesday, March 21 @ 2:00. City Hall, Council Chambers (2nd floor).

Bob and I are doing a presentation. We would like you and Kevin to join at the table about 1/.2 day through to do a quick 5-8 minutes on the digital document. Focus on what is there vs what is not there, how it will interface for staff and citizens, making it easy to view, search, access information, and update for staff.

What do you need to have available at Council? An internet connection? I will see what we need to have it projected on the screen.

Let us know if you have questions. We can check in on Tuesday (I am out of the office on Monday).

---

Hey Nick,

I hope you had a good week. I’ve been thinking about the TSP Digital Doc and wanted to make sure you have everything you need. I recall you saying you could mess with the transparency of the layers for both the zoning and center/ corridors layers. Is this still something you have time to do? I’m pretty swamped with other work right now and I’m not sure what the process would be for getting someone in our GIS group to edit those.

I’m also curious about the latest link to the TSP Digital Doc. I was fooling around on the pbot-tsp.surge.sh website yesterday and it seems like the classifications are taking a long time to load. From my first observation it looks like the classifications are being called as a feature service rather than a map service. I was told by Kirk McEwen that in the past we’ve used map services to show the symbology with a feature service, which is invisible and only selectable when zoomed in, behind the mapping service. I realize you’re aware of these loadtime issues, but I wanted to let you know. I also never found a link that worked for the updated TSP Digital Doc page.

Regarding the long overdue TSP programs, I just got privileges to share a service via ArcOnline, so I apologize for the delay on these. There was also some confusion because most of these are still in development and don’t have GIS data that’s readily available. However, I was chatting with the bike coordinator yesterday morning and his data seems to be the closest to sharing. Here’s a link to both feature services that I put up on my ArcOnline account (Neighborhood Greenway Program and Bike Network Completion Program). Let me know if you need me to mess with the symbology, or edit the data to make it easier to use. I also recognize that council won’t have time to dig into what we’re showing, so it’s more important that there’s data there and it doesn’t need to be completely accurate. This will give us two project lists to toggle through and show how the program functions (buttons) will work in the future. This data isn’t the best and there are problems with the case, project numbering, etc., but it’s the best out of the different TSP programs lists that we wanted to show.

Cheers,

Kevin

Here are the TSP program descriptions, which might be outdated,  for the data I shared with you:

“Bikeway Network Completion Program - Gaps and deficiencies in Portland's bikeway network present significant barriers to bicyclists. Many of these can be remedied through modest expenditures to address the most critically needed improvements. These projects should contribute to an increase in safe bicycling as disincentives to usage are eliminated and the continuity of the bikeway network is improved. Example projects include new bike lanes and sharrows, improvements to existing bikeways, wayfinding improvements, colored bike boxes and lanes, and signal modifications. This program will coordinate with paving projects to ensure that new striping designs are developed ahead of time and implemented in conjunction with paving. The program will also work to identify and implement needed improvements in designated Bicycle Districts.”

“Neighborhood Greenways Program - The Neighborhood Greenway system provides a network of safe and comfortable pedestrian/bicycle priority routes on low-volume, low-speed streets. The Neighborhood Greenway network will be improved and expanded over time through inexpensive treatments that lower speeds, reduce automobile volumes, create safer crossings of busy streets, and provide wayfinding. Example project elements include speed bumps, sharrows, signage, diverters, curb ramps, lighting, and improved crossings.”

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