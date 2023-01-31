document.querySelector('#dSend').addEventListener('click', function (e) {
    e.preventDefault()
    const id = document.querySelector('#id').value

    fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(id)
    })
    .then(res => res.json(id))
    .then(id => {
        window.location.href = '/'
    })
})