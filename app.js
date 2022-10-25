function validaRut(campo){
	if ( campo.length == 0 ){ return false; }
	if ( campo.length < 8 ){ return false; }

	campo = campo.replace('-','')
	campo = campo.replace(/\./g,'')

    if ( campo.length > 9 ){ return false; }

	var suma = 0;
	var caracteres = "1234567890kK";
	var contador = 0;    
	for (var i=0; i < campo.length; i++){
		u = campo.substring(i, i + 1);
		if (caracteres.indexOf(u) != -1)
		contador ++;
	}
	if ( contador==0 ) { return false }
	
	var rut = campo.substring(0,campo.length-1)
	var drut = campo.substring( campo.length-1 )
	var dvr = '0';
	var mul = 2;
	
	for (i= rut.length -1 ; i >= 0; i--) {
		suma = suma + rut.charAt(i) * mul
                if (mul == 7) 	mul = 2
		        else	mul++
	}
	res = suma % 11
	if (res==1)		dvr = 'k'
                else if (res==0) dvr = '0'
	else {
		dvi = 11-res
		dvr = dvi + ""
	}
	if ( dvr != drut.toLowerCase() ) { return false; }
	else { return true; }
}

jQuery.validator.addMethod("rut", function(value, element) { 
    return this.optional(element) || validaRut(value); 
}, "Revise el RUT");

$("#form").validate({
    rules: {
        nombre: {
            required: true,
            maxlength: 100
        },
        apellidos: {
            required: true,
            maxlength: 50
        },
        rut: {
            required: true,
            rut: true
        },
        direccion: {
            required: true,
            maxlength: 100
        },
        ciudad:{
            required: true,
            maxlength: 30
        },
        telefono:{
            required: true,
            number: true,
            minlength: 7,
            maxlength: 15
        },
        email:{
            required: true,
            maxlength: 50,
            email: true
        },
        fechaNacimiento:{
            required: true,
            maxlength: 10
        },
        estadoCivil:{
            required: true
        },
        comentario:{
            required: true,
            minlength: 3,
            maxlength: 250
        }
    },
    messages : { 
        rut : { 
            required:'Escriba el rut', 
            rut:'Rut inválido.'} }
})

$("#submit").click(function() {
    if($("form").valid() == false){
        
        return;
    }
    let nombre = $("#nombre").val()
    let apellidos = $("#apellidos").val()
    let rut = $("#rut").val()
    let direccion = $("#direccion").val()
    let ciudad = $("#ciudad").val()
    let telefono = $("#telefono").val()
    let email = $("#email").val()
    let fechaNacimiento = $("#fechaNacimiento").val()
    let estadoCivil = $("#estadoCivil").val()
    let comentario = $("#comentario").val()

    var usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    let modificar;

    usuarios.forEach(function (usuario, index){
        if (rut == usuario.rut) {
            usuarios[index].rut = rut;
            usuarios[index].nombre = nombre;
            usuarios[index].apellidos = apellidos;
            usuarios[index].direccion = direccion;
            usuarios[index].ciudad = ciudad;
            usuarios[index].telefono = telefono;
            usuarios[index].email = email;
            usuarios[index].fechaNacimiento = fechaNacimiento;
            usuarios[index].estadoCivil = estadoCivil;
            usuarios[index].comentario = comentario;

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
    });

        var usuario = {
            rut: rut,
            nombre: nombre,
            apellidos: apellidos,
            direccion: direccion,
            ciudad: ciudad,
            telefono: telefono,
            email: email,
            fechaNacimiento: fechaNacimiento,
            estadoCivil: estadoCivil,
            comentario: comentario,  
        };
        if (modificar == true) {
            return; 
        }
        else{
            usuarios.push(usuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            alert("Se ha añadido el registro.");
            return;
        }
});

function listar() {
    var usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
    console.log(JSON.stringify(usuarios));
}

function borrarStorage() {
    window.localStorage.clear();
    location.reload(true);
}

$("#formBusqueda").validate({
    rules: {
        apellidos: {
            required: true,
            maxlength: 50
        }
    }
})

$("#btnBuscar").click(function() {
    if($("#formBusqueda").valid() == false){
        return;
    }
    let apellidos = $("#apellidos").val()

    var usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    usuarios.forEach(function (usuario, index){
        if (apellidos == usuario.apellidos) {
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
            rutUsuario.innerText = "Rut: " + usrRUT;

            let nombreUsuario = document.createElement("li");
            nombreUsuario.innerText ="Nombres: " + usrNombre;

            let apellidoUsuario = document.createElement("li");
            apellidoUsuario.innerText ="Apellidos: " + usrApellido;

            let direccionUsuario = document.createElement("li");
            direccionUsuario.innerText ="Dirección: " + usrDireccion;

            let ciudadUsuario = document.createElement("li");
            ciudadUsuario.innerText ="Ciudad: " + usrCiudad;
            
            let telefonoUsuario = document.createElement("li");
            telefonoUsuario.innerText ="Teléfono: " + usrTelefono;

            let emailUsuario = document.createElement("li");
            emailUsuario.innerText ="E-Mail: " + usrEmail;

            let fechaNacUsuario = document.createElement("li");
            fechaNacUsuario.innerText ="Fecha de Nacimiento: " + usrFechaNac;

            let estadoCivilUsuario = document.createElement("li");
            estadoCivilUsuario.innerText ="Estado Civil: " + usrEstCivil;

            let comentarioUsuario = document.createElement("li");
            comentarioUsuario.innerText ="Comentarios: " + usrComentario;
            
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
    return false;
});