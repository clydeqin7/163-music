{
    let view = {
        el: "ol.tab-content > li.page-3",
        init(){
            this.$el = $(this.el)
        },
        show(){
            this.$el.addClass('active')
        },
        hide(){
            this.$el.removeClass('active')
        }
    }
    let model = {}
    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            this.view.init()
            this.bindEvents()
            this.bindEventHub()
        },
        bindEvents(){},
        bindEventHub(){
            window.eventHub.on('tabNav', (data)=>{
                if(data === 'page-3'){
                    this.view.show()
                }else{
                    this.view.hide()
                }
            })
        }
    }

    controller.init(view, model)
}