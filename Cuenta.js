
// CLASE CON LOS OBJETOS, SON LOS DATOS DEL USUARIO, Y QUE GENERAN LA CUENTA EN EL BANCO-CAJERO: 
 
class Cuenta {
    /** 
     * //CONSTRUCTOR PARA GENERAR UNA CUENTA A PARTIR DE LOS SIGUIENTES DATOS DEL ASOCIADO:
    
     * @param {String} titular // NOMBRE DEL TITULAR DE CUENTA
     * @param {String} contacto // DEL TITULAR, PUEDE SER UN TELEFONO O UN MAIL
     * @param {Number} saldo // EL SALDO INICIAL QUE EL USUARIO DESEA TENER
     * @param {Number} limite // LIMITE PARA MOVIMIENTOS DE EXTRACCION O DEPOSITO IMPUESTOS POR EL BANCO
     * */

    constructor(titular, contacto, saldo, limite) {
        this.titular = titular.toLowerCase(); // EL NOMBRE SE GUARDA EN MINUSCULAS
        this.contacto = contacto;
        this.saldo = saldo;
        this.limite = limite;
    }

    /**
     * FUNCION PARA LA EXTRACCION DE DINERO DE LA CUENTA:
 
     * @param {Number} cantidad  
     * @returns => BOLEANO QUE INDICA SI LA OPERACION FUE O NO EXITOSA
     */
    
    extraerDinero(cantidad) {
        let res;
        if (this.saldo >= cantidad && cantidad <= this.limite && cantidad > 0) {
            this.saldo -= cantidad;
            res = true;
        } else res = false;
        return res;
    }

    /**
     * FUNCION PARA DEPOSITAR DINERO EN LA CUENTA:
     
     * @param {Number} cantidad 
     * @returns => BOLEANO QUE INDICA SI LA OPERACION FUE O NO EXITOSA
     */

    depositarDinero(cantidad) {
        if (cantidad && cantidad > 0) {
            this.saldo += cantidad; 
            return true;
        } else return false;
    }

    // FUNCION PARA CONSULTAR SALDO E INFORMACION DE UN ASOCIADO:
    
    consultar() {
        return this.saldo;
    }
}
