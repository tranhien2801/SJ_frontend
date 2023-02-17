<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-1"></div>
      <judgment-card :response="response" />
    </div>
</div>
</template>

<script>
import JudgmentCard from "./components/JudgmentCard.vue";

export default {
  name: "Judgment",
  components: {
    JudgmentCard,
  },
  data() {
    return {
      salary: {
        classIcon: "text-white fas fa-landmark",
        title: "Salary",
        desc: "Belong Interactive",
        price: "+$2000",
      },
      paypal: {
        classIcon: "text-white fab fa-paypal",
        title: "Paypal",
        desc: "Freelance Payment",
        price: "$455.00",
      },
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
