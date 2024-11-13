const getData = function () {
  fetch('https://striveschool-api.herokuapp.com/books')
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Error')
      }
    })
    .then((data) => {
      let row = document.querySelector('.row')
      data.forEach((book) => {
        let col = document.createElement('div')
        col.classList.add('col', 'mt-4')

        col.innerHTML = `
              <div class="card h-100" style="width: 15rem;">
                <img src="${book.img}" class="card-img-top "   alt="...">
                <div class="card-body">
                  <h5 class="card-title">${book.title}</h5>
                  <p class="card-text">${book.price}$</p>
                  <button class="btn btn-primary scarta">Scarta</button>
                  <button class="btn btn-primary compra">Compra ora</button>
                </div>
              </div>
            `
        row.appendChild(col)

        const compraButton = col.querySelector('.compra')
        compraButton.addEventListener('click', () => {
          const savedItems =
            JSON.parse(localStorage.getItem('savedItems')) || []
          const item = {
            title: book.title,
            price: book.price,
          }
          savedItems.push(item)
          localStorage.setItem('savedItems', JSON.stringify(savedItems))
        })
      })

      row.addEventListener('click', (event) => {
        if (event.target.classList.contains('scarta')) {
          const col = event.target.closest('.col')
          if (col) {
            col.style.display = 'none'
          }
        }
      })
    })
    .catch((err) => {
      console.log('Error', err)
    })
}

getData()
