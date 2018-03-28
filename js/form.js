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
};

var param_student = ["matricNo", "faculty", "department", "email", "gender", "dob"];
var param_staff = ["staffId", "faculty", "department", "email", "maritalStat", "numChild", "gender", "dob"];
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
        ele("submit").setAttribute("class", "hide");
    }
    else{
        for (let i = index; i < param_staff.length; i++) {
            if (!ele(param_staff[i]).classList.contains("hide")) {
                ele(param_staff[i]).setAttribute("class", "hide");
            }
        }
        ele("submit").setAttribute("class", "hide");
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
    if ((id === "name") && (eleName(id)[0].value !== "")){
        person.name = eleName(id)[0].value;
        ele("type").setAttribute("class", "show");
    }
    else if ((id === "type") && (eleName(id)[0].value !== "student")){
        person.type = eleName(id)[0].value
        hideOthers("staff", 0);
        hideOthers("student", 0);
        ele("staffId").setAttribute("class", "show");
    }
    else if ((id === "type") && (eleName(id)[0].value !== "staff")) {
        person.type = eleName(id)[0].value
        hideOthers("student", 0);
        hideOthers("staff", 0);
        ele("matricNo").setAttribute("class", "show");
    }
    else if ((id === "matricNo") && (eleName(id)[0].value !== "")) {
        person.matricNo = eleName(id)[0].value
        hideOthers(person.type, 1);
        ele("faculty").setAttribute("class", "show");
    }
    else if ((id === "staffId") && (eleName(id)[0].value !== "")) {
        person.staffId = eleName(id)[0].value
        hideOthers(person.type, 1);
        ele("faculty").setAttribute("class", "show");
    }
    else if ((id === "faculty") && (eleName(id)[0].value !== "")) {
        performFaculty(person.type);
    }
    else if ((id === "department") && (eleName(id)[0].value !== "")) {
        person.dept = eleName(id)[0].value
        hideOthers(person.type, 3);
        ele("email").setAttribute("class", "show");
    }
    else if ((id === "email") && (eleName(id)[0].value !== "")) {
        person.email = eleName(id)[0].value
        hideOthers(person.type, 4);
        if(person.type === "student"){
            ele("gender").setAttribute("class", "show");
        }
        else{
            ele("maritalStat").setAttribute("class", "show");
        }
    }
    else if ((id === "maritalStat") && (eleName(id)[0].value !== "")) {
        person.maritalStatus = eleName(id)[0].value
        hideOthers(person.type, 5);
        if (person.maritalStatus !== "single") {
            hideOthers(person.type, 5);
            ele("numChild").setAttribute("class", "show");
        }
        else {
            hideOthers(person.type, 6);
            ele("gender").setAttribute("class", "show");
        }
    }
    else if ((id === "numChild") && (eleName(id)[0].value !== "")) {
        person.numberOfChildren = eleName(id)[0].value
        hideOthers(person.type, 6);
        ele("gender").setAttribute("class", "show");
    }
    else if ((id === "gender") && (eleName(id)[0].value !== "")) {
        if(person.type === "staff"){
            if(person.numberOfChildren !== ""){
                performGender(person.type, 7);
            }
            else{
                performGender(person.type, 6);
            } 
        }
        else{
            performGender(person.type, 5);
        }
    }
    else if ((id === "dob") && (eleName(id)[0].value !== "")) {
        person.dob = eleName(id)[0].value
        ele("submit").setAttribute("class", "show");
    }
    else{
        hideOthers(person.type, 0);
    }

    console.log(person);
}



function performFaculty($personType){
    id = "faculty";

     if (eleName(id)[0].value === "arts") {
        person.faculty = eleName(id)[0].value
        $arr = ["creative arts", "theatre art", "music"];
        showDept($personType, $arr);
    }
    else if(eleName(id)[0].value === "busAdmin") {
        person.faculty = eleName(id)[0].value
        $arr = ["accounting", "insurance", "finance", "acturial science", "IRPM"];
        showDept($personType, $arr);
    }
    else if (eleName(id)[0].value === "education") {
        person.faculty = eleName(id)[0].value
        $arr = ["biology education", "physics education", "adult education", "HKE", "chemistry education"];
        showDept($personType, $arr);
    }
    else if (eleName(id)[0].value === "engineering") {
        person.faculty = eleName(id)[0].value
        $arr = ["civil", "electrical electronics", "mechanical", "systems", "met & maths"];
        showDept($personType, $arr);
    }
    else if (eleName(id)[0].value === "science") {
        person.faculty = eleName(id)[0].value
        $arr = ["biochemistry", "CBG", "marine science", "physics", "mathematics", "chemistry", "computer sciences"];
        showDept($personType, $arr);
    }
    else {
         hideOthers($personType, 2);
    }
}

function performGender($personType, $ind){
    id = "gender";

    if (eleName(id)[0].value === "male") {
        person.gender = eleName(id)[0].value
        hideOthers($personType, $ind);
        ele("dob").setAttribute("class", "show");
    }
    else if (eleName(id)[0].value === "female"){
        person.gender = eleName(id)[0].value
        hideOthers($personType, $ind);
        ele("dob").setAttribute("class", "show"); 
    }
    else {
        hideOthers($personType, $ind);
    }
}


function showDept($personType, $arr){
    hideOthers($personType, 2);
    ele("department").setAttribute("class", "show");

    $dept = "";
    $arr.forEach($dp => {
        $dept += "<option class='blue' value='" + $dp + "'>" + $dp + "</option>";
    });
    ele("dept").innerHTML = $dept;
}

function submit(){
    $result = ""

    if(person.name != ""){
        $result += "Name: " + person.name + "<br>"
    }
    if (person.faculty != " ") {
        $result += "Faculty: " + person.faculty + "'<br>'"
    }
    if (person.dept != " ") {
        $result += "Department: " + person.dept + "'<br>'"
    }
    if (person.dob != " ") {
        $result += "Date Of Birth: " + person.dob + "'<br>'"
    }
    if (person.gender != " ") {
        $result += "Gender: " + person.gender + "'<br>'"
    }

    alert($result);
}

