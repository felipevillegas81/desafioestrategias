document.querySelector('#vSend').addEventListener('click', function (e) {
    e.preventDefault()
    const id = document.querySelector('#id').value
    const data = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
        code: document.querySelector('#code').value,
        price: document.querySelector('#price').value,
        status: document.querySelector('#status').value,
        stock: document.querySelector('#stock').value,
        category: document.querySelector('#category').value,
        thumbnails: document.querySelector('#thumbnails').value
    }

    fetch(`/api/products/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(data)
    })
    .then(res => res.json(data))
    .then(data => {
        window.location.href = '/'
    })
})