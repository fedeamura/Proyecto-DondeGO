var map;


$(function() {
    initMenu();

    //Puntaje
    $('#textoPuntaje').text(getPuntaje() + " puntos");

    //condones
    $('#textoCondones').text(getCondones() + " condones");

    //Medallas
    var medallasGanadas = getMedallasGanadas();
    $.each(medallasGanadas, function(index, medalla) {
        agregarMedalla(medalla, true);
    });

    var medallasNoGanadas = getMedallasNoGanadas();
    $.each(medallasNoGanadas, function(index, medalla) {
        agregarMedalla(medalla, false);
    });

});

function agregarMedalla(medalla, ganada) {
    var icono = $('<div>');
    $(icono).addClass('icono');

    var titulo = $('<label>');
    $(titulo).addClass('titulo');
    $(titulo).text(medalla.Nombre);

    var puntos = $('<label>');
    $(puntos).addClass('detalle');
    $(puntos).text(medalla.Puntaje + ' puntos');

    var textos = $('<div>');
    $(textos).addClass('textos');
    $(textos).append(titulo);
    $(textos).append(puntos);

    var item = $('<div>');
    $(item).addClass('collection-item');
    if (ganada) {
        $(item).addClass('ganada');
    }
    $(item).append(icono);
    $(item).append(textos);

    $('#listadoMedallas').append(item);

    $(item).click(function() {
        mostrarDialogo(medalla.Detalle,
            function() {
                $('#dialogo').fadeOut(300);
            },
            function() {
                $('#dialogo').fadeOut(300);
            });
    });
}

function initMenu() {
    $(".button-collapse").sideNav();
}

function mostrarDialogo(texto, callback, callbackCancelar) {
    $('#textoDialogo').text(texto);

    $('#btnOkDialogo').unbind('click');
    $('#btnOkDialogo').click(function() {
        callback();
    });

    $('#dialogo').fadeIn(300);
}
