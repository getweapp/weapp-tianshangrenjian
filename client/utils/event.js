/*
* 作者： 刘焱旺 yw@getweapp.com
* 答疑交流QQ群：499859691
*/

class Event {
    constructor(){
        this.listens = {}
    }

    on(name, fn) {
        this.listens[name] = fn
    }

    exec(name) {
        if(!name || !(name in this.listens) || typeof(this.listens[name]) != 'function')
            return
        this.listens[name]()
    }
}

const event = new Event()



export default event