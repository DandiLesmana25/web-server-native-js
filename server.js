const http = require('http');

/**
 * Logika untuk menangani dan menanggapi request dituliskan pada fungsi ini
 * 
 * @param request: objek yang berisikan informasi terkait permintaan
 * @param response: objek yang digunakan untuk menanggapi permintaan
 */


//Request listener memiliki 2 parameter, yakni request dan response
const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('X-Powered-By', 'NodeJS');

    const { method, url } = request;

    // Routing Request
    if (url === '/') {
        if (method === 'GET') {

            response.statusCode = 200;
            //change JavaScript object to JSON string
            response.end(JSON.stringify({
                message: 'Ini adalah homepage',
            }));
        } else {

            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses dengan ${method} request`,
            }));
        }

    } else if (url === '/about') {
        if (method === 'GET') {

            response.statusCode = 200;

            //change JavaScript object to JSON string
            response.end(JSON.stringify({
                message: 'Halo! Ini adalah halaman about',
            }));
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
                response.statusCode = 200;
                response.end(JSON.stringify({
                    message: `Halo, ${name}! Ini adalah halaman about`,
                }));
            });
        } else {

            response.statusCode = 400;
            response.end(JSON.stringify({
                message: `Halaman tidak dapat diakses menggunakan ${method} request`,
            }));
        }
    } else {

        response.statusCode = 404;
        //ubah objek JavaScript menjadi JSON string
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan!',
        }));
    }

};

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`server berjalan pada http://${host}:${port}`)
})