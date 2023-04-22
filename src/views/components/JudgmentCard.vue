<template>
  <!-- Phần bộ lọc tìm kiếm -->
  <div class="col-md-3 mx-5 fit-content">
    <div class="card overflow-hidden h-100 p-0">
      <div class="d-flex panel-heading text-gradient">
        <div class="border-0 d-flex flex-column font-weight-bold p-3 mb-0">
          <h6 class="mb-0 text-center">
            Chọn các điều kiện tìm kiếm
          </h6>
        </div>
      </div>
      <div class="d-flex flex-column mx-4 mb-4 text-success">
        <div class="d-flex align-items-center my-3">
          <div class="input-group">
            <span class="input-group-text text-body">
              <i class="fas fa-search" aria-hidden="true"></i>
            </span>
            <input v-model="filter.judgment_content" type="text" class="form-control"
              :placeholder="'Nhập số hiệu/nội dung'" />
          </div>
        </div>
        <span class="mb-3 text-sm font-weight-bold">
          Loại vụ/việc
          <Multiselect v-model="filter.case_type" class="text-dark font-weight-normal" track-by="value" label="value"
            :options="caseTypes">
          </Multiselect>
        </span>
        <span class="mb-3 text-sm font-weight-bold">
          Cấp tòa án
          <Multiselect v-model="filter.court_level" class="text-dark font-weight-normal" :options="courtLevels">
          </Multiselect>
        </span>
        <span class="mb-3 text-sm font-weight-bold">
          Cấp xét xử
          <Multiselect v-model="filter.judgment_level" class="text-dark font-weight-normal" :options="judgmentLevels">
          </Multiselect>
        </span>
        <span class="mb-3 text-sm font-weight-bold">
          Bản án/quyết định
          <Multiselect v-model="filter.type_document" class="text-dark font-weight-normal" track-by="value" label="value"
            :options="typeDocuments">
          </Multiselect>
        </span>
        <span class="mb-3 text-sm font-weight-bold">
          Từ ngày
          <input v-model="filter.date_from" type="date" class="form-control" />
        </span>
        <span class="mb-3 text-sm font-weight-bold">
          Đến ngày
          <input v-model="filter.date_to" type="date" class="form-control" />
        </span>
        <span class="mb-3 text-sm font-weight-bold">
          <div class="form-check"> <input v-model="filter.precedent" type="checkbox" class="form-check-input" value="1" />
            Có áp dụng án lệ
          </div>
        </span>
        <span class="mb-3 text-sm font-weight-bold">
          <div class="form-check"> <input v-model="filter.vote" type="checkbox" class="form-check-input" value="1" />
            Được bình chọn làm nguồn phát triển án lệ
          </div>
        </span>
        <argon-button color="success" size="md" variant="gradient" @click="btnSearchJudgment">Tìm kiếm</argon-button>
      </div>
    </div>
  </div>
  <!-- Phần hiện danh sách bản án theo bộ lọc tìm kiếm -->
  <div class="col-md-7">
    <div class="card">
      <div class="card-header pb-0 px-3">
        <h6 class="mb-0">Danh sách bản án</h6>
      </div>
      <div class="card-body p-3 fit-content" style="position: sticky; height: 100vh;">
        <ul class="list-group" style="overflow: auto; height: 96vh">
          <li class="list-group-item border-0 d-flex mb-3 p-3 bg-gray-100 border-radius-lg cursor" v-for="judgment in judgments"
            :key="judgment.uid" @dblclick="viewJudgmentDetail(judgment)">
            <div class="d-flex flex-column mx-2">
              <h6 class="mb-2 text-sm text-dark text-gradient font-weight-bold">{{ judgment.title }}
                <a class="text-info text-gradient px-3 mb-0 text-success" @click="likeJudgment(judgment)">
                  <i v-if="judgment.isLiked" class="fa fa-thumbs-up"  aria-hidden="true"></i>
                  <i v-else class="fa fa-thumbs-o-up"  aria-hidden="true"></i>
                </a>
              </h6>
              <span class="mb-2 text-xs text-dark text-gradient font-weight-bold">Quan hệ pháp luật:
                <span class="text-dark text-gradient font-weight-normal">{{ judgment.case_name }}</span>
              </span>
              <span class="mb-2 text-xs text-dark text-gradient font-weight-bold">Cấp xét xử:
                <span class="text-dark text-gradient font-weight-normal">{{ judgment.judgment_level }}</span>
              </span>
              <span class="mb-2 text-xs text-dark text-gradient font-weight-bold">Loại vụ việc:
                <span class="text-dark text-gradient font-weight-normal">{{ judgment.case_type }}</span>
              </span>
              <span class="mb-2 text-xs text-dark text-gradient font-weight-bold">Thông tin về vụ án:
                <span class="text-dark text-gradient font-weight-normal">{{ judgment.judgment_content }}</span>
              </span>
              <span class="text-xs text-success font-weight-bold">
                Tổng số lượt được bình chọn làm nguồn phát triển án lệ:
                <span class="ms-sm-2">{{ judgment.count_vote }}</span>
              </span>
            </div>
            <div class="ms-auto text-end">
              <a class="btn btn-link text-success text-gradient my-2 px-3 mb-0" href="javascript:;"
                @click="viewJudgmentDetail(judgment)">
                <i class="far fa-eye me-2" aria-hidden="true"></i>{{ judgment.count_eyes }}
              </a>
              <a class="btn btn-link text-success text-gradient px-3 mb-0" :href="judgment.file_download"
                @click="downloadJudgment(judgment.uid)">
                <i class="fas fa-thin fa-download text-dark me-2" aria-hidden="true"></i>{{ judgment.count_download }}
              </a>
            </div>
          </li>
        </ul>
      </div>
      <div class="d-flex pb-0 px-3 p-0">
        <div class="">
          Tổng số: <strong>{{ totalRecord }}</strong> bản án
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
  </div>
