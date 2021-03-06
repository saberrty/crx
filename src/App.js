import React, { Component } from "react";
import { Upload, message } from "antd";
// import SparkMD5 from "spark-md5";
import { inject, observer   } from "mobx-react";
import { InboxOutlined } from "@ant-design/icons";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 400px;
`

@inject("uploadStore")
@observer
class App extends Component {
    render() {
        const { uploadFile, files } = this.props.uploadStore;
        const { Dragger } = Upload;
        const props = {
            multiple: true,
            customRequest: obj => uploadFile(obj),
            onChange: info => {
                const { status } = info.file;
                if (status === "done") {
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === "error") {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
            onRemove: f => {
                const file = files.find(v => v.model.uid === f.uid);
                file.setPause();
                return false;
            }
        };

        return (
            <Wrapper>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                        band files
                    </p>
                </Dragger>
            </Wrapper>
        );
    }
}

export default App;
