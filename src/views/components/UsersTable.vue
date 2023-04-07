<template>
  <div class="row">
    <div class="col-md-7 ms-5">
      <div class="card">
        <div class="card-header pb-0">
          <h6>Danh sách người dùng hệ thống</h6>
        </div>
        <div class="card-body px-0 pt-0 pb-2">
          <div class="table-responsive p-0">
            <table class="table align-items-center mb-0">
              <thead>
                <tr>
                  <th>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" v-model="selectedAll" />
                      <!-- <label :for="id" class="custom-control-label">
                    <slot />
                  </label> -->
                    </div>
                  </th>
                  <th class="text-uppercase text-dark  text-xxs font-weight-bolder ">Thông tin cá nhân</th>
                  <th class="text-uppercase text-dark  text-xxs font-weight-bolder  ps-2">Cấp tài khoản</th>
                  <th class="text-center text-uppercase text-dark  text-xxs font-weight-bolder ">Trạng thái
                  </th>
                  <th class="text-uppercase text-dark  text-xxs font-weight-bolder  ps-2">Thời gian sử dụng
                  </th>
                  <th class="text-uppercase text-dark  text-xxs font-weight-bolder  ps-2">Chức vụ</th>
                  <th class="text-uppercase text-dark  text-xxs font-weight-bolder  ps-2">Công việc</th>
                  <th class="text-uppercase text-dark  text-xxs font-weight-bolder  ps-2">Số người trong
                    doanh
                    nghiệp</th>
                  <th class="text-uppercase text-dark  text-xxs font-weight-bolder  ps-2">Nội dung pháp lý
                    quan
                    tâm</th>
                  <th class="text-uppercase text-dark  text-xxs font-weight-bolder  ps-2">Chức năng được thực
                    hiện</th>
                  <th class="text-center text-uppercase text-dark  text-xxs font-weight-bolder ">#</th>
                  <th class="text-dark  "></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.uid" class="custom-tr">
                  <td>
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" v-model="selected" :value="user.uid" />
                      <!-- <label :for="id" class="custom-control-label">
                    <slot />
                  </label> -->
                    </div>
                  </td>
                  <td>
                    <div class="d-flex px-2 py-1">
                      <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">{{ user.name }}</h6>
                        <p class="text-xs text-dark mb-0"> {{ user.email }}</p>
                        <p class="text-xs text-dark mb-0">{{ user.phone_number }}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="text-dark text-xs font-weight-bold">{{ user.power }}</span>
                  </td>
                  <td class="align-middle text-center text-sm">
                    <span class="badge badge-sm "
                      :class="`${user.state === 'Hoạt động' ? 'bg-gradient-success' : 'bg-gradient-warning'}`">{{
                        user.state }}</span>
                  </td>
                  <td class="align-middle">
                    <span class="text-dark text-xs font-weight-bold"> {{ user.usage_time }}</span>
                  </td>
                  <td class="align-middle">
                    <span class="text-dark  text-xs font-weight-bold">{{ user.role }}</span>
                  </td>
                  <td>
                    <p class="text-xs font-weight-bold mb-0">{{ user.unit_name }}</p>
                    <p class="text-xs text-dark  mb-0">{{ user.work_name }}</p>
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-dark  text-xs font-weight-bold">{{ user.number_staff }}</span>
                  </td>
                  <td class="align-middle">
                    <span class="text-dark  text-xs font-weight-bold">{{ user.case_type }}</span>
                  </td>
                  <td class="align-middle text-center">
                    <span class="text-dark  text-xs font-weight-bold">{{ user.function }}</span>
                  </td>
                  <td class="align-middle text-warning">
                    <a @click="btnEdit(user)" class="font-weight-bold text-xs text-primary" data-toggle="tooltip"
                      data-original-title="Edit user"><i class="fa fa-pencil me-2" aria-hidden="true"></i></a>
                    <a @click="btnDelete(user)" class="font-weight-bold text-xs text-danger" data-toggle="tooltip"
                      data-original-title="Delete user"><i class="fa fa-trash-o" aria-hidden="true"></i></a>
                  </td>
                  <PopUpWarning v-show="isShowPopup" :message="message" :user="user" :color="color"
                    @hidePopupYes="hidePopupYes" @hidePopupNo="hidePopupNo" />
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
    </div>
    <div class="col-md-4 ms-3">
      <UserDetail :userEdit="userEdit" nameButton="Chỉnh sửa" :mode="mode"/>
    </div>
  </div>
  <PopUpValidate v-show="isShowPopupValidate" :message="message" :color="color" @hidePopupValidate="hidePopupValidate" />
  <div class="shadow-loading" v-show="showLoading">
    <div class="loading" />
  </div>
