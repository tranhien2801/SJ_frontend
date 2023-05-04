<template>
    <div class="card overflow-hidden h-100 p-0">
        <div class="d-flex panel-heading text-gradient">
            <div class="border-0 d-flex flex-column font-weight-bold p-3">
                <h6 class="text-sm">
                    Ý kiến phản hồi đối với Bản án số:
                </h6>
                <span class="text-sm">
                    {{ judgment.judgment_number }} ngày {{ judgment.date_issued }}
                </span>
            </div>
        </div>
        <div class="d-flex flex-column mx-3 text-success my-3 font-weight-normal">
            <div class="d-flex flex-column mb-2">
                <label for="" class="form-check text-sm text-success font-weight-bold">Có thể làm nguồn án lệ <input
                        type="checkbox" v-model="precedent" class="form-check-input" value="1" /></label>
            </div>
            <label for="" class="text-sm text-success font-weight-bold">Lỗi bản án (Nếu có)</label>
            <div class="d-flex">
                <div class="d-flex flex-column col-md-6">
                    <div class="d-flex mb-2">
                        <input v-model="judgmentError.error" type="radio"
                            class="radio align-items-center justify-content-center" name="radio-group" value="1">
                        <label for="" class="text-sm font-weight-normal">Lỗi chính tả</label>
                    </div>
                    <div class="d-flex">
                        <input v-model="judgmentError.error" type="radio" class="radio" name="radio-group" value="2">
                        <label for="" class="text-sm font-weight-normal">Lỗi font</label>
                    </div>
                </div>
                <div class="d-flex flex-column col-md-6 ms-auto mb-2">
                    <div class="d-flex mb-2">
                        <input v-model="judgmentError.error" type="radio" class="radio" name="radio-group" value="3">
                        <label for="" class="text-sm font-weight-normal">Lỗi nội dung</label>
                    </div>
                    <div class="d-flex">
                        <input v-model="judgmentError.error" type="radio" class="radio" name="radio-group" value="4">
                        <label for="" class="text-sm font-weight-normal">Khác</label>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column">
                <label for="" class="text-sm text-success font-weight-bold">Nhập mô tả lỗi</label>
                <textarea v-model="judgmentError.error_content" class="form-control" />
            </div>
            <argon-button color="success" class="my-3" size="md" variant="gradient" @click="reportJudgment">Gửi phản
                hồi</argon-button>

        </div>
    </div>
    <PopUpValidate v-show="isShowPopupValidate" :message="message" :color="color" @hidePopupValidate="hidePopupValidate" />
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
import * as APIConstant from "@/const/api.const";
import * as Utils from "@/utils/index";
import ArgonButton from "@/components/ArgonButton.vue";
import PopUpValidate from "../../components/PopUpValidate.vue";

export default {
    name: "JudgmentResponse",
    props: ["judgment"],
    components: {
        ArgonButton,
        PopUpValidate,
    },
    data() {
        return {
            judgmentError: {},
            isShowPopupValidate: false,
            message: "",
            color: "success",
            precedent: false,
        }
    },
    methods: {
        /**
         * Report lỗi bản án
         * Author: TTHIEN(24/02/2023)
         */
        reportError() {
            this.judgmentError.user_uid = Cookies.get(APIConstant.USER_ID);
            this.judgmentError.judgment_uid = this.judgment.uid;
            axios({
                method: "post",
                url: APIConstant.BASE_URL + APIConstant.REPORT_JUDGMENT_ERROR,
                headers: { 'Authorization': 'Bearer ' + Cookies.get(APIConstant.KEY_TOKEN) },
                data: this.judgmentError
            })
                .then((response) => {
                    if (response.status != APIConstant.STT_OK) {
                        this.message = response.data.error;
                        this.isShowPopupValidate = true;
                        this.color = "danger";
                    } else {
                        this.message = "Gửi ý kiến phản hồi về bản án " + this.judgment.judgment_number + " thành công";
                        this.isShowPopupValidate = true;
                        this.color = "success";
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.message = Utils.formatResponseError(error);
                    this.isShowPopupValidate = true;
                    this.color = "danger";
                })
        },
        /**
         * Gửi phản hồi về bản án
         * Author: TTHIEN(22/04/2023)
         */
        reportJudgment() {
            if (this.precedent) {
                console.log("Bình chọn làm án lệ...")
                this.voteJudgment();
            }
            if (this.judgmentError.error != null) {
                this.reportError();
            }
        },
        /**
         * Vote bản án làm án lệ
         * Author: TTHIEN(22/04/2023)
         */
        voteJudgment() {
            try {
                var uid = this.judgment.uid;
                axios({
                    method: "get",
                    url: APIConstant.BASE_URL + APIConstant.GET_JUDGMENT + uid + "/vote",
                    headers: { 'Authorization': 'Bearer ' + Cookies.get(APIConstant.KEY_TOKEN) },
                })
                    .then((response) => {
                        console.log(response);
                        if (response.status != APIConstant.STT_OK) {
                            this.message = response.data.error;
                            this.isShowPopupValidate = true;
                            this.color = "danger";
                        } else {
                            this.message = "Gửi ý kiến phản hồi về bản án " + this.judgment.judgment_number + " thành công";
                            this.isShowPopupValidate = true;
                            this.color = "success";
                        }
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
    },
};
</script>
<style scoped>
.panel-heading {
    background-color: #229865;
    border-bottom: dashed 1px #229865;
}

.radio {
    cursor: pointer;
    position: relative;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid #d2d6da;
}
</style>