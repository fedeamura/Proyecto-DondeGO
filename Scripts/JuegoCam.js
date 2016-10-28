var velocidad_giro = 8000;
var puntaje_ganar = 500;
var ganado = false;
var contador = 0;
var cantidadInicial = 10;
var delay_nuevo_original = 10000;
var delay_nuevo = delay_nuevo_original;

var cams = [];
var index_camActual;

document.querySelector('a-scene').addEventListener('render-target-loaded', function() {

    //Agrego 10 virus inicialmente
    for (var i = 0; i < cantidadInicial; i++) {
        agregarVirus();
    }

    //Agrego un virus cada 5 segs
    $('#textoNuevoCada').text('Nuevo virus cada: ' + (delay_nuevo / 1000) + 'seg');
    agregarNuevoVirus();
});

function verVideo(cam) {
    var constraints = {
        audio: false,
        video: {
            deviceId: cam.deviceId
        }
    };

    var vid = document.querySelector('#inputVideo');

    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(mediaStream) {
            vid.srcObject = mediaStream;
            vid.onloadedmetadata = function(e) {
                vid.play();
            };
        })
        .catch(function(err) {
            console.log(err.name + ": " + err.message);
        });
}

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

    //Cargo la camara
    $('#btnFlip').click({
        if (cams.length == 0) {
            Materialize.toast('No tiene mas camaras', 5000);
            return;
        }

        Materialize.toast('Cambiando camara', 5000);

        index_camActual++;
        if (index_camActual >= cams.length) {
            index_camActual = 0;
        }

        verVideo(cams[index_camActual]);
    });

    navigator.mediaDevices.enumerateDevices()
        .then(gotDevices);


    function gotDevices(deviceInfos) {
        for (var i = 0; i !== deviceInfos.length; ++i) {
            var deviceInfo = deviceInfos[i];

            if (deviceInfo.kind === 'videoinput') {
                cams.push(deviceInfo);
            }
        }

        index_camActual = 1;
        verVideo(cams[index_camActual]);
    }

    //mostrarDialogoInfo('¡Cuidado! Te estan atacando los virus del hiv. Para combatirlos haz click sobre ellos y desapareceran. Pero ten cuidado... cuando mas tiempo pase apareceran mas virus y ademas, mas rapidamente. Usando un condon podrás evitar la infeccion',
    //      function() {
    //        $('#dialogoInfo').fadeOut(300);
    //    },
    //    function() {
    //          window.location.href = "https://es.wikipedia.org/wiki/Virus_de_la_inmunodeficiencia_humana";
    //    });
});

function mostrarDialogoInfo(texto, callback, callbackInfo) {

    $('#textoDialogo').text(texto);

    $('#btnMasDialogo').unbind('click');
    $('#btnMasDialogo').click(function() {
        callbackInfo();
    });

    $('#btnOkDialogo').unbind('click');
    $('#btnOkDialogo').click(function() {
        callback();
    });

    $('#dialogoInfo').fadeIn(300);

}

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
