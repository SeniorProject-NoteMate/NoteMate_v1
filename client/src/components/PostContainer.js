import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Avatar, CardActions, CardHeader, CardContent } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';

import styled from 'styled-components';
import { Saved } from 'styled-icons/octicons/Saved';
import { ArrowUp } from 'styled-icons/icomoon/ArrowUp';
import { ArrowDown } from 'styled-icons/icomoon/ArrowDown';
import { Link } from 'react-router-dom';

import { USER_ID } from '../constants';
import { calTime } from '../utils/helper';
import { saveAPost, unsaveAPost, createVotePost } from '../utils/api';
import {
	updateSavedPosts,
	updateUpVotedPosts,
	updateDownVotedPosts
}
	from '../actions/Post';



const PostContainer = ({ postDetails }) => {
	const time = calTime(postDetails.post.createdAt);
	const uId = localStorage.getItem(USER_ID);
	const postedBy = `Posted by ${postDetails.userName} · ${time} `;
	const savedPosts = useSelector(state => state.post.savedPosts);
	const votedPosts = useSelector(state => state.post.votedPosts);
	const upVotedPosts = useSelector(state => state.post.upVotedPosts);
	const downVotedPosts = useSelector(state => state.post.downVotedPosts);
	const posts = useSelector(state => state.post.posts);
	const [open, setOpen] = useState(false);
	const [isSaved, setIsSave] = useState(false);
	const [isUp, setIsUp] = useState(false);
	const [isDown, setIsDown] = useState(false);
	const [points, setPoints] = useState(postDetails.points);

	const dispatch = useDispatch();

	React.useEffect(() => {
		if (savedPosts && savedPosts.findIndex(content => content.post.id === postDetails.post.id) !== -1) {
			setIsSave(true);
		}
		if (votedPosts) {
			const votePost = votedPosts.find(content => content.id.postId === postDetails.post.id);

			if (typeof votePost !== 'undefined') {
				if (votePost.isUp === 1) {
					setIsUp(true);
				} else if (votePost.isUp === -1) {
					setIsDown(true);
				}
			}
		}
	}, []);

	const handleUpVote = () => {
		if (uId) {
			if (!isDown) {
				const body = {
					userId: uId,
					postId: postDetails.post.id
				}
				if (isUp) {
					body["isUndoUp"] = true;
					setPoints(points - 1);
					const updatedPosts = upVotedPosts.filter(
						content => content.post.id !== postDetails.post.id
					)
					dispatch(updateUpVotedPosts(updatedPosts));
				} else {
					body["isUp"] = true;
					setPoints(points + 1);
					const updatedPosts = [...upVotedPosts, posts.find(content => content.post.id === postDetails.post.id)]
					dispatch(updateUpVotedPosts(updatedPosts));
				}
				createVotePost(body);
				setIsUp(!isUp);
			}
		}else {
			handleClickOpen();
		}

	}

	const handleDownVote = () => {
		if (uId) {
			if (!isUp) {
				const body = {
					userId: uId,
					postId: postDetails.post.id
				}
				if (isDown) {
					setPoints(points + 1);
					const updatedPosts = downVotedPosts.filter(
						content => content.post.id !== postDetails.post.id
					)
					dispatch(updateDownVotedPosts(updatedPosts));
				} else {
					body["isDown"] = true;
					setPoints(points - 1);
					const updatedPosts = [...downVotedPosts, posts.find(content => content.post.id === postDetails.post.id)]
					dispatch(updateDownVotedPosts(updatedPosts));
				}
				createVotePost(body);
				setIsDown(!isDown);
			}
		}else{
			handleClickOpen();
		}
	}

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSave = () => {
		if (uId) {
			const body = {
				userId: uId,
				postId: postDetails.post.id
			}
			if (isSaved) {
				unsaveAPost(body);
				const newSavedPost = savedPosts.filter(content => content.post.id !== postDetails.post.id);
				dispatch(updateSavedPosts(newSavedPost));
			} else {
				saveAPost(body);
				const newSavedPost = [...savedPosts, posts.find(content => content.post.id === postDetails.post.id)]
				dispatch(updateSavedPosts(newSavedPost));
			}
			setIsSave(!isSaved);

		} else {
			handleClickOpen();
		}
	}

	return (
		<Container key={postDetails.post.id}>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"Message"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						You need to login to vote
                        </DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary" autoFocus>
						Ok
                        </Button>
				</DialogActions>
			</Dialog>
			<Grid container direction="row" justify="center" spacing={0}>
				<LeftArea item xs={1}>
					<Grid container direction="column"
						justify="center"
						alignItems="center">
						<IconButton onClick={handleUpVote} >
							{!isUp && <ArrowUpIcon size="25" />}
							{isUp && <ArrowUpIconHighlighted size="25" />}
						</IconButton>
						<Votes>
							{points}
						</Votes>
						<IconButton onClick={handleDownVote} >
							{!isDown && <ArrowDownIcon size="25" />}
							{isDown && <ArrowDownIconHighlighted size="25" />}
						</IconButton>
					</Grid>
				</LeftArea>
				<Grid item xs={11}>
					<CustomCardHeader
						avatar={
							<Avatar style={{ width: 60, height: 60 }}
								alt={`Channel's Avatar`}
								src={`https://cdn2.iconfinder.com/data/icons/blue-round-amazing-icons-1/512/home-alt-512.png`} />
						}
						action={
							<IconButton onClick={handleSave} aria-label="settings">
								{!isSaved && <SavedIcon size="25" />}
								{isSaved && <SavedIconHighlighted size="25" />}
							</IconButton>
						}
						title={postDetails.channel.name}
						subheader={postedBy}
					/>
					<Link to={`/post/${postDetails.post.id}`} style={{ textDecoration: 'none' }}>
						<PostTitle>
							{postDetails.post.title}
						</PostTitle>
						{/* <CardMedia
								className={classes.media}
								image="/static/images/cards/paella.jpg"
								title="Paella dish"
							/> */}
						<CardContent>
							<BodyText>
								{postDetails.post.content}
							</BodyText>
						</CardContent>
					</Link>
					<CardActions disableSpacing>
						<IconButton aria-label="add to favorites" >
							<CommentIcon />
						</IconButton>
						<IconButton aria-label="share">
							<ShareIcon />
						</IconButton>
					</CardActions>
					{/* </Card> */}
				</Grid>
			</Grid>
		</Container>
	);
}

