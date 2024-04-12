import React, { useEffect, useState } from 'react';
import './App.css';
import image from './assets/bg-cafe.jpg';
import estrella_llena from './assets/Star_fill.svg';
import estrella_vacia from './assets/Star.svg';

function App() {
  const [filtroActivo, setFiltroActivo] = useState('todos');
  const [colorBotones, setColorBotones] = useState({ boton_segundo: '#6e7c80', boton_tercero: '#1B1D1F' });
  const [articulos, setArticulos] = useState([]);

  const alternarColoresBotones = () => {
    setColorBotones({ boton_segundo: colorBotones.boton_tercero, boton_tercero: colorBotones.boton_segundo });
    alternarFiltro(); // Llamamos a alternarFiltro al cambiar los colores de los botones
  };

  const alternarFiltro = () => {
    setFiltroActivo(filtroActivo === 'todos' ? 'disponibles' : 'todos');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/devchallenges-io/web-project-ideas/main/front-end-projects/data/simple-coffee-listing-data.json');
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        const data = await response.json();
        setArticulos(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='caja_primera'>
      <img src={image} className="caffe_imagen" alt="Coffe img" />
      <div className='caja_segunda'>
        <div className='contenedor_texto imagen_encabezado'>
          <h1 className='titulo_principal'>
            Our collection
          </h1>
          <p className='texto_descriptivo'>Introducing our Coffee Collection, a selection of <br />unique coffees
            from different roast types and origins,<br /> expertly roasted in small <br />
            batches and shipped fresh <br />weekly.
          </p>
        </div>
        <div className='caja_tercera'>
          <div className='caja_cuarta'>
            <div className="boton_primero">
              <button
                className="boton_segundo"
                style={{ backgroundColor: colorBotones.boton_segundo }}
                onClick={alternarColoresBotones}
              >
                All Products
              </button>
              <button
                className="boton_tercero"
                style={{ backgroundColor: colorBotones.boton_tercero }}
                onClick={alternarColoresBotones}
              >
                Available Now
              </button>
            </div>
          </div>
          <div className='caja_quinta'>
            {articulos.filter(articulo => filtroActivo === 'todos' || articulo.available).map(articulo => (
              <div key={articulo.id} className='articulos' style={{ width: '30%', position: 'relative' }}>
                <div className='contenedor_articulo' />
                <img src={articulo.image} className='imagen_articulo' />
                <button className='precio_articulo'>{articulo.price}</button>
                <div />
                {articulo.popular && <p className='popular_articulo'>{articulo.popular} Popular</p>}
                <div className='flexible1'>
                  <span className='nombre_articulo'>{articulo.name}</span>
                </div>
                <div className='flexible2'>
                  {articulo.rating > 1 ? (
                    <img src={estrella_llena} className='estrella_llena' />
                  ) : (
                    <img src={estrella_vacia} className='estrella_vacia' />
                  )}
                  <p className='calificacion'>{articulo.rating}</p>
                  {articulo.votes ? <p className='votantes'>({articulo.votes} votes)</p> : <p className='votantes'>No ratings</p>}
                  <p className='available'>{!articulo.available ? 'Sould out' : ' '}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
