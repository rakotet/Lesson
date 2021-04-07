export class Select {
    constructor(list) {
        this.list = list
    }

    selectCreate(elemId) {
        let select = document.querySelector(elemId)
        let option = ''
        for(let i = 0; i < this.list.length; i++) {
            option += `<option>${this.list[i].login}</option>`
        }
        select.innerHTML = option
    }

    selectCreatePosition(elemId) {
        let select = document.querySelector(elemId)
        let option = ''
        for(let i = 0; i < this.list.length; i++) {
            option += `<option>${this.list[i].position} ${this.list[i].login}</option>`
        }
        select.innerHTML = option
    }

}