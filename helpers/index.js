function subjectTeacher(value) {
  if(!value) {
    return 'unassigned'
  } else {
    return value.subject_name
  }
}

function teacherSubject(value) {
  if(value.length == 0) {
    return '-'
  } else {
    let text = []
    value.forEach(teacher => {
      text.push(`${teacher.first_name} ${teacher.last_name}`)
    })
    return text.join(', ')
  }
}

module.exports = {
  subjectTeacher,
  teacherSubject
}