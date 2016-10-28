  var Medallas = {
      PrimerJuego: 1,
      PrimerCondon: 2,
      PrimerTest: 3,
      PrimerVacunatorio: 4,
      PrimerInfo: 5
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
  }, {
      Id: Medallas.PrimerVacunatorio,
      Nombre: 'Primer vacunatorio visitado',
      Detalle: 'Fuiste a tu primer vacunatorio.',
      Puntaje: 2000
  }, {
      Id: Medallas.PrimerInfo,
      Nombre: 'Primer informacion escaneada',
      Detalle: 'Escaneaste informacion.',
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

  function getMedallasNoGanadas() {
      var medallasGanadas = getMedallasGanadas();
      var medallasNoGanadas = [];

      $.each(listadoMedallas, function(index, medalla) {
          var medallaGanada = false;
          $.each(medallasGanadas, function(index2, medalla2) {
              if (medalla2.Id == medalla.Id) {
                  medallaGanada = true;
              }
          });

          if (!medallaGanada) {
              medallasNoGanadas.push(medalla);
          }

      });

      return medallasNoGanadas;
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

  function ganarCondones(cantidad) {
      var condones = getCondones() + cantidad;
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

  var rad = function(x) {
      return x * Math.PI / 180;
  };

  function calcularDistancia(p1, p2) {
      var R = 6378137; // Earth’s mean radius in meter
      var dLat = rad(p2.lat() - p1.lat());
      var dLong = rad(p2.lng() - p1.lng());
      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
          Math.sin(dLong / 2) * Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d;
  };
