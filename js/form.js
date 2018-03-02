var Patient = {
    name : "" ,
    type: "",
    matricNo: "",
    staffId: "",
    faculty: "",
    dept: "",
    staffId: "",
    maritalStatus: "",
    numberOfChildren: "",
    Gender: "",
    Dob: "",
    Conditions: "",
};

var param_student = ["matricNo", "faculty", "department", "email", "gender", "dob", "conditions"];
var param_staff = ["staffId", "faculty", "department", "email", "maritalStat", "numChild", "children", "gender", "dob", "conditions"];
var person;

function ele(id){
     return document.getElementById(id);
}

function eleName(id) {
    return document.getElementsByName(id);
}

//hides all fields except from name and initializes the patient object
function initialhide(){
    person = Object.create(Patient);

    ele("type").setAttribute("class", "hide");

    for(let i=0; i<param_student.length; i++){
        ele(param_student[i]).setAttribute("class", "hide");
    }

    for(let i = 0; i < param_staff.length; i++) {
        if (!ele(param_staff[i]).classList.contains("hide")){
            ele(param_staff[i]).setAttribute("class", "hide");
        }
    }

    ele("submit").setAttribute("class", "hide");
    
}

function hideOthers(type, index){
    if(type === "student") {
        for (let i = index; i < param_student.length; i++) {
            if (!ele(param_student[i]).classList.contains("hide")) {
                ele(param_student[i]).setAttribute("class", "hide");
            }
        }
    }
    else{
        for (let i = index; i < param_staff.length; i++) {
            if (!ele(param_staff[i]).classList.contains("hide")) {
                ele(param_staff[i]).setAttribute("class", "hide");
            }
        }
    } 

}

//handles the submission of a field.....
/* when the user leaves a field
    the field's is submitted
    - every other field after the edited field is hidden
    - the value of the field is saved in the appropriate object property
    -the next field is shown;
*/
function perform(id){
    if(id === "name"){
        person.name = eleName(id)[0].value;
        ele("type").setAttribute("class", "show");
    }
    else if(id === "type"){
        person.type = ele("type1").value;
        hideOthers(person.type, 0);
        evalType();
    }
    else{
        hideOthers(person.type, 0);
    }

    console.log(person);
}

function evalType(){
    if(person.type === "student"){
        ele("matricNo").setAttribute("class", "show");
    }
    else{
        ele("staffId").setAttribute("class", "show");
    }
}