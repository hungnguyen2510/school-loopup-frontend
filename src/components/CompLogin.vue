<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>{{titleForm}}</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Username"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="username"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <!-- <v-btn v-on:click="Login" color="primary">Login</v-btn> -->
                <v-btn
                  v-on:click="login"
                  class="ma-2"
                  :loading="loading"
                  :disabled="loading"
                  color="info"
                  @click="loader = 'loading4'"
                >
                  Đăng Nhập
                  <template v-slot:loader>
                    <span class="custom-loader">
                      <span>Đăng nhập...</span>
                    </span>
                  </template>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  name: "comp-login",
  data() {
    return {
      titleForm: "Đăng Nhập",
      username: "",
      password: "",
      tokenAuth: "",
      loading: false
    };
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    }
  },
  methods: {
    login() {
      this.loading = true;
      var username = this.username;
      var password = this.password;

      if (username === "" || password === "") {
        console.log("Vui lòng kiểm tra lại username hoặc password");
        this.loading = false;
      } else {
        axios
          .post(
            "http://108.160.141.154:3000/user/login",
            { username, password },
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
          .then(result => {
            this.tokenAuth = result.data.token;
            // console.log(this.tokenAuth);
            this.$cookies.set("cookToken", this.tokenAuth);
            this.$router.replace("/management");
          })
          .catch(error => {
            const message =
              (error &&
                error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message;
            console.log(message);
            this.loading = false;
          });
      }
    }
  }
};
</script>
<style >
/* .custom-loader {
  animation: loader 1s infinite;
  display: flex;
} */
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>