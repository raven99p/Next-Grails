export async function verification(props){
  console.log('verifying user..')
  try{
    const res = await fetch(`http://localhost:8080/authenticationResponder/verify`, {
      method: 'POST',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({
        username:props.username,
        password:props.password
      })

    });
    console.log(res);
    return res;
  }catch(e){
    console.log(e)
  }
}

export async function logout(){
  console.log('Loging out user..')
  try{
    const res = await fetch(`http://localhost:8080/authenticationResponder/logout`, {
      method: 'GET',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      credentials:'include'
    });
    return res;
  }catch(e){
    console.log(e)
  }
}

export async function getSessionVariable(){
  console.log('Fetching Session..')
  try{
    const res = await fetch(`http://localhost:8080/authenticationResponder/getSessionVariable`, {
      method: 'GET',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      credentials:'include'
    });
    return res;
  }catch(e){
    console.log(e)
  }
}
