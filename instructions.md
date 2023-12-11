Goal:

You will implement a simple boid (flock of birds) simulation in 3D using WebGL

Background:

Boids (bird like objects) move based on aggregate behavior, based on other entities in its local neighborhood. The earliest work on boids was due to Craig Reynolds, in his 1987 SIGGRAPH paper:

-   Reynolds, C. W. (1987) Flocks, Herds, and Schools: A Distributed Behavioral Model, in Computer Graphics, 21(4) (SIGGRAPH '87 Conference Proceedings) pages 25-34.
    <https://red3d.com/cwr/papers/1987/boids.html>

The following document also provides a simple means to implement boid movement:

-   boids_1.pdf

Use the tetrahedron geometry (adapt it to your application):

tetra.js

Tasks:

You will implement a simple boid simulation using the following 3 rules:

-   Cohesion: Boids tend to stay close together
-   Alignment: Boids tend to fly similar to its neighbors
-   Separation: Boids maintain a separation distance to avoid running into each other.

The algorithm involves computing 3 vectors corresponding to the 3 rules for each boid (details below), then combining these vectors to get a resultant vector, which represents the boid's velocity and direction. The boid is then moved as per this vector in 3D. Two views of the simulation are shown below:

Initialization, Data Structures:

-   The boids will be assumed to be continuously flying within a 3D volume (for instance, 1000x1000x1000).
-   Each boid will have a set of properties, such as position, velocity, color, etc.
-   Each boid start out at a random position within the volume.
-   Implementing the 3 rules stated above requires repeated determination of the local neighbors of each boid (boids will be assumed to have a spherical volume of influence or it could be a box).

Given the number of boids (typically in the order of 100s), this needs to be an efficient operation. You will use a 3D uniform grid, with each grid cell occupying a certain subvolume of the boid space. Each cell will contain some number of boids, based on their current position (or it can be empty).

Boid Geometry:

You can use a tetrahedron to represent each boid with the following vertices. Adapt the source file posted above into your application for the tetra geometry.

Task 1: Implement Cohesion, Alignment, Separation

Cohesion: Boids tend to stay close to each other.

Implementation:

-   Find the boid's neighbors, if there are no neighbors return the zero vector
-   Compute the center position of the neighboring boids (average of their positions) and find the vector from the boid to the center.
-   Return the cohesion vector.

Alignment: Boids tend to fly in directions similar to its neighbors

Implementation:

-   Find the boid's neighbors, if there are no neighbors return the zero vector
-   Get the average resultant vector of all the boid's neighbors
-   Return the resultant vector

Separation: Boids maintain a minimum distance from each other.

Implementation:

-   Find the boid's neighbors, if there are no neighbors return the zero vector
-   For each of the boid's neighbors:
    -   compute the vector from this neighbor to the boid's position
    -   if the vector magnitude is positive, normalize the vector and then divide by the magnitude (force inversely proportional to distance) between them
-   Combine all forces, return vector

Task 2 [Optional]: Implementing Uniform Grid for efficient access to Boid's neighbors [Extra Credit]

You will maintain a 3D uniform grid of cells, each of which will represent a cubical subvolume of the boid space. Assume the boid volume is a large cube. Each cell will contain a subset of boids (can be empty).

Operations on the grid that will need to be implemented:

-   Initialization: Each boid will start at a random position within the boid space and will be need to be inserted into its cell, corresponding to its position.
-   Neighbors: Given a boid position, find the neighbors given a position and radius (find the cells that are within the radius in 3D (3D cube), then eliminate boids that are further than the radius of influence).
-   Addressing: Need to find the cell address of a boid, given its position (x, y, z)
-   Move a boid from one grid cell to another (insert, remove).

Task 3: Boid shape, Color

Use a tetrahedron to represent the boids. Each boid will start with a random color. Once the simulation starts, the boids within a grid cell (as they are identified) can have their colors averaged. This will help identify flocks as they are formed.

Implementation Notes:

-   You will need to assume a number of constants for this simulation, such as
    -   Max speed of the boid
    -   Weights for each of the 3 rules that when combined determines a boid's direction
    -   Radius of influence of each boid for each rule - assume a spherical region of influence around each boid, defined by its radius.
-   Similarly, you will need to choose appropriate size for the uniform grid in relation to the boid space.
-   Other constants include the number of boids (use in the order of 100s to see good clustering).

Example Output:

Boids Project Rubric

Criteria

Initialization:
Proper initialization of the geometry, buffers and other one time specification of boids properties

Boid Properties:
Implementation of the 3 properties of the boid model and updates

Boid Rendering:
Boids are rendered and smoothly move through the object space within a bound and flocking together into clusters
