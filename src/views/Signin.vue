<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
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

              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="text-center font-weight-bolder">Đăng nhập</h4>
                  <p class="mb-0">Nhập tên đăng nhập và mật khẩu của bạn</p>
                </div>
                <div class="card-body">
                  <form role="form">
                    <div class="mb-3">
                      <argon-input type="email" placeholder="Email" size="lg" v-model="user.username" />
                    </div>
                    <div class="mb-3">
                      <argon-input type="password" placeholder="Mật khẩu" size="lg" v-model="user.password" />
                    </div>
                    <argon-switch id="rememberMe">Remember me</argon-switch>

                    <div class="text-center">
                      <argon-button class="mt-4" variant="gradient" color="success" fullWidth size="lg"
                        @click="btnSignIn">Sign
                        in</argon-button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import * as APIConstant from "../const/api.const"
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  components: {
    ArgonInput,
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
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
  data() {
    return {
      user: {}
    };
  },
  methods: {
    /**
     * Đăng nhập
     * Author: TTHIEN (30/01/2023)
     */
    btnSignIn() {
      try {
        alert(this.user.username);
        axios
          .post(APIConstant.BASE_URL + APIConstant.LOGIN_PAGE, this.user)
          .then(function (response) {
            console.log("Đăng nhập thành công");
            if (response.status != 200) {
              console.log(response.message)
            }
          })
      } catch (error) {
        console.log(error);
      }

    }
  }
};
</script>
