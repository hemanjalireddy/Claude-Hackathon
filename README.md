# Pitch Coach AI

An AI-powered pitch analysis app that helps you refine your pitch by providing professional feedback from either a Venture Investor or Pitch Advisor persona.

## Features

- **Video Upload or Recording**: Upload pre-recorded pitches or record directly in the browser
- **Dual Persona Coaching**: Choose between Investor or Advisor feedback perspectives
- **AI-Powered Analysis**: Leverages Claude Sonnet 4.5 for comprehensive pitch evaluation
- **Local Transcription**: Uses Faster-Whisper for audio transcription (no OpenAI API needed)
- **Detailed Feedback**: Get structured feedback on content, delivery, and presentation
- **Modern UI**: Beautiful, responsive interface built with Next.js and Tailwind CSS

## Architecture

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: FastAPI (Python)
- **AI**: Anthropic Claude API (Sonnet 4.5 with vision)
- **Video Processing**: OpenCV + FFmpeg
- **Transcription**: Faster-Whisper (local)

## Prerequisites

- **Node.js** 18+ and npm/yarn
- **Python** 3.8+
- **FFmpeg** (for video processing)
- **Claude API Key** from [console.anthropic.com](https://console.anthropic.com)

## Installation

### 1. Install FFmpeg

**Windows:**
```bash
# Download from https://ffmpeg.org/download.html
# Or use chocolatey:
choco install ffmpeg
```

**macOS:**
```bash
brew install ffmpeg
```

**Linux:**
```bash
sudo apt-get install ffmpeg
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Edit .env and add your Claude API key
# ANTHROPIC_API_KEY=your_actual_api_key_here
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install
# or
yarn install
```

## Running the Application

### Start Backend (Terminal 1)

```bash
cd backend
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux

python main.py
```

Backend will run on `http://localhost:8000`

### Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
# or
yarn dev
```

Frontend will run on `http://localhost:3000`

## Usage

1. **Open** your browser to `http://localhost:3000`
2. **Choose Your Coach**: Select either "Venture Investor" or "Pitch Advisor" persona
3. **Upload or Record**:
   - Upload a pre-recorded video (MP4, MOV, WebM)
   - Or click "Record Pitch" to record directly
4. **Analyze**: Click "Analyze My Pitch" to get feedback
5. **Review Feedback**: Read detailed analysis including:
   - Overall impression
   - Strengths and areas for improvement
   - Content & message evaluation
   - Delivery & presentation feedback
   - Actionable recommendations
   - Numerical score with justification

## API Endpoints

### `POST /api/analyze-pitch`

Analyzes a pitch video with the selected persona.

**Request:**
- `video` (file): Video file
- `persona` (string): Either "investor" or "advisor"

**Response:**
```json
{
  "success": true,
  "transcript": "Full transcription of the pitch...",
  "analysis": {
    "raw_feedback": "Detailed feedback text...",
    "structured_feedback": {
      "overall_impression": "...",
      "strengths": "...",
      ...
    }
  },
  "persona": "investor"
}
```

## Project Structure

```
Claude-Hackathon/
├── backend/
│   ├── main.py                 # FastAPI app
│   ├── services/
│   │   ├── video_processor.py  # Video frame extraction & transcription
│   │   └── claude_analyzer.py  # Claude API integration
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── app/
│   │   ├── page.tsx           # Main page
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── VideoUploader.tsx  # Video upload/record component
│   │   ├── PersonaSelector.tsx # Persona selection UI
│   │   └── FeedbackDisplay.tsx # Feedback display UI
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## How It Works

1. **Video Input**: User uploads or records a video pitch
2. **Frame Extraction**: Backend extracts 10 key frames using OpenCV
3. **Audio Transcription**: Faster-Whisper transcribes the audio locally
4. **Claude Analysis**: Frames + transcript sent to Claude API with persona-specific prompts
5. **Feedback Display**: Structured feedback displayed in a beautiful UI

## Troubleshooting

### FFmpeg not found
- Ensure FFmpeg is installed and in your PATH
- Restart terminal after installation

### Camera/Microphone permissions
- Browser will ask for permissions when recording
- Check browser settings if recording fails

### Whisper model download
- First run will download the Whisper base model (~140MB)
- Subsequent runs will use cached model

### Claude API errors
- Verify your API key is correct in `.env`
- Check you have credits in your Anthropic account
- Ensure you're using the correct model name

## Future Enhancements

- Save pitch history and track improvement over time
- Support for multiple languages
- Screen recording for slide-heavy pitches
- PDF export of feedback reports
- Team collaboration features
- Custom persona creation

## License

See LICENSE file for details.

## Credits

Built with:
- [Claude API](https://www.anthropic.com/api) by Anthropic
- [Next.js](https://nextjs.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Faster-Whisper](https://github.com/guillaumekln/faster-whisper)