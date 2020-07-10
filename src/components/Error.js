import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

// Styled Components
const MensajeError = styled.p`
    background-color: red;
    padding: 1rem;
    color: #fff;
    font-size: 1rem;
    border-radius: 0.4rem;
    text-transform: uppercase;
    font-weight: bold;
    text-align: center;
    font-family: 'Original Surfer', cursive;
`;

const Error = ({mensaje}) => {
    return (  
        <MensajeError>{mensaje}</MensajeError>
    );
}

Error.propTypes = {
    mensaje: PropTypes.string.isRequired
}

export default Error;