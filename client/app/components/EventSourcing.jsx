'use client'

import { useEffect, useState } from "react"
import axios from "axios"

export default function LongPulling() {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    const subscribe = async () => {
        const eventSource = new EventSource('http://localhost:5000/connect')
        eventSource.onmessage = function (event) {
            const message = JSON.parse(event.data)
            setMessages([...messages, message])
        }
    }

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            message: value,
            id: Date.now()
        })
    }

    useEffect(() => {
        subscribe()
    }, [])

    return (
        <div className="center">
            <div>
                <h1 className="text-xl">
                    Send message throw event sourcing technology
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
                    <div className="message rounded border border-white mt-4 p-1" key={mess.id}>
                        {mess.message}
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}