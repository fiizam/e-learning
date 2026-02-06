<script setup>
// Import komponen Toast Global
import GlobalToast from '~/components/GlobalToast.vue';
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <GlobalToast />
  </div>
</template>