
-w5
pages :   https://dstsidragon.github.io/Vue3Mission5-AdvancedGrammar/
hub:  https://github.com/dstsidragon/Vue3Mission5-AdvancedGrammar
依據使用者需求完成此範例：

v製作 loading 效果

V前台頁面串接 API

V產品列表
V單一產品細節
V加入購物車
V購物車列表
V刪除購物車項目（單一、全部）
V調整購物車產品數量
V結帳付款


V新增相同產品到購物車時需累加項目
V送出訂單後，購物車需要清除原本項目
V購物車無產品時不建議發出結帳請求
V前台頁面表單驗證（必要完成），驗證內容包含：

V姓名：必填
VEmail：必填 / 需要符合格式 / input type 為 email
V電話：必填 / 超過 8 碼 / input type 為 tel
V地址：必填
V留言：非必填




提交難度挑戰：
LV1：參考範例程式碼，完成表單驗證功能
LV2：完成表單驗證，以及串接 API 功能
LV3：自行設計前台頁面以及完成以上功能


https://vue3-course-api.hexschool.io/javascript/all.js?002
忘記密碼
forgetPassword() {
      const url = '/forgetPassword';
      const vm = this;
      axios.post(url, vm.user).then((response) => {
        // console.log(response);
        vm.data = response.data;
        if (!response.data.success) {
          vm.resMessage.status = 'danger';
          vm.resMessage.message = `錯誤: ${response.data.message || response.data.code}`;
        } else {
          vm.resMessage.status = 'success';
          vm.resMessage.message = response.data.message;
        }
      });
上傳圖片
axios.post(`${url}api/${path}/admin/upload`, formData)

.then(res => {

console.log(res);

})