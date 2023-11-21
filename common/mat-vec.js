// mat-vec.js

// Angel

// matrix and vector library of utility helper functions

// function _argumentsToArray(args) {
//     return [].concat.apply([], Array.prototype.slice.apply(args));
// }

function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}

// vector constructors

// 2 element vector
function vec2(...args) {
    switch (args.length) {
        case 0: {
            return [0, 0];
        }

        case 1: {
            const arg = args[0];

            // TODO(carl): double check this default (for vec3 and 4 as well)
            if (typeof arg === "number") {
                return [arg, 0];
            }

            if (typeof arg[0] === "number") {
                if (arg.length === 2) {
                    for (let i = 0; i < 2; ++i) {
                        if (typeof arg[i] !== "number") {
                            throw new Error("vec2(): bad argument");
                        }
                    }

                    return [arg[0], arg[1]];
                }
            }

            throw new Error("vec2(): bad argument");
        }

        case 2: {
            for (let i = 0; i < 2; ++i) {
                if (typeof args[i] !== "number") {
                    throw new Error("vec2(): bad arguments");
                }
            }

            return [args[0], args[1]];
        }

        default: {
            throw new Error(`vec2(): args too long: ${args}`);
        }
    }
}

// 3 element vector
function vec3(...args) {
    switch (args.length) {
        case 0: {
            return [0, 0, 0];
        }

        case 1: {
            const arg = args[0];

            if (typeof arg === "number") {
                return [arg, 0, 0];
            }

            if (typeof arg[0] === "number") {
                if (arg.length === 3) {
                    for (let i = 0; i < 3; ++i) {
                        if (typeof arg[i] !== "number") {
                            throw new Error("vec3(): bad argument");
                        }
                    }

                    return [arg[0], arg[1], arg[2]];
                }
            }

            throw new Error("vec3(): bad argument");
        }

        case 2: {
            for (let i = 0; i < 2; ++i) {
                if (typeof args[i] !== "number") {
                    throw new Error("vec3(): bad arguments");
                }
            }

            return [args[0], args[1], 0];
        }

        case 3: {
            for (let i = 0; i < 3; ++i) {
                if (typeof args[i] !== "number") {
                    throw new Error("vec3(): bad arguments");
                }
            }

            return [args[0], args[1], args[2]];
        }

        default: {
            throw new Error(`vec3(): args too long: ${args}`);
        }
    }
}

// 4 element vector
function vec4(...args) {
    switch (args.length) {
        case 0: {
            return [0, 0, 0, 1];
        }

        case 1: {
            const arg = args[0];

            if (typeof arg === "number") {
                return [arg, 0, 0, 1];
            }

            if (typeof arg[0] === "number") {
                if (arg.length === 2) {
                    for (let i = 0; i < 2; ++i) {
                        if (typeof arg[i] !== "number") {
                            throw new Error("vec4(): bad argument");
                        }
                    }

                    return [arg[0], arg[1], 0, 1];
                }

                if (arg.length === 3) {
                    for (let i = 0; i < 3; ++i) {
                        if (typeof arg[i] !== "number") {
                            throw new Error("vec4(): bad argument");
                        }
                    }

                    return [arg[0], arg[1], arg[2], 1];
                }

                if (arg.length === 4) {
                    for (let i = 0; i < 4; ++i) {
                        if (typeof arg[i] !== "number") {
                            throw new Error("vec4(): bad argument");
                        }
                    }

                    return [arg[0], arg[1], arg[2], arg[3]];
                }
            }

            throw new Error("vec4(): bad argument");
        }

        case 2: {
            for (let i = 0; i < 2; ++i) {
                if (typeof args[i] !== "number") {
                    throw new Error("vec4(): bad arguments");
                }
            }

            return [args[0], args[1], 0, 1];
        }

        case 3: {
            for (let i = 0; i < 3; ++i) {
                if (typeof args[i] !== "number") {
                    throw new Error("vec4(): bad arguments");
                }
            }

            return [args[0], args[1], args[2], 1];
        }

        case 4: {
            for (let i = 0; i < 4; ++i) {
                if (typeof args[i] !== "number") {
                    throw new Error("vec4(): bad arguments");
                }
            }

            return [args[0], args[1], args[2], args[3]];
        }

        default: {
            throw new Error(`vec4(): args too long: ${args}`);
        }
    }
}

