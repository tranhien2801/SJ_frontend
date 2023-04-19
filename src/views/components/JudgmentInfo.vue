<template>
    <div class="card h-100 overflow-hidden p-0">
        <div class="d-flex panel-heading text-gradient">
            <div class="border-0 d-flex flex-column font-weight-bold p-3">
                <h6 class="text-sm">
                    {{  judgment.type_document }} số: {{ judgment.judgment_number }}
                </h6>
                <span class="text-xs">
                    <span class="text-dark">Ngày tuyên án: {{ judgment.date_issued }}</span>
                </span>
            </div>
            <div class="ms-auto text-end mb-3">
                <a class="btn btn-link text-success text-gradient px-3 mb-0" href="javascript:;">
                    <i class="far fa-eye me-2" aria-hidden="true"></i>{{ judgment.count_eyes }} 
                </a>
                <a class="btn btn-link text-success text-gradient px-3 mb-0" :href="judgment.file_download">
                    <i class="fas fa-thin fa-download text-dark me-2" aria-hidden="true"></i>{{ judgment.count_download }}
                </a>
            </div>
        </div> 
        <div class="d-flex flex-column mx-3 text-success my-3" style="overflow-y: auto;">
            <span class="mb-2 text-sm font-weight-bold">
                Tên bản án: 
              <span class="text-dark font-weight-normal">{{ judgment.judgment_name }}</span>
            </span>
            <span class="mb-2 text-sm font-weight-bold">
                Đối tượng khởi kiện: 
              <span class="text-dark font-weight-normal">{{ judgment.case_name }}</span>
            </span>
            <span class="mb-2 text-sm font-weight-bold">
                Cấp xét xử: 
              <span class="text-dark font-weight-normal">{{ judgment.judgment_level }}</span>
            </span><span class="mb-2 text-sm font-weight-bold">
                Tòa án xét xử: 
              <span class="text-dark font-weight-normal">{{ judgment.court_name }}</span>
            </span><span class="mb-2 text-sm font-weight-bold">
                Tóm tắt nội dung bản án: 
              <span class="text-dark font-weight-normal">{{ judgment.judgment_content }}</span>
            </span><span class="mb-2 text-sm font-weight-bold">
                Tổng số lượt được bình chọn làm nguồn phát triển án lệ: 
              <span class="">{{ judgment.count_vote }}</span>
            </span>
        </div>
    </div>
</template>

<script>

export default {
    name: "JudgmentInfo",
    props: ["judgment"],
};
</script>
<style scoped>

.panel-heading{
    background-color: #229865;
    border-bottom: dashed 1px #229865;
}

</style>