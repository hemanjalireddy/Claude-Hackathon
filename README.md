# SHARK BAIT
**Survive the Sharks**

An AI-powered startup intelligence platform designed to help entrepreneurs perfect their pitches, validate their ideas, and understand their market landscape. Built with Claude Sonnet 4.5, SHARK BAIT provides expert feedback through specialized AI personas, comprehensive idea evaluation with patent analysis, and detailed market insights with competitor intelligence.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & Setup](#installation--setup)
- [Usage Guide](#usage-guide)
- [API Documentation](#api-documentation)
- [Claude API Integration](#claude-api-integration)
- [Project Architecture](#project-architecture)
- [Challenges & Solutions](#challenges--solutions)
- [Future Plans](#future-plans)
- [Team & Contributions](#team--contributions)
- [Troubleshooting](#troubleshooting)

---

## Project Overview

**SHARK BAIT** is a comprehensive platform that addresses three critical needs for startup founders:

1. **Pitch Perfection**: Practice and refine your investor pitch with AI feedback from five specialized expert personas
2. **Idea Validation**: Evaluate your startup concept across six key factors including originality, feasibility, and patent landscape
3. **Market Intelligence**: Discover your target customers, understand your competitive landscape, and identify market opportunities

The platform leverages Anthropic's Claude Sonnet 4.5 model with vision capabilities for multimodal analysis, combining video, audio, and text processing to deliver actionable insights for entrepreneurs.

### What Problem Does It Solve?

Entrepreneurs face significant challenges when preparing for investor pitches and validating their startup ideas:
- Limited access to experienced mentors and advisors
- Uncertainty about idea originality and patent risks
- Insufficient understanding of target markets and competitors
- Need for objective, expert-level feedback before critical presentations

SHARK BAIT democratizes access to expert-level feedback and market intelligence, enabling founders to iterate faster and make more informed decisions.

---

## Features

### 1. Pitch Practice

**Record or Upload Your Pitch for Expert AI Feedback**

- **Video Recording & Upload**: Record directly in-browser with live preview or upload pre-recorded videos (MP4, MOV, WebM)
- **Five Expert AI Personas**:
  - **Venture Investor**: Market fit, scalability, ROI analysis, and investment readiness
  - **Pitch Advisor**: Presentation skills, storytelling techniques, and delivery effectiveness
  - **Healthcare Expert**: Clinical validation, FDA compliance, HIPAA considerations, and healthcare market insights
  - **EdTech Specialist**: Learning outcomes, pedagogical approach, FERPA/COPPA compliance, and educational impact
  - **Tech Startup Expert**: Technical architecture, AI/ML feasibility, scalability, and engineering challenges
- **Multimodal Analysis**: Claude Sonnet 4.5 with vision analyzes both visual presentation (slides, body language) and verbal content
- **Local Audio Transcription**: Faster-Whisper provides offline transcription without requiring external API calls
- **Structured Feedback**: Detailed analysis of content, delivery, strengths, and areas for improvement

### 2. Idea Analyzer

**Validate Your Startup Concept with AI-Powered Analysis**

- **Six-Factor Evaluation System**:
  - **Novelty/Originality (30%)**: Uniqueness and innovation assessment
  - **Technical Feasibility (20%)**: Technology viability and implementation complexity
  - **Patent Freedom (20%)**: IP landscape analysis and freedom to operate
  - **Market Overlap (15%)**: Competitive differentiation and market positioning
  - **Implementation Complexity (10%)**: MVP development difficulty and resource requirements
  - **Ethical/Regulatory (5%)**: Compliance considerations and ethical implications
- **Weighted Scoring**: Overall score (0-100) with color-coded visualization
- **U.S. Patent Search**: Automatic discovery of relevant patents with details and links
- **Detailed Explanations**: AI-generated insights for each evaluation factor
- **Industry-Specific Analysis**: Customized evaluation based on industry context

### 3. Market Insights

**Discover Your Customers and Competitive Landscape**

- **Customer Segmentation**: AI-identified customer segments with market size estimates
- **Customer Personas**: Detailed buyer personas with demographics, psychographics, pain points, and goals
- **Competitive Intelligence**:
  - **Direct Competitors**: Companies offering similar solutions with strengths/weaknesses analysis
  - **Adjacent Competitors**: Related market players and their relevance
  - **Indirect Competitors**: Alternative solutions and substitutes
- **Market Opportunity Identification**: AI-discovered gaps and untapped segments
- **Strategic Positioning Insights**: Recommendations for market positioning and go-to-market strategy
- **Interactive Visualizations**: Pie charts for segment distribution using Recharts library
- **Web Search Integration**: Real-time competitor discovery using DuckDuckGo (maximum 3 searches per analysis)

---

## Tech Stack

### Frontend

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Fonts**: Google Fonts (Space Grotesk, Outfit)
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **HTTP Client**: Axios
- **Media Recording**: MediaRecorder API with codec fallbacks (VP9/VP8 + Opus)

### Backend

- **Framework**: FastAPI (Python)
- **Language**: Python 3.8+
- **AI Model**: Anthropic Claude Sonnet 4.5 (claude-sonnet-4-20250514)
- **Video Processing**: OpenCV (frame extraction), FFmpeg (video encoding)
- **Audio Transcription**: Faster-Whisper (local, offline)
- **Web Scraping**: BeautifulSoup4, Requests
- **Validation**: Pydantic v2
- **Server**: Uvicorn with ASGI

### External APIs & Services

- **Anthropic Claude API**: Primary AI model for all analysis features
- **Google Patents**: Patent search and prior art discovery
- **DuckDuckGo Search**: Competitor discovery without API key requirements

---

## Installation & Setup

### Prerequisites

- **Node.js** 18.0 or higher
- **Python** 3.8 or higher
- **FFmpeg** (for video processing)
- **Anthropic API Key** (obtain from [console.anthropic.com](https://console.anthropic.com))

### Step 1: Install FFmpeg

**Windows:**
```bash
# Option 1: Chocolatey package manager
choco install ffmpeg

# Option 2: Manual installation
# Download from https://ffmpeg.org/download.html
# Add to system PATH
```

**macOS:**
```bash
brew install ffmpeg
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install ffmpeg
```

Verify installation:
```bash
ffmpeg -version
```

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Edit .env and add your Anthropic API key
# ANTHROPIC_API_KEY=sk-ant-api03-your_key_here
```

**Backend Dependencies:**
- fastapi>=0.109.0
- uvicorn[standard]>=0.27.0
- python-multipart>=0.0.6
- anthropic>=0.18.1
- python-dotenv>=1.0.0
- opencv-python>=4.9.0.80
- Pillow>=10.3.0
- ffmpeg-python>=0.2.0
- pydantic>=2.6.0
- faster-whisper>=1.0.0
- beautifulsoup4>=4.12.0
- requests>=2.31.0

### Step 3: Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
# or using Yarn:
yarn install
```

**Frontend Dependencies:**
- next: 14.x
- react: 18.x
- typescript: 5.x
- tailwindcss: 3.x
- axios
- lucide-react
- recharts

---

## Usage Guide

### Starting the Application

**Terminal 1 - Backend Server:**
```bash
cd backend
# Activate virtual environment
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux

# Start FastAPI server
python main.py
```

Backend server will start at `http://localhost:8000`

**Terminal 2 - Frontend Development Server:**
```bash
cd frontend
npm run dev
# or
yarn dev
```

Frontend will be available at `http://localhost:3000`

### Feature-Specific Usage

#### Pitch Practice Workflow

1. **Access Feature**: Navigate to `http://localhost:3000` and click "Practice Your Pitch"

2. **Select Expert Persona**: Choose from five specialized AI personas based on your industry and pitch focus:
   - Venture Investor (general startups, market analysis)
   - Pitch Advisor (presentation and delivery)
   - Healthcare Expert (medical devices, healthtech)
   - EdTech Specialist (education technology)
   - Tech Startup Expert (SaaS, AI/ML, technical products)

3. **Record or Upload Video**:
   - **Record**: Click "Start Recording" to use your webcam and microphone. A live preview will display. Click "Stop Recording" when finished.
   - **Upload**: Drag and drop a video file or click to browse (supports MP4, MOV, WebM)

4. **Analyze Pitch**: Click "Analyze My Pitch" button. Processing takes 30-60 seconds depending on video length.

5. **Review Feedback**: Receive detailed analysis including:
   - Overall impression and executive summary
   - Strengths identified in your pitch
   - Areas for improvement
   - Content and messaging evaluation
   - Delivery and presentation assessment
   - Actionable recommendations

6. **View Transcript**: Toggle transcript view to see what was captured from your audio

7. **Iterate**: Click "Analyze Another Pitch" to try different versions or personas

#### Idea Analyzer Workflow

1. **Access Feature**: From landing page, click "Analyze Your Idea"

2. **Describe Your Idea**: Enter a detailed description of your startup concept (recommended: 2-5 paragraphs)

3. **Add Optional Context**:
   - Keywords: List relevant terms (e.g., "AI", "blockchain", "healthcare")
   - Industry/Domain: Specify sector (e.g., "FinTech", "EdTech", "Healthcare")

4. **Analyze**: Click "Analyze My Idea" button. Processing takes 20-40 seconds.

5. **Review Results**:
   - **Overall Score**: 0-100 weighted score with color coding
   - **Factor Breakdown**: Six individual scores with explanations
   - **Patent Landscape**: List of relevant U.S. patents with abstracts and links
   - **Insights**: AI-generated analysis for each factor

6. **Evaluate Patents**: Click patent links to view full details on Google Patents

7. **Export or Iterate**: Save results or analyze variations of your idea

#### Market Insights Workflow

1. **Access Feature**: Click "Market Insights" from the landing page

2. **Complete Questionnaire** (8 questions):
   - Startup idea description
   - Ideal customer profile
   - Problem being solved
   - Industry/market
   - Known competitors (optional)
   - Unique value proposition (optional)
   - Business model (optional)
   - Geographic regions (optional)

3. **Analyze Market**: Click "Get Market Insights". Processing takes 40-70 seconds.

4. **Review Results**:
   - **Customer Segments**: Pie chart visualization and segment details
   - **Customer Personas**: Card-based persona profiles (2-3 personas)
   - **Competitive Landscape**: Stats cards and competitor analysis
   - **Market Opportunities**: Visual cards highlighting gaps
   - **Strategic Positioning**: AI-generated recommendations

5. **Explore Insights**:
   - Hover over pie chart segments for percentages
   - Review competitor strengths/weaknesses
   - Identify market gaps to target

6. **Refine Strategy**: Use insights to adjust positioning or targeting

---

## API Documentation

### Endpoint: POST /api/analyze-pitch

Analyzes a pitch video using the selected AI expert persona.

**Request Format:**
- Method: POST
- Content-Type: multipart/form-data
- Body:
  - `video` (file): Video file (MP4, MOV, WebM)
  - `persona` (string): One of "investor", "advisor", "healthcare", "edtech", "tech"

**Response Format:**
```json
{
  "success": true,
  "transcript": "Transcribed audio content from the pitch...",
  "analysis": {
    "raw_feedback": "Full feedback text with sections...",
    "structured_feedback": {
      "overall_impression": "Executive summary...",
      "strengths": "Key strengths identified...",
      "areas_for_improvement": "Suggestions...",
      "content_message": "Content evaluation...",
      "delivery_presentation": "Delivery feedback...",
      "recommendations": "Action items..."
    }
  },
  "persona": "investor"
}
```

**Error Responses:**
- 400: Invalid persona selection
- 500: Processing error (video processing, transcription, or API failure)

### Endpoint: POST /api/analyze-idea

Evaluates a startup idea across six factors with patent search.

**Request Format:**
```json
{
  "idea_description": "Detailed startup concept description",
  "keywords": ["optional", "keyword", "list"],
  "industry": "Optional industry classification"
}
```

**Response Format:**
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
    "novelty": "Analysis of uniqueness and innovation...",
    "technical_feasibility": "Technology viability assessment...",
    "market_overlap": "Competitive landscape analysis...",
    "patent_risk": "IP freedom evaluation...",
    "implementation_complexity": "Development difficulty...",
    "ethical_regulatory": "Compliance considerations..."
  },
  "patents": [
    {
      "patent_number": "US1234567B2",
      "title": "Patent Title",
      "abstract": "Patent abstract text...",
      "filing_date": "2020-01-15",
      "status": "Active",
      "link": "https://patents.google.com/patent/US1234567B2"
    }
  ]
}
```

### Endpoint: POST /api/analyze-market

Performs comprehensive market analysis including customer segments, personas, and competitors.

**Request Format:**
```json
{
  "startup_idea": "Startup description",
  "ideal_customer": "Target customer profile",
  "problem_solving": "Problem being addressed",
  "industry": "Industry/market",
  "known_competitors": "Optional competitor list",
  "unique_value": "Optional value proposition",
  "business_model": "Optional business model",
  "geographic_regions": "Optional target regions"
}
```

**Response Format:**
```json
{
  "customer_segments": [
    {
      "name": "Segment Name",
      "description": "Brief description",
      "size": "Small/Medium/Large",
      "key_characteristics": ["char1", "char2", "char3"]
    }
  ],
  "customer_personas": [
    {
      "name": "Persona Name",
      "demographics": "Age, occupation, location",
      "psychographics": "Values and motivations",
      "pain_points": ["pain1", "pain2", "pain3"],
      "goals": ["goal1", "goal2", "goal3"]
    }
  ],
  "competitors": {
    "direct": [
      {
        "name": "Company Name",
        "description": "What they do",
        "strengths": ["strength1", "strength2", "strength3"],
        "weaknesses": ["weakness1", "weakness2", "weakness3"]
      }
    ],
    "adjacent": [
      {
        "name": "Company Name",
        "description": "Brief description",
        "relevance": "How they relate"
      }
    ],
    "indirect": [
      {
        "name": "Solution Name",
        "description": "Brief description",
        "relevance": "Alternative approach"
      }
    ]
  },
  "market_gaps": [
    "Market opportunity 1",
    "Market opportunity 2"
  ],
  "positioning_insights": "Strategic positioning recommendations..."
}
```

### API Health Check

**GET /**
```json
{
  "message": "Pitch Coach API is running"
}
```

**GET /health**
```json
{
  "status": "healthy"
}
```

---

## Claude API Integration

### Overview

SHARK BAIT leverages Anthropic's Claude Sonnet 4.5 model (claude-sonnet-4-20250514) as the core AI engine for all three features. The integration uses the Anthropic Python SDK and employs advanced prompt engineering techniques for optimal results.

### Model Selection Rationale

**Why Claude Sonnet 4.5:**
- **Multimodal Capabilities**: Vision support enables analysis of pitch videos with both visual and audio components
- **Long Context Window**: Handles lengthy startup descriptions, patent abstracts, and market research
- **Instruction Following**: Consistently produces structured JSON outputs for programmatic processing
- **Reasoning Quality**: Provides nuanced, domain-specific feedback across healthcare, education, and technology sectors
- **Response Speed**: Balances quality with reasonable latency for interactive user experience

### Integration Architecture

**1. Pitch Practice Integration**

```python
# services/claude_analyzer.py
class ClaudeAnalyzer:
    def __init__(self, api_key: str):
        self.client = anthropic.Anthropic(api_key=api_key)
        self.model = "claude-sonnet-4-20250514"

    async def analyze_pitch(self, frames: List[bytes], transcript: str, persona: str):
        # Construct multimodal prompt with vision
        content = [
            {
                "type": "text",
                "text": self._get_persona_prompt(persona, transcript)
            }
        ]

        # Add video frames as images
        for frame_bytes in frames:
            base64_frame = base64.b64encode(frame_bytes).decode('utf-8')
            content.append({
                "type": "image",
                "source": {
                    "type": "base64",
                    "media_type": "image/jpeg",
                    "data": base64_frame
                }
            })

        # Call Claude API
        response = self.client.messages.create(
            model=self.model,
            max_tokens=3000,
            messages=[{"role": "user", "content": content}]
        )

        return self._parse_feedback(response.content[0].text)
```

**Key Implementation Details:**
- Extracts 10 evenly-spaced frames from video using OpenCV
- Encodes frames as base64 JPEG images
- Combines visual frames with audio transcript in single API call
- Uses persona-specific system prompts for tailored feedback
- Implements structured parsing to extract feedback sections

**2. Idea Analyzer Integration**

```python
# services/idea_analyzer.py
class IdeaAnalyzer:
    async def analyze_novelty(self, idea: str, industry: str) -> Tuple[float, str]:
        prompt = f"""Evaluate the novelty and originality of this startup idea.

        Idea: {idea}
        Industry: {industry}

        Provide:
        1. A score from 0-10 (10 = highly novel)
        2. A brief explanation (2-3 sentences)

        Return ONLY valid JSON:
        {{
          "score": 8.5,
          "explanation": "Detailed reasoning..."
        }}
        """

        response = self.anthropic_client.messages.create(
            model=self.model,
            max_tokens=500,
            messages=[{"role": "user", "content": prompt}]
        )

        result = json.loads(response.content[0].text)
        return (result["score"], result["explanation"])
```

**Key Features:**
- Modular analysis: Separate function for each of 6 factors
- JSON-only responses for reliable parsing
- Weighted scoring system with configurable weights
- Parallel patent search using web scraping
- Error handling with fallback values

**3. Market Insights Integration**

```python
# services/market_insights_analyzer.py
class MarketInsightsAnalyzer:
    async def analyze_customer_segments(self, startup_idea: str, ...) -> List[Dict]:
        prompt = f"""Analyze customer segments for this startup.

        Startup: {startup_idea}

        Identify 2-3 distinct segments.
        Return ONLY valid JSON array:
        [
          {{
            "name": "Segment Name",
            "description": "Brief description",
            "size": "Small/Medium/Large",
            "key_characteristics": ["char1", "char2", "char3"]
          }}
        ]
        """

        response = self.anthropic_client.messages.create(
            model=self.model,
            max_tokens=1200,
            messages=[{"role": "user", "content": prompt}]
        )

        # Extract JSON from markdown code blocks if present
        content = response.content[0].text
        json_match = re.search(r'```(?:json)?\s*(\[.*?\])\s*```', content, re.DOTALL)
        if json_match:
            content = json_match.group(1)

        return json.loads(content)
```

**Key Features:**
- Web search integration: DuckDuckGo HTML parsing for real competitor discovery
- Multi-step analysis pipeline: Segments → Personas → Competitors → Gaps → Positioning
- Token optimization: Reduced max_tokens to minimize latency and cost
- Regex-based JSON extraction from markdown code blocks
- Fallback error handling for robust operation

### Prompt Engineering Strategies

**1. Role Assignment**
```python
"You are a {domain} expert with {years} years of experience..."
```
- Establishes expertise context for better responses
- Domain-specific prompts for healthcare, education, technology

**2. Structured Output Enforcement**
```python
"Return ONLY valid JSON with this exact structure: {...}"
```
- Eliminates parsing errors
- Enables reliable programmatic processing
- Reduces need for complex response parsing

**3. Few-Shot Examples** (for complex tasks)
```python
prompt = """
Example input: "AI-powered tutoring platform"
Example output: {"score": 7.5, "explanation": "Moderately novel..."}

Now analyze: {user_input}
"""
```

**4. Constraint Specification**
```python
"Be concise. Max 150 words. Use 1 sentence per point."
```
- Reduces token usage and cost
- Improves response speed
- Maintains user engagement with concise feedback

### API Usage Optimization

**Rate Limiting & Error Handling:**
- Exponential backoff for rate limit errors
- Graceful degradation with error messages to users
- Retry logic for transient failures

**Token Management:**
- Optimized max_tokens per endpoint (500-3000 based on complexity)
- Reduced verbosity in prompts (50% reduction in Market Insights)
- Streaming responses not used to simplify frontend implementation

**Cost Optimization:**
- Single API call for pitch analysis (frames + transcript combined)
- Modular idea analysis (6 separate calls for parallelization)
- Web search caching to minimize redundant API calls

---

## Project Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend (Next.js)                   │
│                                                              │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Pitch     │  │     Idea     │  │   Market     │      │
│  │  Practice   │  │   Analyzer   │  │   Insights   │      │
│  └──────┬──────┘  └──────┬───────┘  └──────┬───────┘      │
│         │                │                  │               │
│         └────────────────┴──────────────────┘               │
│                          │                                   │
│                     Axios HTTP                               │
│                          │                                   │
└──────────────────────────┼───────────────────────────────────┘
                           │
                     CORS Enabled
                           │
┌──────────────────────────┼───────────────────────────────────┐
│                          │                                   │
│                    FastAPI Backend                           │
│                          │                                   │
│  ┌───────────────────────┴──────────────────────┐          │
│  │              main.py (Routes)                 │          │
│  └───┬──────────────┬─────────────┬──────────┬──┘          │
│      │              │             │          │              │
│  ┌───▼─────┐  ┌────▼────┐  ┌─────▼────┐  ┌─▼──────────┐  │
│  │ Video   │  │ Claude  │  │   Idea   │  │  Market    │  │
│  │Process  │  │Analyzer │  │ Analyzer │  │  Insights  │  │
│  └───┬─────┘  └────┬────┘  └─────┬────┘  └─┬──────────┘  │
│      │             │              │         │              │
│  ┌───▼─────┐      │              │         │              │
│  │ FFmpeg  │      │              │         │              │
│  │ OpenCV  │      │              │         │              │
│  │ Whisper │      │              │         │              │
│  └─────────┘      │              │         │              │
│                   │              │         │              │
└───────────────────┼──────────────┼─────────┼──────────────┘
                    │              │         │
              ┌─────▼──────────────▼─────────▼─────┐
              │    Anthropic Claude API             │
              │    (claude-sonnet-4-20250514)       │
              └─────────────────────────────────────┘
                    │              │         │
              ┌─────▼──────┐  ┌────▼────┐  ┌─▼──────┐
              │  Vision    │  │  Text   │  │  Text  │
              │  Analysis  │  │ Analysis│  │Analysis│
              └────────────┘  └─────────┘  └────────┘
```

### Data Flow

**Pitch Practice Flow:**
```
User Video → MediaRecorder → Blob → FormData → Backend
                                                    ↓
                                          FFmpeg (Extract Audio)
                                                    ↓
                                          Faster-Whisper (Transcribe)
                                                    ↓
                                          OpenCV (Extract 10 Frames)
                                                    ↓
                                          Claude API (Vision + Text)
                                                    ↓
                                          Structured Feedback
                                                    ↓
                                          JSON Response → Frontend → Display
```

**Idea Analyzer Flow:**
```
User Input → Axios POST → Backend
                            ↓
                   IdeaAnalyzer Service
                            ↓
        ┌──────────────────┼──────────────────┐
        │                  │                  │
    Factor 1           Factor 2  ...      Factor 6
    (Claude API)      (Claude API)     (Claude API)
        │                  │                  │
        └──────────────────┼──────────────────┘
                            ↓
                   Patent Search (Google)
                            ↓
                   Weighted Score Calculation
                            ↓
                   JSON Response → Frontend → Visualize
```

**Market Insights Flow:**
```
User Form → Axios POST → Backend
                            ↓
               MarketInsightsAnalyzer
                            ↓
            ┌───────────────┴────────────────┐
            │                                │
     DuckDuckGo Search              Claude API Calls
    (Competitor Data)           (Segments, Personas, Analysis)
            │                                │
            └───────────────┬────────────────┘
                            ↓
                   Aggregate Results
                            ↓
            JSON Response → Frontend → Recharts Visualization
```

### Directory Structure

```
SHARK-BAIT/
├── backend/
│   ├── main.py                          # FastAPI application & routes
│   ├── services/
│   │   ├── video_processor.py           # Video frame extraction & transcription
│   │   ├── claude_analyzer.py           # Pitch feedback with Claude API
│   │   ├── idea_analyzer.py             # Idea evaluation & patent search
│   │   └── market_insights_analyzer.py  # Market analysis & competitor mapping
│   ├── uploads/                         # Temporary video storage (gitignored)
│   ├── requirements.txt                 # Python dependencies
│   ├── .env.example                     # Environment template
│   └── .env                             # API keys (gitignored)
├── frontend/
│   ├── app/
│   │   ├── page.tsx                     # Landing page (redirects to home)
│   │   ├── layout.tsx                   # Root layout with fonts
│   │   ├── globals.css                  # Global styles & dark theme
│   │   ├── pitch-practice/
│   │   │   └── page.tsx                 # Pitch practice feature page
│   │   ├── idea-analyzer/
│   │   │   └── page.tsx                 # Idea analyzer feature page
│   │   └── market-insights/
│   │       └── page.tsx                 # Market insights feature page
│   ├── components/
│   │   ├── landing/
│   │   │   └── Hero.tsx                 # Landing page hero section
│   │   ├── VideoUploader.tsx            # Video recording/upload component
│   │   ├── PersonaSelector.tsx          # AI persona selection UI
│   │   └── FeedbackDisplay.tsx          # Pitch feedback renderer
│   ├── public/                          # Static assets
│   ├── package.json                     # Node dependencies
│   ├── tsconfig.json                    # TypeScript configuration
│   ├── tailwind.config.ts               # Tailwind CSS configuration
│   └── next.config.js                   # Next.js configuration
├── .gitignore
├── LICENSE
└── README.md
```

### Database & State Management

**Current Implementation:**
- Stateless architecture (no database)
- All data processed in real-time
- No persistence of user data or results

**Rationale:**
- Simplifies deployment and maintenance
- Reduces privacy and security concerns
- Enables rapid iteration without schema migrations

**Future Considerations:**
- PostgreSQL for user accounts and history
- Redis for session caching
- S3/Cloud Storage for video persistence

---

## Challenges & Solutions

### Challenge 1: Audio Not Captured in Video Recordings

**Problem**: Early versions of the MediaRecorder implementation captured video but no audio. The recorded video files would play silently, making transcription impossible.

**Root Cause**: MediaRecorder was instantiated without explicitly specifying audio/video codecs. Browser default codecs varied across platforms and sometimes excluded audio encoding.

**Solution**:
```typescript
// Implemented codec fallback chain
let options: MediaRecorderOptions = { mimeType: 'video/webm;codecs=vp9,opus' }
if (!MediaRecorder.isTypeSupported(options.mimeType)) {
  options = { mimeType: 'video/webm;codecs=vp8,opus' }
}
if (!MediaRecorder.isTypeSupported(options.mimeType)) {
  options = { mimeType: 'video/webm' }
}
const mediaRecorder = new MediaRecorder(stream, options)
```

**Outcome**: Audio now reliably captures across Chrome, Edge, Firefox, and Safari with appropriate codec fallbacks.

### Challenge 2: FFmpeg Not Found Error During Transcription

**Problem**: Backend crashed with `[WinError 2] The system cannot find the file specified` when attempting to process video files.

**Root Cause**: FFmpeg was either not installed or not added to system PATH. Python's subprocess module couldn't locate the `ffmpeg` executable.

**Solution**:
1. Added installation instructions to README for all platforms
2. Implemented early validation in video_processor.py:
```python
import shutil

if not shutil.which("ffmpeg"):
    raise RuntimeError(
        "FFmpeg not found. Please install FFmpeg and ensure it's in your system PATH. "
        "Installation: https://ffmpeg.org/download.html"
    )
```

**Outcome**: Users receive clear error messages with installation guidance before attempting video processing.

### Challenge 3: Git Push Blocked by Secret Scanning

**Problem**: GitHub push rejected with "push declined due to repository rule violations" due to exposed Anthropic API key in `.env.example`.

**Root Cause**: A real API key was accidentally committed in the example environment file during initial setup.

**Solution**:
1. Changed `.env.example` to use placeholder: `ANTHROPIC_API_KEY=your_anthropic_api_key_here`
2. Amended commits to remove exposed secret:
```bash
git commit --amend
git push --force-with-lease
```
3. Rotated the exposed API key at console.anthropic.com
4. Added `.env` to `.gitignore` with prominent warning comment

**Outcome**: Repository complies with GitHub secret scanning policies. No real credentials in version control.

### Challenge 4: Markdown Formatting in AI Feedback

**Problem**: Claude responses included markdown formatting (***text***, **text**, etc.) which rendered as asterisks in the UI, reducing readability.

**Root Cause**: Direct display of raw Claude API responses without processing markdown syntax.

**Solution**: Implemented comprehensive markdown stripping function:
```typescript
const cleanMarkdown = (text: string): string => {
  return text
    .replace(/\*\*\*/g, '')      // Remove bold+italic
    .replace(/\*\*/g, '')        // Remove bold
    .replace(/\*/g, '')          // Remove italic
    .replace(/_{2,}/g, '')       // Remove underline
    .replace(/_/g, '')           // Remove single underscore
    .replace(/~~(.+?)~~/g, '$1') // Remove strikethrough
    .trim()
}
```

**Outcome**: Clean, professional text display without distracting formatting artifacts.

### Challenge 5: Verbose Market Analysis Output

**Problem**: Initial Market Insights feature generated extremely long responses (3000+ tokens), causing slow processing times (90+ seconds) and overwhelming users with information.

**Root Cause**: Prompts requested detailed, comprehensive analysis without length constraints. Claude provided thorough but verbose responses.

**Solution**:
1. Reduced max_tokens across all analysis functions (50% reduction on average)
2. Rewrote prompts with explicit brevity constraints:
```python
"Be concise. Max 150 words. Use 1 sentence per point."
```
3. Removed ASCII visualizations and competitor matrices
4. Limited results to top 2-3 items per category

**Outcome**: Analysis time reduced to 40-60 seconds. More scannable, actionable insights.

### Challenge 6: Inconsistent JSON Parsing from Claude

**Problem**: Claude sometimes wrapped JSON responses in markdown code blocks (```json ... ```), causing JSON parsing failures.

**Root Cause**: Claude's training includes markdown formatting for readability, even when instructed to return "only JSON."

**Solution**: Implemented regex-based JSON extraction:
```python
content = response.content[0].text
json_match = re.search(r'```(?:json)?\s*(\[.*?\]|\{.*?\})\s*```', content, re.DOTALL)
if json_match:
    content = json_match.group(1)
return json.loads(content)
```

**Outcome**: 99%+ parsing success rate. Graceful fallback to direct parsing if no code block detected.

### Challenge 7: Web Search Without API Keys

**Problem**: Needed real-time competitor discovery but didn't want to require users to obtain additional API keys (Google Custom Search, Bing, etc.).

**Root Cause**: Most search APIs require registration and impose query limits.

**Solution**: Implemented DuckDuckGo HTML scraping:
```python
def perform_web_search(self, query: str, num_results: int = 5):
    search_url = f"https://html.duckduckgo.com/html/?q={requests.utils.quote(query)}"
    response = requests.get(search_url, headers={'User-Agent': '...'})
    soup = BeautifulSoup(response.text, 'html.parser')

    results = []
    for div in soup.find_all('div', class_='result')[:num_results]:
        title = div.find('a', class_='result__a').get_text(strip=True)
        snippet = div.find('a', class_='result__snippet').get_text(strip=True)
        url = div.find('a', class_='result__a').get('href')
        results.append({'title': title, 'snippet': snippet, 'url': url})

    return results
```

**Outcome**: Free, API-key-less competitor discovery with high accuracy for well-known companies.

### Challenge 8: Video Preview Not Showing During Recording

**Problem**: Users couldn't see themselves while recording, leading to framing and presentation issues.

**Root Cause**: Video element lacked `autoPlay` and `playsInline` attributes required by modern browsers for immediate playback.

**Solution**:
```tsx
<video
  ref={videoRef}
  autoPlay
  playsInline
  muted
  className="w-full rounded-lg"
  style={{ minHeight: '300px' }}
/>

// Set stream on element
videoRef.current.srcObject = stream
```

**Outcome**: Live preview displays immediately upon camera access, improving user experience and pitch quality.

---

## Future Plans

### Short-Term Enhancements (1-3 months)

**Pitch Practice:**
- **Pitch History & Analytics**: Save previous pitches and track improvement over time with score trending
- **Side-by-Side Comparison**: Compare two pitch versions to identify specific improvements
- **Slide Analysis**: Extract and analyze pitch deck slides using OCR and vision models
- **Practice Mode**: Real-time feedback during pitch (audio-only analysis for speed)
- **Custom Personas**: Allow users to create custom expert personas with specific expertise areas

**Idea Analyzer:**
- **USPTO API Integration**: Replace Google Patents scraping with official API for accurate, up-to-date data
- **Crunchbase Integration**: Add funding history and competitive landscape from Crunchbase
- **Google Trends Analysis**: Validate market interest using search trends and seasonal patterns
- **PDF Report Export**: Generate professional PDF reports with charts and detailed analysis
- **Comparison Mode**: Save and compare multiple idea variations side-by-side

**Market Insights:**
- **TAM/SAM/SOM Estimation**: Calculate Total Addressable Market, Serviceable Available Market, and Serviceable Obtainable Market
- **Competitor Monitoring**: Track competitor changes and funding announcements
- **Market Trend Analysis**: Identify emerging trends in target industry
- **Customer Interview Generator**: Create targeted interview questions for persona validation

### Medium-Term Goals (3-6 months)

**Platform Features:**
- **User Authentication**: Sign up, login, and personal dashboard
- **Persistent Storage**: Save all analyses and track progress over time
- **Team Collaboration**: Share analyses with co-founders and advisors
- **Email Reports**: Scheduled digest of insights and recommendations
- **API Access**: Public API for integration with other tools

**Advanced Analysis:**
- **Multi-Language Support**: Transcription and analysis in Spanish, French, German, Mandarin
- **Financial Projections**: Revenue modeling and burn rate analysis
- **Fundraising Readiness Score**: Evaluate preparedness for different funding stages (Seed, Series A, etc.)
- **Regulatory Compliance Checker**: Industry-specific compliance analysis (GDPR, HIPAA, SOC2)

**UI/UX Improvements:**
- **Mobile App**: Native iOS and Android applications
- **Voice Commands**: Navigate and trigger analysis via voice
- **Accessibility**: WCAG 2.1 AA compliance for screen readers and keyboard navigation
- **Localization**: Multi-language UI support

### Long-Term Vision (6-12 months)

**AI Advancements:**
- **Fine-Tuned Models**: Domain-specific Claude models trained on pitch deck corpus
- **Investor Matching**: Connect startups with investors based on analysis results
- **Automated Deck Generation**: Generate pitch decks from idea descriptions
- **Simulated Q&A**: Practice answering investor questions with AI-generated follow-ups

**Ecosystem Integration:**
- **CRM Integration**: Sync with HubSpot, Salesforce for lead tracking
- **Cap Table Integration**: Connect with Carta, Pulley for equity management
- **Slack/Teams Bots**: Get insights without leaving communication tools
- **Zapier Connectors**: Automate workflows with 5000+ apps

**Business Model:**
- **Freemium Tier**: 3 analyses per month free
- **Pro Tier**: Unlimited analyses, history, PDF exports ($29/month)
- **Team Tier**: Multi-user accounts, collaboration ($99/month)
- **Enterprise**: Custom deployments, API access, dedicated support

---

## Team & Contributions

### Project Creator

**Hema** - Full-Stack Developer
- **Role**: Solo developer responsible for all aspects of SHARK BAIT
- **Contributions**:
  - Backend architecture and FastAPI implementation
  - Frontend design and Next.js development
  - Claude API integration and prompt engineering
  - Video processing pipeline (FFmpeg, Whisper, OpenCV)
  - Market insights analyzer with web search integration
  - UI/UX design with Tailwind CSS and Recharts
  - Documentation and deployment

### Technologies Used

**AI/ML:**
- Anthropic Claude Sonnet 4.5 for multimodal analysis
- Faster-Whisper for audio transcription

**Frontend:**
- Next.js 14, React 18, TypeScript
- Tailwind CSS for styling
- Recharts for data visualization
- Lucide React for icons

**Backend:**
- FastAPI for REST API
- Pydantic for validation
- OpenCV for video processing
- FFmpeg for media encoding
- BeautifulSoup4 for web scraping

**Development Tools:**
- Git for version control
- npm/pip for package management
- VS Code as primary IDE

### Acknowledgments

- **Anthropic** for Claude API access and comprehensive documentation
- **OpenAI Whisper Team** for open-source transcription models
- **Next.js Team** for excellent React framework
- **FastAPI Community** for modern Python web framework

---

## Troubleshooting

### Common Issues

#### 1. FFmpeg Not Found

**Symptoms**: Backend error `FileNotFoundError: [WinError 2] The system cannot find the file specified`

**Solution**:
```bash
# Verify FFmpeg installation
ffmpeg -version

# If not installed:
# Windows: choco install ffmpeg
# macOS: brew install ffmpeg
# Linux: sudo apt-get install ffmpeg

# Restart terminal after installation
```

#### 2. Claude API Errors

**Symptoms**: 401 Unauthorized or 429 Rate Limit errors

**Solution**:
- Verify API key in `backend/.env` is correct and starts with `sk-ant-api03-`
- Check account credits at [console.anthropic.com](https://console.anthropic.com)
- Ensure model name is `claude-sonnet-4-20250514`
- Wait 60 seconds and retry if rate limited

#### 3. Video Upload Fails

**Symptoms**: "Failed to analyze pitch" error after upload

**Solution**:
- Verify video format is MP4, MOV, or WebM
- Check video file size is under 100MB
- Ensure FFmpeg is installed and in PATH
- Review backend logs for specific error messages

#### 4. Microphone Not Working

**Symptoms**: Video records but no audio captured

**Solution**:
- Grant microphone permissions when browser prompts
- Check system microphone settings
- Verify microphone works in other applications
- Try different browser (Chrome/Edge recommended)
- Check codec support: `MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')`

#### 5. CORS Errors

**Symptoms**: Frontend can't connect to backend

**Solution**:
```python
# Verify CORS settings in backend/main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

#### 6. Port Already in Use

**Symptoms**: `Address already in use` error when starting backend

**Solution**:
```bash
# Windows: Find and kill process on port 8000
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:8000 | xargs kill -9

# Or use different port:
PORT=8001 python main.py
```

#### 7. npm Install Failures

**Symptoms**: Package installation errors in frontend

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Or use yarn instead
yarn install
```

#### 8. Recharts Not Rendering

**Symptoms**: Charts appear blank or cause errors

**Solution**:
- Ensure Recharts is installed: `npm install recharts`
- Verify data format matches expected structure
- Check browser console for JavaScript errors
- Add `"use client"` directive at top of component file

### Getting Help

**GitHub Issues**: Report bugs or request features at repository issues page

**Documentation**: Review this README and inline code comments

**API Documentation**: Visit `http://localhost:8000/docs` when backend is running for interactive API docs

---

## License

This project is licensed under the MIT License. See LICENSE file for details.

---

## Credits

**Built with:**
- [Anthropic Claude API](https://www.anthropic.com/api)
- [Next.js](https://nextjs.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Faster-Whisper](https://github.com/guillaumekln/faster-whisper)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [OpenCV](https://opencv.org/)
- [FFmpeg](https://ffmpeg.org/)

---

**SHARK BAIT** - Survive the Sharks - Empowering entrepreneurs with AI-powered intelligence for pitch perfection, idea validation, and market mastery.
