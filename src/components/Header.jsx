
import Control from "./Control"
import PresupuestoInicial from "./PresupuestoInicial"


function Header({presupuesto, 
  setPresupuesto, 
  validpresupuesto, 
  setValidpresupuesto, 
  gastos,
  resetearApp,
  cambiarPresupuesto}) {
 
  return (
    <header>
      <h1 >Controla tus gastos<span>Impulsa tu vida</span> </h1>

      {!validpresupuesto?
      <PresupuestoInicial
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        validpresupuesto={validpresupuesto}
        setValidpresupuesto={setValidpresupuesto}
      />:<Control
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        gastos={gastos}
        resetearApp={resetearApp}
        cambiarPresupuesto={cambiarPresupuesto}
        />}
    </header>
  )

}


export default Header
