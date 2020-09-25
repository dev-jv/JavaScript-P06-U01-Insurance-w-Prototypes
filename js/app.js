// Constructor Seguro
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

// // funcion p. [Realiza la cotizacion con los datos] - / Costo: según.. marca-año-tipo 
Seguro.prototype.cotizarSeguro = function(){
    /*
    1 = Americano 1.15
    2 = Asiatico 1.05
    3 = Europeo 1.35
    */
    // console.log(this.marca);
    let cantidad;
    const base = 2000;
    switch(this.marca){
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }

    // Leer el año

    const diferencia = new Date().getFullYear() - this.year;

    // Cada año que la diferencia es mayor, el costo va a reducirse un 3%
    cantidad -= ((diferencia * 3)*cantidad)/100; 

    /*
        Si el seguro es basico se multiplica por un 30% más
        Si el seguro es completo se multiplica por un 50% más
    */

    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    }else{
        cantidad *= 1.50;
    }

    return cantidad;
}

// Constructor UI
function UI() { }

// función p. [llenar los años] - / rango /
UI.prototype.llenarOpciones = ()=>{
    const max = new Date().getFullYear(),
        min = max-20;
    const selectYear = document.querySelector('#year');

    for(let i = max; i>min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

// función p.  [mostrar mensaje] - / tipo: error o correcto /t/ lugar / tiempo de duración
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement('div');

    if (tipo === 'error'){
        div.classList.add('error');
    }else{
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //insert HTML
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(()=>{
        div.remove();
    }, 2345);
}

// función p. / [mostrar el resultado] - / mostrar espiner + mensaje / extraer datos y mostrarlos
UI.prototype.mostrarResultado = (total, objseguro) => {

    const {marca, year,tipo} = objseguro; 
    let textoMarca;
    switch(marca){
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiatico';
            break;
        case '3':
            textoMarca = 'Europeo';
            break;
        default:
            break;
    }

    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML=`
        <p class = "header">Tu Resumen </p>
        <p class = "font-bold">Marca: <span class = "font-normal"> ${textoMarca}</p> 
        <p class = "font-bold">Año: <span class = "font-normal"> ${year}</p> 
        <p class = "font-bold">Tipo: <span class = "font-normal capitalize" > ${tipo}</p> 
        <p class = "font-bold">Total: <span class = "font-normal"> ${total}</p>`;

    const resultadoDiv = document.querySelector('#resultado');
    
    // Mostrar el spinner

    const spinner = document.querySelector('#cargando')
    spinner.style.display = 'block';

    setTimeout(()=> {
        // spinner.remove(); // Se borra el spinner
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div); // se muestra el resultado
    },2345);

}

const ui = new UI(); // Instanciar UI

// Al cargar
document.addEventListener('DOMContentLoaded', ()=>{
    ui.llenarOpciones(); // Llenar el select con los años
})

eventListeners(); // llama a la funcion que tiene los eventos

function eventListeners(){ // funcion que lista los events
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

// función p. / [evaluar el formulario] - / evalua los input / mensajes / retira resultados ant. / instanciar Seguro y extraer un costo total
function cotizarSeguro(e){
    e.preventDefault();
    
    //lleer la marca seleccionada
    const marca = document.querySelector('#marca').value;
    
    const year = document.querySelector('#year').value;

    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    if(marca === '' || year === '' || tipo === ''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    }

    ui.mostrarMensaje('Cotizando... ', 'exito');
    
    const resultados = document.querySelector('#resultado div');
    if(resultados != null){
        resultados.remove();
    }
    
    const segur = new Seguro(marca, year, tipo); // Instanciar Seguro
    // seguro.cotizarSeguro();
    
    const total = segur.cotizarSeguro(); // Extrae los costos de segur, empleando la funcion p. de Seguro

    // console.log(total);
    // console.log(segur)
    // ui.mostrarMensaje()

    ui.mostrarResultado(total, segur); // Utilizar el prototype que va a utilizar
}











