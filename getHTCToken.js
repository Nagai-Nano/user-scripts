(async function(){
  const uid = document.cookie.match(/c_user=([0-9]+)/)[1] || require("CurrentUserInitialData").USER_ID
  const fb_dtsg = document.getElementsByName("fb_dtsg")[0].value || require("DTSGInitialData").token

  const body = new FormData()
  body.append('fb_dtsg', fb_dtsg)
  body.append('app_id', '165907476854626')
  body.append('redirect_uri', 'fbconnect://success')
  body.append('display', 'page')
  body.append('access_token', '')
  body.append('from_post', 1)
  body.append('return_format', 'access_token')
  body.append('domain', '')
  body.append('sso_device', 'ios')
  body.append('__CONFIRM__', 1)
  body.append('__user', uid)

  try {
    const response = await fetch('https://www.facebook.com/v1.0/dialog/oauth/confirm', {
      method: 'POST',
      body
    })

    const script = await response.text()
    return script.match(/access_token=(.*)(?=&expires_in)/)[1]
  }
  catch(e) {
    console.log('Failed to get Access token make sure you authorized the HTC sense app')
  }
})().then(token => prompt('Your HTC Access Token is:', token))
