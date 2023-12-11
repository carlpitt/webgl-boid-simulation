class Boid {
    damp = 0.45;

    // x: -320 to 320
    // y: -320 to 320
    // z: -200 to 100
    constructor() {
        this.pos = vec3(
            getRandomArbitrary(-320, 320),
            getRandomArbitrary(-320, 320),
            getRandomArbitrary(-200, 100),
        );
        this.a = vec3();
        this.v = vec3(getRandomArbitrary(-3, 3), getRandomArbitrary(-3, 3));
        this.color = randomColors(12);
        this.rot = randomRot();
    }

    update(boids) {
        // update vector
        const coh = mult(
            cohesion(getNeighbors(boids, rangeCohesion)),
            magnitudeCohesion,
        );
        const sep = mult(
            separation(getNeighbors(boids, rangeSeparation)),
            magnitudeSeparation,
        );
        const ali = mult(
            alignment(getNeighbors(boids, rangeAlignment)),
            magnitudeAlignment,
        );

        // combine accelerations
        const randomizeV = new vec3(
            getRandomArbitrary(-randV, randV),
            getRandomArbitrary(-randV, randV),
        );
        this.a = add(coh, add(sep, ali));
        this.a = add(this.a, randomizeV);
        // clamp accelerations
        this.a.set(
            clampV(this.a.x, maxAcceleration),
            clampV(this.a.y, maxAcceleration),
        );

        // get vectors
        this.v = mult(add(this.a, this.v), damp);
        // clamp velocity
        this.v.set(
            clampV(this.v[0], maxVelocity),
            clampV(this.v[1], maxVelocity),
        );

        // update position
        this.pos = add(this.pos, v);

        // make sure boid stays in the boundary
        this.pos.set(
            wrapAroundFloat(this.pos.x, 0, width),
            wrapAroundFloat(this.pos.y, 0, height),
        );

        // draw a boid
        // fill(39, 206, 195);
        // ellipse(this.pos.x, this.pos.y, radius, radius);
    }

    // get neighborhood list
    getNeighbors(boids, radius) {
        const neighbors = [];

        for (const other of boids) {
            if (other !== this && dist(this.pos, other.pos) <= radius) {
                neighbors.push(other);
            }
        }

        return neighbors;
    }

    wrapAroundFloat(value, min, max) {
        if (value > max) {
            return min;
        }
        if (value < min) {
            return max;
        }
        return value;
    }

    // clamp speed or acceleration to max
    clampV(r, max) {
        if (r > max) {
            return max;
        }
        if (r < -max) {
            return -max;
        }
        return r;
    }

    cohesion(neighbors) {
        let r = vec3();

        // if there are no neighbors, finish here and return 0 vector
        if (neighbors.length === 0) {
            return r;
        }

        // find the center position of this boid’s neighbors
        for (const other of neighbors) {
            r = add(r, other.pos);
        }
        r = div(r, neighbors.length);

        // find a new vector from this boid’s position to this center position
        r = subtract(r, this.pos);

        // return the norma
        return normalize(r);
    }

    separation(neighbors) {
        let r = vec3();

        // if there are no neighbors, finish here and return 0 vector
        if (neighbors.length === 0) {
            return r;
        }

        // add the contribution of each neighbor towards me
        for (const other of neighbors) {
            const towardsMe = subtract(this.pos, other.pos);

            // force contribution will vary inversely proportional
            if (vecMagnitude(towardsMe) > 0) {
                // to distance or even the square of the distance
                r = add(r, div(normalize(towardsMe), vecMagnitude(towardsMe)));
            }
        }

        return normalize(r);
    }

    alignment(neighbors) {
        let r = vec3();

        // if there are no neighbors, finish here and return 0 vector.
        if (neighbors.length === 0) {
            return r;
        }

        // for each neighbor boid, get current vector and combine all to find the average vector within its neighbors
        for (const boid of neighbors) {
            r = add(r, boid.v);
        }

        return normalize(r);
    }
}

class Tetrahedron {
    constructor(posX, posY, posZ, rot) {
        this.va = vec4(0, 0, -1, 1);
        this.vb = vec4(0, 0.942809, 0.333333, 1);
        this.vc = vec4(-0.816497, -0.471405, 0.333333, 1);
        this.vd = vec4(0.816497, -0.471405, 0.333333, 1);

        // scale up the tetrahedron, form the matrix
        const position = translate(posX, posY, posZ);

        const mScale = mult(
            position,
            mult(
                rot,
                mult(
                    translate(0, 0, -1),
                    mult(scale(4, 4, 4), translate(0, 0, 1)),
                ),
            ),
        );

        this.va = mult(mScale, this.va);
        this.vb = mult(mScale, this.vb);
        this.vc = mult(mScale, this.vc);
        this.vd = mult(mScale, this.vd);

        this.vertices = [];
        this.normals = [];
    }

    getVerticesNormals() {
        this.triangle(this.va, this.vb, this.vc);
        this.triangle(this.vd, this.vc, this.vb);
        this.triangle(this.va, this.vd, this.vb);
        this.triangle(this.va, this.vc, this.vd);
    }

    triangle(a, b, c) {
        this.normals.push(vec3(a), vec3(b), vec3(c));
        this.vertices.push(a, b, c);
    }

    getNumVertices() {
        return this.vertices.length;
    }
}

function getTetrahedronVertices(posX, posY, posZ, rot) {
    const tet = new Tetrahedron(posX, posY, posZ, rot);
    tet.getVerticesNormals();
    return tet.vertices;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomArbitrary(min, max) {
    return (max - min) * Math.random() + min;
}
