{
  let view = {
    el: "main > .operateArea-group > .modifyArea",
    init(){
        this.$el = $(this.el)
    },
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
        <div class="row">
        <label>封面</label>
        <input name="cover" type="text" value="__cover__">
        </div>
        <div class="row">
        <label>歌词</label>
        <textarea cols="30" rows="5" style="resize:none;" name="lyrics">__lyrics__</textarea>
        </div>  
        <div class="row actions">
        <button type="submit">保存</button>
        </div>
    </form>
     `,
    render(data = {}){
        let placeholders = ['name', 'url', 'singer', 'id', 'cover', 'lyrics']
        let html = this.template
        placeholders.map((string)=>{
            html = html.replace(`__${string}__`, data[string] || '')
        })
        $(this.el).html(html)
    },
    showSongForm(){
        $(this.el).addClass('active')
    },
    hiddenSongForm(){
        $(this.el).removeClass('active')
    }

  };
  let model = {
      data: {
       name: '', singer: '', url: '', id: '', cover:'', lyrics:''
     },
     update(data){
         if(model.data.id === ''){
             alert('请先从歌曲列表选中一首歌~。~')
             return
         }
        // 第一个参数是 className，第二个参数是 objectId
        var song = AV.Object.createWithoutData('Song', model.data.id);
        // 修改属性
        song.set('name', data.name);
        song.set('singer', data.singer);
        song.set('url', data.url);
        song.set('cover', data.cover);
        song.set('lyrics', data.lyrics);
        
        // 保存到云端
        song.save().then(()=>{
            window.eventHub.emit('update', )
            alert('更新成功')
        });
     }
  };
  let controller = {
      init(view, model){
          this.view = view 
          this.model = model
          this.view.render(this.model.data)
          this.view.init()
          this.bindEvent()
          this.bindEventHub()
      },
      update(){
        let needs = "name singer url cover lyrics".split(" ");
        let data = {};
        needs.map(string => {
            data[string] = this.view.$el.find(`[name="${string}"]`).val();
        });
        this.model.update(data);          
      },
      clear(){
          this.model.data.id = '';
          this.view.render()
      },
      bindEvent(){
          $(this.view.el).on('submit', `form`, (e)=>{
                e.preventDefault()
                this.update()
          })
      },
      bindEventHub(){
          window.eventHub.on('songSelected', (data)=>{
            let tempData = JSON.parse(data)
            this.model.data.id = tempData['id']
            this.view.render(tempData)
          }),
          window.eventHub.on('triggerClick', (data)=>{
              if(data.id === 'modifyTrigger'){
                  this.view.showSongForm()
              }else{
                  this.view.hiddenSongForm()
                  window.eventHub.emit('deactiveSong')
                  this.clear()
              }
          }),
          window.eventHub.on('update', (data)=>{
            //   this.view.render()
          })      
      }
  };

  controller.init(view, model)
}
