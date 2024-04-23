<script setup lang="ts">
import { Scene, PerspectiveCamera, Mesh, SphereGeometry, MeshBasicMaterial, WebGLRenderer } from 'three'
import { type Ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import BubbleMiniRight from './BubbleMiniRight.vue';
let showChatBox = ref(false);
let renderer: WebGLRenderer
const experience: Ref<HTMLCanvasElement | null> = ref(null)
const bubbleMiniRight = ref<HTMLDivElement>();
const { width, height } = useWindowSize();
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
  renderer.setSize(width.value, height.value)
  renderer.render(scene, camera)
}

function setRenderer() {
  if (experience.value) {
    renderer = new WebGLRenderer({ canvas: experience.value })
    updateRenderer()
  }
}

function onDocumentKeyDown(event: KeyboardEvent) {
    const xSpeed = 0.1;
        const ySpeed = 0.1;

        const keyCode = event.which;
        if (mainChar) {
            if (keyCode == 65) {
                mainChar.position.x -= xSpeed;
            } else if (keyCode == 68) {
                mainChar.position.x += xSpeed;
            } else if (keyCode == 32) {
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
            console.log(bubbleMiniRight.value)
        }
    } else {
        showChatBox.value = false;
    }
}

watch(aspectRatio, () => {
  updateCamera()
  updateRenderer()
})

onMounted(() => {
  setRenderer()
  window.addEventListener('keydown', onDocumentKeyDown, false);
})

</script>
<template>
    <div style="position: relative; display: inline-block;">
        <canvas ref="experience"></canvas>
        <div  v-show="showChatBox">
            <ChatBox/>
            <BubbleMiniRight ref="bubbleMiniRight"/>
        </div>
    </div>
</template>