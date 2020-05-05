import React, {useState} from 'react';
import styled from 'styled-components';
import { TextField, Grid } from '@material-ui/core';
import {useDispatch} from 'react-redux';

import { requestSortedPosts, requestPosts } from '../actions/Post';

const sorts = [
    {
      value: 'top',
      label: 'Top',
    },
    {
      value: 'new',
      label: 'New',
    },
    {
      value: 'none',
      label: 'None',
    },
  ];

const SortBar = ({channelId}) => {
    const [sort, setSort] = useState('none');
    const dispatch = useDispatch();
    const handleChange = event => {
        setSort(event.target.value);
        if(typeof channelId !== 'undefined') dispatch(requestPosts(`c/${channelId}/${event.target.value}`))
        else dispatch(requestSortedPosts(event.target.value));
    };
    return(
        <Container>
            <MiddleContainer container justify="flex-start" alignItems="center">
                Sort By
                <TextFieldBox>
                <TextField
                    id="outlined-select-currency-native"
                    select
                    value={sort}
                    onChange={handleChange}
                    SelectProps={{
                        native: true,
                    }}
                    >
                    {sorts.map(option => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))}
                </TextField>
                </TextFieldBox>
            </MiddleContainer>
        </Container>
    )
}

const Container = styled.div`
    height: 55px;
    background-color: ${props => props.theme.foreground};
    padding: 0.7% 15%;
`;
const MiddleContainer = styled(Grid)`
    color: ${props => props.theme.normalText};
`;


const TextFieldBox = styled.div`
    margin-left: 2%;
`;


export default SortBar;