angular.module('habApp', ['sunData', 'cameraDisplay']);

if (typeof angular !== 'undefined') {
  angular.module('sunData', ['ngResource'])

    // Update Sun ephem data.
    .controller('sunCtl', ['$interval', '$scope', 'sunGetDataFactory', function ($interval, $scope, sunGetDataFactory) {

      function sunUpdateData() {
        sunGetDataFactory.get(function (data) {
          if (data && data.sunData) {
            $scope.sunrise = moment(data.sunData.sunrise).format('HH:mm:ss');
            $scope.solar_noon = moment(data.sunData.solar_noon).format('HH:mm:ss');
            $scope.sunset = moment(data.sunData.sunset).format('HH:mm:ss');
            $scope.altitude = data.sunData.altitude;
            $scope.azimuth = data.sunData.azimuth;
          }
        });
      }
      sunUpdateData();
      $interval(sunUpdateData, 60000);
    }])

    // Retrieve Sun ephem data from python published endpoint
    .factory('sunGetDataFactory', ['$resource', function ($resource) {
      return $resource('http://DOMAIN/cgi/sol.py',
        {
          form: 'json'
        },
        {
          get: {
            method: 'GET',
            isArray: false
          }
        }
      );
    }]);

  // Module to handle camera functionality.
  angular.module('cameraDisplay', [])

    // Control functions for camera cycling.
    .controller('cameraCycleCtl', ['$rootScope', '$scope', function ($rootScope, $scope) {

      // Click handlers for camera control.
      $scope.cameraCycleToggle = function cameraCycleToggle() {
        console.log('toggle');
        $rootScope.$broadcast('cycleCameraToggle');
      }

      $scope.cameraNextBtn = function cameraNextBtn() {
        console.log('Next button');
        $rootScope.$broadcast('nextCamera');
      }

    }])

    // Automatic or triggered camera cycling.
    // TODO: Rewrite as directive.
    .controller('cameraDisplayCtl', ['$interval', '$rootScope', '$scope', 'getCameraDataFactory', function ($interval, $rootScope, $scope, getCameraDataFactory) {
      $scope.i = 0;
      $scope.cycle = true;

      // Listen for cycle on/off events.
      $rootScope.$on('cycleCameraToggle', function(event) {
        if ($scope.cycle) {
          $scope.cycle = false;
          $scope.stop();
        }
        else {
          $scope.cycle = true;
          $scope.start();
        }
      });

      $rootScope.$on('prevCamera', function(event) {
        $scope.stop();
        $scope.prevCamera();
      });

      $rootScope.$on('nextCamera', function(event) {
        $scope.stop();
        $scope.nextCamera();
      });

      getCameraDataFactory.get().$promise
        .then(function(cameras) {
          if (cameras.length > 1) {

            var promise;

            // Show the cycle/next/prev controls.
            $scope.showCameraCtls = true;

            // Advance to next camera.
            $scope.nextCamera = function nextCamera() {
              console.log('next');
              $scope.i++;
              if ($scope.i == cameras.length) {
                $scope.i = 0;
              }
              $scope.showCamera($scope.i);
            }

            // Return to the previous camera.
            $scope.prevCamera = function prevCamera() {
            }

            $scope.start = function intervalStart() {
              // Stop any running $interval.
              $scope.stop();
              // Begin interval and return promise object.
              promise = $interval($scope.nextCamera, 5000);
            }

            // Stop $interval.
            $scope.stop = function intervalStop() {
              $interval.cancel(promise);
            }

            // Start the interval.
            $scope.start();

            // Clear intervals when $scope is destroyed.
            $scope.$on('$destroy', function destroyListener() {
              $scope.stop()
            });

            // Cycle through cameras.
            function switchCamera() {
              $scope.showCamera($scope.i);
              $scope.i++;
              if ($scope.i == cameras.length) {
                $scope.i = 0;
              }
            }

          }
          else if (cameras.length == 1) {
            // Show the cycle/next/prev controls.
            $scope.showCameraCtls = true;

            $scope.showCamera(cameras[$scope.i]);

          }

          // Display single camera.
          $scope.showCamera = function showCamera(i) {
            $scope.cameraUrl = cameras[i].url;
            $rootScope.cameraName = cameras[i].name;
            $scope.i = i;
          }
        });
    }])


    // Retrieve available cameras from python published endpoint.
    .factory('getCameraDataFactory', ['$resource', function ($resource) {
      return $resource('http://DOMAIN/cgi/list_cameras.py',
        {
          form: 'json'
        },
        {
          get: {
            Method: 'GET',
            isArray: true
          }
       }
      );
    }]);
}