</template>

<script>
import axios from "axios";
import * as APIConstant from "@/const/api.const";
import * as Data from "@/const/data.const";
import * as Utils from "@/utils/index";
import Paginate from "@/libs/vuejs-paginate-next";
import UserDetail from "./UserDetail.vue";
import Cookies from "js-cookie";
import PopUpWarning from "../../components/PopUpWarning.vue";
import PopUpValidate from "../../components/PopUpValidate.vue";

export default {
  name: "users-table",
  components: {
    Paginate,
    UserDetail,
    PopUpWarning,
    PopUpValidate,
  },
  data() {
    return {
      users: [],
      totalRecord: 0,
      pageNumber: 1,
      totalPage: 0,
      selected: [],
      userEdit: {},
      mode: Data.MODES.Edit,
      isShowPopupValidate: false,
      isShowPopup: false,
      showLoading: true,
      message: "",
      color: "success",
    }
  },
  computed: {
    selectedAll: {
      get: function () {
        return this.selected.length == this.users.length ? true : false;
      },
      set: function (value) {
        var selected = [];
        if (value) {
          this.users.forEach(function (user) {
            selected.push(user.uid);
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
    this.filterUsers();
  },
  methods: {
    /**
     * Chọn tài khoản để chỉnh sửa
     * Author: TTHIEN(22/02/2023)
     */
    btnEdit(user) {
      this.userEdit = user;
      this.mode = Data.MODES.Edit;
    },
    /**
     * Xóa người dùng
     * Author: TTHIEN(23/02/2023)
     */
    btnDelete(user) {
      this.message = `Bạn chắc chắn muốn xóa người dùng ${user.email}?`;
      this.color = "danger";
      this.isShowPopup = true;
    },
    /**
     * Đóng Popup khi chọn No
     * Author: TTHIEN (23/02/2023)
     */
    hidePopupNo() {
      this.isShowPopup = false;
    },
    /**
     * Xử lý dữ liệu và Đóng Popup khi chọn Yes
     */
    hidePopupYes(user) {
      this.isShowPopup = false;
      this.deleteUser(user);
    },
    /**
     * Xóa người dùng
     * Author: TTHIEN (23/02/2023)
     */
    deleteUser(user) {
      try {
        console.log(APIConstant.BASE_URL + APIConstant.DELETE_USER + "?uids=" + user.uid)
        axios({
          method: 'delete',
          url: APIConstant.BASE_URL + APIConstant.DELETE_USER + "?uids=" + user.uid,
          headers: { 'Authorization': 'Bearer ' + Cookies.get(APIConstant.KEY_TOKEN) },
        })
          .then((response) => {
            if (response.status != APIConstant.STT_OK) {
              this.message = response.data.error;
              this.isShowPopupValidate = true;
              this.color = "danger";
            } else {
              this.message = "Xóa tài khoản thành công";
              this.isShowPopupValidate = true;
              this.color = "success";
            }
          })
          .catch((error) => {
            console.log(error);
            this.message = Utils.formatResponseError(error);
            this.isShowPopupValidate = true;
            this.color = "danger";
          })

      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Lấy dữ liệu cho việc tìm kiếm/ phân trang người dùng
     * Author: TTHIEN (31/01/2023)
     */
    filterUsers() {
      try {
        this.showLoading = true;
        axios
          .get(APIConstant.BASE_URL + APIConstant.GET_USER_LIST + `?page=${this.pageNumber}`,
            {
              headers: { 'Authorization': 'Bearer ' + Cookies.get(APIConstant.KEY_TOKEN) }
            })
          .then((response) => {
            this.showLoading = false;
            this.users = response.data.data;
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
      this.pageNumber = pageNumber;
      this.filterUsers();
    },
    /**
    * Ẩn PopupValidate 
    * Author: TTHIEN (13/02/2023)
    */
    hidePopupValidate() {
      this.isShowPopupValidate = false;
      this.filterUsers();
    },

  }
};
</script>

<style lang="css">
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";

.custom-tr:hover {
  background-color: #f8f9fa;
}
</style>
