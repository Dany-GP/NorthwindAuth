import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './styles/index.css';
import logo from './img/Logotipo-500x500-px.png';


export default class Footer extends Component {
    render() {
        return (
            <footer id="dk-footer" class="h-100 dk-footer">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-12 col-lg-4">
                            <div class="dk-footer-box-info">
                                <a href="index.html" class="footer-logo">
                                    <img src={logo} alt="footer_logo" class="logo img-fluid"
                                    />
                                </a>
                                <p class="footer-info-text">
                                    NorthWind
                                </p>
                                <div class="footer-social-link">
                                    <h3>Contáctanos</h3>
                                    <ul>
                                        <li>
                                            <a href="#">
                                                <i class="fa fa-facebook"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i class="fa fa-twitter"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i class="fa fa-google-plus"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i class="fa fa-linkedin"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i class="fa fa-instagram"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                            </div>

                            <div class="footer-awarad">

                                <p>Mejor compañía de inventario 2022</p>
                            </div>
                        </div>

                        <div class="col-md-12 col-lg-8">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="contact-us">
                                        <div class="contact-icon">
                                            <i class="fa fa-map-o" aria-hidden="true"></i>
                                        </div>

                                        <div class="contact-info">
                                            <h3>Guanajuato México</h3>
                                            <p>Avenida Costeño #4000, Iramuco</p>
                                        </div>

                                    </div>

                                </div>

                                <div class="col-md-6">
                                    <div class="contact-us contact-us-last">
                                        <div class="contact-icon">
                                            <i class="fa fa-volume-control-phone" aria-hidden="true"></i>
                                        </div>

                                        <div class="contact-info">
                                            <h3>4434626670</h3>
                                            <p>Llámanos</p>
                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div class="row">
                                <div class="col-md-12 col-lg-6">
                                    <div class="footer-widget footer-left-widget">
                                        <div class="section-heading">
                                            <h3>Links Útiles</h3>
                                            <span class="animate-border border-black"></span>
                                        </div>
                                        <ul>
                                            <li>
                                                <a href="#">Acerca de</a>
                                            </li>
                                            <li>
                                                <a href="#">Servicios</a>
                                            </li>
                                            <li>
                                                <a href="#">Proyectos</a>
                                            </li>
                                            <li>
                                                <a href="#">Nuestro Equipo</a>
                                            </li>
                                        </ul>
                                        <ul>
                                            <li>
                                                <a href="#">Contáctanos</a>
                                            </li>
                                            <li>
                                                <a href="#">Blog</a>
                                            </li>
                                            <li>
                                                <a href="#">Testimonios</a>
                                            </li>
                                            <li>
                                                <a href="#">Faq</a>
                                            </li>
                                        </ul>
                                    </div>

                                </div>

                                <div class="col-md-12 col-lg-6">
                                    <div class="footer-widget">
                                        <div class="section-heading">
                                            <h3>Soporte</h3>
                                            <span class="animate-border border-black"></span>
                                        </div>
                                        <p>

                                            Escribe tu correo en el apartado de abajo o usa nuestro chat y te contactaremos
                                            enseguida
                                        </p>


                                        <form action="#">
                                            <div class="form-row">
                                                <div class="col dk-footer-form">
                                                    <input type="email" class="form-control"
                                                        placeholder="Correo Electrónico" />
                                                    <button type="submit">
                                                        <i class="fa fa-send"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </form>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>



                <div class="copyright">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6">
                                <span>Copyright © 2019, Todos los derechos reservados NorthWind©</span>
                            </div>

                            <div class="col-md-6">
                                <div class="copyright-menu">
                                    <ul>
                                        <li>
                                            <a href="#">Página Principal</a>
                                        </li>
                                        <li>
                                            <a href="#">Términos</a>
                                        </li>
                                        <li>
                                            <a href="#">Políticas de Privacidad</a>
                                        </li>
                                        <li>
                                            <a href="#">Contacto</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>


            </footer>
        );
    }
}