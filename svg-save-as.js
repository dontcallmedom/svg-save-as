function SVGSaveAs(node, format) {
    function screenshotUpdater() {
        screenshot.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(node.outerHTML)));
    }

    format = format || "image/png";

    var parent = node.parentNode;
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


    screenshot.addEventListener("load", function() {
        if (format === "image/svg+xml") {
            img.src = screenshot.src;
        } else {
            canvas.getContext("2d").drawImage(screenshot, 0, 0);
            img.src = canvas.toDataURL(format);
        }
    });

    node.addEventListener("mouseenter", screenshotUpdater, false);
    node.addEventListener("touchstart", screenshotUpdater, false);
    parent.addEventListener("mousedown", function (ev) {
        if (ev.buttons & 2 || ev.button === 2) {
            parent.replaceChild(img, node);
        }
    });
    parent.addEventListener("contextmenu", function (ev) {
        try {
            parent.replaceChild(img, node);
        } catch (e) {}
        setTimeout(function() {         parent.replaceChild(node, img); }, 0);
    }, true);
}
