<template>
    <div class="card">
      <div class="card-header pb-0">
        <h6>Danh sách tài khoản quản lý doanh nghiệp</h6>
      </div>
      <div class="card-body px-0 pt-0 pb-2">
        <div class="table-responsive p-0">
          <table class="table align-items-center mb-0">
            <thead>
              <tr class="text-dark">
                <th>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="selectedAll" />
                    <label :for="id" class="custom-control-label">
                      <slot />
                    </label>
                  </div>
                </th>
                <th class="text-uppercase text-dark text-xxs font-weight-bolder opacity-7">Thông tin tài khoản</th>
                <th class="text-uppercase text-xxs font-weight-bolder opacity-7 ps-2">Số lượng tài khoản doanh nghiệp đăng ký</th>
                <th class="text-center text-uppercase text-xxs font-weight-bolder opacity-7">Trạng thái
                </th>
                <th class="text-uppercase text-xxs font-weight-bolder opacity-7 ps-2">Số lượng tài khoản Active
                </th>
                <th class="text-uppercase text-xxs font-weight-bolder opacity-7 ps-2">Số lượng tài khoản Deactive</th>
                <th class="text-uppercase text-xxs font-weight-bolder opacity-7 ps-2">Chức năng giới hạn</th>
                <th class="text-center text-uppercase text-xxs font-weight-bolder opacity-7">#</th>
                <th class="opacity-7"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="manager in managers" :key="manager.uid">
                <td>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" v-model="selected" :value="manager.uid" />
                    <label :for="id" class="custom-control-label">
                      <slot />
                    </label>
                  </div>
                </td>
                <td>
                  <div class="d-flex px-2 py-1">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-0 text-sm">{{ manager.name }}</h6>
                      <p class="text-xs text-secondary mb-0"> {{ manager.email }}</p>
                      <p class="text-xs text-secondary mb-0">{{ manager.password }}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="text-secondary text-xs font-weight-bold">{{ manager.power }}</span>
                </td>
                <td class="align-middle text-center text-sm">
                  <span class="badge badge-sm bg-gradient-success">Online</span>
                </td>
                <td class="align-middle text-center">
                  <span class="text-secondary text-xs font-weight-bold"> {{ manager.usage_time }}</span>
                </td>
                <td class="align-middle text-center">
                  <span class="text-secondary text-xs font-weight-bold">{{ manager.role }}</span>
                </td>                
                <td class="align-middle text-center">
                  <span class="text-secondary text-xs font-weight-bold">{{ manager.function }}</span>
                </td>
                <td class="align-middle">
                  <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                    data-original-title="Edit user">Edit</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex pb-0 px-3 p-3">
          <div class="">
            Tổng số: <strong>{{ totalRecord }}</strong> bản ghi
          </div>
          <div class="ms-auto text-end">
            <Paginate v-model="pageNumber" :page-count="totalPage" :page-range="3" :margin-pages="1"
              :click-handler="clickCallback" :prev-text="'Trước'" :next-text="'Sau'" :container-class="'paginate'"
              :page-class="'page-item'" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import * as APIConstant from "@/const/api.const";
  import Paginate from "@/libs/vuejs-paginate-next";
  import Cookies from "js-cookie";

  export default {
    name: "managers-table",
    components: {
      Paginate,
  
    },
    data() {
      return {
        managers: [],
        totalRecord: 0,
        pageNumber: 1,
        totalPage: 0,
        selected: [],
      }
    },
    computed: {
      selectedAll: {
        get: function () {
          return this.selected.length == this.managers.length ? true : false;
        },
        set: function (value) {
          var selected = [];
  
          if (value) {
            this.managers.forEach(function (manager) {
              selected.push(manager.uid);
            });
          }
          this.selected = selected;
        },
      },
    },
    /**
     * Lấy dữ liệu người dùng hệ thống khi component được tạo thành công
     * Author: TTHIEN (31/01/2023)
     */
    created() {
      this.filterManagers();
    },
    methods: {
      /**
       * Lấy dữ liệu cho việc tìm kiếm/ phân trang tài khoản quản lý doanh nghiệp
       * Author: TTHIEN (08/02/2023)
       */
       filterManagers() {
        try {
          axios
            .get(APIConstant.BASE_URL + APIConstant.GET_MANAGER_LIST + `?page=${this.pageNumber}`,
              {
                headers: { 'Authorization': 'Bearer ' + Cookies.get(APIConstant.KEY_TOKEN) }
              })
            .then((response) => {
              console.log(response);
              this.managers = response.data.data;
              this.totalPage = response.data.total_page;
              this.totalRecord = response.data.total;
              this.pageNumber = response.data.page;
            })
            .catch((error) => {
              console.log(error);
            })
  
        } catch (error) {
          console.log(error);
        }
      },
      /**
       * Hàm phân trang pre và next
       * Author: TTHIEN (01/02/2023)
       */
      clickCallback(pageNumber) {
        console.log("chuyển trang");
        console.log(pageNumber);
        this.pageNumber = pageNumber;
        this.filterUsers();
      },
  
    }
  };
  </script>
  
  <style lang="css">
  /* Adopt bootstrap pagination stylesheet. */
  /* @import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"; */
  </style>
  