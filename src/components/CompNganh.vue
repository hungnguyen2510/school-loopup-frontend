<template>
  <div id="app">
    <v-app id="inspire">
      <div>
        <v-toolbar flat color="white">
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.id" label="ID"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.groupID" label="GroupID"></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field v-model="editedItem.description" label="Description"></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-data-table :headers="headers" :items="dataNganh" class="elevation-1">
          <template v-slot:item.description="props">
            <span class="truncate">{{props.item.description | truncate(100)}}</span>
          </template>
          <template v-slot:item.action="props">
            <v-icon
              v-on:click="deleteItem(props.item.id,props.item.name)"
              class="icon-delete"
            >mdi-delete</v-icon>
            <v-icon v-on:click="editItem(props.item.name)" class="icon-delete">mdi-table-edit</v-icon>
          </template>
        </v-data-table>
      </div>
    </v-app>
  </div>
</template>


<script>
import axios from "axios";
// import moment from "moment";
export default {
  name: "comp-nganh",
  data: () => ({
    dialog: false,
    headers: [
      { text: "Mã Ngành", value: "code" },
      {
        text: "Tên Ngành",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Mã Nhóm Ngành", value: "groupId" },
      { text: "Mô Tả", value: "description" },
      {
        text: "Action",
        align: "end",
        value: "action"
      }
    ],
    dataNganh: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      code: "",
      groupID: "",
      description: ""
    },
    defaultItem: {
      id: "",
      name: "",
      code: "",
      description: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios
        .get("http://108.160.141.154:3000/industry", {
          headers: {
            Authorization: "Bearer " + this.$cookies.get("cookToken")
          }
        })
        .then(response => {
          this.dataNganh = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },

    editItem(item) {
      console.log(item);
      this.dialog = true;
    },

    deleteItem(id, name) {
      // const index = this.dataNganh.indexOf(item);
      confirm("Bạn có muốn xóa ngành?" + " " + name) &&
        axios
          .delete("http://108.160.141.154:3000/industry", {
            headers: {
              Authorization: "Bearer " + this.$cookies.get("cookToken")
            },
            params: { id }
          })
          .then(() => {
            this.dataNganh = this.dataNganh.filter(item => item.id !== id);
            // console.log(this.$cookies.get("cookToken"));
            // console.log(this.groups);
          })
          .catch(error => {
            console.log(error);
          });
      // console.log(item);
      //   this.dataNganh.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.dataNganh[this.editedIndex], this.editedItem);
      } else {
        this.dataNganh.push(this.editedItem);
      }
      this.close();
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
.truncate {
  max-width: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>