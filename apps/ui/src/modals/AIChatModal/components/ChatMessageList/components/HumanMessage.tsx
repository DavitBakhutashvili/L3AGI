import styled, { css } from 'styled-components'

import Typography from 'share-ui/components/typography/Typography'

import UploadedFile from 'components/UploadedFile'

import HumanMessageText from './HumanMessageText'

import MessageActions from './MessageActions'
import { useHumanMessage } from './useHumanMessage'
import AvatarGenerator from 'components/AvatarGenerator/AvatarGenerator'
import { copyMessageText } from 'modals/AIChatModal/utils/copyMessageText'
import TypographyPrimary from 'components/Typography/Primary'
import TypographyTertiary from 'components/Typography/Tertiary'
import AiMessageMarkdown from './AiMessageMarkdown'

import AudioPlayer from 'components/AudioPlayer'

type HumanMessageProps = {
  avatarImg: string
  messageDate: string
  messageText: string
  userId: string
  userName: string
  runId: string
  onReplyClick?: () => void
  voice?: string
}

const HumanMessage = ({
  avatarImg,
  messageDate,
  messageText,
  userId,
  userName,
  runId,
  onReplyClick,
  voice,
}: HumanMessageProps) => {
  const { wordArray, handleFileClick, fileUrlMatch, fileName } = useHumanMessage({
    userId,
    messageText,
  })

  return (
    <>
      <StyledMessageWrapper>
        <StyledAvatarWrapper>
          <AvatarGenerator name={userName} size={50} avatar={avatarImg} />
        </StyledAvatarWrapper>

        <StyledMainContent>
          <StyledMessageTop>
            <StyledMessageInfo>
              <TypographyPrimary
                value={userName}
                type={Typography.types.LABEL}
                size={Typography.sizes.sm}
              />

              <TypographyTertiary
                value={messageDate}
                type={Typography.types.LABEL}
                size={Typography.sizes.xss}
              />
            </StyledMessageInfo>

            <StyledMessageActionsWrapper className='actions'>
              <MessageActions
                onReplyClick={onReplyClick}
                onCopyClick={() => copyMessageText(messageText)}
              />
            </StyledMessageActionsWrapper>
          </StyledMessageTop>
          <StyledMessageText>
            {fileUrlMatch && <UploadedFile name={fileName} onClick={handleFileClick} />}

            {/* <HumanMessageText textArray={wordArray} /> */}
            <AiMessageMarkdown children={messageText} />
            {voice && <AudioPlayer audioUrl={voice} />}
          </StyledMessageText>
        </StyledMainContent>
      </StyledMessageWrapper>
    </>
  )
}

export default HumanMessage

export const StyledMessageWrapper = styled.div<{ secondary?: boolean }>`
  display: flex;
  /* flex-direction: column; */
  /* align-items: center; */
  /* flex-direction: row-reverse; */
  align-items: flex-start;
  /* margin-top: 38px;
  margin-right: 50px; */
  gap: 12px;
  padding-right: 10px;
  min-width: 400px;
  width: calc(100% - 100px);
  max-width: 800px;

  :hover {
    .actions {
      opacity: 1;
    }
  }

  ${props =>
    props.secondary &&
    css`
      flex-direction: row-reverse;
    `};

  @media only screen and (max-width: 1750px) {
    max-width: 600px;
  }
`

export const StyledMessageText = styled.div<{ secondary?: boolean }>`
  color: ${({ theme }) => theme.body.textColorPrimary};
  display: flex;
  padding: 16px 16px 18px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  overflow-x: auto;

  width: 100%;

  border-radius: 4px 18px 18px 18px;
  background: ${({ theme }) => theme.body.humanMessageBgColor};
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
  font-family: 'Circular', 'Roboto';
  font-weight: 500;

  font-style: normal;
  font-size: 14px;

  ${props =>
    props.secondary &&
    css`
      /* border-radius: 18px 4px 18px 18px; */
      background: var(--basic-foreground-black-1, rgba(0, 0, 0, 0.1));
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
    `};
`

export const StyledMessageTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const StyledMainContent = styled.div<{ secondary?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 5px;

  width: calc(100% - 60px);
  height: 100%;

  ${props =>
    props.secondary &&
    css`
      align-items: flex-end;
    `};
`
export const StyledAvatarWrapper = styled.div`
  margin-top: 5px;
`

export const StyledMessageInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
export const StyledMessageActionsWrapper = styled.div`
  opacity: 0;
`
