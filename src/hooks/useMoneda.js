import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';

// Styled Components
const Label = styled.label`
    color:  #fff;
    text-transform: uppercase;
    font-weight: bold;
    margin-top: 2rem;
    display: block;
    font-family: 'Original Surfer', cursive;
`;

const Select = styled.select`
    width: 100%;
    padding: 0.5rem;
    display: block;
    margin-top: 0.5rem;
    border-radius: 0.4rem;
    border: none;
    font-size: 1rem;
    font-family: 'Original Surfer', cursive;
    -webkit-appearance: none;
`;

const useMoneda = (label, stateInicial, monedas) => {

    // State del custom Hook
    const [state, modificarState] = useState(stateInicial);

    // Lo que está dentro es lo que se va a mostrar en pantalla
    const SelectMoneda = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select onChange={e => modificarState(e.target.value)} value={state}>
                <option value="">-- Selecciona --</option>
                {monedas.map(moneda => (
                    <option key={moneda.codigo} value={moneda.codigo}>{moneda.nombre}</option>
                ))}
            </Select>
        </Fragment>
    );

    // Retornar state, interfaz y función que modifica el state
    return [state, SelectMoneda, modificarState];
}

export default useMoneda;