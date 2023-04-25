import { useState } from "react"
import Mensaje from "./Mensaje";

function PresupuestoInicial({presupuesto, setPresupuesto, validpresupuesto, setValidpresupuesto}) {

  
  const[mensaje, setMensaje]= useState('')

  const handlePresupuesto=(e)=>{
    e.preventDefault();

    if(!presupuesto||presupuesto<0){
      setMensaje('Por favor ingresa un presupuesto válido')
      return;
    }

    setMensaje('')
    setValidpresupuesto(true)



    
  }
  
  
    return (
      <div className="contenedor-presupuesto--principal contenedor sombra">
         

        <form className="form">
        
          <div className="campo">
          <label  htmlFor="prespuesto">Ingresa tu presupuesto</label>
          <input  
            className="nuevo-presupuesto"
            placeholder="100000" 
            type="number"
            value={presupuesto}
            onChange={(e)=>setPresupuesto(Number(e.target.value))}
            />
  
          </div>
          <input
            type="submit"
            value="Definir presupuesto"
            onClick={handlePresupuesto}
            />
        </form>
        {mensaje &&
            <Mensaje
            tipo='error'
            mensaje={mensaje}/>
          }
  
        <img  className="img-fluid" src="/img/vector.avif"/>
        
      </div>
  )
}




export default PresupuestoInicial
