var map;

$(function() {
    initMenu();

    $('#btnCheckIn').click(function() {
        if (isCheckInCondon()) {
            ganarCondon();

            $('#dialogo').fadeIn(300);
            $('#textoDialogo').text('Condones gratis.');
            return;
        }

        if (isCheckInTest()) {
            ganarMedalla(Medallas.PrimerTest);

            $('#dialogo').fadeIn(300);
            $('#textoDialogo').text('Test de HIV. Aqui podras realizarte un test HIV. Etc etc ect');
            return;
        }
    });

    $('#btnOkDialogo').click(function() {
        $('#dialogo').fadeOut(300);

    });
});

function initMenu() {
    $(".button-collapse").sideNav();
}

function isCheckInCondon() {
    return false;
}

function isCheckInTest() {
    return true;
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 15
    });

    var primeraVez = true;
    obtenerUbicacionActual(
        function(pos) {

            if (primeraVez) {
                primeraVez = false;
                map.setCenter(pos);
                cargarDatos();
            }
        },
        function() {
            alert('Error obteniendo la ubicacion actual');
        });
}

var marcadorUbicacion;

function obtenerUbicacionActual(callback, callbackError) {
    // Try HTML5 geolocation.
    if (!navigator.geolocation) {
        handleLocationError(false, infoWindow, map.getCenter());
        return;
    }


    navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        if (marcadorUbicacion != undefined) {
            marcadorUbicacion.setPosition(pos);
        } else {
            marcadorUbicacion = agregarMarcador(pos, 'Ubicacion actual');
            marcadorUbicacion.addListener('click', function() {
                map.setCenter(marcadorUbicacion.getPosition());
                Materialize.toast('Esta es tu ubicacion actual', 5000);
            });
        }

        callback(pos);
        setTimeout(function() {
            obtenerUbicacionActual(callback, callbackError);
        }, 500);
    }, function() {
        callbackError();
    });
}

function agregarMarcador(pos, titulo) {
    return new google.maps.Marker({
        position: pos,
        map: map,
        title: titulo
    });
}

function cargarDatos() {
    var marcadores = [];
}
