$(function(){
//Countdown
	$("#coutdown-time").attr('time', new Date(countdown).getTime()/1000 ).kkcountdown({
    	dayText : 'Ngày',
    	daysText : 'Ngày',
    	hourText : 'Giờ',
    	hoursText : 'Giờ',
    	minuteText : 'Phút',
    	minutesText : 'Phút',
    	secondText : 'Giây',
    	secondsText : 'Giây',
    });


    function Count(target, time, day, row, log, name){
    	var self = this;
    	this.timer;
    	this.milisec = 1000;
    	this.day = day;
    	this.time = time;
    	this.target = target;
    	this.row = row;
    	this.log = log;
    	this.start = function(){
    		this.count = Date.parse(this.getCountDate()) / 1000;
    		this.timer = setInterval(this.interval.bind(this), 1000);
    	}
    	this.getCountDate = function(){
    		var date = new Date();
    		var countYears = date.getFullYear();
    		var countDate;
    		var countDateKey;
    		var countMonth = date.getMonth() + 1;
    		var countHours;
    		var countMinutes;
    		if( typeof( this.day ) == "object" ){
    			if( this.day.indexOf(date.getDay()) >= 0 ){
    				//is day
    				countDate = date.getDate();
    				countDateKey = this.day.indexOf(date.getDay());
    				countMonth = date.getMonth()+1;
    			}
    			else{
    				//find tomorrow
    				$.each(this.day, function(key, value){
    					if(value > date.getDay()){	
    						countDate = self.nextDate(value).getDate();
    						countDateKey = key;
    						return false;
    					}
    				});

    				//is sunday
					if(typeof(countDate)=="undefined"){
						countDate = this.nextDate(this.day[0]).getDate();
					}

					//last day
					var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0);
					if(lastDayOfMonth.getDate() == date.getDay()){
						countMonth = date.getMonth() + 2;
					}
					else{
						countMonth = date.getMonth() + 1;
					}
    			}
    		}
    		if( typeof( this.day ) == "string" && this.day == "all" ){
    			countDate = date.getDate();
    				
    		}

    		$.each(this.time, function(key, value){
    			if( typeof(value) == "number" ){
    				if(value > date.getHours()){
	    				countHours = value < 10 ? '0'+value : value;
    					countMinutes = "00";
    					return false;
	    			}
    			}


    			if( typeof(value) == "string" ){
    				var h = value.split(":");
    				if(h[0] > date.getHours()){
    					countHours = h[0];
    					countMinutes = h[1];
    					return false;
    				}
    			}
    		})
    		if(typeof(countHours)=="undefined"){
    			if( typeof(this.time[0])=="string" ){
    				var h = this.time[0].split(":");
	    			countHours = h[0];
	    			countMinutes = h[1];
    				var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0);
    				if( countDate==date.getDate() ){
    					
    					if( typeof( this.day ) == "string" && this.day == "all" ){
    						countDate = (date.getDate()+1)>lastDayOfMonth.getDate() ? 1 : countDate+1;
    					}
    					if( typeof(this.day) == "object" ){
    						var nd = (countDateKey+1) >= this.day.length ? this.day[0] : this.day[countDateKey+1];	
    						countDate = self.nextDate(nd).getDate();
    					}	    					
	    				
	    				
	    			}
	    			countMonth = (date.getDate()+1)>lastDayOfMonth.getDate() ? countMonth+1 : countMonth;

    			}
    			else if( typeof(this.time[0])=="number" ){
    				countHours = this.time[0] < 10 ? '0'+this.time[0] : this.time[0];
    				countMinutes = "00";
    				if( this.day == "all" ){
	    				var lastDayOfMonth = new Date(date.getFullYear(), date.getMonth()+1, 0);
	    				countDate = (date.getDate()+1)>lastDayOfMonth.getDate() ? 1 : countDate+1;
	    				countMonth = (date.getDate()+1)>lastDayOfMonth.getDate() ? countMonth+1 : countMonth
	    			}
    			}
    			else{
    				countHours = "00";
	    			countMinutes = "00";
    			}
    			
    		}

    		//this.log.text(countMonth+'/'+countDate+'/'+countYears+' '+countHours+':'+countMinutes+':00')

    		return countMonth+'/'+countDate+'/'+countYears+' '+countHours+':'+countMinutes+':00';
    	}
    	this.interval = function(){
    		var today = new Date();

    		$('#clock').text(today);

    		var cunix = Date.parse(this.count);
    		var timestamp = this.count - (Math.round(today.getTime()/1000));
    		if(timestamp < 180){
    			console.log(timestamp)
    			this.row.addClass('danger');
    			this.row.removeClass('warning');
    		}
    		else if(timestamp < 900){
    			this.row.addClass('warning');
    			this.row.removeClass('danger');
    		}
    		else{
    			this.row.removeClass('danger warning');
    		}
    		if(timestamp==0){
    			console.log('reset')
    			this.count = Date.parse(this.getCountDate()) / 1000;
    		}
    		var days    = this.component(timestamp, 24 * 60 * 60),
		        hours   = this.component(timestamp,      60 * 60) % 24,
		        minutes = this.component(timestamp,           60) % 60,
		        seconds = this.component(timestamp,            1) % 60;
		        hours = hours<10?'0'+hours:hours;
		        minutes = minutes<10?'0'+minutes:minutes;
		        seconds = seconds<10?'0'+seconds:seconds;
		        days = days>0 ? days+' ngày<br>':'';
    		this.target.html( days + hours+' : '+minutes+' : '+seconds );
    	}
    	this.nextDate = function(dayIndex){
    		var today = new Date();
		    today.setDate(today.getDate() + (dayIndex - 1 - today.getDay() + 7) % 7 + 1);
		    return today;
    	}
    	this.component = function (x, v) {
		    return Math.floor(x / v);
		}
    	this.start();
    }
