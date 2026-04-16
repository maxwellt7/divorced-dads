import { useState, useRef, useEffect } from 'react';
import { Lock, Send, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useCurriculumStore } from '../../store/curriculumStore';

export default function TaskChat({ weekNumber, phase, systemPrompt, taskGuidance, isUnlocked }) {
  const { chatMessages, sendMessage, isSendingMessage } = useCurriculumStore();
  const [inputValue, setInputValue] = useState('');
  const bottomRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isSendingMessage]);

  const handleSend = async () => {
    const content = inputValue.trim();
    if (!content || isSendingMessage) return;
    setInputValue('');
    await sendMessage(content);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isUnlocked) {
    return (
      <div className="rounded-xl border border-gray-200 bg-gray-50 p-8 flex flex-col items-center justify-center text-center space-y-3">
        <Lock className="w-8 h-8 text-gray-400" />
        <p className="text-gray-500 font-medium">Watch the video first to unlock the discussion</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white overflow-hidden" style={{ minHeight: '360px', maxHeight: '520px' }}>
      {/* Chat header */}
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
        <p className="text-sm font-semibold text-gray-700">Reflection Chat</p>
        {taskGuidance && (
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{taskGuidance}</p>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chatMessages.length === 0 && (
          <p className="text-sm text-gray-400 text-center pt-4">
            Start the conversation — share your thoughts or ask a question.
          </p>
        )}

        {chatMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-violet-600 text-white rounded-br-sm'
                  : 'bg-gray-100 text-gray-800 rounded-bl-sm'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {isSendingMessage && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-500 px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Thinking…
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 p-3 flex gap-2 bg-white">
        <Input
          className="flex-1"
          placeholder="Type your reflection…"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSendingMessage}
        />
        <Button
          size="sm"
          onClick={handleSend}
          disabled={!inputValue.trim() || isSendingMessage}
          className="shrink-0"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
