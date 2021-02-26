	const animeElements = document.querySelectorAll('.anime');
    for(animeElement of animeElements){observer.observe( animeElement );}

	const carouselIngenierias = document.querySelector('#ingenieriaSection .glide');
	const resizecarouselIngenierias = () =>{
		(window.innerWidth > 460) ? carouselIngenierias.style.height = "350px" : carouselIngenierias.style.height = "200px";
		(window.innerWidth > 460) ? console.log('350') : console.log('200');
	}

	setTimeout(resizecarouselIngenierias,1000);
	window.onresize = resizecarouselIngenierias;