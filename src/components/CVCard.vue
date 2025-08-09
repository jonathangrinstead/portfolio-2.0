<template>
    <Card class="glass-card flex flex-col relative w-full h-full">
        <a href="/Jonathan Grinstead CV(2025).pdf" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center h-full">
            <span class="text-2xl font-serif italic">Curriculum Vitae</span>
        </a>
    </Card>
</template>

<script setup lang="ts">
import { Card } from '@/components/ui/card'
</script>

<style scoped>
.glass-card {
    cursor: pointer;
}
a {
    text-decoration: none;
    font-weight: 900;
}
</style>