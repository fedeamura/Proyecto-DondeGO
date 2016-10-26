  var Medallas = {
    PrimerJuego: 1,
    PrimerCondon: 2,
    PrimerTest: 3
}

var listadoMedallas = [{
    Id: Medallas.PrimerJuego,
    Nombre: 'Primer juego ganado',
    Detalle: 'Ganaste tu primer juego.',
    Puntaje: 1000
}, {
    Id: Medallas.PrimerCondon,
    Nombre: 'Primer condon obtenido',
    Detalle: 'Obtuviste tu primer condon.',
    Puntaje: 1000
}, {
    Id: Medallas.PrimerTest,
    Nombre: 'Primer test realizado',
    Detalle: 'Te realizaste tu primer test.',
    Puntaje: 2000
}];


function getMedallasGanadas() {
    var medallas = localStorage.getItem('medallas');
    if (medallas == undefined) {
        medallas = [];
    } else {
        medallas = JSON.parse(medallas);
    }
    return medallas;
}

function ganarMedalla(id) {
    var misMedallas = getMedallasGanadas();

    var yaLaTengo = false;
    $.each(misMedallas, function(index, data) {
        if (data.Id == id) {
            yaLaTengo = true;
        }
    });

    if (yaLaTengo) return;


    var medalla;
    $.each(listadoMedallas, function(index, data) {
        if (data.Id == id) {
            medalla = data;
        }
    });

    if (medalla == undefined) return;

    misMedallas.push(medalla);
    localStorage.setItem('medallas', JSON.stringify(misMedallas));

    aumentarPuntaje(medalla.Puntaje);
}

function getPuntaje() {
    var puntaje = localStorage.getItem('puntaje');
    if (puntaje == undefined) {
        puntaje = 0;
    } else {
        puntaje = parseInt(puntaje);
    }
    return puntaje;
}

function aumentarPuntaje(puntaje) {
    var miPuntaje = getPuntaje();
    miPuntaje = miPuntaje + puntaje;
    localStorage.setItem('puntaje', miPuntaje);
}

function getCondones() {
    var condones = localStorage.getItem('condones');
    if (condones == undefined) {
        condones = 0;
    } else {
        condones = parseInt(condones);
    }
    return condones;
}

function ganarCondon() {
    var condones = getCondones() + 1;
    localStorage.setItem('condones', condones);

    ganarMedalla(Medallas.PrimerCondon);
    return condones;
}

function usarCondon() {
    var condones = getCondones();
    if (condones > 0) {
        condones = condones - 1;
        localStorage.setItem('condones', condones);
    }
    return condones;
}
