import react, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PropTypes from 'prop-types';

const API_ENDPOINT = `https://student-json-api.lidemy.me/comments?_sort=createdAt&_order=desc`

const Page = styled.div`
  width: 400px;
  margin: 0 auto;
`

const Title = styled.h1`
  color: #333;
`

const MessageForm = styled.form`
  margin-top: 16px;
`

const MessageTextArea = styled.textarea`
    display: block;
    width: 100%;
`

const SubmitButton = styled.button`
  margin-top:  8px;
  display: block;
`

const MessageList = styled.div`
  margin-top:  16px;
`

const MessageContainer = styled.div`
    padding: 8px 16px;
    border-radius: 7px;
    border: 1px solid black;

    & + & {
        margin-top: 10px;
    }
`

const MessageHead = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 4px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
`

const MessageAuthor = styled.div`
    color: rgba(0, 0, 0, 0.7);
    font-size: 14px;
`

const MessageTime = styled.div``
const MessageBody = styled.div`
    text-align: center;
    width: 100%;
    font-size: 16px;
    margin-top: 16px;
    white-space: pre-line;
    word-break: break-word;
`

const ErrorMessage = styled.div`
  meargin-top: 16px;
  color: red;
`
const Loading = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`

function Message({author, time, children}) {

    return(
        <MessageContainer>
            <MessageHead>
                <MessageAuthor> {author} </MessageAuthor>
                <MessageTime>{time}</MessageTime>
            </MessageHead>
            <MessageBody>{children}</MessageBody>
        </MessageContainer>
    )
}

Message.propTypes = {
    author: PropTypes.string,
    time: PropTypes.string,
    children: PropTypes.node,
}

function MessageBoard() {
  const [message, setMessage] = useState(null)
  const [MessageApiError, setMessageApiError] = useState(null)
  const [value, setValue] = useState();
  const [postMessageError, setPostMessageError] = useState()
  const [isLoadingPostMessage, setIsLoadingPostMessage] = useState(false);
  
  const fetchMessage = () => {

    fetch(API_ENDPOINT)
        .then(res => res.json())
        .then(data => {
          
          setMessage(data)
          setMessageApiError(null)
        })
        .catch( err => {
            setMessageApiError(err.message)
            console.log('err')
        })
    }

  const handleTextareaChange = e => {
    setValue(e.target.value)
  }
 
  const handleTextareaFocus = e => {
      setPostMessageError(null)
  }

  const handleFormSubmit = e => {
        e.preventDefault();
        if(isLoadingPostMessage) {
            return
        }
        setIsLoadingPostMessage(true)
        fetch('https://student-json-api.lidemy.me/comments', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            nickname: 'rock',
            body: value
        })
        })
        .then(res => res.json())
        .then(data => {
            setIsLoadingPostMessage(false)
            if(data.ok === 0) {
                setPostMessageError(data.message)
                return
            }
            fetchMessage()
            setValue("")
        }).catch(err => {
            setIsLoadingPostMessage(false)
            setPostMessageError(err.message)
        })
  }

  useEffect(() => {
      fetchMessage()
  }, [])

  return(
    <Page>
      {isLoadingPostMessage && <Loading> Loading...... </Loading>}
      <Title>留言板</Title>
      <MessageForm onSubmit={handleFormSubmit}>
          <MessageTextArea value={value} onFocus={handleTextareaFocus} onChange={handleTextareaChange} rows={10}/>
          <SubmitButton>送出留言</SubmitButton >
          {postMessageError && (<ErrorMessage>{postMessageError}</ErrorMessage>)}
      </MessageForm>
      {MessageApiError && (
          <ErrorMessage>
              Something went wrong! {MessageApiError.toString()}
          </ErrorMessage>
      )}
      {message && message.length === 0 && (<div> NoMessage </div>)}
      <MessageList>
          {message && message.map((message) => (
              <Message 
                key={message.id} 
                author={message.nickname} 
                time={new Date(message.createdAt).toLocaleString()}>
                {message.body}
              </Message>
          ))}
      </MessageList>
    </Page>
  )
}


export default MessageBoard;