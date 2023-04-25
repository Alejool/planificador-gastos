import React from 'react'
import Gasto from './Gasto'

function ListadoGastos({
    gastos, 
    setGastoEditar, 
    eliminarGasto, 
    filtrar,
    gastosFiltrados}) {
  return (

    <div className='listado-gastos contenedor'>

      <h2> {gastos.length> 0  ?'gastos': 'no hay gastos aún'}</h2>

        <h3>{filtrar && gastosFiltrados.length<1 && 'No tienes gastos de esta categoría'}</h3>

        
        {filtrar ? 
          gastosFiltrados.map(gasto=>{
            return (
              <Gasto
                key={gasto.id}
                gasto={gasto}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto} />)
          })
           
          :
          
          (gastos.map(gasto=>(
            <Gasto 
            key={gasto.id}
            gasto={gasto}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
            />
          )))
    }
          

    </div>
  )
}

export default ListadoGastos
