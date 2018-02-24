Chatty App
=====================
Talk to random people online! Chat anonymously (by default) or enter your own name!

### Getting Started


```
git clone git@github.com:hvdson/chatty-app.git
cd  chatty-app 
git remote rm origin
git remote add origin [YOUR NEW REPOSITORY]
```

Install the dependencies and start the server.

```
npm install
npm run start
npm run start-ws
open http://localhost:3000
```

### Dependencies

*     "babel-core": "6.23.1",
*     "babel-loader": "6.3.1",
*     "babel-preset-es2015": "6.22.0",
*     "babel-preset-react": "6.23.0",
*     "babel-preset-stage-0": "6.22.0",
*     "css-loader": "0.26.1",
*     "eslint": "3.15.0",
*     "eslint-plugin-react": "6.9.0",
*     "node-sass": "4.5.0",
*     "sass-loader": "6.0.0",
*     "sockjs-client": "^1.1.2",
*     "style-loader": "0.13.1",
*     "webpack": "2.2.1",
*     "webpack-dev-server": "2.3.0"
*      "express": "4.16.2",
*     "random-hex-color": "^1.0.1",
*     "react": "15.4.2",
*     "react-dom": "15.4.2",
*     "request": "^2.83.0",
*     "uuid": "^3.2.1",
*     "ws": "4.0.0"


### Features:
See how many people are online in the top right of the navbar (users online)

when a user sends a message or changes their name, it is broadcasted to all clients via websockets

Database persistence is saved locally in the server and resets when server resets (was going to deploy to heroku but no time)

#### STRETCH

Username colours are assigned to each client via 'random-hex-color' npm package

 <strong>*extra feature* Implementation of giphy api: </strong>
 
users are able to send random gifs via giphy based on the search query through the command:

``` 
/giphy <YOUR SEARCH HERE>
```

## Screenshots
!["screenshot"]()





