import * as React from 'react'

const { default: Button } = require('@/components/ui/button')
import getPageData from '@/lib/get-page-data'

function Login() {
  const handleClick = () => {
    const publicAddress = web3.eth.coinbase.toLowerCase()

    // Check if user with current publicAddress is already present on back end
    fetch(
      `${process.env.REACT_APP_BACKEND_URL}/users?publicAddress=${publicAddress}`
    )
      .then((response) => response.json())
      // If yes, retrieve it. If no, create it.
      .then((users) =>
        users.length ? users[0] : this.handleSignup(publicAddress)
      )
  }

  const handleSignup = (publicAddress) =>
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users`, {
      body: JSON.stringify({ publicAddress }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    }).then((response) => response.json())

  return (
    <React.Fragment>
      <div>
        This is the login screen.
        <Button onClick={handleClick}>Login With MetaMask</Button>
      </div>
    </React.Fragment>
  )
}

export async function getStaticProps({ locale }) {
  const pageData = await getPageData({ locale })

  return {
    props: {
      ...pageData
    }
  }
}

export default Login
