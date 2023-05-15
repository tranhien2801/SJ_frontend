<template>
  <nav aria-label="breadcrumb">
    <router-link to="/judgment" class="nav-item d-flex align-items-center cursor">
      <div class="px-0 nav-link font-weight-bold text-white" v-if="!isAdmin">
        <img src="../assets/img/court/logo.png" class="icon icon-md me-1" alt="logo" />
        <span class="d-sm-inline d-none text-lg text-monospace">Trang chủ</span>
      </div>
      <div class="mt-6" v-else></div>
    </router-link>
  </nav>
</template>

<script>
import * as Utils from "../utils/index";

export default {
  name: "breadcrumbs",
  props: {
    currentPage: {
      required: true
    },
    textWhite: {
      type: String
    }
  },
  data() {
    return {
      isAdmin: false,
    };
  },
  created() {
    if (Utils.isAdmin()) {
      this.isAdmin = true;
    }
  }
};
</script>
