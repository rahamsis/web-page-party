'use client';
import React, { Component } from 'react';
import { keyNumberFloat, isEmpty } from '../../helper/utils.helper';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nombre: '',
            email: '',
            showError: false,
            errorMessage: '',

            loading: false,
        };

        this.refTxtNombre = React.createRef();
        this.refTxtEmail = React.createRef();
    }

    handleAceptar = async (event) => {
        event.preventDefault();

        if (isEmpty(this.state.nombre)) {
            this.setState({ showError: true, errorMessage: 'Por favor ingrese el nombre.' }, () => {
                this.refTxtNombre.current.focus();
            });
            return;
        }

        if (isEmpty(this.state.email)) {
            this.setState({ showError: true, errorMessage: 'Por favor ingrese el celular.' }, () => {
                this.refTxtEmail.current.focus();
            });
            return;
        }

        try {
            this.setState({
                loading: true
            })

            const response = await signIn("credentials", {
                nombre: this.state.nombre,
                email: this.state.email,
                // callbackUrl: "/principal",
                redirect: false,
            });

            if (response?.error) {
                this.setState({
                    message: 'Se produjo un error al ingresar '
                });
                return;
            }

            // window.location.href = '/dashboard';
            // window.location.href = '/dashboard';
            window.location.replace('/principal');   

            console.log(response)

        } catch (error) {
            console.log(error)
        }

        // Aquí podrías hacer una solicitud HTTP a tu backend para guardar los datos en la base de datos

    }

    render() {


        return (
            <div className="absolute w-full h-full flex justify-center items-center">
                <form onSubmit={this.handleAceptar} className=" max-w-[330px] p-9 rounded-2xl text-white bg-[rgba(8,8,8,0.5)] shadow-custom">
                    <div className="row pt-1 pb-1">
                        <div className="w-24 h-24 rounded-[50%] m-auto bg-logo"></div>
                    </div>
                    <div className="row pt-3 pb-3 text-center">
                        <h5>Rahamsis</h5>
                        <h6 className='text-xs'>Invitación al almuerzo por cumpleaños</h6>
                    </div>
                    <div className="row pt-4 pb-3">
                        <div className="w-full">
                            <input
                                className="w-full bg-transparent border-b-[1px] border-gray-400 text-white outline-none"
                                placeholder='Nombre'
                                ref={this.refTxtNombre}
                                value={this.state.nombre}
                                onChange={(event) =>
                                    this.setState({ nombre: event.target.value })
                                } />
                        </div>
                    </div>
                    <div className="row pt-3 pb-3">
                        <div className="w-full">
                            <input
                                type="text"
                                role='float'
                                className="w-full bg-transparent border-b-[1px] border-gray-400 text-white outline-none"
                                placeholder='Celular'
                                ref={this.refTxtEmail}
                                value={this.state.email}
                                onChange={(event) =>
                                    this.setState({ email: event.target.value })
                                }
                                onKeyDown={keyNumberFloat} />
                        </div>
                    </div>
                    <div className="row pt-3 pb-3">
                        <div className="col text-xs">Al dar aceptar, se registrará tu asistencia XD.</div>
                    </div>

                    <div className="row pt-7 pb-1 flex justify-center items-center">
                        <button
                            type="submit"
                            className="bg-green-700 rounded-2xl px-4 py-2"
                            onClick={this.handleAceptar}>
                            <span className="bg-transparent float-end">Aceptar {this.state.loading && "se..."}</span>
                        </button>
                    </div>

                    {this.state.showError && (
                        <div className="text-center text-red-500 mt-4 -mb-8 text-sm">
                            {this.state.errorMessage}
                        </div>
                    )}
                </form>
            </div>
        );
    }
}
