<template>
  <main>
    <div class="container-fluid">
      <div class="page-header min-height-300" style="background-image: url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80');
          margin-right: -24px;
          margin-left: -34%;
        ">
        <span class="mask bg-gradient-success opacity-6"></span>
      </div>
    </div>
    <div class="mt-n11 py-4 container-fluid">
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header pb-0">
              <div class="d-flex align-items-center">
                <p class="mb-0">Đăng ký tài khoản</p>
              </div>
            </div>
            <div class="card-body">
              <p class="text-uppercase text-sm">Thông tin tài khoản</p>
              <div class="row">
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label">Tên tài khoản</label>
                  <input class="form-control" type="text" v-model="user.name" ref="txtName"
                    title="Tên người dùng không được để trống" @blur="validateRequired" />
                  <div class="name__missing">Tên không được để trống</div>
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label">Email</label>
                  <input type="email" class="form-control" v-model="user.email" ref="txtEmail"
                    title="Email người dùng không được để trống" @blur="validateRequired" />
                  <div class="name__missing">Email không được để trống</div>
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label">Mật khẩu</label>
                  <input class="form-control" type="password" v-model="user.password" ref="txtPassword"
                    title="Mật khẩu không được để trống" @blur="validateRequired" />
                  <div class="name__missing">Mật khẩu không được để trống</div>
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label">Cấp tài khoản</label>
                  <Multiselect v-model="user.level" label="levelName" track-by="value" :options="levels">
                  </Multiselect>
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label">Trạng thái tài khoản</label>
                  <Multiselect v-model="user.state" track-by="value" label="name" :options="states">
                  </Multiselect>
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label">Thời hạn sử dụng</label>
                  <Multiselect v-model="user.usageTime" track-by="value" label="name" :options="usageTimes">
                  </Multiselect>
                </div>
                <div class="col-md-8">
                  <label for="example-text-input" class="form-control-label">Chức năng được thực hiện</label>
                  <input class="form-control" type="text" v-model="user.functions" />
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label">Quan tâm đến nội dung pháp lý</label>
                  <Multiselect v-model="user.caseTypes" track-by="value" label="value" :options="caseTypes">
                  </Multiselect>
                </div>

              </div>
              <hr class="horizontal dark" />
              <p class="text-uppercase text-sm">Thông tin liên lạc</p>
              <div class="row">
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label">Số điện thoại</label>
                  <input class="form-control" type="tel" v-model="user.phoneNumber" />
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label">Đơn vị công tác</label>
                  <Multiselect v-model="user.unit" track-by="value" label="value" :options="units">
                  </Multiselect>
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label">Quyền, Chức vụ</label>
                  <Multiselect v-model="user.role" track-by="value" label="name" :options="roles">
                  </Multiselect>
                  <div class="name__missing">Quyền, chức vụ không được để trống</div>
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label">Công việc</label>
                  <input class="form-control" type="text" v-model="user.work" />
                </div>
                <div class="col-md-4">
                  <label for="example-text-input" class="form-control-label">Số lượng người trong doanh nghiệp</label>
                  <input class="form-control" type="text" v-model="user.numberEmployee" />
                </div>
              </div>
              <div class="card-header pb-0">
                <div class="d-flex align-items-center">
                  <argon-button color="success" size="sm" class="ms-auto" @click="createUser">Đăng ký</argon-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <profile-card />
        </div>
      </div>
    </div>
  </main>
  <PopUpValidate v-show="isShowPopupValidate" :message="message" :color="color"
    @hidePopupValidate="hidePopupValidate" />
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
import * as APIConstant from "@/const/api.const";
import * as Utils from "../utils/index";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import ProfileCard from "./components/ProfileCard.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import Multiselect from '@vueform/multiselect';
import PopUpValidate from "../components/PopUpValidate.vue";

const body = document.getElementsByTagName("body")[0];

