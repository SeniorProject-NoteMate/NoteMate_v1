import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Grid, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { USER_ID } from '../constants';
import { postAPost } from '../actions/Post';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withRouter} from 'react-router-dom';

const CAPContainer = ({ state, history }) => {
    const [title, setTitle] = useState("");
    const [dialog, setDialog] = useState("");
    const [content, setContent] = useState("");
    const [channel, setChannel] = useState(state.channelId);
    const channelStore = useSelector(state => state.channel.channels);
    const post = useSelector(state => state.post.newPost);
    const [channels, setChannels] = useState([
        {
            value: `${state.channelId}`,
            label: `${state.channelName}`
        },
    ]);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        let temps = [];
        if (channelStore) channelStore.forEach(channel => {
            temps.push({
                value: `${channel.id}`,
                label: `${channel.name}`
            });
            setChannel(channel.id);
        });
        if(post) history.push(`/post/${post.id}`);
        setChannels(temps);
    }, [channelStore,post]);

    const handleChange = event => {
        setChannel(event.target.value);
    };

    const dispatch = useDispatch();

    let handleSubmit = (event) => {
        event.preventDefault();
        let userId;
        if(localStorage.getItem(USER_ID)) userId = localStorage.getItem(USER_ID);
        else userId = "";
        const newPost = {
            title: title,
            content: content,
            channelId: channel,
            userId: userId
        }
        if (channel === "none") {
            setDialog("Please select a channel or join one");
            handleClickOpen();
        }else if(title === ""){
            handleClickOpen();
            setDialog("Please enter a title");
        }else if(userId === ""){
            handleClickOpen();
            setDialog("Please login to create post");
        }
        else {
            dispatch(postAPost(newPost));
        }
    }

    let handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    let handleContentChange = (event) => {
        setContent(event.target.value);
    }


    return (
        <form onSubmit={handleSubmit}>
            <TitleBox>Create a post</TitleBox>
            <MiddleContainer container justify="flex-start" alignItems="center">
                Choose a channel
                <TextFieldBox>
                    <TextField
                        id="outlined-select-currency-native"
                        select
                        value={channel}
                        onChange={handleChange}
                        SelectProps={{
                            native: true,
                        }}
                    >
                        {channels.map(channel => (
                            <option key={channel.value} value={channel.value}>
                                {channel.label}
                            </option>
                        ))}
                    </TextField>
                </TextFieldBox>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Message"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {dialog}
                            </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </MiddleContainer>
            <Container>
                <TitleInput placeholder="Title" onChange={handleTitleChange} />
                <StyledTextField placeholder="Write here!" onChange={handleContentChange} />
                <FooterDiv>
                    <CustomButton type="submit" value="Submit"></CustomButton>
                </FooterDiv>
            </Container>
        </form>
    )
}
const MiddleContainer = styled(Grid)`
    margin-top: 2%;
    padding-left: 2%;
    color: ${props => props.theme.normalText};
    background-color: ${props => props.theme.foreground};
    border: 1px solid ${props => props.theme.border};
    border-radius: 4px;
`;


const TextFieldBox = styled.div`
    margin-left: 2%;
`;
const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 5%;
    padding: 2% 2%;
    background-color: ${props => props.theme.foreground};
    border-radius: 4px;
`;

const TitleBox = styled.div`
    border-bottom: 1px solid;
    border-bottom-color: ${props => props.theme.border};
    color: ${props => props.theme.normalText};
    font-size: ${props => props.theme.h2};

`;

const StyledTextField = styled.textarea`
    width: 100%;
    height: 150px;
    margin-Top: 2%;
    padding: 12px 20px;
    box-sizing: border-box;
    color: ${props => props.theme.normalText};
	border: 1px solid ${props => props.theme.border};
    border-radius: 4px;
    background-color: ${props => props.theme.foreground};
    resize: none;
`;

const TitleInput = styled(StyledTextField)`
    height: 50px;
`

const FooterDiv = styled(Grid)`
    margin-top: 2%;
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

const CustomButton = styled.input`
    background: ${props => props.theme.buttonColor};
    border-radius: 3px;
    border: 0px;
    width: 20%;
    padding: 0.5%;
    display: flex;
    align-items: center;
    :hover{
        background: ${props => props.theme.titleBoxBackgroud};
        cursor: pointer;
    };
    font-weight: bold;
    color: ${props => props.theme.buttonText};
`;


export default withRouter(CAPContainer);