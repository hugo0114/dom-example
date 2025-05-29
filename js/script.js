//Inicializamos nuestro arreglo de personas con dos objetos
const personas = [
  {
    nombre: "Juan Perez",
    edad: 18,
    email: "juan.perez@gmail.com",
  },
  {
    nombre: "Maria Loza",
    edad: 21,
    email: "maria.loza@gmail.com",
  },
];

//Esta función permite validar si el email ingresado es válido
function esEmailValido(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

function agregarPersona() {
  //Obtenemos el elemento para mostrar un error del nombre
  const msgErrorNombre = document.querySelector("#msg-error-nombre");
  msgErrorNombre.innerHTML = "";

  //Obtenemos el elemento para mostrar un error de la edad
  const msgErrorEdad = document.querySelector("#msg-error-edad");
  msgErrorEdad.innerHTML = "";

  //Obtenemos el elemento para mostrar un error del email
  const msgErrorEmail = document.querySelector("#msg-error-email");
  msgErrorEmail.innerHTML = "";

  //Obtenemos el input donde se ingresa el nombre
  const inputNombre = document.querySelector("#input-nombre");

  //Obtenemos el input donde se ingresa la edad
  const inputEdad = document.querySelector("#input-edad");

  //Obtenemos el input donde se ingresa el email
  const inputEmail = document.querySelector("#input-email");

  //Creamos una variable que indica si el formulario tiene error
  let hayError = false;

  //Obtenemos el valor del input y le quitamos los espacios
  const nombre = inputNombre.value.trim();
  if (nombre === "") {
    msgErrorNombre.innerHTML = "Debe ingresar un nombre";
    hayError = true;
  }

  //Obtenemos el valor numérico del input de edad
  let edad = inputEdad.valueAsNumber;
  if (isNaN(edad)) {
    msgErrorEdad.innerHTML = "Debe ingresar una edad";
    hayError = true;
  } else if (!Number.isInteger(edad) || edad < 0) {
    msgErrorEdad.innerHTML = "Debe ingresar una edad válida";
    hayError = true;
  }

  //Validamos el email
  const email = inputEmail.value.trim();
  if (email === "") {
    msgErrorEmail.innerHTML = "Debe ingresar un email";
    hayError = true;
  } else if (!esEmailValido(email)) {
    msgErrorEmail.innerHTML = "Debe ingresar un email válido";
    hayError = true;
  }

  //Si hay algún error, no continuamos
  if (hayError) {
    return;
  }

  //Creamos un nuevo objeto con los valores válidos
  const nuevaPersona = {
    nombre: nombre,
    edad: edad,
    email: email,
  };

  //Agregamos el nuevo objeto al arreglo
  personas.push(nuevaPersona);

  //Limpiamos los inputs
  inputNombre.value = "";
  inputEdad.value = "";
  inputEmail.value = "";

  //Actualizamos la tabla de personas
  actualizarLista();
}

//Esta funcion recibirá el indice del arreglo donde se encuentra el nombre a eliminar
function eliminar(i) {
  const respuesta = confirm("¿Esta seguro que desea eliminar el nombre?");
  if (!respuesta) return;

  personas.splice(i, 1);
  actualizarLista();
}

function actualizarLista() {
  //Obtenemos el elemento <tbody> donde se listarán las personas
  const listaNombresHtml = document.getElementById("lista-nombres");

  if (personas.length === 0) {
    listaNombresHtml.innerHTML = `
            <tr>
                <td colspan="4">No hay personas registradas</td>
            </tr>`;
    return;
  }

  //Creamos la tabla dinámicamente
  let html = "";
  for (let i in personas) {
    const persona = personas[i];
    html +=
      `<tr><td><input class="btn-delete" type="button" onclick="eliminar(${i})" value="Eliminar"></td>` +
      "<td>" +
      persona.nombre +
      "</td><td>" +
      persona.edad +
      "</td><td>" +
      persona.email +
      "</td></tr>";
  }

  listaNombresHtml.innerHTML = html;
}
