import React from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle } from 'react-icons/bs';
import './Header.css';

const Header = ({ OpenSidebar }) => {
    // Funciones de clic
    const handleAlertClick = () => alert('Has hecho clic en Alertas.');
    const handleEmailClick = () => alert('Has hecho clic en Correo.');
    const handleUserClick = () => alert('Has hecho clic en Usuario.');

    return (
        <div className='header'>
           <h3>Control de Inventario de Medicamentos</h3>
            <div className='header-right'>
                <div className='header-item' onClick={handleAlertClick}>
                    <BsFillBellFill className='icon' />
                    <span>Alertas</span>
                </div>
                <div className='header-item' onClick={handleEmailClick}>
                    <BsFillEnvelopeFill className='icon' />
                    <span>Correo</span>
                </div>
                <div className='header-item' onClick={handleUserClick}>
                    <BsPersonCircle className='icon' />
                    <span>Usuario</span>
                </div>
            </div>
        </div>
    );
};

export default Header;
