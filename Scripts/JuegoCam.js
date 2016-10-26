var velocidad_giro = 8000;
var puntaje_ganar = 500;
var ganado = false;
var contador = 0;
var cantidadInicial = 10;
var delay_nuevo_original = 10000;
var delay_nuevo = delay_nuevo_original;

document.querySelector('a-scene').addEventListener('render-target-loaded', function() {


    //Cargo la camara
    var vid = document.querySelector('#inputVideo');
    cameraSource.start({
        videoElement: vid,
        callback: function() {
            console.log('videoooo')
        }
    });

    //Agrego 10 virus inicialmente
    for (var i = 0; i < cantidadInicial; i++) {
        agregarVirus();
    }

    //Agrego un virus cada 5 segs
    $('#textoNuevoCada').text('Nuevo virus cada: ' + (delay_nuevo / 1000) + 'seg');
    agregarNuevoVirus();
});

function agregarNuevoVirus() {
    if (ganado) return;

    setTimeout(function() {
        if (ganado) return;
        agregarVirus();

        delay_nuevo = delay_nuevo - 100;
        if (delay_nuevo < 1000) {
            delay_nuevo = 1000;
        }
        $('#textoNuevoCada').text('Nuevo virus cada: ' + (delay_nuevo / 1000) + 'seg');
        agregarNuevoVirus();
    }, delay_nuevo);
}

function agregarVirus() {
    contador++;
    $('#textoRestantes').text(contador + " restantes");

    var scale = Math.random() + 1;

    var delta = 15;
    var x = Math.random() * delta * (Math.random() > 0.5 ? 1 : -1);

    var y_min = 1;
    var y = Math.random() * 2;
    y = y_min + y;

    var z = Math.random() * delta * (Math.random() > 0.5 ? 1 : -1);

    var entity = document.createElement('a-entity');
    document.querySelector('a-scene').appendChild(entity);

    entity.setAttribute('collada-model', '#virus');
    entity.setAttribute('scale', scale + ' ' + scale + ' ' + scale);
    entity.setAttribute('position', x + ' ' + y + ' ' + z);



    var animMuerte = document.createElement('a-animation');
    entity.appendChild(animMuerte);
    animMuerte.setAttribute('attribute', 'scale');
    animMuerte.setAttribute('begin', 'click');
    animMuerte.setAttribute('dur', '1000');
    animMuerte.setAttribute('to', '0 0 0');

    var animRotate = document.createElement('a-animation');
    entity.appendChild(animRotate);
    animRotate.setAttribute('attribute', 'rotation');
    animRotate.setAttribute('repeat', 'indefinite');
    animRotate.setAttribute('dur', velocidad_giro);
    animRotate.setAttribute('to', 0 + ' ' + 360 + ' ' + 0);
    animRotate.setAttribute('easing', 'linear');

    entity.addEventListener('click', function() {
        contador = contador - 1;

        //Quito la view
        setTimeout(function() {
            document.querySelector('a-scene').removeChild(entity);
        }, 500);

        actualizarRestantes();

        if (contador == 0) {
            aumentarPuntaje(puntaje_ganar);
            onPartidaGanada();
        }
    });
}

$(function() {

    actualizarPuntaje();
    actualizarCondones();

    //Uso un Condon
    $('#btnCondon').click(function() {
        if (ganado) return;

        if (getCondones() > 0) {
            usarCondon();
            actualizarCondones();

            var virus = $('a-entity');
            var virusMatados = 0;
            $.each(virus, function(index, data) {
                var random = Math.random();
                if (random > 0.3) {
                    $(data).trigger('click');
                    virusMatados = virusMatados + 1;
                }
            });


            delay_nuevo = delay_nuevo_original;
            $('#textoNuevoCada').text('Nuevo virus cada: ' + (delay_nuevo / 1000) + 'seg');

            Materialize.toast('Condon usado. Se eliminaron ' + virusMatados + ' virus', 5000);
        }
    });

    $('#btnJugarDeNuevo').click(function() {
        window.location.href = "JuegoCam.html";
    });

    $('#btnInicio').click(function() {
        window.location.href = "Inicio.html";
    });


$('#dialogoInfo').fadeIn(300);

$('#btnOkInfo').click(function(){
  $('#dialogoInfo').fadeOut(300);

});
});

function actualizarPuntaje() {
    var puntaje = getPuntaje();
    $('#textoPuntaje').text(puntaje);
}

function actualizarRestantes() {
    $('#textoRestantes').text(contador + " restantes");
}

function actualizarCondones() {
    var condones = getCondones();
    $('#btnCondon').text('Usar condon (' + condones + ')');

    if (condones == 0) {
        $('#btnCondon').fadeOut(300);
    } else {
        $('#btnCondon').fadeIn(300);
    }
}

function onPartidaGanada() {
    ganado = true;
    ganarMedalla(Medallas.PrimerJuego);

    $('#dialogoPartidaGanada').fadeIn(300);
}