// matrix constructors
// row major nested array for easy indexing by row
// use flatten() to convert to column major to send to gl

function mat2(...args) {
    switch (args.length) {
        case 0: {
            return identity2();
        }

        case 1: {
            const arg = args[0];

            if (typeof arg === "number") {
                const m = [vec2(arg, 0), vec2(0, arg)];

                m.matrix = true;

                return m;
            }

            if (typeof arg[0] === "number") {
                const len = arg.length;

                if (len !== 2 && len !== 4) {
                    throw new Error("mat2(): bad argument");
                }

                for (let i = 0; i < len; ++i) {
                    if (typeof arg[i] !== "number") {
                        throw new Error("mat2(): bad argument");
                    }
                }

                if (len === 2) {
                    const m = [vec2(arg[0], 0), vec2(0, arg[1])];

                    m.matrix = true;

                    return m;
                }

                const m = [vec2(arg[0], arg[1]), vec2(arg[2], arg[3])];

                m.matrix = true;

                return m;
            }

            if (typeof arg[0][0] === "number") {
                if (arg.length !== 2) {
                    throw new Error("mat2(): bad argument");
                }

                for (let i = 0; i < 2; ++i) {
                    if (arg[i].length !== 2) {
                        throw new Error("mat2(): bad argument");
                    }

                    for (let j = 0; j < 2; ++j) {
                        if (typeof arg[i][j] !== "number") {
                            throw new Error("mat2(): bad argument");
                        }
                    }
                }

                const m = [
                    vec2(arg[0][0], arg[0][1]),
                    vec2(arg[1][0], arg[1][1]),
                ];

                m.matrix = true;

                return m;
            }

            throw new Error("mat2(): bad argument");
        }

        case 2: {
            if (typeof args[0] === "number") {
                for (let i = 0; i < 2; ++i) {
                    if (typeof args[i] !== "number") {
                        throw new Error("mat2(): bad arguments");
                    }
                }

                const m = [vec2(args[0], 0), vec2(0, args[1])];

                m.matrix = true;

                return m;
            }

            if (typeof args[0][0] === "number") {
                for (let i = 0; i < 2; ++i) {
                    if (args[i].length !== 2) {
                        throw new Error("mat2(): bad arguments");
                    }

                    for (let j = 0; j < 2; ++j) {
                        if (typeof args[i][j] !== "number") {
                            throw new Error("mat2(): bad arguments");
                        }
                    }
                }

                const m = [
                    vec2(args[0][0], args[0][1]),
                    vec2(args[1][0], args[1][1]),
                ];

                m.matrix = true;

                return m;
            }

            throw new Error("mat2(): bad arguments");
        }

        case 4: {
            for (let i = 0; i < 4; ++i) {
                if (typeof args[i] !== "number") {
                    throw new Error("mat2(): bad arguments");
                }
            }

            const m = [vec2(args[0], args[1]), vec2(args[2], args[3])];

            m.matrix = true;

            return m;
        }

        default: {
            return new Error(`mat2(): bad args length: ${args}`);
        }
    }
}

//----------------------------------------------------------------------------

