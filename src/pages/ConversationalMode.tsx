import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Chip,
} from '@mui/material';
import { ChatMessage } from '../types';
import { securityQuestionnaire } from '../types/questionnaire';

const ConversationalMode = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const findBestAnswer = (question: string): { answer: string; confidence: number; references: string[] } | null => {
    const normalizedQuestion = question.toLowerCase();
    
    // Create a map of keywords to their corresponding entries
    const keywordMap: Record<string, string> = {
      'log': 'logging_infrastructure',
      'logging': 'logging_infrastructure',
      'log configuration': 'logging_configuration_control',
      'access': 'access_provisioning',
      'privilege': 'least_privilege',
      'privileged': 'privileged_access_segregation',
      'security': 'network_defense',
      'network': 'network_config_review',
      'data': 'data_collection_notice',
      'privacy': 'privacy_notice_content',
      'policy': 'privacy_policy_updates',
      'training': 'employee_training',
      'employee': 'employee_training',
      'audit': 'audit_findings_management',
      'risk': 'asset_change_risk',
      'cloud': 'cloud_migration_security',
      'mfa': 'mfa_enforcement',
      'multi factor': 'mfa_enforcement',
      'authentication': 'mfa_enforcement',
      'sod': 'sod_principle',
      'separation of duties': 'sod_principle',
      'deletion': 'data_deletion_process',
      'delete': 'data_deletion_process',
      'modify': 'data_modification',
      'change': 'data_modification',
      'consumer': 'consumer_rights_awareness',
      'rights': 'consumer_rights_awareness',
      'request': 'rights_exercise_methods',
      'submit': 'rights_exercise_methods',
      'review': 'access_reviews',
      'validate': 'access_verification',
      'verify': 'access_verification',
      'communication': 'inter_environment_communication',
      'protocol': 'service_protocol_justification',
      'port': 'service_protocol_justification',
      'service': 'service_protocol_justification',
      'migration': 'cloud_migration_security',
      'defense': 'network_defense',
      'attack': 'network_defense',
      'finding': 'audit_findings_management',
      'procedure': 'asset_change_risk',
      'process': 'asset_change_risk',
      'document': 'policy_review',
      'vendor': 'external_risk_management',
      'third party': 'external_risk_management',
    };

    // Find the best matching keyword
    let bestMatch = null;
    let bestMatchKey = '';
    let maxMatches = 0;

    for (const [keyword, entryKey] of Object.entries(keywordMap)) {
      if (normalizedQuestion.includes(keyword)) {
        const entry = securityQuestionnaire[entryKey];
        if (entry) {
          const matches = normalizedQuestion.split(' ').filter(word => 
            keyword.includes(word) || entry.question.toLowerCase().includes(word)
          ).length;

          if (matches > maxMatches) {
            maxMatches = matches;
            bestMatch = entry;
            bestMatchKey = entryKey;
          }
        }
      }
    }

    if (bestMatch) {
      return {
        answer: bestMatch.answer,
        confidence: bestMatch.confidence,
        references: bestMatch.references,
      };
    }

    return null;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = findBestAnswer(input);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response?.answer || "I'm sorry, I couldn't find a specific answer to your question. Please try rephrasing or ask about a different security topic.",
        isUser: false,
        timestamp: new Date(),
        references: response?.references || [],
        confidence: response?.confidence,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom>
        Conversational Mode
      </Typography>
      <Typography variant="body1" paragraph>
        Ask any security or compliance related questions and get instant answers.
      </Typography>

      <Paper
        elevation={3}
        sx={{
          flexGrow: 1,
          mb: 2,
          p: 2,
          overflow: 'auto',
          maxHeight: '60vh',
        }}
      >
        <List>
          {messages.map((message) => (
            <ListItem
              key={message.id}
              sx={{
                flexDirection: 'column',
                alignItems: message.isUser ? 'flex-end' : 'flex-start',
              }}
            >
              <Paper
                elevation={1}
                sx={{
                  p: 2,
                  mb: 1,
                  maxWidth: '80%',
                  backgroundColor: message.isUser ? '#e3f2fd' : '#f5f5f5',
                }}
              >
                <ListItemText
                  primary={message.text}
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      {message.references?.map((ref, index) => (
                        <Chip
                          key={index}
                          label={ref}
                          size="small"
                          sx={{ mr: 1, mb: 1 }}
                        />
                      ))}
                      {message.confidence && (
                        <Chip
                          label={`Confidence: ${message.confidence}%`}
                          size="small"
                          color="primary"
                          sx={{ ml: 1 }}
                        />
                      )}
                    </Box>
                  }
                />
              </Paper>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          disabled={isProcessing}
        />
        <Button
          variant="contained"
          onClick={handleSend}
          disabled={isProcessing || !input.trim()}
        >
          {isProcessing ? <CircularProgress size={24} /> : 'Send'}
        </Button>
      </Box>
    </Box>
  );
};

export default ConversationalMode; 