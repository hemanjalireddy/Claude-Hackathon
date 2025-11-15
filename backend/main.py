from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
import base64
from pathlib import Path
import shutil
from services.video_processor import VideoProcessor
from services.claude_analyzer import ClaudeAnalyzer
from services.idea_analyzer import IdeaAnalyzer
from services.market_insights_analyzer import MarketInsightsAnalyzer

load_dotenv()

app = FastAPI(title="Pitch Coach API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Next.js default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create uploads directory
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

# Initialize services
video_processor = VideoProcessor()
claude_analyzer = ClaudeAnalyzer(api_key=os.getenv("ANTHROPIC_API_KEY"))
idea_analyzer = IdeaAnalyzer(anthropic_api_key=os.getenv("ANTHROPIC_API_KEY"))
market_insights_analyzer = MarketInsightsAnalyzer(anthropic_api_key=os.getenv("ANTHROPIC_API_KEY"))


# Pydantic models for request validation
class IdeaAnalysisRequest(BaseModel):
    idea_description: str
    keywords: Optional[List[str]] = None
    industry: Optional[str] = None


class MarketInsightsRequest(BaseModel):
    startup_idea: str
    ideal_customer: str
    problem_solving: str
    industry: str
    known_competitors: Optional[str] = None
    unique_value: Optional[str] = None
    business_model: Optional[str] = None
    geographic_regions: Optional[str] = None


@app.get("/")
async def root():
    return {"message": "Pitch Coach API is running"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}


@app.post("/api/analyze-pitch")
async def analyze_pitch(
    video: UploadFile = File(...),
    persona: str = Form(...)
):
    """
    Analyze a pitch video with the selected persona
    """
    valid_personas = ["investor", "advisor", "healthcare", "edtech", "tech"]
    if persona not in valid_personas:
        raise HTTPException(
            status_code=400,
            detail=f"Persona must be one of: {', '.join(valid_personas)}"
        )

    # Save uploaded video
    video_path = UPLOAD_DIR / f"temp_{video.filename}"
    try:
        with video_path.open("wb") as buffer:
            shutil.copyfileobj(video.file, buffer)

        # Process video: extract frames and transcribe audio
        print("Processing video...")
        frames, transcript = await video_processor.process_video(str(video_path))

        # Analyze with Claude
        print(f"Analyzing pitch with {persona} persona...")
        analysis = await claude_analyzer.analyze_pitch(
            frames=frames,
            transcript=transcript,
            persona=persona
        )

        return JSONResponse(content={
            "success": True,
            "transcript": transcript,
            "analysis": analysis,
            "persona": persona
        })

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing video: {str(e)}")

    finally:
        # Cleanup
        if video_path.exists():
            video_path.unlink()


@app.post("/api/analyze-idea")
async def analyze_idea(request: IdeaAnalysisRequest):
    """
    Analyze a startup idea for originality, feasibility, market overlap, and patent landscape.

    Returns:
        - Numeric scores (0-10) for each evaluation factor
        - Weighted total score (0-100)
        - Explanations for each score
        - List of relevant U.S. patents
    """
    try:
        print(f"Analyzing idea: {request.idea_description[:100]}...")

        # Perform comprehensive analysis
        result = await idea_analyzer.analyze_idea(
            idea_description=request.idea_description,
            keywords=request.keywords,
            industry=request.industry
        )

        return JSONResponse(content=result)

    except Exception as e:
        print(f"Error analyzing idea: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error analyzing idea: {str(e)}")


@app.post("/api/analyze-market")
async def analyze_market(request: MarketInsightsRequest):
    """
    Analyze market landscape for a startup idea.

    Returns:
        - Customer segments and personas
        - Competitive landscape (direct, adjacent, indirect competitors)
        - Market gaps and opportunities
        - Strategic positioning insights
        - ASCII visualizations
    """
    try:
        print(f"Analyzing market for: {request.startup_idea[:100]}...")

        # Perform comprehensive market analysis
        result = await market_insights_analyzer.analyze_market(
            startup_idea=request.startup_idea,
            ideal_customer=request.ideal_customer,
            problem_solving=request.problem_solving,
            industry=request.industry,
            known_competitors=request.known_competitors,
            unique_value=request.unique_value,
            business_model=request.business_model,
            geographic_regions=request.geographic_regions
        )

        return JSONResponse(content=result)

    except Exception as e:
        print(f"Error analyzing market: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error analyzing market: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))
