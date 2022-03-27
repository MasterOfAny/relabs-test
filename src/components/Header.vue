<template>
  <el-header>
    <el-menu
      :default-active="activeIndex"
      @select="handleSelect"
      class="menu"
      mode="horizontal"
      :router="true"
    >
      <el-menu-item index="/">Главная страница</el-menu-item>
      <el-menu-item index="/login">Авторизация</el-menu-item>
      <el-menu-item index="/shop">Магазин</el-menu-item>
    </el-menu>
  </el-header>
</template>

<script>
export default {
  name: "Header",
  props: {
    activeIndex: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleSelect(key) {
      console.log(key);
    },
  },
};
</script>
