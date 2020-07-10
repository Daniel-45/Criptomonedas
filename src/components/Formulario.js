import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Error from './Error'
import useMoneda from './../hooks/useMoneda';
import useCriptomoneda from './../hooks/useCriptomoneda';
import axios from 'axios';
import PropTypes from 'prop-types';

// Styled Components
const Boton = styled.button`
    width: 100%;
    color: #fff;
    margin-top: 1.2rem;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.6rem;
    border: none;
    border-radius: 0.4rem;
    background-color: #66a2fe;
    transition: background-color .3s ease;
    font-family: 'Original Surfer', cursive;

    &:hover {
        background-color: #326ac0;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda, guardarMonedaCriptomoneda}) => {

    // State del listado de criptomonedas
    const [listaCriptomonedas, guardarCriptomonedas] = useState([]);
    const [error, mostrarError] = useState(false);

    const MONEDAS = [
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'JPY', nombre: 'Yen'},
        {codigo: 'CNY', nombre: 'Renminbi'},
        {codigo: 'GBP', nombre: 'Libra esterlina'},
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'}
    ]

    // Utilizar custom Hook useMoneda
    const [moneda, SelectMoneda] = useMoneda('Selecciona la moneda', '', MONEDAS);

    // Utilizar custom Hook useCriptomoneda
    const [criptomoneda, SelectCriptoMoneda] = useCriptomoneda('Selecciona la criptomoneda', '', listaCriptomonedas);

    //  Ejecutar llamada a la API
    // Consultas con axios 
    useEffect(() => {
        const consultarAPI  = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

            // Con axios no hace falta colocar doble await o doble then como con fetch
            const resultado = await axios.get(url);

            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    // Cuando el usuario hace click en calcular
    const cotizarMoneda  = (e) => {
        e.preventDefault();

        // Validar campos
        if (moneda === '' || criptomoneda === '') {
            mostrarError(true);
            return;
        }

        // Pasar los datos al componente principal
        mostrarError(false);
        guardarMoneda(moneda);
        guardarMonedaCriptomoneda(criptomoneda);

    }

    return ( 
        <form onSubmit={cotizarMoneda}>

            {error ?  <Error mensaje="Todos los campos son obligatorios" /> : null}

            <SelectMoneda />

            <SelectCriptoMoneda />

            <Boton>CALCULAR</Boton>
        </form>
     );
}

Formulario.propTypes =  {
    guardarMoneda: PropTypes.func.isRequired,
    guardarMonedaCriptomoneda: PropTypes.func.isRequired
}
 
export default Formulario;