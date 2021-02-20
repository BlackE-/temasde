	console.log('%cBy @Studio-SUB', 'font-size: 14px;color: #000; border:1px solid #000;');
	
	const menuIcon = document.getElementById('menuIcon');
	const menuScreen = document.getElementById('menuScreen');
	menuIcon.addEventListener('click',()=>{
		if(menuIcon.classList.contains('open')){openMenu();}else{closeMenu();}
	});

	openMenu = () =>{
		menuIcon.classList.remove('open');
		menuScreen.classList.remove('open');
	}
	closeMenu = () =>{
		menuIcon.classList.add('open');
		menuScreen.classList.add('open');
	}

	const options = {root: null,rootMargin: '0px',threshold: 0.9};
    const callback = function( entries, observer ) {
      entries.forEach((entry) => {
	    if (entry.intersectionRatio < 0.9) {entry.target.classList.remove('active');}
	    else {
	    	entry.target.classList.add('active');
	    	observer.unobserve(entry.target);
	    }
	  });
    }

    const observer = new IntersectionObserver( callback, options );
    const animateElements = document.querySelectorAll('.animate');
    for(animateElement of animateElements){observer.observe( animateElement );}

 	// Identificar o clique no menu
	// Verificar o item que foi clicado e fazer referência com o alvo
	// Verificar a distância entre o alvo e o topo
	// Animar o scroll até o alvo

	const goToFooter = document.getElementById('goToFooter');
	const footerOffset = document.getElementById('footer').offsetTop;
	goToFooter.addEventListener('click', ()=>{
		smoothScrollTo(0,footerOffset)
	});


 	//form footer
    const form1 = document.getElementById("form-footer"); 
    const response = document.getElementById('response');
    const name = form1.elements['name'];
    const phone = form1.elements['phone'];
    const email = form1.elements['email'];
    const mensaje = form1.elements['mensaje'];

    const itl = intlTelInput(phone, {
      formatOnDisplay: false,
      placeholderNumberType: "MOBILE",
      initialCountry: "mx",
      utilsScript: "script/intl-tel-input/js/utils.js",
    });

    clearform = () => {
        response.innerHTML = '';
        name.value = '';
        phone.value = '';
        email.value = '';
        mensaje.value = '';
    }

    form1.addEventListener("submit", function(event){
        event.preventDefault();
        if (!name.checkValidity()) {response.innerHTML = name.validationMessage;}
        if (!email.checkValidity()) {response.innerHTML = email.validationMessage;}
        if (!phone.checkValidity()) {response.innerHTML = phone.validationMessage;}

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const res = JSON.parse(this.responseText);
                response.innerHTML = `GRACIAS ${res.message}`;
                // dataLayer.push({'event': 'EnviarFormularioModal-QuieroMiDescuento-Desktop','landingPage':{'btn_activador':btn_activador}});
                setTimeout(clearform(),3000);
            }
            else{
                const errorMessage = JSON.parse(this.responseText);
                response.innerHTML = errorMessage.message;
            }
        };
        xhttp.open("POST", "script/enviarFormularioFooter.php", true);
        xhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
        xhttp.send("name="+name.value+"&phone="+itl.getNumber()+"&email="+email.value+"&mensaje="+mensaje.value);
    });




	// Caso deseje suporte a browsers antigos / que não suportam scroll smooth nativo
	/**
	 * Smooth scroll animation
	 * @param {int} endX: destination x coordinate
	 * @param {int) endY: destination y coordinate
	 * @param {int} duration: animation duration in ms
	 */
	function smoothScrollTo(endX, endY, duration) {
	  const startX = window.scrollX || window.pageXOffset;
	  const startY = window.scrollY || window.pageYOffset;
	  const distanceX = endX - startX;
	  const distanceY = endY - startY;
	  const startTime = new Date().getTime();

	  duration = typeof duration !== 'undefined' ? duration : 3000;

	  // Easing function
	  const easeInOutQuart = (time, from, distance, duration) => {
	    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
	    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
	  };

	  const timer = setInterval(() => {
	    const time = new Date().getTime() - startTime;
	    const newX = easeInOutQuart(time, startX, distanceX, duration);
	    const newY = easeInOutQuart(time, startY, distanceY, duration);
	    if (time >= duration) {
	      clearInterval(timer);
	    }
	    window.scroll(newX, newY);
	  }, 1000 / 60); // 60 fps
	};