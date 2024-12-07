import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange }) => {
    return (
        <nav>
            <button className='nav-button' onClick={() => onRouteChange('signin')}>Sign Out</button>
        </nav>
    );
}

export default Navigation;