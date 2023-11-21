const speed = 10;

let gl;

// window.onload = function init() {
window.onload = () => {
    // get webgl context
    const canvas = document.getElementById("webgl-canvas");
    if (canvas === null) {
        alert("canvas not found");
        return null;
    }

    gl = initWebGL(canvas);

    if (gl === null) {
        return null;
    }

    gl.enable(gl.DEPTH_TEST);

    // configure webgl
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.5, 0.5, 0.5, 1);
    // gl.clearColor(1, 1, 1, 1);

    // load shaders and initialize attribute buffers
    const program = initShaders(gl, "vertex-shader", "fragment-shader");
    if (program === null) {
        return null;
    }

    gl.useProgram(program);

    render();
};

// main render loop
function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    // gl.drawArrays();

    setTimeout(() => {
        requestAnimationFrame(render);
    }, speed);
}
