<template>
  <main>
    <div class="container-fluid">
      <div class="page-header min-height-300" style="background-image: url('https://anle.toaan.gov.vn/services/anlenew/images/slide.jpg');
                  margin-right: -24px;
                  margin-left: -34%;
                ">
        <span class="mask bg-gradient-success opacity-6"></span>
      </div>
    </div>
    <div class="mt-n11 py-4 container-fluid">
      <div class="row">
        <div class="col-md-8">
          <UserDetail :mode="mode" nameButton="Đăng ký"/>
        </div>
        <div class="col-md-4">
          <!-- <profile-card /> -->
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import UserDetail from './components/UserDetail.vue';
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import * as Data from "@/const/data.const";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "signup",
  data() {
    return {
      mode: Data.MODES.Signup
    }
  },
  components: { UserDetail,  },
  created() {
    // this.$store.state.showSidenav = false;
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

};
</script>

