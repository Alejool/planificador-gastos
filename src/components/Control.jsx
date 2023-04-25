import React, { useState, useEffect } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Mensaje from './Mensaje';

function Control({
  presupuesto, 
  setPresupuesto, 
  gastos, 
  resetearApp,
  cambiarPresupuesto}) {

  const[gastado, setGastado]=useState(0);
  const[mensaje, setMensaje]=useState('');
  const[disponible, setDisponible]=useState(0);
  const[porcentaje, setPorcentaje]=useState(0);


  useEffect(()=>{
   const gastadoTotal=gastos.reduce((suma, gasto)=> gasto.valor+suma, 0 )
   const totalDisponible=presupuesto-gastadoTotal
  
   const newPresupuesto=presupuesto-totalDisponible;

   // porcentaje gastado
   const porcentajeT=((newPresupuesto)/ presupuesto*100).toFixed(2)
   setPorcentaje(porcentajeT)
   setGastado(gastadoTotal);
   setDisponible(totalDisponible)

   /// probamos mostrar el mensaje cuando el gastado supere el presupuesto
   if(gastadoTotal>presupuesto){
    setMensaje('tus gastos superaron tu presupuesto')
   }
   else 
   {
    setMensaje('')
   }

  },[gastos])


  

  


  const formatearCantidad=(cantidad)=>{
   return cantidad.toLocaleString('en-US',{ style: 'currency', currency:'USD'
  })
  }

  
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      
      <div className=''>
          <CircularProgressbar  value={porcentaje} text={`${porcentaje}% gastado`} />
         
      </div>

      <div className='contenido-presupuesto'>

        <div className="d-flex-btn">
          <input 
            className='cambiar-presupuesto reset-app' 
            type='button' 
            value={'cambiar presupuesto'}
            onClick={cambiarPresupuesto}
            />
          <input 
            className='reset-app' 
            type='button' 
            value={'Resetear App'}
            onClick={resetearApp}
            />
        </div>
      
          
        <p> 
          <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p className={mensaje ? 'rojo': ''}> 
          <span>Disponible: </span> {formatearCantidad(disponible)}
        </p>
        <p > 
          <span>Gastado: </span> {formatearCantidad(gastado)}
        </p>

        
        
        {mensaje &&
            <Mensaje
            tipo='error'
            mensaje={mensaje}/>
          }
      </div>
     


    </div>
    
  )
}

export default Control
