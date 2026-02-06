<template>
  <div class="min-h-screen w-full bg-white font-sans text-slate-600 antialiased selection:bg-indigo-500 selection:text-white overflow-hidden">
    <slot />
  </div>
</template>

<style>
/* Reset margin body agar full screen */
body {
  margin: 0;
  padding: 0;
}
</style>