export default {
  name: "signup",
  data() {
    return {
      user: {},
      units: [],
      caseTypes: [],
      levels: [
        { value: 0, levelName: 'Doanh nghiệp' },
        { value: 1, levelName: 'Cá nhân' }
      ],
      usageTimes: [
        { value: 0, name: '7 ngày dùng thử' },
        { value: 1, name: "vĩnh viện" }
      ],
      states: [
        { value: 1, name: "active" },
        { value: 2, name: "deactive" }
      ],
      roles: [
        { value: 0, name: "Quản lý" },
        { value: 1, name: "Nhân viên" },
        { value: 2, name: "Kế toán" },
        { value: 3, name: "Nhân viên content" },
        { value: 4, name: "Khác" }
      ],
      isShowPopupValidate: false,
      message: "",
      color: "success",
    };
  },
  components: { ProfileCard, ArgonButton, Multiselect, PopUpValidate },
  created() {
    this.getUnits();
    this.getCaseTypes();
  },
  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip();
  },
  beforeMount() {
    this.$store.state.imageLayout = "profile-overview";
    this.$store.state.showNavbar = true;
    this.$store.state.showFooter = true;
    this.$store.state.hideConfigButton = true;
    body.classList.add("profile-overview");
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
    this.$store.state.imageLayout = "default";
    this.$store.state.showNavbar = true;
    this.$store.state.showFooter = true;
    this.$store.state.hideConfigButton = false;
    body.classList.remove("profile-overview");
  },
  methods: {
    saveUnit(text) {
      this.user.unitName = text;
    },
    /**
     * Lấy dữ liệu đơn vị công tác
     * Author: TTHIEN (12/02/2023)
     */
    getUnits() {
      try {
        axios
          .get(APIConstant.BASE_URL + APIConstant.GET_UNIT_LIST,
            {
              headers: { 'Authorization': 'Bearer ' + Cookies.get(APIConstant.KEY_TOKEN) }
            })
          .then((response) => {
            console.log(response);
            this.units = response.data.data;
          })
          .catch((error) => {
            console.log(error);
          })

      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Lấy dữ liệu loại vụ việc
     * Author: TTHIEN (12/02/2023)
     */
    getCaseTypes() {
      try {
        axios
          .get(APIConstant.BASE_URL + APIConstant.GET_CASE_TYPE_LIST)
          .then((response) => {
            console.log(response);
            this.caseTypes = response.data.data;
          })
          .catch((error) => {
            console.log(error);
          })

      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Tạo tài khoản người dùng
     * Author: TTHIEN (12/02/2022)
     */
    createUser() {
      try {
        var me = this;

        // Validate dữ liệu
        var isValid = me.validateData();
        if (!isValid) {
          this.color = "warning";
          return;
        }
        axios({
          method: "post",
          url: APIConstant.BASE_URL + APIConstant.CREATE_USER_LOGIN,
          headers: { 'Authorization': 'Bearer ' + Cookies.get(APIConstant.KEY_TOKEN) },
          data: me.user
        })
          .then((response) => {
            if (response.status != APIConstant.STT_OK) {
              // alert(response.data.message)
              this.message = response.data.error;
              this.isShowPopupValidate = true;
              this.color = "danger";
            } else {
              // me.$router.replace({ name: "Judgment" });
              // alert("Đăng ký thành công");
              this.message = "Thêm tài khoản thành công";
              this.isShowPopupValidate = true;
              this.color = "success";
            }
          })
          .catch((error) => {
            this.message = Utils.formatResponseError(error);
            this.isShowPopupValidate = true;
            this.color = "danger";
          })
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Ẩn PopupValidate 
     * Author: TTHIEN (13/02/2023)
     */
    hidePopupValidate() {
      this.isShowPopupValidate = false;
    },
    /**
     * Thực hiện validate dữ liệu trước khi cất
     * Author: TTHIEN(13/02/2023)
     */
    validateData() {
      var isValid = true;
      if (!this.user.name) {
        isValid = false;
        this.message = "Tên người dùng không được bỏ trống";
        this.isShowPopupValidate = true;
        // Thêm border màu đỏ cho input hiện tại
        this.$refs["txtName"].classList.add("input__error");
        return isValid;
      } else {
        isValid = true;
        // Loại bỏ border màu đỏ cho input hiện tại
        this.$refs["txtName"].classList.remove("input__error");
      }
      if (!this.user.email) {
        isValid = false;
        this.message = "Email người dùng không được bỏ trống";
        this.isShowPopupValidate = true;
        // Thêm border màu đỏ cho input hiện tại
        this.$refs["txtEmail"].classList.add("input__error");
        return isValid;
      } else {
        isValid = true;
        // Loại bỏ border màu đỏ cho input hiện tại
        this.$refs["txtEmail"].classList.remove("input__error");
      }
      if (!this.user.password) {
        isValid = false;
        this.message = "Mật khẩu không được bỏ trống";
        this.isShowPopupValidate = true;
        // Thêm border màu đỏ cho input hiện tại
        this.$refs["txtPassword"].classList.add("input__error");
        return isValid;
      } else {
        isValid = true;
        // Loại bỏ border màu đỏ cho input hiện tại
        this.$refs["txtPassword"].classList.remove("input__error");
      }

      return isValid;
    },

    /**
    * Thực hiện validate dữ liệu bắt buộc nhập
    * Author: TTHIEN (14/02/2022)
    */
    validateRequired() {
      var value = event.currentTarget.value;
      if (!value) {
        // Thêm border màu đỏ cho input hiện tại
        event.currentTarget.classList.add("input__error");
        // Thêm title thông báo lỗi
      } else {
        // Loại bỏ border màu đỏ cho input hiện tại
        event.currentTarget.classList.remove("input__error");
        // Loại bỏ title thông báo lỗi
      }
    },


  }
};
</script>

<style>
@import url('../assets/css/components/multiselect.css');

.name__missing {
  text-align: center;
  font-size: 0.875rem;
  width: 100%;
  padding: 3px 12px;
  position: absolute;
  visibility: hidden;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>