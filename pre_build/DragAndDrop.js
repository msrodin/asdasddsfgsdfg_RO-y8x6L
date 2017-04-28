'use strict';

System.register(['https://cdn.rodin.io/v0.0.1/rodinjs/RODIN.js', 'https://cdn.rodin.io/v0.0.1/rodinjs/scene/SceneManager.js', 'https://cdn.rodin.io/v0.0.1/rodinjs/controllers/MouseController.js', 'https://cdn.rodin.io/v0.0.1/rodinjs/controllers/ViveController.js', 'https://cdn.rodin.io/v0.0.1/rodinjs/controllers/OculusController.js', 'https://cdn.rodin.io/v0.0.1/rodinjs/controllers/CardboardController.js', 'https://cdn.rodin.io/v0.0.1/rodinjs/utils/ChangeParent.js', 'https://cdn.rodin.io/v0.0.1/rodinjs/utils/physicsUtils.js'], function (_export, _context) {
    "use strict";

    var RODIN, SceneManager, MouseController, ViveController, OculusController, CardboardController, changeParent, PhysicsUtils, scene, camera, originalScene, objectKeyDown, objectKeyUp, mouseWheelPrevValue, objectValueChange, objectUpdate, DragAndDrop;


    function ViveControllerKeyDown(keyCode) {
        this.engaged = true;
        if (!this.pickedItems) {
            this.pickedItems = [];
        }
    }
    function ViveControllerKeyUp(keyCode) {
        this.engaged = false;
    }

    function OculusControllerKeyDown(keyCode) {
        this.engaged = true;
        if (!this.pickedItems) {
            this.pickedItems = [];
        }
    }
    function OculusControllerKeyUp(keyCode) {
        this.engaged = false;
    }

    function CardboardControllerKeyDown(keyCode) {
        this.engaged = true;
        if (!this.pickedItems) {
            this.pickedItems = [];
        }
    }
    function CardboardControllerKeyUp(keyCode) {
        this.engaged = false;
    }

    function MouseControllerKeyDown(keyCode) {}
    function MouseControllerKeyUp(keyCode) {}

    return {
        setters: [function (_httpsCdnRodinIoV001RodinjsRODINJs) {
            RODIN = _httpsCdnRodinIoV001RodinjsRODINJs;
        }, function (_httpsCdnRodinIoV001RodinjsSceneSceneManagerJs) {
            SceneManager = _httpsCdnRodinIoV001RodinjsSceneSceneManagerJs.SceneManager;
        }, function (_httpsCdnRodinIoV001RodinjsControllersMouseControllerJs) {
            MouseController = _httpsCdnRodinIoV001RodinjsControllersMouseControllerJs.MouseController;
        }, function (_httpsCdnRodinIoV001RodinjsControllersViveControllerJs) {
            ViveController = _httpsCdnRodinIoV001RodinjsControllersViveControllerJs.ViveController;
        }, function (_httpsCdnRodinIoV001RodinjsControllersOculusControllerJs) {
            OculusController = _httpsCdnRodinIoV001RodinjsControllersOculusControllerJs.OculusController;
        }, function (_httpsCdnRodinIoV001RodinjsControllersCardboardControllerJs) {
            CardboardController = _httpsCdnRodinIoV001RodinjsControllersCardboardControllerJs.CardboardController;
        }, function (_httpsCdnRodinIoV001RodinjsUtilsChangeParentJs) {
            changeParent = _httpsCdnRodinIoV001RodinjsUtilsChangeParentJs.default;
        }, function (_httpsCdnRodinIoV001RodinjsUtilsPhysicsUtilsJs) {
            PhysicsUtils = _httpsCdnRodinIoV001RodinjsUtilsPhysicsUtilsJs;
        }],
        execute: function () {
            scene = SceneManager.get();
            camera = scene.camera;
            originalScene = scene.scene;

            objectKeyDown = function objectKeyDown(evt) {
                var controller = evt.controller;
                var target = evt.target;
                var item = target.object3D;

                if (!item.initialParent) {
                    item.initialParent = item.parent;
                }
                var initialParent = item.initialParent;

                if (controller instanceof MouseController) {
                    item.raycastCameraPlane = new THREE.Plane();
                    item.intersection = new THREE.Vector3();
                    item.offset = new THREE.Vector3();

                    item.raycastCameraPlane.setFromNormalAndCoplanarPoint(camera.getWorldDirection(item.raycastCameraPlane.normal), item.getWorldPosition());
                    if (controller.raycaster.ray.intersectPlane(item.raycastCameraPlane, item.intersection)) {
                        item.offset.copy(item.intersection).sub(item.getWorldPosition());
                        if (evt.keyCode === 3) {
                            item.initRotation = item.rotation.clone();
                            item.initMousePos = { x: controller.axes[0], y: controller.axes[1] };
                        }
                    }
                }
                if (controller instanceof ViveController) {
                    if (controller.intersected && controller.intersected.length > 0) {
                        controller.intersected.map(function (intersect) {
                            if (item !== intersect.object) {
                                return;
                            }
                            changeParent(item, controller.raycastingLine.object3D);
                            var holder = new THREE.Object3D();
                            holder.position.copy(item.position);
                            holder.quaternion.copy(item.quaternion);
                            holder.name = 'holder';
                            controller.raycastingLine.object3D.add(holder);

                            if (item.rigidBody) {
                                changeParent(item, initialParent);
                            } else {
                                changeParent(item, holder);
                            }
                        });
                    }
                }
                if (controller instanceof OculusController) {
                    if (controller.intersected && controller.intersected.length > 0) {
                        controller.intersected.map(function (intersect) {
                            if (item !== intersect.object) {
                                return;
                            }
                            changeParent(item, camera);

                            var holder = new THREE.Object3D();
                            holder.position.copy(item.position);
                            holder.name = 'holder';

                            camera.add(holder);
                            item.objectHolder = holder;

                            if (item.rigidBody) {
                                changeParent(item, initialParent);
                            } else {
                                changeParent(item, holder);
                            }
                        });
                    }
                }
                if (controller instanceof CardboardController) {
                    if (controller.intersected && controller.intersected.length > 0) {
                        controller.intersected.map(function (intersect) {
                            if (item !== intersect.object) {
                                return;
                            }
                            changeParent(item, camera);

                            var holder = new THREE.Object3D();
                            holder.position.copy(item.position);
                            holder.name = 'holder';

                            camera.add(holder);
                            item.objectHolder = holder;

                            if (item.rigidBody) {
                                changeParent(item, initialParent);
                            } else {
                                changeParent(item, holder);
                            }
                        });
                    }
                }

                controller.pickedItems.push(item);
            };

            objectKeyUp = function objectKeyUp(evt) {
                var controller = evt.controller;
                var target = evt.target;
                var item = target.object3D;
                if (!item.initialParent) {
                    item.initialParent = item.parent;
                }
                var initialParent = item.initialParent;

                if (controller instanceof MouseController) {}
                if (controller instanceof ViveController) {
                    if (controller.pickedItems && controller.pickedItems.length > 0) {
                        controller.pickedItems.map(function (item) {
                            var holder = item.parent;
                            changeParent(item, initialParent);
                            controller.raycastingLine.object3D.remove(holder);
                        });
                        if (controller.raycastingLine.object3D.children.length > 0) {
                            controller.raycastingLine.object3D.children.map(function (item) {
                                controller.raycastingLine.object3D.remove(item);
                            });
                        }
                        controller.raycastingLine.object3D.children = [];
                    }
                }
                if (controller instanceof OculusController) {
                    if (controller.pickedItems && controller.pickedItems.length > 0) {
                        controller.pickedItems.map(function (item) {
                            changeParent(item, initialParent);
                            item.objectHolder = null;

                            if (camera.children.length > 0) {
                                camera.children.map(function (item) {
                                    if (item.name === "holder") {
                                        camera.remove(item);
                                    }
                                });
                            }
                        });
                    }
                }
                if (controller instanceof CardboardController) {
                    if (controller.pickedItems && controller.pickedItems.length > 0) {
                        controller.pickedItems.map(function (item) {
                            changeParent(item, initialParent);
                            item.objectHolder = null;

                            if (camera.children.length > 0) {
                                camera.children.map(function (item) {
                                    if (item.name === "holder") {
                                        camera.remove(item);
                                    }
                                });
                            }
                        });
                    }
                }

                controller.pickedItems = [];
            };

            mouseWheelPrevValue = 0;

            objectValueChange = function objectValueChange(evt) {
                var controller = evt.controller;
                mouseWheelPrevValue = mouseWheelPrevValue || 0;
                var direction = MouseController.getGamepad().buttons[evt.keyCode - 1].value - mouseWheelPrevValue;
                if (controller instanceof MouseController) {
                    var target = evt.target;
                    var item = target.object3D;
                    if (evt.keyCode === 2) {

                        var directionVector = item.getWorldPosition().sub(camera.getWorldPosition());

                        if (item.rigidBody) {
                            var coef = 0.99;
                            coef = direction > 0 ? coef : 1 / coef;
                            var pointerShift = directionVector.multiplyScalar(coef).add(camera.getWorldPosition()).multiplyScalar(100);
                            var vec = new OIMO.Vec3(pointerShift.x, pointerShift.y, pointerShift.z);
                            item.rigidBody.body.sleeping = false;
                            item.rigidBody.body.setPosition(vec);
                        } else {
                            var _coef = 0.95;
                            _coef = direction > 0 ? _coef : 1 / _coef;
                            item.Sculpt.setGlobalPosition(directionVector.multiplyScalar(_coef).add(camera.getWorldPosition()));
                        }
                    }
                }
                mouseWheelPrevValue = MouseController.getGamepad().buttons[evt.keyCode - 1].value;
            };

            objectUpdate = function objectUpdate() {
                var _this = this;

                if (this instanceof MouseController) {
                    this.raycaster.setFromCamera({ x: this.axes[0], y: this.axes[1] }, camera);

                    if (this.pickedItems && this.pickedItems.length > 0) {
                        this.pickedItems.map(function (item) {
                            if (_this.raycaster.ray.intersectPlane(item.raycastCameraPlane, item.intersection)) {

                                if (_this.keyCode === 1) {
                                    if (item.rigidBody) {
                                        var pointerShift = item.intersection.sub(item.offset).multiplyScalar(100);
                                        var vec = new OIMO.Vec3(pointerShift.x, pointerShift.y, pointerShift.z);
                                        item.rigidBody.body.sleeping = false;
                                        item.rigidBody.body.setPosition(vec);
                                    } else {
                                        item.Sculpt.setGlobalPosition(item.intersection.sub(item.offset));
                                    }
                                } else if (_this.keyCode === 3) {
                                    var shift = { x: _this.axes[0] - item.initMousePos.x, y: _this.axes[1] - item.initMousePos.y };
                                    item.initMousePos = { x: _this.axes[0], y: _this.axes[1] };
                                    var deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(-shift.y * Math.PI, shift.x * Math.PI, 0, 'XYZ'));

                                    if (item.rigidBody) {
                                        item.rigidBody.body.sleeping = false;
                                        var _pointerShift = new THREE.Quaternion();
                                        var bodyQuat = PhysicsUtils.oimoToThree(item.rigidBody.body.getQuaternion());
                                        _pointerShift.multiplyQuaternions(deltaRotationQuaternion, bodyQuat);
                                        var quat = new OIMO.Quaternion(_pointerShift.x, _pointerShift.y, _pointerShift.z, _pointerShift.w);

                                        item.rigidBody.body.setQuaternion(quat);
                                    } else {
                                        var _pointerShift2 = new THREE.Quaternion();
                                        _pointerShift2.multiplyQuaternions(deltaRotationQuaternion, item.getWorldQuaternion());
                                        item.Sculpt.setGlobalQuaternion(_pointerShift2);
                                    }
                                }
                            }
                        });
                    }
                }
                if (this instanceof ViveController) {
                    if (this.pickedItems && this.pickedItems.length > 0) {
                        this.pickedItems.map(function (item) {
                            if (item.rigidBody) {
                                if (item.rigidBody.body instanceof OIMO.RigidBody) {
                                    item.rigidBody.body.sleeping = false;
                                    var holderPos = _this.raycastingLine.object3D.children[0].getWorldPosition();
                                    var vecPos = new OIMO.Vec3(holderPos.x * 100, holderPos.y * 100, holderPos.z * 100);
                                    item.rigidBody.body.setPosition(vecPos);

                                    var holderQuat = _this.raycastingLine.object3D.children[0].getWorldQuaternion();
                                    var vecQuat = new OIMO.Quaternion(holderQuat.x * 100, holderQuat.y * 100, holderQuat.z * 100, holderQuat.w * 100);
                                    item.rigidBody.body.setQuaternion(vecQuat);
                                }
                            }
                        });
                    }
                }
                if (this instanceof OculusController) {
                    if (this.pickedItems && this.pickedItems.length > 0) {
                        this.pickedItems.map(function (item) {
                            if (item.rigidBody) {
                                if (item.rigidBody.body instanceof OIMO.RigidBody) {
                                    item.rigidBody.body.sleeping = false;
                                    var targetPos = item.objectHolder.getWorldPosition();
                                    var vec = new OIMO.Vec3(targetPos.x * 100, targetPos.y * 100, targetPos.z * 100);
                                    item.rigidBody.body.setPosition(vec);
                                }
                            }
                        });
                    }
                }
                if (this instanceof CardboardController) {
                    if (this.pickedItems && this.pickedItems.length > 0) {
                        this.pickedItems.map(function (item) {
                            if (item.rigidBody) {
                                if (item.rigidBody.body instanceof OIMO.RigidBody) {
                                    item.rigidBody.body.sleeping = false;
                                    var targetPos = item.objectHolder.getWorldPosition();
                                    var vec = new OIMO.Vec3(targetPos.x * 100, targetPos.y * 100, targetPos.z * 100);
                                    item.rigidBody.body.setPosition(vec);
                                }
                            }
                        });
                    }
                }
            };

            _export('DragAndDrop', DragAndDrop = {
                objectKeyDown: objectKeyDown,
                objectValueChange: objectValueChange,
                objectUpdate: objectUpdate,
                objectKeyUp: objectKeyUp,
                ViveControllerKeyUp: ViveControllerKeyUp,
                ViveControllerKeyDown: ViveControllerKeyDown,
                OculusControllerKeyDown: OculusControllerKeyDown,
                OculusControllerKeyUp: OculusControllerKeyUp,
                CardboardControllerKeyDown: CardboardControllerKeyDown,
                CardboardControllerKeyUp: CardboardControllerKeyUp,
                MouseControllerKeyDown: MouseControllerKeyDown,
                MouseControllerKeyUp: MouseControllerKeyUp
            });

            _export('DragAndDrop', DragAndDrop);
        }
    };
});