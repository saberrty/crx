import React, { Component } from "react";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import styled from "styled-components";

const Wrapper = styled.div`
    width: 400px;
`

const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class App extends Component {
    render() {
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
