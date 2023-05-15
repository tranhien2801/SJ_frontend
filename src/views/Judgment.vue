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
      <judgment-card :response="response" />
    </div>
</div>
</main>
</template>

<script>
import JudgmentCard from "./components/JudgmentCard.vue";
import * as Utils from "../utils/index";

export default {
  name: "Judgment",
  components: {
    JudgmentCard,
  },
  data() {
    return {
    };
  },
  created() {
    if (Utils.isUser())
      this.$store.state.showSidenav = false;
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
