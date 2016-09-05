#node-xbox-proxy

This is a node app to quickly allow access to xbox-api from a server by URL without requiring passing an API key from the client side. Good for test development for students unfamiliar with server side development.

## Installation

1. Clone this repository

2. Type ```npm install``` to load express & node-xbox dependencies

3. ```cd node_modules```

4. ```cp apiSettings.js.editme apiSettings.js```

5. Edit ```node_modules/apiSettings.js``` to define your api key ```XBOX_API_KEY = 'ENTER YOUR API KEY HERE';``` 
If you need to create one, get one from [Xbox API](https://xboxapi.com/).

6. Start the express server  ```node app.js```

## Making API calls
Currently all "profile" category methods are supported. See [node-xbox](https://www.npmjs.com/package/node-xbox) documentation for details. 

Note: these calls return data in JSONP format.

Examples: 
- http://localhost:8000/profile/xuid/[gamertag here] will return xuid for gamertag
- http://localhost:8000/profile/[xuid here] will return full profile details
- http://localhost:8000/profile/friends/[xuid here] will return full profile details
