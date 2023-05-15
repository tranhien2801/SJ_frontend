<template>
    <div class="card overflow-hidden position-relative">
        <div class="d-flex flex-column mx-3 text-success mt-3 font-weight-normal">
            <argon-button color="success" class="" size="md" variant="gradient" @click="summarizeJudgment">Tóm tắt bản
                án</argon-button>
            <div class="d-flex flex-column text-dark font-weight-normal text-sm mt-3">{{ judgment_summarization }}
            </div>
          
        </div>
        <div v-if="summarizing == 'true'" class="flex d-flex flex-column justify-content-center align-items-center">
            <div class="spinner-border text-success"
            role="status">
        </div>
        <div class="text-success text-center" style="width: 100%;">Đang tóm tắt bản án...</div>
        </div>
        <div class="mb-3"></div>
        
    </div>
</template>

<script>
import axios from "axios";
import * as APIConstant from "@/const/api.const";
import Cookies from "js-cookie";
import ArgonButton from "@/components/ArgonButton.vue";

export default {
    name: "JudgmentSummarization",
    props: ["uid"],
    components: {
        ArgonButton,
    },
    data() {
        return {
            judgment_summarization: null,
            summarizing: null
        }
    },
    created() {
        this.summarizing = Cookies.get(APIConstant.SUMMARIZING);
    },
    methods: {
        /**
         * Thực hiện việc tóm tắt bản án
         * Author: TTHIEN(06/05/2023)
         */
        summarizeJudgment() {
            try {
                Cookies.set(APIConstant.SUMMARIZING, true);
                this.summarizing = Cookies.get(APIConstant.SUMMARIZING);
                axios({
                    method: "get",
                    url: APIConstant.BASE_URL_SEARCH + APIConstant.SUMMARIZATION_JUDGMENT + this.uid,
                })
                    .then((response) => {
                        console.log(response);
                        this.judgment_summarization = response.data.data;
                        Cookies.set(APIConstant.SUMMARIZING, false);
                        this.summarizing = Cookies.get(APIConstant.SUMMARIZING);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            } catch (error) {
                console.log(error);
            }
        }

    },
};
</script>
<style scoped></style>