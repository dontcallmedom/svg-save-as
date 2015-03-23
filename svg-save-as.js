function SVGSaveAs(node, format) {
    function screenshotUpdater() {
        screenshot.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(node.outerHTML)));
    }

    format = format || "image/png";

    var div = document.createElement("div");
    div.style.margin = 0;
    div.style.padding = 0;
    div.style.position = "relative";
    node.parentNode.replaceChild(div, node);
    div.appendChild(node);
    if (!node.getAttribute("xmlns")) {
        node.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    }
    var screenshot = new Image();

    var img = new Image();
    var canvas = document.createElement("canvas");
    img.width = node.width.baseVal.value;
    img.height = node.height.baseVal.value;
    screenshot.width = img.width;
    screenshot.height = img.height;
    canvas.width = img.width;
    canvas.height = img.height;

    img.style.position = "absolute";
    img.style.top = 0;
    img.style.left = 0;
    img.style.opacity = 0;

    screenshot.addEventListener("load", function() {
        if (format === "image/svg+xml") {
            img.src = screenshot.src;
        } else {
            canvas.getContext("2d").drawImage(screenshot, 0, 0);
            img.src = canvas.toDataURL(format);
        }
    });

    img.addEventListener("mouseenter", screenshotUpdater);
    img.addEventListener("touchstart", screenshotUpdater);
    div.appendChild(img);
}
