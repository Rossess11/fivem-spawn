/* variables */
var texto1 = "Veo que ya has despertado...Llevabas ahi un buen rato durmiendo. Ya he hecho los papeleos para que puedas quedarte por esta ciudad, no ha sido nada facil... Puedo acercarte si quieres al ayuntamiento para que intentes buscarte un trabajo mientras tanto..."
var texto2 = "Perfecto! Veo que tienes todas las cosas preparadas. Espero que te vaya todo bien por esta ciudad, y ya sabes, intenta no meterte en problemas... Buena suerte amigo......."
var texto3 = "Bueno, veo que te gusta andar, asi haces un poco de ejercicio... Espero que te vaya todo bien por esta ciudad, y ya sabes, intenta no meterte en problemas... Buena suerte amigo......."
var ayunta = false;
/* Funciones */
function maquina(contenedor,texto,intervalo,n){
    var i=0,
     // Creamos el timer
     timer = setInterval(function() {
     if ( i<texto.length ) {
      // Si NO hemos llegado al final del texto..
      // Vamos añadiendo letra por letra y la _ al final.
      $("#"+contenedor).html(texto.substr(0,i++) + "_");
     } else {
      // En caso contrario..
      // Salimos del Timer y quitamos la barra baja (_)
      clearInterval(timer);
      $("#"+contenedor).html(texto);
      // Auto invocamos la rutina n veces (0 para infinito)
      if ( --n!=0 ) {
       setTimeout(function() {
        maquina(contenedor,texto,intervalo,n);
       },3600);
      }
     }
    },intervalo);
};

function fadeIn(el, time) {
	el.style.opacity = 0;
  
	var last = +new Date();
	var tick = function() {
	  el.style.opacity = +el.style.opacity + (new Date() - last) / time;
	  last = +new Date();
  
	  if (+el.style.opacity < 1) {
		(window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
	  }
	};
  
	tick();
}


/* Window listener */

    window.addEventListener('message',function (event){

        if(event.data.type == "hablar"){    
            this.document.getElementById('chat-container-title').style.display = 'flex';
            this.document.getElementById('chat-container').style.display = 'flex';
            var el = document.getElementById('chat-container-title');
            var al = document.getElementById('chat-container');
            fadeIn(el, 1500);
            fadeIn(al, 1500);
            setTimeout(function() {
                maquina("chat-container",texto1,100,1);
            },2000)
            setTimeout(function() {
                document.getElementById('afirmativo').style.display = 'flex';
                document.getElementById('negativo').style.display = 'flex';
                var l1 = document.getElementById('afirmativo');
                var l2 = document.getElementById('negativo');
                fadeIn(l1, 1000);
                fadeIn(l2, 1000);
            },29000)
        }
    });

$(function() {
    $("#afirmativo").click(function() {
		ayunta = true;
        document.getElementById('afirmativo').style.opacity = '0';
        document.getElementById('negativo').style.opacity = '0';
        setTimeout(function() {
            document.getElementById('afirmativo').style.display = 'none';
            document.getElementById('negativo').style.display = 'none';
        },1100)
        maquina("chat-container",texto2,100,1);
        setTimeout(function() {
            document.getElementById('chat-container').style.opacity = '0';
            document.getElementById('chat-container-title').style.opacity = '0';
            setTimeout(function() {
                document.getElementById('chat-container').style.display = 'none';
                document.getElementById('chat-container-title').style.display = 'none';
                $.post('http://ros_spawn/closeAfirmativo', JSON.stringify({
                    action: true
                }));
            },2000)
        },20000)
    });

    $("#negativo").click(function() {
        document.getElementById('afirmativo').style.opacity = '0';
        document.getElementById('negativo').style.opacity = '0';
        setTimeout(function() {
            document.getElementById('afirmativo').style.display = 'none';
            document.getElementById('negativo').style.display = 'none';
        },1100)
        maquina("chat-container",texto3,100,1);
        setTimeout(function() {
            document.getElementById('chat-container').style.opacity = '0';
            document.getElementById('chat-container-title').style.opacity = '0';
            setTimeout(function() {
                document.getElementById('chat-container').style.display = 'none';
                document.getElementById('chat-container-title').style.display = 'none';
                $.post('http://ros_spawn/closeNegativo', JSON.stringify({
                    action: true
                }));
            },2000)
        },20000)
    });
});