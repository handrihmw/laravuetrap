<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header d-flex">
        <span>
          <h3 class="card-title">
            <i class="fa fa-chart-area"></i> Categories Management
          </h3>
        </span>
        <button class="btn btn-primary btn-sm ml-auto" v-on:click="showModal">
          <span class="fa fa-plus"></span> Add New
        </button>
      </div>
      <div class="card-body">
        <table class="table table-bordered">
          <thead class="text-center">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Category Name</th>
              <th scope="col">Image</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(category, index) in categories" :key="index">
              <th scope="row">{{ index+1 }}</th>
              <td>{{ category.name }}</td>
              <td>
                <img
                  :src="`${$store.state.serverPath}/storage/${category.image}`"
                  class="table-image"
                  alt="image"
                />
              </td>
              <td class="text-center">
                <button type="button" class="btn btn-primary">
                  <i class="far fa-eye"></i>
                </button>
                <button type="button" class="btn btn-success" v-on:click="editCategory(category)">
                  <i class="fas fa-edit"></i>
                </button>
                <button type="button" class="btn btn-danger" v-on:click="deleteCategory(category)">
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <b-modal ref="newCategory" hide-footer title="Add New Category">
      <div class="d-block text-left">
        <form v-on:submit.prevent="createCategory">
          <div class="form-group">
            <label for="name">Name</label>
            <input v-model="categoryData.name" type="text" class="form-control" id="name" />
            <div class="invalid-feedback" v-if="errors.name">{{ errors.name[0] }}</div>
          </div>
          <div class="form-group">
            <label for="image">Choose an Image</label>
            <div v-if="categoryData.image.name">
              <img class="w-150" src ref="newCategoryImgDisplay" />
            </div>
            <input
              type="file"
              v-on:change="attachImage"
              ref="newCategoryImg"
              class="form-control-file"
              id="image"
            />
            <div class="invalid-feedback" v-if="errors.image">{{ errors.image[0] }}</div>
          </div>
          <hr />
          <div class="text-right">
            <button type="button" class="btn btn-danger" v-on:click="hiddenModal">Cancel</button>
            <button type="submit" class="btn btn-primary">
              <span class="fa fa-check"></span> Save
            </button>
          </div>
        </form>
      </div>
    </b-modal>

    <b-modal ref="editCategoryModal" hide-footer title="Edit Category">
      <div class="d-block text-left">
        <form v-on:submit.prevent="updateCategory">
          <div class="form-group">
            <label for="name">Name</label>
            <input v-model="editCategoryData.name" type="text" class="form-control" id="name" />
            <div class="invalid-feedback" v-if="errors.name">{{ errors.name[0] }}</div>
          </div>
          <div class="form-group">
            <label for="image">Choose an Image</label>
            <div>
              <img
                class="w-150"
                :src="`${$store.state.serverPath}/storage/${editCategoryData.image}`"
                ref="editCategoryImgDisplay"
              />
            </div>
            <input
              type="file"
              v-on:change="editAttachImage"
              ref="editCategoryImg"
              class="form-control-file"
              id="image"
            />
            <div class="invalid-feedback" v-if="errors.image">{{ errors.image[0] }}</div>
          </div>
          <hr />
          <div class="text-right">
            <button type="button" class="btn btn-danger" v-on:click="hiddenEditModal">Cancel</button>
            <button type="submit" class="btn btn-primary">
              <span class="fa fa-check"></span> Update
            </button>
          </div>
        </form>
      </div>
    </b-modal>

    <!-- <b-modal ref="deleteCategoryModal" hide-footer title="Delete Category">
      <div class="d-block text-center">
        <form v-on:submit.prevent="deleteCategory">
          <div class="form-group">
            <label for="name">Apakah Anda ingin menghapus data?</label>
          </div>
          <hr />
          <div class="text-right">
            <button type="button" class="btn btn-danger" v-on:click="hiddenDeleteModal">Cancel</button>
            <button type="submit" class="btn btn-primary">
              <span class="fa fa-trash"></span> Delete
            </button>
          </div>
        </form>
      </div>
    </b-modal>-->
  </div>
