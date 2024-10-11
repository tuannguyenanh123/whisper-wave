import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/navigation/Sidebar'
import { useProfileStore } from '../stores/profileStore'
import { useAuth, useSession } from '@clerk/clerk-react'
import { useMutation } from '@apollo/client'
import { CREATE_PROFILE } from '../graphql/mutations/CreateProfile'
import { CreateProfileMutation, CreateProfileMutationVariables } from '../gql/graphql'

const RootLayout = () => {
    const profile = useProfileStore((state) => state.profile);
    const setProfile = useProfileStore((state) => state.setProfile);
    const { session } = useSession();
    const { isSignedIn } = useAuth();

    const [createProfile] = useMutation<CreateProfileMutation, CreateProfileMutationVariables>(CREATE_PROFILE, {});

    useEffect(() => {
        if (!isSignedIn) setProfile(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSignedIn]);

    useEffect(() => {
        const createProfilefn = async () => {
            if (!session?.user) return;
            try {
                await createProfile({
                    variables: {
                        input: {
                            email: session?.user?.emailAddresses[0]?.emailAddress,
                            imageUrl: session?.user?.imageUrl,
                            name: session?.user?.username || '',
                        }
                    },
                    onCompleted: (data) => setProfile(data.createProfile),
                    refetchQueries: ['GetServers']
                })
            } catch (error) {
                console.log(error);
            }
        }
        if (profile?.id) return;
        createProfilefn()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [session?.user, profile?.id]);
    return (
        <div><Sidebar /><Outlet /></div>
    )
}

export default RootLayout