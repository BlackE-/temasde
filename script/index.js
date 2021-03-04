	const carouselIngenierias = document.querySelector('#ingenieriaSection .glide');
	const resizecarouselIngenierias = () =>{
		(window.innerWidth > 460) ? carouselIngenierias.style.height = "250px" : carouselIngenierias.style.height = "200px";
	}

	setTimeout(resizecarouselIngenierias,1000);
	window.onresize = resizecarouselIngenierias;