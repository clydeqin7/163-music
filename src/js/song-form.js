{
  let view = {
    el: "main > .operateArea-group > .modifyArea",
    template: `
    <form class="form">
         <div class="row">
        <label>歌名 </label>
        <input name="name" type="text" value="__name__">
        </div>
        <div class="row">
        <label>歌手</label>
        <input name="singer" type="text" value="__singer__">
        </div>
        <div class="row">
        <label>外链</label>
        <input name="url" type="text" value="__url__">
        </div>
        <div class="row actions">
        <button type="submit">保存</button>
        </div>
    </form>
     `,
    render(data = {}){
        let placeholders = ['name', 'url', 'singer', 'id']
        let html = this.template
        placeholders.map((string)=>{
            html = html.replace(`__${string}__`, data[string] || '')
        })
        $(this.el).html(html)
    }

  };
  let model = {
      data: {
       name: '1 ', singer: ' 2', url: ' 3', id: ' '
     },
  };
  let controller = {
      init(view, model){
          this.view = view 
          this.model = model
          this.view.render(this.model.data)
      }
  };

  controller.init(view, model)
}
