import { Box, Button } from "@mui/material"
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const PhotoUpload = (props) => {
    const formData = new FormData()

    const handleOnChange = async (event) => {
        formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET_KEY)
        formData.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME)
            formData.append("file", event.target.files[0])
            const res = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
                method: "POST",
                body: formData
            })
            const data = await res.json()
            props.setImage(data.url)
    }
    return (
        <Box>
            <Button startIcon={<AddAPhotoIcon />} variant="contained" component="label">
                Upload
                <input hidden accept="image/*" type="file" onChange={handleOnChange} />
            </Button>
        </Box>
    );
}

export default PhotoUpload;