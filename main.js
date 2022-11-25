const spanNumero = document.querySelector('.numero'),
    spanNombre = document.querySelector('.spanNombre'),
    spanMes = document.querySelector('.spanMes'),
    spanAnio = document.querySelector('.spanAnio'),
    inputNumero = document.getElementById('inputNumero'),
    inputTitular = document.getElementById('inputTitular'),
    selectAnio = document.getElementById('selectAnio'),
    selectMes = document.getElementById('selectMes'),
    boton = document.getElementById('boton'),
    containerTarjeta = document.getElementById('containerTarjeta');

const anios = [2022, 2023, 2024, 2025, 2026, 2027, 2028];
const meses = [01, 02, 03, 04, 05, 06, 07, 08];

function eliminarStorage() {
    localStorage.clear();
    sessionStorage.clear();
}

function recuperarStorage() {
    return JSON.parse(sessionStorage.getItem('usuario'));
}

function guardarStorage() {
    const obj = {
        'Numero': inputNumero.value,
        'Titular': inputTitular.value,
        'Vencimiento': selectMes.value + '-' + selectAnio.value
    };
    sessionStorage.setItem('usuario', JSON.stringify(obj));
};

function borrarTodo() {
    inputNumero.value = '';
    spanNumero.innerText = '### ### ### ###';
    inputTitular.value = '';
    spanNombre.innerText = 'Nombre titular';
    spanAnio.innerText = 'AA';
    spanMes.innerText = 'MM';
    selectMes.value = '';
    selectAnio.value = '';

};

function mostrarContenido(input, span) {
    input.oninput = () => {
        span.innerText = input.value;
    }
};

mostrarContenido(inputNumero, spanNumero);
mostrarContenido(inputTitular, spanNombre);

function mostrarSelect(array, select) {
    array.forEach((el) => {
        let op = `<option class="option"> ${el}</option>`;
        select.innerHTML += op;
    })
};

mostrarSelect(anios, selectAnio);
mostrarSelect(meses, selectMes);
mostrarContenido(selectMes, spanMes);
mostrarContenido(selectAnio, spanAnio);

boton.addEventListener('click', (e) => {
    e.preventDefault();
    if (!inputNumero.value || !inputTitular.value || !selectMes.value || !selectAnio.value) {
        Swal.fire({
            title: 'Error',
            text: 'Ingrese todos los campos',
            icon: 'error',
            confirmButtonColor: '#444444',
            confirmButtonText: 'Aceptar'
        });
    } else {
        Swal.fire({
            text: 'Desea guardar sus datos?',
            icon: 'question',
            showCancelButton: 'true',
            cancelButtonColor: '#ff0000',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#444444',
            confirmButtonText: 'Aceptar'

        }).then((result) => {
            if (result.isConfirmed) {
                guardarStorage();
                let obj = recuperarStorage();
                Swal.fire({
                    title: obj.Titular,
                    text: `Le confirmamos que su tarjeta ha sido registrada con exito!!`,
                    icon: 'success',
                    confirmButtonColor: 'firebrick',
                    confirmButtonText: 'Aceptar'
                });
                borrarTodo();
            } else if (result.isDismissed) {
                guardarStorage();
                let obj = recuperarStorage();
                Swal.fire({
                    title: obj.Titular,
                    text: 'Sus datos no fueron registrados',
                    icon: 'warning',
                    confirmButtonColor: '#444444',
                    confirmButtonText: 'Aceptar'
                })
                borrarTodo();
                eliminarStorage();
            }
        })
    }
});