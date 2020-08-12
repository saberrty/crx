import { action, observable } from "mobx";
import { setter } from "mobx-decorators";

class UploadStore {
    @setter
    @observable
    model = {};

    @setter
    @observable
    rootStore = null;

    @setter
    @observable
    chunks = [];

    @setter
    @observable
    curChunk = 0;

    constructor({ file, rootStore }) {
        this.model = file;
        this.rootStore = rootStore;
        this.splitFile();
    }

    @action.bound
    splitFile() {
        let start = 0;
        const chunkSize = 10*1024*1024;
        while (start < this.model.size) {
            this.chunks.push({ file: this.model.slice(start, start + chunkSize) });
            start += chunkSize;
        }
    }
}

export default UploadStore;
