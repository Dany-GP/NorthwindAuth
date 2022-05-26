import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import logo from './img/Logotipo-500x500-px.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
//import './styles/index.css';
import authService from './api-authorization/AuthorizeService'

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true, isUserValid: false
    };
  }

  componentDidMount(){
    authService.getUser().then(
      (u) => { console.log(u);
          const valo = authService.isValidUser(u);
          console.log(valo);
          this.setState({isUserValid: valo});
          console.log(valo);
      }

  );
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand className='cont-logo fs-4 txt-white border border-1 rounded p-1 mx-3 btn-orange-no-border mr-5 d-flex align-items-center' tag={Link} to="/">
              Northwind
              <div className='d-flex ms-2'>
                <img src={logo} className='logo' />
              </div>
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                  {this.state.isUserValid && <NavLink tag={Link} className="text-white mx-2" to="/Almacenes">Almacenes</NavLink>}
                </NavItem>
                <NavItem>
                  {this.state.isUserValid && <NavLink tag={Link} className="text-white mx-2" to="/Movimientos">Movimientos</NavLink>}
                </NavItem>
                <LoginMenu className="text-white mx-2">
                </LoginMenu>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
