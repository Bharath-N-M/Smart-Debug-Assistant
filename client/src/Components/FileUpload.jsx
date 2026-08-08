import {useState} from "react";

function FileUpload(){
    const [file, setFile] = useState(null);
    const handleFileChange=(e)=>{
        const selectedFile=e.target.files[0];
        setFile(selectedFile);
    }
    return(
        <div className="file-upload">
            <input type="file" onChange={handleFileChange}/>
            {file && <p>Selected file: {file.name}</p>}
        </div>
    );
}
export default FileUpload;