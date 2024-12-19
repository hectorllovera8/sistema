import React from "react";

const Detalle = ({ item, onClose }) => {
  // Verifica si hay un item para mostrar
  if (!item) {
    return null; // No renderiza nada si no hay item
  }

  return (
    <div
      className="modal fade show"
      style={{ display: 'block' }} // Asegúrate de que el modal se muestre
      tabIndex="-1"
      aria-labelledby={`exampleModalLabel-${item.codigo}`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
        <div className="modal-header">
    <h1
        className="modal-title fs-5"
        id={`exampleModalLabel-${item.codigo}`}
    >
        <strong style={{ color: "black" }}>Nombre:</strong>{" "}
        <span style={{ color: "red" }}>{item.nombre}</span>
    </h1>

    <button
        type="button"
        className="btn-close"
        style={{ color: "black" }} // Cambia el color del botón (esto puede no funcionar en todos los navegadores)
        onClick={onClose}
        aria-label="Close"
    ></button>
</div>


          <div className="modal-body">
            <div className="row">
              <div className="col-md-6" style={{ lineHeight: "1.2" }}>
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="img-fluid"
                  style={{
                    objectFit: "contain",
                    maxHeight: "400px",
                    width: "100%",
                  }}
                />
              </div>

              <div className="col-md-6" style={{ lineHeight: "1.2", color: "black" }}>

                <h5 className="py-4">
                  <strong>Código Producto:</strong> 0{item.codigo}
                </h5>
                <p>
                  <strong>Principio Activo:</strong> {item.principio_activo}
                </p>
                <p>
                  <strong>Presentación:</strong> {item.presentacion}
                </p>
                <p>
                  <strong>Descripción:</strong> {item.descripcion}
                </p>
                <p>
                  <strong>Función:</strong> {item.funcion}
                </p>
                <p>
                  <strong>Marca:</strong> {item.marca}
                </p>
                <p>
                  <strong>Laboratorio:</strong> {item.laboratorio}
                </p>
                <p>
                  <strong>Cantidad de Dosis:</strong> {item.cantidad_dosis}
                </p>
                <p>
                  <strong>Empaque:</strong> {item.forma_empaque}
                </p>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose} // Llama a la función onClose al cerrar
            >
              Cerrar
            </button>
            <a href="/registrar" className="btn btn-primary">
              Agregar nuevo medicamento
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalle;
