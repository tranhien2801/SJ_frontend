<template>
  <div class="card">
    <div class="card-header pb-0 px-3">
      <h6 class="mb-0">Danh sách bản án</h6>
    </div>
    <div class="card-body p-3">
      <ul class="list-group">
        <li class="list-group-item border-0 d-flex mb-3 p-3 bg-gray-100 border-radius-lg" v-for="judgment in judgments"
          :key="judgment.uid">
          <div class="d-flex flex-column mx-2">
            <h6 class="text-sm text-dark text-gradient font-weight-normal">{{ judgment.title }} - 
              <span class="text-dark text-gradient font-weight-bold">{{ judgment.case_name }}</span>
            </h6>            
            <span class="mb-2 text-xs">
              <span class="text-dark text-gradient">{{ judgment.judgment_content }}</span>
            </span>
            <span class="text-xs text-success font-weight-bold">
              Tổng số lượt được bình chọn làm nguồn phát triển án lệ:
              <span class="ms-sm-2">{{ judgment.count_vote }}</span>
            </span>
          </div>
          <div class="ms-auto text-end">
            <a class="btn btn-link text-success text-gradient my-2 px-3 mb-0" href="javascript:;" @click="viewJudgmentDetail(judgment)">
              <i class="far fa-eye me-2" aria-hidden="true"></i>{{ judgment.count_eyes }}
            </a>
            <a class="btn btn-link text-success text-gradient px-3 mb-0" :href="judgment.file_download">
              <i class="fas fa-thin fa-download text-dark me-2"
                aria-hidden="true"></i>{{ judgment.count_download }}
            </a>
          </div>
        </li>
      </ul>
    </div>
    <div class="d-flex pb-0 px-3 p-0">
      <div class="">
        Tổng số: <strong>{{ totalRecord }}</strong> bản ghi
      </div>
      <div class="ms-auto text-end">
        <Paginate v-model="pageNumber" :page-count="totalPage" :page-range="3" :margin-pages="1"
          :click-handler="clickCallback" :prev-text="'Trước'" :next-text="'Sau'" :container-class="'paginate'"
          :page-class="'page-item'" />
      </div>
    </div>
  </div>
  <div class="shadow-loading" v-show="showLoading">
      <div class="loading" />
    </div>
</template>

<script>
import axios from "axios";
import * as APIConstant from "@/const/api.const";
import * as DateUtils from "../../utils/date.utils.js";
import Paginate from "@/libs/vuejs-paginate-next";

export default {
  name: "judgment-card",
  components: {
    Paginate,

  },
  data() {
    return {
      judgments: [],
      totalRecord: 0,
      pageNumber: 1,
      totalPage: 0,
      showLoading: true,
      uid: null,

    }
  },
  /**
   * Lấy dữ liệu bản án theo bộ lọc
   * Author: TTHIEN (03/02/2023)
   */
  created() {
    this.filterJudgments();
  },
  methods: {
    /**
     * Lấy dữ liệu bản án theo bộ lọc/ tìm kiếm
     * Author: TTHIEN(03/02/2023)
     */
    filterJudgments() {
      try {
        var me = this;
        me.showLoading = true;
        var token = window.localStorage.getItem("token");
        axios
          .get(APIConstant.BASE_URL + APIConstant.GET_JUDGMENT_LIST + `?page=${me.pageNumber}`,
            {
              headers: { 'Authorization': 'Bearer ' + token }
            })
          .then((response) => {
            console.log(response);
            me.showLoading = false;
            me.totalPage = response.data.total_page;
            me.totalRecord = response.data.total;
            me.pageNumber = response.data.page;
            me.judgments = response.data.data;
            me.convertJudgmentTitle();
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
    /**
   * Hàm phân trang pre và next
   * Author: TTHIEN (04/02/2023)
   */
    clickCallback(pageNumber) {
      console.log("chuyển trang");
      console.log(pageNumber);
      this.pageNumber = pageNumber;
      this.filterJudgments();
    },

    /**
     * Chuyển trang để xem chi tiết bản án
     * Author: TTHIEN (06/02/2023)
     */
     viewJudgmentDetail(judgment) {
      var uid = judgment.uid;
      this.$router.replace({
        name: "JudgmentDetail",
        params: {uid}
      })
      console.log(uid);
     }
  }
};
</script>
<style>
@import url('../../assets/css/components/loading.css');
</style>
