import {  useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header'
import btnNuevopresupuesto from '/img/nuevo-gasto.svg'
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
import Filtrar from './components/Filtrar';


function App() {

  const [presupuesto, setPresupuesto]=useState(
    Number(localStorage.getItem('presupuesto') )?? 0
  );
  const [validpresupuesto, setValidpresupuesto]= useState(false);
  const [modal, setModal]=useState(false);
  const [animarModal, setAnimarModal]=useState(false);
  // GASTOS
   const [gastos, setGastos]= useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')): []
   )
   const [gastoEditar, setGastoEditar]= useState({})
   const [filtrar, setFiltrar]= useState('')
   const [gastosFiltrados, setGastosFiltrados]= useState([])


   // useEffect
   useEffect(()=>{
    if(Object.keys(gastoEditar).length>0){
      handleNuevoGasto();
    }
   }, [gastoEditar])

   // ACTUALIZAR PRESUPUESTO
   useEffect(()=>{
    localStorage.setItem('presupuesto', presupuesto) ?? 0 
   }, [presupuesto])


   // COMPROBAR SI PRESUPUESTO NO ES O PARA SALTARSE LA VENTANA PRINCIPAL
   useEffect(()=>{
    const presupuestoLS=Number(localStorage.getItem('presupuesto')) ?? 0
    if(presupuestoLS>0) {
      setValidpresupuesto(true)
    }
    
   }, [])

   useEffect(()=>{
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
   }, [gastos])

   
   
   useEffect(()=>{

    if(filtrar){
      // filtrar datos por categoria
      const filtrados=gastos.filter(gasto=>gasto.categoria===filtrar)
      
       setGastosFiltrados(filtrados);
    }
    
  }, [filtrar])



   // funciones
  const handleNuevoGasto=()=>{
    setModal(true)

    setTimeout(()=>{
      setAnimarModal(true)
    }, 500)

  }

  const guardarGastos=gasto=>{

    if(gasto.id){
      // buscar-comparar y editar para evitar duplicidad
      const gastosActualizado=gastos.map(gastoGuardado=> gastoGuardado.id === gasto.id ? gasto : gastoGuardado)
      setGastos(gastosActualizado)
      setGastoEditar({})
    }
    else 
    {
      gasto.fecha=Date.now()
      gasto.id= uuidv4()
      setGastos([...gastos, gasto])
    }

  }

  const eliminarGasto=id=>{
    
      const elimadosGastos=gastos.filter(esteGasto=> esteGasto.id!==id);
      setGastos(elimadosGastos);
    
  }

  const resetearApp=()=>{
    const confirmar=confirm('¿quieres borrar todos los datos?')

    if(confirmar){
      setGastos([])
      setPresupuesto(0)
      setValidpresupuesto(false)
    }
   
  }

  const cambiarPresupuesto=()=>{
    const confirmar=confirm('¿Deseas cambiar el presupuesto, pero mantener los gastos?')

    if(confirmar){
      setPresupuesto(0)
      setValidpresupuesto(false)
    }
  }

  

  
 
  return (
    <div className={modal ? 'fijar': ''}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        validpresupuesto={validpresupuesto}
        setValidpresupuesto={setValidpresupuesto}
        gastos={gastos}
        resetearApp={resetearApp}
        cambiarPresupuesto={cambiarPresupuesto}
      />

      {validpresupuesto &&( 
        
     <>
        <main>
          <Filtrar
            filtrar={filtrar}
            setFiltrar={setFiltrar}
          />
          <ListadoGastos
            gastos={gastos}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
            filtrar={filtrar}
            gastosFiltrados={gastosFiltrados}/>
        </main>
        <div className='nuevo-gasto'>
          <img 
            src={btnNuevopresupuesto} 
            alt="icono agregar gasto"
            onClick={handleNuevoGasto}/>
        </div>
     </>
      
      )}

    {modal && <Modal setModal={setModal} 
                    animarModal={animarModal}
                    setAnimarModal={setAnimarModal}
                    guardarGastos={guardarGastos}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}/>}
      
      
      
    </div>
  )
}





export default App
