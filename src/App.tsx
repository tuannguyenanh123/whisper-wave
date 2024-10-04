import { useState } from 'react'
import { Text } from '@mantine/core'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
      <Text c={"blue"}>nguyen anh tuan</Text>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  )
}

export default App
