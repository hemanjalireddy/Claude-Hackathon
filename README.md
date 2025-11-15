# Pitch Coach AI

A comprehensive AI-powered platform for entrepreneurs to perfect their pitches and validate startup ideas. Get expert feedback from specialized AI coaches and evaluate your startup's originality, feasibility, and patent landscape.

## ✨ Features

### 🎬 **Pitch Practice**
- **Video Upload or Recording**: Upload pre-recorded pitches or record directly in the browser with live preview
- **5 Expert AI Personas**: Get specialized feedback from:
  - 💼 **Venture Investor** - Market fit, scalability, and ROI analysis
  - 💡 **Pitch Advisor** - Presentation skills, storytelling, and delivery
  - ⚕️ **Healthcare Expert** - Clinical validation, FDA compliance, and healthcare-specific insights
  - 🎓 **EdTech Specialist** - Learning outcomes, pedagogy, and educational impact
  - 💻 **Tech Startup Expert** - Technical validation, architecture, and AI/ML feasibility
- **AI-Powered Analysis**: Leverages Claude Sonnet 4.5 with vision for comprehensive pitch evaluation
- **Local Transcription**: Uses Faster-Whisper for audio transcription (no OpenAI API needed)
- **Detailed Feedback**: Structured analysis on content, delivery, and presentation with scoring

### 💡 **Idea Analyzer**
- **Originality & Technology Score**: Quantitative 0-100 evaluation of your startup idea
- **6-Factor Analysis**:
  - **Novelty/Originality** (30%) - Uniqueness and innovation assessment
  - **Technical Feasibility** (20%) - Technology viability evaluation
  - **Patent Freedom** (20%) - Patent landscape and IP risk analysis
  - **Market Overlap** (15%) - Competition and market differentiation
  - **Implementation Complexity** (10%) - MVP development difficulty
  - **Ethical/Regulatory** (5%) - Compliance and ethical considerations
- **U.S. Patent Search**: Automatic search and display of relevant patents
- **AI-Powered Insights**: Detailed explanations for each score

### 🎨 **Professional Dark Theme UI**
- Sleek glassmorphism design with backdrop blur effects
- Gradient accents and smooth animations
- Fully responsive across all devices
- Color-coded scoring system for instant insights

## 🏗️ Architecture

- **Frontend**: Next.js 14 + TypeScript + Tailwind CSS
- **Backend**: FastAPI (Python)
- **AI Models**:
  - Anthropic Claude Sonnet 4.5 (with vision for pitch analysis)
  - Claude Sonnet 4.5 (for idea evaluation and patent analysis)
- **Video Processing**: OpenCV + FFmpeg
- **Audio Transcription**: Faster-Whisper (local, offline)
- **Patent Search**: Google Patents integration

## 📋 Prerequisites

