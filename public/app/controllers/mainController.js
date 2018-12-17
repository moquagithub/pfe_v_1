angular.module('mainCtrl', [])

    .controller('MainController', function ($window) {

        let vm = this;
        vm.title="ok";

        $window.addEventListener("load", function() {
            var foamtree = new CarrotSearchFoamTree({
                id: "visualization",
                dataObject: {
                    groups: [
                        { label: "Your", weight: 1.0 },
                        { label: "Hamid", weight: 7.0 },
                        { label: "First", weight: 3.0 },
                        { label: "FoamTree", weight: 2.0 },
                        { label: "Visualization", weight: 4.0 }
                    ]
                },
                onGroupSelectionChanged: function (info) {
                    $window.console.log("selected", info);
                }
            });
        });

    });


