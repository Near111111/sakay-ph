"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const FloatingChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "model",
      content:
        "Hi! I'm Sakay PH's AI assistant. Ask me anything about our ride-hailing services, booking, payments, or how to get around Metro Manila!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const GEMINI_API_KEY = "AIzaSyAe_AY3_JeqqcVrZlk_lFVIvcsNsyr_PVU";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");

    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      let conversationContext = `You are Sakay PH's AI assistant. Sakay PH is a ride-hailing company operating in Metro Manila, Philippines.

About Sakay PH:
- Modern ride-hailing platform serving Metro Manila
- Offers affordable and convenient transportation solutions
- Multiple vehicle types available (sedan, SUV, motorcycle taxi)
- Easy booking through mobile app
- Cashless and cash payment options
- 24/7 customer support
- Safe and verified drivers
- Real-time tracking
- Competitive pricing with transparent fare calculation

Key Features:
- Quick ride matching algorithm
- Multiple stops support
- Schedule rides in advance
- Fare estimates before booking
- In-app chat with driver
- Driver ratings and reviews
- Safety features (emergency button, trip sharing)
- Promo codes and discounts

=== HOW TO BECOME A SAKAY DRIVER ===
When users ask "How to become a driver?", "Paano mag-apply as driver?", "How to sign up as driver?", "Gusto ko maging driver", or any related questions about becoming a Sakay driver, ALWAYS provide these exact steps:

📱 **Step 1: Download the Sakay Driver App**
Download the app here: https://play.google.com/store/apps/details?id=com.algovision.sakay_driver&pcampaignid=web_share

📝 **Step 2: Sign Up and Upload Required Documents**
Register sa app at i-upload ang mga sumusunod na documents:
   • OR/CR (Official Receipt / Certificate of Registration ng vehicle)
   • Professional Driver's License
   • NBI Clearance

🏢 **Step 3: Visit Main Office or Wait for Spot Activation**
Pagkatapos mag-sign up, may dalawang options:
   • Pumunta sa main office para ma-verify at makakuha ng schedule para sa Skill Test
   • Mag-abang ng spot activation sa inyong lugar

✅ **Step 4: Account Activation After Skill Test**
Ia-activate ng Sakay Staff ang inyong account pagkatapos ng SKILL TEST.

Pagkatapos ma-activate, pwede ka nang tumanggap ng bookings at kumita sa Sakay PH! 🎉

=== END OF DRIVER APPLICATION INFO ===

IMPORTANT - Customer Support Contact Information:
When you cannot answer a question, when the user needs human assistance, or when they explicitly ask for customer support, provide these contact details:

📞 Contact Number: 0927 557 8669
📍 Address: 1 E. Gutierrez Panghulo, City of Malabon, Third District, National Capital Region, Malabon, Philippines, 1470
📧 Email: inquiry@sakay-ph.com
💬 Messenger: Sakay-Ph

Use cases to provide contact info:
- Technical issues that need human intervention
- Billing or payment disputes
- Account-specific problems
- Complaints or serious concerns
- When user explicitly asks "How can I contact support?" or "I need to talk to someone"
- When you're unsure about specific policies or situations
- Emergency situations

Format the contact information clearly and encourage them to reach out for personalized assistance.

Be helpful, friendly, and informative. Keep responses concise and conversational. Use Filipino-English mix (Taglish) naturally when appropriate.

Conversation so far:\n`;

      newMessages.forEach((msg, idx) => {
        if (idx === 0) return;
        if (msg.role === "user") {
          conversationContext += `User: ${msg.content}\n`;
        } else if (msg.role === "model") {
          conversationContext += `Assistant: ${msg.content}\n`;
        }
      });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: conversationContext,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE",
              },
            ],
          }),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API Error:", errorData);
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const assistantMessage = data.candidates[0].content.parts[0].text;
        setMessages([
          ...newMessages,
          { role: "model", content: assistantMessage },
        ]);
      } else if (data.error) {
        throw new Error(
          data.error.message || "Invalid response from Gemini API",
        );
      } else {
        throw new Error("Invalid response from Gemini API");
      }
    } catch (error) {
      let errorMessage = "Sorry, may problema sa connection. Please try again.";

      if (error.message.includes("API Error: 400")) {
        errorMessage = "Invalid API request. Please check your API key.";
      } else if (error.message.includes("API Error: 403")) {
        errorMessage = "API key is invalid or doesn't have permission.";
      } else if (error.message.includes("API Error: 404")) {
        errorMessage = "API endpoint not found. Please check the model name.";
      } else if (error.message.includes("API Error: 429")) {
        errorMessage = "Too many requests. Please wait a moment and try again.";
      }

      setMessages([
        ...newMessages,
        {
          role: "model",
          content: errorMessage,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="floating-chat-container">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="chat-button"
            onClick={() => setIsOpen(true)}
            className="chat-button chat-button-with-text"
            aria-label="Open chat"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <motion.div
              className="chat-button-content"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="chat-button-icon"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </motion.svg>
              <span className="chat-button-text">Chat with Sakay</span>
            </motion.div>

            {/* Shine effect */}
            <motion.span
              className="chat-button-shine"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "linear",
                repeatDelay: 3,
              }}
            />
          </motion.button>
        ) : (
          <motion.div
            key="chat-window"
            className="chat-window"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <motion.div
              className="chat-header"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <div className="chat-header-content">
                <motion.div
                  className="chat-avatar"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Image
                    src="/sakay_logo.jpg"
                    alt="Sakay PH"
                    width={48}
                    height={48}
                    style={{ objectFit: "cover" }}
                  />
                </motion.div>
                <div className="chat-header-text">
                  <h3>Sakay PH Assistant</h3>
                  <p>Powered by Gemini AI</p>
                </div>
              </div>
              <motion.button
                className="close-button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400 }}
              />
            </motion.div>

            <div className="chat-messages">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    className={`message ${message.role}`}
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                      delay: index * 0.05,
                    }}
                  >
                    <motion.div
                      className="message-avatar"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {message.role === "model" ? (
                        <Image
                          src="/sakay_logo.jpg"
                          alt="Sakay PH"
                          width={36}
                          height={36}
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        "👤"
                      )}
                    </motion.div>
                    <motion.div
                      className="message-content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {message.content}
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <motion.div
                  className="message model"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="message-avatar">
                    <Image
                      src="/sakay_logo.jpg"
                      alt="Sakay PH"
                      width={36}
                      height={36}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="typing-indicator">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="typing-dot"
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 0.6,
                          delay: i * 0.1,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <motion.div
              className="chat-input-container"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="chat-input-wrapper">
                <motion.textarea
                  className="chat-input"
                  placeholder="Ask anything about Sakay PH..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  rows="1"
                  disabled={isLoading}
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <motion.button
                  className="send-button"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Send message"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <motion.svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={!inputValue.trim() ? {} : { x: [0, 3, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </motion.svg>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingChatBox;
