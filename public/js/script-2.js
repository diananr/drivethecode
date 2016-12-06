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
