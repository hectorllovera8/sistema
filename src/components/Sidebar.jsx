import {BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill} from 'react-icons/bs'
import { FaPerson } from "react-icons/fa6";
import { FaMusic } from "react-icons/fa";
import { BsMusicPlayerFill } from "react-icons/bs";
import { Link } from 'react-router-dom'
import logo from '../../public/logo.png'
import { AiTwotoneEdit } from "react-icons/ai";
import { FaRegListAlt } from "react-icons/fa";


const Sidebar = ({openSidebarToggle, OpenSidebar}) => {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    <img src={logo} width={190} />
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>
    



    
            <ul className='sidebar-list'>
                
                <li className='sidebar-list-item text-center'>
                    <Link to="/ListaMedicamentosRegistrados">
                        <FaRegListAlt className='icon'/> Lista de Medicamentos Registrados
                    </Link>
                </li>
                
                
                
                <li className='sidebar-list-item text-center'>
                    <Link to="/Registrar">
                        <AiTwotoneEdit className='icon'/> Registrar Medicamento Nuevo
                        
                    </Link>
                </li>
                
                <li className='sidebar-list-item text-center'>
                    <Link to="/Entradamedicamentos">
                        <FaPerson className='icon'/> Registrar Dotación de Medicamento
                    </Link>
                </li>



                
                <li className='sidebar-list-item'>
                    <Link to="/Generos">
                        <BsMusicPlayerFill className='icon'/> Eliminar Registro
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/Canciones">
                        <FaMusic className='icon'/> Canciones
                    </Link>
                </li>
                <li className='sidebar-list-item'>
                    <Link to="/Visitantes">
                        <BsPeopleFill className='icon'/> Visitantes
                    </Link>
                </li>
               
                <li className='sidebar-list-item'>
                    <Link to="/Configuración">
                        <BsFillGearFill className='icon'/> Configuración
                    </Link>
                </li>
            </ul>
        </aside>
  )
}

export default Sidebar