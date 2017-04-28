'use strict';

System.register(['https://cdn.rodin.io/v0.0.1/vendor/three/examples/js/loaders/OBJLoader.js', 'https://cdn.rodin.io/v0.0.1/rodinjs/scene/SceneManager.js', 'https://cdn.rodin.io/v0.0.1/rodinjs/controllers/CardboardController.js', './DragAndDrop.js'], function (_export, _context) {
    "use strict";

    var SceneManager, CardboardController, DragAndDrop, cardboardController;
    return {
        setters: [function (_httpsCdnRodinIoV001VendorThreeExamplesJsLoadersOBJLoaderJs) {}, function (_httpsCdnRodinIoV001RodinjsSceneSceneManagerJs) {
            SceneManager = _httpsCdnRodinIoV001RodinjsSceneSceneManagerJs.SceneManager;
        }, function (_httpsCdnRodinIoV001RodinjsControllersCardboardControllerJs) {
            CardboardController = _httpsCdnRodinIoV001RodinjsControllersCardboardControllerJs.CardboardController;
        }, function (_DragAndDropJs) {
            DragAndDrop = _DragAndDropJs.DragAndDrop;
        }],
        execute: function () {
            _export('cardboardController', cardboardController = new CardboardController());

            cardboardController.onKeyDown = DragAndDrop.CardboardControllerKeyDown;
            cardboardController.onKeyUp = DragAndDrop.CardboardControllerKeyUp;

            cardboardController.onControllerUpdate = DragAndDrop.objectUpdate;

            SceneManager.addController(cardboardController);

            _export('cardboardController', cardboardController);
        }
    };
});