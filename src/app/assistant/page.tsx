'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  BotMessageSquare,
  Mic,
  Send,
  Sparkles,
  Volume2,
  HelpCircle,
  BookOpen,
  Languages,
  RotateCcw,
  User,
  Loader2,
} from 'lucide-react';
import { AssistantMessage } from '@/types';
import { processAssistantQuery } from '@/lib/assistant-engine';
import { AudioPlayer } from '@/components/ui/AudioPlayer';
import { getUserPreferences } from '@/lib/storage';

export default function AssistantPage() {
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Namaste! I am your **AwaazPath Multilingual Voice Coach**. I am here to help you conquer interview anxiety, master corporate vocabulary in Hindi, and turn rough Hinglish thoughts into fluent professional English.',
      hindiText:
        'नमस्ते! साक्षात्कार की तैयारी के लिए आप मुझसे हिंदी, अंग्रेजी या हिंग्लिश में कोई भी सवाल पूछ सकते हैं।',
      timestamp: Date.now(),
      category: 'general',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [creditSaver, setCreditSaver] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefs = getUserPreferences();
    setCreditSaver(prefs.creditSaverMode);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query) return;

    const userMsg: AssistantMessage = {
      id: 'user_' + Date.now(),
      role: 'user',
      content: query,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');

    // Process with Multilingual Engine
    setTimeout(() => {
      const response = processAssistantQuery(query);
      const assistantMsg: AssistantMessage = {
        id: 'asst_' + Date.now(),
        role: 'assistant',
        content: response.content,
        hindiText: response.hindiText,
        timestamp: Date.now(),
        category: response.category,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    }, 250);
  };

  const quickPrompts = [
    { label: 'Explain "bandwidth" in Hindi', query: 'Explain the word bandwidth in Hindi' },
    {
      label: 'Convert Hinglish to English',
      query: 'Convert this to English: Maine project me database optimize kiya aur response time badha diya',
    },
    { label: 'STAR Framework Guide', query: 'How to structure answers using the STAR method?' },
    { label: '"Tell Me About Yourself" Formula', query: 'How should a fresher answer Tell me about yourself?' },
    { label: 'Explain "idempotent"', query: 'What does idempotent mean in simple Hindi and English?' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-surface-50 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-accent-violet flex items-center justify-center text-white shadow-lg shadow-brand-500/25">
            <BotMessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight">
                Multilingual Voice & Career Assistant
              </h1>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-300 border border-brand-500/20">
                Bilingual AI
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Hindi • Hinglish • Indian English placement coach with Gnani speech
            </p>
          </div>
        </div>

        <button
          onClick={() =>
            setMessages([
              {
                id: 'welcome',
                role: 'assistant',
                content:
                  'Chat cleared. What interview challenge would you like to practice now?',
                hindiText: 'आप साक्षात्कार की तैयारी से संबंधित कोई भी प्रश्न पूछ सकते हैं।',
                timestamp: Date.now(),
                category: 'general',
              },
            ])
          }
          className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
          title="Clear chat history"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset Chat</span>
        </button>
      </div>

      {/* Quick Prompt Chips */}
      <div className="py-3 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
        <span className="text-[11px] font-semibold text-gray-400 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-brand-400" />
          Quick Practice:
        </span>
        {quickPrompts.map((p, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(p.query)}
            className="text-xs px-3 py-1.5 rounded-full bg-surface-100 hover:bg-surface-50 border border-surface-50 text-gray-300 hover:text-white shrink-0 transition-colors"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 py-3">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-accent-cyan flex items-center justify-center text-white shrink-0 mt-1 shadow">
                  <BotMessageSquare className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-4 space-y-3 ${
                  isUser
                    ? 'bg-brand-600 text-white rounded-tr-none'
                    : 'bg-surface-100 border border-surface-50 text-gray-100 rounded-tl-none shadow-xl'
                }`}
              >
                {/* Content */}
                <div className="text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {msg.content}
                </div>

                {/* Bilingual Hindi text block if present */}
                {!isUser && msg.hindiText && (
                  <div className="p-3 rounded-xl bg-surface-200/70 border border-brand-500/20 text-xs text-brand-200 font-hindi leading-relaxed">
                    {msg.hindiText}
                  </div>
                )}

                {/* On-demand audio player for assistant answers */}
                {!isUser && (
                  <div className="pt-1">
                    <AudioPlayer
                      textToSpeak={msg.content.replace(/[*#]/g, '')}
                      language="en-IN"
                      voice="Shivani"
                      label="Listen to Audio Answer"
                      creditSaverMode={creditSaver}
                    />
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-xl bg-surface-200 border border-surface-50 flex items-center justify-center text-gray-300 shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <div className="pt-3 border-t border-surface-50 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 p-2 rounded-2xl bg-surface-100 border border-surface-50 focus-within:border-brand-500/50 shadow-xl"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Type your question in Hindi, Hinglish, or English..."
            className="flex-1 bg-transparent px-3 py-2 text-sm text-gray-100 focus:outline-none placeholder-gray-400 font-sans"
          />

          <button
            type="button"
            onClick={() => {
              setInputQuery('Maine final year project me React use kiya tha');
            }}
            title="Try typing Hinglish"
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-surface-200 transition-colors hidden sm:block text-xs"
          >
            Hinglish Example
          </button>

          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand-600 hover:bg-brand-500 text-white disabled:opacity-40 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[11px] text-gray-400 text-center mt-2">
          💡 Try asking: &ldquo;Explain tradeoff in Hindi&rdquo; or &ldquo;Convert: Maine team ko lead kiya tha&rdquo;
        </p>
      </div>
    </div>
  );
}

