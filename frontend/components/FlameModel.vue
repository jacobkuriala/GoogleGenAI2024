<script setup lang="ts">
import { useAnimations, useGLTF } from '@tresjs/cientos'

const { scene: model, animations } = await useGLTF(
  '3dmodel/testcampfire.gltf', {draco: true}
)
const { actions } = useAnimations(animations, model)
const currentAction = ref(null)

onMounted(() => {
  if (actions['Greeting']) {
    currentAction.value = actions['Greeting']
    if (currentAction.value){
      currentAction.value.play()  
    }
  }
})
</script>

<template>
  <primitive :object="model" />
</template>