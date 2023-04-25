import React from 'react'
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'

import {formatearFecha} from '../helpers/'
import IconComida from '/img/comida.svg'
import IconOcio from '/img/ocio.svg'
import IconAhorro from '/img/ahorro.svg'
import IconSalud from '/img/salud.svg'
import IconGastosVarios from '/img/gastos.svg'
import IconCasa from '/img/casa.svg'
import IconSuscripciones from '/img/suscribir.svg'

const diccionarioIconos={
  ahorro: IconAhorro,
  comida:IconComida,
  ocio: IconOcio,
  gastos:IconGastosVarios,
  casa:IconCasa,
  salud:IconSalud,
  suscripciones:IconSuscripciones
}



/* ------------------------------------------------------*/
function Gasto({gasto, setGastoEditar, eliminarGasto}) {
  const {nombre, categoria, valor, id, fecha}=gasto;

  const trailingActions=()=>(
  <TrailingActions>
    <SwipeAction 
      onClick={()=>eliminarGasto(gasto.id)}
      destructive={true}>
      Borrar
    </SwipeAction>
  </TrailingActions>
    
  )

  const leadingActions=()=>(
    <LeadingActions>
      <SwipeAction onClick={()=>setGastoEditar(gasto)}>
        Editar
      </SwipeAction>
    </LeadingActions>
  )

  return (
  <SwipeableList>
    <SwipeableListItem
      leadingActions={leadingActions()}
      trailingActions={trailingActions()}
      >
      <div className='gasto sombra'>
        
        <img className='gasto-img' 
          src={diccionarioIconos [categoria]} 
          alt={"icono accion"}/>
    
        <div className='contenido-gasto'>
          <div className='descripcion-gasto'>
            <p className='categoria'> {categoria}</p>
            <p className='nombre-gasto'> {nombre}</p>
            <p className='fecha-gasto'>  <span>{formatearFecha(fecha)}</span></p>
          </div>
        </div>
        <p className='cantidad-gasto'>${valor}</p>
      </div>
    </SwipeableListItem>
  </SwipeableList>
  )
}

export default Gasto
