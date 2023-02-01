<template>
  <footer class="py-3 footer">
    <div class="container-fluid">
      <div class="row align-items-center justify-content-lg-between">
        <div class="mb-4 col-lg-6 mb-lg-0">
          <div
            class="text-sm text-center copyright text-muted"
            :class="this.$store.state.isRTL ? 'text-lg-end' : 'text-lg-start'"
          >
            ©
            {{ new Date().getFullYear() }}, <i class="fa fa-heart"></i> made by
            <a
              href="https://uet.vnu.edu.vn/"
              class="font-weight-bold"
              target="_blank"
              >Tran Hien - UET</a
            >
          
          </div>
        </div>
        <div class="col-lg-6">
          <ul
            class="nav nav-footer justify-content-center justify-content-lg-end"
          >
            <li class="nav-item">
              <a
                href="https://github.com/tranhien2801/SJ_backend"
                class="nav-link text-muted"
                target="_blank"
                >BackEnd</a
              >
            </li>
            <li class="nav-item">
              <a
                href="https://github.com/tranhien2801/SJ_frontend"
                class="nav-link text-muted"
                target="_blank"
                >FrontEnd</a
              >
            </li>
            <li class="nav-item">
              <a
                href="https://github.com/tranhien2801/SJ_CrawlData"
                class="nav-link text-muted"
                target="_blank"
                >Crawl Data</a
              >
            </li>            
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "app-footer",
};
</script>
