const util    = require('util');
const express = require('express');
const mysql   = require('mysql');
const app     = express();
const port    = 3000;
app.use(express.static('public')); 

const conn = mysql.createConnection( {
	host: '10.2.0.20',  /*195.199.230.210 */
	user: 'user',
	port: "3306",
	password: 'Pite137',
	database: 'ITBOLT'     /* create_it_termekek.sql */
});

app.post("/naplo", (req, res) => {
    var sql = "SELECT URL FROM naplo GROUP BY url ORDER BY url;"
    Send_to_JSON(req, res, sql);
});

app.post("/lista/:url", (req, res) => {
    var sql = `SELECT USER, URL, SQLX, DATUMIDO FROM naplo WHERE URL = "${req.params.url}" ORDER BY DATUMIDO;`
    Send_to_JSON(req, res, sql);
});

function Send_to_JSON (req, res, sql) {
	conn.query(sql, (error, results) => {
		var data = error ? error : JSON.parse(JSON.stringify(results)); 
		console.log(util.inspect(data, false, null, true));
		session_data = req.session;
		res.set('Content-Type', 'application/json; charset=UTF-8');
		res.send(data);
		res.end();
	}); 
}

app.listen(port, function () { console.log(`bs app listening at http://localhost:${port}`); });