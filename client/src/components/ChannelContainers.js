import React from 'react';
import { useSelector } from 'react-redux';

import DetailContainer from './DetailContainer';
import ListOfModerators from './ListOfModerators';
import FooterContainer from './FooterContainer';

const ChannelContainers = () => {
    const channelDetails = useSelector(state => state.channel.channelDetails);

    return(
        <div >
            <DetailContainer channelDetails={channelDetails}/>
            <ListOfModerators channelDetails={channelDetails}/>
            <FooterContainer/>
        </div>
    )
}

export default ChannelContainers;