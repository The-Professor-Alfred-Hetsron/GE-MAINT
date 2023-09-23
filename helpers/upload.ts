import axios from "axios"

const upload = async (data: {image: File}) => {
    const response = await axios.post(
        '/api/media/upload',
        data,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    )
    return response.data.serverFilename
}

export default upload