import React, { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { Button } from "primereact/button";
import Detalle from "../components/Detalle";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext"; // Asegúrate de importar InputText
import FormPostMedicamentos from "../components/Formpostmedicamentos";

const ListaMedicamentosRegistrados = () => {
    const [datos, setDatos] = useState([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [medicamentoSeleccionado, setMedicamentoSeleccionado] = useState(null);
    const toast = useRef(null);

    const API = "http://localhost/backendmedicamentos/api/medicamentos/getMedicamentos.php";

    useEffect(() => {
        fetchDatos();
    }, []);

    const fetchDatos = async () => {
        try {
            const response = await fetch(API);
            if (!response.ok) throw new Error("Error al obtener los datos.");
            const data = await response.json();
            setDatos(data);
        } catch (error) {
            toast.current.show({ severity: "error", summary: "Error", detail: "No se pudieron cargar los datos." });
        }
    };

    const eliminarMedicamento = async (codigo) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "¡El medicamento será eliminado permanentemente!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "No, cancelar",
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch('http://localhost/backendmedicamentos/api/medicamentos/deleteMedicamentos.php', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ codigo }),
                });

                const data = await response.json();

                if (response.ok) {
                    Swal.fire({ title: "Eliminado!", text: "El medicamento fue eliminado correctamente.", icon: "success" });
                    setDatos((prevDatos) => prevDatos.filter((medicamento) => medicamento.codigo !== codigo));
                } else {
                    Swal.fire({ title: "Error", text: data.error || "No se pudo eliminar el medicamento.", icon: "error" });
                }
            } catch (error) {
                Swal.fire({ title: "Error", text: "Error al conectar con el servidor.", icon: "error" });
            }
        }
    };

    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const onGlobalFilterChange = (e) => {
        setGlobalFilterValue(e.target.value); // Actualiza el valor del filtro global
    };

    const verDetalles = (medicamento) => {
        setMedicamentoSeleccionado(medicamento);
        setModalVisible(true);
    };

    return (
        <main className="main-container">
            <Toast ref={toast} />
            <h2 className="text-center">Lista Maestro de Medicamentos</h2>
            <h3 className="text-center py-4">({datos.length}) Medicamentos Registrados en el Sistema</h3>
            
            <div className="d-flex justify-content-center py-3">
                <div className="input-group w-25"> {/* Ajusta el ancho aquí */}
                    <span className="input-group-text"><i className="pi pi-search"></i></span>
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Filtrar por" className="form-control" />
                </div>
            </div>

            {/* Modal para agregar nuevo medicamento */}
            {mostrarFormulario && (
                <div className="modal fade show" style={{ display: 'block' }} aria-modal="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content bg-secondary">
                            <div className="modal-header bg-light text-center text-black ">
                                <h5 className="modal-title ">Registre en el Siguiente Formulario el Nuevo Medicamento</h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-black"
                                    onClick={() => setMostrarFormulario(false)}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body text-secondary">
                                <FormPostMedicamentos setMostrarFormulario={setMostrarFormulario} />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para ver detalles */}
            {modalVisible && (
                <div className="modal fade show" style={{ display: 'block' }} aria-modal="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content bg-secondary">
                            <Detalle item={medicamentoSeleccionado} onClose={() => setModalVisible(false)} />
                        </div>
                    </div>
                </div>
            )}

            <DataTable value={datos} paginator rows={10} rowsPerPageOptions={[5, 10, 25, 50]} globalFilter={globalFilterValue}>
                <Column field="codigo" header="Código" sortable style={{ textAlign: 'center' }}/>
                <Column
                    field="imagen"
                    header="Imagen"
                    body={(rowData) => (
                        <img src={rowData.imagen} alt="Medicamento" style={{ width: "80px", height: "auto" }} />
                    )}
                />
                <Column field="nombre" header="Nombre" sortable style={{ textAlign: 'center' }}/>
                <Column field="principio_activo" header="Principio Activo" sortable style={{ textAlign: 'center' }}/>
                <Column field="marca" header="Marca" sortable style={{ textAlign: 'center' }}/>
                <Column field="laboratorio" header="Laboratorio" sortable style={{ textAlign: 'center' }}/>
                <Column field="funcion" header="Función" sortable style={{ textAlign: 'center' }}/>
                <Column field="presentacion" header="Presentación" sortable style={{ textAlign: 'center' }}/>
                <Column field="descripcion" header="Descripción" sortable style={{ textAlign: 'center' }}/>
                <Column field="forma_empaque" header="Forma de Empaque" sortable style={{ textAlign: 'center' }} />
                <Column field="cantidad_dosis" header="Cantidad de Dósis" sortable style={{ textAlign: 'center' }} />

                {/* Nueva columna para el botón "Ver" */}
                <Column
                    header="Ver"
                    body={(rowData) => (
                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => verDetalles(rowData)}
                            style={{ width: "100%" }}>
                            Ver
                        </button>
                    )}
                />
            </DataTable>
        </main>
    );
};

export default ListaMedicamentosRegistrados;
