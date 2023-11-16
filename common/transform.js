function ndcToWorld(wcMin, wcMax) {
    const wcWidth = wcMax[0] - wcMin[0];
    const wcHeight = wcMax[1] - wcMin[1];

    const m = mult(
        translate3x3(wcMin[0], wcMin[1]),
        mult(
            scale3x3(wcWidth, wcHeight),
            mult(scale3x3(0.5, 0.5), translate3x3(1, 1)),
        ),
    );
    m.matrix = true;
    return m;
}

function displayToNDC(canvasDims) {
    // form the xform
    const m = mult(
        scale3x3(1, -1, 1),
        mult(
            translate3x3(-1, -1, 0),
            mult(
                scale3x3(2, 2, 1),
                scale3x3(1 / canvasDims[0], 1 / canvasDims[1], 1),
            ),
        ),
    );
    m.matrix = true;
    return m;
}

function worldToNDC(wcMin, wcMax) {
    // form the xform
    const wcWidth = wcMax[0] - wcMin[0];
    const wcHeight = wcMax[1] - wcMin[1];
    const m = mult(
        translate3x3(-1, -1),
        mult(
            scale3x3(2 / wcWidth, 2 / wcHeight),
            translate3x3(-wcMin[0], -wcMin[1]),
        ),
    );
    m.matrix = true;
    return m;
}

function translate3x3(tx, ty) {
    const trans = mat3();
    trans[0][2] = tx;
    trans[1][2] = ty;

    return trans;
}

function translate4x4(tx, ty, tz) {
    const trans = mat4();
    trans[0][3] = tx;
    trans[1][3] = ty;
    trans[2][3] = tz;

    return trans;
}

function scale3x3(sx, sy) {
    const scale = mat3();
    scale[0][0] = sx;
    scale[1][1] = sy;

    return scale;
}

function scale4x4(sx, sy, sz) {
    const scale = mat4();
    scale[0][0] = sx;
    scale[1][1] = sy;
    scale[2][2] = sz;

    return scale;
}

function rotate3x3(theta) {
    const rot = mat3();
    rot[0][0] = Math.cos(theta);
    rot[0][1] = -Math.sin(theta);
    rot[1][0] = Math.sin(theta);
    rot[1][1] = Math.cos(theta);

    return rot;
}

function rotate4x4(theta, dim) {
    const rot = mat4();
    switch (dim) {
        case "x":
            rot[1][1] = Math.cos(theta);
            rot[1][2] = -Math.sin(theta);
            rot[2][1] = Math.sin(theta);
            rot[2][2] = Math.cos(theta);
            break;
        case "y":
            rot[0][1] = Math.cos(theta);
            rot[0][2] = Math.sin(theta);
            rot[2][0] = -Math.sin(theta);
            rot[2][2] = Math.cos(theta);
            break;
        case "z":
            rot[0][0] = Math.cos(theta);
            rot[0][1] = -Math.sin(theta);
            rot[1][0] = Math.sin(theta);
            rot[1][1] = Math.cos(theta);
            break;
    }

    return rot;
}
