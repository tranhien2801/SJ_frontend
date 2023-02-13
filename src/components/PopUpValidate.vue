<template>
    <div class="pop-up">
        <div class="pop-up__container">
            <div class="pop-up__content">
                <div id="iconMsg" class="pop-up__icon icon icon-48 icon-validate"></div>
                <div id="txtMsg" class="pop-up__text">
                    <div class="text-content">
                        {{message}}
                    </div>
                </div>
            </div>
            <div class="pop-up__line"></div>
            <div class="pop-up__footer pop-up__center">
                <argon-button color="success" size="sm" class="" @click="btnCloseOnClick">Đóng</argon-button>                
            </div>
        </div>
    </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";

    export default {
        name: "PopupValidate",
        props: ["message"],
        components: { ArgonButton },

        methods: {
            /**
             * Thực hiện đóng popup
             * Author: TTHIEN (13/02/2023)
             */
            btnCloseOnClick() {
                this.$emit("hidePopupValidate", false);
            }
        }
    }
</script>

<style scoped>
    @import url(../assets/css/components/popup.css);
</style>