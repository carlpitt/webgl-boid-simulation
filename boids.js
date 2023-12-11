const delay = 100;

let gl;

let vBuffer;
let colorBuffer;

const boidCount = 200;
const boids = new Array(boidCount);

let modelViewLocation;
let projectionLocation;

// max acceleration and speed
const maxAcceleration = 5;
const maxDumper = 3;
const maxVelocity = 3;

// magnitudes
const magnitudeCohesion = 0.1;
const magnitudeSeparation = 1;
const magnitudeAlignment = 1;

// range
const rangeCohesion = 40;
const rangeSeparation = 10;
const rangeAlignment = 40;

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

    gl.enable(gl.DEPTH_TEST);

    vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);

    const vPosition = gl.getAttribLocation(program, "vPosition");
    gl.enableVertexAttribArray(vPosition);
    // number of elements per should be 3 but 4 displays
    gl.vertexAttribPointer(vPosition, 4, gl.FLOAT, false, 0, 0);

    colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    const vColor = gl.getAttribLocation(program, "vColor");
    gl.enableVertexAttribArray(vColor);
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);

    modelViewLocation = gl.getUniformLocation(program, "modelView");
    projectionLocation = gl.getUniformLocation(program, "projection");

    //   const t = new Tetrahedron();
    //   t.getVerticesNormals();
    //   console.log(t.vertices);
    //   console.log(t.getNumVertices());

    for (let i = 0; i < boidCount; ++i) {
        boids[i] = new Boid();
    }

    const nearInput = document.getElementById("near");
    const farInput = document.getElementById("far");
    const widthInput = document.getElementById("width");
    const heightInput = document.getElementById("height");

    const nearOutput = document.getElementById("near-output");
    const farOutput = document.getElementById("far-output");
    const widthOutput = document.getElementById("width-output");
    const heightOutput = document.getElementById("height-output");

    if (
        nearInput === null ||
        farInput === null ||
        widthInput === null ||
        heightInput === null ||
        nearOutput === null ||
        farOutput === null ||
        widthOutput === null ||
        heightOutput === null
    ) {
        alert("input missing");
        return null;
    }

    nearInput.addEventListener("input", updateProjection);
    farInput.addEventListener("input", updateProjection);
    widthInput.addEventListener("input", updateProjection);
    heightInput.addEventListener("input", updateProjection);

    updateProjection();

    const lookAtZ = -210;

    const lat = normalize(vec3(0, 0, lookAtZ));
    const up = normalize(vec3(0, 1, -lookAtZ));
    let u = cross(lat, up);
    const v = normalize(cross(u, lat));
    const n = normalize(negate(lat));
    u = normalize(u);

    const rot = transpose(mat4(u, v, n));
    // rot.matrix = true

    const trans = mat4(
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, lookAtZ, 1],
    );
    // trans.matrix = true

    // trans = transpose(trans)
    // rot = transpose(rot)

    // try use new mat_vec.js
    // try use simpler persp

    const modelView = mult(rot, trans);
    gl.uniformMatrix4fv(modelViewLocation, false, flatten(modelView));

    function updateProjection() {
        const near = nearInput.value;
        const far = farInput.value;
        const width = widthInput.value;
        const height = heightInput.value;

        nearOutput.innerHTML = near;
        farOutput.innerHTML = far;
        widthOutput.innerHTML = width;
        heightOutput.innerHTML = height;

        // const left = -width / 2;
        const right = width / 2;
        // const bottom = -height / 2;
        const top = height / 2;

        // const projection = mat4(
        //     [(2 * near) / (right - left), 0, (right + left) / (right - left), 0],
        //     [0, (2 * near) / (top - bottom), (top + bottom) / (top - bottom), 0],
        //     [0, 0, -(far + near) / (far - near), -(2 * far * near) / (far - near)],
        //     [0, 0, -1, 0],
        // );
        const projection = mat4(
            [near / right, 0, 0, 0],
            [0, near / top, 0, 0],
            [
                0,
                0,
                -(far + near) / (far - near),
                -(2 * far * near) / (far - near),
            ],
            [0, 0, -1, 0],
        );

        // MT = transpose(MT)

        gl.uniformMatrix4fv(projectionLocation, false, flatten(projection));
    }

    render();
};

// main render loop
function render() {
    const verts = [];
    const colors = [];
    for (let i = 0; i < boidCount; ++i) {
        const boid = boids[i];
        ++boid.pos[0];
        verts.push(...getTetrahedronVertices(...boid.pos, boid.rot));
        // for (let j = 0; j < 12; ++j)
        colors.push(...boid.color);
    }

    // this becomes current buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(verts), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES, 0, verts.length);

    setTimeout(() => {
        requestAnimationFrame(render);
    }, delay);
}

function randomColor() {
    return [Math.random(), Math.random(), Math.random(), 1];
}

function randomColors(n) {
    const colors = new Array(n);
    const color = randomColor();
    for (let i = 0; i < n; ++i) {
        colors[i] = color;
    }
    return colors;
}

function randomRot() {
    return mat4(
        [
            Math.cos(getRandomArbitrary(0, 360)),
            Math.cos(getRandomArbitrary(0, 360)),
            Math.sin(getRandomArbitrary(0, 360)),
        ],
        [
            Math.sin(getRandomArbitrary(0, 360)),
            Math.cos(getRandomArbitrary(0, 360)),
            -Math.sin(getRandomArbitrary(0, 360)),
        ],
        [
            -Math.sin(getRandomArbitrary(0, 360)),
            Math.sin(getRandomArbitrary(0, 360)),
            Math.cos(getRandomArbitrary(0, 360)),
        ],
    );

    //   const rot = mat4();
    //   rot[0][0] = Math.cos(getRandomArbitrary(0, 360));
    //   rot[0][1] = Math.cos(getRandomArbitrary(0, 360));
    //   rot[0][2] = Math.sin(getRandomArbitrary(0, 360));
    //   rot[1][0] = Math.sin(getRandomArbitrary(0, 360));
    //   rot[1][1] = Math.cos(getRandomArbitrary(0, 360));
    //   rot[1][2] = -Math.sin(getRandomArbitrary(0, 360));
    //   rot[2][0] = -Math.sin(getRandomArbitrary(0, 360));
    //   rot[2][1] = Math.sin(getRandomArbitrary(0, 360));
    //   rot[2][2] = Math.cos(getRandomArbitrary(0, 360));
    //   return rot;
}
