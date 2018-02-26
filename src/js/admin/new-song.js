{
  let view = {
    el: "main > .operateArea-group > .newSongArea",
    init() {
      this.$el = $(this.el);
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
            <div class="row actions">
            <button type="submit">保存</button>
            <div>      
        </form>      
        `,
    render(data = {}) {
      let placeholders = ["name", "url", "singer", "id"];
      let html = this.template;
      placeholders.map(string => {
        html = html.replace(`__${string}__`, data[string] || "");
      });
      $(this.el).html(html);
    },
    showSongForm() {
      $(this.el).addClass("active");
    },
    hiddenSongForm() {
      $(this.el).removeClass("active");
    }
  };
  let model = {
    data: {
      name: "",
      singer: "",
      url: "",
      id: ""
    },
    create(data) {
      var Song = AV.Object.extend("Song");
      var song = new Song();
      song.set("name", data.name);
      song.set("singer", data.singer);
      song.set("url", data.url);
      song.save().then(
        function(todo) {
          window.eventHub.emit("new");
        },
        function(error) {
          console.error(error);
        }
      );
    }
  };
  let controller = {
    init(view, model) {
      this.view = view;
      this.model = model;
      this.view.render();
      this.view.init();
      this.bindEvents();
      this.bindEventHub();
    },
    create() {
      let needs = "name singer url".split(" ");
      let data = {};
      needs.map(string => {
        data[string] = this.view.$el.find(`[name="${string}"]`).val();
        // TODO: 验证值是否为空
      });
      this.model.create(data);
    },
    bindEvents() {
      this.view.$el.on("submit", "form", e => {
        e.preventDefault();
        this.create();
      });
    },
    bindEventHub() {
      window.eventHub.on("triggerClick", data => {
        if (data.id === "newSongTrigger") {
          this.view.showSongForm();
        } else {
          this.view.hiddenSongForm();
        }
      });
      window.eventHub.on("new",()=>{
        this.view.render()
        alert('新增歌曲成功')
      });
      window.eventHub.on('uploadEnd', (data)=>{
          this.model.data.url = data
          this.view.render(this.model.data)
      })         
    }
  };
  controller.init(view, model);
}
