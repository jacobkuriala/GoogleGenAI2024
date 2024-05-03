<template>
  <section
    class="hero h-screen w-screen grid grid-cols-12 px-[6.5rem] gap-x-6 items-center relative"
  >
    <div class="hero__copy col-span-8 flex flex-col gap-y-8">
      <div class="flex flex-col w-full gap-y-14">
        <h1 class="text-white font-work text-8xl font-bold leading-none">
          Lorem ipsum dolor sit
        </h1>
        <HeroInput placeholder="Do you want me to tell you a story?" />
      </div>
      <p class="text-slate-600 text-xl font-normal px-10">
        For example: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
    <NuxtImg
      src="/images/firecamp.png"
      format="auto"
      sizes="50vw sm:90vw md:60vw lg:50vw xl:40vw"
      class="absolute top-0 right-0 w-[43%]"
    />
    
     <!-- <section style="height: 100%; width: 500%;">
      <TresCanvas clear-color="#0d1425">
        <TresPerspectiveCamera />
        <TresDirectionalLight v-light-helper />
        <Suspense>
          <FlameModel />
        </Suspense>
      </TresCanvas>
    </section> -->

  </section>
</template>

<script setup lang="ts"></script>

<style scoped>

</style>
