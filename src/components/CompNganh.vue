<template>
  <div id="app">
    <v-app id="inspire">
      <div>
        <v-toolbar flat color="white">
          <v-toolbar-title>Thông Tin</v-toolbar-title>
          <v-divider class="mx-2" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialogAdd" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-on="on"
                v-on:click="dialogAdd = true"
              >Thêm Ngành Mới</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Thêm Ngành Mới</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-text-field v-model="addedItem.code" label="Mã ngành" autofocus></v-text-field>
                  <v-text-field v-model="addedItem.name" label="Tên ngành"></v-text-field>
                  <label>Chọn nhóm ngành:</label>
                  <select v-model="addedItem.groupId" style="border:1px solid #ccc;padding:5px">
                    <option
                      v-for="(item,index) in dataNhomNganh"
                      v-bind:value="item.value"
                      v-bind:key="index"
                    >{{ item.text }}</option>
                  </select>
                  <v-textarea
                    v-model="addedItem.description"
                    label="Mô tả ngành"
                    row-height="50"
                    auto-grow
                  ></v-textarea>
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
                <v-container>
                  <v-row>
                    <v-col>
                      <v-text-field v-model="editedItem.id" label="ID ngành" disabled></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <!-- <v-text-field v-model="editedItem.groupId" label="GroupID" disabled></v-text-field> -->
                      <label>Chọn nhóm ngành:</label>
                      <select
                        v-model="editedItem.groupId"
                        style="border:1px solid #ccc;padding:5px"
                      >
                        <option
                          v-for="(item,index) in dataNhomNganh"
                          v-bind:value="item.value"
                          v-bind:key="index"
                        >{{ item.text }}</option>
                      </select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field v-model="editedItem.code" label="Mã ngành" autofocus></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field v-model="editedItem.name" label="Tên ngành"></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-textarea
                        v-model="editedItem.description"
                        label="Mô tả ngành"
                        auto-grow
                        row-height="50"
                      ></v-textarea>
                    </v-col>
                  </v-row>
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
        <v-data-table :headers="headers" :items="dataNganh" class="elevation-1">
          <template v-slot:item.description="props">
            <span class="truncate">{{props.item.description | truncate(100)}}</span>
          </template>
          <template v-slot:item.action="props">
            <v-icon
              v-on:click="dialogEdit = true;
              editedItem.id = props.item.id;
              editedItem.groupId = props.item.groupId;
              editedItem.code = props.item.code;
              editedItem.name = props.item.name;
              editedItem.description = props.item.description;"
              class="icon-edit"
            >mdi-table-edit</v-icon>
            <v-icon
              v-on:click="deleteItem(props.item.id,props.item.name)"
              class="icon-delete"
            >mdi-delete</v-icon>
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
    dialogAdd: false,
    dialogEdit: false,
    headers: [
      { text: "Mã Ngành", value: "code" },
      {
        text: "Tên Ngành",
        align: "left",
        sortable: false,
        value: "name"
      },
      { text: "Tên Nhóm Ngành", value: "groupName" },
      { text: "Mô Tả", value: "description" },
      {
        text: "Action",
        align: "end",
        value: "action"
      }
    ],
    dataNganh: [],
    dataNhomNganh: [],
    addedItem: {
      name: "",
      code: "",
      groupId: "",
      description: ""
    },
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

  created() {
    this.initialize();
    this.getThongTinNhomNganh();
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
    getThongTinNhomNganh() {
      axios
        .get("http://108.160.141.154:3000/group", {
          headers: {
            Authorization: "Bearer " + this.$cookies.get("cookToken")
          }
        })
        .then(response => {
          this.dataNhomNganh = response.data.map(item => ({
            text: item.name,
            value: item.id
          }));
          this.addedItem.groupId = response.data[0].id;
          // console.log(this.dataNhomNganh);
        })
        .catch(error => {
          console.log(error);
        });
    },
    addItem() {
      // console.log(this.addedItem);
      axios
        .post("http://108.160.141.154:3000/industry", this.addedItem, {
          headers: {
            Authorization: "Bearer " + this.$cookies.get("cookToken"),
            "Content-Type": "application/json"
          }
        })
        .then(response => {
          this.dataNganh.push(response.data);
          this.name = "";
        })
        .catch(error => {
          console.log(error);
        });
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
          })
          .catch(error => {
            console.log(error);
          });
    },
    editItem(id, groupId, code, name, description) {
      // console.log(id, groupID, code, name, description);
      axios
        .put(
          "http://108.160.141.154:3000/industry",
          { name, code, groupId, description },
          {
            headers: {
              Authorization: "Bearer " + this.$cookies.get("cookToken")
            },
            params: { id }
          }
        )
        .then(response => {
          this.dataNganh = this.dataNganh.map(item => {
            if (item.id === id) {
              return {
                ...item,
                name,
                code,
                groupName: response.data.groupName,
                groupId,
                description
              };
            }
            return item;
          });
        })
        .catch(error => {
          console.log(error);
        });
    },

    save() {
      if (this.dialogAdd === true) {
        this.addItem();
      } else {
        this.editItem(
          this.editedItem.id,
          this.editedItem.groupId,
          this.editedItem.code,
          this.editedItem.name,
          this.editedItem.description
        );
      }
      this.close();
    },
    close() {
      this.dialogAdd = false;
      this.dialogEdit = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
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
.icon-edit:hover {
  color: blue;
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