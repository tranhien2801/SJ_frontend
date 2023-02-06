<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-md-1"></div>
          <div class="col-md-3">
            <carousel />
          </div>
          <div class="col-md-7">
            <div class="card z-index-2">
              <!-- <iframe src="https://congbobanan.toaan.gov.vn/Resources/pdfjs/web/viewer.html?file=%2F3ta335072t1cvn/" ></iframe> -->
              <JudgmentIframe :uid="uid" />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Carousel from "./components/Carousel.vue";
import JudgmentIframe from "./components/JudgmentIframe.vue";

export default {
  name: "judgment-detail",
  data() {
    return {
      uid: String,
    }
  },
  components: {
    Carousel,
    JudgmentIframe
  },
  created() {
    this.$store.state.showSidenav = false;
  },
  mounted() {
    var me = this; 
    me.uid = this.$router.params.data;
    console.log(this.$router.params.data);
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showSidenav = true;
  },
  methods: {
    
  }
};
</script>
<style>
#ifame_pub{
  min-height:800px;
}
</style>
