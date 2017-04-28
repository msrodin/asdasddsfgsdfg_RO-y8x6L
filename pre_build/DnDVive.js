'use strict';

System.register(['https://cdn.rodin.io/v0.0.1/rodinjs/RODIN.js', 'https://cdn.rodin.io/v0.0.1/vendor/three/examples/js/loaders/OBJLoader.js', 'https://cdn.rodin.io/v0.0.1/rodinjs/scene/SceneManager.js', 'https://cdn.rodin.io/v0.0.1/rodinjs/controllers/ViveController.js', './DragAndDrop.js'], function (_export, _context) {
    "use strict";

    var RODIN, SceneManager, ViveController, DragAndDrop, scene, controls, controllerL, controllerR;
    return {
        setters: [function (_httpsCdnRodinIoV001RodinjsRODINJs) {
            RODIN = _httpsCdnRodinIoV001RodinjsRODINJs;
        }, function (_httpsCdnRodinIoV001VendorThreeExamplesJsLoadersOBJLoaderJs) {}, function (_httpsCdnRodinIoV001RodinjsSceneSceneManagerJs) {
            SceneManager = _httpsCdnRodinIoV001RodinjsSceneSceneManagerJs.SceneManager;
        }, function (_httpsCdnRodinIoV001RodinjsControllersViveControllerJs) {
            ViveController = _httpsCdnRodinIoV001RodinjsControllersViveControllerJs.ViveController;
        }, function (_DragAndDropJs) {
            DragAndDrop = _DragAndDropJs.DragAndDrop;
        }],
        execute: function () {
            scene = SceneManager.get();
            controls = scene.controls;

            _export('controllerL', controllerL = new ViveController(RODIN.CONSTANTS.CONTROLLER_HANDS.LEFT, scene, scene.camera, 1));

            controllerL.standingMatrix = controls.getStandingMatrix();
            controllerL.initControllerModel();
            controllerL.initRaycastingLine();

            controllerL.onKeyDown = DragAndDrop.ViveControllerKeyDown;
            controllerL.onKeyUp = DragAndDrop.ViveControllerKeyUp;

            SceneManager.addController(controllerL);
            scene.add(controllerL);

            _export('controllerR', controllerR = new ViveController(RODIN.CONSTANTS.CONTROLLER_HANDS.RIGHT, scene, scene.camera, 1));

            controllerR.standingMatrix = controls.getStandingMatrix();
            controllerR.initControllerModel();
            controllerR.initRaycastingLine();

            controllerR.onKeyDown = DragAndDrop.ViveControllerKeyDown;
            controllerR.onKeyUp = DragAndDrop.ViveControllerKeyUp;

            SceneManager.addController(controllerR);
            scene.add(controllerR);

            controllerL.onControllerUpdate = DragAndDrop.objectUpdate;
            controllerR.onControllerUpdate = DragAndDrop.objectUpdate;

            _export('controllerL', controllerL);

            _export('controllerR', controllerR);
        }
    };
});