{

}

let search = window.location.search
if(search.indexOf('?') === 0){
    search = search.substring(1)
}

// filter((v=>v)) 过滤为falsy的值  &&
let array = search.split('&').filter((v=>v))
for(i=0; i<array.length; i++){
    let kv = array[i].split('=')
    let key = kv[0]
    let value = kv[1]
    if(key === 'id'){
        break
    }
}

console.log(search)
console.log(array)