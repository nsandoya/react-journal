export const fileUpload = async(file) => {
    if(!file) throw new Error('No files uploaded')

    const cloudUrl = 'https://api.cloudinary.com/v1_1/samaritana/upload';

    // Este es el body de la petición http (recuerda tu request en Postman)
    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try{
        // HTTP request
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        //console.log(resp)
        if(!resp.ok) throw new Error('Upload failed :(')

        const cloudResp = await resp.json();
        //console.log(cloudResp)
        return cloudResp.secure_url // El link https de la imagen ya en cloudinary
    }catch(error){
        console.log(error.message)
        throw new Error(error.message)
    }

}