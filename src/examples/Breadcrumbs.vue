<template>
  <nav aria-label="breadcrumb">
    <router-link to="/judgment" class="nav-item d-flex align-items-center cursor" @click="btnSignout">
      <div class="px-0 nav-link font-weight-bold text-white">
        <img src="../assets/img/court/logo.png" class="icon icon-md me-1" alt="logo" />
        <span class="d-sm-inline d-none text-lg text-monospace">Trang chủ</span>
      </div>
    </router-link>

    <!-- <ol
      class="px-0 pt-1 pb-0 mb-0 bg-transparent breadcrumb"
      :class="`${this.$store.state.isRTL ? '' : ' me-sm-6'} ${this.$store.state.isNavFixed ? 'text-dark' : 'text-white' }`"
    >
      <li class="text-lg font-weight-bold breadcrumb-item">
        <a 
        :class="this.$store.state.isNavFixed ? 'text-dark' : 'text-white'"
         class="opacity-8" href="#">Trang</a>
      </li>
      <li
        class="text-lg font-weight-bold breadcrumb-item active"
        :class="this.$store.state.isNavFixed ? 'text-dark' : 'text-white'"
        aria-current="page"
      >
        {{ currentPage }}
      </li>
    </ol> -->

    <!-- <h6 class="mb-0 font-weight-bolder" :class="this.$store.state.isNavFixed ? 'text-dark' : 'text-white'">
      {{ currentPage }}
    </h6> -->
  </nav>
</template>

<script>
export default {
  name: "breadcrumbs",
  props: {
    currentPage: {
      required: true
    },
    textWhite: {
      type: String
    }
  }
};
</script>
