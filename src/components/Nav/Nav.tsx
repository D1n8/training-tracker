import { useNavigate } from 'react-router-dom';
import './Nav.css'


function Nav() {
    const navigate = useNavigate()
    return (
        <nav className="nav">
            <button onClick={() => navigate('/')} className="btn nav-btn">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 29.3334V16H20V29.3334M4 12L16 2.66669L28 12V26.6667C28 27.3739 27.719 28.0522 27.219 28.5523C26.7189 29.0524 26.0406 29.3334 25.3333 29.3334H6.66667C5.95942 29.3334 5.28115 29.0524 4.78105 28.5523C4.28095 28.0522 4 27.3739 4 26.6667V12Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
            <button onClick={() => navigate('/calendar')} className="btn nav-btn">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.3333 2.66669V8.00002M10.6667 2.66669V8.00002M4 13.3334H28M6.66667 5.33335H25.3333C26.8061 5.33335 28 6.52726 28 8.00002V26.6667C28 28.1394 26.8061 29.3334 25.3333 29.3334H6.66667C5.19391 29.3334 4 28.1394 4 26.6667V8.00002C4 6.52726 5.19391 5.33335 6.66667 5.33335Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
            <button onClick={() => navigate('/analytic')} className="btn nav-btn">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.28 21.1867C27.4318 23.1927 26.1051 24.9603 24.4158 26.3351C22.7266 27.7099 20.7264 28.6499 18.5899 29.0731C16.4535 29.4962 14.2459 29.3895 12.1602 28.7624C10.0745 28.1353 8.17418 27.0068 6.62537 25.4756C5.07656 23.9443 3.92643 22.057 3.27552 19.9786C2.62462 17.9002 2.49276 15.694 2.89147 13.5529C3.29019 11.4117 4.20734 9.40086 5.56274 7.69606C6.91814 5.99126 8.67052 4.64444 10.6667 3.77335M29.3333 16C29.3333 14.2491 28.9885 12.5152 28.3184 10.8976C27.6483 9.2799 26.6662 7.81004 25.4281 6.57193C24.19 5.33382 22.7201 4.35169 21.1025 3.68163C19.4848 3.01156 17.751 2.66669 16 2.66669V16H29.3333Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        </nav>
    );
}

export default Nav;