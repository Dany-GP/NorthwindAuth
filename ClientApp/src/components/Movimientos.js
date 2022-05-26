import React, { Component } from 'react';
import {
    Modal, ModalBody,
    ModalHeader, ModalFooter, Form, FormGroup, Label, Input
} from 'reactstrap';
import './styles/Almacenes.css';
import authService from './api-authorization/AuthorizeService'

export class Movimientos extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accion: 0, data: [], suppliers: [], companies: [], employees: [], warehouses: [], idEliminar: 0,
            proveedor: 0, inAlmacen: 0, outAlmacen: 0, movimiento: '', notas: '', compania: 0, empleado: 0, fecha: '',
            idEditar: 0, isUserValid: false
        };

    }

    componentDidMount() {

        authService.getUser().then(
            (u) => {
                const valo = authService.isAdmin(u);
                this.setState({ isUserValid: valo });
            }

        );

        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch('api/movements', options).then(response => {
            return response.json();
        }).then(
            (dataApi) => {
                this.setState({ data: dataApi });
            }
        );

        fetch('api/companies', options).then(response => {
            return response.json();
        }).then(
            (dataApi) => {
                this.setState({ companies: dataApi });

            }
        );

        fetch('api/employees', options).then(response => {
            return response.json();
        }).then(
            (dataApi) => {
                this.setState({ employees: dataApi });

            }
        );

        fetch('api/suppliers', options).then(response => {
            return response.json();
        }).then(
            (dataApi) => {
                this.setState({ suppliers: dataApi });

            }
        );

        fetch('api/warehouses', options).then(response => {
            return response.json();
        }).then(
            (dataApi) => {
                this.setState({ warehouses: dataApi });

            }
        );

    };

    mitoogle = () => {
        this.setState({
            fecha: "",
            proveedor: 0,
            inAlmacen: 0,
            outAlmacen: 0,
            movimiento: "",
            notas: "",
            compania: 0,
            empleado: 0,
            accion: 0
        })

    }

    nameChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value });

    }


    mostrarModalAgregar = () => {
        this.setState({ accion: 1 });
    }

    mostrarModalDelete = (id) => {
        this.setState({ accion: 3, idEliminar: id });
    }

    mostrarModalUpdate = (id) => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        };

        fetch('api/movements/' + id, options).then(response => {
            return response.json();
        }).then(
            (movimiento) => {
                this.setState({
                    fecha: movimiento.date,
                    proveedor: movimiento.supplierId,
                    inAlmacen: movimiento.originWarehouseId,
                    outAlmacen: movimiento.targetWarehouseId,
                    movimiento: movimiento.type,
                    notas: movimiento.notes,
                    compania: movimiento.companyId,
                    empleado: movimiento.employeeId,
                    accion: 2,
                    idEditar: id
                })
            }
        );
    }

    agregarMovimiento = () => {
        //"1998-05-06T00:00:00"
        var fecha = new Date().getFullYear() + "-" + (new Date().getMonth() + 1).toString().padStart(2, "0") + "-" +
            new Date().getDate() + "T" + new Date().getHours().toString().padStart(2, "0") + ":" + new Date().getMinutes().toString().padStart(2, "0") +
            ":" + new Date().getSeconds().toString().padStart(2, "0");

        var movimiento = {
            movementId: this.state.idEditar,
            date: fecha,
            supplierId: this.state.proveedor,
            originWarehouseId: this.state.inAlmacen,
            targetWarehouseId: this.state.outAlmacen,
            type: this.state.movimiento,
            notes: this.state.notas,
            companyId: this.state.compania,
            employeeId: this.state.empleado
        }
        var options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movimiento)
        };
        if (this.state.accion == 1) {

            fetch("api/movements", options).then(
                (response) => {
                    return response.status;
                }
            ).then(
                (code) => {
                    if (code == 201) {
                        this.mitoogle();
                        this.componentDidMount();
                    } else {
                    }
                }
            )
        } else if (this.state.accion == 2) {
            options.method = "PUT";
            fetch("api/movements/" + this.state.idEditar, options).then(
                (response) => {
                    return response.status;
                }
            ).then(
                (code) => {
                    if (code == 204) {
                        this.mitoogle();
                        this.componentDidMount();
                    } else {
                    }
                }
            )
        }





    }

    eliminar = () => {
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        };

        fetch("api/movements/" + this.state.idEliminar, options).then(
            (response) => {
                return response.status;
            }
        ).then(
            (code) => {
                if (code == 204) {
                    this.setState({ accion: 0 });
                    this.componentDidMount();
                } else {
                }
            }
        )
    }


    render() {
        return (
            <div className='container'>
                <div class="row">
                    <div class="col">
                        <h2>Movimientos</h2>
                        <p>Esta tabla contiene todas las operaciones realizadas de los almacenes</p>
                    </div>
                    <div class="col text-end align-items-center">
                        {this.state.isUserValid && <button class="btn btn-orange" onClick={() => this.mostrarModalAgregar()}>Registrar movimiento</button>}
                    </div>
                </div>
                <div className='container-fluid'>
                    <table className='table table-dark'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Fecha</th>
                                <th>Id Almacen</th>
                                <th>Tipo</th>
                                <th>Id Empresa</th>
                                <th>Id Empleado</th>
                                <th></th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                this.state.data.map(movimiento =>
                                    <tr key={movimiento.movementId}>
                                        <th scope='row'>{movimiento.movementId}</th>
                                        <td>{movimiento.date}</td>
                                        <td>{movimiento.originWarehouseId}</td>
                                        <td>{movimiento.type}</td>
                                        <td>{movimiento.companyId}</td>
                                        <td>{movimiento.employeeId}</td>
                                        { this.state.isUserValid &&
                                            <td>
                                                <button className="btn mx-3" onClick={() => this.mostrarModalUpdate(movimiento.movementId)}>Editar</button>
                                                <button className="btn btn-danger" onClick={() => this.mostrarModalDelete(movimiento.movementId)}>X</button>
                                            </td>
                                        }
                                    </tr>

                                )
                            }
                        </tbody>
                    </table>
                </div>

                <Modal
                    isOpen={this.state.accion >= 1 && this.state.accion < 3}
                    centered
                    size="lg"
                    toggle={this.mitoogle}
                >
                    <ModalHeader
                        toggle={this.mitoogle}
                        close={<button className="btn-lg" onClick={this.mitoogle}>x</button>}
                        className='bg-dark'
                    >
                        Agregar Movimiento
                    </ModalHeader>
                    <ModalBody className='bg-dark'>
                        <Form>
                            <FormGroup>
                                <label>Fecha</label>
                                <Input placeholder='####-##-##T##:##:##' name='fecha' onChange={evt => this.nameChange(evt)} value={this.state.fecha} ></Input>
                            </FormGroup>
                            <FormGroup>
                                <label>proveedor</label>
                                <Input name='proveedor' onChange={evt => this.nameChange(evt)} value={this.state.proveedor} type='select'>
                                    <option selected value="default">Selecciona un proveedor</option>
                                    {
                                        this.state.suppliers.map(proveedor =>
                                            <option value={proveedor.supplierId}>{proveedor.companyName}</option>

                                        )
                                    }
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <label>Almacen origen</label>
                                <Input name='inAlmacen' onChange={evt => this.nameChange(evt)} value={this.state.inAlmacen} type='select'>
                                    <option selected value="default">Selecciona un almacen</option>
                                    {
                                        this.state.warehouses.map(almacen =>
                                            <option value={almacen.warehouseId}>{almacen.description}</option>

                                        )
                                    }
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <label>Almacen destino</label>
                                <Input name='outAlmacen' onChange={evt => this.nameChange(evt)} value={this.state.outAlmacen} type='select'>
                                    <option selected value="default">Selecciona un almacen</option>
                                    {
                                        this.state.warehouses.map(almacen =>
                                            <option value={almacen.warehouseId}>{almacen.description}</option>

                                        )
                                    }
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <label>Tipo de movimiento</label>
                                <Input name='movimiento' onChange={evt => this.nameChange(evt)} value={this.state.movimiento} type='select'>
                                    <option selected value="default">Selecciona un movimiento</option>
                                    <option value="VENTA">VENTA</option>
                                    <option value="COMRPA">COMPRA</option>
                                    <option value="TRASPASO">TRASPASO</option>
                                    <option value="AJUSTE">AJUSTE</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <label>Notas</label>
                                <Input name='notas' onChange={evt => this.nameChange(evt)} value={this.state.notas}></Input>
                            </FormGroup>
                            <FormGroup>
                                <label>Compañia</label>
                                <Input name='compania' onChange={evt => this.nameChange(evt)} value={this.state.compania} type='select'>
                                    <option selected value="default">Selecciona una compañia</option>
                                    {
                                        this.state.companies.map(companie =>
                                            <option value={companie.companyId}>{companie.companyName}</option>

                                        )
                                    }
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <label>Empleado</label>
                                <Input name='empleado' onChange={evt => this.nameChange(evt)} value={this.state.empleado} type='select'>
                                    <option selected value="default">Selecciona un empleado</option>
                                    {
                                        this.state.employees.map(empleado =>
                                            <option value={empleado.employeeId}>{empleado.firstName + " " + empleado.lastName}</option>

                                        )
                                    }
                                </Input>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter className='bg-dark'>
                        <button type="button" class="btn" onClick={this.mitoogle}>Cerrar</button>
                        <button type="button" onClick={() => this.agregarMovimiento() == true} class="btn">Agregar</button>
                    </ModalFooter>
                </Modal>

                <Modal
                    isOpen={this.state.accion == 3}
                    centered
                    size="lg"
                    toggle={this.mitoogle}

                >
                    <ModalHeader
                        toggle={this.mitoogle}
                        close={<button className="btn-lg" onClick={this.mitoogle}>x</button>}
                        className='bg-dark'
                    >
                        Eliminar
                    </ModalHeader>
                    <ModalBody className='bg-dark'>
                        ¿Desea Eliminar Este movimiento?
                    </ModalBody>
                    <ModalFooter className='bg-dark'>
                        <button type="button" class="btn" onClick={this.mitoogle}>Cerrar</button>
                        <button type="button" onClick={() => this.eliminar() == true} class="btn">Eliminar</button>
                    </ModalFooter>
                </Modal>


            </div>
        );
    }
}