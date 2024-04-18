// basic node server having basic auth
// Run: node index.js
// Open: http://localhost:3000

const http = require("http");
const port = 3000;
const hostname = "localhost";

const server = http.createServer((req, res) => {
    if (req.url === "/manifest.json") {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({
            name: "Basic Auth Test",
            short_name: "Basic Auth Test",
            start_url: ".",
            display: "standalone",
            orientation: "portrait",
            theme_color: "#000000",
            background_color: "#ffffff",
        }));
        return;
    }


    const auth = req.headers["authorization"];
    if (!auth) {
        res.statusCode = 401;
        res.setHeader("WWW-Authenticate", "Basic realm=\"Secure Area\"");
        res.end("Please enter credentials");
        return;
    }

    const credentials = Buffer.from(auth.split(" ")[1], "base64").toString("ascii");
    const [username, password] = credentials.split(":");

    if (username === "apple" && password === "apple") {
        res.statusCode = 200;
        res.end(`
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Basic Auth Test</title>
            <link rel="manifest" href="/manifest.json">
        </head>
        <body>
            <h1>Basic Auth Test</h1>
            <p>Access Granted</p>
        </body>
        </html>
        `);
    } else {
        res.statusCode = 403;
        res.end(`
        <!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <title>Basic Auth Test</title>
            <link rel="manifest" href="/manifest.json">
        </head>
        <body>
            <h1>Basic Auth Test</h1>
            <p>Access DENIED</p>
        </body>
        </html>
        `);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
