import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

import { requestPosts } from '../actions/Post';
import { requestChannelDetails, requestChannelsForUser } from '../actions/Channel';

import PostList from '../components/PostList';
import ChannelContainers from '../components/ChannelContainers';
import SortBar from '../components/SortBar';
import { USER_ID } from '../constants';

const Channel = ({ post, channel, requestPosts, 
                    requestChannelDetails, requestChannelsForUser, match }) => {
    const { params: { channelId } } = match;

	useEffect(() => {
        requestPosts(`c/${channelId}/none`);
        requestChannelDetails(channelId);
        requestChannelsForUser(localStorage.getItem(USER_ID));
	}, [requestPosts, requestChannelDetails, requestChannelsForUser,channelId]);

	return (
        <div>
            <Banner url={false}/>
            <SortBar channelId={channelId}/>
            <Grid container direction="row" justify="center">
                <CenterContainer>
                    <Grid container direction="row" justify="center" alignItems="flex-start" spacing={3} style={{marginBottom: 0}}>
                        <Grid item xs={8}>
                            <PostList post={post} />
                        </Grid>
                        <Grid item xs={4}>
                            {!channel.isFetching && channel.channelDetails != null && <ChannelContainers />}
                        </Grid>
                    </Grid>
                </CenterContainer>
            </Grid>
        </div>
	);
};

const CenterContainer = styled.div`
    margin: 0 15%;
    width: 100%;
`
// const test = "https://streamlays.com/wp-content/uploads/2017/03/Preview-Hexa-YouTube-Banner-Red.jpg";
const defaultBanner = "http://eskipaper.com/images/dark-background-3.jpg";

const Banner = styled.div`
    height: 250px;
    width: auto;
    background-image: url(${(props) => props.url || defaultBanner});
    background-size: cover;
    background-repeat: no-repeat;
`

const mapStateToProps = state => ({
    post: state.post,
    channel: state.channel
});

const mapDispatchToProps = { requestPosts, requestChannelDetails, requestChannelsForUser };

export default connect(mapStateToProps, mapDispatchToProps)(Channel);