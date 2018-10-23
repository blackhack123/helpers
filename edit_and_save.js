//first need instance your custom button
{ name: "btn_edit", formatter: buttonEditFormatter, width: 30, align:'center'},
{ name: "btn_save", formatter: buttonSaveFormatter, width: 30, align:'center'}

//create the function formatter for Edit and Save buttons
function buttonEditarFormatter() {
    new_format_edit ='<a href="javascript:void(0)" onClick="editRow.call(this)"><i class="fa fa-pencil fa-lg text-orange " aria-hidden="true"></i></a>';
    //return button edit
    return new_format_editar

}//end function buttonFormatter

function buttonSaveFormatter(){
 new_format_save =  '<a href="javascript:void(0)" onClick="saveRow.call(this)"><i class="fa fa-floppy-o fa-lg text-green" aria-hidden="true"></i></a>';
 //return button save
 return new_format_save;
}

//functions for edit and save rows
function editRow(){
  //id row
  rowid = $(this).closest("tr.jqgrow").attr("id")
  //edit row
  jQuery("#myGrid").jqGrid('editRow',rowid);
}//end function editRow

function saveRow(){

    //id row
    rowid = $(this).closest("tr.jqgrow").attr("id")
    //save row
    $('#myGrid').jqGrid('saveRow',rowid);

}//end function saveRow
//dont forget set your cellsubmit, editurl, cellEdit
//example:
cellEdit: false,
cellsubmit: 'clientArray',
editurl: "clientArray",
//this case is local edit
