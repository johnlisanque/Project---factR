
# Project FACTR Architecture

This document explains the overall architecture of Project FACTR,
including its major components, and interaction between the user interface and the quiz system.

## 1. Architecture Overview

Project FACTR is a client-side web application built using:

- HTML for the user interface structure
- CSS for presentation and responsive design
- JavaScript for application logic
- ES Modules for organizing JavaScript code
- p5.js for interactive Cartesian-plane graphics

The application follows a modular architecture where common
responsibilities are separated into reusable components, modules,
and classes. Each page also contains an inline script responsible
for functionality that is unique to that specific page.

This structure allows shared functionality to be reused across
the application while keeping page-specific functionality within
the page where it is needed.

### Page Organization

The `pages/` directory is organized primarily by grade level.

```text
pages/
    grade7/
    grade8/
    grade9/
    grade10/
    grade11/
```
the grade level structure is choosen because projectFactr is an achademic website where different student from 7 - 11 can chose their corresponding grade level.

Grouping pages by grade level provide many benifits:
 - it keep related topic together
 - easier for coders to edit specific pages 
 - allow each grade level contain itsown lessons.
 - make the project esier to scale, and expand
 - prevent different pages different pages from mixing and becoming a mess.
 - seperation of concern. if one page is broken it can be identify quickly

 ### Page specific Scripts and Style
 ## 1. the use of inline style

Inline styles are used when a visual style or layout behavior is
specific to a single page or component.

The purpose of using inline styles in these cases is to keep
page-specific styling close to the HTML elements that require it.
This is useful for pages that have unique layouts or components
that are not shared across the rest of the application.

## 2. the use of Script

 Although the project factR uses reusable JavaScript modules for
shared functionality, individual pages may contain an inline
<script> for functionality that is unique to that page.
The inline script is used when functionality is closely tied to
the structure and behavior of a specific page. it may also be use as spicific calculation or logic
 
Shared functionality that is used by multiple pages should instead
be placed in reusable JavaScript modules.
 
Therefore, the architecture can be summarized as:
 
Project FACTR separates its architecture into page-specific
functionality and reusable application functionality. Pages are
organized by grade level to keep lessons and activities structured
according to their intended learners. Each page may contain inline
styles and scripts for layouts, interactions, and calculations
that are unique to that page.
 
Functionality that is shared across multiple pages is instead
implemented through reusable JavaScript modules, classes, and
components. This separation keeps page-specific logic close to
the content that uses it while allowing common functionality to
be maintained and reused throughout the application.



