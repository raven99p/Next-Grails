export async function verification(props){
  console.log('verifying user..')
  try{
    const res = await fetch(`http://localhost:8080/authenticationResponder/verify.json`, {
      method: 'POST',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
      },
      body: JSON.stringify({
        username:props.username,
        password:props.password
      })
    });
    console.log('this is the response');
    console.log(res);
    return res;
    
  }catch(e){
    console.log(e)
  }
}

export async function logout(){
  console.log('Loging out user..')
  try{
    const res = await fetch(`http://localhost:8080/authenticationResponder/logout.json`, {
      method: 'GET',
      headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
      }
    });
  }catch(e){
    console.log(e)
  }
}



/*
get "/authenticationResponder/verify(.$format)"(controller:'authenticationResponder', action: 'verify')
get "/authenticationResponder/logout(.$format)"(controller:'authenticationResponder', action: 'logout')
*/