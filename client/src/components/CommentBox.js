import React, {useState} from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { USER_ID } from '../constants';
import { postAComment } from '../actions/Comment';

const CommentBox = ({postDetails}) => {
    const [content, setContent] = useState("");
    const [dialog, setDialog] = useState("Please login to post a comment");
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const userId = localStorage.getItem(USER_ID);
        const postId = postDetails && postDetails.post.id;
        if(content === "") {
            setDialog("Please enter something");
            handleClickOpen();
        }else if(userId === null){
            setDialog("Please login to post a comment");
            handleClickOpen();
        }else{
            const body = {
                content: content,
                userId: userId,
                postId: postId
            }
            console.log(body);
            dispatch(postAComment(body));
        }
        
    }

    
    const handleChange = (event) => {
        setContent(event.target.value);
    }

    return (
        // <form onSubmit={handleSubmit}> 
        <Container>
            
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
            <StyledTextField placeholder="Comment here" onChange={handleChange}/>
            <FooterDiv>
                <CustomButton onClick={handleSubmit}><ButtonText >POST COMMENT</ButtonText></CustomButton>
            </FooterDiv>
        </Container>
    )
};

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 5%;
`;

const StyledTextField = styled.textarea`
    width: 83%;
    height: 150px;
    margin: 0 auto;
    padding: 12px 20px;
    box-sizing: border-box;
    color: ${props => props.theme.normalText};
	border: 1px solid ${props => props.theme.border};
    border-radius: 4px;
    background-color: ${props => props.theme.foreground};
    resize: none;
`;

const FooterDiv = styled(Grid)`
    width: 83%;
    padding: 0.5%;
    border: 1px solid ${props => props.theme.border};
    border-radius: 4px;
    background-color: ${props => props.theme.lighterForeground};
    display: flex;
    justify-content: flex-end;
`

const CustomButton = styled.div`
    background: ${props => props.theme.buttonColor};
    border-radius: 3px;
    width: 20%;
    padding: 0.5%;
    display: flex;
    align-items: center;
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


export default CommentBox;