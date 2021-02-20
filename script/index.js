	const glidePeek = new Glide('.peek', {
		  type: 'carousel',
		  breakpoints:{
			900: {	
				animationDuration: 1000,focusAt: '1',startAt: 1,perView: 1,
				peek: {before: 30,after: 30}
			},
	  		2000: { 
	  			perView: 3,
	  			peek: {before: 0,after: 0}
	  		}
		}
	});
 	glidePeek.mount();

 	const glideClientes = new Glide('.clientes', {
		type: 'carousel',
		breakpoints:{
			900: {	animationDuration: 1000,autoplay: 2000,hoverpause: false,focusAt: '1',startAt: 1,perView: 1},
	  		2000: { perView: 4}
		}
	});
 	glideClientes.mount();