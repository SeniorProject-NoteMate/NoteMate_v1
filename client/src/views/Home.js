import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

import { requestPosts, requestSavedPostsByUserId } from '../actions/Post';
import { requestTop5Channels } from '../actions/Channel';

import jwtDecode from 'jwt-decode';
import { ACCESS_TOKEN, USER_ID } from '../constants';

import PostList from '../components/PostList';
import HomeContainers from '../components/HomeContainers';
import SortBar from '../components/SortBar';
import {trimQuery} from '../utils/helper';


const CenterContainer = styled.div`
	margin: 0 15%;
	width: 100%;
`

const Home = ({ requestPosts, requestTop5Channels, requestSavedPostsByUserId, location }) => {
	const { search } = location; 
	const [userId,setUserId] = useState(localStorage.getItem(USER_ID));

	useEffect(() => {
		requestPosts("","",trimQuery(search));
		requestTop5Channels();
		
		if(localStorage.getItem(ACCESS_TOKEN) && !userId){
			const id = jwtDecode(localStorage.getItem(ACCESS_TOKEN)).id;
			localStorage.setItem(USER_ID,id);
			requestSavedPostsByUserId(id);
			setUserId(id);
		}
		if(userId) requestSavedPostsByUserId(userId);
		 
	}, [requestPosts, requestTop5Channels, requestSavedPostsByUserId,search]);

	return (
		<div>
			<SortBar/>
			<Grid container direction="row" justify="center">
				<CenterContainer>
					<Grid container direction="row" justify="center" alignItems="flex-start" spacing={3} style={{ marginBottom: 0 }}>
						<Grid item xs={8}>
							<PostList />
						</Grid>
						<Grid item xs={4}>
							<HomeContainers />
						</Grid>
					</Grid>
				</CenterContainer>
			</Grid>
		</div>
	);
};


const mapDispatchToProps = { requestPosts, requestTop5Channels, requestSavedPostsByUserId  };

export default connect(null, mapDispatchToProps)(Home);

// React Hook + Redux
// import React, { useEffect } from 'react';
// import PostList from '../components/PostList';
// import { useDispatch, useSelector } from 'react-redux';
// import { requestPosts } from '../actions/Post';

// const Home = () => {

// 	const dispatch = useDispatch();

// 	useEffect(() => {
// 		dispatch(requestPosts());
// 	},[]);

// 	// const posts = useSelector(state => 
// 	// 	state = state.post.posts
// 	// )

// 	return (
// 		<div>
// 			{/* {
// 				JSON.stringify(posts)
// 			} */}
// 			<PostList />
// 		</div>
// 	);
// }

// export default Home;