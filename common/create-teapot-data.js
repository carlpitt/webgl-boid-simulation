function bezier(u) {
    const a = 1 - u;
    return [
        u * u * u,
        //
        3 * a * u * u,
        //
        3 * a * a * u,
        //
        a * a * a,
    ];
}

function nbezier(u) {
    return [
        3 * u * u,
        3 * u * (2 - 3 * u),
        3 * (1 - 4 * u + 3 * u * u),
        -3 * (1 - u) * (1 - u),
    ];
}

// let numTeapotVertices;
// let vertices;
// let numTeapotPatches;
// let indices;
// let vec4;
// let add;
// let crossProduct;
// let normalize;

// returns vertices and normals for a particular resolution
function createTeapotGeometry(numDivisions) {
    const sum = [0, 0, 0];

    for (let i = 0; i < numTeapotVertices; ++i) {
        for (let j = 0; j < 3; ++j) {
            sum[j] += vertices[i][j];
        }
    }

    for (let i = 0; i < 3; ++i) {
        sum[i] /= numTeapotVertices;
    }

    for (let i = 0; i < numTeapotVertices; ++i) {
        for (let j = 0; j < 2; ++j) {
            vertices[i][j] -= sum[j] / 2;
        }
    }

    for (let i = 0; i < numTeapotVertices; ++i) {
        for (let j = 0; j < 3; ++j) {
            vertices[i][j] *= 2;
        }
    }

    const patch = new Array(numTeapotPatches);

    for (let i = 0; i < numTeapotPatches; ++i) {
        patch[i] = new Array(16);
    }

    for (let i = 0; i < numTeapotPatches; ++i) {
        for (let j = 0; j < 16; ++j) {
            patch[i][j] = vec4(
                vertices[indices[i][j]][0],
                vertices[indices[i][j]][2],
                vertices[indices[i][j]][1],
                1,
            );
        }
    }

    const points = [];
    const normals = [];
    // let index = 0;

    for (let n = 0; n < numTeapotPatches; ++n) {
        const data = new Array(numDivisions + 1);

        for (let i = 0; i <= numDivisions; ++i) {
            data[i] = new Array(numDivisions + 1);
        }

        const h = 1 / numDivisions;

        for (let i = 0; i <= numDivisions; ++i) {
            for (let j = 0; j <= numDivisions; ++j) {
                data[i][j] = vec4(0, 0, 0, 1);
                const u = i * h;
                const v = j * h;
                const t = new Array(4);
                for (let ii = 0; ii < 4; ++ii) {
                    t[ii] = new Array(4);
                }

                for (let ii = 0; ii < 4; ++ii) {
                    for (let jj = 0; jj < 4; ++jj) {
                        t[ii][jj] = bezier(u)[ii] * bezier(v)[jj];
                    }
                }

                for (let ii = 0; ii < 4; ++ii) {
                    for (let jj = 0; jj < 4; ++jj) {
                        const vec = vec4(patch[n][4 * ii + jj]);
                        const temp = scale(t[ii][jj], vec);
                        data[i][j] = add(data[i][j], temp);
                    }
                }
            }
        }

        const nData = new Array(numDivisions + 1);
        for (let i = 0; i <= numDivisions; ++i) {
            nData[i] = new Array(numDivisions + 1);
        }

        const tData = new Array(numDivisions + 1);
        for (let i = 0; i <= numDivisions; ++i) {
            tData[i] = new Array(numDivisions + 1);
        }

        const sData = new Array(numDivisions + 1);
        for (let i = 0; i <= numDivisions; ++i) {
            sData[i] = new Array(numDivisions + 1);
        }

        for (let i = 0; i <= numDivisions; ++i) {
            for (let j = 0; j <= numDivisions; ++j) {
                nData[i][j] = vec4(0, 0, 0, 0);
                sData[i][j] = vec4(0, 0, 0, 0);
                tData[i][j] = vec4(0, 0, 0, 0);
                const u = i * h;
                const v = j * h;
                const tt = new Array(4);
                for (let ii = 0; ii < 4; ++ii) {
                    tt[ii] = new Array(4);
                }

                const ss = new Array(4);
                for (let ii = 0; ii < 4; ++ii) {
                    ss[ii] = new Array(4);
                }

                for (let ii = 0; ii < 4; ++ii) {
                    for (let jj = 0; jj < 4; ++jj) {
                        tt[ii][jj] = nbezier(u)[ii] * bezier(v)[jj];
                        ss[ii][jj] = bezier(u)[ii] * nbezier(v)[jj];
                    }
                }

                for (let ii = 0; ii < 4; ++ii) {
                    for (let jj = 0; jj < 4; ++jj) {
                        const vec = vec4(patch[n][4 * ii + jj]);
                        const temp = scale(tt[ii][jj], vec);
                        tData[i][j] = add(tData[i][j], temp);

                        const sVec = vec4(patch[n][4 * ii + jj]);
                        const sTemp = scale(ss[ii][jj], sVec);
                        sData[i][j] = add(sData[i][j], sTemp);
                    }
                }

                const temp = crossProduct(tData[i][j], sData[i][j]);
                nData[i][j] = normalize(vec4(temp[0], temp[1], temp[2], 0));
            }
        }

        for (let i = 0; i < numDivisions; ++i) {
            for (let j = 0; j < numDivisions; ++j) {
                points.push(data[i][j]);
                normals.push(nData[i][j]);

                points.push(data[i + 1][j]);
                normals.push(nData[i + 1][j]);

                points.push(data[i + 1][j + 1]);
                normals.push(nData[i + 1][j + 1]);

                points.push(data[i][j]);
                normals.push(nData[i][j]);

                points.push(data[i + 1][j + 1]);
                normals.push(nData[i + 1][j + 1]);

                points.push(data[i][j + 1]);
                normals.push(nData[i][j + 1]);
                // index += 6;
            }
        }
    }

    return [points, normals];
}

// function scale(x, y, z) {
//     if (Array.isArray(x) && x.length == 3) {
//         const result = mat4();
//         result[0][0] = x[0];
//         result[1][1] = x[1];
//         result[2][2] = x[2];

//         return result;
//     }

//     const result = mat4();
//     result[0][0] = x;
//     result[1][1] = y;
//     result[2][2] = z;

//     return result;
// }

function scale(s, u) {
    if (!Array.isArray(u)) {
        throw new Error(`scale(): second parameter ${u} is not a vector`);
    }

    const len = u.length;
    const result = new Array(len);
    for (let i = 0; i < len; ++i) {
        result[i] = s * u[i];
    }

    return result;
}
