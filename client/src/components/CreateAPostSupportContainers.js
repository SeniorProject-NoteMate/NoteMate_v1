import React from 'react';
import styled from 'styled-components';
import FooterContainer from './FooterContainer';

const CAPSContainers = () => {
    return(
        <div>
            <RuleContainer>
                <h1 style={{ color: 'orange', fontSize: 18 }}>Guidelines for Posting</h1>
                <Style>       
                <p>1. Remeber the human</p>
                <p>2. Behave like you would in real life</p>
                <p>3. Look for the original source of content</p> 
                <p>4. Search for duplicates before posting</p>
                <p>5. Read the community's rules</p>
                </Style> 
            </RuleContainer>
            <FooterContainer/>
        </div>
    )
}

const RuleContainer = styled.div`
    border: 1px solid ${props => props.theme.border};
    background-color: ${props => props.theme.foreground};
    border-radius: 5px;
    margin-top: 20px;
    height: 250px;
    color: ${props => props.theme.normalText};
`;  

const Style = styled.div`
    border-top: 3px solid ${props => props.theme.border};
    margin-top: 10px;
    height: 210px;
`;

export default CAPSContainers;
