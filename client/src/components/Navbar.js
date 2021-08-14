import React from 'react'
import { NavLink } from 'react-router-dom'


const Navbar = ({ session }) => (
    <nav>
        {session && session.userData ? <NavbarAuth /> : <NavbarUnAuth />}
    </nav>
);
const NavbarUnAuth = () => (
    <ul>
        <li>
            <NavLink to="/" exact>Home</NavLink>
        </li>
        <li>
            <NavLink to="/search" >Search</NavLink>
        </li>
        <li>
            <NavLink to="/signin" >SignIn</NavLink>
        </li>
        <li>
            <NavLink to="/signup" >SignUp</NavLink>
        </li>
    </ul>

)
const NavbarAuth = () => (
    <ul>
        <li>
            <NavLink to="/" exact>Home</NavLink>
        </li>
        <li>
            <NavLink to="/search" >Search</NavLink>
        </li>
        <li>
            <NavLink to="/adddrink" >Add Drink</NavLink>
        </li>
        <li>
            <NavLink to="/profile" >Profile</NavLink>
        </li>
        <li>
            <NavLink to="/logout" >Logout</NavLink>
        </li>
    </ul>

)
export default Navbar;
