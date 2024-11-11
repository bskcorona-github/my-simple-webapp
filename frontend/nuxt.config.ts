// nuxt.config.ts
export default defineNuxtConfig({
  css: ['@/assets/css/global.css'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/color-mode'], // color-modeモジュールの追加
  colorMode: {
    preference: 'system', // ユーザーのシステム設定をデフォルトに
    fallback: 'light',     // カラーモードが不明な場合はライトモードを使用
    classSuffix: '',       // クラス名を `dark` と `light` のみにする
  },
  app: {
    head: {
      titleTemplate: 'NuxtNextApp  - %s ',
  }
}
})  
