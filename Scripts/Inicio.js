var map;

$(function() {
    initMenu();

    $('#btnCheckIn').click(function() {
        if (isCheckInCondon()) {

            var condones_minimos = 1;
            var random = Math.floor(Math.random() * 5);
            var condones = condones_minimos + random;

            ganarCondones(condones);

            $('#dialogo').fadeIn(300);
            $('#textoDialogo').text('¡Felicidades! Ganaste ' + condones + ' condones. El condon es una funda muy fina y elástica, hecha de látex u otra materia similar, con que se cubre el pene al realizar el coito. Sirve para impedir que la mujer quede embarazada y para prevenir el contagio de enfermedades de transmisión sexual.');
            return;
        }

        if (isCheckInTest()) {
            ganarMedalla(Medallas.PrimerTest);

            $('#dialogo').fadeIn(300);
            $('#textoDialogo').text('Test de HIV. Aqui podras realizarte un test HIV. El Test de VIH, es rápido, gratuito y confidencial. ');
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
    return true;
}

function isCheckInTest() {
    return false;
}

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 15
    });

    var pos = {
        lat: -34.570476,
        lng: -58.423312
    };

    map.setCenter(pos);
    cargarDatos();

    // var primeraVez = true;
    // obtenerUbicacionActual(
    //     function(pos) {
    //
    //         if (primeraVez) {
    //             primeraVez = false;
    //             map.setCenter(pos);
    //             cargarDatos();
    //         }
    //     },
    //     function(err) {
    //         alert('Error obteniendo la ubicacion actual. ' + err);
    //     });
}

// var marcadorUbicacion;
//
// function obtenerUbicacionActual(callback, callbackError) {
//     // Try HTML5 geolocation.
//     if (!navigator.geolocation) {
//         callbackError('Navegador no soportado.');
//         return;
//     }
//
//     var options = {
//         enableHighAccuracy: true,
//         timeout: 30000,
//         maximumAge: 0
//     };
//
//     navigator.geolocation.getCurrentPosition(
//         function(position) {
//             var pos = {
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude
//             };
//
//             if (marcadorUbicacion != undefined) {
//                 marcadorUbicacion.setPosition(pos);
//             } else {
//                 marcadorUbicacion = agregarMarcador(pos, 'Ubicacion actual');
//                 marcadorUbicacion.addListener('click', function() {
//                     map.setCenter(marcadorUbicacion.getPosition());
//                     Materialize.toast('Esta es tu ubicacion actual', 5000);
//                 });
//             }
//
//             callback(pos);
//             setTimeout(function() {
//                 obtenerUbicacionActual(callback, callbackError);
//             }, 500);
//         },
//         function(err) {
//             callbackError(err.code);
//         }, options);
// }

function agregarMarcador(pos, titulo, onclick) {
    var marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: titulo
    });

    marker.addListener('click', function() {
        Materialize.toast(titulo, 5000);
    });

}

function cargarDatos() {
    var marcadores = [];

    var urlDonde = "https://donde.huesped.org.ar/api/campus/places/22072";
    $.ajax({
        url: urlDonde,
        success: function(result) {

            $.each(result, function(index, data) {
                var pos = {
                    lat: parseFloat(data.latitude),
                    lng: parseFloat(data.longitude)
                };

                var tipo;
                if (data.infectologia == 1) {
                    tipo = "Infectologia";
                }
                if (data.vacunatorio == 1) {
                    tipo = "Vacunatorio";
                }

                if (data.condones == 1) {
                    tipo = "Condones";
                }

                if (data.prueba == 1) {
                    tipo = "Test HIV";
                }


                agregarMarcador(pos, tipo + ": " + data.establecimiento);
            })
        },
        error: function(result) {
            alert(JSON.stringify(result));
        }
    })

}
