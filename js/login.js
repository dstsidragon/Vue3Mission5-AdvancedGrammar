import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.11/vue.esm-browser.js';

createApp({
    data() {
        return {
            h1: "請先登入",
            footer: "2021~∞ - 六角學院",
            // 信箱
            username: "",
            // 密碼
            password: "",
            passwordRepit: "",
            //註冊提示
            statusPrompt_signup: "",
            //登入提示
            statusPrompt_login: "",
            //註冊狀態
            statuBool_signup:"",
            //登入狀態
            statuBool_login:"",
            //註冊錯誤或成功
            signUpFallOrSuccess:"",
            //登入錯誤或成功
            loginInFallOrSuccess:"",
            //切換選單
            chkMenu:"",
        }
    },
    methods: {
        // 登入
        login(e) {

            //信箱驗證
            const myreg = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            const adminInfo = {
                username: this.username,
                password: this.password
            }
            // console.log(adminInfo);

            if (this.username != "" && myreg.test(this.username) && this.password != "") {
                //送出登入帳號資料做驗證
                axios.post(`${api_url}/admin/signin`, adminInfo)
                    .then(
                        res => {
                            // console.log(res);
                            //如果成功就執行
                            if (res.data.success) {
                                // alert(`${res.data.message}!!`);
                                const expired = res.data.expired;
                                const token = res.data.token;
                                //res塞到data
                               this.statusPrompt_login = `${res.data.message}!!`;
                               this.statuBool_login = true;
                               //傳入變化的時間 讓元件的watch監聽
                               this.loginInFallOrSuccess=new Date();
                                // 存到cookies
                                document.cookie = `hexToken=${token}; expires=${new Date(expired)};username=${this.username}`;
                                document.cookie = `username=${(this.username).split("@")[0]}; expires=${new Date(expired)};`;
                                //跳轉畫面
                                window.location = "background.html";
                            } else {
                                // alert(`${res.data.message}!!請檢查帳號密碼!`);
                                //密碼錯誤 清空密碼
                                this.password = "";

                                //res塞到data
                               this.statusPrompt_login = `${res.data.message}!!請檢查帳號密碼!`;
                               this.statuBool_login = false;
                               //傳入變化的時間 讓元件的watch監聽
                               this.loginInFallOrSuccess=new Date();
                            }
                        }
                    ).catch(err => {
                        console.dir(err)
                    })
            } else {
                // alert("帳號密碼錯誤!");
                //帳號密碼錯誤 清空帳號密碼錯誤
                this.username = "";
                this.password = "";

                 //res塞到data
                this.statusPrompt_login = `帳號密碼錯誤!`;
                this.statuBool_login = false;
                //傳入變化的時間 讓元件的watch監聽
                this.loginInFallOrSuccess=new Date();
            }

        },
        // 取得loginEmit
        getLoginEmitData(e) {
            //將取得的資料賦予到data
            this.username = e.username;
            this.password = e.password;
            // console.log( this.username, this.password)3

            // 登入
            this.login();
        },

        // 註冊
        signup(e) {

            //信箱驗證
            const myreg = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            const adminInfo = {
                username: this.username,
                password: this.password,
                confirm_password: this.passwordRepit
            }
            // console.log(adminInfo);

            if (this.username != "" && myreg.test(this.username) && this.password != "" && this.passwordRepit != "") {
                //送出註冊帳號資料做驗證
                axios.post(`${api_url}/signup`, adminInfo)
                    .then(
                        res => {
                            // console.log(res);
                            //如果成功就執行
                            if (res.data.success) {
                                // console.log(res);
                                // alert(`${res.data.message}!!`);
                                //res塞到data
                                this.statusPrompt_signup = `${res.data.message}!!`;
                                this.statuBool_signup = true;
                                //傳入變化的時間 讓元件的watch監聽
                                this.signUpFallOrSuccess=new Date();

                            } else {
                                // alert(`${res.data.message}!!請檢查帳號密碼!`);
                                //密碼錯誤 清空密碼
                                this.password = "";
                                //res塞到data
                                this.statusPrompt_signup = `${res.data.message}!!請檢查帳號密碼!`;
                                this.statuBool_signup = false;
                                //傳入變化的時間 讓元件的watch監聽
                                this.signUpFallOrSuccess=new Date();
                            }
                        }
                    ).catch(err => {
                        // console.dir(err)
                        if (err.data.code == "auth/weak-password") {
                            // alert("密碼強度太弱!!")
                            //帳號密碼錯誤 清空帳號密碼錯誤
                            this.username = "";
                            this.password = "";
                            this.passwordRepit = "";
                            //把err塞到data
                            this.statusPrompt_signup = "密碼強度太弱!! 請填入6~20位英數字";
                            this.statuBool_signup = false;
                            //傳入變化的時間 讓元件的watch監聽
                            this.signUpFallOrSuccess=new Date();
                        } else if (err.data.code == "auth/email-already-in-use") {
                            // alert("帳號已經被使用!!")
                            //帳號密碼錯誤 清空帳號密碼錯誤
                            this.username = "";
                            this.password = "";
                            this.passwordRepit = "";
                            //把err塞到data
                            this.statusPrompt_signup = "帳號已經被使用!!";
                            this.statuBool_signup = false;
                            //傳入變化的時間 讓元件的watch監聽
                            this.signUpFallOrSuccess=new Date();
                        }
                    })



            } else {
                // alert("帳號格式錯誤!");
                //帳號密碼錯誤 清空帳號密碼錯誤
                this.username = "";
                this.password = "";
                this.passwordRepit = "";
                //把err塞到data
                this.statusPrompt_signup = "輸入格式錯誤!!";
                this.statuBool_signup = false;
                //傳入變化的時間 讓元件的watch監聽
                this.signUpFallOrSuccess=new Date();

            }








        },
        // 取得signupEmit
        getSignupEmitData(e) {
            // console.log(e)

            //將取得的資料賦予到data
            this.username = e.username;
            this.password = e.password;
            this.passwordRepit = e.passwordRepit;


            //註冊
            this.signup();
        },
        //切換選單會傳值給元件
        chkMenuData(){
            // console.log(1)
            this.chkMenu = new Date();
        },

    },
    created() {

    }

})
    // 元件

    //登入
    .component("login", {
        template: `<div class="col-8 ">
        <form id="login-form" class="form-signin ">
        
        <div class="form-floating mb-3">
        <div v-if="showStatus" class=" text-center fs-3" >{{statusPrompt}}</div>
        <div v-else class=" text-center" :class="statuBool?'alert alert-success':'alert alert-danger'" >{{statusprompt}}</div>
        </div>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="login-username" placeholder="name@example.com" required
              autofocus   v-model="username">
            <label for="username">Email address</label>
          </div>
          <div class="form-floating ">
            <input type="password" class="form-control" id="login-password" placeholder="Password" required  v-model="password">
            <label for="password">Password</label>
          </div>
          <button class="btn btn-lg btn-success  w-100 mt_90 " id="btn-form" @click.prevent="sendData"
            type="button">
            登入
          </button>
        </form>
      </div>`,
      props: ["statusprompt", "statuBool","loginInFallOrSuccess","chkMenu"],
        data() {
            return {
                statusPrompt: "帳號登入",
                showStatus: true,
                username: "",
                password: ""
            }
        },
        methods: {
            //   送出資料
            sendData() {
                this.showStatus = true;
                // console.log(1)
                if (this.username !== "" && this.password !== "" && this.password !== "") {
                let admin = {
                    username: this.username,
                    password: this.password
                }
                // console.log(admin);
                this.$emit("login-emit", admin);
                }else {
                    alert("資料不得為空!!")
                }
            }
        },
        watch:{
            // 收到回傳登入成功失敗資料 改變showStatus
            loginInFallOrSuccess(){
                this.showStatus = false;
            },
            // 收到切換選單 改變showStatus
            chkMenu(){
                this.showStatus = true;
            },
        }

    })
    //註冊
    .component("signup", {
        template: `<div class="col-8 ">
        <form id="signup-form" class="form-signin ">
        <div class="form-floating mb-3">
        <div v-if="showStatus" class=" text-center fs-3" >{{statusPrompt}}</div>
        <div v-else class=" text-center" :class="statuBool?'alert alert-success':'alert alert-danger'" >{{statusprompt}}</div>
        </div>
          <div class="form-floating mb-3">
            <input type="email" class="form-control" id="signup-username" placeholder="name@example.com" required
              autofocus   v-model="username">
            <label for="username">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input type="password" class="form-control" id="signup-password" placeholder="Password" required  v-model="password">
            <label for="password">Password</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="password-repit" placeholder="repitPassword" required  v-model="passwordRepit">
            <label for="password-repit">Password again</label>
          </div>
          <button class="btn btn-lg btn-warning w-100  text-white mt-3 " 
            type="button" @click="sendData">
            註冊
          </button>
        </form>
      </div>`,
      props: ["statusprompt", "statuBool","signUpFallOrSuccess","chkMenu"],
        data() {
            return {
                statusPrompt: "帳號註冊",
                showStatus: true,
                username: "",
                password: "",
                passwordRepit: "",
            }
        },
        methods: {
            //   送出資料
            sendData() {
                this.showStatus = true;
                // console.log(1)
                if (this.username !== "" && this.password !== "" && this.password !== "") {
                    let admin = {
                        username: this.username,
                        password: this.password,
                        passwordRepit: this.passwordRepit
                    }
                    // console.log(admin);
                    this.$emit("signup-emit", admin);
                    this.username = "";
                   this.password = "";
                   this.passwordRepit = "";
    
                }else {
                            alert("資料不得為空!!")
                        }
                
            }
        },
        watch:{
            signUpFallOrSuccess(){
                // 收到回傳註冊成功失敗資料 改變showStatus
                this.showStatus = false;
                // console.log(1)
            },
            // 收到切換選單 改變showStatus
            chkMenu(){
                this.showStatus = true;
            },
        }
    })

    // 生成本體
    .mount("#app");