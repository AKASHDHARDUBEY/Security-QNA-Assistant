import axios from 'axios';
import { Question, Questionnaire, ChatMessage } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

export const processQuestionnaire = async (file: File): Promise<Questionnaire> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(`${API_BASE_URL}/process-questionnaire`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const sendChatMessage = async (message: string): Promise<ChatMessage> => {
  const response = await axios.post(`${API_BASE_URL}/chat`, {
    message,
  });

  return response.data;
};

export const searchKnowledgeBase = async (query: string): Promise<Question[]> => {
  const response = await axios.get(`${API_BASE_URL}/search`, {
    params: { query },
  });

  return response.data;
}; 