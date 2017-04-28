'use strict';

System.register(['https://cdn.rodin.io/v0.0.1/vendor/three/examples/js/loaders/OBJLoader.js', 'https://cdn.rodin.io/v0.0.1/rodinjs/scene/SceneManager.js', 'https://cdn.rodin.io/v0.0.1/rodinjs/controllers/OculusController.js', './DragAndDrop.js'], function (_export, _context) {
    "use strict";

    var SceneManager, OculusController, DragAndDrop, oculusController;
    return {
        setters: [function (_httpsCdnRodinIoV001VendorThreeExamplesJsLoadersOBJLoaderJs) {}, function (_httpsCdnRodinIoV001RodinjsSceneSceneManagerJs) {
            SceneManager = _httpsCdnRodinIoV001RodinjsSceneSceneManagerJs.SceneManager;
        }, function (_httpsCdnRodinIoV001RodinjsControllersOculusControllerJs) {
            OculusController = _httpsCdnRodinIoV001RodinjsControllersOculusControllerJs.OculusController;
        }, function (_DragAndDropJs) {
            DragAndDrop = _DragAndDropJs.DragAndDrop;
        }],
        execute: function () {
            _export('oculusController', oculusController = new OculusController());

            oculusController.onKeyDown = DragAndDrop.OculusControllerKeyDown;
            oculusController.onKeyUp = DragAndDrop.OculusControllerKeyUp;

            oculusController.onControllerUpdate = DragAndDrop.objectUpdate;

            SceneManager.addController(oculusController);

            _export('oculusController', oculusController);
        }
    };
});