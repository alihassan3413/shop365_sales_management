<template>
  <div>
    <SalesHeader />
    <SalesTable />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "auth",
});
</script>

<style scoped></style>
