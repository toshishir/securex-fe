import React from 'react';
import './App.css';
import ChatBox from './ChatBox';
import InfoBox from './InfoBox';

class App extends React.Component {
  state = {
    chatData: [],
    infoData: [],
  };

  handleSend = async (message) => {
    // Add the user's message to the chat data
    this.setState((prevState) => ({
      chatData: [...prevState.chatData, { user: true, text: message }],
    }));

    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://avid-infinity-386618.el.r.appspot.com/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userPrompt: message }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Parse the response data
      const data = await response.json();

      // Add the response message to the chat data
      this.setState((prevState) => ({
        chatData: [...prevState.chatData, { user: false, text: data.response }],
        infoData: [data.response],
      }));
    } catch (error) {
      console.error('Error:', error);
    }

    // // Simulate an API response after a delay
    // setTimeout(() => {
    //   const simulatedApiResponse = {
    //     chatResponse: 'This is the chat response',
    //     infoResponse: 'This is the info response',
    //   };

    //   // Add the response messages to the chat data and info data
    //   this.setState((prevState) => ({
    //     chatData: [...prevState.chatData, { user: false, text: simulatedApiResponse.chatResponse }],
    //     infoData: [ simulatedApiResponse.infoResponse],
    //   }));
    // }, 1000);
  };

  render() {
    const { chatData, infoData } = this.state;

    return (
      <div className="App">
        <div className="chat-section">
          <ChatBox chatData={chatData} onSend={this.handleSend} />
        </div>
        <div className="info-section">
          <InfoBox infoData={infoData} />
        </div>
      </div>
    );
  }
}

export default App;
