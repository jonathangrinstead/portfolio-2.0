<template>
    <Card class="glass-card flex flex-col relative w-full h-full p-4">
        <div class="relative z-10 flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <div class="min-w-0">
                <div class="text-sm font-semibold leading-tight">GitHub</div>
                <div class="text-xs opacity-70 truncate">@jonathangrinstead</div>
            </div>
        </div>

        <div class="relative z-10 mt-3 flex-1 min-h-0">
            <div
                ref="graphWrapEl"
                class="github-graph h-full w-full overflow-auto rounded-xl border border-black/10 dark:border-white/15 bg-white/35 dark:bg-black/20"
            >
                <div
                    v-if="isDark && graphSvg && !graphInlineFailed"
                    class="block p-3 h-full max-h-full w-auto min-w-max select-none"
                    v-html="graphSvg"
                />
                <img
                    v-else-if="!graphFailed"
                    class="block p-3 h-full max-h-full w-auto min-w-max select-none"
                    :src="graphSrc"
                    alt="GitHub contribution graph for jonathangrinstead"
                    loading="lazy"
                    decoding="async"
                    referrerpolicy="no-referrer"
                    @load="scrollGraphToEnd"
                    @error="graphFailed = true"
                />
                <div v-else class="h-full w-full flex items-center justify-center p-3 text-xs opacity-70">
                    Contribution graph unavailable.
                </div>
            </div>
        </div>

        <a
            href="https://github.com/jonathangrinstead"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open GitHub profile"
            class="absolute z-20 top-3 right-3 p-2 rounded-full border backdrop-blur shadow-md transition-all duration-200 pointer-events-auto
                   bg-white/80 text-black border-white/60 hover:bg-white hover:scale-105 hover:-rotate-3
                   focus:outline-none focus:ring-2 focus:ring-black/20
                   dark:bg-black/60 dark:text-white dark:border-white/30 dark:hover:bg-black/70 dark:focus:ring-white/20"
        >
            <ExternalLink class="w-5 h-5" />
        </a>
    </Card>
</template>
<script setup lang="ts">
import { Card } from '@/components/ui/card'
import { ExternalLink } from 'lucide-vue-next'
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()
const isDark = computed(() => mode.value === 'dark')
const graphFailed = ref(false)
const graphWrapEl = ref<HTMLElement | null>(null)
const graphSvg = ref<string | null>(null)
const graphInlineFailed = ref(false)

function scrollGraphToEnd() {
    const el = graphWrapEl.value
    if (!el) return
    requestAnimationFrame(() => {
        el.scrollLeft = el.scrollWidth
    })
}

async function loadGraphSvg() {
    graphInlineFailed.value = false
    graphSvg.value = null
    try {
        const res = await fetch(graphSrc.value)
        if (!res.ok) throw new Error(`Failed to fetch svg (${res.status})`)
        const svgText = await res.text()

        // Parse + minimally sanitize (remove scripts and inline event handlers), then darken "empty" squares.
        const doc = new DOMParser().parseFromString(svgText, 'image/svg+xml')
        doc.querySelectorAll('script').forEach((n) => n.remove())

        const emptyFills = new Set([
            '#ebedf0',
            '#eeeeee',
            '#ededed',
            '#eaeaea',
            '#f0f0f0'
        ])
        const emptyFillDark = '#1f2937' // tailwind gray-800

        doc.querySelectorAll('*').forEach((el) => {
            // Drop any on* handlers
            for (const attr of Array.from(el.attributes)) {
                if (attr.name.toLowerCase().startsWith('on')) el.removeAttribute(attr.name)
            }

            const fill = el.getAttribute('fill')?.toLowerCase()
            if (fill && emptyFills.has(fill)) {
                el.setAttribute('fill', emptyFillDark)
            }

            const style = el.getAttribute('style')
            if (style && /fill\s*:\s*#?[0-9a-f]{3,8}/i.test(style)) {
                // Normalize a few common empty colors if they appear in style=""
                let nextStyle = style
                for (const c of emptyFills) {
                    const cNoHash = c.slice(1)
                    nextStyle = nextStyle
                        .replace(new RegExp(`fill\\s*:\\s*${c}\\b`, 'ig'), `fill:${emptyFillDark}`)
                        .replace(new RegExp(`fill\\s*:\\s*${cNoHash}\\b`, 'ig'), `fill:${emptyFillDark}`)
                }
                el.setAttribute('style', nextStyle)
            }
        })

        graphSvg.value = new XMLSerializer().serializeToString(doc.documentElement)
        await nextTick()
        scrollGraphToEnd()
    } catch {
        graphInlineFailed.value = true
        graphSvg.value = null
    }
}

const graphSrc = computed(() => {
    // Original provider (matches the look you liked).
    const username = 'jonathangrinstead'
    const color = isDark.value ? '39d353' : '40c463' // GitHub-ish greens
    // Light cache-bust so it refreshes at least daily (avoids "stale graph" from CDN caching)
    const dayKey = new Date().toISOString().slice(0, 10)
    return `https://ghchart.rshah.org/${color}/${username}?t=${dayKey}`
})

onMounted(async () => {
    await nextTick()
    scrollGraphToEnd()
})

watch(graphSrc, async () => {
    // If theme changes, retry loading and keep the view pinned to the most recent week.
    graphFailed.value = false
    graphInlineFailed.value = false
    graphSvg.value = null
    await nextTick()
    scrollGraphToEnd()

    if (isDark.value) {
        await loadGraphSvg()
    }
})

watch(isDark, async (dark) => {
    if (dark) {
        await loadGraphSvg()
    } else {
        graphSvg.value = null
        graphInlineFailed.value = false
    }
})
</script>
<style scoped>
.glass-card {
    cursor: default;
}

/* Hide scrollbar but keep horizontal/vertical scroll available (great on mobile swipe). */
.github-graph {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE/Edge legacy */
}
.github-graph::-webkit-scrollbar {
    display: none;
}
</style>