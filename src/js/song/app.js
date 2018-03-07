{
    let view = {
        el: '#app',
        init(){
            this.$el = $(this.el)
        },
        render(data){
            let {song, status} = data
            this.$el.find('audio').attr('src', song.url)
        }

    }
    let model = {
        data:{
            song: {
                id: '',
                name: '',
                singer: '',
                url: ''
            },
            status: 'paused'
        }, 
        getSong(id){
            var query = new AV.Query('Song')
            return query.get(id).then((song) =>{
                Object.assign(this.data.song, {id: song.id, ...song.attributes})
            })
        }       
    }
    let controller = {
        init(view, model){
            this.view = view
            this.view.init()
            this.model = model
            this.bindEvents()
            let id = this.getSongId()
            this.model.getSong(id).then(()=>{
                this.view.render(this.model.data)
            })
        },
        bindEvents(){},
        getSongId(){
            let search = window.location.search
            if(search.indexOf('?') === 0){
                search = search.substring(1)
            }

            // filter((v=>v)) 过滤为falsy的值  &&
            let array = search.split('&').filter((v=>v))
            let id = ''
            for(i=0; i<array.length; i++){
                let kv = array[i].split('=')
                let key = kv[0]
                let value = kv[1]
                if(key === 'id'){
                    id = value
                    break
                }
            }

            return id
        }
    }

    controller.init(view, model)
}

