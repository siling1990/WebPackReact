/**
 * Created by shilei13 on 2020/7/28.
 */
let storage={
    set(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    get(key){
        return JSON.parse(localStorage.getItem(key)||'{}')
    },
    remove(key){
        localStorage.remove(key);
    }
}

export default storage