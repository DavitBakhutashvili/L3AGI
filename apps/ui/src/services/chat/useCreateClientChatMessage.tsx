import { useMutation } from '@apollo/client'

import { Nullable } from 'types'
import CREATEClient_CLIENT_CHAT_MESSAGE_GQL from '../../gql/chat/createClientChatMessage.gql'

interface CreateClientChatMessageInput {
  chat_id: string
  prompt: string
}

export const useCreateClientChatMessageService = () => {
  const [mutation] = useMutation(CREATEClient_CLIENT_CHAT_MESSAGE_GQL)

  const createClientChatMessageService = async (input: CreateClientChatMessageInput) => {
    const { chat_id, prompt } = input

    const {
      data: { createClientChatMessage },
    } = await mutation({
      variables: {
        input: {
          prompt,
          chat_id,
        },
      },
    })

    return createClientChatMessage
  }

  return [createClientChatMessageService]
}
