<template>
  <div>
    <v-navigation-drawer app clipped right>
      <v-list dense>
        <v-list-item @click.stop="right = !right">
          <v-list-item-content>
            <v-list-item-title>Thêm ngành</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          :counter="256"
          :rules="nameRules"
          label="Tên nhóm ngành"
          required
        ></v-text-field>
        <v-btn :disabled="!valid" color="success" class="mr-4" @click="add">Thêm</v-btn>
      </v-form>
    </v-navigation-drawer>
    <v-data-table :headers="headers" :items="groups">
      <template v-slot:item.name="props">
        <v-edit-dialog
          :return-value.sync="props.item.name"
          @save="save(props.item.id, props.item.name)"
          @close="close"
        >
          {{ props.item.name }}
          <template v-slot:input>
            <v-text-field
              v-model="props.item.name"
              :rules="[max256chars]"
              label="Edit"
              single-line
              counter
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
      <template v-slot:item.createdAt="props">{{formatDay(props.item.createdAt)}}</template>
      <template v-slot:item.detele="props">
        <span v-on:click="deleteNganh(props.item.id)">
          <v-icon class="icon-delete">mdi-delete</v-icon>
        </span>
      </template>
    </v-data-table>

    <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
      {{ snackText }}
      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" text @click="snack = false">Close</v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
export default {
  name: "comp-nganh",

  data() {
    return {
      valid: true,
      name: "",
      nameRules: [
        v => !!v || "Vui long nhập nhóm ngành",
        v => (v && v.length <= 256) || "Name must be less than 10 characters"
      ],
      snack: false,
      snackColor: "",
      snackText: "",
      max256chars: v => v.length <= 256 || "Input too long!",
      search: "",
      headers: [
        {
          text: "Name",
          align: "start",
          value: "name"
        },
        {
          text: "Create at",
          align: "center",
          value: "createdAt"
        },
        {
          text: "Action",
          align: "end",
          value: "detele"
        }
      ],
      groups: []
    };
  },
  mounted() {
    axios
      .get("http://108.160.141.154:3000/group", {
        headers: {
          Authorization: "Bearer " + this.$cookies.get("cookToken")
        }
      })
      .then(response => {
        this.groups = response.data;
        // console.log(this.$cookies.get("cookToken"));
        // console.log(this.groups);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    deleteNganh(id) {
      // console.log(id);
      axios
        .delete("http://108.160.141.154:3000/group", {
          headers: {
            Authorization: "Bearer " + this.$cookies.get("cookToken")
          },
          params: { id }
        })
        .then(() => {
          this.groups = this.groups.filter(item => item.id !== id);
          // console.log(this.$cookies.get("cookToken"));
          // console.log(this.groups);
        })
        .catch(error => {
          console.log(error);
        });
    },
    save(id, name) {
      axios
        .put(
          "http://108.160.141.154:3000/group",
          { name },
          {
            headers: {
              Authorization: "Bearer " + this.$cookies.get("cookToken")
            },
            params: { id }
          }
        )
        .then(() => {
          this.groups = this.groups.map(item => {
            if (item.id === id) {
              return {
                ...item,
                name
              };
            }
            return item;
          });
          this.snack = true;
          this.snackColor = "success";
          this.snackText = "Data saved";
        })
        .catch(error => {
          console.log(error);
        });
    },
    close() {
      console.log("Dialog closed");
    },
    formatDay(d) {
      return moment(d).format("DD-MM-YYYY HH:mm:ss");
    },
    add() {
      axios
        .post(
          "http://108.160.141.154:3000/group",
          { name: this.name },
          {
            headers: {
              Authorization: "Bearer " + this.$cookies.get("cookToken")
            }
          }
        )
        .then(response => {
          this.groups.push(response.data);
          this.name = "";
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style>
.icon-delete:hover {
  color: red;
  cursor: pointer;
  transition: all 0.3s ease;
}
.v-form {
  padding: 10px 10px;
}
</style>