const markdown = document.getElementById("markdown");
const html = document.getElementById("html");

function parseMarkdown() {
    const dirty = markdown.value;
    const clean = DOMPurify.sanitize(dirty);

    save(clean);

    html.innerHTML = marked.parse(clean, { USE_PROFILES: { html: true } });
}

function debounce(fn, wait) {
    var timeout;
    return function () {
        var _this = this;
        var args = arguments;
        var later = function () {
            timeout = null;
            fn.apply(_this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait || 200);
    };
};

function save(markdown) {
    localStorage.markdown = JSON.stringify(markdown);
}

function load() {
    return localStorage.markdown ? JSON.parse(localStorage.markdown) : "# h1";
}

markdown.onkeyup = debounce(parseMarkdown);

markdown.value = load();
markdown.focus();
parseMarkdown();