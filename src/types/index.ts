export interface Question {
  id: string;
  text: string;
  answer?: string;
  confidence?: number;
  references?: string[];
}

export interface Questionnaire {
  id: string;
  title: string;
  questions: Question[];
}

export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  references?: string[];
  confidence?: number;
}

export interface KnowledgeBaseEntry {
  id: string;
  question: string;
  answer: string;
  category: string;
  references: string[];
  confidence: number;
} 