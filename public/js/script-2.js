$("#estimate").on('click', function(){
	if($("#startPoint").val().trim().length > 0 && $("#endPoint").val().trim().length > 0){
   		$(".cars").show("slow");
	}

})
$("#startPoint").on('click', function(){
    $(".cars").hide("slow");
    $("input").val("");
})
$("#endPoint").on('click', function(){
    $(".cars").hide("slow");
})


$(".car-item").click(function(){
	$("#blur").addClass("blur");
})

$("#line").click(function(){
    $("#myModal-line").modal();
});
$("#lyft").click(function(){
    $("#myModal-lyft").modal();
});
$("#plus").click(function(){
    $("#myModal-plus").modal();
});
