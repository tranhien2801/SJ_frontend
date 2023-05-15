<template>
    <div class="card">
        <div class="card-body">
            <p class="text-uppercase text-sm">Thông tin tài khoản</p>
            <div class="row">
                <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label">Tên tài khoản</label>
                    <input class="form-control" type="text" v-model="user.name" ref="txtName"
                        title="Tên người dùng không được để trống" @blur="validateRequired" />
                    <div class="name__missing">Tên không được để trống</div>
                </div>
                <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label">Cấp tài khoản</label>
                    <Multiselect v-model="user.level" :placeholder="user.level" label="value" track-by="value"
                        :options="levels">
                    </Multiselect>
                </div>
                <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label">Email</label>
                    <input id="readonly" type="email" class="form-control" v-model="user.email" ref="txtEmail"
                        title="Email người dùng không được để trống" @blur="validateRequired" />
                    <div class="name__missing">Email không được để trống</div>
                </div>
                <div class="col-md-6" v-show="this.mode === '1'">
                    <label for="example-text-input" class="form-control-label">Mật khẩu</label>
                    <input class="form-control" type="password" v-model="user.password" ref="txtPassword"
                        title="Mật khẩu không được để trống" @blur="validateRequired" />
                    <div class="name__missing">Mật khẩu không được để trống</div>
                </div>
                <div class="col-md-6" v-show="this.mode === '2'">
                    <label for="example-text-input" class="form-control-label">Trạng thái tài khoản</label>
                    <Multiselect v-model="user.state" :placeholder="user.state" track-by="value" label="value"
                        :options="states">
                    </Multiselect>
                </div>
                <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label">Thời hạn sử dụng</label>
                    <Multiselect v-model="user.usageTime" :placeholder="user.usageTime" track-by="value" label="value"
                        :options="usageTimes">
                    </Multiselect>
                </div>
                <div class="col-md-12">
                    <label for="example-text-input" class="form-control-label">Chức năng được thực hiện</label>
                    <input class="form-control" type="text" v-model="user.functions" />
                </div>
                <div class="col-md-12">
                    <label for="example-text-input" class="form-control-label">Quan tâm đến nội dung pháp
                        lý</label>
                    <Multiselect mode="tags" v-model="user.caseTypes" :placeholder="user.caseTypes" track-by="value"
                        label="value" :options="caseTypes">
                    </Multiselect>
                </div>

            </div>
            <hr class="horizontal dark" />
            <p class="text-uppercase text-sm">Thông tin liên lạc</p>
            <div class="row">
                <div class="col-md-12">
                    <label for="example-text-input" class="form-control-label">Đơn vị công tác</label>
                    <Multiselect v-model="user.unit" :placeholder="user.unit" track-by="value" label="value"
                        :options="units">
                    </Multiselect>
                </div>
                <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label">Số điện thoại</label>
                    <input class="form-control" type="tel" v-model="user.phoneNumber" />
                </div>

                <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label">Quyền, Chức vụ</label>
                    <Multiselect v-model="user.role" :placeholder="user.role" track-by="value" label="value"
                        :options="roles">
                    </Multiselect>
                </div>
                <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label">Công việc</label>
                    <input class="form-control" type="text" v-model="user.work" />
                </div>
                <div class="col-md-6">
                    <label for="example-text-input" class="form-control-label">Số lượng người trong doanh
                        nghiệp</label>
                    <input class="form-control" type="text" v-model="user.numberEmployee" />
                </div>
            </div>
            <div class="card-header pb-0">
                <div class="d-flex align-items-center">
                    <argon-button color="success" size="sm" class="ms-auto" @click="createUser">{{ nameButton
                    }}</argon-button>
                </div>
            </div>
        </div>
    </div>
    <PopUpValidate v-show="isShowPopupValidate" :message="message" :color="color" @hidePopupValidate="hidePopupValidate" />
</template>

<script>
import axios from "axios";
import Cookies from "js-cookie";
import * as APIConstant from "@/const/api.const";
import * as Utils from "@/utils/index";
import * as Data from "@/const/data.const";
import ArgonButton from "@/components/ArgonButton.vue";
import Multiselect from '@/libs/multiselect';
import PopUpValidate from "../../components/PopUpValidate.vue";

