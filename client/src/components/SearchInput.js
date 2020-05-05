import React, { useState } from 'react';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import SearchIcon from '@material-ui/icons/Search';
import { withRouter } from 'react-router-dom';

const SearchInput = ({history}) => {
    const [query, setQuery] = useState("");

    const handleChange = (event) => {
        setQuery(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        history.push(`/?q=${query.trim()}`);
    }


    return (
        <Container container justify="flex-start" alignItems="center">
            <SearchIcon style={{ color: green[50] }} />
            <form style={{width:"90%"}} onSubmit={handleSubmit}>
                <StyledTextField placeholder="Search" onChange={handleChange} />
            </form>
        </Container>
    )
}

const Container = styled(Grid)`
    background-color: ${props => props.theme.lighterForeground};
    height: 35px;
    border-radius: 5px;
    padding-left: 2%;
    border: 1px solid ${props => props.theme.border}
    :hover{
        border-color: ${props => props.theme.hoverBorder};
    }
`

const StyledTextField = styled.input`
    width: 90%;
    height: 100%;
    color: ${props => props.theme.normalText};
    border: 0px;
    background-color: ${props => props.theme.lighterForeground};
    resize: none;
`;


export default withRouter(SearchInput);