<template>
  <v-app id="inspire">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>{{ titleForm }}</v-toolbar-title>
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
                <v-alert
                  v-if="checkedErros"
                  type="error"
                  transition="scale-transition"
                  >{{ errors }}</v-alert
                >
                <v-spacer></v-spacer>
                <!-- <v-btn v-on:click="Login" color="primary">Login</v-btn> -->
                <v-btn
                  v-on:click="login"
                  class="ma-2"
                  color="info"
                  @click="
                    loader = 'loading4';
                    overlay = !overlay;
                  "
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
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-app>
</template>
<script>
import axios from "axios";
export default {
  name: "comp-login",
  data() {
    return {
      titleForm: "Đăng Nhập",
      overlay: false,
      username: "",
      password: "",
      tokenAuth: "",
      errors: "",
      checkedErros: false,
    };
  },
  watch: {
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false;
        }, 3000);
    },
  },
  methods: {
    login() {
      this.checkedErros = false;
      var username = this.username;
      var password = this.password;

      if (username === "" || password === "") {
        console.log("Vui lòng kiểm tra lại username hoặc password");
      } else {
        axios
          .post(
            "https://api.trongnc.com:3001/user/login",
            { username, password },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((result) => {
            this.tokenAuth = result.data.token;
            // console.log(this.tokenAuth);
            this.$cookies.set("cookToken", this.tokenAuth);
            this.$router.replace("/management");
          })
          .catch((error) => {
            const message =
              (error &&
                error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message;
            // console.log(message);
            this.checkedErros = true;
            this.errors = message;
            setTimeout(() => {
              this.checkedErros = false;
            }, 10000);
          });
      }
    },
  },
};
</script>
<style>
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
