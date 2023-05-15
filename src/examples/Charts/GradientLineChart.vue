<template>
  <div class="card">
    <div class="pb-0 card-header mb-0">
      <h6>{{ title }}</h6>

    </div>
    <div class="p-3 card-body">
      <div class="chart">
        <canvas id="chart-line" class="chart-canvas" height="500"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import axios from "axios";
import * as APIConstant from "@/const/api.const";

export default {
  name: "gradient-line-chart",

  props: {
    title: {
      type: String,
      default: "Bản án đã crawl",
    },
  },
  data() {
    return {
      data: []
    }
  },
  created() {
    // this.getDataChart();
  },
  methods: {
    /**
     * Lấy dữ liệu cho biểu đồ
     * Author: TTHIEN(04/05/2023)
     */
    getDataChart() {
      try {
        return axios.get(APIConstant.BASE_URL + APIConstant.GET_DATA_CHART)
      } catch (error) {
        console.log(error);
      }
    }
  },

  mounted() {
    this.getDataChart().then((response) => {
      this.data = response.data.data;
      var ctx1 = document.getElementById("chart-line").getContext("2d");

      new Chart(ctx1, {
        type: "bar",
        data: {
          labels: ["Hình sự", "Dân sự", "Kinh doanh thương mại", "Hôn nhân và gia đình", "Quyết định áp dụng biện pháp xử lý hành chính", "Hành chính", "Quyết định tuyên bố phá sản", "Lao động"],
          datasets: [
            {
              label: "Bản án/Quyết định",
              tension: 0.4,
              borderWidth: 0,
              pointRadius: 0,
              borderColor: "#4BB543 ",
              backgroundColor: "#4BB543 ",
              fill: true,
              data: this.data,
              maxBarThickness: 35,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
          scales: {
            y: {
              grid: {
                drawBorder: false,
                display: true,
                drawOnChartArea: true,
                drawTicks: false,
                borderDash: [5, 5],
              },
              ticks: {
                display: true,
                padding: 10,
                color: "#fbfbfb",
                font: {
                  size: 11,
                  family: "Open Sans",
                  style: "normal",
                  lineHeight: 2,
                },
              },
            },
            x: {
              grid: {
                drawBorder: false,
                display: false,
                drawOnChartArea: false,
                drawTicks: false,
                borderDash: [5, 5],
              },
              ticks: {
                display: true,
                color: "#ccc",
                padding: 20,
                font: {
                  size: 11,
                  family: "Open Sans",
                  style: "normal",
                  lineHeight: 2,
                },
              },
            },
          },
        },
      });
    })

  },
};
</script>
