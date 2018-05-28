//Add and Remove Options in Select using jQuery 

//this  append option on select by id using jquery
$("#selectBox").append('<option value="option6">option6</option>');

//apend options from array
$.each(selectValues, function(key, value) {
     $('#mySelect')
         .append($("<option></option>")
         .attr("value",key)
         .text(value));
});

//remove options from select except the first option by id
$('#mySelect').children('option:not(:first)').remove();

//remove option from select by id and value
$("#selectBox option[value='option1']").remove();

//create options from array
// in this case use a cycle for to create options only with javascript
//the array is example_array
//example_array content:example_array[0]['id']->'1', example_array[0]['text']->'apple'
for (i=0; i<example_array.length; i++){
    var option = document.createElement("option");
    option.text = op_list[i]['text'];
    option.value = op_list[i]['id'];
    var select = document.getElementById("id_select");
    //insertando la opcion
    select.appendChild(option);
}//end for
