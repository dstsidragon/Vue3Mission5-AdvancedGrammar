export default {
    props:["prdData"],
    data(){
        return{
            modal:"",
            product:"",
        }
    },
    template: `
    <div class="modal fade" ref="viewContentModal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header bg-dark text-warning fw-bold">
                <h5 class="modal-title css_wordInput " id="exampleModalLabel">不用看了啦!哪次不買的QQ</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
           

            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                    <img  class="prd_img_100" :src="product.imageUrl" >
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">{{product.title}}</h5>
                        <p class="card-text">{{product.description}}</p>
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item">{{product.content}}</li>
                        <li class="list-group-item">
                        <label for="prdCount" class="me-2">數量:</label>
                        <input id="prdCount" type="number" min="1" max="999"  v-model.number="product.qty" style="width:50px" oninput="value=value.replace('-', '');if(value>999)value=999"/>

                        </li>
                      </ul>
                      <span class="row text-center">

                      <span class="text-decoration-line-through col-6">
                      原價
                        <em>{{product.origin_price}}</em>
                        元
                      </span>
                      <span class="text-danger col-6">
                      特價
                        <em>{{product.price}}</em>
                        元
                      </span>
                  
                    </span>
                     
                    </div>
                    </div>
                </div>
                </div>


            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">這個月卡爆了</button>
                <button type="button" class="btn btn-primary" @click="$emit('add-cart-moadl',product)">薪水ALL IN啦</button>
            </div>
            </div>
        </div>
    </div>`,
    watch:{
        prdData(){
            this.product = this.prdData;
            this.product.qty=1;
        }
    },
    methods:{
        //開啟modal 並存值
        openModal(){
            this.modal.show();
        },
        //關閉modal
        closeModal(){
            this.modal.hide();
        },
    },
    mounted(){
        
        this.modal = new bootstrap.Modal(this.$refs.viewContentModal);
    },
}