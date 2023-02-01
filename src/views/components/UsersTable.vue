<template>
  <div class="card">
    <div class="card-header pb-0">
      <h6>Danh sách người dùng hệ thống</h6>
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th> <argon-checkbox id="checkboxId"></argon-checkbox>
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Thông tin cá nhân</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Cấp tài khoản</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Trạng thái
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Thời gian sử dụng
              </th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Chức vụ</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Công việc</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Số người trong doanh
                nghiệp</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Nội dung pháp lý quan
                tâm</th>
              <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Chức năng được thực
                hiện</th>
              <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">#</th>
              <th class="text-secondary opacity-7"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.uid">
              <td> <argon-checkbox id="checkboxId" class=""></argon-checkbox>
              </td>
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ user.name }}</h6>
                    <p class="text-xs text-secondary mb-0"> {{ user.email }}</p>
                    <p class="text-xs text-secondary mb-0">{{ user.phone_number }}</p>
                  </div>
                </div>
              </td>
              <td>
                <span class="text-secondary text-xs font-weight-bold">{{ user.power }}</span>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-success">Online</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold"> {{ user.usage_time }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{ user.role }}</span>
              </td>
              <td>
                <p class="text-xs font-weight-bold mb-0">{{ user.unit_name }}</p>
                <p class="text-xs text-secondary mb-0">{{ user.work_name }}</p>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{ user.number_staff }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{ user.case_type }}</span>
              </td>
              <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">{{ user.function }}</span>
              </td>
              <td class="align-middle">
                <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                  data-original-title="Edit user">Edit</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import * as APIConstant from "@/const/api.const"
import ArgonCheckbox from "@/components/ArgonCheckbox.vue";

export default {
  name: "users-table",
  components: {
    ArgonCheckbox,
  },
  data() {
    return {
      users: [],
    }
  },
  /**
   * Lấy dữ liệu người dùng hệ thống khi component được tạo thành công
   * Author: TTHIEN (31/01/2023)
   */
  created() {
    this.filterUsers();
  },
  methods: {
    /**
     * Lấy dữ liệu cho việc tìm kiếm/ phân trang người dùng
     * Author: TTHIEN (31/01/2023)
     */
    filterUsers() {
      try {
        var token = window.localStorage.getItem("token");
        axios
          .get(APIConstant.BASE_URL + APIConstant.GET_USER_LIST,
            {
              headers: { 'Authorization': 'Bearer ' + token }
            })
          .then((response) => {
            console.log(response);
            this.users = response.data.data;
          })
          .catch((error) => {
            console.log(error);
          })

      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>
