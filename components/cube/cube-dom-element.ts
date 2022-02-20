// const [pendingMoves, setPendingMoves] = useState<Array<string>>([]);
// const pendingMoves: Array<string> = [];

import * as THREE from "three";
import {LayerModel} from "./models/layer-model";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {RubikCubeModel} from "./models/rubik-cube-model";
import {
  debounce,
  getClosestAxis,
  getNotation,
  horizontalRotationAngle,
  randomNotation,
  setOpacity,
  toRotation
} from "./utils";
import {Axis} from "./types";
import TWEEN from "@tweenjs/tween.js";

const minMoveDistance = 10;
const rotationRadPerPx = 0.01;
const debug = true;

// const router = new Router();

interface ICubeDomElementDelegate {
  onUserMove(moves: string[], state: string): void;
  onStateChange(state: string): void;
}

export class CubeDomElement {
  public static delegate?: ICubeDomElementDelegate

  public static reset(state?: string) {
    scene.remove(rubikCube.model);
    rubikCube.dispose();
    rubikCube = new RubikCubeModel(state);
    cubeletModels = rubikCube.model.children;
    scene.add(rubikCube.model);

    // console.log('reset to state: ', rubikCube.colors);

    window.history.replaceState('', '', './');
  }

  public static async random() {
    draggable = false;
    // progress.start();

    let i = 0;
    let lastNotation = '';
    const total = 20;
    while (i < total) {
      const notation = randomNotation();

      if (lastNotation && notation[0] === lastNotation[0]) {
        continue;
      }
      lastNotation = notation;


      const [layerRorationAxis, axisValue, rotationRad] = toRotation(notation);
      rubikCube.move(notation);

      // const notations = notation.trim().split(' ');
      this.delegate?.onStateChange(rubikCube.asString());
      // this.delegate?.onUserMove(notations, rubikCube.asString());

      // router.search.fd = rubikCube.asString();

      layerGroup.group(layerRorationAxis, axisValue, cubeletModels);
      const promise = rotationTransition(layerRorationAxis, rotationRad);

      i++;
      // progress.setPercentage(i / total);
      await promise;
    }

    // progress.done();
    mouseTarget = null;
    layerRotationAxis = null;
    mouseMoveAxis = null;
    draggable = true;
  }
}

const raycaster = new THREE.Raycaster();
let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
const screenCenterCoords = new THREE.Vector2(screenWidth / 2, screenHeight / 2);

let draggable = true;
let mouseTarget: THREE.Intersection;
let mouseMoveAxis: 'x' | 'y';
let initMoveToward: number;
const mouseTargetFaceDirection = new THREE.Vector3(); // Vector3
const mouseCoords = new THREE.Vector2();
const mousedownCoords = new THREE.Vector2();

const layerGroup = new LayerModel(debug);
const box = new THREE.BoxHelper( layerGroup, '#fff' );
box.onBeforeRender = function() {
  this.update();
};

let layerRotationAxis: 'x' | 'y' | 'z';
let layerRotationAxisToward: 1 | -1 = 1;
let lockRotationDirection = false;

const scene = new THREE.Scene();
// scene.add(box);
scene.background = new THREE.Color('#F1F3F3');
// scene.background = new THREE.TextureLoader().load(require('./img/background.jpg').default);

const directionalLight = new THREE.DirectionalLight('#FFF', 0.05);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight('#FFF', 0.05);
directionalLight2.position.set(-10, -10, -10);
scene.add(directionalLight2);

// const ambientLight = new THREE.AmbientLight('#FFF');
// scene.add(ambientLight);

const camera = new THREE.PerspectiveCamera(75, screenWidth / screenHeight, 0.1, 30);
if (screenWidth < 576) {
  camera.position.set(4, 4, 4);
} else {
  camera.position.set(3, 3, 3);
}

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(screenWidth, screenHeight);
renderer.setPixelRatio( window.devicePixelRatio );
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.enableDamping = true;
controls.rotateSpeed = 1.5;
controls.minDistance = debug ? 1 : 3;
controls.maxDistance = debug ? 20 : 10;

let rubikCube = new RubikCubeModel();
let cubeletModels = rubikCube.model.children;
scene.add(rubikCube.model);
scene.add(layerGroup);


window.addEventListener('resize', debounce(function() {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
  screenCenterCoords.set(screenWidth / 2, screenHeight / 2);

  camera.aspect = screenWidth / screenHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(screenWidth, screenHeight);
}));


renderer.domElement.addEventListener('mousedown', function() {
  handleMouseDown();
});

renderer.domElement.addEventListener('touchstart', function(e) {
  const touch = e.changedTouches[0];
  mouseCoords.set(touch.clientX, touch.clientY);
  console.log('mouseCoords: ', mouseCoords);
  handleMouseDown();
});

renderer.domElement.addEventListener('mouseup', function() {
  handleMouseUp();
});

renderer.domElement.addEventListener('touchend', function() {
  handleMouseUp();
});

renderer.domElement.addEventListener('mousemove', function(e) {
  mouseCoords.set(e.clientX, e.clientY);
  handleMouseMove();
});

