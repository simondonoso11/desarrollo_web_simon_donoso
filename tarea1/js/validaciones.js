// Para que aparezca el input de contactoID solo si se selecciona una red social
function apareceContactoID() {
  const contactoPor = document.getElementById("contactoPor"); 
  const contactoID = document.getElementById("contactoID");   
  const labelContactoID = document.getElementById("labelContactoID");

  if (contactoPor.value === "") {
    contactoID.style.display = "none";
    contactoID.required = false;
    if (labelContactoID){
    labelContactoID.style.display = "none";
    }
  } else {
    contactoID.style.display = "block";
    contactoID.required = true;
    if (labelContactoID) {
        labelContactoID.style.display = "block";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("contactoPor").addEventListener("change", apareceContactoID);
  apareceContactoID(); 
});

//Validacion del Formulario


//Funciones para validar cada campo
const validateName = (name) => {
  if(!name) return false;
  let lengthValid = name.trim().length >= 3 && name.trim().length <= 200;
  
  return lengthValid;
}

const validateEmail = (email) => {
  if (!email) return false;
  let lengthValid = email.length < 100;

  // validamos el formato
  let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  let formatValid = re.test(email);

  // devolvemos la lógica AND de las validaciones.
  return lengthValid && formatValid;
};

const validatePhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return false;
  // validación de longitud
  let lengthValid = phoneNumber.length >= 8;

  // validación de formato
  let re = /^\+\d{3}\.\d{8,10}$/;
  let formatValid = re.test(phoneNumber);

  // devolvemos la lógica AND de las validaciones.
  return lengthValid && formatValid;
};

const validateFiles = (files) => {
  if (!files) return false;

  // validación del número de archivos
  let lengthValid = 1 <= files.length && files.length <= 5;

  // validación del tipo de archivo
  let typeValid = true;

  for (const file of files) {
    let fileFamily = file.type.split("/")[0];
    let typeValid = fileFamily === "image";
  }

  // devolvemos la lógica AND de las validaciones.
  return lengthValid && typeValid;
};

const validateSelect = (select) => {
  if(!select) return false;
  return true
}

const validateDate = (dateValue) => {
  if (!dateValue) return false;
  let date = new Date(dateValue);
  let now = new Date();
  return date >= now; 
}

const validateSector = (sector) => {
  if (!sector) return true; 
  return sector.trim().length <= 100;
};

const validateContactoID = (contactoID) => {
  if (!contactoID) return true;
  return contactoID.trim().length >=4 && contactoID.trim().length <= 50;
};

const validateCantidad = (cantidad) => {
  if (!cantidad) return false;
  return cantidad >= 1;
}

const validateEdad = (edad) => {
  if (!edad) return false;
  return edad >= 1;
}

//Función para validar el formulario completo
const validateForm = () => {
  // obtener elementos del DOM usando el nombre del formulario.
  let form = document.getElementById("formulario-adopcion");
  let region = form["Region"].value;
  let comuna = form["Comuna"].value;
  let sector = form["Sector"].value;
  let nombre = form["Nombre"].value;
  let email = form["Email"].value;
  let telefono = form["Telefono"].value;
  let contactoPor = form["contactoPor"].value;
  let contactoID = form["contactoID"].value;
  let tipo = form["Tipo"].value;
  let cantidad = form["Cantidad"].value;
  let edad = form["Edad"].value;
  let unidadedad = form["UnidadEdad"].value;
  let fechaEntrega = form["fechaEntrega"].value;
  let descripcion = form["Descripcion"].value;
  let fotos = form["Fotos"].files;

  let invalidInputs = [];
  let isValid = true;
  const setInvalidInput = (inputName) => {
    invalidInputs.push(inputName);
    isValid = false;
  };
  // lógica de validación
  if (!validateSelect(region)) {
    setInvalidInput("Región");
  }
  if (!validateSelect(comuna)) {
    setInvalidInput("Comuna");
  }
  if (!validateSector(sector)) {
    setInvalidInput("Sector");
  }
  if (!validateName(nombre)) {
    setInvalidInput("Nombre");
  } 
  if (!validateEmail(email)) {
    setInvalidInput("Email");
  }
  if (!validatePhoneNumber(telefono)) {
    setInvalidInput("Teléfono");
  }
  if (!validateSelect(contactoPor)) {
    setInvalidInput("Contacto");
  } 
  if (contactoPor !== "" && !validateContactoID(contactoID)) {
    setInvalidInput("ID/UEL de Contacto");
  }
  if (!validateSelect(tipo)) {
    setInvalidInput("Tipo de Mascota");
  }
  if (!validateCantidad(cantidad)) {
    setInvalidInput("Cantidad");
  } 
  if (!validateEdad(edad)) {
    setInvalidInput("Edad");
  }
  if (!validateSelect(unidadedad)) {
    setInvalidInput("Unidad de Edad");
  }
  if (!validateDate(fechaEntrega)) {
    setInvalidInput("Fecha de Entrega");
  }
  if (!validateSector(descripcion)) {
    setInvalidInput("Descripción");
  }
  if (!validateFiles(fotos)) {
    setInvalidInput("Fotos");
  }
  let validationBox = document.getElementById("val-box");
  let validationMessageElem = document.getElementById("val-msg");
  let validationListElem = document.getElementById("val-list");
  let formContainer = document.querySelector(".main-container");

  if (!isValid) {
    validationListElem.textContent = "";
    // agregar elementos inválidos al elemento val-list.
    for (input of invalidInputs) {
      let listElement = document.createElement("li");
      listElement.innerText = input;
      validationListElem.append(listElement);
    }
  validationMessageElem.innerText = "Los siguientes campos son inválidos:";

    validationBox.style.backgroundColor = "#ffdddd";
    validationBox.style.borderLeftColor = "#f44336";

    validationBox.hidden = false;
  } else {
    // Ocultar el formulario
    form.style.display = "none";

    // establecer mensaje de éxito
    validationMessageElem.innerText = "¿Está seguro que desea agregar este aviso de adopción?";
    validationListElem.textContent = "";

    // aplicar estilos de éxito
    validationBox.style.backgroundColor = "#ddffdd";
    validationBox.style.borderLeftColor = "#0b3975";

    // Agregar botones para enviar el formulario o volver
    let submitButton = document.createElement("button");
    submitButton.innerText = "Sí, estoy seguro";
    submitButton.style.marginRight = "10px";
    submitButton.addEventListener("click", () => {
      validationMessageElem.innerText = "Hemos recibido la información de adopción, muchas gracias y suerte!.";
      validationListElem.textContent = "";

      let volverBtn = document.createElement("button");
      volverBtn.innerText = "Volver a la portada";
      volverBtn.addEventListener("click", () => {
        window.location.href = "portada.html";
      });

    });

    let backButton = document.createElement("button");
    backButton.innerText = "No, no estoy seguro, quiero volver al formulario";
    backButton.addEventListener("click", () => {
      form.style.display = "block";
      validationBox.hidden = true;
    });

    validationListElem.appendChild(submitButton);
    validationListElem.appendChild(backButton);

    // hacer visible el mensaje de validación
    validationBox.hidden = false;

    
  }
};
const form = document.getElementById("formulario-adopcion");


form.addEventListener("submit", (event) => {
  event.preventDefault(); 
  validateForm(); 
});
