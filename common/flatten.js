// takes javascript arrays and flattens it into
// a set of floating point values; this is required since Javascript
// arrays, being objects, cannot be passed to GL buffers directly,
// buffers expect raw float (or whatever type chosen) values
// for matrices, column major is expected by it, so this function
// transposes them for convenience and then flattens them
function flatten(v) {
    if (typeof v[0] === "number") {
        const len = v.length;
        const floats = new Float32Array(len);

        for (let i = 0; i < len; ++i) {
            floats[i] = v[i];
        }
        return floats;
    }

    if (v.matrix) {
        // gl uses column major order, so transpose if matrix
        // v = transpose(v);
        const len0 = v.length;
        const len1 = v[0].length;
        const floats = new Float32Array(len0 * len1);

        for (let i = 0; i < len0; ++i) {
            for (let j = 0; j < len1; ++j) {
                floats[i * len1 + j] = v[j][i];
            }
        }

        return floats;
    }

    const len0 = v.length;
    const len1 = v[0].length;
    const floats = new Float32Array(len0 * len1);
    for (let i = 0; i < len0; ++i) {
        for (let j = 0; j < len1; ++j) {
            floats[i * len1 + j] = v[i][j];
        }
    }
    return floats;
}
