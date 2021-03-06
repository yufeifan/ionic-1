// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('donacion', [
  'ionic',
  'ngResource',
  'LocalStorageModule',
  'angular-loading-bar',
  'angular-jwt',
  'ngTouch',
  'ngAnimate',
  'ui.bootstrap',
  'base64',
  'flow',
  'ngVideo',
  'uiGmapgoogle-maps',
  'socialLogin',
  'ngNotify',
  '720kb.socialshare'
  ])

  .run(function (AuthService, ngNotify, $rootScope, $state, $timeout, LoginModal, LogoffService) {

    ngNotify.addTheme('custom', 'light-bootstrap');

    ngNotify.config({
      theme: 'custom',
      position: 'bottom',
      duration: 3000,
      type: 'info',
      sticky: false,
      button: true,
      html: true
    });

    $rootScope.loading = false;

    $rootScope.$on('cfpLoadingBar:started', function () {
      $rootScope.loading = true;
    });

    $rootScope.$on('cfpLoadingBar:completed', function () {
      $rootScope.loading = false;
    });


    $rootScope.$on('event:social-sign-in-success', function(event, userDetails){
      AuthService.loginSocial(userDetails.token, userDetails.provider)
    });

    $rootScope.$on('$stateChangeSuccess', function () {
      $rootScope.title = $state.current.data.title;
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {

      if (toState.data && toState.data.requireLogin) {

        AuthService.isLogged()
          .then(function () {
            $timeout(function () {
              $state.go(toState.name, toParams);
            });
          })
          .catch(function (error) {
            LogoffService.logoff().then(function () {
              LoginModal();
              ngNotify.set("<span class='fa fa-key'></span>&nbsp; " + error, 'warn');
            });
          });
      }
    })
  })

  .config(function($stateProvider, $urlRouterProvider, socialProvider, socialshareConfProvider, $httpProvider, $resourceProvider, cfpLoadingBarProvider, uiGmapGoogleMapApiProvider) {

    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    $httpProvider.interceptors.push('APIInterceptor');

    $resourceProvider.defaults.stripTrailingSlashes = false;

    $urlRouterProvider.otherwise( function($injector) {
      var $state = $injector.get("$state");
      $state.transitionTo("home.inicio");
    });

    cfpLoadingBarProvider.latencyThreshold = 350;

    cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
    cfpLoadingBarProvider.spinnerTemplate = '<span style="width: 100%" class="fa fa-refresh fa-spin fix fa-4x fa-fw"></span>';

    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyBtTbhkqxMoIrLrDxlvUTI-cOCvesNX8zQ',
      v: '3.25',
      libraries: 'weather,geometry,visualization'
    });

    socialProvider.setFbKey({appId: "299809130392810", apiVersion: "v2.7"});

    socialshareConfProvider.configure([
      {
        'provider': 'facebook',
        'conf': {
          'url': 'http://manosxgotas.com.ar',
          'type': 'feed',
          'via': '299809130392810',
          'popupHeight': 1300,
          'popupWidth' : 1000
        }
      }
    ]);

    $stateProvider

      .state('404notfound', {
        cache: false,
        url: "/404nf",
        templateUrl: "templates/404.html",
        data: {
          title: 'Página no encontrada - MxG'
        }
      })

      .state('home', {
        cache: false,
        url: "/",
        abstract: true,
        templateUrl: "templates/home/nav-home.html",
        controller: "NavHomeController"
      })

      .state('home.inicio', {
        cache: false,
        url: "home",
        views: {
          "homeContent": {
            templateUrl: "templates/home/inicio.html"
          }
        },
        data: {
          title: 'Página de inicio - MxG'
        }
      })

      .state('home.sangre', {
        cache: false,
        url: "sangre",
        views: {
          "homeContent": {
            templateUrl: "templates/home/sangre.html"
          }
        },
        data: {
          title: '¿Qué es la sangre? - MxG'
        }
      })

      .state('home.sangre-funcion', {
        cache: false,
        url: "sangre-funcion",
        views: {
          "homeContent": {
            templateUrl: "templates/home/sangre-funcion.html"
          }
        },
        data: {
          title: 'Funciones de la sangre - MxG'
        }
      })

      .state('home.grupos-sanguineos', {
        cache: false,
        url: "grupos-sanguineos",
        views: {
          "homeContent": {
            templateUrl: "templates/home/grupos-sanguineos-info.html"
          }
        },
        data: {
          title: 'Grupos sanguíneos - MxG'
        }
      })

      .state('home.tratamiento-sangre', {
        cache: false,
        url: "tratamiento-sangre",
        views: {
          "homeContent": {
            templateUrl: "templates/home/tratamiento-sangre.html"
          }
        },
        data: {
          title: 'Tratamiento de la sangre - MxG'
        }
      })

      .state('home.quienes-donan', {
        cache: false,
        url: "quienes-donan",
        views: {
          "homeContent": {
            templateUrl: "templates/home/quienes-donan.html"
          }
        },
        data: {
          title: '¿Quiénes pueden donar? - MxG'
        }
      })

      .state('home.donde-donar', {
        cache: false,
        url: "donde-donar",
        views: {
          "homeContent": {
            templateUrl: "templates/home/donde-donar.html",
            controller: "CentrosDonacionController"
          }
        },
        data: {
          title: '¿Dónde donar? - MxG'
        }
      })

      .state('home.recomendaciones', {
        cache: false,
        url: "recomendaciones",
        views: {
          "homeContent": {
            templateUrl: "templates/home/recomendaciones.html",
          }
        },
        data: {
          title: 'Recomendaciones - MxG'
        }
      })

      .state('home.proceso-donacion', {
        cache: false,
        url: "proceso-donacion",
        views: {
          "homeContent": {
            templateUrl: "templates/home/proceso-donacion.html",
          }
        },
        data: {
          title: 'Proceso de donación - MxG'
        }
      })

      .state('home.mitos', {
        cache: false,
        url: "mitos",
        views: {
          "homeContent": {
            templateUrl: "templates/home/mitos.html",
          }
        },
        data: {
          title: 'Mitos sobre la donación de sangre - MxG'
        }
      })

      .state('home.quienes-somos', {
        cache: false,
        url: "quienes-somos",
        views: {
          "homeContent": {
            templateUrl: "templates/home/quienes-somos.html",
          }
        },
        data: {
          title: '¿Quiénes somos? - MxG'
        }
      })

      .state('home.activar-cuenta-clave', {
        cache: false,
        url: "activar-cuenta-clave",
        views: {
          "homeContent": {
            templateUrl: "templates/home/activar-cuenta-clave.html",
            controller: "ActivarCuentaClaveController"
          }
        },
        data: {
          title: 'Activar cuenta - MxG'
        }
      })

      .state('home.activar-cuenta', {
        cache: false,
        url: "activar-cuenta/:token",
        views: {
          "homeContent": {
            templateUrl: "templates/home/activar-cuenta.html",
            controller: "ActivarCuentaController"
          }
        },
        data: {
          title: 'Activar cuenta - MxG'
        }
      })

      .state('home.registro-exito', {
        cache: false,
        url: "registro-exito",
        views: {
          "homeContent": {
            templateUrl: "templates/cuentas/registro-exito.html",
          }
        },
        data: {
          title: 'Registro exitoso - MxG'
        }
      })

      .state('home.reset-pass', {
        cache: false,
        url: "reset-password/:token",
        views: {
          "homeContent": {
            templateUrl: "templates/cuentas/reset-pass.html",
            controller: "ResetPassController"
          }
        },
        data: {
          title: 'Reiniciar contraseña - MxG'
        }
      })

      .state('home.listado-solicitudes', {
        cache: false,
        url: "listado-solicitudes",
        views: {
          "homeContent": {
            templateUrl: "templates/home/solicitudes.html",
            controller: "ListadoSolicitudesController",
          }
        },
        data: {
          title: 'Solicitudes de donación - MxG'
        }
      })

      .state('home.detalle-solicitud', {
        cache: false,
        url: "solicitud/:solicitudID",
        views: {
          "homeContent": {
            templateUrl: "templates/home/detalle-solicitud.html",
            controller: "DetalleSolicitudController",
          }
        },
        data: {
          title: 'Solicitud de donación - MxG'
        }
      })

      .state('dashboard', {
        cache: false,
        url: "/dashboard",
        abstract: true,
        templateUrl: "templates/nav-dashboard.html",
        controller: "NavDashboardController",
        data: {
          requireLogin: true
        }
      })

      .state('dashboard.perfil', {
        cache: false,
        url: "/perfil",
        views: {
          "dashboardContent": {
            templateUrl: "templates/donantes/perfil.html",
            controller: "ProfileController"
          }
        },
        data: {
          title: 'Mi perfil - MxG'
        }
      })

      .state('dashboard.perfil-edit', {
        cache: false,
        url: "/perfil/edit",
        views: {
          "dashboardContent": {
            templateUrl: "templates/donantes/perfil-edit.html",
            controller: "ProfileEditController"
          }
        },
        data: {
          title: 'Edición de perfil - MxG'
        }
      })
      .state('dashboard.solicitudes-donante', {
        cache: false,
        url: "/perfil/solicitudes",
        views: {
          "dashboardContent": {
            templateUrl: "templates/donantes/solicitudes-donante.html",
            controller: "SolicitudesDonanteController"
          }
        },
        data: {
          title: 'Mis solicitudes de donación - MxG'
        }
      })

      .state('dashboard.libreta', {
        cache: false,
        url: "/libreta",
        views: {
          "dashboardContent": {
            templateUrl: "templates/donaciones/libreta-donacion.html",
            controller: "LibretaController"
          }
        },
        data: {
          title: 'Mi libreta de donación - MxG'
        }
      })

      .state('dashboard.registrar-donacion', {
        cache: false,
        url: "/donacion/registro",
        views: {
          "dashboardContent": {
            templateUrl: "templates/donaciones/registrar-donacion.html",
            controller: "RegistrarDonacionController"
          }
        },
        data: {
          title: 'Registrar donación - MxG'
        }
      })

      .state('dashboard.editar-donacion', {
        cache: false,
        url: "/donacion/editar/:donacionID",
        views: {
          "dashboardContent": {
            templateUrl: "templates/donaciones/editar-donacion.html",
            controller: "EditarDonacionController"
          }
        },
        data: {
          title: 'Editar donación - MxG'
        }
      })

      .state('dashboard.listado-eventos', {
        cache: false,
        url: "/listado-eventos",
        views: {
          "dashboardContent": {
            templateUrl: "templates/eventos/listado-eventos.html",
            controller: "EventosController",
          }
        },
        data: {
          title: 'Eventos de donación - MxG'
        }
      })

      .state('dashboard.detalle-evento', {
        cache: false,
        url: "/evento/:eventoID",
        views: {
          "dashboardContent": {
            templateUrl: "templates/eventos/detalle-evento.html",
            controller: "DetalleEventoController",
          }
        },
        data: {
          title: 'Evento de donación - MxG'
        }
      })

      .state('dashboard.listado-centros', {
        cache: false,
        url: "/listado-centros",
        views: {
          "dashboardContent": {
            templateUrl: "templates/centros/listado-centros.html",
            controller: "CentrosDonacionController",
          }
        },
        data: {
          title: 'Centros de donación - MxG'
        }
      })

      .state('dashboard.detalle-centro', {
        cache: false,
        url: "/centro-donacion/:centroID",
        views: {
          "dashboardContent": {
            templateUrl: "templates/centros/detalle-centro.html",
            controller: "DetalleCentroController",
          }
        },
        data: {
          title: 'Centro de donación - MxG'
        }
      })

      .state('dashboard.crear-solicitud', {
        cache: false,
        url: "/crear-solicitud",
        views: {
          "dashboardContent": {
            templateUrl: "templates/solicitudes/crear-solicitud.html",
            controller: "CrearSolicitudDonacionController",
          }
        },
        data: {
          title: 'Crear solicitud de donación - MxG'
        }
      })
      .state('dashboard.detalle-solicitud', {
        cache: false,
        url: "/solicitud/:solicitudID",
        views: {
          "dashboardContent": {
            templateUrl: "templates/solicitudes/detalle-solicitud.html",
            controller: "DetalleSolicitudController",
          }
        },
        data: {
          title: 'Solicitud de donación - MxG'
        }
      })

      .state('dashboard.listado-solicitudes', {
        cache: false,
        url: "/listado-solicitudes",
        views: {
          "dashboardContent": {
            templateUrl: "templates/solicitudes/listado-solicitudes.html",
            controller: "ListadoSolicitudesController",
          }
        },
        data: {
          title: 'Solicitudes de donación - MxG'
        }
      })
  });
