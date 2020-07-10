import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './cryptomonedas.svg';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

// Styled Components
const Contenedor = styled.div`
  margin: 0 auto;
  max-width: 900px;
  @media (min-width: 700px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  color: #fff;
  text-align: left;
  font-weight: bold;
  font-size: 1.4rem;
  margin-top: 6rem;
  margin-bottom: 3rem;
  font-family: 'Original Surfer', cursive;

  &::after {
    content: '';
    width: 25.8rem;
    height: 0.2rem;
    margin-top: 0.5rem;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {

  // State
  const [moneda, guardarMoneda] = useState('');
  const [criptoMoneda, guardarMonedaCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, mostrarCargando]  = useState(false);

  useEffect(() => {

    const cotizarCriptomoneda = async () => {
      // Evitar la ejecución la primera vez porque al inicio el state tiene valore vacío
      if (moneda === '') {
        return;
      }

      // Consulta a la API para obtener cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      // Mostrar Spinner
      mostrarCargando(true);

      // Ocultar Spinner y mostrar resultado
      setTimeout(() => {
        // Cambiar el estado  de cargando
        mostrarCargando(false);

        // Acceder dinámicamente a la respuesta de la API
        guardarResultado(resultado.data.DISPLAY[criptoMoneda][moneda]);
      }, 1000);

    }
    cotizarCriptomoneda();
  }, [moneda, criptoMoneda])

  // Mostrar spinner o resultado
  const componente  = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />

  return (
    <Contenedor>
      <div>
        <Imagen src={imagen} alt="imagen-cryptomonedas" />
      </div>
      <div>
        <Heading>COTIZADOR DE CRIPTOMONEDAS</Heading>

        <Formulario
          guardarMoneda={guardarMoneda}
          guardarMonedaCriptomoneda={guardarMonedaCriptomoneda}
        >
        </Formulario>

        {componente}

      </div>
    </Contenedor>
  );
}

export default App;
