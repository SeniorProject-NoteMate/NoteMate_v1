import React from 'react';
import {
    Grid, List, ListItem,
    ListItemText, Button,
} from '@material-ui/core';
import styled from 'styled-components';

const ListOfModerators = ({channelDetails}) => {
    return (
        <Container container justify="center">
            MODERATORS
            <ModeratorList channelDetails={channelDetails}/>
            <CustomButton><ButtonText>VIEW ALL</ButtonText></CustomButton>
        </Container>
    )
};

const ModeratorList = ({channelDetails}) => {
    
    return (
        <CustomList dense>
            {channelDetails.moderators != null && channelDetails.moderators.map(mod => {
                return (
                    // <Link to={`channel/${value}`} key={index} style={{ textDecoration: 'none' }}>
                    <ListItem key={mod.id} button>
                        <CustomListItemText id={mod.id} primary={`${mod.userName}`} />
                    </ListItem>
                    // </Link>
                );
            })}
        </CustomList>
    )
};

const Container = styled(Grid)`
    border: 1px solid ${props => props.theme.border};
    background-color: ${props => props.theme.foreground};
    border-radius: 5px;
    margin-top: 20px;
    padding-bottom: 4%;
    color: ${props => props.theme.normalText};

`;

const CustomButton = styled(Button)`
    background: ${props => props.theme.buttonColor};
    border-radius: 3px;
    height: 40px;
    width: 90%;
    :hover{
		background: ${props => props.theme.titleBoxBackgroud};
	};
`;

const CustomList = styled(List)`
    width: 100%;
    height: 60%;
`;

const CustomListItemText = styled(ListItemText)`
    color: ${props => props.theme.normalText}
`;

const ButtonText = styled.h1`
    font-weight: bold;
`;


export default ListOfModerators;