const WebWorkerManager = {
    worker: null,
    initWorker: function () {
        console.log("here")
        if (!this.worker)
            this.worker = new Worker("./workers/webWorker.js")

    },
    getWorker: function () {
        return this.worker
    }
}

export default WebWorkerManager