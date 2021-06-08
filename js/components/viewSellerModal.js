export default{
    template:`<div class="modal fade" ref="modal" tabindex="-1"  aria-hidden="true">
       <div class="modal-dialog">
           <div class="modal-content">
           <div class="modal-header bg-danger">
               <h5 class="modal-title css_wordInput_4 text-white fs-3"  >{{title}}</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
           </div>
           <div class="modal-body">
           <img :src="url" :alt="title">
           </div>
           <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">我甚麼都不知道..</button>
               <button type="button" class="btn btn-primary" @click="closeModal">甚麼麻，原來是阿喵</button>
           </div>
           </div>
       </div>
       </div> `,
       data(){
           return{
               url:"https://upload.cc/i1/2021/03/07/WOiJwU.png",
               title:"阿喵賣菜:D",
               modal:"",
           }
       },
       methods:{
           openModal(){
               this.modal.show();
           },
           closeModal(){
               
               this.modal.hide();
           },
       },
       mounted(){
           this.modal = new bootstrap.Modal(this.$refs.modal)
       },
}