
export const formatearFecha=fecha=>{
  const fechaNew= new Date(fecha);

  const formateo={
    year:'numeric',
    month: 'long',
    day: '2-digit'
  }

  return fechaNew.toLocaleString('es-ES', formateo)
}