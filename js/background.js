import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.11/vue.esm-browser.js';
import loginOut from './components/loginOut.js';
import reditProductModal from './components/reditProductModal.js';
import addProductModal from './components/addProductModal.js';
import verificationModal from './components/verificationModal.js';
import pagination from './components/pagination.js';


createApp({
    components: {
        //modal-登出
        loginOut,
        //modal-編輯
        reditProductModal,
        //modal-新增產品
        addProductModal,
        //更改驗證碼
        verificationModal,
        //分頁
        pagination,
    },
    data() {
        return {
            //商品資料
            productData: [],
            //全部商品資料
            productDataAll: {},
            allProductAry: [],
            //分頁
            pagination: [],
            // 商品資料筆數
            dataLength: 0,
            // 使用者名稱
            userName: "訪客",
            //登入/登出鈕
            login_status: false,
            //取得token
            token: document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
            //預存的商品資料
            defaulData:[],
            // 編輯資料索引
            rediData: {
                redi_index: null,
                id: "",
                title: "",
                description: "",
                content: "",
                category: null,
                unit: "",
                origin_price: null,
                price: null,
                is_enabled: 0,
                num: 1,
                imageUrl: "",
                imagesUrl: {
                    url1: "",
                    url2: "",
                    url3: "",
                    url4: "",
                    url5: ""
                }
            },
            //新增產品
            addProduct: {
                bg_add_title: "",
                bg_add_description: "",
                //分類
                bg_add_content: "",
                bg_add_category: "",
                bg_add_unit: "",
                bg_add_origin_price: "",
                bg_add_price: "",
                bg_add_is_enabled: false,
                imageUrl: "",
                imageUrls: {
                    url1: "",
                    url2: "",
                    url3: "",
                    url4: "",
                    url5: "",
                },
                // imageUrl: "https://tse3.mm.bing.net/th?id=OIP.nS40nYJJP_xB8UJzs-uiOwAAAA&pid=Api&P=0&w=300&h=300",
                // imageUrls: {
                //     url1: "https://tse1.mm.bing.net/th?id=OIP.f19u7Min0Syi7UxVaWEpSAHaNK&pid=Api&P=0&w=300&h=300",
                //     url2: "https://tse4.mm.bing.net/th?id=OIP.UsIbhrQNkeE2W_AaCbHtfgHaD5&pid=Api&P=0&w=327&h=173",
                //     url3: "https://tse3.mm.bing.net/th?id=OIP._jO8Zpb6mfLi_BDgmY5QGgHaNK&pid=Api&P=0&w=300&h=300",
                //     url4: "https://tse2.mm.bing.net/th?id=OIP.nK8BdFb8oZMFpAFsogSOGAAAAA&pid=Api&P=0&w=300&h=300",
                //     url5: "https://tse4.mm.bing.net/th?id=OIP.biQM95mT36fG4rnYO1xM1QHaLH&pid=Api&P=0&w=300&h=300",
                // },
            },

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

            axios.get(`${api_url}/api/${api_path}/admin/products?page=${page}`)
                .then(
                    res => {
                        // console.log(res);
                        // console.log(res.data.success);

                        //如果成功就執行
                        if (res.data.success) {
                            this.productData = res.data.products;
                            // console.log(this.productData);
                            this.pagination = res.data.pagination;
                            // 更新筆數
                            this.dataLength = this.productData.length;

                            //取得全部商品
                            this.getAllProduct();
                        } else {
                            alert(res.data.message);
                            // window.location="index.html";
                        }
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
        },

        //刪除單一資料
        delOneData(e) {
            const delId = e.target.dataset.id;
            // console.log(delId);
            axios.delete(`${api_url}/api/${api_path}/admin/product/${delId}`)
                .then(
                    res => {
                        // console.log(res);

                        //如果成功就執行
                        if (res.data.success) {
                            alert(`${res.data.message}`);
                            this.getProduct();
                        } else {
                            alert(`${res.data.message}`);
                        }
                    }
                ).catch(
                    err => {
                        console.log(err)
                    }
                )

        },
        //驗證
        chkPath() {
            this.api_path = API_Path.value;
            this.getProduct();
        },

        //啟用/未啟用事件
        productEnable(e) {
            const delId = e.target.dataset.id;

            axios.put(`${api_url}/api/${api_path}/admin/product/${delId}`, {
                data: {
                    category: `${e.target.dataset.category}`,
                    is_enabled: e.target.dataset.is_enabled == 1 ? 0 : 1,
                    origin_price: parseInt(e.target.dataset.origin_price),
                    price: parseInt(e.target.dataset.price),
                    title: `${e.target.dataset.title}`,
                    unit: `${e.target.dataset.unit}`,


                }
            })
                .then(
                    res => {
                        // console.log(res)
                        //如果成功就執行
                        if (res.data.success) {
                            alert("已變更啟用狀態!");
                            this.getProduct();
                        }
                    }
                ).catch(
                    err => {
                        console.log(err)
                    }
                )
        },

        //建立產品
        addPrductData(emitproductData) {
            // console.log(emitproductData);
            //判斷是否都不為空值
            if (this.addProduct.bg_add_title !== "" && this.addProduct.bg_add_category !== ""
                && this.addProduct.bg_add_unit !== "" && this.addProduct.bg_add_origin_price !== ""
                && this.addProduct.bg_add_price !== "") {
                //   console.log(API_Path)

                //送至伺服器
                axios.post(`${api_url}/api/${api_path}/admin/product`, emitproductData)
                    .then(
                        res => {

                            alert(res.data.message);
                            //如果成功就執行
                            if (res.data.success) {
                                // 刷新
                                this.getProduct();


                                // 關掉新增產品選單
                                $().ready(function () {
                                    $(".btn-close").trigger("click");
                                })

                                // 清空新增產品的資料
                                this.clearProductData();


                            }

                        }
                    )
                    .catch(
                        err => {
                            console.dir(err)
                        }
                    )

            } else {
                alert("標題、分類、單位、原價、售價為必填欄位!");
            }
        },
        //一鑑輸入預設商品
        OneKeyAddDefaultProduct() {
            this.defaulData = [
                { "title": "SON GOKU A賞", "description": "ドラゴンボール超 SMSP 孫悟空 フィギュア リペイント GT悟空カラーに変更 BWFC SUPER MASTER STARS PIECE THE SON GOKU A賞", "content": "GT悟空のカラーに変更いたしました。如意棒は接着してあるので手首を脱着式にしました。国内正規品の素体にエアーブラシ・ドライブラシにて立体感・リアル・存在感が出るようにリペイントしました。元箱付きになります。素人製作の為完璧品をお求めの方はご遠慮下さい。色ムラ・スレ・汚れ等がある場合もございますので、画像にて判断していただき入札の方お願いいたします。仕上げにトップコートを施していますが、傷等に弱いのでご注意して下さい。ご使用のモニター等により、色合いが若干異なる場合がありますがご了承願います。できる限り最小サイズにて発送を心がけていますので、元箱のあるものは、元箱に入れてプチプチ梱包にて発送になります。元箱の無いものは段ボールに入れて発送になります。24時間以内にご連絡・落札後3日以内に決済頂ける方のみご入札をお願いいたします。＊いたずら入札・落札がある為、評価0・新規の方・１ヶ月以内に評価悪いがある方は入札をご遠慮ください。(質問欄にて入札意思を示してもいたずらされる方がいますので)入札された場合はこちらの判断で入札を取り消しいたしますのでご了承ください。", "category": "魂豪示像", "unit": "種", "origin_price": 7750, "price": 6700, "is_enabled": "1", "imageUrl": "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img685x912-162263044450ffbi175280.jpg", "imagesUrl": ["https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img646x861-1622630444txn2eb175280.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img686x914-1622630444zcymyf175280.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img649x866-1622630444xdnyst175280.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img673x897-1622630444z5mkwc175280.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img607x607-1622630444jjtiqq175280.jpg",] }, { "title": "カナヘラ", "description": "LINE スタンプでも「カナヘイの小動物」大ヒット!", "content": "大人気の小動物たちが、かわいく動きまわります", "category": "cute", "unit": "set", "origin_price": 9999, "price": 8888, "is_enabled": "1", "imageUrl": "https://tse3.mm.bing.net/th?id=OIP.nS40nYJJP_xB8UJzs-uiOwAAAA&pid=Api&P=0&w=300&h=300", "imagesUrl": ["https://tse1.mm.bing.net/th?id=OIP.f19u7Min0Syi7UxVaWEpSAHaNK&pid=Api&P=0&w=300&h=300", "https://tse4.mm.bing.net/th?id=OIP.UsIbhrQNkeE2W_AaCbHtfgHaD5&pid=Api&P=0&w=327&h=173", "https://tse4.mm.bing.net/th?id=OIP.UsIbhrQNkeE2W_AaCbHtfgHaD5&pid=Api&P=0&w=327&h=173", "https://tse2.mm.bing.net/th?id=OIP.nK8BdFb8oZMFpAFsogSOGAAAAA&pid=Api&P=0&w=300&h=300", "https://tse4.mm.bing.net/th?id=OIP.biQM95mT36fG4rnYO1xM1QHaLH&pid=Api&P=0&w=300&h=300",] }, { "title": "一番くじ ドラゴンボールVSオムニバスZ ラストワン賞", "description": "一番くじ ドラゴンボールVSオムニバスZ ラストワン賞 ポルンガ フィギュア　ドラゴンボール超 リペイント　二次元彩色　2D", "content": "フィギュアのイラスト風なリペイントになります。作業工程分解・洗浄・プライマー・塗装・トップコートの手順です。フィギュア本体は分解しておりません。あくまで分解はフィギュアと台座を取り外ししたのみですので、状態は非常に良いです。 こちらで活動してますので、興味のある方はこちらもご覧ください。よろしくお願い致します。→Twitter @takacompany1■注意・画像で気に入っていただけた方、画像にてご理解いただける方のみ入札参加お願い致します。また入札前に必ず注意事項をお読み下さい。2.ご入札に関しての注意事項トラブル防止の為、ご新規の方、評価の悪い方、また1か月以内にキャンセルのある方のご入札はご遠慮下さいませ。ご入札があった場合は削除させて頂きますので、ご了承下さい。※新規の方は入札前にDMなどくだされば問題ありません。3.Ⅰ.国内正規品を使用しています。Ⅱ.外箱に入れて発送致します。外箱はあくまでもおまけ程度でお考え下さい。外箱の状態は仕入れ時の状態で異なります。Ⅲ.細心の注意を払い丁寧に仕上げていますが、埃、繊維等の混入、はみ出しや色剥げ、塗りむら等見られる場合もございます。神経質な方、完璧なものをお求めな方は入札はお控えください。Ⅳ.お使いのモニターの違いにより、色味の感じ方が多少変わることがあります。Ⅴ.ノークレーム、ノーリターンが守れる方のみご入札をよろしくお願い致します。Ⅵ.落札後のキャンセルはお受けいたしかねます。Ⅶ.原則3日以内のご入金をよろしくお願いします。ご連絡なく決済期限内のお支払いがない場合、「落札者様都合」にてキャンセルさせて頂きます。その際ヤフオクのシステム上、自動的に「非常に悪い」の評価がついてしまいます事をご了承下さい。フィギュアのイラスト風なリペイントになります", "category": "魂豪示像", "unit": "種", "origin_price": 91000, "price": 81000, "is_enabled": "1", "imageUrl": "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img744x1200-1622457976qy979k310313.jpg", "imagesUrl": ["https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img778x1200-16224579769juw3w310313.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img870x1200-1622457976wd38wi310313.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img868x1200-1622457976dsrsqu310313.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img694x1200-1622457976puopei310313.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img686x1200-16224579764v5dk6310313.jpg",] }, { "title": "ワンピース　B賞マルコ リペイント", "description": "１番くじ　B賞マルコ　リペイント", "content": `趣味程度のリペイントになります。プライマー～塗装『全て筆の塗装』～トップコートで仕上げてます。気に入ってくれた方、購入お願い致します。完品をお求めの方はご遠慮ください。神経質な方もご遠慮ください。実際の物と写真では異なる場合がございます。`, "category": "魂豪示像", "unit": "種", "origin_price": 5000, "price": 3100, "is_enabled": "1", "imageUrl": "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383zqrspz1337.jpg", "imagesUrl": ["https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383jary3q1337.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383zqrspz1337.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383cxihkt1337.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383wkgk9w1337.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383jl6ied1337.jpg",] }, { "title": "一番くじ ワンピース EX 悪魔を宿す者達 A 賞 カイドウ 魂豪示像 フィギュア", "description": "『一番くじ ワンピース EX 悪魔を宿す者達』より・A賞：カイドウ 魂豪示像（全1種）以上、１点の出品になります。", "content": "数多くのオークションの中、当方の商品をご閲覧頂きありがとうございます。基本的にダブった景品などを出品しております。商品説明だけではなく、「ト書」や「備考・注意」もご確認・ご了承の上、入札ください。また入札時点で、ご理解、ご了承頂けたものとします。発送出来ない日などが出来た場合、自己紹介の方に追記されて頂きます。個別ページには入力しませんので、ご注意ください。当方では新規の方、キャンセルが多い方、マイナス評価の多い方からの入札・落札はお断りしております。当てはまる方が落札した場合、『落札者の都合』で削除いたします。ここ最近、当方の梱包が「過剰梱包」とのクレームが増えてきたので割れ物のみ梱包致します。ノークレーム・ノーリターン・ノーキャンセル(入札・落札を含む)厳守でお願い致します。", "category": "魂豪示像", "unit": "種", "origin_price": 19000, "price": 13000, "is_enabled": "1", "imageUrl": "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/92aff27e95794ad907dead7f02ab0b5f21115541/i-img1200x1115-16226389872u7wff282041.jpg", "imagesUrl": ["https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/92aff27e95794ad907dead7f02ab0b5f21115541/i-img1200x843-1622638987hwgyui282041.jpg", "", "", "", "",] }, { "title": "SON GOKU A賞", "description": "ドラゴンボール超 SMSP 孫悟空 フィギュア リペイント GT悟空カラーに変更 BWFC SUPER MASTER STARS PIECE THE SON GOKU A賞", "content": "GT悟空のカラーに変更いたしました。如意棒は接着してあるので手首を脱着式にしました。国内正規品の素体にエアーブラシ・ドライブラシにて立体感・リアル・存在感が出るようにリペイントしました。元箱付きになります。素人製作の為完璧品をお求めの方はご遠慮下さい。色ムラ・スレ・汚れ等がある場合もございますので、画像にて判断していただき入札の方お願いいたします。仕上げにトップコートを施していますが、傷等に弱いのでご注意して下さい。ご使用のモニター等により、色合いが若干異なる場合がありますがご了承願います。できる限り最小サイズにて発送を心がけていますので、元箱のあるものは、元箱に入れてプチプチ梱包にて発送になります。元箱の無いものは段ボールに入れて発送になります。24時間以内にご連絡・落札後3日以内に決済頂ける方のみご入札をお願いいたします。＊いたずら入札・落札がある為、評価0・新規の方・１ヶ月以内に評価悪いがある方は入札をご遠慮ください。(質問欄にて入札意思を示してもいたずらされる方がいますので)入札された場合はこちらの判断で入札を取り消しいたしますのでご了承ください。", "category": "魂豪示像", "unit": "種", "origin_price": 7750, "price": 6700, "is_enabled": "1", "imageUrl": "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img685x912-162263044450ffbi175280.jpg", "imagesUrl": ["https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img646x861-1622630444txn2eb175280.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img686x914-1622630444zcymyf175280.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img649x866-1622630444xdnyst175280.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img673x897-1622630444z5mkwc175280.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img607x607-1622630444jjtiqq175280.jpg",] }, { "title": "カナヘラ", "description": "LINE スタンプでも「カナヘイの小動物」大ヒット!", "content": "大人気の小動物たちが、かわいく動きまわります", "category": "cute", "unit": "set", "origin_price": 9999, "price": 8888, "is_enabled": "1", "imageUrl": "https://tse3.mm.bing.net/th?id=OIP.nS40nYJJP_xB8UJzs-uiOwAAAA&pid=Api&P=0&w=300&h=300", "imagesUrl": ["https://tse1.mm.bing.net/th?id=OIP.f19u7Min0Syi7UxVaWEpSAHaNK&pid=Api&P=0&w=300&h=300", "https://tse4.mm.bing.net/th?id=OIP.UsIbhrQNkeE2W_AaCbHtfgHaD5&pid=Api&P=0&w=327&h=173", "https://tse4.mm.bing.net/th?id=OIP.UsIbhrQNkeE2W_AaCbHtfgHaD5&pid=Api&P=0&w=327&h=173", "https://tse2.mm.bing.net/th?id=OIP.nK8BdFb8oZMFpAFsogSOGAAAAA&pid=Api&P=0&w=300&h=300", "https://tse4.mm.bing.net/th?id=OIP.biQM95mT36fG4rnYO1xM1QHaLH&pid=Api&P=0&w=300&h=300",] }, { "title": "一番くじ ドラゴンボールVSオムニバスZ ラストワン賞", "description": "一番くじ ドラゴンボールVSオムニバスZ ラストワン賞 ポルンガ フィギュア　ドラゴンボール超 リペイント　二次元彩色　2D", "content": "フィギュアのイラスト風なリペイントになります。作業工程分解・洗浄・プライマー・塗装・トップコートの手順です。フィギュア本体は分解しておりません。あくまで分解はフィギュアと台座を取り外ししたのみですので、状態は非常に良いです。 こちらで活動してますので、興味のある方はこちらもご覧ください。よろしくお願い致します。→Twitter @takacompany1■注意・画像で気に入っていただけた方、画像にてご理解いただける方のみ入札参加お願い致します。また入札前に必ず注意事項をお読み下さい。2.ご入札に関しての注意事項トラブル防止の為、ご新規の方、評価の悪い方、また1か月以内にキャンセルのある方のご入札はご遠慮下さいませ。ご入札があった場合は削除させて頂きますので、ご了承下さい。※新規の方は入札前にDMなどくだされば問題ありません。3.Ⅰ.国内正規品を使用しています。Ⅱ.外箱に入れて発送致します。外箱はあくまでもおまけ程度でお考え下さい。外箱の状態は仕入れ時の状態で異なります。Ⅲ.細心の注意を払い丁寧に仕上げていますが、埃、繊維等の混入、はみ出しや色剥げ、塗りむら等見られる場合もございます。神経質な方、完璧なものをお求めな方は入札はお控えください。Ⅳ.お使いのモニターの違いにより、色味の感じ方が多少変わることがあります。Ⅴ.ノークレーム、ノーリターンが守れる方のみご入札をよろしくお願い致します。Ⅵ.落札後のキャンセルはお受けいたしかねます。Ⅶ.原則3日以内のご入金をよろしくお願いします。ご連絡なく決済期限内のお支払いがない場合、「落札者様都合」にてキャンセルさせて頂きます。その際ヤフオクのシステム上、自動的に「非常に悪い」の評価がついてしまいます事をご了承下さい。フィギュアのイラスト風なリペイントになります", "category": "魂豪示像", "unit": "種", "origin_price": 91000, "price": 81000, "is_enabled": "1", "imageUrl": "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img744x1200-1622457976qy979k310313.jpg", "imagesUrl": ["https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img778x1200-16224579769juw3w310313.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img870x1200-1622457976wd38wi310313.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img868x1200-1622457976dsrsqu310313.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img694x1200-1622457976puopei310313.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img686x1200-16224579764v5dk6310313.jpg",] }, { "title": "ワンピース　B賞マルコ リペイント", "description": "１番くじ　B賞マルコ　リペイント", "content": `趣味程度のリペイントになります。プライマー～塗装『全て筆の塗装』～トップコートで仕上げてます。気に入ってくれた方、購入お願い致します。完品をお求めの方はご遠慮ください。神経質な方もご遠慮ください。実際の物と写真では異なる場合がございます。`, "category": "魂豪示像", "unit": "種", "origin_price": 5000, "price": 3100, "is_enabled": "1", "imageUrl": "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383zqrspz1337.jpg", "imagesUrl": ["https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383jary3q1337.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383zqrspz1337.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383cxihkt1337.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383wkgk9w1337.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383jl6ied1337.jpg",] }, { "title": "一番くじ ワンピース EX 悪魔を宿す者達 A 賞 カイドウ 魂豪示像 フィギュア", "description": "『一番くじ ワンピース EX 悪魔を宿す者達』より・A賞：カイドウ 魂豪示像（全1種）以上、１点の出品になります。", "content": "数多くのオークションの中、当方の商品をご閲覧頂きありがとうございます。基本的にダブった景品などを出品しております。商品説明だけではなく、「ト書」や「備考・注意」もご確認・ご了承の上、入札ください。また入札時点で、ご理解、ご了承頂けたものとします。発送出来ない日などが出来た場合、自己紹介の方に追記されて頂きます。個別ページには入力しませんので、ご注意ください。当方では新規の方、キャンセルが多い方、マイナス評価の多い方からの入札・落札はお断りしております。当てはまる方が落札した場合、『落札者の都合』で削除いたします。ここ最近、当方の梱包が「過剰梱包」とのクレームが増えてきたので割れ物のみ梱包致します。ノークレーム・ノーリターン・ノーキャンセル(入札・落札を含む)厳守でお願い致します。", "category": "魂豪示像", "unit": "種", "origin_price": 19000, "price": 13000, "is_enabled": "1", "imageUrl": "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/92aff27e95794ad907dead7f02ab0b5f21115541/i-img1200x1115-16226389872u7wff282041.jpg", "imagesUrl": ["https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/92aff27e95794ad907dead7f02ab0b5f21115541/i-img1200x843-1622638987hwgyui282041.jpg", "", "", "", "",] },
                { "title": "SON GOKU A賞", "description": "ドラゴンボール超 SMSP 孫悟空 フィギュア リペイント GT悟空カラーに変更 BWFC SUPER MASTER STARS PIECE THE SON GOKU A賞", "content": "GT悟空のカラーに変更いたしました。如意棒は接着してあるので手首を脱着式にしました。国内正規品の素体にエアーブラシ・ドライブラシにて立体感・リアル・存在感が出るようにリペイントしました。元箱付きになります。素人製作の為完璧品をお求めの方はご遠慮下さい。色ムラ・スレ・汚れ等がある場合もございますので、画像にて判断していただき入札の方お願いいたします。仕上げにトップコートを施していますが、傷等に弱いのでご注意して下さい。ご使用のモニター等により、色合いが若干異なる場合がありますがご了承願います。できる限り最小サイズにて発送を心がけていますので、元箱のあるものは、元箱に入れてプチプチ梱包にて発送になります。元箱の無いものは段ボールに入れて発送になります。24時間以内にご連絡・落札後3日以内に決済頂ける方のみご入札をお願いいたします。＊いたずら入札・落札がある為、評価0・新規の方・１ヶ月以内に評価悪いがある方は入札をご遠慮ください。(質問欄にて入札意思を示してもいたずらされる方がいますので)入札された場合はこちらの判断で入札を取り消しいたしますのでご了承ください。", "category": "魂豪示像", "unit": "種", "origin_price": 7750, "price": 6700, "is_enabled": "1", "imageUrl": "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img685x912-162263044450ffbi175280.jpg", "imagesUrl": ["https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img646x861-1622630444txn2eb175280.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img686x914-1622630444zcymyf175280.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img649x866-1622630444xdnyst175280.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img673x897-1622630444z5mkwc175280.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img607x607-1622630444jjtiqq175280.jpg",] }, { "title": "カナヘラ", "description": "LINE スタンプでも「カナヘイの小動物」大ヒット!", "content": "大人気の小動物たちが、かわいく動きまわります", "category": "cute", "unit": "set", "origin_price": 9999, "price": 8888, "is_enabled": "1", "imageUrl": "https://tse3.mm.bing.net/th?id=OIP.nS40nYJJP_xB8UJzs-uiOwAAAA&pid=Api&P=0&w=300&h=300", "imagesUrl": ["https://tse1.mm.bing.net/th?id=OIP.f19u7Min0Syi7UxVaWEpSAHaNK&pid=Api&P=0&w=300&h=300", "https://tse4.mm.bing.net/th?id=OIP.UsIbhrQNkeE2W_AaCbHtfgHaD5&pid=Api&P=0&w=327&h=173", "https://tse4.mm.bing.net/th?id=OIP.UsIbhrQNkeE2W_AaCbHtfgHaD5&pid=Api&P=0&w=327&h=173", "https://tse2.mm.bing.net/th?id=OIP.nK8BdFb8oZMFpAFsogSOGAAAAA&pid=Api&P=0&w=300&h=300", "https://tse4.mm.bing.net/th?id=OIP.biQM95mT36fG4rnYO1xM1QHaLH&pid=Api&P=0&w=300&h=300",] }, { "title": "一番くじ ドラゴンボールVSオムニバスZ ラストワン賞", "description": "一番くじ ドラゴンボールVSオムニバスZ ラストワン賞 ポルンガ フィギュア　ドラゴンボール超 リペイント　二次元彩色　2D", "content": "フィギュアのイラスト風なリペイントになります。作業工程分解・洗浄・プライマー・塗装・トップコートの手順です。フィギュア本体は分解しておりません。あくまで分解はフィギュアと台座を取り外ししたのみですので、状態は非常に良いです。 こちらで活動してますので、興味のある方はこちらもご覧ください。よろしくお願い致します。→Twitter @takacompany1■注意・画像で気に入っていただけた方、画像にてご理解いただける方のみ入札参加お願い致します。また入札前に必ず注意事項をお読み下さい。2.ご入札に関しての注意事項トラブル防止の為、ご新規の方、評価の悪い方、また1か月以内にキャンセルのある方のご入札はご遠慮下さいませ。ご入札があった場合は削除させて頂きますので、ご了承下さい。※新規の方は入札前にDMなどくだされば問題ありません。3.Ⅰ.国内正規品を使用しています。Ⅱ.外箱に入れて発送致します。外箱はあくまでもおまけ程度でお考え下さい。外箱の状態は仕入れ時の状態で異なります。Ⅲ.細心の注意を払い丁寧に仕上げていますが、埃、繊維等の混入、はみ出しや色剥げ、塗りむら等見られる場合もございます。神経質な方、完璧なものをお求めな方は入札はお控えください。Ⅳ.お使いのモニターの違いにより、色味の感じ方が多少変わることがあります。Ⅴ.ノークレーム、ノーリターンが守れる方のみご入札をよろしくお願い致します。Ⅵ.落札後のキャンセルはお受けいたしかねます。Ⅶ.原則3日以内のご入金をよろしくお願いします。ご連絡なく決済期限内のお支払いがない場合、「落札者様都合」にてキャンセルさせて頂きます。その際ヤフオクのシステム上、自動的に「非常に悪い」の評価がついてしまいます事をご了承下さい。フィギュアのイラスト風なリペイントになります", "category": "魂豪示像", "unit": "種", "origin_price": 91000, "price": 81000, "is_enabled": "1", "imageUrl": "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img744x1200-1622457976qy979k310313.jpg", "imagesUrl": ["https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img778x1200-16224579769juw3w310313.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img870x1200-1622457976wd38wi310313.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img868x1200-1622457976dsrsqu310313.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img694x1200-1622457976puopei310313.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img686x1200-16224579764v5dk6310313.jpg",] }, { "title": "ワンピース　B賞マルコ リペイント", "description": "１番くじ　B賞マルコ　リペイント", "content": `趣味程度のリペイントになります。プライマー～塗装『全て筆の塗装』～トップコートで仕上げてます。気に入ってくれた方、購入お願い致します。完品をお求めの方はご遠慮ください。神経質な方もご遠慮ください。実際の物と写真では異なる場合がございます。`, "category": "魂豪示像", "unit": "種", "origin_price": 5000, "price": 3100, "is_enabled": "1", "imageUrl": "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383zqrspz1337.jpg", "imagesUrl": ["https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383jary3q1337.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383zqrspz1337.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383cxihkt1337.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383wkgk9w1337.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383jl6ied1337.jpg",] }, { "title": "一番くじ ワンピース EX 悪魔を宿す者達 A 賞 カイドウ 魂豪示像 フィギュア", "description": "『一番くじ ワンピース EX 悪魔を宿す者達』より・A賞：カイドウ 魂豪示像（全1種）以上、１点の出品になります。", "content": "数多くのオークションの中、当方の商品をご閲覧頂きありがとうございます。基本的にダブった景品などを出品しております。商品説明だけではなく、「ト書」や「備考・注意」もご確認・ご了承の上、入札ください。また入札時点で、ご理解、ご了承頂けたものとします。発送出来ない日などが出来た場合、自己紹介の方に追記されて頂きます。個別ページには入力しませんので、ご注意ください。当方では新規の方、キャンセルが多い方、マイナス評価の多い方からの入札・落札はお断りしております。当てはまる方が落札した場合、『落札者の都合』で削除いたします。ここ最近、当方の梱包が「過剰梱包」とのクレームが増えてきたので割れ物のみ梱包致します。ノークレーム・ノーリターン・ノーキャンセル(入札・落札を含む)厳守でお願い致します。", "category": "魂豪示像", "unit": "種", "origin_price": 19000, "price": 13000, "is_enabled": "1", "imageUrl": "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/92aff27e95794ad907dead7f02ab0b5f21115541/i-img1200x1115-16226389872u7wff282041.jpg", "imagesUrl": ["https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/92aff27e95794ad907dead7f02ab0b5f21115541/i-img1200x843-1622638987hwgyui282041.jpg", "", "", "", "",] }, { "title": "SON GOKU A賞", "description": "ドラゴンボール超 SMSP 孫悟空 フィギュア リペイント GT悟空カラーに変更 BWFC SUPER MASTER STARS PIECE THE SON GOKU A賞", "content": "GT悟空のカラーに変更いたしました。如意棒は接着してあるので手首を脱着式にしました。国内正規品の素体にエアーブラシ・ドライブラシにて立体感・リアル・存在感が出るようにリペイントしました。元箱付きになります。素人製作の為完璧品をお求めの方はご遠慮下さい。色ムラ・スレ・汚れ等がある場合もございますので、画像にて判断していただき入札の方お願いいたします。仕上げにトップコートを施していますが、傷等に弱いのでご注意して下さい。ご使用のモニター等により、色合いが若干異なる場合がありますがご了承願います。できる限り最小サイズにて発送を心がけていますので、元箱のあるものは、元箱に入れてプチプチ梱包にて発送になります。元箱の無いものは段ボールに入れて発送になります。24時間以内にご連絡・落札後3日以内に決済頂ける方のみご入札をお願いいたします。＊いたずら入札・落札がある為、評価0・新規の方・１ヶ月以内に評価悪いがある方は入札をご遠慮ください。(質問欄にて入札意思を示してもいたずらされる方がいますので)入札された場合はこちらの判断で入札を取り消しいたしますのでご了承ください。", "category": "魂豪示像", "unit": "種", "origin_price": 7750, "price": 6700, "is_enabled": "1", "imageUrl": "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img685x912-162263044450ffbi175280.jpg", "imagesUrl": ["https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img646x861-1622630444txn2eb175280.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img686x914-1622630444zcymyf175280.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img649x866-1622630444xdnyst175280.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img673x897-1622630444z5mkwc175280.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/118826cfdd93fd2ff8766386cccca0ee1505f91e/i-img607x607-1622630444jjtiqq175280.jpg",] }, { "title": "カナヘラ", "description": "LINE スタンプでも「カナヘイの小動物」大ヒット!", "content": "大人気の小動物たちが、かわいく動きまわります", "category": "cute", "unit": "set", "origin_price": 9999, "price": 8888, "is_enabled": "1", "imageUrl": "https://tse3.mm.bing.net/th?id=OIP.nS40nYJJP_xB8UJzs-uiOwAAAA&pid=Api&P=0&w=300&h=300", "imagesUrl": ["https://tse1.mm.bing.net/th?id=OIP.f19u7Min0Syi7UxVaWEpSAHaNK&pid=Api&P=0&w=300&h=300", "https://tse4.mm.bing.net/th?id=OIP.UsIbhrQNkeE2W_AaCbHtfgHaD5&pid=Api&P=0&w=327&h=173", "https://tse4.mm.bing.net/th?id=OIP.UsIbhrQNkeE2W_AaCbHtfgHaD5&pid=Api&P=0&w=327&h=173", "https://tse2.mm.bing.net/th?id=OIP.nK8BdFb8oZMFpAFsogSOGAAAAA&pid=Api&P=0&w=300&h=300", "https://tse4.mm.bing.net/th?id=OIP.biQM95mT36fG4rnYO1xM1QHaLH&pid=Api&P=0&w=300&h=300",] }, { "title": "一番くじ ドラゴンボールVSオムニバスZ ラストワン賞", "description": "一番くじ ドラゴンボールVSオムニバスZ ラストワン賞 ポルンガ フィギュア　ドラゴンボール超 リペイント　二次元彩色　2D", "content": "フィギュアのイラスト風なリペイントになります。作業工程分解・洗浄・プライマー・塗装・トップコートの手順です。フィギュア本体は分解しておりません。あくまで分解はフィギュアと台座を取り外ししたのみですので、状態は非常に良いです。 こちらで活動してますので、興味のある方はこちらもご覧ください。よろしくお願い致します。→Twitter @takacompany1■注意・画像で気に入っていただけた方、画像にてご理解いただける方のみ入札参加お願い致します。また入札前に必ず注意事項をお読み下さい。2.ご入札に関しての注意事項トラブル防止の為、ご新規の方、評価の悪い方、また1か月以内にキャンセルのある方のご入札はご遠慮下さいませ。ご入札があった場合は削除させて頂きますので、ご了承下さい。※新規の方は入札前にDMなどくだされば問題ありません。3.Ⅰ.国内正規品を使用しています。Ⅱ.外箱に入れて発送致します。外箱はあくまでもおまけ程度でお考え下さい。外箱の状態は仕入れ時の状態で異なります。Ⅲ.細心の注意を払い丁寧に仕上げていますが、埃、繊維等の混入、はみ出しや色剥げ、塗りむら等見られる場合もございます。神経質な方、完璧なものをお求めな方は入札はお控えください。Ⅳ.お使いのモニターの違いにより、色味の感じ方が多少変わることがあります。Ⅴ.ノークレーム、ノーリターンが守れる方のみご入札をよろしくお願い致します。Ⅵ.落札後のキャンセルはお受けいたしかねます。Ⅶ.原則3日以内のご入金をよろしくお願いします。ご連絡なく決済期限内のお支払いがない場合、「落札者様都合」にてキャンセルさせて頂きます。その際ヤフオクのシステム上、自動的に「非常に悪い」の評価がついてしまいます事をご了承下さい。フィギュアのイラスト風なリペイントになります", "category": "魂豪示像", "unit": "種", "origin_price": 91000, "price": 81000, "is_enabled": "1", "imageUrl": "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img744x1200-1622457976qy979k310313.jpg", "imagesUrl": ["https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img778x1200-16224579769juw3w310313.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img870x1200-1622457976wd38wi310313.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img868x1200-1622457976dsrsqu310313.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img694x1200-1622457976puopei310313.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0205/users/19e2920970af2adca40b6470ba1055ef50e250af/i-img686x1200-16224579764v5dk6310313.jpg",] }, { "title": "ワンピース　B賞マルコ リペイント", "description": "１番くじ　B賞マルコ　リペイント", "content": `趣味程度のリペイントになります。プライマー～塗装『全て筆の塗装』～トップコートで仕上げてます。気に入ってくれた方、購入お願い致します。完品をお求めの方はご遠慮ください。神経質な方もご遠慮ください。実際の物と写真では異なる場合がございます。`, "category": "魂豪示像", "unit": "種", "origin_price": 5000, "price": 3100, "is_enabled": "1", "imageUrl": "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383zqrspz1337.jpg", "imagesUrl": ["https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383jary3q1337.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383zqrspz1337.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383cxihkt1337.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383wkgk9w1337.jpg", "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/9193da9b36b9107d34fe763bdccbc3c921ecae6a/i-img1198x898-1622640383jl6ied1337.jpg",] }, { "title": "一番くじ ワンピース EX 悪魔を宿す者達 A 賞 カイドウ 魂豪示像 フィギュア", "description": "『一番くじ ワンピース EX 悪魔を宿す者達』より・A賞：カイドウ 魂豪示像（全1種）以上、１点の出品になります。", "content": "数多くのオークションの中、当方の商品をご閲覧頂きありがとうございます。基本的にダブった景品などを出品しております。商品説明だけではなく、「ト書」や「備考・注意」もご確認・ご了承の上、入札ください。また入札時点で、ご理解、ご了承頂けたものとします。発送出来ない日などが出来た場合、自己紹介の方に追記されて頂きます。個別ページには入力しませんので、ご注意ください。当方では新規の方、キャンセルが多い方、マイナス評価の多い方からの入札・落札はお断りしております。当てはまる方が落札した場合、『落札者の都合』で削除いたします。ここ最近、当方の梱包が「過剰梱包」とのクレームが増えてきたので割れ物のみ梱包致します。ノークレーム・ノーリターン・ノーキャンセル(入札・落札を含む)厳守でお願い致します。", "category": "魂豪示像", "unit": "種", "origin_price": 19000, "price": 13000, "is_enabled": "1", "imageUrl": "https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/92aff27e95794ad907dead7f02ab0b5f21115541/i-img1200x1115-16226389872u7wff282041.jpg", "imagesUrl": ["https://auctions.c.yimg.jp/images.auctions.yahoo.co.jp/image/dr000/auc0206/users/92aff27e95794ad907dead7f02ab0b5f21115541/i-img1200x843-1622638987hwgyui282041.jpg", "", "", "", "",] },
            ];
            // console.log(defaulData.length)
            this.defaulData.forEach((item, i) => {

                const product = {
                    data: {
                        title: item.title,
                        category: item.category,
                        origin_price: parseInt(item.origin_price),
                        price: parseInt(item.price),
                        unit: item.unit,
                        description: item.description,
                        content: item.content,
                        is_enabled: item.is_enabled,
                        imageUrl: item.imageUrl,
                        imagesUrl: [
                            item.imagesUrl[0],
                            item.imagesUrl[1],
                            item.imagesUrl[2],
                            item.imagesUrl[3],
                            item.imagesUrl[4],
                        ]
                    }
                };
                // console.log(product)
                axios.post(`${api_url}/api/${api_path}/admin/product`, product)
                    .then(
                        res => {

                            // alert(res.data.message);
                            //如果成功就執行
                            if (res.data.success) {

                                if (i === (this.defaulData.length - 1)) {
                                    // 刷新
                                    this.getProduct();

                                    alert(`已輸入預設商品!`);
                                }
                            }
                        }
                    )
                    .catch(
                        err => {
                            console.dir(err)
                        }
                    )
            })

        },
        //取得全部商品
        getAllProduct() {
            //取得全部商品
            axios.get(`${api_url}/api/${api_path}/admin/products/all`)
                .then(
                    res => {
                        // console.log(res);
                        // console.log(res.data.success);

                        //如果成功就執行
                        if (res.data.success) {

                            this.productDataAll = res.data.products;


                        } else {
                            console.log(res.data.message);
                            // window.location="index.html";
                        }
                    }
                ).catch(
                    err => {
                        console.log(err);
                    }
                )
        },
        //一鑑刪除全部商品
        OneKeyDelAllProduct() {

            console.log(this.allProductAry);
            console.log(this.allProductAry.length);


            this.allProductAry.forEach((item, i) => {
                // console.log(item)
                axios.delete(`${api_url}/api/${api_path}/admin/product/${item}`)
                    .then(
                        res => {
                            // console.log(res);

                            //如果成功就執行
                            if (res.data.success) {
                                // alert(`${res.data.message}`);
                                console.log(i === this.allProductAry.length - 1)
                                
                                if (i === this.allProductAry.length - 1) {
                                    
                                    this.getProduct();
                                    alert(`已刪除全部商品!`);
                                }
                            } else {
                                // alert(`${res.data.message}`);
                            }
                        }
                    ).catch(
                        err => {
                            console.log(err)
                        }
                    )
            });


        },
        // 清空新增產品的資料
        clearProductData() {
            // 清空新增產品的資料
            this.addProduct.bg_add_title = "";
            this.addProduct.bg_add_category = "";
            this.addProduct.bg_add_origin_price = "";
            this.addProduct.bg_add_price = "";
            this.addProduct.bg_add_unit = "";
            this.addProduct.bg_add_description = "";
            this.addProduct.bg_add_content = "";
            this.addProduct.bg_add_is_enabled = false;
            this.addProduct.imageUrl = "";
            this.addProduct.imageUrls.url1 = "";
            this.addProduct.imageUrls.url2 = "";
            this.addProduct.imageUrls.url3 = "";
            this.addProduct.imageUrls.url4 = "";
            this.addProduct.imageUrls.url5 = "";
        },
        // 取得編輯商品
        getReditOneData(e) {
            // 取得待編輯商品索引
            const index = (e.target.id).split("_")[1];
            // 將索引傳至data
            this.rediData.redi_index = index;
            // 將資料傳至data
            const rediItem = this.productData[this.rediData.redi_index];
            this.rediData.title = rediItem.title;
            this.rediData.description = rediItem.description;
            this.rediData.id = rediItem.id;
            this.rediData.content = rediItem.content;
            this.rediData.category = rediItem.category;
            this.rediData.unit = rediItem.unit;
            this.rediData.origin_price = rediItem.origin_price;
            this.rediData.price = rediItem.price;
            this.rediData.is_enabled = parseInt(rediItem.is_enabled);
            this.rediData.imageUrl = rediItem.imageUrl;
            this.rediData.imagesUrl.url1 = rediItem.imagesUrl[0];
            this.rediData.imagesUrl.url2 = rediItem.imagesUrl[1];
            this.rediData.imagesUrl.url3 = rediItem.imagesUrl[2];
            this.rediData.imagesUrl.url4 = rediItem.imagesUrl[3];
            this.rediData.imagesUrl.url5 = rediItem.imagesUrl[4];
        },
        //編輯商品
        reditOneData(reditNewData) {

            //   console.log(reditNewData)
            //編輯資料
            axios.put(`${api_url}/api/${api_path}/admin/product/${this.rediData.id}`, reditNewData)
                .then(
                    res => {
                        // console.log(res);
                        alert(res.data.message);
                        //如果成功就執行
                        if (res.data.success) {
                            //刷新
                            this.getProduct();
                            // 關閉編輯視窗
                            $().ready(function () {
                                $(".btn-close").trigger("click");
                            })
                        }


                    }
                ).catch(err => {
                    console.log(err)
                    // alert(err.data.message)
                })
        },
        //圖片上傳
        uploadImg() {
            console.dir(this.$refs.UpLoadImg.$refs.UpLoadImgInp.files[0]);
            const img = this.$refs.UpLoadImg.$refs.UpLoadImgInp.files[0];
            const imgFormData = new FormData();
            imgFormData.append("file-to-upload", img);

            axios.post(`${api_url}/api/${api_path}/admin/upload`, imgFormData)
                .then(
                    res => {
                        console.log(res)
                        if (res.data.success) {
                            this.addProduct.imageUrl = res.data.imageUrl;
                        } else { }
                    }
                )
                .catch(
                    err => {
                        console.log(err.data)
                        alert(err.data);
                    }
                )
        },

    },
    watch: {
        productDataAll() {
            //如果productDataAll的資料不為空 就取出ID
            if (this.productDataAll !==undefined &&this.productDataAll !==null ) {

                //將 取得全部商品 物件轉陣列 取出ID
                this.allProductAry = Object.keys(this.productDataAll);
            }else{
                this.allProductAry=null;
            }
        }
    },
    created() {
        // 使用token驗證
        axios.defaults.headers.common['Authorization'] = this.token;
        //判斷使用者值
        this.chkUserName();
        //取得商品資料
        this.getProduct();
    },
    mounted() {

        //賦予input　upload時觸發取得圖片網址
        this.$refs.UpLoadImg.$refs.UpLoadImgInp.addEventListener("change", this.uploadImg, false);


    }
})

    .mount('#app');
