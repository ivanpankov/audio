import { BsFillFolderSymlinkFill } from "react-icons/bs";

export default function FileUpload({ onChange }) {
    const handleChange = (event) => {
        const { target } = event;
        const { files } = target;
        const file = files[0];
        const fileName = file.name;
        const filePath = URL.createObjectURL(file);
        if (file) {
            onChange({ fileName, filePath });
        }
    };

    return (
        <label className="file-upload media-control">
            <BsFillFolderSymlinkFill />
            <input type="file" onChange={handleChange} />
        </label>
    );
}