export default {
    name: "UserDetail",
    components: {
        ArgonButton, Multiselect, PopUpValidate,
    },
    props: ['userEdit', "nameButton", "mode"],
    data() {
        return {
            user: {},
            units: [],
            caseTypes: [],
            levels: Data.LEVELS,
            usageTimes: Data.USAGE_TIME,
            states: Data.STATES,
            roles: Data.ROLES,
            isShowPopupValidate: false,
            message: "",
            color: "success",
        };
    },
    created() {
        this.getUnits();
        this.getCaseTypes();
        if (Utils.isManager()) {
            this.user.level = Data.LEVEL_NAME.Enterprise;
            this.getInforAccount();
        }

    },
    updated() {
        if (this.userEdit) {
            this.user = this.userEdit;
        }
    },
    methods: {
        /**
         * Lấy dữ liệu đơn vị công tác
         * Author: TTHIEN (12/02/2023)
         */
        getUnits() {
            try {
                axios
                    .get(APIConstant.BASE_URL + APIConstant.GET_UNIT_LIST,
                        {
                            headers: { 'Authorization': 'Bearer ' + Cookies.get(APIConstant.KEY_TOKEN) }
                        })
                    .then((response) => {
                        this.units = response.data.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    })

            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Lấy dữ liệu loại vụ việc
         * Author: TTHIEN (12/02/2023)
         */
        getCaseTypes() {
            try {
                axios
                    .get(APIConstant.BASE_URL + APIConstant.GET_CASE_TYPE_LIST)
                    .then((response) => {
                        this.caseTypes = response.data.data;
                    })
                    .catch((error) => {
                        console.log(error);
                    })

            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Tạo tài khoản người dùng
         * Author: TTHIEN (12/02/2022)
         */
        createUser() {
            try {
                var me = this;

                // Validate dữ liệu
                var isValid = me.validateData();
                if (!isValid) {
                    this.color = "warning";
                    return;
                }
                if (this.mode == Data.MODES.Signup) {
                    console.log(this.user)
                    axios({
                        method: "post",
                        url: APIConstant.BASE_URL + APIConstant.CREATE_USER_LOGIN,
                        headers: { 'Authorization': 'Bearer ' + Cookies.get(APIConstant.KEY_TOKEN) },
                        data: me.user
                    })
                        .then((response) => {
                            if (response.status != APIConstant.STT_OK) {
                                this.message = response.data.error;
                                this.isShowPopupValidate = true;
                                this.color = "danger";
                            } else {
                                this.message = "Thêm tài khoản thành công";
                                this.isShowPopupValidate = true;
                                this.color = "success";
                                this.sendEmailConfirm();
                                this.$router.go();
                            }
                        })
                        .catch((error) => {
                            this.message = Utils.formatResponseError(error);
                            this.isShowPopupValidate = true;
                            this.color = "danger";
                        })
                } else {
                    // if (this.user != this.userEdit) {
                    console.log(this.user)
                    axios({
                        method: "put",
                        url: APIConstant.BASE_URL + APIConstant.EDIT_USER + me.user.uid,
                        headers: { 'Authorization': 'Bearer ' + Cookies.get(APIConstant.KEY_TOKEN) },
                        data: me.user
                    })
                        .then((response) => {
                            console.log(response)
                                this.message = "Sửa thông tin tài khoản thành công";
                                this.isShowPopupValidate = true;
                                this.color = "success";
                                this.$router.go();
                        })
                        .catch((error) => {
                            this.message = Utils.formatResponseError(error);
                            this.isShowPopupValidate = true;
                            this.color = "danger";
                        })
                    // } else {
                    //     this.message = "Dữ liệu không có sự thay đổi";
                    //     this.isShowPopupValidate = true;
                    //     this.color = "success";
                    // }
                }
            } catch (error) {
                console.log(error);
            }
        },
        /**
         * Thực hiện gửi email thông báo về việc sử dụng tài khoản
         * Author: TTHIEN(24/02/2023)
         */
        sendEmailConfirm() {
            try {
                axios({
                    method: "post",
                    url: APIConstant.BASE_URL + APIConstant.SEND_EMAIL_CONFIRM,
                    headers: { 'Authorization': 'Bearer ' + Cookies.get(APIConstant.KEY_TOKEN) },
                    data: this.user
                })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    })

            } catch (error) {
                console.log(error);
            }
        },
        /** 
         * Lấy thông tin tài khoản
         * Author: TTHIEN(07/05/2023)
         */
        getInforAccount() {
            try {
                axios({
                    method: "get",
                    url: APIConstant.BASE_URL + APIConstant.GET_USER + Cookies.get(APIConstant.USER_ID),
                    headers: { 'Authorization': 'Bearer ' + Cookies.get(APIConstant.KEY_TOKEN) },
                })
                    .then((response) => {
                        console.log(response);
                        console.log(response.data.data.unit.unitName)
                        this.user.unit = response.data.data.unit.unitName;
                    })
                    .catch((error) => {
                        console.log(error);
                    })

            } catch (error) {
                console.log(error);
            }
        },

        /**
         * Ẩn PopupValidate 
         * Author: TTHIEN (13/02/2023)
         */
        hidePopupValidate() {
            this.isShowPopupValidate = false;
        },
        /**
         * Thực hiện validate dữ liệu trước khi cất
         * Author: TTHIEN(13/02/2023)
         */
        validateData() {
            var isValid = true;
            if (!this.user.name) {
                isValid = false;
                this.message = "Tên người dùng không được bỏ trống";
                this.isShowPopupValidate = true;
                // Thêm border màu đỏ cho input hiện tại
                this.$refs["txtName"].classList.add("input__error");
                return isValid;
            } else {
                isValid = true;
                // Loại bỏ border màu đỏ cho input hiện tại
                this.$refs["txtName"].classList.remove("input__error");
            }
            if (!this.user.email) {
                isValid = false;
                this.message = "Email người dùng không được bỏ trống";
                this.isShowPopupValidate = true;
                // Thêm border màu đỏ cho input hiện tại
                this.$refs["txtEmail"].classList.add("input__error");
                return isValid;
            } else {
                isValid = true;
                // Loại bỏ border màu đỏ cho input hiện tại
                this.$refs["txtEmail"].classList.remove("input__error");
            }
            if (this.userEdit) return isValid;
            if (!this.user.password) {
                isValid = false;
                this.message = "Mật khẩu không được bỏ trống";
                this.isShowPopupValidate = true;
                // Thêm border màu đỏ cho input hiện tại
                this.$refs["txtPassword"].classList.add("input__error");
                return isValid;
            } else if (this.user.password.length < 8) {
                isValid = false;
                this.message = "Mật khẩu phải có kích thước lớn hơn 8";
                this.isShowPopupValidate = true;
                return isValid;
            } else {
                isValid = true;
                // Loại bỏ border màu đỏ cho input hiện tại
                this.$refs["txtPassword"].classList.remove("input__error");
            }
            if (this.user.level == Data.LEVEL_NAME.Enterprise) {
                if (!this.user.unit) {
                    isValid = false;
                    this.message = "Đơn vị công tác không được để trống";
                    this.isShowPopupValidate = true;
                    return isValid;
                } else {
                    isValid = true;
                }
                console.log(this.user.role)
                if (this.user.role == null) {
                    isValid = false;
                    this.message = "Quyền, chức vụ không được để trống";
                    this.isShowPopupValidate = true;
                    return isValid;
                } else {
                    isValid = true;
                }
            }


            return isValid;
        },

        /**
        * Thực hiện validate dữ liệu bắt buộc nhập
        * Author: TTHIEN (14/02/2022)
        */
        validateRequired() {
            var value = event.currentTarget.value;
            if (!value) {
                // Thêm border màu đỏ cho input hiện tại
                event.currentTarget.classList.add("input__error");
                // Thêm title thông báo lỗi
            } else {
                // Loại bỏ border màu đỏ cho input hiện tại
                event.currentTarget.classList.remove("input__error");
                // Loại bỏ title thông báo lỗi
            }
        },


    }
}
</script>
<style>
@import url('../../assets/css/components/multiselect.css');

.name__missing {
    text-align: center;
    font-size: 0.875rem;
    width: 100%;
    padding: 3px 12px;
    position: absolute;
    visibility: hidden;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
}

#readonly {
    background-color: white;
}
</style>
