{
  let view = {
    el: "main > .operateArea-group > .operateTrigger",
    template: `
         <ul>
            <li id="uploadTrigger"  class='active'>上传歌曲</li>
            <li id="newSongTrigger" >新增歌曲</li>
            <li id="modifyTrigger">编辑歌曲</li>
        </ul>
    `,
    render(data) {
      $(this.el).html(this.template);
    },
    activeItem(li) {
      let $li = $(li);
      $li
        .addClass("active")
        .siblings()
        .removeClass("active");
    }
  };
  let model = {};
  let controller = {
    init(view, model) {
      this.view = view;
      this.model = model;
      this.view.render(this.model.data);
      this.bindEvent()
      this.bindEventHub()
    },
    bindEvent(){
      $(this.view.el).on("click", "li", e => {
        window.eventHub.emit("triggerClick", e.currentTarget);
      });       
    },
    bindEventHub(){
      window.eventHub.on("triggerClick", data => {
        this.view.activeItem(data);
      });
      // TODO: 
     window.eventHub.on('songSelected', ()=>{
         $("#modifyTrigger").click()
     }),
     window.eventHub.on('uploadEnd', ()=>{
         $("#newSongTrigger").click()
     })     
    }
  };

  controller.init(view, model);
}