renderer.domElement.addEventListener('touchmove', function(e) {
  const touch = e.changedTouches[0];
  mouseCoords.set(touch.clientX, touch.clientY);
  handleMouseMove();
});

function animate(time?: number) {
  requestAnimationFrame(animate);
  if (controls) {
    controls.update();
  }
  TWEEN.update(time);
  renderer.render(scene, camera);
};
animate();

async function rotationTransition(axis: Axis, endRad: number) {
  await layerGroup.rotationAnimation(axis, endRad);
  layerGroup.ungroup(rubikCube.model);
  layerGroup.initRotation();
}

async function handleMouseUp() {
  if (debug && mouseTarget) {
    const cubeletModel = mouseTarget.object;
    setOpacity(cubeletModel as THREE.Mesh, 1);
  }

  controls.enabled = true;

  if (!layerRotationAxis || !draggable) {
    return;
  }

  // current rotation deg
  const deg = Math.abs((THREE as any).Math.radToDeg(layerGroup.rotation[layerRotationAxis])) % 360;
  const sign = Math.sign(layerGroup.rotation[layerRotationAxis]);

  let endDeg;
  if (0 <= deg && deg <= 40) {
    endDeg = 0;
  } else if (40 < deg && deg <= 90 + 40) {
    endDeg = 90;
  } else if (90 + 40 < deg && deg <= 180 + 40) {
    endDeg = 180;
  } else if (180 + 40 < deg && deg <= 270 + 40) {
    endDeg = 270;
  } else if (270 + 40 < deg && deg <= 360) {
    endDeg = 360;
  }

  if (endDeg > 0) {
    // Get Singmaster notation according the rotation axis and mouse movement direction
    const position = mouseTarget.object.position;
    // // -1 0 1 -> 0 1 2
    // const index = position[layerRotationAxis] + 1;
    const value = position[layerRotationAxis];
    const notation = getNotation(layerRotationAxis, value, sign, endDeg);
    rubikCube.move(notation);

    const notations = notation.trim().split(' ');

    CubeDomElement.delegate?.onUserMove(notations, rubikCube.asString());

    // dispatch(cubeSlice.actions.addPendingMove(notation));
    // pendingMoves.push(notation);
    // console.log('pendingMoves: ', pendingMoves);

    // dispatch(cubeSlice.actions.setCurrentScreenState(rubikCube.asString()))
    // router.search.fd = rubikCube.asString();
  }

  // const startRad =(THREE as any).Math.degToRad(deg * sign);
  const endRad = (THREE as any).Math.degToRad(endDeg * sign);

  draggable = false;
  // Must use await
  // Disable drag cube until the transition is complete
  await rotationTransition(layerRotationAxis, endRad);
  draggable = true;

  lockRotationDirection = false;
  mouseTarget = null;
  layerRotationAxisToward = 1;
  initMoveToward = null;


  layerRotationAxis = null;
  mouseMoveAxis = null;
}

function handleMouseDown() {
  const x = (mouseCoords.x/ screenWidth) * 2 - 1;
  const y = -(mouseCoords.y/ screenHeight) * 2 + 1;
  raycaster.setFromCamera({x, y}, camera);
  const intersects = raycaster.intersectObjects(rubikCube.model.children);

  // Disable camera control when playing rotation animation
  if (intersects.length || raycaster.intersectObjects(layerGroup.children).length) {
    controls.enabled = false;
  }
  // Fix bug: Incorrect fd value (url) when rotating layer after random shuffle
  // Don't move the code up.
  // Otherwise the above controls.enabled will not be executed
  if (!draggable) {
    return;
  }

  if (intersects.length) {
    // Show hand when the mouse is over the cube
    document.body.classList.add('cursor-pointer');
    mousedownCoords.copy(mouseCoords);

    mouseTarget = intersects[1];
    // console.log('Setting mouse target: ', mouseTarget, intersects);
    if (debug) {
      const cubeletModel = mouseTarget.object as THREE.Mesh;
      setOpacity(cubeletModel, 0.5);
    }
  }
}

