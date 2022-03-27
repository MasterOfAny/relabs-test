<template>
  <div class="login-card">
    <el-card>
      <h1 class="login-header">Авторизация</h1>
      <el-form
        label-position="top"
        class="login-form"
        :model="loginData"
        :rules="rules"
        ref="loginFormRef"
        label-width="120px"
        validate-on-rule-change
        @submit.prevent="login"
      >
        <el-form-item class="input-field" prop="email">
          <el-input
            type="email"
            v-model="loginData.email"
            placeholder="Почта"
            :readonly="loading"
          ></el-input>
        </el-form-item>

        <el-form-item class="input-field" prop="password">
          <el-input
            type="password"
            v-model="loginData.password"
            placeholder="Пароль"
            :readonly="loading"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            block
          >
            Войти
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    let validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Пожалуйста, введите адрес почты"));
      } else if (
        !value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        callback(new Error("Введите корректный адрес почты"));
      } else {
        callback();
      }
    };
    let validatePassword = (rule, value, callback) => {
      this.loginData.password = value.trim();
      if (value.trim() === "") {
        callback(new Error("Пожалуйста, введите пароль"));
      } else if (value.trim().length < 8) {
        callback(new Error("Длина пароля должна быть не менее 8 символов"));
      } else if (value.trim().replace(/[^A-Z]/g, "").length === 0) {
        callback(
          new Error("Пароль должен содержать хотя бы 1 заглавную букву")
        );
      } else {
        callback();
      }
    };
    return {
      loginData: {
        email: "",
        password: "",
      },
      loading: false,
      rules: {
        email: [{ required: true, validator: validateEmail, trigger: "blur" }],
        password: [
          { required: true, validator: validatePassword, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    simulateLogin() {
      return new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
    },
    async login() {
      let valid = await this.$refs.loginFormRef.validate();
      if (!valid) return false;
      this.loading = true;
      this.$store.state.isLogged = true;
      await this.simulateLogin();
      this.$router.push({ path: "/" });
      this.loading = false;
    },
  },
};
</script>
<style scoped>
.input-field {
  margin-bottom: 25px;
}
label {
  font-size: 18px !important;
  line-height: 18px !important;
}
.login-card {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.login-card .el-card {
  width: 340px;
  display: flex;
  justify-content: center;
}
.el-card__body {
  display: flex;
  justify-content: center;
  width: 100%;
}
.login-header {
  font-size: 24px;
  line-height: 36px;
  margin-bottom: 16px;
  text-align: center;
}
.login-button {
  width: 100%;
  margin-top: 20px;
}
.el-form-item__content {
  justify-content: center;
}
.el-form-item__error {
  left: auto;
  right: 0;
}
</style>
