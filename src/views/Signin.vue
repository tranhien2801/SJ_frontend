<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container-fluid">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column ">
              <div
                class="position-relative bg-gradient-primary border-radius-lg d-flex flex-column justify-content-center overflow-hidden banner_home"
                :style="{
                  backgroundImage: 'url(' + require('@/assets/img/court/banner_home.png') + ')',
                  backgroundSize: 'cover'
                }">
                <img src="../assets/img/court/Logo_public.png" class="position-relative" />
              </div>

              <div class="card card-plain overflow-hidden my-5">
                <div class="pb-0 card-header text-start">
                  <h4 class="text-center font-weight-bolder">Đăng nhập</h4>
                  <p class="mb-0">Nhập tên đăng nhập và mật khẩu của bạn</p>
                </div>
                <div class="card-body">
                  <div role="form">
                    <div class="mb-3">
                      <input class="form-control" tabindex="1" type="email" placeholder="Email" v-model="user.username" />
                    </div>
                    <div class="mb-3">
                      <input class="form-control" tabindex="2" type="password" placeholder="Mật khẩu"
                        v-model="user.password" />
                    </div>
                    <argon-switch id="rememberMe">Lưu thông tin đăng nhập</argon-switch>

                    <div class="text-center" tabindex="3">
                      <argon-button class="mt-4" tabindex="3" variant="gradient" color="success" fullWidth size="lg"
                        @click="btnSignIn">Đăng nhập</argon-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </main>
  <PopUpValidate v-show="isShowPopupValidate" :message="message" :color="color" @hidePopupValidate="hidePopupValidate" />
</template>

<script>
import axios from "axios";
import * as APIConstant from "../const/api.const";
import * as Utils from "../utils/index";
import * as Data from "../const/data.const";
import PopUpValidate from "../components/PopUpValidate.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  components: {
    PopUpValidate,
    ArgonSwitch,
    ArgonButton,
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  mounted() {
    this.$store.state.isAbsolute = true;
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
  data() {
    return {
      user: {},
      isShowPopupValidate: false,
      message: "",
      color: "success",
    };
  },
  methods: {
    /**
     * Đăng nhập
     * Author: TTHIEN (30/01/2023)
     */
    btnSignIn() {
      try {
        var me = this;
        axios({
          method: "post",
          url: APIConstant.BASE_URL + APIConstant.LOGIN_PAGE,
          data: me.user
        })
          .then((response) => {
            if (response.status != APIConstant.STT_OK) {
              this.message = response.data.message;
              this.isShowPopupValidate = true;
              this.color = "warning";
            } else {
              this.message = response.data.message;
              this.isShowPopupValidate = true;
              this.color = "success";
              Utils.handlingLogin(response.data.data);
              if (response.data.data.power == Data.POWER.User) {
                me.$router.replace({ name: "Judgment" });
              } else if (response.data.data.power == Data.POWER.AdminSystem) {
                me.$router.replace({ name: "Dashboard" });
              } else if (response.data.data.power == Data.POWER.Manager) {
                me.$router.replace({ name: "Signup" });
              }
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
  }
};
</script>
