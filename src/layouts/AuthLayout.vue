<template>
  <div class="flex flex-col min-h-screen">
    <nav class="p-6 flex gap-6 items-center justify-between lg:px-8">
      <div class="flex lg:flex-1">
        <RouterLink to="/" class="p-1.5 -m-1.5">
          <span class="sr-only">Your Company</span>
          <img
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt=""
            class="h-8 w-auto"
          >
        </RouterLink>
      </div>
      <div class="flex gap-6 items-center">
        <ToggleLocale />
        <!-- <ToggleTheme /> -->
      </div>
    </nav>
    <main class="flex flex-1">
      <RouterView />
    </main>
  </div>
</template>
