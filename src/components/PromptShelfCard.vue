<script setup lang="ts">
import { Download, Folder, Quote, Search } from 'lucide-vue-next'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'

const downloadUrl = import.meta.env.VITE_PROMPTSHELF_DOWNLOAD_URL || '/downloads/PromptShelf.dmg'
</script>

<template>
  <Card class="promptshelf-card glass-card group relative h-full w-full overflow-hidden">
    <div class="relative z-10 flex h-full flex-col p-5">
      <a
        :href="downloadUrl"
        download
        aria-label="Download PromptShelf for macOS"
        title="Download PromptShelf"
        class="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/60
               bg-white/80 text-black shadow-md backdrop-blur transition-all duration-200
               hover:scale-105 hover:rotate-3 hover:bg-white
               focus:outline-none focus:ring-2 focus:ring-black/20
               dark:border-white/30 dark:bg-black/60 dark:text-white
               dark:hover:bg-black/70 dark:focus:ring-white/20"
      >
        <Download class="h-5 w-5" />
      </a>

      <div class="pr-12">
        <div>
          <CardDescription class="mb-1 text-xs font-medium uppercase tracking-widest">
            macOS utility
          </CardDescription>
          <CardTitle class="text-2xl">PromptShelf</CardTitle>
        </div>
      </div>

      <p class="mt-2 max-w-[16rem] text-sm leading-snug text-muted-foreground">
        Your best AI prompts, one click away.
      </p>

      <div class="app-preview mt-4" aria-hidden="true">
        <div class="app-toolbar">
          <div class="flex items-center gap-1.5 font-semibold">
            <Quote class="h-3.5 w-3.5" />
            <span>PromptShelf</span>
          </div>
          <div class="search-pill"><Search class="h-3 w-3" /><span>Search</span></div>
        </div>

        <div class="app-body">
          <div class="app-sidebar">
            <span class="sidebar-row active"><Quote class="h-3 w-3" />All</span>
            <span class="sidebar-row"><Folder class="h-3 w-3" />Writing</span>
            <span class="sidebar-row"><Folder class="h-3 w-3" />Code</span>
          </div>

          <div class="prompt-list">
            <div class="prompt-row">
              <span class="prompt-title">Turn an idea into a plan</span>
              <span class="prompt-line w-4/5" />
              <div class="tag-row"><span>planning</span><span>strategy</span></div>
            </div>
            <div class="prompt-row">
              <span class="prompt-title">Review some code</span>
              <span class="prompt-line w-3/5" />
              <div class="tag-row"><span>code</span><span>review</span></div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-auto flex items-center justify-between pt-3 text-xs text-muted-foreground">
        <span>Native · Local · Markdown</span>
        <span class="font-medium text-foreground/70">macOS 13+</span>
      </div>
    </div>
  </Card>
</template>

<style scoped>
.promptshelf-card {
  isolation: isolate;
}

.app-preview {
  min-height: 0;
  overflow: hidden;
  border: 1px solid rgba(120, 120, 128, 0.18);
  border-radius: 9px;
  background: rgba(248, 248, 250, 0.9);
  color: #242426;
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.8);
  transform: perspective(800px) rotateX(1deg) rotateY(-1deg);
  transition: transform 350ms cubic-bezier(0.2, 0.8, 0.2, 1);
}

.group:hover .app-preview {
  transform: perspective(800px) rotateX(0) rotateY(0) translateY(-2px);
}

.app-toolbar {
  display: flex;
  height: 31px;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  border-bottom: 1px solid rgba(120, 120, 128, 0.18);
  font-size: 9px;
  background: rgba(236, 236, 238, 0.88);
}

.search-pill {
  display: flex;
  width: 68px;
  height: 19px;
  align-items: center;
  gap: 4px;
  padding: 0 6px;
  border-radius: 5px;
  color: #737377;
  background: rgba(118, 118, 128, 0.12);
}

.app-body {
  display: grid;
  min-height: 112px;
  grid-template-columns: 72px 1fr;
}

.app-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 7px 5px;
  border-right: 1px solid rgba(120, 120, 128, 0.14);
  background: rgba(232, 232, 235, 0.7);
}

.sidebar-row {
  display: flex;
  height: 20px;
  align-items: center;
  gap: 4px;
  padding: 0 5px;
  border-radius: 4px;
  font-size: 8px;
  color: #66666b;
}

.sidebar-row.active {
  color: white;
  background: #2486e8;
}

.prompt-list {
  padding: 3px 7px;
}

.prompt-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 6px 1px;
  border-bottom: 1px solid rgba(120, 120, 128, 0.13);
}

.prompt-row:last-child {
  border-bottom: 0;
}

.prompt-title {
  overflow: hidden;
  font-size: 8px;
  font-weight: 700;
  line-height: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.prompt-line {
  display: block;
  height: 3px;
  border-radius: 999px;
  background: rgba(120, 120, 128, 0.22);
}

.tag-row {
  display: flex;
  gap: 3px;
}

.tag-row span {
  border-radius: 999px;
  padding: 2px 4px;
  font-size: 6px;
  line-height: 1;
  color: #68686d;
  background: rgba(120, 120, 128, 0.12);
}

.dark .app-preview {
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(35, 35, 38, 0.94);
  color: #f4f4f5;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.dark .app-toolbar,
.dark .app-sidebar {
  background: rgba(49, 49, 53, 0.9);
}

.dark .search-pill,
.dark .prompt-line,
.dark .tag-row span {
  color: #b6b6bb;
  background: rgba(255, 255, 255, 0.1);
}

@media (max-width: 767px) {
  .app-body {
    min-height: 120px;
    grid-template-columns: 86px 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .app-preview {
    transition: none;
  }
}
</style>
