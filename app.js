/* This file creates a node proxy for XboxAPI 
 * so students may use the JSON API calls without having to run 
 * their own server. Only a subset of API calls are available.
 * The free version of XboxAPI allows for 120 requests per hour.
*/

const express = require('express');
const app = express();
const http = require('http');

const XBOX_API_KEY = 'ENTER YOUR API KEY HERE';
const xbox = require('node-xbox')(XBOX_API_KEY);

app.get('/', function(req,res){
	res.send('Hello, Node Express User.');
});

app.get('/profile/xuid/:gamertag', function(req,res){
	xbox.profile.xuid(req.params.gamertag, function(err,data){
		res.send(data);
	});
});

app.get('/profile/gamertag/:myXUID', function(req,res){
	xbox.profile.gamertag(req.params.myXUID, function(err,data){
		res.send(data);
	});
});

app.get('/profile/profile/:myXUID', function(req,res){
	xbox.profile.profile(req.params.myXUID, function(err,data){
		res.send(data);
	});
});

app.get('/profile/gamercard/:myXUID', function(req,res){
	xbox.profile.gamercard(req.params.myXUID, function(err,data){
		res.send(data);
	});
});

app.get('/profile/presence/:myXUID', function(req,res){
	xbox.profile.presence(req.params.myXUID, function(err,data){
		res.send(data);
	});
});

app.get('/profile/activity/:myXUID', function(req,res){
	xbox.profile.activity(req.params.myXUID, function(err,data){
		res.send(data);
	});
});

app.get('/profile/activityRecent/:myXUID', function(req,res){
	xbox.profile.activityRecent(req.params.myXUID, function(err,data){
		res.send(data);
	});
});

app.get('/profile/friends/:myXUID', function(req,res){
	xbox.profile.friends(req.params.myXUID, function(err,data){
		res.send(data);
	});
});
app.get('/profile/followers/:myXUID', function(req,res){
	xbox.profile.followers(req.params.myXUID, function(err,data){
		res.send(data);
	});
});
app.get('/profile/following/:myXUID', function(req,res){
	xbox.profile.following(req.params.myXUID, function(err,data){
		res.send(data);
	});
});

app.get('/profile/gameClips/:myXUID', function(req,res){
	xbox.profile.gameClips(req.params.myXUID, function(err,data){
		res.send(data);
	});
});

app.get('/profile/gameClipsSaved/:myXUID', function(req,res){
	xbox.profile.gameClipsSaved(req.params.myXUID, function(err,data){
		res.send(data);
	});
});

app.get('/profile/gameStats/:myXUID/:titleID', function(req,res){
	xbox.profile.gameStats(req.params.myXUID, req.params.titleID, function(err,data){
		res.send(data);
	});
});

app.get('/profile/xbox360Games/:myXUID', function(req,res){
	xbox.profile.xbox360Games(req.params.myXUID, function(err,data){
		res.send(data);
	});
});

app.get('/profile/xboxOneGames/:myXUID', function(req,res){
	xbox.profile.xboxOneGames(req.params.myXUID, function(err,data){
		res.send(data);
	});
});

app.get('/profile/achievements/:myXUID/:titleID', function(req,res){
	xbox.profile.achievements(req.params.myXUID, req.params.titleID, function(err,data){
		res.send(data);
	});
});

app.get('game/:product_id', function(req,res){
	xbox.game.game(req.params.product_id, function(err, data){
		res.send(data);
	});
});

app.listen(8000, function(){
	console.log('<< XboxGamerFeed app listening on port 8000... >>');
});