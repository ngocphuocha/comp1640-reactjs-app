import React from "react"
import {Link, Outlet} from "react-router-dom"
import {Button, Center, HStack} from '@chakra-ui/react'

const MyAccount = () => {

    return (<>
        <Center>
            <HStack spacing='24px' m={'5'}>
                {/*Profile link page*/}
                <Link to='profiles'>
                    <Button bg={'red.500'}>
                        Show Profile
                    </Button>
                </Link>

                {/*Change password page*/}
                <Link to='change-password'>
                    <Button bg='tomato'>
                        Change password
                    </Button>
                </Link>
            </HStack>
        </Center>

        <Outlet/>
    </>)
}
export default MyAccount