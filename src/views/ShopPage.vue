<template>
  <Header :activeIndex="`/shop`" />
  <el-main>
    <div class="shop__items">
      <ItemCard
        v-for="i in 6"
        :key="i"
        :image="Math.floor(Math.random() * (4 - 1)) + 1"
        :value="Math.floor(Math.random() * (6 - 1)) + 1"
      />
    </div>
  </el-main>
</template>

<script>
import Header from "@/components/Header";
import ItemCard from "@/components/ShopItem";
export default {
  components: {
    Header,
    ItemCard,
  },
};
</script>

<style scoped>
.shop__items {
  display: grid;
  grid-template-columns: repeat(auto-fill, 280px);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
  justify-content: center;
}
</style>