</template>

<script>
import * as categoryService from "../services/category_service";
export default {
  name: "category",
  data() {
    return {
      categories: [],
      categoryData: {
        name: "",
        image: ""
      },
      editCategoryData: {},
      errors: {}
    };
  },
  mounted() {
    this.loadCategory();
  },
  methods: {
    loadCategory: async function() {
      try {
        const response = await categoryService.loadCategory();
        console.log(response);
        this.categories = response.data.data;
        console.log(this.categories);
      } catch (error) {
        this.flashMessage.error({
          message: "Gagal Menampilkan Data",
          time: 5000
        });
      }
    },
    attachImage() {
      this.categoryData.image = this.$refs.newCategoryImg.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function() {
          this.$refs.newCategoryImgDisplay.src = reader.result;
        }.bind(this),
        false
      );
      reader.readAsDataURL(this.categoryData.image);
    },
    hiddenModal() {
      this.$refs.newCategory.hide();
    },
    showModal() {
      this.$refs.newCategory.show();
    },
    createCategory: async function() {
      let formData = new FormData();
      formData.append("name", this.categoryData.name);
      formData.append("image", this.categoryData.image);

      try {
        const response = await categoryService.createCategory(formData);
        // console.log(response)
        this.categories.unshift(response.data);
        this.hiddenModal();
        this.flashMessage.success({
          message: "Data Berhasil Disimpan",
          time: 5000
        });
        this.categoryData = {
          name: "",
          image: ""
        };
      } catch (error) {
        // console.log(error.response.status)
        switch (error.response.status) {
          case 422:
            this.errors = error.response.data.errors;
            break;
          default:
            this.flashMessage.error({
              message: "Data Gagal Disimpan",
              time: 5000
            });
            break;
        }
      }
    },
    // showDeleteModal() {
    //   this.$refs.deleteCategoryModal.show();
    // },
    // hiddenDeleteModal() {
    //   this.$refs.deleteCategoryModal.hide();
    // },
    deleteCategory: async function(category) {
      if (
        !window.confirm(`Apakah anda yakin ingin menghapus ${category.name}?`)
      ) {
        return;
      }

      try {
        await categoryService.deleteCategory(category.id);

        this.categories = this.categories.filter(obj => {
          return obj.id != category.id;
        });

        this.flashMessage.success({
          message: "Data Berhasil Dihapus",
          time: 5000
        });
      } catch (error) {
        this.flashMessage.error({
          message: error.response.data.message,
          time: 5000
        });
      }
    },
    hiddenEditModal() {
      this.$refs.editCategoryModal.hide();
    },
    showEditModal() {
      this.$refs.editCategoryModal.show();
    },
    editCategory(category) {
      this.editCategoryData = { ...category };
      this.showEditModal();
    },
    editAttachImage() {
      this.editCategoryData.image = this.$refs.editCategoryImg.files[0];
      let reader = new FileReader();
      reader.addEventListener(
        "load",
        function() {
          this.$refs.editCategoryImgDisplay.src = reader.result;
        }.bind(this),
        false
      );
      reader.readAsDataURL(this.editCategoryData.image);
    },
    updateCategory: async function() {
      try {
        const formData = new FormData();
        formData.append("name", this.editCategoryData.name);
        formData.append("image", this.editCategoryData.image);
        formData.append("_method", "put");

        const response = await categoryService.updateCategory(
          this.editCategoryData.id,
          formData
        );
        this.categories.map(category => {
          if (category.id == response.data.id) {
            for (let key in response.data) {
              category[key] = response.data[key];
            }
          }
        });
        this.hiddenEditModal();
        this.flashMessage.success({
          message: "Data Berhasil Diupdate",
          time: 5000
        });
      } catch (error) {
        this.flashMessage.error({
          message: error.response.data.message,
          time: 5000
        });
      }
    }
  }
};
</script>