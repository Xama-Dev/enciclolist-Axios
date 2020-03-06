const selector = document.querySelector('select')

function createURL (e) {
    const indexOptionSelected = e.target.options.selectedIndex
    const valueOptionSelected = e.target.options[indexOptionSelected].value
    const url = `data/${valueOptionSelected}.json`
    return url    
}

function setList(objs, url) {
    const thereIsUl = document.querySelector('ul')
    let itemsList = []
    const containerUl = document.querySelector('.container-list')

    if(url === 'data/states.json'){
        itemsList = objs.reduce(
            (html, state) => html + `<li>${state.name} - ${state.capital}</li>` , ''
        )

    } else if (url === 'data/cup.json') {
        itemsList = objs.reduce(
            (html, cup) => html + `<li>${cup.year} - ${cup.hosts} - ${cup.champion}</li>` , ''
        )
    }else if (url === 'data/presidents.json'){
        itemsList = objs.reduce(
            (html, presidents) => html + `<li>${presidents.position} - ${presidents.name} - ${presidents.period}</li>` , ''
        )
    }

    if(thereIsUl) {
        containerUl.innerHTML = ""
        containerUl.innerHTML = `<ul>${itemsList}</ul>`
    }else {
        containerUl.innerHTML =`<ul>${itemsList}</ul>`
    }
    
}

function setError(error) {
    const containerUl = document.querySelector('.container-list')
    const status = error.response.status
    const statusText = error.response.statusText

    const message = `${status}: ${statusText}`

    containerUl.innerHTML = `<p>${message}</p>`
}

selector.addEventListener('change', (e) => {
    const url = createURL(e)

    axios(url)
        .then(response => {
            const objs = response.data
            setList(objs, url)
        })    
        .catch(error => {
            setError(error)
            console.log(error)
        })   
})