{
    let view = {
        el: "main > .songList-group",
        template: `
        <h2>歌曲列表</h2>
        <ul>
            <li class="selected">歌曲*1</li>
            <li>歌曲*2</li>
            <li>歌曲*3</li>
            <li>歌曲*4</li>
            <li>歌曲*5</li>
            <li>歌曲*6</li>
            <li>歌曲*7</li>
            <li>歌曲*8</li>
            <li>歌曲*9</li>
            <li>歌曲*10</li>
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
            this.view.render({})
        }
    }

    controller.init(view, model)
}