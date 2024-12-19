import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

const API = "http://localhost/Backendmedicamentos/api/medicamentos/postMedicamentos.php";

const Formpostmedicamentos = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
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
    const [imagePreview, setImagePreview] = useState(null);
    const toast = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });
        if (imageFile) {
            data.append("imagen", imageFile);
        }

        try {
            const response = await fetch(API, {
                method: "POST",
                body: data,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Error desconocido.");
            }

            await Swal.fire({
                position: "top-end",
                icon: "success",
                title: "¡Medicamento agregado exitosamente!",
                timer: 1800,
                showConfirmButton: false,
            });

            setFormData({
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
            setImageFile(null);
            setImagePreview(null);
            navigate("/Registrar");
        } catch (error) {
            await Swal.fire({
                position: "top-end",
                icon: "error",
                title: "¡Error al registrar el medicamento!",
                text: error.message,
            });
        }
    };

    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ minHeight: "70vh" }}>
                                  
            <div className="card shadow-lg p-4 bg-light" style={{ maxWidth: "700px", width: "100%" }}>
                <h2 className="text-center mb-4">Registro de Medicamento</h2>
                <Toast ref={toast} position="top-center" />
                <form onSubmit={handleSubmit} className="row g-4">
                    {imagePreview && (
                        <div className="col-12 text-center mb-1">
                            <img
                                src={imagePreview}
                                alt="Previsualización"
                                className="img-thumbnail shadow-sm"
                                style={{ maxHeight: "200px", borderRadius: "10px" }}
                            />
                        </div>
                    )}

                    <div className="col-12">
                        <label htmlFor="imagen" className="form-label fw-bold text-secondary">
                            <i className="bi bi-image me-2 text-primary"></i> Imagen
                        </label>
                        <input
                            type="file"
                            name="imagen"
                            id="imagen"
                            accept=".jpg,.png"
                            className="form-control shadow-sm"
                            onChange={handleImageChange}
                            required
                        />
                    </div>

                    {/* Campos del formulario */}
                    {[
                        { id: "nombre", label: "Nombre del Medicamento", icon: "bi bi-fonts" },
                        { id: "principio_activo", label: "Principio Activo", icon: "bi bi-beaker" },
                        { id: "marca", label: "Marca", icon: "bi bi-tags" },
                        { id: "laboratorio", label: "Laboratorio", icon: "bi bi-building" },
                        { id: "funcion", label: "Función", icon: "bi bi-activity" },
                    ].map(({ id, label, icon }) => (
                        <div className="col-md-6" key={id}>
                            <label htmlFor={id} className="form-label fw-bold text-secondary">
                                <i className={`${icon} me-2 text-primary`}></i> {label}
                            </label>
                            <InputText
                                type="text"
                                name={id}
                                id={id}
                                className="form-control shadow-sm"
                                value={formData[id]}
                                onChange={handleChange}
                                required
                                placeholder={`Ingrese ${label.toLowerCase()}`}
                            />
                        </div>
                    ))}

                    <div className="col-md-6">
                        <label htmlFor="presentacion" className="form-label fw-bold text-secondary">
                            <i className="bi bi-box-seam me-2 text-primary"></i> Presentación
                        </label>
                        <select
                            name="presentacion"
                            id="presentacion"
                            className="form-select shadow-sm"
                            value={formData.presentacion}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione</option>
                            <option value="Tableta">Tableta</option>
                            <option value="Comprimido">Comprimido</option>
                            <option value="Cápsula">Cápsula</option>
                            <option value="Jarabe">Jarabe</option>
                            <option value="Ungüento">Ungüento</option>
                            <option value="Inyectable">Inyectable</option>
                            <option value="Polvo">Polvo</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label
                            htmlFor="forma_empaque"
                            className="form-label fw-bold text-secondary"
                        >
                            <i className="bi bi-box me-2 text-primary"></i> Forma de Empaque
                        </label>
                        <select
                            name="forma_empaque"
                            id="forma_empaque"
                            className="form-select shadow-sm"
                            value={formData.forma_empaque}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione</option>
                            <option value="Caja">Caja</option>
                            <option value="Frasco">Frasco</option>
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label
                            htmlFor="cantidad_dosis"
                            className="form-label fw-bold text-secondary"
                        >
                            <i className="bi bi-123 me-2 text-primary"></i> Cantidad de Dosis
                        </label>
                        <InputText
                            type="number"
                            name="cantidad_dosis"
                            id="cantidad_dosis"
                            className="form-control shadow-sm"
                            value={formData.cantidad_dosis}
                            onChange={handleChange}
                            required
                            placeholder="Ingrese la cantidad de dosis"
                        />
                    </div>

                    <div className="col-md-12">
                        <label htmlFor="descripcion" className="form-label fw-bold text-secondary">
                            <i className="bi bi-card-text me-2 text-primary"></i> Descripción
                        </label>
                        <textarea
                            name="descripcion"
                            id="descripcion"
                            className="form-control shadow-sm"
                            rows="3"
                            value={formData.descripcion}
                            onChange={handleChange}
                            required
                            placeholder="Ingrese una descripción detallada del medicamento"
                        />
                    </div>

                    <div className="col-12 text-center mt-4">
                        <button type="submit" className="btn btn-primary px-5 py-2 shadow-sm me-2">
                            <i className="bi bi-plus-circle me-2"></i> Agregar Medicamento
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary px-5 py-2 shadow-sm"
                            onClick={() => navigate("/ListaMedicamentosRegistrados")}
                        >
                            <i className="bi bi-x-circle me-2"></i> Cerrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Formpostmedicamentos;
