<template>
    <div class="" >
        <div class="card overflow-auto">
            <div class="card-header pb-0 d-flex ">
                <h6 class="mb-0 text-success align-items-center justify-content-center" style="text-align: center; !important">Bản án/Quyết định đề xuất</h6>
            </div>
            <div class="card-body p-3 overflow-auto" style="position: sticky !important; height: 90vh;">
                <ul class="list-group">
                    <li class="list-group-item border-0 d-flex mb-3 p-3 bg-gray-100 border-radius-lg"
                        v-for="judgment in judgments" :key="judgment.uid">
                        <div class="d-flex flex-column mx-2">
                            <h6 class="mb-2 text-sm text-dark text-gradient font-weight-bold">{{ judgment.title }}
                            </h6>
                            <span class="mb-2 text-xs text-dark text-gradient font-weight-bold">Tóm tắt nội dung:
                                <span class="text-dark text-gradient font-weight-normal">{{ judgment.judgment_content
                                }}</span>
                            </span>

                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name: "judgment-recommended",
    props: ['judgments'],
    components: {

    },
    data() {
        return {

        }
    },
    mounted() {
        this.$store.state.isAbsolute = true;
    },
    methods: {

    }
}
</script>