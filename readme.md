-4
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

      
#註冊元件
#資料用props  $emit 傳遞
#分頁元件  切換上下頁判斷當前頁面 去disable   動態生成分頁數
#將後台頁面 Modal 以及分頁改使用元件
#使用 import module 來引入元件（分頁元件）  import export default
#完成登入頁面-註冊功能
#圖片上傳功能
#LV3：套用兩個元件＋新增一個物件欄位 options，增加更多不同的設定，
例如：商品評價星級 / 或是完成圖片上傳（二擇一）
#使用ref



載入vue 透過es module

在js頁面 import { createApp } form 'vue3 cdn';  

BS5元件可以使用
new() 的方式產生


-w5
依據使用者需求完成此範例：

v製作 loading 效果

前台頁面串接 API

V產品列表
V單一產品細節
V加入購物車
V購物車列表
V刪除購物車項目（單一、全部）
V調整購物車產品數量
結帳付款
注意：

V新增相同產品到購物車時需累加項目
送出訂單後，購物車需要清除原本項目
V購物車無產品時不建議發出結帳請求
前台頁面表單驗證（必要完成），驗證內容包含：

姓名：必填
Email：必填 / 需要符合格式 / input type 為 email
電話：必填 / 超過 8 碼 / input type 為 tel
地址：必填
留言：非必填




提交難度挑戰：
LV1：參考範例程式碼，完成表單驗證功能
LV2：完成表單驗證，以及串接 API 功能
LV3：自行設計前台頁面以及完成以上功能