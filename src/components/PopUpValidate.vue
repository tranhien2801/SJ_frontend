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
            <div class="pop-up__footer pop-up__center">
                <argon-button :color="color" variant="gradient" size="sm" class=""
                    @click="btnCloseOnClick">Đóng</argon-button>
            </div>
        </div>
    </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";

export default {
    name: "PopupValidate",
    props: ["message", "color"],
    components: { ArgonButton },

    methods: {
        /**
         * Thực hiện đóng popup
         * Author: TTHIEN (13/02/2023)
         */
        btnCloseOnClick() {
            this.$emit("hidePopupValidate", false);
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
    }
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