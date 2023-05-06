import { useState } from "react";
import AudioTrack from "../AudioTrack";
import "./styles.scss";
import FileUpload from "./FileUpload";


export default function FileTrack() {
    const [file, setFile] = useState({ fileName: "", filePath: "" });

    return (
        <AudioTrack
            fileName={file.fileName}
            filePath={file.filePath}
            controls={[<FileUpload onChange={setFile} key="file" />]}
        />
    );
}
