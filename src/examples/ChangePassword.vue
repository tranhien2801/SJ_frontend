<template>
  <div class="fixed-plugin">
    <a class="px-3 py-2 fixed-plugin-button text-dark position-fixed" @click="toggle">
      <i class="py-2 fa fa-cog"></i>
    </a>
    <div class="shadow-lg card">
      <div class="pt-3 pb-0 bg-transparent card-header">
        <div class="float-start">
          <h5 class="mt-3 mb-0 text-success">Đổi mật khẩu</h5>
        </div>
        <div class="mt-4 float-end" @click="toggle">
          <button class="p-0 btn btn-link text-success fixed-plugin-close-button">
            <i class="fa fa-close"></i>
          </button>
        </div>
        <!-- End Toggle Button -->
      </div>
      <hr class="my-1 horizontal dark" />
      <div class="pt-0 d-flex flex-column card-body pt-sm-3 text-success">
        <span class="mb-3 text-sm font-weight-bold">
          Mật khẩu hiện tại
          <input class="form-control" tabindex="1" type="password" v-model="user.currentPassword" ref="txtCurrentPassword"
            @blur="validateRequired()" />
          <div class="name__missing">Mật khẩu hiện tại không được để trống</div>
        </span>
        <span class="mb-3 text-sm font-weight-bold">
          Mật khẩu mới
          <input class="form-control" tabindex="2" type="password" v-model="user.newPassword" ref="txtNewPassword"
            @blur="validateRequired()" />
          <div class="name__missing">Mật khẩu mới không được để trống</div>
        </span>
        <span class="mb-3 text-sm font-weight-bold">
          Nhập lại mật khẩu
          <input class="form-control" tabindex="3" type="password" v-model="user.reNewPassword" ref="txtReNewPassword"
            @blur="validateRequired" />
          <div class="name__missing">Mật khẩu xác nhận không được để trống</div>
        </span>
        <div class="text-center">
          <argon-button class="mt-4" variant="gradient" color="success" fullWidth size="lg" @click="btnChangePassword">Đổi
            mật khẩu</argon-button>
        </div>
      </div>
    </div>
    <PopUpValidate v-show="isShowPopupValidate" :message="message" :color="color"
      @hidePopupValidate="hidePopupValidate" />
  </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import axios from "axios";
import Cookies from "js-cookie";
import * as APIConstant from "../const/api.const";
import * as Utils from "../utils/index";
import PopUpValidate from "../components/PopUpValidate.vue";

export default {
  name: "change-password",
  props: ["toggle"],
  data() {
    return {
      user: {},
      isShowPopupValidate: false,
      message: "",
      color: "success",
    }
  },
  components: {
    ArgonButton,
    PopUpValidate,

  },
  methods: {
    /**
     * Đổi mật khẩu người dùng
     * Author: TTHIEN (19/02/2023)
     */
    btnChangePassword() {
      try {
        // Validate dữ liệu
        var isValid = this.validateData();
        if (!isValid) {
          this.color = "warning";
          return;
        }

        axios({
          method: "put",
          url: APIConstant.BASE_URL + APIConstant.CHANGE_PASSWORD,
          headers: { 'Authorization': 'Bearer ' + Cookies.get(APIConstant.KEY_TOKEN) },
          data: this.user
        })
          .then((response) => {
            if (response.status == APIConstant.STT_OK) {
              this.message = "Đổi mật khẩu thành công";
              this.isShowPopupValidate = true;
              this.color = "success";
            }
          })
          .catch((error) => {
            console.log(error)
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
     * Author: TTHIEN(19/02/2023)
     */
    validateData() {
      var isValid = true;
      if (!this.user.currentPassword) {
        isValid = false;
        this.message = "Mật khẩu hiện tại không được bỏ trống";
        this.isShowPopupValidate = true;
        // Thêm border màu đỏ cho input hiện tại
        this.$refs["txtCurrentPassword"].classList.add("input__error");
        return isValid;
      } else if (this.user.currentPassword.length < 8){
        isValid = false;
        this.message = "Mật khẩu hiện tại phải có kích thước lớn hơn 8";
        this.isShowPopupValidate = true;
        return isValid;
      } else {
        isValid = true;
        // Loại bỏ border màu đỏ cho input hiện tại
        this.$refs["txtCurrentPassword"].classList.remove("input__error");
      }
      if (!this.user.newPassword) {
        isValid = false;
        this.message = "Mật khẩu mới không được bỏ trống";
        this.isShowPopupValidate = true;
        // Thêm border màu đỏ cho input hiện tại
        this.$refs["txtNewPassword"].classList.add("input__error");
        return isValid;
      } else if (this.user.newPassword.length < 8){
        isValid = false;
        this.message = "Mật khẩu mới phải có kích thước lớn hơn 8";
        this.isShowPopupValidate = true;
        return isValid;
      } else {
        isValid = true;
        // Loại bỏ border màu đỏ cho input hiện tại
        this.$refs["txtNewPassword"].classList.remove("input__error");
      }
      if (!this.user.reNewPassword) {
        isValid = false;
        this.message = "Mật khẩu xác nhận không được bỏ trống";
        this.isShowPopupValidate = true;
        // Thêm border màu đỏ cho input hiện tại
        this.$refs["txtReNewPassword"].classList.add("input__error");
        return isValid;
      } else if (this.user.reNewPassword.length < 8){
        isValid = false;
        this.message = "Mật khẩu xác nhận phải có kích thước lớn hơn 8";
        this.isShowPopupValidate = true;
        return isValid;
      } else {
        isValid = true;
        // Loại bỏ border màu đỏ cho input hiện tại
        this.$refs["txtReNewPassword"].classList.remove("input__error");
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
  },

};
</script>
