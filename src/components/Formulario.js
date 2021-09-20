import React, {useState} from 'react';
import PropTypes from "prop-types";
import Error from "./Error";
import shortid from 'shortid';

const Formulario = ({guardarGasto, guardarCrearGasto}) => {

    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    const agregarGasto = (e) =>{
        e.preventDefault();

        //Validar
        if( cantidad < 1 || isNaN(cantidad) || nombre.trim() === '' ){
            guardarError(true);
            return;
        }
        guardarError(false);

        //Construir el gasto 

        const gasto = {
            nombre: nombre,
            cantidad : cantidad,
            id: shortid.generate()
        };

        //Pasar el gasto al componente principal
        guardarGasto(gasto);
        guardarCrearGasto(true);
        //Reiniciar el form
        guardarNombre('');
        guardarCantidad(0);

    }

    return ( 
        <form

            onSubmit={agregarGasto}
        
        >
            <h2>Agrega tus gastos aqui </h2>
            {error ? (<Error mensaje="los campos son obligatorios y el numero no puede ser menor a 1" />) : null}
            <div className="campo">
                <label>Nombre Gasto</label>
                <input
                    type="text"
                    className="u-full-width"
                    placeholder="Ej Transporte"
                    value={nombre}
                    onChange = { e => guardarNombre(e.target.value)  }
                />
            </div>
            <div className="campo">
                <label>Cantidad Gasto</label>
                <input
                    type="Number"
                    className="u-full-width"
                    placeholder="300"
                    value={cantidad}
                    onChange = { e => guardarCantidad(parseInt(e.target.value, 10))  }

                />
            </div>

            <input
                type="submit"
                className="primary-button u-full-width"
                value="agregar gasto"
            />

        </form>

     );
}

Formulario.propTypes = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}
 
export default Formulario;