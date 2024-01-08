import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // 如果你在项目中使用了全局的 scss 变量或混入，可以在这里引入
        // 例如：prependData: `@import "path/to/your/global.scss";`
      },
    },
  },
});
