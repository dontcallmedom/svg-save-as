When SVG is used in-line in HTML, it is today not possible for users to save the said SVG image, let alone save it in another format.

[svg-save-as.js](svg-save-as.js) defines a function SVGSaveAs that takes two parameters:

* a pointer to an SVG node
* an image format (default to "image/png")

When that function is invoked, it emulates the "save image" feature for the svg element, providing it as an image of the said format. [See it in action](https://dontcallmedom.github.io/svg-save-as/example/index.html).

# How does it work?
The library overlays an invisible `<img>` tag over the SVG node. That image source is set to:

* the content of the svg element (transformed into a `data:` URL) if the output format is set to `image/svg+xml`
* a `canvas`-generated `data:` URL of the svg content read in an image using the trick above

In both cases, the overlay image gets updated when the user either moves the mouse over the image (in case that mouse move indicates interest in a right-clock), or the user starts a touch on the image (in case it indicates the beginning of a long press).