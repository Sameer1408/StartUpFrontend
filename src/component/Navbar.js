import React, { useContext, useLayoutEffect, useState, useEffect } from 'react'
import shopContext from '../context/shops/shopContext';
import {
  Link
} from "react-router-dom";
import logoImage from '../images/logo.PNG'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

function Navbar(props) {
  const history = useHistory();
  const { } = useContext(shopContext);

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart;

  useLayoutEffect(() => {
    getUser();
  }, []);

  const [person, setPerson] = useState({})
  const getUser = async () => {
    if (localStorage.getItem('token')) {
      const response = await fetch(`https://mighty-hamlet-73765.herokuapp.com/api/auth/getuser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      const json = await response.json()
      setPerson(json.user);
      console.log(json.user)
    }
  }
  let name = null;

  if (person !== null) {
    name = person.name;
    //console.log(name)
  }

  const handleLogOut = () => {
    localStorage.removeItem('token');
    history.push('/login');
    window.location.reload();
  }


  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light nav_style" style={{ zIndex: 2 }}>
        <Link class="navbar-brand nav_logo" to="/home"><img src={logoImage} style={{ height: "50px" }}></img></Link>
        {localStorage.getItem('hasInputedTheAge') ? <>

          <Link className="user_name_navbar">Hello {name} !</Link>
      
         

          <Link class="nav-item nav-cart navbar-brand" to="/:id/:qty/:price"><button className="btn"><i class="fas fa-shopping-bag"></i> {cartItems.reduce((acc, item) => acc + Number(item.quantity), 0)}</button>{cartItems.reduce((acc, item) => acc + Number(item.quantity), 0) >= 1 ? <i class="fas fa-circle cirlce"></i> : null}</Link>
          
          </> : null}

        
          <ul class="navbar-nav mr-auto">
            {localStorage.getItem('hasInputedTheAge') ? <>
            <li class="nav-item active">
              <Link class="nav-link homeLink" to="/home">Home <span class="sr-only">(current)</span></Link>
            </li>
            {localStorage.getItem('token')
            ?
            <Link class="nav-pro navbar-brand" to="/profile"><i class="fas fa-user-alt"></i></Link>
            :
            <Link class="nav-pro navbar-brand" to="/login"><i class="fas fa-user-alt"></i></Link>
          }

          <Link class="logoutButton navbar-brand" onClick={handleLogOut}><i class="fas fa-sign-out-alt"></i></Link>
                </> :
              null
            }

          </ul>
      </nav>
    </div>
  )
}

export default Navbar