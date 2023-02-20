<template>
    <div class="pop-up">
        <div class="pop-up__container">
            <div class="pop-up__content">
                <i class="fa icon fa-lg text-gradient text-center d-flex align-items-center justify-content-center" aria-hidden="true" :class="getClasses(color)"></i>
                <div id="txtMsg" class="pop-up__text">
                    <div class="text-content">
                        {{ message }}
                    </div>
                </div>
            </div>
            <div class="pop-up__line"></div>
            <div class="pop-up__footer">
                <div class="pop-up__footer-left">
                    <argon-button color="danger" @click="btnYesOnClick"  size="sm">Có</argon-button>
                </div>
                <div class="pop-up__footer-right">
                    <argon-button size="sm" color="success" @click="btnNoOnClick">Không</argon-button>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
import ArgonButton from "@/components/ArgonButton.vue";
import * as Utils from "@/utils/index";

export default {
    name: "PopUpWarning",
    props: ['message', "color"],
    components: { ArgonButton },

    methods: {
        /**
         * Thực hiện không đăng xuất
         * Author: TTHIEN(15/08/2022)
         */
        btnNoOnClick() {
            this.$emit("hidePopup", false);
        },


        /**
         * Thực hiện thao tác đăng xuất
         * Author: TTHIEN (16/08/2022)
         */
        btnYesOnClick() {
            this.$emit("hidePopup", false);
            Utils.handlingLogout();
            this.$router.replace({ name: "Signin" });
        },
        /**
         * Lấy color + icon phù hợp
         * Author: TTHIEN (19/02/2023)
         */
         getClasses: (color) => {
            var icon = 'fa-info-circle';
            if (color === 'warning') {
                icon = 'fa-exclamation-triangle';
            } else if (color === 'danger') {
                icon = 'fa-trash';
            }
            return `${icon} text-${color}`;
        }
    },
    data() {

    },
}
</script>

<style scoped>
@import url(../assets/css/components/popup.css);
.icon {
    width: 30px;
    height: 30px;
    vertical-align: middle;

}
</style>
