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
            <div class="col-md-3">
              <div style="position: sticky !important;  height: 50vh !important;">
                <JudgmentInfo :judgment="judgment" />
              </div>
              <div class="my-3">
                <JudgmentResponse :judgment="judgment" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="card z-index-2">
                <iframe class="load-pdf" :src="judgment.pdf_viewer"></iframe>
              </div>
            </div>
            <div class="col-md-3 overflow-auto hide-scroll" >
              <div class="mb-3">
                <JudgmentSummarization :uid="judgment.uid"/>
              </div>
              <div style="position: sticky !important;  height: 30vh !important;">
                <JudgmentRecommended :judgments="judgments" @loadPage="loadPage" />
              </div>
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
import JudgmentSummarization from "./components/JudgmentSummaziration.vue";
import Cookies from "js-cookie";

export default {
  name: "judgment-detail",
  data() {
    return {
      uid: '0003160bd2d74bc3aa006a2f66ed78f9',
      judgment: {},
      judgments: [],
    }
  },
  components: {
    JudgmentInfo,
    JudgmentResponse,
    JudgmentRecommended,
    JudgmentSummarization
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
            me.judgment.date_issued = DateUtils.formatDate(me.judgment.date_issued);
            this.judgmentRecommended();
          }
        })
        .catch((error) => {
          console.log(error);
        })
    },
    /**
     * Load lại trang sau khi chọn bản án tương tự
     * Author: TTHIEN(20/04/2023)
     */
    loadPage(jud) {
      this.uid = jud.uid;
      this.detailJudgment()
    },

    /**
     * Lấy danh sách bản án gợi ý
     * Author: TTHIEN(20/04/2023)
     */
    judgmentRecommended() {
      try {
        axios.get(APIConstant.BASE_URL_SEARCH + APIConstant.GET_JUDGMENT_RECOMMENDED + this.judgment.judgment_content)
          .then((response) => {
            this.judgments = response.data.data;
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
  height: 110vh !important;
}
.hide-scroll::-webkit-scrollbar{
  display: none;
}
</style>
