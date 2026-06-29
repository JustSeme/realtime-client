'use client'

import { useState, useRef } from "react"

export default function LongPulling() {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const [connected, setConnected] = useState(false)
    const [username, setUsername] = useState('')
    const [roomId, setRoomId] = useState('')
    const socket = useRef()

    const sendMessage = async () => {
        const message = {
            event: 'message',
            username,
            message: value,
            id: Date.now(),
        }
        await socket.current.send(JSON.stringify(message))
        setValue('')
    }

    function connect() {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                username,
                roomId,
                id: Date.now(),
            }
            socket.current.send(JSON.stringify(message))
        }

        socket.current.onmessage = (event) => {
            console.log(event.data);
            const message = JSON.parse(event.data)
            setMessages((prev) =>[message, ...prev])
        }

        socket.current.onclose = () => {
            console.log('Websocket connection is closed');
        }

        socket.current.onerror = () => {
            console.log('An websocket error occurred');
        }
    }

    if(!connected) {
        return (
            <div className="center">
                <div className="form">
                    <input
                        className="border border-white rounded p-1 mr-2"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your name"
                    />
                    <input
                        className="border border-white rounded p-1 mr-2"
                        type="text"
                        value={roomId}
                        onChange={(e) => setRoomId(e.target.value)}
                        placeholder="Enter room ID"
                    />
                    <button className="dark-button" onClick={connect}>Enter room</button>
                </div>
            </div>
        )
    }

    return (
        <div className="center">
            <div>
                <h1 className="text-xl">
                    Welcome to room {roomId}, what use Websocket technology
                </h1>
                <div className="form">
                    <input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        type="text"
                        className="border border-white mr-4 mt-4"
                    />
                    <button className="dark-button" onClick={sendMessage}>Send</button>
                </div>
                <div className="messages">
                    <h1 className="text-xl mt-2">
                        Messages:
                    </h1>
                    {messages.map(mess => 
                    <div key={mess.id}>
                        {
                            mess.event === 'connection'
                            ? <div className="message rounded mt-4 p-1">User {mess.username} is connected</div>
                            : <div className="message rounded border border-white mt-4 p-1">{mess.username}: {mess.message}</div>
                        }
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}