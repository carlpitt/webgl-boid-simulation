// init-shaders.js

// initializes vertex and fragment shaders
// source: Angel/Shreiner book tools
function initShaders(gl, vertexShaderId, fragmentShaderId) {
    const vertexElement = document.getElementById(vertexShaderId);
    if (vertexElement === null || vertexElement.textContent === null) {
        alert(`Unable to load vertex shader ${vertexShaderId}`);
        return null;
    }

    // create vertex shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);

    // read it as string
    // vertexElement.textContent.replace(/^\s+|\s+$/g, ""),
    gl.shaderSource(vertexShader, vertexElement.textContent.trim());

    // compile it
    gl.compileShader(vertexShader);

    // print error logs if compilation failed
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        const msg =
            "Vertex shader failed to compile.\n" +
            `The error log is: <pre>${gl.getShaderInfoLog(vertexShader)}</pre>`;
        alert(msg);
        return null;
    }

    // get and then compile fragment shader source (string)
    const fragElement = document.getElementById(fragmentShaderId);
    if (fragElement === null || fragElement.textContent === null) {
        alert(`Unable to load fragment shader ${fragmentShaderId}`);
        return null;
    }

    // create fragment shader
    const fragShader = gl.createShader(gl.FRAGMENT_SHADER);

    // read it as string
    // fragElement.textContent.replace(/^\s+|\s+$/g, ""),
    gl.shaderSource(fragShader, fragElement.textContent.trim());

    // compile it
    gl.compileShader(fragShader);

    // print error logs if compilation failed
    if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
        const msg =
            "Fragment program failed to compile.\n" +
            `The error log is: <pre>${gl.getShaderInfoLog(fragShader)}</pre>`;
        alert(msg);
        return null;
    }

    // create a shader program
    const program = gl.createProgram();

    // attach the two shaders to the program
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragShader);

    // link the program
    gl.linkProgram(program);

    // if linking failed, print error log
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const msg =
            "Shader program failed to link.\n" +
            `The error log is: <pre>${gl.getProgramInfoLog(program)}</pre>`;
        alert(msg);
        return null;
    }

    return program;
}
