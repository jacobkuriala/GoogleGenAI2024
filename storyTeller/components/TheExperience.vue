<script setup lang="ts">
import { Scene, PerspectiveCamera, Mesh, SphereGeometry, MeshBasicMaterial, WebGLRenderer } from 'three'
import { type Ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import BubbleMiniRight from './BubbleMiniRight.vue';

let showChatBox = ref(false);
let renderer: WebGLRenderer
const experience: Ref<HTMLCanvasElement | null> = ref(null)
const bubbleMiniRight = ref<HTMLDivElement | null>(null);
const { width, height } = useWindowSize();
const bubbleX = ref(0);
const bubbleY = ref(0);
const aspectRatio = computed(() => width.value / height.value)

const scene = new Scene()

const camera = new PerspectiveCamera(75, aspectRatio.value, 0.1, 1000)
camera.position.set(0, 0, 4)
scene.add(camera)

function updateCamera() {
  camera.aspect = aspectRatio.value
  camera.updateProjectionMatrix()
}

const mainChar = new Mesh(
  new SphereGeometry(1, 32, 32),
  new MeshBasicMaterial({ color: 0x008080 })
)

const sphere2 = new Mesh(
  new SphereGeometry(1, 32, 32),
  new MeshBasicMaterial({ color: 0x7a7a7a })
)
sphere2.position.set(3, 0, 0)
scene.add(mainChar)
scene.add(sphere2)

function updateRenderer() {
  if (renderer && experience.value) {
    renderer.setSize(width.value, height.value);
    renderer.render(scene, camera);
  }
}

function setRenderer() {
  if (experience.value) {
    renderer = new WebGLRenderer({ canvas: experience.value, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    updateRenderer();
  }
}

function onDocumentKeyDown(event: KeyboardEvent) {
    const xSpeed = 0.1;
        const ySpeed = 0.1;
        const keyCode = event.code;
        if (mainChar) {
          if (keyCode == 'KeyA') { 
              mainChar.position.x -= xSpeed;
          } else if (keyCode == 'KeyD') { 
              mainChar.position.x += xSpeed;
          } else if (keyCode == 'Space') { 
              mainChar.position.set(0, 0, 0);
          }
        }
        checkCollision();
        renderer.render(scene, camera);
}

function checkCollision() {
    if (mainChar.position.distanceTo(sphere2.position) < 2) {
        showChatBox.value = true;
        if (bubbleMiniRight.value) {
          updateBubbleMiniRightPosition();
        }
    } else {
        showChatBox.value = false;
    }
}
function updateBubbleMiniRightPosition() {
  // Step 1: Get the object's position in world space
  const vector = mainChar.position.clone();
  
  // Step 2: Convert to normalized device coordinates
  vector.project(camera);
  
  // Step 3: Convert to viewport coordinates
  vector.x = Math.round((0.5 + vector.x / 2) * (width.value));
  vector.y = Math.round((0.5 - vector.y / 2) * (height.value));
  
  // Assuming the radius of mainChar is defined (for a SphereGeometry it's the first parameter of the constructor)
  const radius = new SphereGeometry(1, 32, 32).parameters.radius;
  // Convert the radius from world space to screen space
  // This is an approximation, as the exact scale depends on the camera's distance and FOV
  const scale = width.value / (2 * Math.tan(camera.fov * Math.PI / 360) * camera.position.z);
  const screenRadius = radius * scale;
  
  // Adjust vector.x and vector.y to move the point to the top right corner of the circle
  // Apply correction factors based on observation
  const correctionFactorX = 0.5; // Correction factor for X
  const correctionFactorY = 0.5; // Correction factor for Y

  // Apply the correction factors
  vector.x += screenRadius * correctionFactorX;
  vector.y -= screenRadius * correctionFactorY;
  
  if (bubbleMiniRight.value) {
    bubbleX.value = vector.x;
    bubbleY.value = vector.y;
  }
}

watch(aspectRatio, () => {
  updateCamera()
  updateRenderer()
  updateBubbleMiniRightPosition()
})


onMounted(() => {
  setRenderer()
  window.addEventListener('keydown', onDocumentKeyDown, false);
})
onUnmounted(() => {
  window.removeEventListener('keydown', onDocumentKeyDown, false);
});
</script>
<template>
    <div class="the-experience relative w-full h-full bg-red-500">
        <canvas ref="experience" class="w-full h-full fixed inset-0 z-0"></canvas>
            <ChatBox message="Chat Message Goes Here"  v-show="showChatBox"/>
            <BubbleMiniRight ref="bubbleMiniRight" message="..." :x="bubbleX" :y="bubbleY"  v-show="showChatBox"/>
    </div>
</template>
<style scoped>
.the-experience{
    width: 100%;
    height: 100%;
    position: relative;
}
</style>