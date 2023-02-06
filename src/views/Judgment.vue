<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-8">
        <judgment-card />
      </div>
      <div class="col-md-4 fit-content">
        <transaction-card />
      </div>
    </div>
  </div>
</template>

<script>
import JudgmentCard from "./components/JudgmentCard.vue";
import TransactionCard from "./components/TransactionCard.vue";

export default {
  name: "Judgment",
  components: {
    JudgmentCard,
    TransactionCard,
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
};
</script>
