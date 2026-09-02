import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // تم التحديث باستخدام البديل الحديث والموصى به رسمياً
        main: resolve(import.meta.dirname, 'index.html'),
        scopeOfWork: resolve(import.meta.dirname, 'src/pages/scope-of-work-agreement/index.html'),
      },
    },
  },
})
