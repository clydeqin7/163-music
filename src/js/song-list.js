{
  let view = {
    el: "main > .songList-group > .songList",
    template: ``,

    render(data={}) {
      let $el = $(this.el)
      $el.html(this.template);
      let {songs} = data
      let liList = songs.map((song)=>{
          let $li = $('<li></li>').text(song.name).attr('data-song-id', song.id)
          return $li
      })
      liList.map((domLi)=>{
        $el.append(domLi)
      })
    }
  };
  let model = {
    data: {
      songs: []
    },
    find() {
      var query = new AV.Query("Song");
      return query.find().then((songs)=>{
          this.data.songs = songs.map((song)=>{
              // TODO: 学习这个语法 ES6
              return {id: song.id, ...song.attributes}
          })
      })
    }
  };
  let controller = {
    init(view, model) {
      this.view = view;
      this.model = model;
      this.view.render(this.model.data);
      this.getAllSong()
      this.bindEventHub()
    },
    getAllSong(){
       this.model.find().then(()=>{
           this.view.render(this.model.data)
       })
    },
    bindEventHub(){
        window.eventHub.on('new', ()=>{
            this.getAllSong()
        })
    }
  };

  controller.init(view, model);
}
