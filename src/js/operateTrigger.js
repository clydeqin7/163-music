{
  let view = {
    el: "main > .operateArea-group > .operateTrigger",
    template: `
         <ul>
            <li class="active">新增歌曲</li>
            <li >编辑歌曲</li>
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
      }
  }

  controller.init(view, model)
}
