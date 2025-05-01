# Unified QnA Assistant for Info Sec Teams

A comprehensive solution for handling security questionnaires and compliance queries in both batch and conversational modes.

## Features

- **Batch Mode**: Process entire questionnaires at once
- **Conversational Mode**: Ask specific security and compliance questions
- **Export Capabilities**: Download results in Word (.docx) and Excel (.xlsx) formats
- **Confidence Scoring**: Each answer comes with a confidence score
- **Reference Tracking**: Answers are linked to specific sections in knowledge base and policy documents

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

### Batch Mode

1. Click the "Upload Questionnaire" button
2. Select your questionnaire file (supports .xlsx, .xls, .csv formats)
3. The system will process the questions and provide answers with:
   - Confidence scores
   - References to knowledge base and policy documents
4. Export the results:
   - Click "Download as Word" to get a formatted .docx file
   - Click "Download as Excel" to get a structured .xlsx file

### Conversational Mode

1. Navigate to the Conversational Mode tab
2. Type your security or compliance question
3. The system will provide:
   - A concise answer
   - Confidence score
   - References to relevant documentation

## System Architecture

### Question Processing

1. **Input Normalization**: Questions are normalized to lowercase and stripped of special characters
2. **Keyword Matching**: System identifies relevant keywords in the question
3. **Answer Retrieval**: Best matching answer is selected based on keyword relevance
4. **Confidence Scoring**: Score is calculated based on match quality and reference availability
5. **Reference Linking**: Answers are linked to specific sections in knowledge base and policy documents

### Export Formats

- **Word (.docx)**:
  - Formatted document with questions and answers
  - Includes confidence scores and references
  - Professional layout with proper spacing and typography

- **Excel (.xlsx)**:
  - Structured table format
  - Columns for Question Number, Question, Answer, Confidence, and References
  - Auto-sized columns for better readability

## Sample Questions

### Security & Compliance
- "How is logging infrastructure secured?"
- "What are the access control procedures?"
- "How is data privacy maintained?"
- "What is the MFA policy?"

### Network & Infrastructure
- "What network security measures are in place?"
- "How are audit findings managed?"
- "What is the process for handling third-party changes?"

### Training & Awareness
- "How are employees trained on security?"
- "What is the process for security policy review?"

## Deployment

1. Build the production version:
   ```bash
   npm run build
   ```
2. Deploy the contents of the `dist` directory to your web server

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