function mat3(...args) {
    switch (args.length) {
        case 0: {
            return identity3();
        }

        case 1: {
            const arg = args[0];

            if (typeof arg === "number") {
                const m = [vec3(arg, 0, 0), vec3(0, arg, 0), vec3(0, 0, arg)];

                m.matrix = true;

                return m;
            }

            if (typeof arg[0] === "number") {
                const len = arg.length;

                if (len !== 3 && len !== 9) {
                    throw new Error("mat2(): bad argument");
                }

                for (let i = 0; i < len; ++i) {
                    if (typeof arg[i] !== "number") {
                        throw new Error("mat3(): bad argument");
                    }
                }

                if (len === 3) {
                    const m = [
                        vec3(arg[0], 0, 0),
                        vec3(0, arg[1], 0),
                        vec3(0, 0, arg[2]),
                    ];

                    m.matrix = true;

                    return m;
                }

                const m = [
                    vec3(arg[0], arg[1], arg[2]),
                    vec3(arg[3], arg[4], arg[5]),
                    vec3(arg[6], arg[7], arg[8]),
                ];

                m.matrix = true;

                return m;
            }

            if (typeof arg[0][0] === "number") {
                if (arg.length !== 3) {
                    throw new Error("mat3(): bad argument");
                }

                for (let i = 0; i < 3; ++i) {
                    if (arg[i].length !== 3) {
                        throw new Error("mat3(): bad argument");
                    }

                    for (let j = 0; j < 3; ++j) {
                        if (typeof arg[i][j] !== "number") {
                            throw new Error("mat3(): bad argument");
                        }
                    }
                }

                const m = [
                    vec4(arg[0][0], arg[0][1], arg[0][2], 0),
                    vec4(arg[1][0], arg[1][1], arg[1][2], 0),
                    vec4(arg[2][0], arg[2][1], arg[2][2], 0),
                    vec4(0, 0, 0, 1),
                ];

                m.matrix = true;

                return m;
            }

            throw new Error("mat3(): bad argument");
        }

        case 3: {
            if (typeof args[0] === "number") {
                for (let i = 0; i < 3; ++i) {
                    if (typeof args[i] !== "number") {
                        throw new Error("mat3(): bad arguments");
                    }
                }

                const m = [
                    vec3(args[0], 0, 0),
                    vec3(0, args[1], 0),
                    vec3(0, 0, args[2]),
                ];

                m.matrix = true;

                return m;
            }

            if (typeof args[0][0] === "number") {
                for (let i = 0; i < 3; ++i) {
                    if (args[i].length !== 3) {
                        throw new Error("mat3(): bad arguments");
                    }

                    for (let j = 0; j < 3; ++j) {
                        if (typeof args[i][j] !== "number") {
                            throw new Error("mat3(): bad arguments");
                        }
                    }
                }

                const m = [
                    vec3(args[0][0], args[0][1], args[0][2]),
                    vec3(args[1][0], args[1][1], args[1][2]),
                    vec3(args[2][0], args[2][1], args[2][2]),
                ];

                m.matrix = true;

                return m;
            }

            throw new Error("mat3(): bad arguments");
        }

        case 9: {
            for (let i = 0; i < 9; ++i) {
                if (typeof args[i] !== "number") {
                    throw new Error("mat3(): bad arguments");
                }
            }

            const m = [
                vec3(args[0], args[1], args[2]),
                vec3(args[3], args[4], args[5]),
                vec3(args[6], args[7], args[8]),
            ];

            m.matrix = true;

            return m;
        }

        default: {
            return new Error(`mat3(): bad args length: ${args}`);
        }
    }
}

//----------------------------------------------------------------------------

