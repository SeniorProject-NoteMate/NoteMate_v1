import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import { Grid, Avatar } from '@material-ui/core';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import {join, unjoin} from '../utils/api';
import { USER_ID } from '../constants';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const DetailContainer = ({channelDetails}) => {
    const [open, setOpen] = useState(false);
    const [joinText, setJoinText] = useState("JOIN");
    const [members, setMemmbers] = useState(channelDetails.numberOfMembers);
    const channelStore = useSelector(state => state.channel.channels);

    useEffect(() => {
        if(channelStore){
            if(channelStore.findIndex(value => value.id === channelDetails.channel.id) !== -1)
                setJoinText("JOINED")
        }
    }, [channelStore]);
    
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleJoin = () =>{
        if(localStorage.getItem(USER_ID)){
            const body = {
                channelId: channelDetails.channel.id,
                userId: localStorage.getItem(USER_ID)
            }
            if(joinText === "JOIN")
                join(body).then(response => {setJoinText("JOINED"); setMemmbers(members+1)});
            else{
                unjoin(body).then(response => {setJoinText("JOIN"); setMemmbers(members-1)});
            }
        }else{
            handleClickOpen();
        }
    }
    return (
        <Container container direction="column" alignItems="center">
            CHANNEL DETAILS
            <Grid container justify="flex-start" alignItems="center">
                <Avatar style={{width: 60, height: 60}}
                        alt={`Channel's Avatar`} 
                        src={`https://cdn2.iconfinder.com/data/icons/blue-round-amazing-icons-1/512/home-alt-512.png`}/>
                {channelDetails.channel.name}
            </Grid>
            <p>{members}</p>
            <SmallText>Members</SmallText>
            <p>Welcome to {channelDetails.channel.name}</p>
            <CustomButton onClick={handleJoin}> <ButtonText>{joinText}</ButtonText> </CustomButton>
            <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Message"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please log in to join a channel
                            </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            <Link to={{pathname:'/create-a-post', 
                    state:{channelId: channelDetails.channel.id,
                            channelName:channelDetails.channel.name }}} 
                    style={{ textDecoration: 'none', width: '100%' }}>
            <CustomButton> <ButtonText>CREATE POST</ButtonText> </CustomButton>
            </Link>
        </Container>
    )
};

const Container = styled(Grid)`
    border: 1px solid ${props => props.theme.border};
    background-color: ${props => props.theme.foreground};
    border-radius: 5px;
    margin-top: 20px;
    padding: 2% 4% 4% 4%;
    color: ${props => props.theme.normalText};
    height: 100%;
`;

const SmallText = styled.p`
    font-size: ${props => props.theme.p};
`;

const CustomButton = styled.div`
    background: ${props => props.theme.buttonColor};
    border-radius: 3px;
    width: 100%;
    padding: 3.5%;
    display: flex;
    align-items: center;
    margin-top: 2%;
    :hover{
        background: ${props => props.theme.titleBoxBackgroud};
        cursor: pointer;
    };
`;

const ButtonText = styled.h1`
    font-weight: bold;
    color: ${props => props.theme.buttonText};
    margin: 0 auto;
`;

export default DetailContainer;
