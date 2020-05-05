import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

import {requestChannelsForUser} from '../actions/Channel';
import CAPContainer from '../components/CreateAPostContainer';
import CAPSContainers from '../components/CreateAPostSupportContainers';
import { USER_ID } from '../constants';


const CenterContainer = styled.div`
    margin: 5% 10% 0px 10%;
    width: 100%;
`


const CreateAPost = ({location}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if(localStorage.getItem(USER_ID))
            dispatch(requestChannelsForUser(localStorage.getItem(USER_ID)));
	}, [dispatch]);

	return (
        <div>
            <Grid container direction="row" justify="center">
                <CenterContainer>
                    <Grid container direction="row" justify="center" alignItems="flex-start" spacing={3} style={{marginBottom: 0}}>
                        <Grid item xs={9}>
                            <CAPContainer state={location.state}/>
                        </Grid>
                        <Grid item xs={3}>
                            {<CAPSContainers />}
                        </Grid>
                    </Grid>
                </CenterContainer>
            </Grid>
        </div>
	);
};

export default CreateAPost;