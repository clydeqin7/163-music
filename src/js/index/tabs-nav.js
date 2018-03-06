{
    let view = {
        el: "ol.tabs-nav",    
    }
    let model = {}
    let controller = {
        init(view, model){
            this.view = view
            this.model = model
            this.bindEvents()
        },
        bindEvents(){
            $(this.view.el).on('click', 'li', (e)=>{
                let $li = $(e.currentTarget)
                let tabName = $li.attr('data-tab-name')
                $li.addClass('active').siblings().removeClass('active')
                window.eventHub.emit('tabNav', tabName)
            })
        }
    }
    
    controller.init(view, model)
}