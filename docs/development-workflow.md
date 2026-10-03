### development workflow

this docs explain the developer workflow of projectFactr


## 1. Development Process

Development in Project FACTR follows a cycle of making changes,
testing the changes locally, debugging issues, and committing the
completed work to the repository.

Developers should verify their changes locally before pushing them
to the remote repository.

## 2. Making Changes

Before making a change, identify the part of the project responsible
for the functionality being modified.

For example:

- Page-specific behavior → Inline `<script>`
- Page-specific styling → Inline `<style>`
- Shared functionality → JavaScript modules
- Quiz functionality → Quiz classes
- Cartesian-plane functionality → `Plane`
- Shared quiz behavior → `Session`

Changes should be kept as focused as possible so that a single
change does not unnecessarily affect unrelated parts of the
application.

## 3. Testing

After making a change, run the application locally and test the
affected functionality.

Testing should include:

- Verifying that the page loads correctly
- Checking the modified functionality
- Testing expected user interactions
- Checking the browser console for JavaScript errors
- Testing related functionality that may be affected by the change

## 4. Debugging

When an issue occurs, use the browser's developer tools to
identify the source of the problem.

Common debugging tools include:

- Browser Console
- Browser Network tab
- JavaScript breakpoints
- `console.log()` for temporary debugging information

Temporary debugging code should be removed once the issue has been
resolved.

## 5. Git Workflow

Git is used to track changes and manage the Project FACTR source
code.

the flow shouuld be:
1. clone repository. read (getting-starded.md)
2. check git status. read (getting-started.md) for additional info
3. pull and sync before coding to avoid conflict.
4. test ghanges locally before commiting and deploying
5. review modified files
6. Commit the changes using a descriptive commit message that
follows the Project FACTR commit structure.


### Commit Message Structure

Project FACTR uses the following commit prefixes to describe the
type of change being committed:

- `feat:` — Adding a new feature or functionality
- `fix:` — Fixing an existing bug or problem
- `added:` — Adding a new file, resource, or supporting component
- `remove:` — Removing an existing file, feature, or component
- `edited:` — Modifying or updating existing content or code
- `issue:` — Changes related to addressing or documenting an issue

Examples:

```bash
git commit -m "feat: add quadratic inequality quiz"
git commit -m "fix: correct mobile canvas coordinate mapping"
git commit -m "added: add Grade 10 lesson page"
git commit -m "remove: remove unused quiz component"
git commit -m "edited: update navigation styling"
git commit -m "issue: address quiz completion bug"