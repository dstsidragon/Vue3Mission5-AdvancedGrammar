import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.11/vue.esm-browser.js';
import loginOut from './components/loginOut.js';
import pagination from './components/pagination.js';
import viewContent from './components/viewContentModal.js';

// Object.keys(VeeValidateRules).forEach(rule => {
//     if (rule !== 'default') {
//       VeeValidate.defineRule(rule, VeeValidateRules[rule]);
//     }
//   });
//   VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// VeeValidate.configure({
//   generateMessage: VeeValidateI18n.localize('zh_TW'),
//   validateOnInput: true, // 調整為輸入字元立即進行驗證
// });


createApp({
    components: {
        //modal-登出
        loginOut,
        //分頁
        pagination,
        //modal-查看內容
        viewContent,
    },
    data() {
        return {
            //產品資料
            productData: [],
            //分頁
            pagination: [],
            // 使用者名稱
            userName: "訪客",
            //登入/登出鈕
            login_status: false,
            //取得token
            token: document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
            //資料筆數
            dataLength: 0,
            //單一產品資料
            product: {},
            //讀取狀態
            loadingStatue: {
                //查看內容鈕
                viewContentStatus: "",
                //加到購物車鈕
                addCart: "",
                //刪除購物車鈕
                delCart: "",
                //清空購物車鈕
                clearCart: "",
                //送出購物車鈕
                sendCart: "",
            },
            //購物車資料
            cartList: {},
            //購物車數量
            cartsNum: 0,
        }
    },
    methods: {
        // 登出
        signOutAdmin(e) {
            axios.post(`${api_url}/logout`)
                .then(
                    res => {
                        // console.log(res);
                        //如果成功就執行
                        if (res.data.success) {
                            alert(res.data.message);

                            //刪除cookie
                            this.deleteAllCookies();
                            //跳轉頁面
                            window.location = "login.html";
                        } else {
                            alert("未知的錯誤!");

                            //跳轉頁面
                            window.location = "login.html";
                        }
                    }
                )
        },
        //刪除cookie
        deleteAllCookies() {
            let cookies = document.cookie.split(";");

            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i];
                let eqPos = cookie.indexOf("=");
                let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        },
        //判斷使用者值
        chkUserName() {
            // 如果有取到值 ，代表已登入
            if (document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== "") {
                this.userName = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                // 登入狀態
                this.login_status = true;
            } else {
                this.userName = "訪客";
                // 登入狀態
                this.login_status = false;
            }
        },
        //取得商品列表
        getProduct(page = 1) {
            axios.get(`${api_url}/api/${api_path}/products?page=${page}`)
                .then(
                    res => {
                        // console.log(res);
                        //如果成功就執行
                        if (res.data.success) {
                            this.productData = res.data.products;
                            this.pagination = res.data.pagination;
                            //將資料筆數更新
                            this.dataLength = this.productData.length;
                        } else {
                            alert('驗證錯誤，請重新登入!');

                            //跳轉頁面
                            window.location = "login.html";
                        }
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
        },
        //加入購物車
        addCart(id, qty = 1) {
            this.loadingStatue.addCart = id;
            // console.log(id)
            // console.log(qty)
            const product = {
                data: {
                    product_id: id,
                    qty: parseInt(qty),
                }
            };
            // console.log(product)
            axios.post(`${api_url}/api/${api_path}/cart`, product)
                .then(
                    res => {
                        // console.log(res);
                        //如果成功就執行
                        if (res.data.success) {
                            this.loadingStatue.addCart = "";
                            alert(`${res.data.message}!`);

                            //刷新購物車
                            this.getCartList();
                        } else {

                            // console.log(res.data.message)
                            alert(`${res.data.message}!`);
                        }
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
        },
        //打開商品詳細內容modal
        openViewContentModal(item) {
            // console.log(item)
            // console.log(item.id)

            this.loadingStatue.viewContentStatus = item.id;

            axios.get(`${api_url}/api/${api_path}/product/${item.id}`)
                .then(
                    res => {
                        // console.log(res);
                        //如果成功就執行
                        if (res.data.success) {
                            //   console.log(res.data)
                            this.product = res.data.product;


                            // 清空資料
                            this.loadingStatue.viewContentStatus = "";
                            this.$refs.viewContent.openModal();
                        } else {
                            alert('驗證錯誤，請重新登入!');
                            console.log(res)
                            //跳轉頁面
                            window.location = "login.html";
                        }
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
        },
        //大量加進購物車
        addItemsToCart(item) {
            console.log(item)
            const product = {
                data: {
                    product_id: item.id,
                    qty: item.qty
                }
            };
            console.log(product)
            axios.post(`${api_url}/api/${api_path}/cart`, product)
                .then(
                    res => {
                        // console.log(res);
                        //如果成功就執行
                        if (res.data.success) {

                            alert(`${res.data.message}!`);
                            console.log(res);
                            this.$refs.viewContent.closeModal();

                            //刷新購物車
                            this.getCartList();
                        } else {

                            // console.log(res.data.message)
                            alert(`${res.data.message}!`);
                        }
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
        },
        //取得購物車列表
        getCartList() {

            axios.get(`${api_url}/api/${api_path}/cart`)
                .then(
                    res => {
                        if (res.data.success) {
                            // console.log(res)
                            // console.log(res.data.data);

                            this.cartList = res.data.data;
                        } else {

                            alert(res.data.message);
                        }
                    }
                )
                .catch(
                    err => {
                        // console.log(err)
                        alert(res.data.message);
                    }
                )

        },
        //刪除購物車商品
        delCartItem(id) {
            // console.log(id)
            this.loadingStatue.delCart = id;
            axios.delete(`${api_url}/api/${api_path}/cart/${id}`)
                .then(
                    res => {
                        console.log(res)
                        if (res.data.success) {
                            //刷新購物車
                            this.getCartList();
                            //清空讀取狀態
                            this.loadingStatue.delCart = "";
                            alert(res.data.message);
                        } else {

                            alert(res.data.message);
                        }
                    }
                )
                .catch(
                    err => {
                        console.log(err)
                        alert(res.data.message);
                    }
                )
        },
        //清空購物車商品
        clearCart() {
            // console.log(id)
            this.loadingStatue.clearCart = 1;
            axios.delete(`${api_url}/api/${api_path}/carts`)
                .then(
                    res => {
                        console.log(res)
                        if (res.data.success) {
                            //刷新購物車
                            this.getCartList();
                            alert(res.data.message);
                            this.loadingStatue.clearCart = "";

                        } else {

                            alert(res.data.message);
                        }
                    }
                )
                .catch(
                    err => {
                        console.log(err)
                        alert(res.data.message);
                    }
                )
        },
        //改動購物車商品數量
        rediCartItemsNum(item) {
            // console.log(item)
            const cart_item = {
                "data": { "product_id": item.product_id, "qty": parseInt(item.qty) }
            };
            // console.log(cart_item)
            axios.put(`${api_url}/api/${api_path}/cart/${item.id}`, cart_item)
                .then(
                    res => {
                        // console.log(res)
                        if (res.data.success) {
                            this.getCartList();
                        } else {
                            alert(res.data.message)
                        }
                    }
                )
                .catch(
                    err => {
                        console.log(err)
                        alert(res.data.message)
                    }
                )
        },
        //送出購物車訂單
        sendCartsList() {

            this.loadingStatue.sendCart = 1;
            setTimeout(() => { this.loadingStatue.sendCart = ''; }, 1000)

            this.$refs.createOrder.openModal();
        },
        //結帳 建立訂單
        checkOutItem(item) {
            console.log(item)
        },

    },
    watch: {
        //刷新購物車數量
        cartList() {
            this.cartsNum = this.cartList.carts.length;
        },
    },
    created() {
        // 使用token驗證
        axios.defaults.headers.common['Authorization'] = this.token;
        //判斷使用者值
        this.chkUserName();
        // 取得商品
        this.getProduct();
        //取得購物車資料
        this.getCartList();
    },
    mounted() {

    },
})
    .component('create-order', {
        template: `
        <div class="modal fade" ref="createOrderModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title css_wordInput_13" >請輸入討債資訊 ~ ~ (・ω・)</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                   
                
                    <form class="row g-3">
                    <!-- 姓名 -->
                    <div class="col-md-6">
                        <label for="name" class="form-label">姓名:</label>
                        <input type="text" class="form-control" id="name" placeholder="輸入姓名" v-model="userData.user.name">
                    </div>
                    <!-- 信箱 -->
                    <div class="col-md-6">
                        <label for="email" class="form-label">Email:</label>
                        <input type="email" class="form-control" id="email" placeholder="輸入信箱" v-model="userData.user.email">
                    </div>
                    
                    <!-- 電話 -->
                    <div class="col-md-6">
                        <label for="number" class="form-label">電話</label>
                        <input type="tel" class="form-control" id="number" placeholder="輸入電話"  v-model="userData.user.tel">
                    </div>
                    <!-- 地址 -->
                    <div class="col-12">
                        <label for="address" class="form-label">地址</label>
                        <input type="text" class="form-control" id="address" placeholder="輸入地址"  v-model="userData.user.address">
                    </div>
                    <div class="col-12">
                    <label for="text" class="form-label">留言:</label>
                    <textarea type="text" id="text"
                    placeholder="請輸入想說的話" class="form-control" v-model="userData.message"></textarea>
                    </div>
                   
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">下個月在解決你們!</button>
                    <button type="submit" class="btn btn-primary" @click.prevent="$emit('check-out-item',userData)"  >抱歉!錢錢，我真的需要這些酷東西</button>
                </div>                                           
                    </form>
                   
              

                </div>
               
                </div>
             </div>
        </div>`,
        data() {
            return {
                Modat: "",
                userData: {
                    user: {
                        name: "",
                        email: "",
                        tel: "",
                        address: ""
                    },
                    message: ""
                },
            }
        },
        methods: {
            openModal() {
                this.Modal.show();
            },
            closeModal() {
                this.Modal.hide();
            },
        },
        mounted() {
            this.Modal = new bootstrap.Modal(this.$refs.createOrderModal);
        },
    })
   
    // .component('VForm', VeeValidate.Form)
    // .component('VField', VeeValidate.Field)
    // .component('ErrorMessage', VeeValidate.ErrorMessage)
   

    .mount("#app");