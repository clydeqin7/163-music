{
  let view = {
    el: "main > .operateArea-group > .operateTrigger",
    template: `
         <ul>
            <li id="uploadTrigger">上传歌曲</li>
            <li id="modifyTrigger">编辑歌曲</li>
        </ul>
    `,
    render(data){
        $(this.el).html(this.template)
    }
  }
  let model = {}
  let controller = {
      init(view, model){
          this.view = view
          this.model = model
          this.view.render(this.model.data)
          window.eventHub.on('uploadTriggerClick', (data)=>{
            this.active('#uploadTrigger')
          })
          window.eventHub.on('modifyTriggerClick', (data)=>{
            this.active('#modifyTrigger')
          })          
          $(this.view.el+" > ul > #uploadTrigger").on('click', ()=>{
              window.eventHub.emit('uploadTriggerClick')
          })
          $(this.view.el+" > ul > #modifyTrigger").on('click', ()=>{
              window.eventHub.emit('modifyTriggerClick')
          })          
      },
      active(selector){
          $(this.view.el+`> ul > ${selector}`).addClass('active')
          .siblings().removeClass('active')
      }
  }

  controller.init(view, model)
}
