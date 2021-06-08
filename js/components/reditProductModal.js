export default{
    props: ["rediData"],
    template:
        `
<div class="modal fade" id="reditModal" tabindex="-1" aria-labelledby="reditModalLabel" aria-hidden="true"> 
<div class="modal-dialog ">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title" id="reditModalLabel">修改商品</h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="card card-body row">
        <div class="form-group mb-2">
          <label for="bg_redit_title">標題</label>
          <input type="text" id="bg_redit_title" placeholder="請輸入標題" v-model="rediData.title" class="form-control"
            required>
        </div>
        <div class="form-group mb-2">
          <label for="bg_redit_description">描述</label>
          <textarea type="text" id="bg_redit_description" v-model="rediData.description" placeholder="請輸入描述"
            class="form-control"></textarea>
        </div>
        <div class="form-group mb-2">
          <label for="bg_redit_content">說明</label>
          <textarea type="text" id="bg_redit_content" placeholder="請輸入說明" v-model="rediData.content"
            class="form-control"></textarea>
        </div>
        <div class="form-row d-flex flex-wrap justify-content-between mb-2">
          <div class="form-group col-md-5">
            <label for="bg_redit_category">分類</label>
            <input type="text" id="bg_redit_category" v-model="rediData.category" placeholder="請輸入分類"
              class="form-control">
          </div>
          <div class="form-group col-md-5">
            <label for="bg_redit_unit">單位</label>
            <input type="unit" id="bg_redit_unit" v-model="rediData.unit" placeholder="請輸入單位"
              class="form-control">
          </div>
        </div>
        <div class="form-row d-flex flex-wrap justify-content-between mb-2">
          <div class="form-group col-md-5">
            <label for="bg_redit_origin_price">原價</label>
            <input type="number" id="bg_redit_origin_price" min="0"  oninput="value=value.replace('-', '')" v-model="rediData.origin_price" placeholder="請輸入原價"
              class="form-control">
          </div>
          <div class="form-group col-md-5">
            <label for="bg_redit_price">售價</label>
            <input type="number" id="bg_redit_price" min="0" oninput="value=value.replace('-', '')" v-model="rediData.price" placeholder="請輸入售價"
              class="form-control">
          </div>
        </div>
        <hr class="mt-5">
        <div class="form-group">
          <label for="bg_redit_image">輸入主圖網址</label>
          <input type="text" id="bg_redit_image" v-model="rediData.imageUrl" placeholder="請輸入主圖連結"
            class="form-control mb-2">
          <img id="bg_image" :src="rediData.imageUrl" alt="主圖" width="250" class="img-fluid">
        </div>

        <div class="form-row d-flex flex-wrap">
          <div item="0" class="form-group col-md-6">
            <label for="bg_redit_image1">輸入圖片網址 1 </label>
            <input type="text" id="bg_redit_image1" v-model="rediData.imagesUrl.url1" placeholder="請輸入圖片連結"
              class="form-control mb-2">
            <img id="bg_image1" :src="rediData.imagesUrl.url1" alt="圖片1" width="250" class="img-fluid">
          </div>
          <div item="1" class="form-group col-md-6">
            <label for="bg_redit_image2">輸入圖片網址 2 </label>
            <input type="text" id="bg_redit_image2" v-model="rediData.imagesUrl.url2" placeholder="請輸入圖片連結"
              class="form-control mb-2">
            <img id="bg_image2" :src="rediData.imagesUrl.url2" alt="圖片2" width="250" class="img-fluid">
          </div>
          <div item="2" class="form-group col-md-6">
            <label for="bg_redit_image3">輸入圖片網址 3 </label>
            <input type="text" id="bg_redit_image3" v-model="rediData.imagesUrl.url3" placeholder="請輸入圖片連結"
              class="form-control mb-2">
            <img id="bg_image3" :src="rediData.imagesUrl.url3" alt="圖片3" width="250" class="img-fluid">
          </div>
          <div item="3" class="form-group col-md-6">
            <label for="bg_redit_image4">輸入圖片網址 4 </label>
            <input type="text" id="bg_redit_image4" v-model="rediData.imagesUrl.url4" placeholder="請輸入圖片連結"
              class="form-control mb-2">
            <img id="bg_image4" :src="rediData.imagesUrl.url4" alt="圖片4" width="250" class="img-fluid">
          </div>
          <div item="4" class="form-group col-md-6">
            <label for="bg_redit_image5">輸入圖片網址 5 </label>
            <input type="text" id="bg_redit_image5" v-model="rediData.imagesUrl.url5" placeholder="請輸入圖片連結"
              class="form-control mb-2">
            <img id="bg_image5" :src="rediData.imagesUrl.url5" alt="圖片5" width="250" class="img-fluid">
          </div>
        </div>
        <div class="form-group">
          <div class="form-check">
            <input type="checkbox" v-model="rediData.is_enabled" v-if="rediData.is_enabled" checked true-value="1"
              false-value="0" id="bg_redit_is_enabled" class="form-check-input">
            <input type="checkbox" v-model="rediData.is_enabled" v-else true-value="1" false-value="0"
              id="bg_redit_is_enabled" class="form-check-input">
            <label for="bg_redit_is_enabled" class="form-check-label">
              是否啟用
            </label>
          </div>
        </div>

      </div>
    </div>
    <div class="modal-footer">
      <button type="button" id="btn_redit_cance" class="btn btn-secondary" data-bs-dismiss="modal">取消修改</button>
      <button type="button" class="btn btn-primary" @click="reditOneData">儲存修改</button>
    </div>
  </div>
</div>
</div>`,
    methods: {
        reditOneData() {
            const reditNewData = {
                data: {
                    category: this.rediData.category,
                    content: this.rediData.content,
                    description: this.rediData.description,
                    id: this.rediData.id,
                    is_enabled: parseInt(this.rediData.is_enabled),
                    origin_price: parseInt(this.rediData.origin_price),
                    price: parseInt(this.rediData.price),
                    title: this.rediData.title,
                    unit: this.rediData.unit,
                    num: 1,
                    imageUrl: this.rediData.imageUrl,
                    imagesUrl: [
                        this.rediData.imagesUrl.url1,
                        this.rediData.imagesUrl.url2,
                        this.rediData.imagesUrl.url3,
                        this.rediData.imagesUrl.url4,
                        this.rediData.imagesUrl.url5
                    ]
                }
            };
            this.$emit('emit-redit-new-nata', reditNewData);
        }
    }

}