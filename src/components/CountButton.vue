<script setup lang="ts">
import { ref } from 'vue'
import { Button } from './ui/button'

const count = ref(0)
</script>

<template>
  <Button @click="count++">Click me {{ count }}</Button>
</template>
