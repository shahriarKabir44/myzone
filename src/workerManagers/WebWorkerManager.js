const WebWorkerManager = {
    worker: null,
    initWorker: function () {
        if (!this.worker)
            this.worker = new Worker("./workers/webWorker.js")

    },
    getWorker: function () {
        return this.worker
    }
}

export default WebWorkerManager