<template>
  <div id="app">
    <v-app id="inspire">
      <CompLeftNavBar></CompLeftNavBar>
      <div>
        <v-toolbar flat color="white">
          <v-toolbar-title>Thông Tin</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Tìm kiếm..."
            single-line
            hide-details
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogAdd" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-on="on"
                v-on:click="dialogAdd = true"
                >Thêm Nhóm Ngành Mới</v-btn
              >
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Thêm Nhóm Ngành Mới</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-text-field
                      v-model="addedItem.name"
                      label="Tên nhóm ngành"
                      autofocus
                    ></v-text-field>
                  </v-layout>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click="close">Hủy</v-btn>
                <v-btn color="blue darken-1" @click="save">Lưu</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogEdit" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">Sửa nhóm ngành</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-text-field
                      v-model="editedItem.name"
                      label="Tên nhóm ngành"
                      autofocus
                    ></v-text-field>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click="close">Hủy</v-btn>
                <v-btn color="blue darken-1" @click="save">Lưu</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-data-table
          :headers="headers"
          :items="dataNhomNganh"
          :items-per-page="10"
          :search="search"
          class="elevation-1"
        >
          <template v-slot:item.createdAt="props">
            <span>{{ formatDay(props.item.createdAt) }}</span>
          </template>
          <template v-slot:item.action="props">
            <v-icon
              v-on:click="
                dialogEdit = true;
                editedItem.name = props.item.name;
                editedItem.id = props.item.id;
              "
              class="icon-edit"
              >mdi-table-edit</v-icon
            >
            <v-icon v-on:click="deleteItem(props.item.id)" class="icon-delete"
              >mdi-delete</v-icon
            >
          </template>
        </v-data-table>
      </div>
    </v-app>
  </div>
</template>
<script>
import axios from "axios";
import CompLeftNavBar from "./CompLeftNavBar";
import moment from "moment";
export default {
  name: "comp-nhomnganh",
  components: {
    CompLeftNavBar,
  },
  data: () => ({
    search: "",
    dialogAdd: false,
    dialogEdit: false,
    drawer: null,
    headers: [
      // { text: "Mã Nhóm Ngành", value: "id" },
      {
        text: "Tên Nhóm Ngành",
        align: "left",
        sortable: false,
        value: "name",
      },
      { text: "Ngày Tạo", value: "createdAt" },
      {
        text: "Action",
        align: "end",
        value: "action",
      },
    ],
    dataNhomNganh: [],
    addedItem: {
      name: "",
    },
    editedItem: {
      id: "",
      name: "",
    },
    defaultItem: {
      id: "",
      name: "",
      createdAt: "",
    },
  }),
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      axios
        .get("http://108.160.141.154:3000/group", {
          headers: {
            Authorization: "Bearer " + this.$cookies.get("cookToken"),
          },
        })
        .then((response) => {
          this.dataNhomNganh = response.data;
          // console.log(this.$cookies.get("cookToken"));
          // console.log(this.groups);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addItem() {
      axios
        .post(
          "http://108.160.141.154:3000/group",
          { name: this.addedItem.name },
          {
            headers: {
              Authorization: "Bearer " + this.$cookies.get("cookToken"),
            },
          }
        )
        .then((response) => {
          this.dataNhomNganh.push(response.data);
          this.name = "";
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteItem(id, name) {
      // console.log(id);
      confirm("Bạn có muốn xóa ngành?" + " " + name) &&
        axios
          .delete("http://108.160.141.154:3000/group", {
            headers: {
              Authorization: "Bearer " + this.$cookies.get("cookToken"),
            },
            params: { id },
          })
          .then(() => {
            this.dataNhomNganh = this.dataNhomNganh.filter(
              (item) => item.id !== id
            );
          })
          .catch((error) => {
            console.log(error);
          });
    },

    editItem(id, name) {
      axios
        .put(
          "http://108.160.141.154:3000/group",
          { name },
          {
            headers: {
              Authorization: "Bearer " + this.$cookies.get("cookToken"),
            },
            params: { id },
          }
        )
        .then(() => {
          this.dataNhomNganh = this.dataNhomNganh.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                name,
              };
            }
            return item;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    save() {
      // console.log(this.dialogAdd);
      if (this.dialogAdd === true) {
        this.addItem();
      } else {
        this.editItem(this.editedItem.id, this.editedItem.name);
      }
      this.close();
    },
    formatDay(d) {
      return moment(d).format("DD-MM-YYYY HH:mm:ss");
    },
    close() {
      this.dialogAdd = false;
      this.dialogEdit = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.addedItem = Object.assign({}, this.defaultItem);
      }, 300);
    },
  },
};
</script>

<style>
.icon-delete:hover {
  color: red;
  cursor: pointer;
  transition: all 0.3s ease;
}
.icon-edit:hover {
  color: blue;
  cursor: pointer;
  transition: all 0.3s ease;
}
.v-form {
  padding: 10px 10px;
}
.linkMenu {
  text-decoration: none;
}
</style>
