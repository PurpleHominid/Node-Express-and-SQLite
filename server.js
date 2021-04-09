'use strict';
//webservices and api route management functions


const express = require(`express`); //add express.js services so we can utilise its web and api framework
const app = express(); //create a new 'express' object and hold it in 'app' 
const PORT = process.env.PORT || 4000; //set a default port or (if not defined) use a suitable one to listen to incoming connections


const sql = require("./sql.js"); //add our (local) sql services to handle database transactions 
let db = sql.connect(); //execute the connect function in our sql services script


app.use(express.static(`client`)); //setup to serve static files (css, images, etc)
app.use(express.json({ limit: `1mb` })); //set a limit to avoid excessive data being posted
app.use(express.urlencoded({ extended: true })); //use the 'qs library' to parse json data


//disconnect any active/open database connections if a 'terminate' signal is detected
process.on('exit', () => { sql.disconnect(); });
process.on('SIGHUP', () => process.exit(128 + 1));
process.on('SIGINT', () => process.exit(128 + 2));
process.on('SIGTERM', () => process.exit(128 + 15));


//open the port and wait for incoming connections
app.listen(PORT, () => {
	console.log(`api server listening on port: ${PORT}`);
});


//define the 'default' route, this will simply return the client facing (front-end) web app; well maybe not a 'finished' web app!
app.get(`/`, function (request, response) {
	const options = {
		root: __dirname, // __dirname specifies the folder of the currently executing script
	};
    response.sendFile(`/client/default.html`, options); //return the default document for ui (in the current folder)
})


app.get(`/buildschema`, function (request, response) {
	console.log("build schema request received");

	//execute the required database function/behaviour and store the returned response
	let status = sql.build(db);
	
	//prepare a response to the client; essentially we are re-writing the same json object for fun
	response.json({
		operation: status.operation,
		success: status.success,
		code: status.code,
		message: status.message,
		results: status.results,
	})
	response.end(); //end the response process; mostly called automatically
});


app.get(`/dropschema`, function (request, response) {
	console.log("build schema request received");

	//execute the required database function/behaviour and store the returned response
	let status = sql.drop(db);
	
	//prepare a response to the client; essentially we are re-writing the same json object for fun
	response.json({
		operation: status.operation,
		success: status.success,
		code: status.code,
		message: status.message,
		results: status.results,
	})
	response.end(); //end the response process; mostly called automatically
});


app.post(`/adduser`, function (request, response) {
	console.log("add user request received");

	let userid = request.body.userid; //extract the expected data items from the posted 'body' object
	let friendlyname = request.body.friendlyname;
	let emailaddress = request.body.emailaddress; 
	let admin = request.body.admin;

	//execute the required database function/behaviour, pass data and store the returned response
	let status = sql.adduser(db, userid, friendlyname, emailaddress, admin);
	
	//prepare a response to the client; essentially we are re-writing the same json object for fun
	response.json({
		operation: status.operation,
		success: status.success,
		code: status.code,
		message: status.message,
		results: status.results,
	})
	response.end(); //end the response process; mostly called automatically
});


app.get(`/allusers`, function (request, response) {
	console.log("all users request received");

	//execute the required database function/behaviour and store the returned response
	let status = sql.allusers(db);
	
	//prepare a response to the client; essentially we are re-writing the same json object for fun
	response.json({
		operation: status.operation,
		success: status.success,
		code: status.code,
		message: status.message,
		results: status.results,
	})
	response.end(); //end the response process; mostly called automatically
});


app.get(`/init/:uname`, function (request, response) {
	//get supports params and query
	console.log("/init get request received");
	const data = request.body;
	
	console.log("----");
	console.log(data);
	console.log("----");

	console.log("Request param uname: " + request.params.uname);
	console.log("Request query answer: " + request.query.answer);
	console.log("Request body answer: " + request.body.answer);
	
	//prepare response
	sql.init(db);

	response.json({
		status: "success",
		value: "replied from GET",
	})
	response.end();
});


app.post(`/init/:uname`, function (request, response) {
	//post supports params and body
	console.log("/init post request received");
	const data = request.body;
	
	console.log("----");
	console.log(data);
	console.log("----");

	console.log("Request param uname: " + request.params.uname);
	console.log("Request query answer: " + request.query.answer);
	console.log("Request body answer: " + request.body.answer);
	
	//prepare response
	sql.init(db);

	response.json({
		status: "success",
		value: "replied from POST",
	})
	response.end();
});


app.put(`/init/:uname`, function (request, response) {
	//put supports params and body
	console.log("/init put request received");
	const data = request.body;
	
	console.log("----");
	console.log(data);
	console.log("----");

	console.log("Request param uname: " + request.params.uname);
	console.log("Request query answer: " + request.query.answer);
	console.log("Request body answer: " + request.body.answer);
	
	//prepare response
	sql.init(db);

	response.json({
		status: "success",
		value: "replied from PUT",
	})
	response.end();
});


app.patch(`/init/:uname`, function (request, response) {
	//patch supports params and body
	console.log("/init patch request received");
	const data = request.body;
	
	console.log("----");
	console.log(data);
	console.log("----");

	console.log("Request param uname: " + request.params.uname);
	console.log("Request query answer: " + request.query.answer);
	console.log("Request body answer: " + request.body.answer);
	
	//prepare response
	sql.init(db);

	response.json({
		status: "success",
		value: "replied from PATCH",
	})
	response.end();
});


app.delete(`/init/:uname`, function (request, response) {
	//delete supports params and body
	console.log("/init delete request received");
	const data = request.body;
	
	console.log("----");
	console.log(data);
	console.log("----");

	console.log("Request param uname: " + request.params.uname);
	console.log("Request query answer: " + request.query.answer);
	console.log("Request body answer: " + request.body.answer);
	
	//prepare response
	sql.init(db);

	response.json({
		status: "success",
		value: "replied from DELETE",
	})
	response.end();
});
