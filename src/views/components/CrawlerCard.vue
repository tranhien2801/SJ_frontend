<template>
    <div class=" mx-5 fit-content position-relative">
        <div class="card overflow-hidden h-100 p-0">
            <div class="d-flex panel-heading text-gradient">
                <div class="border-0 d-flex flex-column font-weight-bold p-3 mb-0">
                    <h6 class="mb-0 text-center">
                        Chọn thời gian crawl bản án
                    </h6>
                </div>
            </div>
            <div class="d-flex flex-column mx-4 mb-4 text-success">
                <span class="mb-3 text-sm font-weight-bold">
                    Từ ngày
                    <input v-model="filter.date_from" type="date" class="form-control" ref="txtDateFrom"/>
                </span>
                <span class="mb-3 text-sm font-weight-bold">
                    Đến ngày
                    <input v-model="filter.date_to" type="date" class="form-control" ref="txtDateTo"/>
                </span>
                <argon-button color="success" size="md" variant="gradient" @click="btnCrawlJudgment">Crawl dữ
                    liệu</argon-button>
            </div>
        </div>
        <div v-if="crawling == 'true'" class="flex d-flex flex-column justify-content-center align-items-center">
            <div class="mt-3 spinner-border text-success "
                role="status">
            </div>
            <div class="text-success text-center" style="width: 100%;">Đang crawl bản án...</div>
        </div>
    </div>
    <PopUpValidate v-show="isShowPopupValidate" :message="message" :color="color" @hidePopupValidate="hidePopupValidate" />
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import axios from "axios";
import * as APIConstant from "@/const/api.const";
import PopUpValidate from "../../components/PopUpValidate.vue";
import Cookies from "js-cookie";
import * as Utils from "../../utils/index";

export default {
    name: "crawler-card",
    components: {
        ArgonButton,
        PopUpValidate
    },
    data() {
        return {
            filter: {
                date_from: "",
                date_to: "",
            },
            crawling: null,
            message: "",
            color: "success",
            isShowPopupValidate: false,
        }
    },
    created() {
        this.crawling = Cookies.get(APIConstant.CRAWLING) 
    },
    methods: {
        /**
         * Thực hiện crawl bản án/quyết định
         * Author: TTHIEN(04/05/2023)
         */
        btnCrawlJudgment() {
            try {
                var isValid = this.validateData();
                if (!isValid) {
                    this.color = "warning";
                    return;
                }
                Cookies.set(APIConstant.CRAWLING, true);
                this.crawling = Cookies.get(APIConstant.CRAWLING);
                console.log(this.filter)
                axios({
                    method: "post",
                    url: APIConstant.BASE_URL_SEARCH + APIConstant.CRAWL_JUDGMENTS,
                    data: this.filter
                })
                .then((response) => {
                    Utils.saveInforCrawled(response.data.data)
                    this.crawling = Cookies.get(APIConstant.CRAWLING);
                    this.$router.go();
                })
                .catch((error) => {
                    console.log(error);
                })

            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Ẩn PopupValidate 
         * Author: TTHIEN (13/02/2023)
         */
         hidePopupValidate() {
            this.isShowPopupValidate = false;
        },
         /**
         * Thực hiện validate dữ liệu trước khi cất
         * Author: TTHIEN(13/02/2023)
         */
         validateData() {
            var isValid = true;
            if (this.filter.date_from == "") {
                isValid = false;
                this.message = "Ngày bắt đầu crawl không được bỏ trống";
                this.isShowPopupValidate = true;
                // Thêm border màu đỏ cho input hiện tại
                this.$refs["txtDateFrom"].classList.add("input__error");
                return isValid;
            } else {
                isValid = true;
                // Loại bỏ border màu đỏ cho input hiện tại
                this.$refs["txtDateFrom"].classList.remove("input__error");
            }
            if (!this.filter.date_to) {
                isValid = false;
                this.message = "Ngày kết thúc crawl không được bỏ trống";
                this.isShowPopupValidate = true;
                // Thêm border màu đỏ cho input hiện tại
                this.$refs["txtDateTo"].classList.add("input__error");
                return isValid;
            } else {
                isValid = true;
                // Loại bỏ border màu đỏ cho input hiện tại
                this.$refs["txtDateTo"].classList.remove("input__error");
            }
            return isValid;
        },
    }
}

</script>
