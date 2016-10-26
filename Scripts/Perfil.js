var map;


$(function() {
    initMenu();

    //Puntaje
    $('#textoPuntaje').text(getPuntaje() + " puntos");

    //condones
    $('#textoCondones').text(getCondones() + " condones");

    //Medallas
    var misMedallas = getMedallasGanadas();
    $.each(misMedallas, function(index, medalla) {
        var html = '<a class="collection-item">' + medalla.Nombre + ' (' + medalla.Puntaje + ' puntos)' + '</a>';
        $('#listadoMedallas').append(html);
    });
});

function initMenu() {
    $(".button-collapse").sideNav();
}
