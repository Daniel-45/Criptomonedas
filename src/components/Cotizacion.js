import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const ContenedorResultado = styled.div`
    color: #fff;
    font-family: 'Original Surfer', cursive;
`;

const Info = styled.p`
    font-size: 1rem;

    span {
        font-weight: bold;
    }
`;

const Precio = styled.p`
    font-size: 1.8rem;
`;

const Cotizacion = ({resultado}) => {

    // Comprobar si un objeto está vacío
    // El resultado al inicio es un objeto vacío
    // Si el resultado viene vacío no hace nada
    if (Object.keys(resultado).length === 0) {
        return null;
    }

    return ( 
        
        // Si el resultado no viene vacío
        <ContenedorResultado>
            <Precio>El precio es: <span>{resultado.PRICE}</span></Precio>
            <Info>Última actialización: <span>{resultado.LASTUPDATE}</span></Info>
            <Info>Variación últimas 24H: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Precio máximo del día: <span>{resultado.HIGHDAY}</span></Info>
            <Info>Precio mínimo del día: <span>{resultado.LOWDAY}</span></Info>
        </ContenedorResultado>
     );
}

Cotizacion.propTypes =  {
    resultado: PropTypes.object.isRequired
 }
 
export default Cotizacion;