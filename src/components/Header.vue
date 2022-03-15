<template>
  <header class="header">
    <router-link to="/">
      <p><i class="home icon"></i> GifPedia</p>
    </router-link>
  </header>
</template>
<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  padding: 30px 40px;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 50px;
  background-color: #333;
  p {
    font-size: 2rem;
    color: white;
    font-weight: bold;
    &:hover {
      background: linear-gradient(
        to right,
        hsl(192, 100%, 30%),
        hsl(280, 87%, 60%)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
</style>
