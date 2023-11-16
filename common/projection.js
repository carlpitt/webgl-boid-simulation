function lookAt(eye, at, up) {
    if (!Array.isArray(eye) || eye.length != 3) {
        throw new Error("lookAt(): first parameter [eye] must be a vec3");
    }

    if (!Array.isArray(at) || at.length != 3) {
        throw new Error("lookAt(): first parameter [at] must be a vec3");
    }

    if (!Array.isArray(up) || up.length != 3) {
        throw new Error("lookAt(): first parameter [up] must be a vec3");
    }

    if (equal(eye, at)) {
        // return mat4();
        throw new Error(
            "lookAt(): parameters [eye] and [at] need to be different",
        );
    }

    const lookAtVec = normalize(subtract(at, eye));
    const u = normalize(cross(lookAtVec, up));
    const v = normalize(cross(u, lookAtVec));
    const n = negate(lookAtVec);

    const result = [
        vec4(u[0], u[1], u[2], -dot(u, eye)),
        vec4(v[0], v[1], v[2], -dot(v, eye)),
        vec4(n[0], n[1], n[2], -dot(n, eye)),
        vec4(0, 0, 0, 1),
    ];

    result.matrix = true;

    return result;
}

function perspective(fieldOfView, aspect, near, far) {
    const f = 1 / Math.tan(degreesToRadians(fieldOfView) / 2);
    const d = far - near;

    const result = mat4();
    result[0][0] = f / aspect;
    result[1][1] = f;
    result[2][2] = -(near + far) / d;
    result[2][3] = (-2 * near * far) / d;
    result[3][2] = -1;
    result[3][3] = 0;

    return result;
}
