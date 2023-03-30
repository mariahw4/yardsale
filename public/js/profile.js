const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#listing-title').value.trim();
    const price = document.querySelector('#listing-price').value.trim();
    const description = document.querySelector('#listing-desc').value.trim();
    const fileInput = document.querySelector('#file-input')

    console.log("fileInput", fileInput.files[0])
    
    console.log(title, price, description)
    const formData = new FormData();
    formData.append("title", title)
    formData.append("price", price)
    formData.append("description", description)
    formData.append("Image", fileInput.files[0])

    if (title && price && description) {
        const response = await fetch(`/api/listings/upload`, {
            method: 'POST',
            body: formData,
            // headers: {
            //     'Content-Type': 'multipart/form-data',
            // },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create listing');
            console.log("error", err);
        }
    }
};

document
    .querySelector('.new-listing-form')
    .addEventListener('submit', newFormHandler);

