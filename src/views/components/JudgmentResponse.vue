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
        <div class="d-flex flex-column mx-3 text-success my-4 font-weight-normal">
            <div class="d-flex">
                <div class="d-flex flex-column col-md-6">
                    <div class="d-flex mb-3">
                        <input type="radio" class="radio align-items-center justify-content-center" name="radio-group" value="1">
                        <label for="" class="text-sm font-weight-normal">Lỗi chính tả</label>
                    </div>
                    <div class="d-flex">
                        <input type="radio" class="radio" name="radio-group" value="2">
                        <label for="" class="text-sm font-weight-normal">Lỗi font</label>
                    </div>
                </div>
                <div class="d-flex flex-column col-md-6 ms-auto mb-3">
                    <div class="d-flex mb-3">
                        <input type="radio" class="radio" name="radio-group" value="3">
                        <label for="" class="text-sm font-weight-normal">Lỗi nội dung</label>
                    </div>
                    <div class="d-flex">
                        <input type="radio" class="radio" name="radio-group" value="4">
                        <label for="" class="text-sm font-weight-normal">Khác</label>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column">
                <label for="" class="text-sm text-success font-weight-bold">Nhập mô tả lỗi</label>
                <argon-textarea type="text" class="" />
            </div>
            <argon-button color="success" size="md" variant="gradient">Gửi phản hồi</argon-button>

        </div>
    </div>
</template>

<script>
import ArgonButton from "@/components/ArgonButton.vue";
import ArgonTextarea from "../../components/ArgonTextarea.vue";

export default {
    name: "JudgmentResponse",
    props: ["judgment"],
    components: {
        ArgonButton,
        ArgonTextarea,
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