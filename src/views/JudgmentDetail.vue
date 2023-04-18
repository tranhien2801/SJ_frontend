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
      <div class="col-lg-12">
        <div class="row">
          <div class="col-md-3 fit-content">
            <JudgmentInfo :judgment="judgment" />
            <div class="my-3">
              <JudgmentResponse :judgment="judgment" />
            </div>
          </div>
          <div class="col-md-6">
            <div class="card z-index-2">
              <iframe class="load-pdf" :src="judgment.pdf_viewer"></iframe>
            </div>
          </div>
          <div class="col-md-3 recommend">
            <JudgmentRecommended :judgments="judgments" />
          </div>
        </div>
      </div>
    </div>
  </div>
  </main>
</template>
<script>
import axios from "axios";
import * as APIConstant from "@/const/api.const";
import * as DateUtils from "../utils/date.utils.js";
import JudgmentInfo from "./components/JudgmentInfo.vue";
import JudgmentResponse from "./components/JudgmentResponse.vue";
import JudgmentRecommended from "./components/JudgmentRecommended.vue";
import Cookies from "js-cookie";

export default {
  name: "judgment-detail",
  data() {
    return {
      uid: '0003160bd2d74bc3aa006a2f66ed78f9',
      judgment: {},
      judgments: []
    }
  },
  components: {
    JudgmentInfo,
    JudgmentResponse,
    JudgmentRecommended
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
          if (response.data.status == 200) {
            me.judgment = response.data.data;
            console.log(this.judgment)
            me.judgment.date_issued = DateUtils.formatDate(me.judgment.date_issued);
            this.judgmentRecommended();
          }
        })
        .catch((error) => {
          console.log(error);
        })
    },
    /**
     * 
     */
    judgmentRecommended() {
      try {
        console.log(APIConstant.BASE_URL_SEARCH + APIConstant.GET_JUDGMENT_RECOMMENDED + this.judgment.judgment_content)
        axios.get(APIConstant.BASE_URL_SEARCH + APIConstant.GET_JUDGMENT_RECOMMENDED + this.judgment.judgment_content)
          .then((response) => {
            console.log(response);
            this.judgments = response.data.data;
            console.log(this.judgments[0].uid)
            this.convertJudgmentTitle();
          })
          .catch((error) => {
            console.log(error);
          })
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Convert dữ liệu judgment để hiển thị
     * Author: TTHIEN(04/02/2023)
     */
    convertJudgmentTitle() {
      this.judgments.forEach(judgment => {
        judgment.title = judgment.type_document
          + " số " + judgment.judgment_number
          + " ngày " + DateUtils.formatDate(judgment.date_issued)
          + " của " + judgment.court_name
          + " về " + judgment.judgment_name;
      })
    },
  }
};
</script>
<style>
.load-pdf {
  min-height: 800px;
}
.recommend{
  max-height: 1000px;
}
</style>
