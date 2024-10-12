import { UserButton } from '@clerk/clerk-react'
import styles from './sidebar.module.css'
import { Button, Center, Image, rem, Stack, Tooltip, UnstyledButton, useMantineColorScheme } from '@mantine/core'
import { IconArrowsJoin, IconMoon, IconPlus, IconSun } from '@tabler/icons-react';
import useModal from '../../hooks/useModal';
import { useServer } from '../../hooks/graphql/server/useServers';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavbarLinkProps {
    label: string
    active?: boolean
    imageUrl: string
    onClick?: () => void
}

function NavbarLink({ imageUrl, label, active, onClick }: NavbarLinkProps) {
    return (
        <Tooltip label={label} position="right">
            <UnstyledButton
                onClick={onClick}
                data-active={active || undefined}
                style={{ borderRadius: rem(100) }}
            >
                <Image src={imageUrl} w={rem(50)} h={rem(50)} radius={100} />
            </UnstyledButton>
        </Tooltip>
    )
}

const Sidebar = () => {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const [active, setActive] = useState(0);
    const createServerModal = useModal("CreateServer");
    const { servers } = useServer();
    const navigate = useNavigate();

    const links = servers?.map((server, index) => (
        <NavbarLink
            label={server?.name || ''}
            imageUrl={server.imageUrl}
            key={server.id}
            active={active === index}
            onClick={() => {
                setActive(index)
                navigate(`/servers/${server.id}`)
            }}
        />
    ))

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
                    {links}
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