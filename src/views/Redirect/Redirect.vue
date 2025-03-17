<template>
  <div></div>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();
onBeforeMount(async () => {
  const { params, query } = route;
  const { path } = params;
  await nextTick();
  router.replace({ path: '/' + path, query });
});
</script>
