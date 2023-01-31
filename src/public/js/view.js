document.querySelector('#cvSend').addEventListener('click', function (e) {
    e.preventDefault()
    const id = document.querySelector('#id').value
    

    fetch(`/api/carts/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }, body: JSON.stringify(id)
    })
    .then(res => res.json(id))
    .then(id => {
        window.location.href = '/'
    })
})