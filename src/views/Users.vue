<template>
  <div class="py-4 container-fluid">
    <div class=" row">
      <div class="col-12">
        <users-table />
      </div>
      
    </div>
  </div>

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
    this.$store.state.showSidenav = false;
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
