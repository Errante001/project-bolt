import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Code, Lightbulb } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  codeSnippet?: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hola, soy el asistente de mantenibilidad de código. ¿En qué puedo ayudarte hoy?, ¡Solo dime!',
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      let aiResponse: Message;
      
      // Simple pattern matching for demo purposes
      if (input.toLowerCase().includes('refactor') || input.toLowerCase().includes('mejorar')) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          text: 'He analizado el código y tengo algunas sugerencias para mejorar la mantenibilidad:',
          sender: 'ai',
          timestamp: new Date(),
          codeSnippet: `// Código original con alta complejidad ciclomática
public void procesarMatricula(Estudiante e) {
  if (e.edad >= 18) {
    if (e.promedio >= 4) {
      if (e.creditos >= 30) {
        // Lógica de matrícula
      }
    }
  }
}

// Sugerencia: Extraer validaciones
public void procesarMatricula(Estudiante e) {
  if (!cumpleRequisitosMatricula(e)) return;
  // Lógica de matrícula
}

private boolean cumpleRequisitosMatricula(Estudiante e) {
  return e.edad >= 18 && e.promedio >= 4 && e.creditos >= 30;
}`
        };
      } else if (input.toLowerCase().includes('sonarqube') || input.toLowerCase().includes('métricas')) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          text: 'Las métricas actuales del proyecto son preocupantes. El valor de LCOM es 7.8, muy por encima del umbral recomendado de 5. Esto indica una baja cohesión en las clases, lo que dificulta el mantenimiento. Te recomiendo revisar las clases más grandes y considerar aplicar el principio de responsabilidad única.',
          sender: 'ai',
          timestamp: new Date(),
        };
      } else {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          text: 'Puedo ayudarte a analizar la mantenibilidad del código, sugerir refactorizaciones y explicar métricas de SonarQube. ¿Qué aspecto específico te interesa mejorar?',
          sender: 'ai',
          timestamp: new Date(),
        };
      }
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Asistente de IA</h3>
        <p className="text-sm text-gray-500">Basado en CodeBERT con transfer learning</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === 'user' 
                  ? 'bg-primary-500 text-white rounded-tr-none' 
                  : 'bg-gray-100 text-gray-800 rounded-tl-none'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {message.sender === 'user' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
                <span className="text-xs opacity-75">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              
              <p className="text-sm">{message.text}</p>
              
              {message.codeSnippet && (
                <div className="mt-2 rounded bg-gray-800 p-2 text-xs text-white overflow-x-auto">
                  <pre><code>{message.codeSnippet}</code></pre>
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
            <Code className="h-5 w-5" />
          </button>
          <button className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100">
            <Lightbulb className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe un mensaje..."
            className="flex-1 py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className={`p-2 rounded-full ${
              input.trim() 
                ? 'bg-primary-500 text-white hover:bg-primary-600' 
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;