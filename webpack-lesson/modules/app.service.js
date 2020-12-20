export default class AppService { // export default это значит что при импорте этого класса мы будет получать не новый класс а потом вызывать у него ф-и, а именно этот класс который экспортируем
    constructor(text) {
        this.text = text
    }

    log() {
        console.log('[App service]:', this.text)
    }
}