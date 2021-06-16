export default{
    template: `
    <div class="modal fade" ref="createOrderModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header bg-primary text-white">
                <h5 class="modal-title css_wordInput_13" >請輸入討債資訊 ~ ~ (・ω・)</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
               
            
             
                <v-form ref="creatForm" v-slot="{ errors }"  class="row g-3">
                <!-- 姓名 -->
                <div class="col-md-6">
                <label for="name" class="form-label" >姓名:</label>
                <v-field id="name" ref="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }" placeholder="請輸入 姓名" rules="required" v-model="userData.user.name"></v-field>
                <error-message name="姓名" class="invalid-feedback"></error-message>
                </div>

                <!-- 電話 -->
                <div class="col-md-6">
                    <label for="tel" class="form-label">電話</label>
                    <v-field id="tel" ref="tel" name="電話" type="tel" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                            placeholder="請輸入 手機號碼" :rules="isPhone" v-model="userData.user.tel"></v-field>
                    <error-message name="電話" class="invalid-feedback"></error-message>
                    </div>

                
                <!-- 信箱 -->
                <div class="col-md-6">
                    <label for="email" class="form-label">Email:</label>
                    <v-field id="email" ref="email" name="信箱" type="email" class="form-control" :class="{ 'is-invalid': errors['信箱'] }"
                            placeholder="請輸入 信箱" :rules="isEmail" v-model="userData.user.email"></v-field>
                    <error-message name="信箱" class="invalid-feedback"></error-message>
                </div>
                
                <!-- 地址 -->
                <div class="col-12">
                    <label for="address" class="form-label">地址</label>
                    <v-field id="address" ref="address" name="地址" type="tel" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
                            placeholder="請輸入 地址" rules="required" v-model="userData.user.address"></v-field>
                    <error-message name="地址" class="invalid-feedback"></error-message>
                </div>
                <div class="col-12">
                <label for="text" class="form-label">留言:</label>
                <textarea type="text" id="text"
                placeholder="請輸入想說的話" class="form-control" v-model="userData.message"></textarea>
                </div>
               
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">下個月在解決你們!</button>
                <button type="submit" class="btn btn-primary" @click.prevent="closeModal"  >抱歉!錢錢，我真的需要這些酷東西</button>
            </div>   
            </v-form>
          

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
        //開啟modal
        openModal() {
            //開啟modal
            this.Modal.show();   
        },
        //隱藏modal
        closeModal() {
            //隱藏modal
            this.Modal.hide();
            
            const data =    {
                data: this.userData
            };

            //送出訂單
            axios.post(`${api_url}/api/${api_path}/order`,data)
            .then(
                res=>{
                    // console.log(res)
                    if(res.data.success){
                        alert(res.data.message)
                        this.reGetCartList();
                        this.getOrderList();

                    }else{
                        
                        alert(res.data.message)
                    }
                }
            )
            .catch(
                err=>{
                    console.log(err)
                    
                    alert(err.data.message)
                }
            )


        },
        //刷新購物車列表
        reGetCartList(){
            this.$emit('re-get-cart-list');
        },
        //取得訂單列表
        getOrderList(){
            this.$emit('get-order-list');
        },
        //驗證號碼格式
        isPhone(value) {
            const phoneNumber = /^(09)[0-9]{8}$/
            return phoneNumber.test(value) ? true : '需要輸入正確的手機號碼'
          },
        //驗證信箱格式
        isEmail(value){
            const mail = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return mail.test(value) ? true : '需要輸入正確的信箱'
        },
    },
    mounted() {


        this.Modal = new bootstrap.Modal(this.$refs.createOrderModal);
    },
}