</template>

<script>
import axios from "axios";
import * as APIConstant from "@/const/api.const";
import * as DateUtils from "../../utils/date.utils.js";
import Paginate from "@/libs/vuejs-paginate-next";
import Cookies from "js-cookie";
import Multiselect from '@/libs/multiselect';
import ArgonButton from "@/components/ArgonButton.vue";

export default {
  name: "judgment-card",
  components: {
    Paginate,
    Multiselect,
    ArgonButton,
  },
  data() {
    return {
      judgments: [],
      totalRecord: 0,
      pageNumber: 1,
      totalPage: 0,
      showLoading: true,
      uid: null,
      filter: {
        judgment_content: "",
        judgment_level: "",
        court_level: "",
        type_document: "",
        case_type: "",
        date_from: "",
        date_to: "",
        vote: "",
        precedent: ""
      },
      typeDocuments: [
        { value: "Bản án" },
        { value: "Quyết định" }
      ],
      caseTypes: [],
      courtLevels: [],
      judgmentLevels: []

    }
  },
  /**
   * Lấy dữ liệu bản án theo bộ lọc
   * Author: TTHIEN (03/02/2023)
   */
  created() {
    this.getCaseTypes();
    this.getJudgmentLevels();
    this.getCourtLevels();
    this.filterJudgments();
  },
  methods: {
    /**
     * Lấy dữ liệu người dùng đã like bản án hay chưa?
     * Author: TTHIEN(23/02/2023)
     */
    getLikedJudgment() {
      console.log(this.judgments)
      console.log(APIConstant.USER_ID)
      this.judgments.forEach(function (judgment) {
        if (judgment.user_uid == Cookies.get(APIConstant.USER_ID)) {
          console.log("Người dùng đã like bản án")
          judgment.isLiked = true;
        } else {
          judgment.isLiked = false;
        }
      })
    },
    /**
     * Liked/Disliked bản án
     * Author: TTHIEN(23/02/2023)
     */
    likeJudgment(judgment) {
      axios({
        method: "post",
        url: APIConstant.BASE_URL + APIConstant.LIKED_JUDGMENT,
        headers: { 'Authorization': 'Bearer ' + Cookies.get(APIConstant.KEY_TOKEN) },
        data: {
          user_uid: Cookies.get(APIConstant.USER_ID),
          judgment_uid: judgment.uid
        }
      })
        .then((response) => {
          console.log(response);
          judgment.isLiked = !judgment.isLiked;
        })
        .catch((error) => {
          console.log(error);
        })
    },
    /**
     * Lấy dữ liệu bản án theo bộ lọc/ tìm kiếm
     * Author: TTHIEN(03/02/2023)
     */
    filterJudgments() {
      try {
        var me = this;
        me.showLoading = true;
        axios({
          method: "post",
          url: APIConstant.BASE_URL + APIConstant.GET_JUDGMENT_LIST + `?page=${me.pageNumber}`,
          headers: { 'Authorization': 'Bearer ' + Cookies.get(APIConstant.KEY_TOKEN) },
          data: me.filter
        })
          .then((response) => {
            console.log(response);
            me.showLoading = false;
            me.totalRecord = response.data.total;
            console.log(me.totalRecord)
            if (me.totalRecord == 0 && me.filter.judgment_content != null) {
              this.searchBM25();
            } else {
              me.totalPage = response.data.total_page;
              me.pageNumber = response.data.page;
              me.judgments = response.data.data;
              me.convertJudgmentTitle();
            }
            this.getLikedJudgment();
          })
          .catch((error) => {
            console.log(error);
          })

      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Tìm kiếm bản án theo thuật toán BM25
     */
    searchBM25() {
      try {
        console.log(this.filter)
        axios({
          method: "post",
          url: APIConstant.BASE_URL_SEARCH + APIConstant.SEARCH_JUDGMENT_BM25,
          data: this.filter
        })
          .then((response) => {
            console.log(response);
            this.showLoading = false;
            this.totalRecord = response.data.total;
            this.totalPage = response.data.total_page;
            this.pageNumber = response.data.page;
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
    /**
   * Hàm phân trang pre và next
   * Author: TTHIEN (04/02/2023)
   */
    clickCallback(pageNumber) {
      this.pageNumber = pageNumber;
      this.filterJudgments();
    },

    /**
     * Chuyển trang để xem chi tiết bản án
     * Author: TTHIEN (06/02/2023)
     */
    viewJudgmentDetail(judgment) {
      try {
        var uid = judgment.uid;
        axios({
          method: "get",
          url: APIConstant.BASE_URL + APIConstant.GET_JUDGMENT + uid + "/view",
          headers: { 'Authorization': 'Bearer ' + Cookies.get(APIConstant.KEY_TOKEN) },
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          })

        this.$router.replace({
          name: "JudgmentDetail",
          params: { uid }
        })
      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Tải bản án
     * Author: TTHIEN(20/04/2023)
     */
    downloadJudgment(uid) {
      try {
        axios({
          method: "get",
          url: APIConstant.BASE_URL + APIConstant.GET_JUDGMENT + uid + "/download",
          headers: { 'Authorization': 'Bearer ' + Cookies.get(APIConstant.KEY_TOKEN) },
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          })

      } catch (error) {
        console.log(error);
      }
    },

    /**
     * Phần method của JudgmentFilter
     * Author: TTHIEN(17/02/2023)
     */
    /**
       * Bộ lọc tìm kiếm bản án
       * Author: TTHIEN (17/02/2023)
       */
    btnSearchJudgment() {
      this.pageNumber = 1;
      this.filterJudgments();
    },
    /**
     * Lấy dữ liệu loại vụ việc
     * Author: TTHIEN (12/02/2023)
     */
    getCaseTypes() {
      try {
        axios
          .get(APIConstant.BASE_URL + APIConstant.GET_CASE_TYPE_LIST)
          .then((response) => {
            this.caseTypes = response.data.data;
          })
          .catch((error) => {
            console.log(error);
          })

      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Lấy dữ liệu cấp tòa án
     * Author: TTHIEN (16/02/2023)
     */
    getCourtLevels() {
      try {
        axios
          .get(APIConstant.BASE_URL + APIConstant.GET_COURT_LEVEL_LIST)
          .then((response) => {
            this.courtLevels = response.data.data;
          })
          .catch((error) => {
            console.log(error);
          })

      } catch (error) {
        console.log(error);
      }
    },
    /**
     * Lấy dữ liệu cấp xét xử
     * Author: TTHIEN (16/02/2023)
     */
    getJudgmentLevels() {
      try {
        axios
          .get(APIConstant.BASE_URL + APIConstant.GET_JUDGMENT_LEVEL_LIST)
          .then((response) => {
            this.judgmentLevels = response.data.data;
          })
          .catch((error) => {
            console.log(error);
          })

      } catch (error) {
        console.log(error);
      }
    },
  }
};
</script>
<style>
@import url('../../assets/css/components/loading.css');

.panel-heading {
  background-color: #229865;
}
</style>
