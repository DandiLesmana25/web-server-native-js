const http = require('http');

/**
 * Logika untuk menangani dan menanggapi request dituliskan pada fungsi ini
 * 
 * @param request: objek yang berisikan informasi terkait permintaan
 * @param response: objek yang digunakan untuk menanggapi permintaan
 */


//Request listener memiliki 2 parameter, yakni request dan response
const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;

    const { method, url } = request;

    // Routing Request
    if (url === '/') {
        if (method === 'GET') {
            response.end('<h1>Ini adalah homepage</h1>');
        } else {
            // response bila client tidak menggunakan GET
            response.end(`<h1>Halaman tidak dapat diakses dengan ${method} request</h1>`);
        }

    } else if (url === '/about') {
        if (method === 'GET') {
            response.end('<h1>Halo! Ini adalah halaman about</h1>')
        } else if (method === 'POST') {
            // array null berfungsi untuk menampung buffer pada stream
            let body = [];

            // event data
            request.on('data', (chunk) => {
                body.push(chunk);
            });

            // event end
            request.on('end', () => {
                body = Buffer.concat(body).toString();

                // untuk mengubah JSON string menjadi JavaScript objek
                const { name } = JSON.parse(body);
                response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
            });
        } else {
            response.end(`<h1>Halaman tidak dapat diakses menggunakan ${method} request</h1>`);
            // respons bila client tidak menggunakan GET ataupun POST
        }
    } else {
        response.end('<h1>Halaman tidak ditemukan!</h1>');
    }

};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`server berjalan pada http://${host}:${port}`)
})