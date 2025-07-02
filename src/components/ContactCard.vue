<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const formData = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  
  // Simulate form submission (frontend only)
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Reset form
  formData.value = {
    name: '',
    email: '',
    message: ''
  }
  
  isSubmitting.value = false
  
  // Show success message (could be enhanced with a toast notification)
  alert('Message sent successfully!')
}
</script>

<template>
  <HoverCard>
    <HoverCardTrigger asChild>
      <Button variant="outline" class="h-9 w-9 p-0">
        <Icon icon="lucide:mail" class="h-[1.2rem] w-[1.2rem]" />
        <span class="sr-only">Contact</span>
      </Button>
    </HoverCardTrigger>
    <HoverCardContent class="w-80" align="end">
      <div class="space-y-4">
        <div>
          <h4 class="text-sm font-semibold">Get in Touch</h4>
          <p class="text-sm text-muted-foreground">
            Send me a message and I'll get back to you soon!
          </p>
        </div>
        <form @submit.prevent="handleSubmit" class="space-y-3">
          <div>
            <label for="name" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Name
            </label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Your name"
            />
          </div>
          <div>
            <label for="email" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Email
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              class="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label for="message" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Message
            </label>
            <textarea
              id="message"
              v-model="formData.message"
              required
              rows="3"
              class="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Your message..."
            />
          </div>
          <Button 
            type="submit" 
            class="w-full" 
            :disabled="isSubmitting"
          >
            <Icon 
              v-if="isSubmitting" 
              icon="lucide:loader-2" 
              class="h-4 w-4 mr-2 animate-spin" 
            />
            {{ isSubmitting ? 'Sending...' : 'Send Message' }}
          </Button>
        </form>
      </div>
    </HoverCardContent>
  </HoverCard>
</template>

<style scoped>
button {
  cursor: pointer;
}
</style>