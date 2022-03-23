import * as THREE from 'three';
import {Axis, AxisValue, Toward, NotationBase, NotationExtra} from '../types';

const axisTable: {[key in NotationBase]: [Axis, AxisValue, Toward]} = {
  L: ['x', -1, 1], M: ['x', 0, 1], R: ['x', 1, -1],
  D: ['y', -1, 1], E: ['y', 0, 1], U: ['y', 1, -1],
  B: ['z', -1, 1], S: ['z', 0, -1], F: ['z', 1, -1],
};

export function debounce(func: Function, delay = 200) {
  let timer: number;
  return function(...args: any[]) {
    if (timer) {
      window.clearTimeout(timer);
    }
    timer = window.setTimeout(()=> {
      func(args);
    }, delay);
  };
}

export function random(start: number, end: number) {
  return start + Math.floor(Math.random() * (end - start + 1));
}

// export function randomChoice(obj: {}): any
export function randomChoice(obj: any[]): any {
  if (Array.isArray(obj)) {
    const i = Math.floor(Math.random() * obj.length);
    return obj[i];
  } else {
    const list = Object.keys(obj);
    const key = Math.floor(Math.random() * list.length);
    return obj[key];
  }
}

export function sleep(millisecond: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), millisecond);
  });
}

export function err(strs: TemplateStringsArray, ...args: any[]) {
  let result = '';
  strs.forEach((str, i) => {
    let arg = args[i];
    if (typeof arg === 'object') {
      arg = JSON.stringify(arg);
    } else if (arg === undefined) {
      arg = '';
    }

    result += str + arg;
  });
  return result;
}


// Get rotation angle relative to the origin (ignore the y-axis)
export function horizontalRotationAngle(position: THREE.Vector3) {
  const dir = new THREE.Vector3();
  dir.subVectors(position, new THREE.Vector3(0, position.y, 0)).normalize();
  const rad = new THREE.Vector2(dir.z, dir.x).angle();
  return rad;
}

export function setOpacity(mesh: THREE.Mesh, opacity: number) {
  const material = mesh.material;
  if (material) {
    if (Array.isArray(material)) {
      for (const i of material) {
        i.opacity = opacity;
      }
    } else {
      material.opacity = opacity;
    }
  }

  if (mesh.children) {
    for (const i of mesh.children) {
      setOpacity(i as THREE.Mesh, opacity);
    }
  }
}

// Returns the index of the absolute maximum
export function absMaxIndex(arr: number[]) {
  const len = arr.length;
  if (!len) {
    return null;
  }

  let maxValue = Math.abs(arr[0]);
  let maxIndex = 0;
  for (let i = 1; i < len; i++) {
    const value = Math.abs(arr[i]);
    if (value > maxValue) {
      maxValue = value;
      maxIndex = i;
    }
  }
  return maxIndex;
}

// Returns the closest axis
export function getClosestAxis(vec: THREE.Vector3): Axis {
  let maxAxis;
  let maxValue;
  for (const [axis, value] of Object.entries(vec)) {
    const absValue = Math.abs(value);
    if (!maxValue || absValue > maxValue) {
      maxAxis = axis;
      maxValue = absValue;
    }
  }
  return maxAxis as Axis;
}

export function toRotation(notation: string): [Axis, number, number] {
  notation = notation.trim();

  const base = notation[0] as NotationBase;
  const extra = notation[1] as NotationExtra;

  if (!axisTable[base]) {
    throw new Error(`Wrong notation: ${notation}`);
  }

  const [axis, axisValue, toward] = axisTable[base];
  let rad = (Math.PI / 2) * toward;

  if (extra) {
    if (extra === `'`) {
      rad *= -1;
    } else if (extra === '2') {
      rad *= 2;
    } else {
      throw new Error(`Wrong notation: ${notation}`);
    }
  }
  return [axis, axisValue, rad];
}

const bases = ['L', 'M', 'R', 'D', 'E', 'U', 'B', 'S', 'F'];
const extras = ['', `'`, '2', '', `'`];
export function randomNotation() {
  const base = randomChoice(bases);
  const extra = randomChoice(extras);
  return base + extra;
}

const axes = ['x', 'y', 'z'];
const towards = ['1', '-1'];
const rads = [Math.PI / 2, Math.PI];
export function randomRotation(): [Axis, number] {
  const axis = randomChoice(axes);
  const toward = randomChoice(towards);
  const rad = randomChoice(rads);
  return [axis, rad * toward];
}


const notationTable: {[key in Axis]: [NotationBase, Toward][]} = {
  x: [['L', 1], ['M', 1], ['R', -1]],
  y: [['D', 1], ['E', 1], ['U', -1]],
  z: [['B', 1], ['S', -1], ['F', -1]],
};

export function getNotation(axis: 'x' | 'y' | 'z', value: number, sign: number, endDeg: number) {
  if (endDeg < 90) {
    throw new Error(`Wrong endDeg: ${endDeg}`);
  }
  // -1 0 1 -> 0 1 2
  const index = value + 1;
  const layerRotationNotation = notationTable[axis][index];
  let notation = '';
  // Use url search params to record cube colors
  if (endDeg > 0 && layerRotationNotation) {
    let toward = layerRotationNotation[1];
    if (sign < 0) {
      toward *= -1;
    }
    let baseStr = layerRotationNotation[0];
    if (toward< 0) {
      baseStr += `'`;
    }
    baseStr += ' ';
    for (let i = 0; i < Math.floor(endDeg / 90); i++) {
      notation += baseStr;
    }
  }
  return notation;
}
