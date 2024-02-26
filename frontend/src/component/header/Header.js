import React from 'react'
import logo from '../../assets/parachlogo.png'
import {MdDashboardCustomize} from 'react-icons/md'
import {FaUsers} from 'react-icons/fa'
import {TfiWrite} from 'react-icons/tfi'
import {MdContactPage} from 'react-icons/md'
import  {BiLogIn} from 'react-icons/bi'
import {FiSettings} from 'react-icons/fi'
import {NavLink} from 'react-router-dom'
const Header = () => {
  return (
    <div className='container'>
        <div className='header'>
            <div className='logo'> 
                <img src={logo}/>
            </div>
            <div className="sidebar">
                <NavLink to='' className="active">
                    <MdDashboardCustomize size={30}/>
                    <h3>Dashboard</h3>
                </NavLink>
                <NavLink to='' className="active">
                    <FaUsers size={30}/>
                    <h3>Students</h3>
                </NavLink>
                <NavLink to='' className="active">
                    <TfiWrite size={30}/>
                    <h3>Courses</h3>
                </NavLink>
                <NavLink to='' className="active">
                    <MdContactPage size={30} color='white'/>
                    <h3>Contact</h3>
                </NavLink>
                <NavLink to=''className="active" >
                    <FiSettings size={30}/>
                    <h3>Setting</h3>
                </NavLink>
                <NavLink to=''className="active">
                    <BiLogIn size={30}/>
                    <h3>Log out</h3>
                </NavLink>
                </div>
        </div>



        {/* main container */}
        welcome
    </div>
  )
}

export default Header