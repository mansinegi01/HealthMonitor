

import React, { useState, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import axios from 'axios';
import { Send, Mic, Video, Sparkles, MessageSquare } from 'lucide-react'; 

const AVATAR_URL = "https://api.dicebear.com/7.x/bottts/svg?seed=Serenity&backgroundColor=b6e3f4";
const videoIdle = "https://cdn.pixabay.com/video/2023/10/22/186115-877653245_tiny.mp4"; 
const videoSpeaking = "https://cdn.pixabay.com/video/2023/10/22/186115-877653245_tiny.mp4"
const Chatbot = () => {
  
  const [activeTab, setActiveTab] = useState('text'); 
  const [messages, setMessages] = useState([
    { 
      sender: 'ai', 
      text: "Hello, I'm Serenity. I'm here to listen and support you. How are you feeling today? 💙" 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const [avatarState, setAvatarState] = useState('idle');
  const videoRef = useRef(null);

  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  const sendMessage = async (textOverride) => {
    const userText = textOverride || input;
    if (!userText.trim()) return;

    // 1. Add User Message
    const newMsg = { sender: 'user', text: userText };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const { data } = await axios.post('http://localhost:5000/api/chat/ai-response', {
        message: userText,
        mode: activeTab === 'voice' ? 'video' : 'text'
      });

      let aiText = data.reply;

      if (activeTab === 'voice') {
        const cleanText = aiText.replace(/\[.*?\]/g, '').trim(); // Remove emotion tags
        speakResponse(cleanText);
        aiText = cleanText;
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: aiText }]);

    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { sender: 'ai', text: "I'm having trouble connecting right now. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const speakResponse = (text) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1;
    utterance.rate = 1;
    utterance.onstart = () => {
      setAvatarState('speaking');
      if (videoRef.current) videoRef.current.play();
    };
    utterance.onend = () => {
      setAvatarState('idle');
    };
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (activeTab === 'voice' && transcript) {
      setInput(transcript);
    }
  }, [transcript, activeTab]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 font-sans text-gray-800">
      
      {/* --- HEADER SECTION --- */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4 shadow-sm">
          <Sparkles size={16} />
          <span>AI-Powered Support</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight">
          Your Safe Space to <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600 font-serif italic">Share & Heal</span>
        </h1>
        
        <p className="text-gray-500 text-lg leading-relaxed max-w-xl mx-auto">
          Talk to Serenity, your compassionate AI companion. Share your feelings, get support, and discover coping strategies in a judgment-free environment.
        </p>
      </div>

      {/* --- TOGGLE SWITCH --- */}
      <div className="bg-white p-1.5 rounded-full shadow-sm border border-gray-100 mb-8 inline-flex">
        <button
          onClick={() => setActiveTab('text')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeTab === 'text' 
              ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-md' 
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <MessageSquare size={18} />
          Text Chat
        </button>
        <button
          onClick={() => setActiveTab('voice')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeTab === 'voice' 
              ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-md' 
              : 'text-gray-500 hover:bg-gray-50'
          }`}
        >
          <Video size={18} />
          Voice Chat
        </button>
      </div>

      {/* --- MAIN CHAT CONTAINER --- */}
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col h-[600px]">
        
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-4 bg-white">
          <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center relative">
            <img src={AVATAR_URL} alt="Bot" className="w-10 h-10 rounded-full" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">Serenity</h3>
            <p className="text-sm text-gray-400">Your supportive companion</p>
          </div>
        </div>

        {/* --- VIEW 1: TEXT CHAT MESSAGES --- */}
        {activeTab === 'text' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                
                {/* AI Avatar for AI messages */}
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-teal-100 flex-shrink-0 mr-3 flex items-center justify-center">
                     <img src={AVATAR_URL} alt="Bot" className="w-6 h-6" />
                  </div>
                )}

                <div 
                  className={`max-w-[70%] p-4 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-br from-teal-500 to-blue-600 text-white rounded-br-none' 
                      : 'bg-gray-50 text-gray-700 border border-gray-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="w-8 h-8 rounded-full bg-teal-100 flex-shrink-0 mr-3"></div>
                 <div className="bg-gray-50 p-4 rounded-2xl rounded-bl-none text-gray-400 text-sm animate-pulse">
                   Serenity is thinking...
                 </div>
              </div>
            )}
          </div>
        )}

        {/* --- VIEW 2: VIDEO/VOICE CHAT INTERFACE --- */}
        {activeTab === 'voice' && (
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 relative">
             {/* Video Avatar */}
             <div className="w-64 h-64 rounded-full border-4 border-white shadow-2xl overflow-hidden mb-6 relative z-10">
                <video 
                   ref={videoRef}
                   src={avatarState === 'speaking' ? videoSpeaking : videoIdle} 
                   autoPlay 
                   loop 
                   muted 
                   className="w-full h-full object-cover"
                 />
             </div>
             
             {/* Subtitles / Status */}
             <div className="text-center space-y-2 z-10">
               <p className="text-gray-500 font-medium">
                 {listening ? "Listening..." : (isLoading ? "Processing..." : "I'm listening, go ahead.")}
               </p>
               {transcript && <p className="text-teal-600 font-semibold max-w-md mx-auto px-4">"{transcript}"</p>}
             </div>
          </div>
        )}

        {/* --- INPUT AREA --- */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="relative flex items-end gap-2 border border-gray-200 rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-teal-100 transition-all bg-gray-50">
            
            {/* Mic Button (Visible in Text Mode too for dictation) */}
            <button 
               onClick={listening ? SpeechRecognition.stopListening : SpeechRecognition.startListening}
               className={`p-3 rounded-xl transition-colors ${listening ? 'bg-red-100 text-red-500 animate-pulse' : 'hover:bg-gray-200 text-gray-400'}`}
            >
               <Mic size={20} />
            </button>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={activeTab === 'voice' ? "Speak or type to respond..." : "Share what's on your mind..."}
              className="w-full bg-transparent border-none focus:ring-0 resize-none text-gray-700 placeholder-gray-400 py-3 max-h-32"
              rows={1}
            />
            
            <button 
              onClick={() => sendMessage()}
              disabled={isLoading || !input.trim()}
              className={`p-3 rounded-xl transition-all duration-200 ${
                input.trim() 
                  ? 'bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">
            Press Enter to send • Shift + Enter for new line
          </p>
        </div>

      </div>
    </div>
  );
};

export default Chatbot;