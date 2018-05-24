<template>
  <div>
    <h2 v-if="login">已登陆</h2>
    <h2 v-else>未登陆</h2>

    <a v-if="!login" @click="requestSmsCode">登陆</a>
    <a v-else @click="back">返回主页</a>
  </div>
</template>

<script>
import AV from "leancloud-storage";
export default {
  name: "Login",
  data() {
    return {
      login: false
    };
  },
  async mounted() {
    if (AV.User.current()) this.login = true;
  },
  methods: {
    async requestSmsCode() {
      const user = new AV.User();
      user.setUsername(prompt("账号", ""));
      user.setPassword(prompt("密码", ""));
      try {
        await user.signUp();
        this.login = true;
      } catch (error) {
        console.log(error);
        alert("失败");
      }
    },
    back() {
      this.$router.push("/");
    }
  }
};
</script>


<style scoped>
a {
  color: #fff;
  background: #42b983;
  display: inline-block;
  border-radius: 3px;
  padding: 5px 15px 5px 15px;
  cursor: pointer;
}
</style>
