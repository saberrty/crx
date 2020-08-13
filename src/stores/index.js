import { action, observable, toJS } from "mobx";
import { setter } from "mobx-decorators";
// import { Api } from "../common/api";
import FileStore from "./FileStore";

class UploadStore {
    @setter
    @observable
    files = [];

    @action.bound
    uploadFile({ file }) {
        const f = new FileStore({ file, rootStore: this });
        this.files.push(f);
        this.uploadLoop(f);
    }

    @action.bound
    uploadLoop(f) {
        const chunks = f.chunks;
        const uploadReq = chunk => {
            const file = toJS(chunk.file);
            let formData = new FormData();
            formData.append("file", file, f.model.name);
            let request = new XMLHttpRequest();
            request.open("POST", "http://localhost:3000/users/file");
            request.send(formData);
            return Promise.resolve();
            // return Api.request({
            //     method: "post",
            //     url: "/users/file",
            //     data: {
            //         file
            //     }
            // })
        }, chunksSize = chunks.length;
        const loop = () => {
            uploadReq(chunks[f.curChunk]).then(() => {
                f.curChunk++;
                if (f.curChunk < chunksSize) {
                    loop();
                }
            })
        }
        loop();
    }
}

const uploadStore = new UploadStore();
export default uploadStore;
