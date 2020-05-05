import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import Channel from './views/Channel';
import Post from './views/Post';
import Login from './views/Login';
import Register from './views/Register';
import Setting from './views/Setting';
import CreateAPost from './views/CreateAPost';
import UserProfile from './views/UserProfile';
import PageNotFound from './components/PageNotFound';

let Routes = () => (
	<Switch>
		<Route exact path="/" component={Home} />
		<Route exact path="/channel/:channelId" component={Channel} />
		<Route exact path="/post/:postId" component={Post} />
		<Route exact path="/register" component={Register} />
       	<Route exact path="/login" component={Login} />
		<Route exact path="/setting" component={Setting} />
		<Route exact path="/create-a-post" component={CreateAPost} />
		<Route exact path="/user/" component={UserProfile} />
		<Route component={PageNotFound}/>
	</Switch>
)

export default Routes;
