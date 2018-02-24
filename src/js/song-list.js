{
  let view = {
    el: "main > .songList-group > .songList",
    template: ``,
    init() {
      this.$el = $(this.el);
    },
    render(data = {}) {
      this.$el.html(this.template);
      let { songs, selectedId } = data;   
      let liList = songs.map((song) => {
        let $li = $("<li></li>").text(song.name).attr("data-song-id", song.id);
        if (song.id === selectedId ) {
          $li.addClass("selected");
        }
        return $li;
      });
      liList.map((domLi) => {
        this.$el.append(domLi);
      });
    },
    clearActive(){
        this.$el.find('.selected').removeClass('selected')
    }
  };
  let model = {
    data: {
      songs: [],
      selectedId: undefined
    },
    find() {
      var query = new AV.Query("Song");
      return query.find().then(songs => {
        this.data.songs = songs.map(song => {
          // TODO: 学习这个语法 ES6
          return { id: song.id, ...song.attributes };
        });
        return songs;
      });
    }
  };
  let controller = {
    init(view, model) {
      this.view = view;
      this.model = model;
      this.view.init();
      //   this.view.render(this.model.data);
      this.getAllSong();

      this.bindEvent();
      this.bindEventHub();
    },
    getAllSong() {
      this.model.find().then(() => {
        this.view.render(this.model.data);
      });
    },
    bindEvent() {
      this.view.$el.on("click", "li", e => {
        let songId = e.currentTarget.getAttribute("data-song-id");

        this.model.data.selectedId = songId;
        this.view.render(this.model.data);

        let data 
        let songs = this.model.data.songs
        for(let i=0; i<songs.length; i++){
            if(songs[i].id === songId){
                data = songs[i]
                break
            }
        }

        window.eventHub.emit('songSelected', JSON.stringify(data))
      });
    },
    bindEventHub() {
      window.eventHub.on("new", () => {
        this.getAllSong();
      });
      window.eventHub.on('deactiveSong', ()=>{
          this.view.clearActive()
      })
    }
  };

  controller.init(view, model);
}
