<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <div class="col-md-3 mx-5 fit-content">
            <JudgmentInfo :judgment="judgment"/>
            <div class="my-3">
              <JudgmentResponse :judgment="judgment"/>
            </div>
          </div>
          <div class="col-md-7">
            <div class="card z-index-2">
              <iframe class="load-pdf" :src="judgment.pdf_viewer"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import * as APIConstant from "@/const/api.const";
import * as DateUtils from "../utils/date.utils.js";
import JudgmentInfo from "./components/JudgmentInfo.vue";
import JudgmentResponse from "./components/JudgmentResponse.vue";
import Cookies from "js-cookie";

export default {
  name: "judgment-detail",
  data() {
    return {
      uid: '0003160bd2d74bc3aa006a2f66ed78f9',
      judgment: {},
    }
  },
  components: {
    JudgmentInfo,
    JudgmentResponse
},
  created() {
    this.$store.state.showSidenav = false;
    this.uid = this.$route.params.uid;
    this.detailJudgment();
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showSidenav = true;
  },
  methods: {
    /**
        * Lấy thông tin chi tiết của một bản án với uid
        * Author: TTHIEN (06/02/2023)
        */
    detailJudgment() {
      var me = this;
      axios
        .get(APIConstant.BASE_URL + APIConstant.GET_JUDGMENT + me.uid,
          {
            headers: { 'Authorization': 'Bearer ' + Cookies.get(APIConstant.KEY_TOKEN) }
          })
        .then((response) => {
          if (response.data.status == 200)
            me.judgment = response.data.data;
            me.judgment.date_issued = DateUtils.formatDate(me.judgment.date_issued);
        })
        .catch((error) => {
          console.log(error);
        })
    },
  }
};
</script>
<style>
.load-pdf {
    min-height: 800px;
}
</style>
