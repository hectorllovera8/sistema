import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";


const API_PUT =
  "http://localhost/Backendmedicamentos/api/medicamentos/putMedicamentos.php";

const Formputmedicamentos = ({
  medicamentoSeleccionado,
  onSubmit,
  onClose,
}) => {
  const [medicamento, setMedicamento] = useState({
    codigo: "",
    nombre: "",
    principio_activo: "",
    marca: "",
    laboratorio: "",
    funcion: "",
    presentacion: "",
    descripcion: "",
    forma_empaque: "",
    cantidad_dosis: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (medicamentoSeleccionado) {
      setMedicamento(medicamentoSeleccionado);
      setImagePreview(medicamentoSeleccionado.imagen);
    }
  }, [medicamentoSeleccionado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedicamento((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validImageTypes.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "Formato no válido",
          text: "Selecciona un archivo de imagen válido (JPG, PNG, GIF).",
        });
        return;
      }
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(medicamento).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (imageFile) {
        formData.append("imagen", imageFile);
      }

      const response = await fetch(API_PUT, { method: "POST", body: formData });
      if (!response.ok) throw new Error("Error al actualizar el medicamento");

      Swal.fire({
        position: "top",
        icon: "success",
        title: "Medicamento actualizado exitosamente",
        showConfirmButton: false,
        timer: 1800,
      });
      onSubmit(medicamento);
      onClose();
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
  <div className="card shadow-lg p-4 bg-light" style={{ maxWidth: "700px", width: "100%" }}>
    <h2 className="text-center mb-4">Editar Medicamento</h2>
    <Toast ref={Toast} position="top-center" />

    <form onSubmit={handleSubmit} className="container mt-4">
      {/* Imagen al principio */}
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label htmlFor="imagen" className="form-label">Imagen:</label>
          <input
            type="file"
            className="form-control form-control-sm"
            accept="image/*"
            id="imagen"
            onChange={handleFileChange}
          />
        </div>
        {imagePreview && (
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img
              src={imagePreview}
              alt="Vista previa"
              className="mt-2"
              width="150"
            />
          </div>
        )}
      </div>

      <div className="row g-3">
        {/* Campo Código - solo lectura y centrado */}
        <div className="col-md-6 mb-3">
          <label htmlFor="codigo" className="form-label">Código:</label>
          <input
            type="text"
            className="form-control form-control-sm text-center"
            id="codigo"
            name="codigo"
            value={medicamento.codigo}
            readOnly
            required
          />
        </div>
        
        {/* Otros campos */}
        <div className="col-md-6 mb-3">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="nombre"
            name="nombre"
            value={medicamento.nombre}
            onChange={handleChange}
            required
          />
        </div>

        {/* Principio Activo y Marca en dos columnas */}
        <div className="col-md-6 mb-3">
          <label htmlFor="principio_activo" className="form-label">Principio Activo:</label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="principio_activo"
            name="principio_activo"
            value={medicamento.principio_activo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="marca" className="form-label">Marca:</label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="marca"
            name="marca"
            value={medicamento.marca}
            onChange={handleChange}
            required
          />
        </div>

        {/* Laboratorio y Función en dos columnas */}
        <div className="col-md-6 mb-3">
          <label htmlFor="laboratorio" className="form-label">Laboratorio:</label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="laboratorio"
            name="laboratorio"
            value={medicamento.laboratorio}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="funcion" className="form-label">Función:</label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="funcion"
            name="funcion"
            value={medicamento.funcion}
            onChange={handleChange}
            required
          />
        </div>

        {/* Otros campos */}
        <div className="col-md-6 mb-3">
          <label htmlFor="presentacion" className="form-label">Presentación:</label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="presentacion"
            name="presentacion"
            value={medicamento.presentacion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción:</label>
          <textarea
            className="form-control form-control-sm"
            id="descripcion"
            name="descripcion"
            value={medicamento.descripcion}
            onChange={handleChange}
            required
          />
        </div>

        {/* Otros campos */}
        <div className="col-md-6 mb-3">
          <label htmlFor="forma_empaque" className="form-label">Forma de Empaque:</label>
          <input
            type="text"
            className="form-control form-control-sm"
            id="forma_empaque"
            name="forma_empaque"
            value={medicamento.forma_empaque}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="cantidad_dosis" className="form-label">Cantidad Dosis:</label>
          <input
            type="number"
            className="form-control form-control-sm"
            id="cantidad_dosis"
            name="cantidad_dosis"
            value={medicamento.cantidad_dosis}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

      <div className="d-flex justify-content-between mt-3">
        <button type="submit" className="btn btn-primary btn-sm">Actualizar Medicamento</button>
        <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>Cerrar</button>
      </div>
    </form>
  </div>
</div>

  

  );
};

export default Formputmedicamentos;
