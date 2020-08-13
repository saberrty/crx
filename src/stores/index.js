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
            return new Promise((res, rej) => {
                let request = new XMLHttpRequest();
                request.open("POST", "http://localhost:3000/users/file");
                // request.open("POST", "/users/file"); //dev proxy
                request.onload = () => {
                    if (request.status >= 200 && request.status < 300) {
                        res(request.response);
                    } else {
                        rej(request.statusText);
                    }
                };
                request.send(formData);
            })
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
                if (f.curChunk < chunksSize && !f.pause) {
                    loop();
                }
            })
        }
        if (f.curChunk < chunksSize && !f.pause) {
            loop();
        }
    }
}

const uploadStore = new UploadStore();
export default uploadStore;
