When SVG is used in-line in HTML, it is today not possible for users to save the said SVG image, let alone save it in another format.

[svg-save-as.js](svg-save-as.js) defines a function SVGSaveAs that takes two parameters:

* a CSS selector
* an image format (default to "image/png")

When that function is invoked, it emulates the "save image" feature for all svg elements matching the selector, providing it as an image of the said format. [See it in action](https://dontcallmedom.github.io/svg-save-as/example/index.html).

# How does it work?
For each matched svg element, the library overlays an invisible `<img>` tag. That image source is set to:

* the content of the svg element (transformed into a `data:` URL) if the output format is set to `image/svg+xml`
* a `canvas`-generated `data:` URL of the svg content read in an image using the trick above

In both cases, the overlay image gets updated when the user either moves the mouse over the image (in case that mouse move indicates interest in a right-clock), or the user starts a touch on the image (in case it indicates the beginning of a long press).