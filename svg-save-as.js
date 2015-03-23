function SVGSaveAs(selector, format) {
    function screenshotUpdater(svg, screenshot) {
        return function() {
            screenshot.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svg.outerHTML)));
        };
    }

    format = format || "image/png";

    selector = selector || "svg";
    [].forEach.call(document.querySelectorAll(selector), function (s) {
        var div = document.createElement("div");
        div.style.margin = 0;
        div.style.padding = 0;
        div.style.position = "relative";
        s.parentNode.replaceChild(div, s);
        div.appendChild(s);
        if (!s.getAttribute("xmlns")) {
            s.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        }
        var screenshot = new Image();

        var img = new Image();
        var canvas = document.createElement("canvas");
        img.width = s.width.baseVal.value;
        img.height = s.height.baseVal.value;
        screenshot.width = img.width;
        screenshot.height = s.height.baseVal.value;
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

        img.addEventListener("mouseenter", screenshotUpdater(s, screenshot));
        img.addEventListener("touchstart", screenshotUpdater(s, screenshot));
        div.appendChild(img);
    });
}
