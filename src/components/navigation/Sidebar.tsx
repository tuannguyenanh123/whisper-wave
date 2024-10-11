import { UserButton } from '@clerk/clerk-react'
import React from 'react'
import styles from './sidebar.module.css'
import { Button, Center, Stack, useMantineColorScheme } from '@mantine/core'
import { IconArrowsJoin, IconMoon, IconPlus, IconSun } from '@tabler/icons-react';
import useModal from '../../hooks/useModal';

const Sidebar = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const createServerModal = useModal("CreateServer");
    return (
        <nav className={styles.navbar}>
            <Stack>
                <Center>
                    <Button
                        className={styles.link}
                        variant="subtle"
                        radius={100}
                        onClick={createServerModal.openModal}
                    >
                        <IconPlus radius={100} />
                    </Button>
                </Center>
                <Center>
                    <Button
                        // onClick={serverJoinModal.openModal}
                        className={styles.link}
                        variant="subtle"
                        radius={100}
                    >
                        <IconArrowsJoin radius={100} />
                    </Button>
                </Center>
                <Stack justify="center" gap="md" mt="xl">
                    {/* {links} */}
                </Stack>
            </Stack>

            <Stack justify="center" align="center">
                <Button
                    className={styles.link}
                    variant="subtle"
                    onClick={toggleColorScheme}
                    radius={100}
                    p={0}
                >
                    {colorScheme === "dark" ? (
                        <IconMoon radius={100} />
                    ) : (
                        <IconSun radius={100} />
                    )}
                </Button>
                <UserButton />
            </Stack>
        </nav>
    )
}

export default Sidebar