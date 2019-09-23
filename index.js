var http=require('http');
var url1 = "https://api.openweathermap.org/data/2.5/weather?q=";
var url2="&appid=489d8c43e35ed4e7c374817280219b3b";
var express = require('express');
var app = express();
app.set('view engine','ejs');
app.use('/public',express.static('assets'));
var bodyParser = require('body-parser');
var postParser = bodyParser.urlencoded({ extended: false });



app.get('/',function(req,res){
	res.render('template');
});

app.post('/', postParser, function (req, res,err) {

    var request12 = require('request');
    var url=url1+req.body['city']+url2;	
	request12(url,function(error,respnose,bodymaterial){
	
		console.log(bodymaterial);
		data=JSON.parse(bodymaterial);
    	var r=data["main"];
		var city= req.body['city'];
		var temp = (Math.ceil(r["temp"]-273.15)).toString();
		var hud = r['humidity'].toString();
		var pres =r['pressure'].toString();
		// var tm=r['temp_min'].toString();
    	res.render('template2',{place:city,temperature:temp,humidity:hud,pressure:pres});
	});
});
try{
app.listen(3333);
}
catch(e)
{

}

// http.createServer(function (request123, responseweb) {
		
// 	var request12 = require('request');
// 	request12(url,function(err,res,body){

// 			var data=JSON.parse(body);
// 			console.log(data);
// 			var r=data['main'];
// 			responseweb.write(r['temp'].toString());
// 			responseweb.end();

// 	});

// }).listen(3333);


