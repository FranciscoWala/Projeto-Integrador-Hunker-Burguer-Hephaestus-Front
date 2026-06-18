export async function uploadParaCloudinary(arquivo) {
    const cloudName = 'djn64pvcb'; 
    const uploadPreset = 'honker'; 
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const formData = new FormData();
    formData.append('file', arquivo);
    formData.append('upload_preset', uploadPreset);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            return data.secure_url;
        } else {
            console.error(response.status);
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}