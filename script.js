const imgContainer = document.getElementById('image-container')
const loader = document.getElementById('loader')

const accessKey = 'HFAvs-R3vTXu4kV2gkvrIOraEBDWvvSQGGny1bP0-18'
const count = 10
const url = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`

let arrayPhotos = []
let imagesLoaded = 0
let totalImage = 0
let ready = false

const imageLoaded = () => {
    imagesLoaded++
    if(imagesLoaded === totalImage) {
        ready=true
        console.log('ready')
        loader.hidden = true
    }
}

const setAttrFunc = (element, attributes) => {
    for (key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

const displayImg = () => {
    imagesLoaded = 0
    totalImage = arrayPhotos.length
    arrayPhotos.forEach(photo => {
        //create link
        let item = document.createElement('a')
        setAttrFunc(item, {
            href: photo.links.html,
            target: '_blank'
        })
        //create img
        let img = document.createElement('img')
        setAttrFunc(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })
        img.addEventListener('load', imageLoaded)
        item.appendChild(img)
        imgContainer.appendChild(item)
    })
}

const fetchPhotos = async () => {
    try {
        const response = await fetch(url)
        arrayPhotos = await response.json()
        displayImg()
    } catch (e) {
        console.log(e)
    }
}

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false
        fetchPhotos()
    }
})

fetchPhotos()