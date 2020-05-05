import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Grid, IconButton } from '@material-ui/core';
import ArrowDownwardTwoTone from '@material-ui/icons/ArrowDownwardTwoTone';
import ArrowUpwardTwoTone from '@material-ui/icons/ArrowUpwardTwoTone';

import { calTime } from '../utils/helper';

const CommnentList = ({id, childId}) => {
    let comment;
    const normalizedComments = useSelector(state => state.comment.normalizedComments);

    if(typeof childId === 'undefined'){
        comment = normalizedComments.comments[id];
    }else{
        comment = normalizedComments.children[childId];
    }

    const time = calTime(comment.createdAt);

    let renderChild = childId => {
        return (
            <CommnentList childId={childId} parentId={id} key={childId}/>
        )
      }
    
    return (
        <article className="media">
            <figure className="media-left" style={{paddingLeft:"1%"}}>
                <LeftArea container direction="column"
                    justify="center"
                    alignItems="center">
                    <IconButton>
                        <ArrowUpwardTwoTone />
                    </IconButton>
                    <Votes>
                        {}
                    </Votes>
                    <IconButton>
                        <ArrowDownwardTwoTone />
                    </IconButton>
                </LeftArea>
            </figure>
            <div className="media-content">
                <div className="content" style={{marginTop: "1.2%"}}>
                    <NameText>{comment.createdBy.userName} · {time}</NameText>
                    <CommentText>{comment.content}</CommentText>
                    <NameText>Reply</NameText>
                </div>
                {comment.children.map(renderChild)}
            </div>
        </article>
    )
}

const LeftArea = styled(Grid)`
    // background-color: ${props => props.theme.darkerForeground};
    // margin-top: 15%;
`;

const Votes = styled.h5`
	color: ${props => props.theme.normalText};
`;


const CommentText = styled.div`
    color: ${props => props.theme.normalText};
    padding-right: 10%;
`;
const NameText = styled.div`
    margin-top: 0px;
    color: ${props => props.theme.commentNameText};
`;

export default CommnentList;