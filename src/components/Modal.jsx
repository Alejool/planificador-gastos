import React, { useState, useEffect } from 'react'
import Mensaje from './Mensaje';
import btnCerrar from '/img/cerrar.svg'



function Modal({
  setModal, 
  animarModal, 
  setAnimarModal, 
  guardarGastos, 
  gastoEditar,
  setGastoEditar}) {

  const [mensaje, setMensaje]= useState('')
  const [nombre, setNombre]=useState('');
  const [valor, setValor]=useState('');
  const [categoria, setCategoria]=useState('');
  const [id, setId]=useState('');
  const [fecha, setFecha]=useState('');

 
  useEffect(()=>{
    if(Object.keys(gastoEditar).length>0){
      setNombre(gastoEditar.nombre)
      setValor(gastoEditar.valor)
      setCategoria(gastoEditar.categoria)
      setId(gastoEditar.id)
      setFecha(gastoEditar.fecha)
    }
   }, [])


  const cerrarModal=()=>{
    setAnimarModal(false)
    setGastoEditar({})
    setTimeout(()=>{
      
      setModal(false)
    }, 500)

  }



  const handleSubmit=(e)=>{
    e.preventDefault();

    if([nombre, valor, categoria].includes('')){
      setMensaje('Todos los campos son obligatorios')

      setTimeout(()=>{
        setMensaje('')
      },2000)
     return;

    }

    const nuevoGasto= {
      nombre,
      valor,
      categoria,
      id,
      fecha
    }

   
    guardarGastos(nuevoGasto)

    cerrarModal()

    setNombre('')
    setValor('')
    setCategoria('')

  }

  return (
    <div className='modal '>
      <div className='cerrar-modal'>
        <img 
          src={btnCerrar}
          alt='cerrar modal'
          onClick={cerrarModal}
          />
      </div>
      

      <form className={`form ${animarModal ? 'animar' : 'cerrar'} ` }  onSubmit={handleSubmit}>

        <legend >{gastoEditar.nombre?'Editando gasto':'Creando gasto'} </legend>
        {mensaje &&
            <Mensaje
            tipo='error'
            mensaje={mensaje}/>
          }

        <div className='campo'>
          <label htmlFor='nombre'>Nombre </label>
          <input 
            type='text' 
            id='nombre'
            placeholder='alejandro, josue, etc'
            value={nombre}
            onChange={e=>setNombre(e.target.value)}/>
        </div>{/* fin campo*/}

        <div className='campo'>
          <label htmlFor='valor'>Valor </label>
          <input 
            type='number' 
            id='valor'
            placeholder='120'
            value={valor}
            onChange={e=>setValor(Number(e.target.value))}/>
        </div> {/* fin campo*/}

        <div className='campo'>
          <label htmlFor='tipo'>Tipo</label>
          <select  
             id='tipo'
             value={categoria}
             onChange={e=>setCategoria(e.target.value)}>
            <option value="">--seleccione--</option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="casa">casa</option>
            <option value="gastos">Gastos Varios</option>
            <option value="suscripciones">Subscripciones</option>
          </select>
        </div>{/* fin campo*/}

        <input 
          className='btn-modal' 
          type='submit'
          value={gastoEditar.nombre ? 'Editar gasto': 'Añadir gasto'}
          
          />

        
      </form>
      
    </div>
  )
}

export default Modal