// TODO(carl): double check [3][3] default
function mat4(...args) {
    switch (args.length) {
        case 0: {
            return identity4();
        }

        case 1: {
            const arg = args[0];

            if (typeof arg === "number") {
                const m = [
                    vec4(arg, 0, 0, 0),
                    vec4(0, arg, 0, 0),
                    vec4(0, 0, arg, 0),
                    vec4(0, 0, 0, 1),
                ];

                m.matrix = true;

                return m;
            }

            if (typeof arg[0] === "number") {
                const len = arg.length;

                if (len !== 3 && len !== 4 && len !== 9 && len !== 16) {
                    throw new Error("mat4(): bad argument");
                }

                for (let i = 0; i < len; ++i) {
                    if (typeof arg[i] !== "number") {
                        throw new Error("mat4(): bad argument");
                    }
                }

                if (len === 3) {
                    const m = [
                        vec4(arg[0], 0, 0, 0),
                        vec4(0, arg[1], 0, 0),
                        vec4(0, 0, arg[2], 0),
                        vec4(0, 0, 0, 1),
                    ];

                    m.matrix = true;

                    return m;
                }

                if (len === 4) {
                    const m = [
                        vec4(arg[0], 0, 0, 0),
                        vec4(0, arg[1], 0, 0),
                        vec4(0, 0, arg[2], 0),
                        vec4(0, 0, 0, arg[3]),
                    ];

                    m.matrix = true;

                    return m;
                }

                if (len === 9) {
                    const m = [
                        vec4(arg[0], arg[1], arg[2], 0),
                        vec4(arg[3], arg[4], arg[5], 0),
                        vec4(arg[6], arg[7], arg[8], 0),
                        vec4(0, 0, 0, 1),
                    ];

                    m.matrix = true;

                    return m;
                }

                const m = [
                    vec4(arg[0], arg[1], arg[2], arg[3]),
                    vec4(arg[4], arg[5], arg[6], arg[7]),
                    vec4(arg[8], arg[9], arg[10], arg[11]),
                    vec4(arg[12], arg[13], arg[14], arg[15]),
                ];

                m.matrix = true;

                return m;
            }

            if (typeof arg[0][0] === "number") {
                const len = arg.length;

                if (len !== 3 && len !== 4) {
                    throw new Error("mat4(): bad argument");
                }

                for (let i = 0; i < len; ++i) {
                    if (arg[i].length !== len) {
                        throw new Error("mat4(): bad argument");
                    }

                    for (let j = 0; j < len; ++j) {
                        if (typeof arg[i][j] !== "number") {
                            throw new Error("mat4(): bad argument");
                        }
                    }
                }

                if (len === 3) {
                    const m = [
                        vec4(arg[0][0], arg[0][1], arg[0][2], 0),
                        vec4(arg[1][0], arg[1][1], arg[1][2], 0),
                        vec4(arg[2][0], arg[2][1], arg[2][2], 0),
                        vec4(0, 0, 0, 1),
                    ];

                    m.matrix = true;

                    return m;
                }

                const m = [
                    vec4(arg[0][0], arg[0][1], arg[0][2], arg[0][3]),
                    vec4(arg[1][0], arg[1][1], arg[1][2], arg[1][3]),
                    vec4(arg[2][0], arg[2][1], arg[2][2], arg[2][3]),
                    vec4(arg[3][0], arg[3][1], arg[3][2], arg[3][3]),
                ];

                m.matrix = true;

                return m;
            }

            throw new Error("mat4(): bad argument");
        }

        case 3: {
            if (typeof args[0] === "number") {
                for (let i = 0; i < 3; ++i) {
                    if (typeof args[i] !== "number") {
                        throw new Error("mat4(): bad arguments");
                    }
                }

                const m = [
                    vec4(args[0], 0, 0, 0),
                    vec4(0, args[1], 0, 0),
                    vec4(0, 0, args[2], 0),
                    vec4(0, 0, 0, 1),
                ];

                m.matrix = true;

                return m;
            }

            if (typeof args[0][0] === "number") {
                for (let i = 0; i < 3; ++i) {
                    if (args[i].length !== 3) {
                        throw new Error("mat4(): bad arguments");
                    }

                    for (let j = 0; j < 3; ++j) {
                        if (typeof args[i][j] !== "number") {
                            throw new Error("mat4(): bad arguments");
                        }
                    }
                }

                const m = [
                    vec4(args[0][0], args[0][1], args[0][2], 0),
                    vec4(args[1][0], args[1][1], args[1][2], 0),
                    vec4(args[2][0], args[2][1], args[2][2], 0),
                    vec4(0, 0, 0, 1),
                ];

                m.matrix = true;

                return m;
            }

            throw new Error("mat4(): bad arguments");
        }

        case 4: {
            if (typeof args[0] === "number") {
                for (let i = 0; i < 4; ++i) {
                    if (typeof args[i] !== "number") {
                        throw new Error("mat4(): bad arguments");
                    }
                }

                const m = [
                    vec4(args[0], 0, 0, 0),
                    vec4(0, args[1], 0, 0),
                    vec4(0, 0, args[2], 0),
                    vec4(0, 0, 0, args[3]),
                ];

                m.matrix = true;

                return m;
            }

            if (typeof args[0][0] === "number") {
                for (let i = 0; i < 4; ++i) {
                    if (args[i].length !== 4) {
                        throw new Error("mat4(): bad arguments");
                    }

                    for (let j = 0; j < 4; ++j) {
                        if (typeof args[i][j] !== "number") {
                            throw new Error("mat4(): bad arguments");
                        }
                    }
                }

                const m = [
                    vec4(args[0][0], args[0][1], args[0][2], args[0][3]),
                    vec4(args[1][0], args[1][1], args[1][2], args[1][3]),
                    vec4(args[2][0], args[2][1], args[2][2], args[2][3]),
                    vec4(args[3][0], args[3][1], args[3][2], args[3][3]),
                ];

                m.matrix = true;

                return m;
            }

            throw new Error("mat4(): bad arguments");
        }

        case 9: {
            for (let i = 0; i < 9; ++i) {
                if (typeof args[i] !== "number") {
                    throw new Error("mat4(): bad arguments");
                }
            }

            const m = [
                vec4(args[0], args[1], args[2], 0),
                vec4(args[3], args[4], args[5], 0),
                vec4(args[6], args[7], args[8], 0),
                vec4(0, 0, 0, 1),
            ];

            m.matrix = true;

            return m;
        }

        case 16: {
            for (let i = 0; i < 16; ++i) {
                if (typeof args[i] !== "number") {
                    throw new Error("mat4(): bad arguments");
                }
            }

            const m = [
                vec4(args[0], args[1], args[2], args[3]),
                vec4(args[4], args[5], args[6], args[7]),
                vec4(args[8], args[9], args[10], args[11]),
                vec4(args[12], args[13], args[14], args[15]),
            ];

            m.matrix = true;

            return m;
        }

        default: {
            return new Error(`mat4(): bad args length: ${args}`);
        }
    }
}

