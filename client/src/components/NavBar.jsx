import React from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft } from "react-icons/fa";
import { useDashboardContext } from '../pages/DashboardLayout';
import LogoutContainer from './LogoutContainer';
import ThemeToggle from './ThemeToggle';

const NavBar = () => {

    const {toggleSideBar} = useDashboardContext();

  return (
    <Wrapper>
        <div className='nav-center'>
            <button type='button' className='toggle-btn'
             onClick={toggleSideBar}
            >
                <FaAlignLeft />
            </button>
            <div>
                <h4 className='logo-text text-[#4b95bc] font-extrabold'>Dashboard</h4>
            </div>
            <div className="btn-container">
                <ThemeToggle />
             <LogoutContainer />
            </div>
        </div>
    </Wrapper>
  )
}

export default NavBar