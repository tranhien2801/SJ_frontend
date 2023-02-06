<template>
    <iframe :src="judgment.pdfViewer"></iframe>

</template>
<script>
import axios from "axios";
import * as APIConstant from "@/const/api.const";

export default {
    name: "JudgmentIframe",
    components: {

    },
    props: ["uid"],
    created() {
        this.detailJudgment();
    },
    data() {
        return {
            judgment: {},
        }
    },
    methods: {
        /**
         * Lấy thông tin chi tiết của một bản án với uid
         * Author: TTHIEN (06/02/2023)
         */
        detailJudgment() {
            var me = this;
            var token = window.localStorage.getItem("token");
            axios
                .get(APIConstant.BASE_URL + APIConstant.GET_JUDGMENT + me.uid,
                    {
                        headers: { 'Authorization': 'Bearer ' + token }
                    })
                .then((response) => {
                    console.log(me.uid);
                    console.log(response)
                    if (response.data.status == 200)
                        me.judgment = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
}
</script>