// 2x2 identity matrix
function identity2() {
    const m = [vec2(1, 0), vec2(0, 1)];

    m.matrix = true;

    return m;
}

// 3x3 identity matrix
function identity3() {
    const m = [vec3(1, 0, 0), vec3(0, 1, 0), vec3(0, 0, 1)];

    m.matrix = true;

    return m;
}

// 4x4 identity matrix
function identity4() {
    const m = [
        vec4(1, 0, 0, 0),
        vec4(0, 1, 0, 0),
        vec4(0, 0, 1, 0),
        vec4(0, 0, 0, 1),
    ];

    m.matrix = true;

    return m;
}

// generic mathematical operations for vectors and matrices

function equal(u, v) {
    const uType = typeof u;
    const vType = typeof v;

    if (
        uType === vType &&
        (uType === "number" || uType === "bigint" || uType === "string")
    ) {
        return u === v;
    }

    const len0 = u.length;
    const elementType = typeof u[0];
    const element2Type = typeof u[0][0];

    if (
        len0 !== v.length ||
        elementType !== typeof v[0] ||
        element2Type !== typeof v[0][0]
    ) {
        return false;
    }

    if (elementType === "number") {
        for (let i = 0; i < len0; ++i) {
            if (u[i] !== v[i]) {
                return false;
            }
        }

        return true;
    }

    if (element2Type === "number") {
        for (let i = 0; i < len0; ++i) {
            const len1 = u[i].length;

            if (len1 !== v[i].length) {
                return false;
            }

            for (let j = 0; j < len1; ++j) {
                if (u[i][j] !== v[i][j]) {
                    return false;
                }
            }
        }

        return true;
    }

    throw new Error("equal(): arguments of unknown or mismatched type");
}

//----------------------------------------------------------------------------

function add(u, v) {
    const uType = typeof u;
    const vType = typeof v;

    if (
        uType === vType &&
        (uType === "number" || uType === "bigint" || uType === "string")
    ) {
        return u + v;
    }

    const len0 = u.length;

    if (len0 !== v.length) {
        throw new Error("add(): dimension mismatch");
    }

    const elementType = typeof u[0];
    const element2Type = typeof u[0][0];

    if (elementType !== typeof v[0] || element2Type !== typeof v[0][0]) {
        throw new Error("add(): type mismatch");
    }

    if (elementType === "number") {
        const result = new Array(len0);

        for (let i = 0; i < len0; ++i) {
            result[i] = u[i] + v[i];
        }

        return result;
    }

    if (element2Type === "number") {
        const len1 = u[0].length;
        const result = new Array(len0);

        for (let i = 0; i < len0; ++i) {
            if (len1 !== u[i].length || len1 !== v[i].length) {
                throw new Error("add(): matrix dimension mismatch");
            }

            result[i] = new Array(len1);

            for (let j = 0; j < len1; ++j) {
                result[i][j] = u[i][j] + v[i][j];
            }
        }

        result.matrix = true;

        return result;
    }

    throw new Error("add(): arguments of unknown or mismatched type");
}

//----------------------------------------------------------------------------

