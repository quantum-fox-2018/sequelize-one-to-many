 function assignedSubject(teacherData){
   if(teacherData.SubjectId !== null){
     return teacherData.Subject.subject_name
   }else{
     return "Unassigned"
   }
 }

 module.exports = assignedSubject;
