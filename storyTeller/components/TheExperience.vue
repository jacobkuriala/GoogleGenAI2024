<script setup lang="ts">
import { Scene, PerspectiveCamera, Mesh, SphereGeometry, MeshBasicMaterial, WebGLRenderer } from 'three'
import { type Ref } from 'vue'
import { useWindowSize } from '@vueuse/core'

let renderer: WebGLRenderer
const experience: Ref<HTMLCanvasElement | null> = ref(null)

const { width, height } = useWindowSize()
const aspectRatio = computed(() => width.value / height.value)

const scene = new Scene()

const camera = new PerspectiveCamera(75, aspectRatio.value, 0.1, 1000)
camera.position.set(0, 0, 4)

scene.add(camera)


function updateCamera() {
  camera.aspect = aspectRatio.value
  camera.updateProjectionMatrix()
}

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

watch(aspectRatio, () => {
  updateCamera()
  updateRenderer()
})

onMounted(() => {
  setRenderer()
})

</script>
<template>
  <div>
    <canvas ref="experience" />
  </div>
</template>