import {useEffect, useState} from 'react'

function Filtrar({filtrar, setFiltrar}) {
  return (
    <div className='filtros sombra contenedor'>
      <form>
          <div className='campo' htmlFor="tipo">
              <label>Filtrar gastos</label>
            <select  
              id='tipo'
              value={filtrar}
              onChange={e=>setFiltrar(e.target.value)}
              >
              <option value="">--seleccione--</option>
              <option value="ahorro">Ahorro</option>
              <option value="comida">Comida</option>
              <option value="ocio">Ocio</option>
              <option value="salud">Salud</option>
              <option value="casa">casa</option>
              <option value="gastos">Gastos Varios</option>
              <option value="suscripciones">Subscripciones</option>
          </select>
          </div>
      </form>
    </div>
  )
}

export default Filtrar
