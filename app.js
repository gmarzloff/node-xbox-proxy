/* This file creates a node proxy for XboxAPI 
 * so students may use the JSON API calls without having to run 
 * their own server. Only a subset of API calls are available.
 * The free version of XboxAPI allows for 120 requests per hour.
*/

const express = require('express');
const app = express();
const fs = require('fs');
const https = require('https');
const config = require('apiSettings');
const xbox = require('node-xbox')(config.XBOX_API_KEY);
const amazon = require('amazon-product-api');

var amzClient = amazon.createClient({
        awsId: config.AWS_ID,
        awsSecret: config.AWS_SECRET,
        awsTag: config.AWS_TAG
});


app.get('/', function(req,res){
	res.send('Hello, Node Express User.');
});

app.get('/amz/:gameTitleQuery/:limit?', function(req,res){
        // Here we accept an optional parameter 'limit', which we will use to limit the results returned to the user.

	var priceRange = { min: 1000, max: 7000 }; // weak way to filter for games. Don't include decimal place (last 2 digits assumed to be cents in USD)

        amzClient.itemSearch({
                searchIndex: 'VideoGames',
		minimumPrice : priceRange.min,
		maximumPrice : priceRange.max,
                responseGroup: 'ItemAttributes,Images,Offers',
                sort: 'salesrank',
                title: req.params.gameTitleQuery

        }, function(err, results, response){
                if (err){
			var errorMessageText = err[0].Error[0].Message[0];
			//console.log("Error from Amazon API: " + errorMessageText);
			res.jsonp({error:errorMessageText});
                }else {
                       //console.log("success. results: " +  results.length);
			 if(req.params.limit > 0){
                                var limitedResults = results.slice(0,req.params.limit);
                                res.jsonp({res:limitedResults});
                        }else{
                                res.jsonp({res:results});
                        }
                }
        });
});

app.get('/profile/xuid/:gamertag', function(req,res){
	xbox.profile.xuid(req.params.gamertag, function(err,data){
		res.jsonp({res:data});
	});
});

app.get('/profile/gamertag/:myXUID', function(req,res){
	xbox.profile.gamertag(req.params.myXUID, function(err,data){
		res.jsonp({res:data});
	});
});

app.get('/profile/profile/:myXUID', function(req,res){
	xbox.profile.profile(req.params.myXUID, function(err,data){
		res.jsonp({res:data});
	});
});

app.get('/profile/gamercard/:myXUID', function(req,res){
	xbox.profile.gamercard(req.params.myXUID, function(err,data){
		res.jsonp({res:data});
	});
});

app.get('/profile/presence/:myXUID', function(req,res){
	xbox.profile.presence(req.params.myXUID, function(err,data){
		res.jsonp({res:data});
	});
});

app.get('/profile/activity/:myXUID', function(req,res){
	xbox.profile.activity(req.params.myXUID, function(err,data){
		res.jsonp({res:data});
	});
});

app.get('/profile/activityRecent/:myXUID', function(req,res){
	xbox.profile.activityRecent(req.params.myXUID, function(err,data){
		res.jsonp({res:data});
	});
});

app.get('/profile/friends/:myXUID', function(req,res){
	xbox.profile.friends(req.params.myXUID, function(err,data){
		res.jsonp({res:data});
	});
});
app.get('/profile/followers/:myXUID', function(req,res){
	xbox.profile.followers(req.params.myXUID, function(err,data){
		res.jsonp({res:data});
	});
});
app.get('/profile/following/:myXUID', function(req,res){
	xbox.profile.following(req.params.myXUID, function(err,data){
		res.jsonp({res:data});
	});
});

app.get('/profile/gameClips/:myXUID', function(req,res){
	xbox.profile.gameClips(req.params.myXUID, function(err,data){
		res.jsonp({res:data});
	});
});

app.get('/profile/gameClipsSaved/:myXUID', function(req,res){
	xbox.profile.gameClipsSaved(req.params.myXUID, function(err,data){
		res.jsonp({res:data});
	});
});

app.get('/profile/gameStats/:myXUID/:titleID', function(req,res){
	xbox.profile.gameStats(req.params.myXUID, req.params.titleID, function(err,data){
		res.jsonp({res:data});
	});
});

app.get('/profile/xbox360Games/:myXUID', function(req,res){
	xbox.profile.xbox360Games(req.params.myXUID, function(err,data){
		res.jsonp({res:data});
	});
});

app.get('/profile/xboxOneGames/:myXUID', function(req,res){
	xbox.profile.xboxOneGames(req.params.myXUID, function(err,data){
		res.jsonp({res:data});
	});
});

app.get('/profile/achievements/:myXUID/:titleID', function(req,res){
	xbox.profile.achievements(req.params.myXUID, req.params.titleID, function(err,data){
		res.jsonp({res:data});
	});
});

app.get('game/:product_id', function(req,res){
	xbox.game.game(req.params.product_id, function(err, data){
		res.jsonp({res:data});
	});
});

var server = https.createServer({
        key: fs.readFileSync(config.SSL_DECRYPTED_KEY_PATH),
        cert: fs.readFileSync(config.SSL_CERTIFICATE_PATH)
}, app).listen(8000, function(err){
        if(err){console.log("Error. Unable to start https server."); }
        console.log("HTTPS Server XboxGamerFeed App listening at https://%s:%s", server.address().address, server.address().port);
});