function handleMouseMove() {
  const x = (mouseCoords.x/ screenWidth) * 2 - 1;
  const y = -(mouseCoords.y/ screenHeight) * 2 + 1;

  raycaster.setFromCamera({x, y}, camera);
  const intersects = raycaster.intersectObjects(rubikCube.model.children);
  if (intersects.length) {
    document.body.classList.add('cursor-pointer');
  } else {
    document.body.classList.remove('cursor-pointer');
  }

  if (!mouseTarget || !draggable) {
    return;
  }

  if (!lockRotationDirection) {
    const mouseMoveDistance = mousedownCoords.distanceTo(mouseCoords);
    if (Math.abs(mouseMoveDistance) < minMoveDistance) {
      return;
    }

    lockRotationDirection = true;

    const direction = new THREE.Vector2();
    direction.subVectors(mouseCoords, mousedownCoords).normalize();
    mouseMoveAxis = Math.abs(direction.x) > Math.abs(direction.y) ? 'x' : 'y';

    mouseTargetFaceDirection.copy(mouseTarget.face.normal);
    mouseTargetFaceDirection.transformDirection(mouseTarget.object.matrixWorld);

    const point = mouseTarget.point;
    const mouseDirection = new THREE.Vector3().subVectors(point, new THREE.Vector3(0, 0, 0)).normalize();
    // Don't use mouseTargetFaceDirection
    // The rounded corners of the box may face the other way.
    // const closestAxis = getClosestAxis(mouseTargetFaceDirection);
    const closestAxis = getClosestAxis(mouseDirection);
    const axisValue = mouseDirection[closestAxis];
    mouseTargetFaceDirection.set(0, 0, 0);
    mouseTargetFaceDirection[closestAxis] = Math.sign(axisValue);

    // Get the rotation axis according to the direction of mouse movement and target face normal
    if (mouseTargetFaceDirection.y > 0.9) { // Top  face
      const rad = horizontalRotationAngle(camera.position);
      direction.rotateAround(new THREE.Vector2(0, 0), rad * -1);
      mouseMoveAxis = Math.abs(direction.x) > Math.abs(direction.y) ? 'x' : 'y';

      if (mouseMoveAxis === 'y') {
        layerRotationAxis = 'x';
      } else if (mouseMoveAxis === 'x') {
        layerRotationAxis = 'z';
        layerRotationAxisToward = -1;
      }
    } else if (mouseTargetFaceDirection.y < -0.9) { // Down face
      const rad = horizontalRotationAngle(camera.position);
      direction.rotateAround(new THREE.Vector2(0, 0), rad * 1);
      mouseMoveAxis = Math.abs(direction.x) > Math.abs(direction.y) ? 'x' : 'y';

      if (mouseMoveAxis === 'y') {
        layerRotationAxis = 'x';
      } else if (mouseMoveAxis === 'x') {
        layerRotationAxis = 'z';
      }
    } else if (mouseTargetFaceDirection.x < -0.9) { // Left  face
      if (mouseMoveAxis === 'y') {
        layerRotationAxis = 'z';
      } else if (mouseMoveAxis === 'x') {
        layerRotationAxis = 'y';
      }
    } else if (mouseTargetFaceDirection.x > 0.9) { // Right face
      if (mouseMoveAxis === 'y') {
        layerRotationAxis = 'z';
        layerRotationAxisToward = -1;
      } else if (mouseMoveAxis === 'x') {
        layerRotationAxis = 'y';
      }
    } else if (mouseTargetFaceDirection.z > 0.9) { // Front face
      if (mouseMoveAxis === 'y') { // Vertical movement
        layerRotationAxis = 'x';
      } else if (mouseMoveAxis === 'x') { // Horizontal movement
        layerRotationAxis = 'y';
      }
    } else if (mouseTargetFaceDirection.z < -0.9) { // Back face
      if (mouseMoveAxis === 'y') {
        layerRotationAxis = 'x';
        layerRotationAxisToward = -1;
      } else if (mouseMoveAxis === 'x') {
        layerRotationAxis = 'y';
      }
    } else {
      throw new Error(`Wrong mouseTargetFaceDirection: ${mouseTargetFaceDirection}`);
    }

    const value = mouseTarget.object.position[layerRotationAxis];
    layerGroup.group(layerRotationAxis, value, cubeletModels);

    // console.log('mouse target: ', mouseTarget);
    // console.log('rotating face: ', value, 'axis: ', layerRotationAxis, 'positions: ', mouseTarget.object.position);

    // console.log('lockRotationDirection: ', layerRotationAxis, layerRotationAxisToward, mouseTargetFaceDirection, value, mouseTarget.object)
  } else {
    let mouseMoveDistance = mouseCoords[mouseMoveAxis] - mousedownCoords[mouseMoveAxis];
    // Get the moving distance by the camera rotation angle relative to origin when clicking on the top face and down face
    if (mouseTargetFaceDirection && Math.abs(mouseTargetFaceDirection.y) > 0.9) {
      const yAxisDirection = Math.sign(mouseTargetFaceDirection.y) * -1;
      const dir = new THREE.Vector3();
      dir.subVectors(camera.position, new THREE.Vector3(0, camera.position.y, 0)).normalize();
      const rad = new THREE.Vector2(dir.z, dir.x).angle();
      const mouseCurrentRotation = new THREE.Vector2().copy(mouseCoords);
      mouseCurrentRotation.rotateAround(screenCenterCoords, rad * yAxisDirection);
      const mouseDownRotation = new THREE.Vector2().copy(mousedownCoords);
      mouseDownRotation.rotateAround(screenCenterCoords, rad * yAxisDirection);

      mouseMoveDistance = mouseCurrentRotation[mouseMoveAxis] - mouseDownRotation[mouseMoveAxis];
    }

    if (!initMoveToward) {
      initMoveToward = Math.sign(mouseMoveDistance);
    }
    if (layerGroup.children.length && layerRotationAxis) {
      layerGroup.rotation[layerRotationAxis] =
        (mouseMoveDistance - minMoveDistance * initMoveToward) * rotationRadPerPx * layerRotationAxisToward;
    }
  }
}