function subtract(u, v) {
    const uType = typeof u;
    const vType = typeof v;

    if (uType === vType && (uType === "number" || uType === "bigint")) {
        return u - v;
    }

    const len0 = u.length;

    if (len0 !== v.length) {
        throw new Error("subtract(): dimension mismatch");
    }

    const elementType = typeof u[0];
    const element2Type = typeof u[0][0];

    if (elementType !== typeof v[0] || element2Type !== typeof v[0][0]) {
        throw new Error("subtract(): type mismatch");
    }

    if (elementType === "number") {
        const result = new Array(len0);
        for (let i = 0; i < len0; ++i) {
            result[i] = u[i] - v[i];
        }

        return result;
    }

    if (element2Type === "number") {
        const len1 = u[0].length;
        const result = new Array(len0);

        for (let i = 0; i < len0; ++i) {
            if (len1 !== u[i].length || len1 !== v[i].length) {
                throw new Error("subtract(): matrix dimension mismatch");
            }

            result[i] = new Array(len1);

            for (let j = 0; j < len1; ++j) {
                result[i][j] = u[i][j] - v[i][j];
            }
        }

        result.matrix = true;

        return result;
    }

    throw new Error("subtract(): arguments of unknown or mismatched type");
}

//----------------------------------------------------------------------------

function mult(u, v) {
    const uType = typeof u;
    const vType = typeof v;

    if (uType === vType && (uType === "number" || uType === "bigint")) {
        return u * v;
    }

    const uElementType = typeof u[0];
    const vElementType = typeof v[0];

    // vector * vector
    // multiplies two vectors term by term
    // returns vector
    if (uElementType === "number" && vElementType === "number") {
        const len = u.length;

        if (len !== v.length) {
            throw new Error("mult(): vector * vector dimension mismatch");
        }

        const result = new Array(len);

        for (let i = 0; i < len; ++i) {
            result[i] = u[i] * v[i];
        }

        return result;
    }

    const uElement2Type = typeof u[0][0];

    // matrix * vector
    // returns vector
    if (uElement2Type === "number" && vElementType === "number") {
        const numRows = u.length;
        const numColumns = u[0].length;

        for (let i = 0; i < numRows; ++i) {
            if (u[i].length !== numColumns) {
                throw new Error(
                    "mult(): matrix * vector: nested array not matrix",
                );
            }
        }

        if (numColumns !== v.length) {
            throw new Error("mult(): matrix * vector: dimension mismatch");
        }

        const result = new Array(numRows);

        for (let i = 0; i < numRows; ++i) {
            result[i] = 0;
            for (let j = 0; j < numColumns; ++j) {
                result[i] += u[i][j] * v[j];
            }
        }

        return result;
    }

    const vElement2Type = typeof v[0][0];

    // vector * matrix
    // returns vector
    if (uElementType === "number" && vElement2Type === "number") {
        const vNumRows = v.length;
        const vNumColumns = v[0].length;

        if (u.length !== vNumRows) {
            throw new Error("mult(): vector * matrix dimension mismatch");
        }

        for (let i = 0; i < vNumRows; ++i) {
            if (v[i].length !== vNumColumns) {
                throw new Error(
                    "mult(): vector * matrix: nested array not matrix",
                );
            }
        }

        const result = new Array(vNumColumns);

        for (let c = 0; c < vNumColumns; ++c) {
            // initialize the current cell
            result[c] = 0;

            for (let r = 0; r < vNumRows; ++r) {
                result[c] += u[r] * v[r][c];
            }
        }

        return result;
    }

    // matrix * matrix
    // multiplies matrices
    // returns matrix
    if (uElement2Type === "number" && vElement2Type === "number") {
        const uNumRows = u.length;
        const uNumColumns = u[0].length;
        const vNumColumns = v[0].length;

        if (uNumColumns !== v.length) {
            throw new Error("mult(): matrix * matrix dimension mismatch");
        }

        for (let i = 0; i < uNumRows; ++i) {
            if (u[i].length !== uNumColumns) {
                throw new Error(
                    "mult(): matrix * matrix: nested array not matrix",
                );
            }
        }

        for (let i = 0; i < uNumColumns; ++i) {
            if (v[i].length !== vNumColumns) {
                throw new Error(
                    "mult(): matrix * matrix: nested array not matrix",
                );
            }
        }

        // initialize array of rows
        const result = new Array(uNumRows);

        for (let r = 0; r < uNumRows; ++r) {
            // initialize current row
            result[r] = new Array(vNumColumns);

            for (let c = 0; c < vNumColumns; ++c) {
                // initialize current cell
                result[r][c] = 0;

                for (let i = 0; i < uNumColumns; ++i) {
                    result[r][c] += u[r][i] * v[i][c];
                }
            }
        }

        result.matrix = true;

        return result;
    }

    throw new Error("mult(): arguments of unknown or mismatched type");
}

