import { useNavigate } from 'react-router-dom';
import './Nav.css'


function Nav() {
    const navigate = useNavigate()
    return (
        <nav className="nav">
            <button onClick={() => navigate('/')} className="btn nav-btn">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29.3333 14.7734V16C29.3317 18.8753 28.4007 21.6729 26.6791 23.9758C24.9575 26.2787 22.5377 27.9633 19.7805 28.7786C17.0232 29.5938 14.0763 29.4959 11.3793 28.4995C8.68223 27.503 6.37953 25.6615 4.8146 23.2494C3.24968 20.8374 2.50638 17.9841 2.69556 15.1151C2.88474 12.2461 3.99627 9.51512 5.86436 7.32945C7.73246 5.14378 10.257 3.62053 13.0616 2.98688C15.8661 2.35324 18.8003 2.64314 21.4267 3.81336M29.3333 5.33336L16 18.68L12 14.68" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            <button onClick={() => navigate('/analytic')} className="btn nav-btn">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.28 21.1867C27.4318 23.1927 26.1051 24.9603 24.4158 26.3351C22.7266 27.7099 20.7264 28.6499 18.5899 29.0731C16.4535 29.4962 14.2459 29.3895 12.1602 28.7624C10.0745 28.1353 8.17418 27.0068 6.62537 25.4756C5.07656 23.9443 3.92643 22.057 3.27552 19.9786C2.62462 17.9002 2.49276 15.694 2.89147 13.5529C3.29019 11.4117 4.20734 9.40086 5.56274 7.69606C6.91814 5.99126 8.67052 4.64444 10.6667 3.77335M29.3333 16C29.3333 14.2491 28.9885 12.5152 28.3184 10.8976C27.6483 9.2799 26.6662 7.81004 25.4281 6.57193C24.19 5.33382 22.7201 4.35169 21.1025 3.68163C19.4848 3.01156 17.751 2.66669 16 2.66669V16H29.3333Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </nav>
    );
}

export default Nav;