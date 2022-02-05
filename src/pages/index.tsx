import axios from 'axios'
import { useState, useEffect } from 'react'

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID as string
const CLIENT_SECRET = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET as string
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`

const Home = (): JSX.Element => {
  const [accessToken, setAccessToken] = useState('')
  const params = new URLSearchParams()
  params.append('grant_type', 'client_credentials')

  const getAccessToken = () => {
    axios
      .post(TOKEN_ENDPOINT, params, {
        headers: {
          Authorization: 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
        },
      })
      .then((res) => {
        console.log(res)
        setAccessToken(res.data.access_token)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    getAccessToken()
    console.log(accessToken)
  }, [])

  return <div>Hello Next.js!</div>
}

export default Home
