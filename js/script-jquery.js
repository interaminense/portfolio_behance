$(window).load(function(){

	//load html
	$('body').fadeIn();

	// Initialize collapse button
	$('.button-collapse').sideNav({
			edge: 'left', // Choose the horizontal origin
			closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
		}
	);

	//active collapse
	$('.collapsible').collapsible({
		accordion : true
	});

	//active tooltip
	$('.tooltipped').tooltip();

	//active modal
	$('.card-open').click(function(){
	    $('#modal1').openModal();
	});

});