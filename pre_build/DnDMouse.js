'use strict';

System.register(['https://cdn.rodin.io/v0.0.1/vendor/three/examples/js/loaders/OBJLoader.js', 'https://cdn.rodin.io/v0.0.1/rodinjs/scene/SceneManager.js', 'https://cdn.rodin.io/v0.0.1/rodinjs/controllers/MouseController', './DragAndDrop.js'], function (_export, _context) {
    "use strict";

    var SceneManager, MouseController, DragAndDrop, mouseController;
    return {
        setters: [function (_httpsCdnRodinIoV001VendorThreeExamplesJsLoadersOBJLoaderJs) {}, function (_httpsCdnRodinIoV001RodinjsSceneSceneManagerJs) {
            SceneManager = _httpsCdnRodinIoV001RodinjsSceneSceneManagerJs.SceneManager;
        }, function (_httpsCdnRodinIoV001RodinjsControllersMouseController) {
            MouseController = _httpsCdnRodinIoV001RodinjsControllersMouseController.MouseController;
        }, function (_DragAndDropJs) {
            DragAndDrop = _DragAndDropJs.DragAndDrop;
        }],
        execute: function () {
            _export('mouseController', mouseController = new MouseController());

            mouseController.onControllerUpdate = DragAndDrop.objectUpdate;

            SceneManager.addController(mouseController);

            _export('mouseController', mouseController);
        }
    };
});