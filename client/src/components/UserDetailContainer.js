import React, {useState, useEffect} from 'react';
import {} from 'react-redux';
import { Grid, Avatar } from '@material-ui/core';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import { getUserDetails } from '../utils/api';
import { calTime } from '../utils/helper';
import { USER_ID } from '../constants';


const UserDetailContainer = () => {
    const [user,setUser] = useState(null);

    useEffect(() =>{
        getUserDetails(localStorage.getItem(USER_ID)).then(
            response => {
                setUser(response);
            }
        )
    },[])

    return (
        <Container container direction="column" alignItems="center">
            USER DETAILS
            <Grid container justify="flex-start" alignItems="center">
                <Avatar style={{width: 60, height: 60}}
                        alt={`Channel's Avatar`} 
                        src={`https://library.kissclipart.com/20181001/wbw/kissclipart-gsmnet-ro-clipart-computer-icons-user-avatar-4898c5072537d6e2.png`}/>
              <NameText>{user && user.userName}</NameText> 
            </Grid>
            <p>{user && user.points}</p>
            <SmallText>Points</SmallText>
            <p>Account created · {user && calTime(user.createdAt)}</p>
            
            <Link to={{pathname:'/create-a-post', 
                    state:{channelId: 'none',
                            channelName: 'None' }}} 
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

const NameText = styled.p`
    margin-left: 2%;
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

export default UserDetailContainer;