const SavedIcon = styled(Saved)`
	color: ${props => props.theme.mutedText}; 
`;

const SavedIconHighlighted = styled(Saved)`
	color: ${props => props.theme.upvote}; 
`;

const ArrowUpIcon = styled(ArrowUp)`
	color: ${props => props.theme.mutedText};
`;

const ArrowDownIcon = styled(ArrowDown)`
	color: ${props => props.theme.mutedText};
`;

const ArrowUpIconHighlighted = styled(ArrowUp)`
	color: ${props => props.theme.upvote};
`;

const ArrowDownIconHighlighted = styled(ArrowDown)`
	color: ${props => props.theme.downvote};
`;


// const useStyles = makeStyles(theme => ({
// 	media: {
// 		height: 0,
// 		paddingTop: '56.25%', // 16:9
// 	}
// }));

const Container = styled.div`
	margin-top: 20px;
	background: ${props => props.theme.foreground};
	border-radius: 5px;
	border: 1px solid ${props => props.theme.border};
	:hover{
		border-color: ${props => props.theme.hoverBorder};
		cursor: pointer;
	};
`;

const LeftArea = styled(Grid)`
	background-color: ${props => props.theme.darkerForeground};
`;

const Votes = styled.h5`
	color: ${props => props.theme.normalText};
`;

const PostTitle = styled.h1`
	color: ${props => props.theme.normalText};
	font-size: ${props => props.theme.h1};
	font-weight: bold;
	margin-left: 0.7em;
`

const BodyText = styled.p`
	color: ${props => props.theme.normalText}
`

const CustomCardHeader = styled(({ ...other }) => <CardHeader {...other} />)`
	& .MuiCardHeader-title{
		color: ${props => props.theme.normalText};
	}
	& .MuiCardHeader-subheader{
		color: ${props => props.theme.mutedText};
	}
`;

export default PostContainer;
