export default{
    template:`<div class="modal fade" id="verification" tabindex="-1" aria-labelledby="verificationLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="verificationLabel">輸入你的API_Path</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <label class="mr-2" for="API_Path">API_Path:</label>
          <input id="API_Path" type="text" value="sim322on">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">我忘記我的path碼，先饒過你</button>
          <button id="chkVerification" @click="chkPath" type="button" class="btn btn-primary"
            data-bs-dismiss="modal">驗證</button>
        </div>
      </div>
    </div>
  </div>`,
  methods:{
    chkPath(){
        this.$emit("emitchkPath");
    }
  }
}