//===================================================================================

//Audio 
	// var audio = document.getElementById('audio');
	// var audioOn = true;
	// $('#btn-sound').click(function(){
		// $(this).toggleClass('off');
		// audioOn = !audioOn;
		// if(audioOn){
			// audio.play();
		// }
		// else{
			// audio.pause();
		// }
	// });

	var musicBackground = document.getElementById('audio');
    var musicPlay = true;

    var promise = musicBackground.play();

    // if (promise !== undefined) {
      // promise.then(_ => {    
      // }).catch(error => {    
        // $('body').click(function(){
            // musicBackground.play()
        // });
      // });
    // }

    function musicSwitch(){
        $(this).toggleClass('on')
        if(musicPlay){
            musicBackground.pause();
        }
        else{
            musicBackground.play();
        }
        musicPlay=!musicPlay;
    }
	
    $('#btn-sound').click(musicSwitch);
//===================================================================================

//Page 
	$('#button-page-2 a').click(function(){
		var activeTab = $(this).attr('href').replace('#','');
		$('#button-page-2 a').removeClass('active');
		$(this).addClass('active');
		$('.page-2 .event-tab').removeClass('active');
		$('.page-2 .event-tab#'+activeTab).addClass('active');
		$('.page-2').removeClass('bg-page-2-tab-1 bg-page-2-tab-2 bg-page-2-tab-3 bg-page-2-tab-4 bg-page-2-tab-5');
		$('.page-2').addClass('bg-'+activeTab);
		return false;
	});

	$('#button-page-3 a').click(function(){
		var activeTab = $(this).attr('href').replace('#','');
		$('#button-page-3 a').removeClass('active');
		$(this).addClass('active');
		$('.page-3 .event-tab').removeClass('active');
		$('.page-3 .event-tab#'+activeTab).addClass('active');
		$('.page-3').removeClass('bg-page-3-tab-1 bg-page-3-tab-2 bg-page-3-tab-3 bg-page-3-tab-4 bg-page-3-tab-5');
		$('.page-3').addClass('bg-'+activeTab);
		return false;
	});
	
	$('#button-page-4 a').click(function(){
		var activeTab = $(this).attr('href').replace('#','');
		$('#button-page-4 a').removeClass('active');
		$(this).addClass('active');
		$('.page-4 .event-tab').removeClass('active');
		$('.page-4 .event-tab#'+activeTab).addClass('active');
		$('.page-4').removeClass('bg-page-4-tab-1 bg-page-4-tab-2 bg-page-4-tab-3 bg-page-4-tab-4 bg-page-4-tab-5');
		$('.page-4').addClass('bg-'+activeTab);
		return false;
	});
	
	particlesJS("particles-js", {"particles":{"number":{"value":2000,"density":{"enable":true,"value_area":3000}},"color":{"value":"#ff6000"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":3},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":true,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":2,"random":true,"anim":{"enable":true,"speed":5,"size_min":0,"sync":false}},"line_linked":{"enable":false,"distance":500,"color":"#ffffff","opacity":0.4,"width":2},"move":{"enable":true,"speed":7.8914764163227265,"direction":"top","random":true,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":false,"mode":"bubble"},"onclick":{"enable":false,"mode":"repulse"},"resize":true},"modes":{"grab":{"distance":400,"line_linked":{"opacity":0.5}},"bubble":{"distance":400,"size":4,"duration":0.3,"opacity":1,"speed":3},"repulse":{"distance":200,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true});var count_particles, stats, update; stats = new Stats; stats.setMode(0); stats.domElement.style.position = 'absolute'; stats.domElement.style.left = '0px'; stats.domElement.style.top = '0px'; document.body.appendChild(stats.domElement); count_particles = document.querySelector('.js-count-particles'); update = function() { stats.begin(); stats.end(); if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) { count_particles.innerText = window.pJSDom[0].pJS.particles.array.length; } requestAnimationFrame(update); }; requestAnimationFrame(update);;
	
//===================================================================================
	
	
});