- **Node.js** 18+ and npm/yarn
- **Python** 3.8+
- **FFmpeg** (for video processing)
- **Anthropic API Key** from [console.anthropic.com](https://console.anthropic.com)

## 🚀 Installation

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

## ▶️ Running the Application

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

## 📱 Usage

### Landing Page
1. **Open** your browser to `http://localhost:3000`
2. **Choose a feature**:
   - **Practice Your Pitch** - Get expert feedback on your pitch video
   - **Analyze Your Idea** - Evaluate your startup idea's viability

### Pitch Practice Flow
1. Select one of 5 expert personas (Investor, Advisor, Healthcare, EdTech, or Tech)
2. **Upload or Record** your pitch:
   - Upload a pre-recorded video (MP4, MOV, WebM)
   - Or record directly in browser with live preview
3. **Analyze**: Click "Analyze My Pitch"
4. **Review Feedback**: Get detailed analysis including:
   - Overall impression and score
   - Strengths and areas for improvement
   - Content & message evaluation
   - Delivery & presentation feedback
   - Actionable recommendations

### Idea Analyzer Flow
1. **Describe Your Idea**: Enter detailed description of your startup concept
2. **Add Context** (optional): Include keywords and industry/domain
3. **Analyze**: Click "Analyze My Idea"
4. **Review Results**:
   - Overall Originality & Technology Score (0-100)
   - 6 detailed factor scores with color-coding
   - Explanations for each evaluation factor
   - List of relevant U.S. patents with details and links

## 🔌 API Endpoints

### `POST /api/analyze-pitch`

Analyzes a pitch video with the selected AI expert persona.

**Request:**
- `video` (file): Video file (MP4, MOV, WebM)
- `persona` (string): One of "investor", "advisor", "healthcare", "edtech", "tech"

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

### `POST /api/analyze-idea`

Evaluates a startup idea for originality, feasibility, and patent landscape.

**Request:**
```json
{
  "idea_description": "Detailed description of the startup idea",
  "keywords": ["optional", "keyword", "list"],
  "industry": "Optional industry/domain"
}
```

**Response:**
```json
{
  "scores": {
    "novelty": 8.5,
    "technical_feasibility": 7.0,
    "market_overlap": 6.5,
    "patent_risk": 7.5,
    "implementation_complexity": 8.0,
    "ethical_regulatory": 9.0
  },
  "weighted_score": 76.5,
  "explanations": {
    "novelty": "This idea shows strong originality...",
    "technical_feasibility": "The technology is achievable...",
    ...
  },
  "patents": [
    {
      "patent_number": "US1234567",
      "title": "Patent Title",
      "abstract": "Patent description...",
      "filing_date": "2020-01-15",
      "status": "Active",
      "link": "https://patents.google.com/..."
    }
  ]
}
```

## 📁 Project Structure

```
Claude-Hackathon/
├── backend/
│   ├── main.py                      # FastAPI app with all endpoints
│   ├── services/
│   │   ├── video_processor.py       # Video frame extraction & transcription
│   │   ├── claude_analyzer.py       # Claude API integration for pitch analysis
│   │   └── idea_analyzer.py         # Startup idea evaluation & patent search
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── app/
│   │   ├── page.tsx                 # Landing page
│   │   ├── pitch-practice/
│   │   │   └── page.tsx             # Pitch practice feature
│   │   ├── idea-analyzer/
│   │   │   └── page.tsx             # Idea analyzer feature
│   │   ├── layout.tsx               # Root layout
│   │   └── globals.css              # Global dark theme styles
│   ├── components/
│   │   ├── landing/
│   │   │   └── Hero.tsx             # Landing page hero component
│   │   ├── VideoUploader.tsx        # Video upload/record component
│   │   ├── PersonaSelector.tsx      # 5 expert persona selection UI
│   │   └── FeedbackDisplay.tsx      # Pitch feedback display
│   ├── package.json
│   └── tsconfig.json
├── .gitignore
├── LICENSE
└── README.md
```

## 🔬 How It Works

### Pitch Practice Flow
1. **Video Input**: User uploads or records a video pitch with live preview
2. **Frame Extraction**: Backend extracts 10 key frames using OpenCV
3. **Audio Transcription**: Faster-Whisper transcribes the audio locally (offline)
4. **AI Analysis**: Frames + transcript sent to Claude Sonnet 4.5 with persona-specific prompts
5. **Expert Feedback**: Persona-tailored analysis returned with structured feedback and scoring
6. **Beautiful Display**: Feedback displayed in dark-themed UI with markdown support

### Idea Analyzer Flow
1. **Idea Input**: User describes their startup idea with optional keywords and industry
2. **Multi-Factor Analysis**: Claude evaluates 6 key factors using specialized prompts
3. **Patent Search**: Automated search of U.S. patent databases for relevant prior art
4. **Risk Assessment**: Patent landscape analyzed for IP risks and freedom to operate
5. **Score Calculation**: Weighted scoring system computes overall 0-100 score
6. **Results Display**: Color-coded scores, explanations, and patent details presented

## 🔧 Troubleshooting

### FFmpeg not found
- Ensure FFmpeg is installed and in your system PATH
- Restart all terminals after FFmpeg installation
- Test with `ffmpeg -version` in a new terminal

### Camera/Microphone permissions
- Browser will ask for permissions when recording
- Check browser settings if recording fails
- Ensure HTTPS or localhost for media access

### Video preview not showing during recording
- Check that autoPlay is not blocked in browser settings
- Ensure camera permissions are granted
- Try a different browser (Chrome/Edge recommended)

### Audio not captured in recordings
- Verify microphone permissions are granted
- Check system audio settings
- Ensure codec support (VP8/VP9 with Opus)

### Whisper model download
- First run will download the Whisper base model (~140MB)
- Subsequent runs will use cached model
- Check internet connection for initial download

### Claude API errors
- Verify your API key is correct in `backend/.env`
- Check you have credits in your Anthropic account at console.anthropic.com
- Ensure you're using model: `claude-sonnet-4-20250514`
- API key should start with `sk-ant-api03-`

### Idea Analyzer 404 errors
- Ensure backend server is restarted after code changes
- Check backend console for import errors
- Verify endpoint exists at `http://localhost:8000/docs`

### Git push blocked by secret scanning
- Never commit real API keys in `.env.example`
- Use placeholders like `your_api_key_here`
- Rotate exposed API keys immediately
- Amend commits to remove secrets: `git commit --amend`

## 🚀 Future Enhancements

### Pitch Practice
- Save pitch history and track improvement over time
- Side-by-side pitch comparison
- Support for multiple languages
- Screen recording for slide-heavy pitches
- PDF export of feedback reports
- Team collaboration and sharing
- Custom persona creation
- Real-time feedback during practice

### Idea Analyzer
- Integration with official USPTO API for accurate patent data
- Crunchbase API for competitor analysis
- Google Trends integration for market validation
- PDF report generation with charts
- Save and compare multiple ideas
- Track idea evolution over time
- Team collaboration on idea evaluation
- Market sizing and TAM estimation
- Competitive landscape visualization

## 📊 Scoring System (Idea Analyzer)

| Factor | Weight | Range | Description |
|--------|--------|-------|-------------|
| **Novelty/Originality** | 30% | 0-10 | Uniqueness and innovation level |
| **Technical Feasibility** | 20% | 0-10 | Technology viability and achievability |
| **Patent Freedom** | 20% | 0-10 | IP landscape and freedom to operate |
| **Market Overlap** | 15% | 0-10 | Competition and differentiation |
| **Implementation Complexity** | 10% | 0-10 | MVP development difficulty |
| **Ethical/Regulatory** | 5% | 0-10 | Compliance and ethical considerations |

**Final Score**: Weighted average normalized to 0-100 scale

**Color Coding**:
- 🟢 80-100: Excellent (Strong potential)
- 🔵 60-79: Good (Viable with refinement)
- 🟡 40-59: Moderate (Needs significant work)
- 🔴 0-39: Poor (Major challenges)

## 🎯 Key Technologies

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom dark theme
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend
- **Framework**: FastAPI (Python)
- **AI**: Anthropic Claude Sonnet 4.5
- **Video Processing**: OpenCV, FFmpeg
- **Audio**: Faster-Whisper (local transcription)
- **Patent Search**: Google Patents integration

## 📄 License

See LICENSE file for details.

## 👏 Credits

Built with:
- [Claude API](https://www.anthropic.com/api) by Anthropic
- [Next.js](https://nextjs.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Faster-Whisper](https://github.com/guillaumekln/faster-whisper)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenCV](https://opencv.org/) & [FFmpeg](https://ffmpeg.org/)