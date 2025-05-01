import { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  ButtonGroup,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import { Question, Questionnaire } from '../types';
import { securityQuestionnaire } from '../types/questionnaire';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, Table as DocxTable, TableRow as DocxTableRow, TableCell as DocxTableCell } from 'docx';
import * as XLSX from 'xlsx';

const BatchMode = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(null);

  const processQuestions = (questions: string[]): Question[] => {
    return questions.map((questionText, index) => {
      const normalizedQuestion = questionText.toLowerCase();
      let bestMatch = null;
      let maxMatches = 0;

      // Find the best matching answer
      for (const [key, entry] of Object.entries(securityQuestionnaire)) {
        const matches = normalizedQuestion.split(' ').filter(word => 
          entry.question.toLowerCase().includes(word)
        ).length;

        if (matches > maxMatches) {
          maxMatches = matches;
          bestMatch = entry;
        }
      }

      return {
        id: `q${index + 1}`,
        text: questionText,
        answer: bestMatch?.answer || "No specific answer found in knowledge base.",
        confidence: bestMatch?.confidence || 0,
        references: bestMatch?.references || [],
      };
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    try {
      // Simulate file reading and processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock questions from a questionnaire
      const mockQuestions = [
        "How is logging infrastructure secured?",
        "What are the access control procedures?",
        "How is data privacy maintained?",
        "What is the MFA policy?",
        "How are security policies reviewed?",
        "What is the process for data deletion?",
        "How are employees trained on security?",
        "What network security measures are in place?",
        "How are audit findings managed?",
        "What is the process for handling third-party changes?"
      ];

      const processedQuestions = processQuestions(mockQuestions);
      
      setQuestionnaire({
        id: '1',
        title: 'Sample Security Questionnaire',
        questions: processedQuestions,
      });
    } catch (error) {
      console.error('Error processing questionnaire:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "success";
    if (confidence >= 70) return "warning";
    return "error";
  };

  const exportToWord = async () => {
    if (!questionnaire) return;

    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: questionnaire.title,
                bold: true,
                size: 32,
              }),
            ],
          }),
          ...questionnaire.questions.flatMap((question, index) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `Question ${index + 1}: ${question.text}`,
                  bold: true,
                  size: 24,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Answer: ${question.answer}`,
                  size: 20,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Confidence: ${question.confidence}%`,
                  size: 20,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `References: ${(question.references || []).join(', ')}`,
                  size: 20,
                }),
              ],
            }),
            new Paragraph({
              children: [new TextRun({ text: '' })],
            }),
          ]),
        ],
      }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${questionnaire.title}.docx`);
  };

  const exportToExcel = () => {
    if (!questionnaire) return;

    const worksheet = XLSX.utils.json_to_sheet(
      questionnaire.questions.map((q, index) => ({
        'Question Number': index + 1,
        'Question': q.text,
        'Answer': q.answer,
        'Confidence': `${q.confidence}%`,
        'References': (q.references || []).join(', '),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Security Questionnaire');
    
    // Auto-size columns
    const wscols = [
      {wch: 10}, // Question Number
      {wch: 50}, // Question
      {wch: 50}, // Answer
      {wch: 15}, // Confidence
      {wch: 30}, // References
    ];
    worksheet['!cols'] = wscols;

    XLSX.writeFile(workbook, `${questionnaire.title}.xlsx`);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Batch Mode
      </Typography>
      <Typography variant="body1" paragraph>
        Upload a security questionnaire to get automated answers with confidence scores.
      </Typography>
      
      <Box sx={{ my: 3, display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          component="label"
          disabled={isProcessing}
        >
          Upload Questionnaire
          <input
            type="file"
            hidden
            accept=".xlsx,.xls,.csv"
            onChange={handleFileUpload}
          />
        </Button>

        {questionnaire && (
          <ButtonGroup variant="contained" color="secondary">
            <Button
              startIcon={<DownloadIcon />}
              onClick={exportToWord}
            >
              Download as Word
            </Button>
            <Button
              startIcon={<DownloadIcon />}
              onClick={exportToExcel}
            >
              Download as Excel
            </Button>
          </ButtonGroup>
        )}
      </Box>

      {isProcessing && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
          <CircularProgress />
        </Box>
      )}

      {questionnaire && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            {questionnaire.title}
          </Typography>
          
          {questionnaire.questions.map((question) => {
            const confidence = question.confidence || 0;
            return (
              <Accordion key={question.id} sx={{ mb: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ width: '100%', flexShrink: 0 }}>
                    {question.text}
                  </Typography>
                  {confidence > 0 && (
                    <Chip
                      label={`${confidence}% Confidence`}
                      color={getConfidenceColor(confidence)}
                      size="small"
                      sx={{ ml: 2 }}
                    />
                  )}
                </AccordionSummary>
                <AccordionDetails>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="subtitle1" color="primary">
                      Answer:
                    </Typography>
                    <Typography paragraph>
                      {question.answer}
                    </Typography>
                    
                    {question.references && question.references.length > 0 && (
                      <>
                        <Typography variant="subtitle1" color="primary">
                          References:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {question.references.map((ref, index) => (
                            <Chip
                              key={index}
                              label={ref}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </>
                    )}
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default BatchMode; 