import type { UserModule } from './types'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

// https://github.com/antfu/vite-ssg
const app = createApp(App)

app.use(router)

// install all modules under `modules/`
Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
  .forEach(i => i.install?.(app, router))
// ctx.app.use(Previewer)

app.mount('#app')
