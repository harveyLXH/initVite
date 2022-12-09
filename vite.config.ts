import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import eslintPlugin from 'vite-plugin-eslint'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
const pathSrc = resolve(__dirname, 'src')

//文档： https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 根据当前工作目录中的 `mode` 加载 .env 文件
  // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd())
  return {
    // vite 配置
    define: {
      'process.env': env // 将属性转化为全局变量，让代码中可以正常访问
    },
    css: {
      preprocessorOptions: {
        // 导入scss/less/stylus与编译程序
        // scss: {
        //   additionalData: `@use "../scss"`
        // },
      }
    },
    plugins: [
      vue(),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      // eslint 验证
      eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.vue', 'src/*.js', 'src/*.ts', 'src/*.vue']
      }),
      AutoImport({
        // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
        resolvers: [
          ElementPlusResolver({
            // 自动导入修改主题色需要添加预编译样式
            // importStyle: 'sass'
          })
        ],
        // 配置自动引入的.d.ts文件存放的位置
        dts: resolve(pathSrc, 'auto-imports.d.ts')
      }),
      Components({
        // 自动导入 Element Plus 组件
        resolvers: [
          ElementPlusResolver({
            // 自动导入修改主题色需要添加预编译样式
            // importStyle: 'sass'
          })
        ],
        // 配置自动引入的.d.ts文件存放的位置
        dts: resolve(pathSrc, 'components.d.ts')
      })
    ],
    resolve: {
      alias: [
        { find: '@', replacement: pathSrc },
        { find: 'components', replacement: '@/components' },
        { find: 'img', replacement: 'src/assets/img/' }
      ],
      extensions: ['.js', '.ts', '.json', 'tsx']
    },
    base: './', // 相当于 assetsPublicPath: './
    server: {
      host: '0.0.0.0',
      open: true, // 项目启动时自动打开浏览器
      // port: 8080, // 设置端口号 默认是:3000
      hmr: true, // 配置热更新
      // 配置代理
      proxy: {
        '^/api': {
          target: '',
          pathRewrite: {
            '^/api': ''
          },
          changeOrigin: true
        }
      },
      historyApiFallback: true
    },
    build: {
      outDir: 'build', // 输出路径
      sourcemap: false, // 不打包sourcemap文件
      target: 'es2015', // 默认 "modules"
      assetsDir: 'assets', // 静态资源目录
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        output: {
          comments: true
        }
      }
    },
    // 引入第三方配置
    optimizeDeps: {
      include: []
    }
  }
})
