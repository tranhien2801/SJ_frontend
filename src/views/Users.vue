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
    <div class=" row">
      <div class="col-12">
        <users-table />
      </div>
      
    </div>
  </div>
</main>
</template>

<script>
import UsersTable from "./components/UsersTable.vue";

export default {
  name: "users",
  components: {
    UsersTable,
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  created() {
    // this.$store.state.showSidenav = false;
  },
  mounted() {
    this.$store.state.isAbsolute = true;
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showSidenav = true;
  },
};
</script>

<style>
@import url('../assets/css/components/paginate.css');
</style>