// matrix functions

// transpose matrix
function transpose(m) {
    if (typeof m[0][0] !== "number") {
        throw new Error("transpose(): argument is not matrix");
    }

    const numRows = m.length;
    const numColumns = m[0].length;

    for (let i = 0; i < numRows; ++i) {
        if (numColumns !== m[i].length) {
            throw new Error("transpose(): argument is not matrix");
        }
    }

    const result = new Array(numColumns);

    for (let i = 0; i < numColumns; ++i) {
        result[i] = new Array(numRows);

        for (let j = 0; j < numRows; ++j) {
            result[i][j] = m[j][i];
        }
    }

    result.matrix = true;

    return result;
}

// vector functions

// computes the dot product between vectors u and v
function dot(u, v) {
    const len = u.length;
    if (len !== v.length) {
        throw new Error("dot(): vectors are not same dimension");
    }

    let sum = 0;
    for (let i = 0; i < len; ++i) {
        sum += u[i] * v[i];
    }

    return sum;
}

//----------------------------------------------------------------------------

// negates u
function negate(u) {
    const uType = typeof u;

    if (uType === "number" || uType === "bigint") {
        return -u;
    }

    if (typeof u[0] === "number") {
        const len = u.length;
        const result = new Array(len);

        for (let i = 0; i < len; ++i) {
            result[i] = -u[i];
        }

        return result;
    }

    if (typeof u[0][0] === "number") {
        const len0 = u.length;
        const len1 = u[0].length;
        const result = new Array(len0);

        for (let i = 0; i < len0; ++i) {
            if (len1 !== u[i].length) {
                throw new Error(
                    "negate(): nested array argument is not matrix",
                );
            }

            result[i] = new Array(len1);

            for (let j = 0; j < len1; ++j) {
                result[i][j] = -u[i][j];
            }

            result.matrix = true;

            return result;
        }
    }

    throw new Error("negate(): argument of unknown type");
}

//----------------------------------------------------------------------------

// computes cross product of vectors u and v
function cross(u, v) {
    if (!Array.isArray(u) || u.length < 3) {
        throw new Error("cross(): first argument is not vector of at least 3");
    }

    if (!Array.isArray(v) || v.length < 3) {
        throw new Error("cross(): second argument is not vector of at least 3");
    }

    return vec3(
        u[1] * v[2] - u[2] * v[1],
        u[2] * v[0] - u[0] * v[2],
        u[0] * v[1] - u[1] * v[0],
    );
}

//----------------------------------------------------------------------------

// magnitude of vector
function vecMagnitude(u) {
    return Math.sqrt(dot(u, u));
}

//----------------------------------------------------------------------------

// normalize a vector with or without last component
function normalize(u, excludeLastComponent = false) {
    // if (excludeLastComponent) {
    //     var last = u.pop();
    // }
    const last = excludeLastComponent ? u.pop() : null;

    const magnitude = vecMagnitude(u);

    if (!isFinite(magnitude)) {
        throw new Error(`normalize(): vector ${u} has zero length`);
    }

    const len = u.length;
    for (let i = 0; i < len; ++i) {
        u[i] /= magnitude;
    }

    if (excludeLastComponent) {
        u.push(last);
    }

    return u;
}

//----------------------------------------------------------------------------

function mix(u, v, s) {
    if (typeof s !== "number") {
        throw new Error(`mix(): last argument ${s} must be a number`);
    }

    const len = u.length;

    if (len !== v.length) {
        throw new Error("mix(): vector dimension mismatch");
    }

    const result = new Array(len);

    for (let i = 0; i < len; ++i) {
        result[i] = s * u[i] + (1 - s) * v[i];
    }

    return result;
}
