import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div className='bg-dark container-fluid'>
        <NavMenu />
        <Container className='bg-dark container-fluid'>
          {this.props.children}
        </Container>
        <Footer></Footer>
      </div>
    );
  }
}
