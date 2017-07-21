'use strict';

//State variables for the coach assistant application
const applicationState = {
	currentProject: {number: 1, description: "App used to manage your guild for the Guild Wars 2 MMORPG"},
	degree: 0
	/*players: {},
	formations: {},
	rosters: {},
	currentPlayerId: "",
	currentRosterId: "",
	currentFormationId: "",
	startPosition: {},
	rostersTable: null, 
	teamTable: null*/
};
function getProjectDescription(projectNumber){
	switch(projectNumber){
		case 1:
			return "App used to manage your guild for the Guild Wars 2 MMORPG";
		case 2:
			return "App used to aid you when you travel by helping you locate scenery, entertainment, and events in a selected area. The app also includes a translator for the dominant language in an area.";
		case 3:
			return "App used to manage your soccer team's roster";
	}
}
function getNewProject(currentProject, direction){
	if(direction === 'left'){
		const projectNumber = (currentProject.number - 1) === 0 ? 3 : (currentProject.number - 1);
		const projectDescription = getProjectDescription(projectNumber);
		return {number: projectNumber, description: projectDescription};
	}
	else{
		const projectNumber = (currentProject.number + 1) === 4 ? 1 : (currentProject.number + 1);
		const projectDescription = getProjectDescription(projectNumber);
		return {number: projectNumber, description: projectDescription};
	}
}
function turnCarousel(degree){
	$('#carousel').css({transform: 'translateZ(144px) rotateY('+degree+'deg)'});
}
function handleCarouselTurning(){
	$('.carouselNext').click(() => {
		applicationState.degree  -= 120;
		applicationState.currentProject = getNewProject(applicationState.currentProject, 'left');
		$('.description').fadeOut(function(){
			$(this).html(
				"<span class='bold'>Description</span>: "+applicationState.currentProject.description
				).fadeIn();
		});
		turnCarousel(applicationState.degree);
	});
	$('.carouselPrevious').click(() => {
		applicationState.degree  += 120;
		applicationState.currentProject = getNewProject(applicationState.currentProject, 'right');
		$('.description').fadeOut(function(){
			$(this).html(
				"<span class='bold'>Description</span>: "+applicationState.currentProject.description
				).fadeIn();
		});
		turnCarousel(applicationState.degree);
	});
}
function handleVerticalScrolling(){
	let scrollBottom;
	$(window).scroll(function(){
		scrollBottom = $(document).height() - $(window).height() - $(window).scrollTop();
		if ($(window).scrollTop() > $(window).height() - 60)
			$('.navListHorizontal').addClass('fixedNav');
		else if($(window).scrollTop() <= $(window).height() - 60)
			$('.navListHorizontal').removeClass('fixedNav');
		if(scrollBottom < 95)
			$('.mainFooter').addClass('popOutFooter');
		else if(scrollBottom >= 95)
			$('.mainFooter').removeClass('popOutFooter');
	});
}
function handleResize(){
	$(window).resize(function() {
		if($('#myModal').is(":visible") && $(window).width() <= 649)
			$('#myModal').modal('hide');
	});
}
function handleNavigation(){
	$(".homeButton").click(function() {
    	$('html,body').animate({
        	scrollTop: $("#home").offset().top},
        	'slow');
	});
	$(".aboutMeButton").click(function() {
    	$('html,body').animate({
        	scrollTop: $("#aboutMe").offset().top - 70},
        	'slow');
	});
	$(".portfolioButton").click(function() {
    	$('html,body').animate({
        	scrollTop: $(".portfolioSection").offset().top - 70},
        	'slow');
	});
	$(".contactButton").click(function() {
    	$('html,body').animate({
        	scrollTop: $("#contact").offset().top - 70},
        	'slow');
	});
}

function handleInitialization(){
	$('.loadingScreen').fadeOut();
	$('html, body').addClass('loaded');
	handleVerticalScrolling();
	handleResize();
	handleNavigation();
	handleCarouselTurning();
}
$(document).ready(function(){
	handleInitialization();
});