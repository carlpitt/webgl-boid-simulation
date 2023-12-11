// set of utility functions useful in webgl programs

// creator: Kalpathi Subramanian
// sources: various
// date: 2021-12-23
// editor: Carl Pittenger
// edit date: 2023-11-05

// initializes and returns webgl context
function initWebGL(canvas) {
    // const gl = canvas.getContext("webgl");
    const gl = canvas.getContext("webgl2");

    // only continue if webgl is available and working
    if (gl === null) {
        alert(
            "Unable to initialize WebGL 2.0\n" +
                "Your browser or machine may not support it.",
        );
    }

    return gl;
}

// provides requestAnimationFrame in a cross browser way
// source: Angel/Shreiner book tools

// window.requestAnimFrame =
//     window.requestAnimationFrame ||
//     window.webkitRequestAnimationFrame ||
//     window.mozRequestAnimationFrame ||
//     window.oRequestAnimationFrame ||
//     window.msRequestAnimationFrame ||
//     ((callback, _element) => {
//         window.setTimeout(callback, 1000 / 60);
//     });

window.requestAnimFrame = (function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback, _element) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
})();
