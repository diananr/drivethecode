$("#estimate").on('click', function(){
    $(".cars").show("slow");

})
$("#startPoint").on('click', function(){
    $(".cars").hide("slow");
    $("input").val("");
})
$("endPoint").on('click', function(){
    $(".cars").hide("slow");
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
