function checkRut(rut) {
    // Despejar Puntos
    var valor = rut.value.replace('.','');
    // Despejar Guión
    valor = valor.replace('-','');
    
    // Aislar Cuerpo y Dígito Verificador
    cuerpo = valor.slice(0,-1);
    dv = valor.slice(-1).toUpperCase();
    
    // Formatear RUN
    rut.value = cuerpo + '-'+ dv
    
    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if(cuerpo.length < 7) { rut.setCustomValidity("RUT Incompleto"); return false;}
    
    // Calcular Dígito Verificador
    suma = 0;
    multiplo = 2;
    
    // Para cada dígito del Cuerpo
    for(i=1;i<=cuerpo.length;i++) {
    
        // Obtener su Producto con el Múltiplo Correspondiente
        index = multiplo * valor.charAt(cuerpo.length - i);
        
        // Sumar al Contador General
        suma = suma + index;
        
        // Consolidar Múltiplo dentro del rango [2,7]
        if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
  
    }
    
    // Calcular Dígito Verificador en base al Módulo 11
    dvEsperado = 11 - (suma % 11);
    
    // Casos Especiales (0 y K)
    dv = (dv == 'K')?10:dv;
    dv = (dv == 0)?11:dv;
    
    // Validar que el Cuerpo coincide con su Dígito Verificador
    if(dvEsperado != dv) { rut.setCustomValidity("RUT Inválido"); return false; }
    
    // Si todo sale bien, eliminar errores (decretar que es válido)
    rut.setCustomValidity('');
}

function agregarUsuario() {

    var usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    let modificar;

    indexRUT = document.getElementById("rut").value;
    
    usuarios.forEach(function (usuario, index){
        if (indexRUT == usuario.rut) {
            usuarios[index].rut = document.getElementById("rut").value;
            usuarios[index].nombre = document.getElementById("nombre").value;
            usuarios[index].apellidos = document.getElementById("apellidos").value;
            usuarios[index].direccion = document.getElementById("direccion").value;
            usuarios[index].ciudad = document.getElementById("ciudad").value;
            usuarios[index].telefono = document.getElementById("telefono").value;
            usuarios[index].email = document.getElementById("email").value;
            usuarios[index].fechaNacimiento = document.getElementById("fechaNacimiento").value;
            usuarios[index].estadoCivil = document.getElementById("estadoCivil").value;
            usuarios[index].comentario = document.getElementById("comentario").value;

            if (confirm("Este rut ya está registrado. ¿Desea sobreescribir?") == true) {
                localStorage.setItem("usuarios", JSON.stringify(usuarios));
                console.log("Se sobreescribió");
                modificar = true;
                return modificar;
            }
            else{
                console.log("No se sobreescribió nada");  
                modificar = true;   
                return;
            }        
        }
    })

    var usuario = {
        rut: document.getElementById("rut").value,
        nombre: document.getElementById("nombre").value,
        apellidos: document.getElementById("apellidos").value,
        direccion: document.getElementById("direccion").value,
        ciudad: document.getElementById("ciudad").value,
        telefono: document.getElementById("telefono").value,
        email: document.getElementById("email").value,
        fechaNacimiento: document.getElementById("fechaNacimiento").value,
        estadoCivil: document.getElementById("estadoCivil").value,
        comentario: document.getElementById("comentario").value,  
    };
if (modificar == true) {
    return; 
}
else{
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    console.log("Se agregó algo nuevo a la lista");
    return;
}
}

function buscarUsuario(){
    var usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    indexApellido = document.getElementById("apellidos").value

    usuarios.forEach(function (usuario, index){
        if (indexApellido == usuario.apellidos) {
            usrRUT = usuario.rut,
            usrNombre = usuario.nombre,
            usrApellido = usuario.apellidos,
            usrDireccion = usuario.direccion,
            usrCiudad = usuario.ciudad,
            usrTelefono = usuario.telefono,
            usrEmail = usuario.email,
            usrFechaNac = usuario.fechaNacimiento,
            usrEstCivil = usuario.estadoCivil,
            usrComentario = usuario.comentario;

            let contenedorUsuario = document.createElement("ul");

            let rutUsuario = document.createElement("li");
            rutUsuario.innerText = usrRUT;

            let nombreUsuario = document.createElement("li");
            nombreUsuario.innerText = usrNombre;

            let apellidoUsuario = document.createElement("li");
            apellidoUsuario.innerText = usrApellido;

            let direccionUsuario = document.createElement("li");
            direccionUsuario.innerText = usrDireccion;

            let ciudadUsuario = document.createElement("li");
            ciudadUsuario.innerText = usrCiudad;
            
            let telefonoUsuario = document.createElement("li");
            telefonoUsuario.innerText = usrTelefono;

            let emailUsuario = document.createElement("li");
            emailUsuario.innerText = usrEmail;

            let fechaNacUsuario = document.createElement("li");
            fechaNacUsuario.innerText = usrFechaNac;

            let estadoCivilUsuario = document.createElement("li");
            estadoCivilUsuario.innerText = usrEstCivil;

            let comentarioUsuario = document.createElement("li");
            comentarioUsuario.innerText = usrComentario;
            
            contenedorUsuario.appendChild(rutUsuario);
            contenedorUsuario.appendChild(nombreUsuario);
            contenedorUsuario.appendChild(apellidoUsuario);
            contenedorUsuario.appendChild(direccionUsuario);
            contenedorUsuario.appendChild(ciudadUsuario);
            contenedorUsuario.appendChild(telefonoUsuario);
            contenedorUsuario.appendChild(emailUsuario);
            contenedorUsuario.appendChild(fechaNacUsuario);
            contenedorUsuario.appendChild(estadoCivilUsuario);
            contenedorUsuario.appendChild(comentarioUsuario);
            document.getElementById("usuarios").insertAdjacentElement("afterbegin", contenedorUsuario);
        }
    });
}


function listar() {
    var usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    console.log(JSON.stringify(usuarios));
}

function borrarStorage() {
    window.localStorage.clear();
    location.reload(true);
}
