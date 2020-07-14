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
                  <v-text-field
                    id="password"
                    label="Nhập lại password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-on:click="Login" color="primary">Register</v-btn>
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
  name: "comp-resgister",
  data() {
    return {
      titleForm: "Đăng Ký",
      username: "",
      password: "",
    };
  },
  methods: {
    Login() {
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
          .then((result) => console.log(result.data.token))
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
