<template>
  <h2>Vite3 + Vue3 + TS</h2>
  <h2>VueX中的name: {{ $store.state.name }}</h2>

  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>
  <hr />
  <router-link to="/main">首页</router-link>
  <router-link to="/login">登录</router-link>
  <router-view></router-view>
</template>

<script setup lang="ts"></script>

<style scoped></style>
