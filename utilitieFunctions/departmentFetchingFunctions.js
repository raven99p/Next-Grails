export async function createDepartment(props){
    console.log('Creating department..')
    try{
      const res = await fetch(`http://localhost:8080/departmentResponder/postDepartment.json`, {
        method: 'POST',
        headers:{
          'Accept':'application/json',
          'Content-type':'application/json'
        },
        body: JSON.stringify({
          departmentName:props.departmentName
        })
      });
      return res;
    }catch(e){
      console.log(e)
    }
}

export async function updateDepartment(props){
    console.log('Creating department..')
    try{
      const res = await fetch(`http://localhost:8080/departmentResponder/updateDepartment.json`, {
        method: 'PUT',
        headers:{
          'Accept':'application/json',
          'Content-type':'application/json'
        },
        body: JSON.stringify({
          departmentId: props.departmentId,
          departmentName: props.departmentName
        })
      });
      return res;
    }catch(e){
      console.log(e)
    }
}


export async function deleteDepartment(props){
    console.log('Creating department..')
    try{
      const res = await fetch(`http://localhost:8080/departmentResponder/deleteDepartment.json`, {
        method: 'DELETE',
        headers:{
          'Accept':'application/json',
          'Content-type':'application/json'
        },
        body: JSON.stringify({
            departmentId: props.departmentId
        })
      });
      return res;
    }catch(e){
      console.log(e)
    }
}

/*
        post "/departmentResponder/postDepartment(.$format)"(controller: 'departmentResponder', action:'postDepartment')
        put "/departmentResponder/updateDepartment(.$format)"(controller: 'departmentResponder', action: 'updateDepartment')
        delete "/departmentResponder/deleteDepartment(.$format)"(controller: 'departmentResponder', action: 'deleteDepartment')
*/
