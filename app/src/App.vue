<template>
  <div id="app">
    <h1>MaterialsMine</h1>
    <nav>
      <router-link to="/">Home</router-link> | <router-link to="/about">About</router-link> |
      <router-link to="/test">Test Suite</router-link> |
      <router-link to="/new-components">New Components</router-link> |
      <router-link to="/css-migration">CSS Migration</router-link> |
      <router-link to="/tabs-theme">Tabs Theme</router-link> |
      <router-link to="/snackbar-theme">Snackbar Theme</router-link> |
      <router-link to="/button-theme">Button Theme</router-link> |
      <router-link to="/icon-theme">Icon Theme</router-link> |
      <router-link to="/drawer-theme">Drawer Theme</router-link> |
      <router-link to="/content-theme">Content Theme</router-link> |
      <router-link to="/layout-theme">Layout Theme</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style lang="scss">
@import './assets/css/style.scss';

// Add Material Icons font
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>
