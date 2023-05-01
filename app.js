//INFORMACION DE CUENTAS:
// CON LISTA DE CUENTAS EN FORMA DE VARIABLE PARA TRAER DEL LOCALSTORAGE EL ARRAY Y GUARDARLO
// LA CONSTANTE ES PARA EL LIMITE DE LA CUENTA IMPUESTO POR EL BANCO
let cuentas = [];
const LIMITE_CUENTA = 350000
let cuenta = undefined

//INPUTS - REGISTRO DE FORMULARIO DE LA CUENTA:
const titular = document.getElementById('titular');
const contacto = document.getElementById('contacto');
const saldo = document.getElementById('saldo');

//BOTON DE REGISTRO:
const registrar = document.getElementById('registrar')

//REGISTRO DE FORMULARIO DE CUENTA:
const formRegistrar = document.getElementById('form-registro');

//EVENT LISTENER DEL BOTON REGISTRAR:
registrar.addEventListener('click', (evento) => {
    evento.preventDefault();
    cuentas.push(new Cuenta(titular.value,contacto.value,+saldo.value,LIMITE_CUENTA));
    alert('SU CUENTA FUE GENERADA CON EXITO!');
    localStorage.setItem('cuentas', JSON.stringify(cuentas));
    console.log(cuentas);
    limpiarForm(formRegistrar);
})

//LIMPIEZA DEL FOMULARIO DE REGISTRO - DEJAR CAMPOS EN BLANCO:
function limpiarForm(form) {
        form.reset();
}


//LIMPIEZA DE TODOS LOS FORMULARIOS: 
function limpiarForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach((form) => {
        form.reset();
    })
}

//INFORMACION DE CUENTAS:
//FUNCION PARA LA OBTENCION DE CUENTAS CARGADAS EN LOCALSTORAGE:
function obtenerCuentas() {
    cuentas = JSON.parse(localStorage.getItem('cuentas')) || [];
    cuentas = cuentas.map((cuenta) => new Cuenta (cuenta.titular,cuenta.contacto,cuenta.saldo,LIMITE_CUENTA));
}

//EVENT LISTENER QUE ESCUCHA EL CARGADO DE LA PAGINA:
document.addEventListener('DOMcontentLoaded', () => {
    obtenerCuentas();
})

//CONSULTAR UNA CUENTA:
const inputTitular = document.getElementById('titular-consulta');
const botonConsulta = document.getElementById('consultar');

//EVENT LISTENER PARA EL BOTON DE CONSULTA:
botonConsulta.addEventListener('click', (evento) => {
    evento.preventDefault();
    const nombreTitular = inputTitular.value;
    const cuentaEncontrada = buscarCuenta(nombreTitular);
    if (cuentaEncontrada) {
        titular.value = cuentaEncontrada.titular;
        contacto.value = cuentaEncontrada.contacto;
        saldo.value = cuentaEncontrada.saldo;
    } else {
        alert('NO EXISTE DICHA CUENTA EN EL BANCO');
        limpiarForms();
    }
})

//FUNCION PARA BUSCAR UNA CUENTA EN EL ARRAY:
function buscarCuenta(nombreTitular) {
    return cuentas.find((cuenta) => cuenta.titular === nombreTitular.toLowerCase());
}

//DEPOSITO O EXTRACCION DE DINERO - SE INGRESA EL USUARIO - SI EL MISMO EXISTE LO BUSCA Y SE PUEDE REALIZAR LA EXTRACCION O EL DEPOSITO DE DINERO: 
const inputMonto = document.getElementById('monto');
const btnDepositar = document.getElementById('depositar');
const btnRetirar = document.getElementById('retirar')

//DEPOSITAR DINERO:
btnDepositar.addEventListener('click', (evento) =>{
    evento.preventDefault();
    cuenta = buscarCuenta(inputTitular.value);
    if (cuenta) {
        const resultado = cuenta.depositarDinero(+inputMonto.value);
        if (resultado) {
            alert('OPERACION REALIZADA CON EXITO!');
        }else {
            alert('OPERACION INVALIDA!');
        }
    }
});

//EXTRAER DINERO:
btnRetirar.addEventListener('click', (evento) =>{
    evento.preventDefault();
    cuenta = buscarCuenta(inputTitular.value);
    if (cuenta) {
        const resultado = cuenta.extraerDinero(+inputMonto.value);
        if (resultado) {
            alert('OPERACION REALIZADA CON EXITO!');
        }else {
            alert('OPERACION INVALIDA');
        }
    }
});