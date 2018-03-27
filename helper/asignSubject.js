function asignSubject(subject){
  if(subject !== null){
    return subject.subject_name
  }else{
    return 'unassigned'
  }
}

module.exports = asignSubject;
