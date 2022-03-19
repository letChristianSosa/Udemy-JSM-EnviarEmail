// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

//Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners(){
     document.addEventListener('DOMContentLoaded', deshabilitarBtn(btnEnviar));

     // Campos del formulario
     email.addEventListener('blur', validarFormulario);
     asunto.addEventListener('blur', validarFormulario);
     mensaje.addEventListener('blur', validarFormulario);

     // Reinicia el formulario
     btnReset.addEventListener('click', resetearFormulario);

     formulario.addEventListener('submit', enviarEmail);
};



// Funciones

function deshabilitarBtn(boton){
     boton.disabled = true;
     boton.classList.add('cursor-not-allowed', 'opacity-50');     
};

function habilitarBtn(boton){
     boton.disabled = false;
     boton.classList.remove('cursor-not-allowed', 'opacity-50');     
};

// Valida el formulario

function validarFormulario(e){
     if(e.target.value.length > 0){
          
          // Elimina los errores... 
          const error = document.querySelector('p.error');
          if(error)
          error.remove();

          e.target.classList.remove('border', 'border-red-500');
          e.target.classList.add('border', 'border-green-500');
     }else{
          e.target.classList.remove('border', 'border-green-500');
          e.target.classList.add('border', 'border-red-500');
          mostrarError('Todos los campos son obligatorios');
     }

     if(e.target.type === 'email'){          
          if(er.test( e.target.value )){
               const error = document.querySelector('p.error');
               if(error)
               error.remove();

               e.target.classList.remove('border', 'border-red-500');
               e.target.classList.add('border', 'border-green-500');
          }else{
               e.target.classList.remove('border', 'border-green-500');
               e.target.classList.add('border', 'border-red-500');
               mostrarError('Email no valido');
          }
     }

     if(er.test( email.value ) && asunto.value !== '' && mensaje.value !== ''){
          habilitarBtn(btnEnviar);
     }
}

function mostrarError(mensaje){
     const mensajeError = document.createElement('p');
     mensajeError.textContent = mensaje;
     mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

     const errores = document.querySelectorAll('.error');
     if(errores.length === 0){
          formulario.appendChild(mensajeError);
     }
};

// Envia el email
function enviarEmail(e){
     e.preventDefault();

     const spinner = document.querySelector('#Parentspinner');
     spinner.style.display = 'flex';
     
     deshabilitarBtn(btnEnviar);
     deshabilitarBtn(btnReset);
     // Despues de 3 segundos ocultar el spinner y mostrar el mensaje;

     setTimeout( () => {
          spinner.style.display = 'none';
          
          //Mensaje que dice que se envio correctamente
          const parrafo = document.createElement('p');
          parrafo.textContent = 'Enviado correctamente';
          parrafo.classList.add('text-center','my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');
          formulario.insertBefore(parrafo, spinner);

          setTimeout(() => {
               parrafo.remove();
               resetearFormulario();
          }, 5000)
     }, 3000)
};

// Function que resetea el formulario

function resetearFormulario(){
     document.querySelectorAll('.border').forEach(campo => campo.classList.remove('border', 'border-green-500'));
     habilitarBtn(btnReset);
     deshabilitarBtn(btnEnviar);
     formulario.reset();
     const error = document.querySelector('p.error');
               if(error)
               error.remove();
}