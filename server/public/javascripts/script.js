const confirmEmail = document.getElementById('confirmEmail')

function selectEmailImage(){
    const imagespath = ['images/img1.png','images/img2.png','images/img3.png','images/img4.png','images/img5.png','images/img6.png','images/img7.png','images/img8.png','images/img9.png']

    let selectedImage = imagespath[Math.ceil(Math.random()*(imagespath.length - 1))]

    confirmEmail.setAttribute('src', selectedImage)
}

setInterval(()=>{
    selectEmailImage()
}, 2000)