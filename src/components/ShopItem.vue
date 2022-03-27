<template>
  <el-skeleton :loading="isImgLoading" animated>
    <template #template>
      <div style="background-color: white">
        <el-skeleton-item
          variant="image"
          style="width: 215px; height: 224px; display: block; margin: 0 auto"
        />
        <div style="padding: 20px 10px 10px 10px">
          <el-skeleton-item variant="h3" style="width: 50%; display: block" />
          <el-skeleton-item
            variant="h3"
            style="margin-top: 5px; width: 50%; display: block"
          />
          <el-skeleton-item
            variant="text"
            style="margin-top: 5px; width: 100%; height: 20px"
          />
          <el-skeleton-item
            variant="h3"
            style="margin-top: 5px; width: 50%; display: block"
          />
          <el-skeleton-item
            variant="h3"
            style="margin-top: 5px; width: 50%; display: block"
          />
          <div
            style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-top: 16px;
              height: 16px;
            "
          >
            <el-skeleton-item variant="text" style="width: 40%" />
            <el-skeleton-item
              variant="text"
              style="margin-left: 10px; width: 10%"
            />
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <el-card class="item-card">
        <a class="item-card__link" href="#">
          <img
            :src="require(`@/assets/smart${image}.jpg`)"
            alt=""
            class="item-card__img"
          />
          <el-tag class="item-card__img-tag" type="danger">-15%</el-tag>
        </a>
        <div class="item-card__description">
          <div class="price">
            <span class="price__new">86 956 &#8381;</span>
            <span class="price__old">99 990 &#8381;</span>
          </div>
          <div class="e-price">
            <span class="e-price__price">85 251 &#8381;</span>
          </div>
          <div class="specs">
            <p class="specs-text">
              Apple / Смартфон iPhone 12 Pro 128GB / 6.1" / 2532x1170 / OLED /
              128 ГБ
            </p>
          </div>
          <div class="rating">
            <el-rate
              v-model="value"
              disabled
              :colors="['#d409b9', '#d409b9', '#d409b9']"
              :disabled-void-color="'#c2c2c2'"
            />
            <div class="rating__likes">
              {{ Math.floor(Math.random() * (100 - 20)) + 1 }}
            </div>
          </div>
          <div class="payment">
            <el-button class="payment-bg" round>Рассрочка 0-0-6</el-button>
          </div>
          <div class="actions">
            <el-button class="cart">В корзину</el-button>
            <img class="fav" src="../assets/fav.svg" alt="" />
          </div>
        </div>
      </el-card>
    </template>
  </el-skeleton>
</template>

<script>
export default {
  name: "ItemCard",
  props: {
    image: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isImgLoading: true,
    };
  },
  mounted() {
    setTimeout(() => {
      this.isImgLoading = false;
    }, 1000);
  },
};
</script>

<style scoped>
.item-card {
  margin: 0 auto;
  width: 280px;
}
.item-card__link {
  position: relative;
  display: flex;
  justify-content: center;
}
.item-card__img {
  height: 100%;
  width: auto;
  display: inline-block;
}
.item-card__link:hover::before {
  content: "Быстрый просмотр";
  position: absolute;
  display: block;
  font-size: 14px;
  padding: 8px;
  top: 50%;
  border-radius: 20px;
  text-align: center;
  background-color: rgba(247, 247, 247, 0.911);
  color: black;
}
.item-card__img-tag {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 1px 3px;
  font-size: 12px;
  font-weight: 700;
  background-color: #f5e2f2;
  color: #d409b9;
  border-radius: 15px;
}

.item-card__description {
  padding-top: 20px;
}
.price {
  display: flex;
  align-items: center;
}
.price span + span {
  margin-left: 10px;
}
.price__new {
  font-style: 18px;
  font-weight: 700;
  color: black;
}
.price__old {
  font-size: 14px;
  font-weight: 700;
  color: gray;
  text-decoration: line-through;
}
.e-price {
  padding-top: 5px;
}
.e-price__price {
  font-size: 14px;
  font-weight: 700;
  color: #d409b9;
}
.specs {
  padding-top: 5px;
}
.specs-text {
  color: #a5a5a5;
}
.rating {
  display: flex;
  align-items: center;
}
.rating__likes {
  font-size: 14px;
  color: #a5a5a5;
}
.payment-bg {
  background: linear-gradient(55deg, #3bc97d, #f2ff3c);
  color: rgb(32, 32, 32);
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}
.actions {
  padding-top: 15px;
  display: flex;
  align-items: center;
}
.cart {
  background-color: #d409b9;
  color: white;
  border-radius: 10px;
  font-weight: 700;
}
.fav {
  margin-left: 15px;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>