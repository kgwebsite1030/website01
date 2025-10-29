<template>
  <div class="flex flex-col min-h-screen">
    <TheHeader />
    <main class="flex-1">
      <RouterView v-slot="{ Component }">
        <Transition
          name="fade"
          mode="out-in"
          appear
        >
          <component :is="Component" :key="$route.fullPath" />
        </Transition>
      </RouterView>
    </main>
    <TheFooter />
    <BackTop :right="20" :bottom="20" />
  </div>
</template>

<style scoped>
/* 淡入淡出过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
