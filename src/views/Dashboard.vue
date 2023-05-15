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
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.judgment.title"
              :value="stats.judgment.value"
              :iconClass="stats.judgment.iconClass"
              :iconBackground="stats.judgment.iconBackground"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.users.title"
              :value="stats.users.value"
              :iconClass="stats.users.iconClass"
              :iconBackground="stats.users.iconBackground"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.newest.title"
              :value="stats.newest.value"
              :iconClass="stats.newest.iconClass"
              :iconBackground="stats.newest.iconBackground"
              directionReverse
            ></card>
          </div>
          <div class="col-lg-3 col-md-6 col-12">
            <card
              :title="stats.crawler.title"
              :value="stats.crawler.value"
              :iconClass="stats.crawler.iconClass"
              :iconBackground="stats.crawler.iconBackground"
              :percentageColor="stats.crawler.percentageColor"
              :percentage="stats.crawler.percentage"
              :detail="stats.crawler.detail"
              directionReverse
            ></card>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-7 mb-lg">
            <!-- line chart -->
            <div class="card z-index-2">
              <gradient-line-chart />
            </div>
          </div>
          <div class="col-lg-5 mt-8">
            <crawler-card />
          </div>
        </div>
      </div>
    </div>
  </div>
  </main>
</template>
<script>
import Card from "@/examples/Cards/Card.vue";
import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
import axios from "axios";
import * as APIConstant from "@/const/api.const";
import CrawlerCard from "./components/CrawlerCard.vue";
import Cookies from "js-cookie";
import * as DateUtils from "../utils/date.utils.js";


export default {
  name: "dashboard-default",
  methods: {
    getDataForDashBoard() {
      try {
            axios
                .get(APIConstant.BASE_URL + APIConstant.GET_DATA_DASHBOARD)
                .then((response) => {
                    this.stats.judgment.value = response.data.data.total_judgments;
                    this.stats.users.value = response.data.data.total_users;
                    this.stats.newest.value = DateUtils.formatDate(response.data.data.date_newest);
                })
                .catch((error) => {
                    console.log(error);
                })

            } catch (error) {
                console.log(error);
            }
    }
  },
  created() {
    this.getDataForDashBoard();
    this.stats.crawler.value = Cookies.get(APIConstant.DATE_CRAWLED_NEWEST);
    this.stats.crawler.percentage = Cookies.get(APIConstant.NUMBER_JUDGMENTS_CRAWLED);
    if (this.stats.crawler.percentage)  this.stats.crawler.detail = " bản án/quyết định";
  },
  data() {
    return {
      stats: {
        judgment: {
          title: "Bản án đã crawl",
          value: null,
          iconClass: "ni ni-money-coins",
          iconBackground: "bg-gradient-primary",
        },
        users: {
          title: "Người dùng hệ thống",
          value: null,
          iconClass: "fa fa-user",
          iconBackground: "bg-gradient-danger",
        },
        crawler: {
          title: "Thời gian crawl gần nhất",
          value: null,
          iconClass: "fa fa-calendar",
          percentageColor: "text-success",
          iconBackground: "bg-gradient-success",
          detail: null,
          percentage: null
        },
        newest: {
          title: "Bản án công bố gần nhất",
          value: null,
          percentage: "+5%",
          iconClass: "fa fa-calendar",
          iconBackground: "bg-gradient-warning",
          detail: "than last month",
        },
      },
    };
  },
  components: {
    Card,
    GradientLineChart,
    CrawlerCard
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
