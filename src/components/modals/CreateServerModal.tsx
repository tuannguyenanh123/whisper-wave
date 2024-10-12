import { Button, Flex, Image, Modal, rem, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import useModal from "../../hooks/useModal";
import { useState } from "react";
import { IconUpload, IconX } from "@tabler/icons-react";
import classes from './createServerModal.module.css'
import { useMutation } from "@apollo/client";
import { CREATE_SERVER } from "../../graphql/mutations/server/CreateServer";
import { useProfileStore } from "../../stores/profileStore";
import { CreateServerMutation, CreateServerMutationVariables } from "../../gql/graphql";

const CreateServerModal = () => {
  const [file, setFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const { closeModal, isOpen } = useModal("CreateServer");
  const profileId = useProfileStore((state) => state.profile?.id);
  const [createServer, { loading, error }] = useMutation<CreateServerMutation, CreateServerMutationVariables>(CREATE_SERVER)
  const { values, reset, validate, getInputProps, errors, onSubmit: onSubmitForm } = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => !value.trim() && "Please enter a name.",
    },
  })

  const onSubmit = () => {
    if (!validate()) return;
    createServer({
      variables: {
        createServerInput: {
          name: values.name,
          profileId: profileId as number
        },
        file
      },
      onCompleted: () => {
        setImagePreview(null);
        setFile(null);
        closeModal();
        reset();
      },
      refetchQueries: ['GetServers']
    })
  }

  const handleDropzoneChange: DropzoneProps["onDrop"] = (files) => {
    if (files.length === 0) {
      return setImagePreview(null)
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string)
    }
    setFile(files[0])
    reader.readAsDataURL(files[0])
  }
  return (
    <Modal title="Create a server" opened={isOpen} onClose={closeModal}>
      <Text c="dimmed" size="14px">
        Give your server a personality with a name and an image. You can always
        change it later.
      </Text>
      <form onSubmit={onSubmitForm(() => onSubmit())}>
        <Stack>
          <Flex justify="center" align="center" direction={"column"}>
            {!imagePreview && (
              <Dropzone
                onDrop={(files) => {
                  handleDropzoneChange(files)
                }}
                className={classes.dropZone}
                accept={IMAGE_MIME_TYPE}
                my="30px"
              >
                <Flex
                  gap="md"
                  justify="flex-center"
                  align="flex-center"
                  direction="column"
                >
                  <Dropzone.Accept>
                    <IconUpload size="3.2rem" stroke={1.5} />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX size="3.2rem" stroke={1.5} />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconUpload size="3.2rem" stroke={1.5} />
                  </Dropzone.Idle>
                  <Stack>
                    <Text size="xl" inline>
                      Drag images here or click to select files
                    </Text>
                    <Text size="sm" c="dimmed" inline>
                      Upload a server icon
                    </Text>
                    {error?.message && !file && (
                      <Text c="red">{error?.message}</Text>
                    )}
                  </Stack>
                </Flex>
              </Dropzone>
            )}

            {imagePreview && (
              <Flex pos="relative" w={rem(150)} h={rem(150)} mt="md">
                <>
                  <Button
                    onClick={() => {
                      setImagePreview(null)
                      setFile(null)
                    }}
                    color="red"
                    pos="absolute"
                    style={{
                      zIndex: 1,
                      borderRadius: "50%",
                      padding: 0,
                      width: rem(30),
                      height: rem(30),
                      top: 0,
                      right: 18,
                    }}
                  >
                    <IconX color="white" />
                  </Button>
                  <Image
                    src={imagePreview}
                    width={rem(150)}
                    height={rem(150)}
                    radius={"50%"}
                  />
                </>
              </Flex>
            )}
          </Flex>
          <TextInput
            label="Server name"
            placeholder="Enter server name"
            {...getInputProps("name")}
            error={errors.name}
          />
          <Button
            disabled={!!errors.name || loading}
            loading={loading}
            w={"100%"}
            type="submit"
            variant="gradient"
            mt="md"
          >
            Creater Server
          </Button>
        </Stack>
      </form>
    </Modal >
  );
};

export default CreateServerModal;
