document.getElementById("mostrarAlerta").style.display = "none";
document.getElementById("mostrarResultado").style.display = "none";

//FUNCION QUE MODIFICA ATRIBUTOS Y AGREGA ELEMENTOS NUEVOS DE UN OBJETO
function agregarListaDivisas() {

    let objetoI = document.getElementById("inputDivisaInicial");
    let objetoF = document.getElementById("inputDivisaFinal");

    introducirOpciones(objetoI, 1)
    introducirOpciones(objetoF, 7)

}

//FUNCION QUE INTRODUCE LAS MODIFICACIONES DEL OBJETO A CAMBIAR EN HTML
function introducirOpciones(objeto, contador) {

    var moneda = ['Elige tu moneda', 'Dolar', 'Peso Mexicano', 'Peso Colombiano', 'Euro', 'Libra Esterlina'];
    let opciones
    let i = contador;
    
    moneda.forEach(iterador => {
        opciones = document.getElementById(i.toString());
        opciones.setAttribute("value", iterador);
        objeto.appendChild(opciones);
        i += 1;
    })
    console.log(objeto);

}

//FUNCION QUE REALIZA LAS ACCIONES DE VALIDACION Y CONVERSION DE LA INFORMACION RECIBIDA AL OPRIMIR EL EVENTO BOTON
function capturarInfo() {
    let dinero = document.getElementById("inputDinero").value;
    let divisaInicial = document.getElementById("inputDivisaInicial").value;
    let divisaFinal = document.getElementById("inputDivisaFinal").value;
    
    let info_moneda = [["Dolar", 1, '$ '],
        ["Peso Mexicano", 20.44, 'MXN '],
        ["Peso Colombiano", 3878.55, 'COP '],
        ["Euro", 0.87, '€ '],
        ["Libra Esterlina", 0.74, '£ ']];

    if (isNaN(dinero) || dinero <= 0) {
        mensajeAlerta("INTRODUZCA UN DATO NUMERICO VALIDO")
    }
    else if (divisaInicial === "Elige tu moneda" || divisaFinal === "Elige tu moneda") {
        mensajeAlerta("SELECCIONE UNA DIVISA")
    }

    else {
        convertir(info_moneda, dinero, divisaInicial, divisaFinal)
    }

}

//FUNCION QUE MUESTRA EL AVISO DE ALERTA CUANDO NO SE INTRODUCE LA INFORMACION DE FORMA CORRECTA
function mensajeAlerta(aviso) {
    document.getElementById("mostrarResultado").style.display = "none";
    document.getElementById("mostrarAlerta").style.display = "block";
    document.getElementById("alertaDatos").value = aviso;
}

//FUNCION QUE CALCULA LA CONVERSION DE UN VALOR NUMERICO DADAS DOS DIVISAS 
//RECIBE COMO PARAMETROS UNA LISTA PREDEFINIDA, EL VALOR DEL DINERO A CONVERTIR Y DOS CADENAS DE CARACTERES QUE 
//CORRESPONDEN A LAS DOS DIVISAS
//EL VALOR CALCULADO CORRESPONDIENTE A LA CONVERSION ES ENVIADO A UNA CAJA DE TEXTO PARA SER VISTO POR EL USUARIO

function convertir(lista_m, din, divI, divF) {
    document.getElementById("mostrarAlerta").style.display = "none";
    document.getElementById("mostrarResultado").style.display = "block";

    let valorInicial = 0;
    let valorFinal = 0;
    let totalConvertido = 0;
    let simbolo, aux, valorCaracter;

    lista_m.forEach(element => {
        if (divI === element[0]) {  // Validacion divisa Inicial
            valorInicial = element[1];
        }
        if (divF === element[0]) {      // Validacion divisa Final
            valorFinal = element[1];
            simbolo = element[2];
        }
    });

    totalConvertido = (Number(din) / valorInicial) * valorFinal;
    aux = numeral(totalConvertido);
    valorCaracter = aux.format('0,0.00').toString();
    document.getElementById("totalConvertido").value = simbolo + valorCaracter;
}