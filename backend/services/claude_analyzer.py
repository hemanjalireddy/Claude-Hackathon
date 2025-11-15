from anthropic import Anthropic
from typing import List, Dict


class ClaudeAnalyzer:
    def __init__(self, api_key: str):
        self.client = Anthropic(api_key=api_key)
        self.model = "claude-sonnet-4-20250514"  # Latest Claude Sonnet with vision

    async def analyze_pitch(
        self,
        frames: List[str],
        transcript: str,
        persona: str
    ) -> Dict:
        """
        Analyze pitch using Claude with vision capabilities
        """
        # Build the prompt based on persona
        system_prompt = self._get_system_prompt(persona)

        # Build message content with frames and transcript
        content = self._build_message_content(frames, transcript)

        # Call Claude API
        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=4000,
                system=system_prompt,
                messages=[
                    {
                        "role": "user",
                        "content": content
                    }
                ]
            )

            # Parse the response
            analysis_text = message.content[0].text

            # Structure the response
            return {
                "raw_feedback": analysis_text,
                "structured_feedback": self._parse_feedback(analysis_text)
            }

        except Exception as e:
            raise Exception(f"Claude API error: {str(e)}")

    def _get_system_prompt(self, persona: str) -> str:
        """
        Get system prompt based on selected persona
        """
        if persona == "investor":
            return """You are a seasoned venture capital investor who has seen thousands of pitches.
You are evaluating this pitch with a critical but constructive eye. You care about:
- Market opportunity and problem validation
- Business model clarity and scalability
- Team credibility and passion
- Financial projections and ask
- Competitive advantage
- Presentation quality and confidence

Provide detailed, actionable feedback on what works and what needs improvement.
Be honest but encouraging. Structure your feedback into clear sections."""

        elif persona == "advisor":
            return """You are an experienced startup advisor and pitch coach.
Your goal is to help the founder refine their pitch to be as compelling as possible. You focus on:
- Story structure and narrative flow
- Clarity of message and value proposition
- Slide design and visual communication
- Delivery, body language, and presence
- Handling objections preemptively
- Call to action effectiveness

Provide supportive, detailed feedback on how to improve the pitch.
Be specific with examples and suggestions. Structure your feedback into clear sections."""

        elif persona == "healthcare":
            return """You are a healthcare industry expert and investor specializing in medical technology, biotech, and healthcare services.
You have deep knowledge of healthcare regulations, clinical validation, and patient outcomes. You evaluate pitches based on:
- Clinical need and patient impact
- Regulatory pathway and FDA compliance strategy
- Evidence-based validation and clinical trials
- Healthcare provider adoption challenges
- Reimbursement strategy and payer relationships
- HIPAA compliance and data privacy
- Scalability within healthcare systems
- Medical advisory board and clinical expertise

Provide expert feedback focusing on healthcare-specific challenges and opportunities.
Be thorough and consider both clinical and commercial viability. Structure your feedback into clear sections."""

        elif persona == "edtech":
            return """You are an educational technology expert and investor with deep experience in learning platforms, educational content, and institutional adoption.
You understand pedagogy, learning outcomes, and the education market. You evaluate pitches based on:
- Learning efficacy and educational outcomes
- Pedagogical approach and instructional design
- Student engagement and retention metrics
- Teacher/administrator adoption barriers
- Curriculum alignment and standards compliance
- Accessibility and inclusive design
- Scalability across institutions and demographics
- Data privacy and student data protection (FERPA/COPPA)
- Pricing model fit for education market

Provide expert feedback on both educational impact and business viability.
Focus on learning outcomes and market fit in education. Structure your feedback into clear sections."""

        elif persona == "tech":
            return """You are a technical expert and investor specializing in SaaS, AI/ML, and innovative technology startups.
You have strong engineering background and understand technical architecture, scalability, and innovation. You evaluate pitches based on:
- Technical innovation and differentiation
- Architecture scalability and performance
- AI/ML model validity and training approach
- Technology stack choices and justification
- Product-market fit for technical solution
- Developer experience and API design
- Security, privacy, and data protection
- Technical team expertise and execution capability
- Integration challenges and ecosystem fit
- Infrastructure costs and unit economics

Provide technical validation and strategic feedback for technology startups.
Be specific about technical strengths and potential technical risks. Structure your feedback into clear sections."""

        return "You are a professional pitch coach."

    def _build_message_content(self, frames: List[str], transcript: str) -> List[Dict]:
        """
        Build message content with frames and transcript
        """
        content = []

        # Add instruction text
        content.append({
            "type": "text",
            "text": f"""Please analyze this pitch video. I've provided:
1. Key frames from the video showing visual elements, slides, and body language
2. A complete transcript of what was said

TRANSCRIPT:
{transcript}

VIDEO FRAMES (shown below):
"""
        })

        # Add frames (sample up to 5 to avoid token limits)
        for i, frame_b64 in enumerate(frames[:5]):
            content.append({
                "type": "image",
                "source": {
                    "type": "base64",
                    "media_type": "image/jpeg",
                    "data": frame_b64
                }
            })

        # Add analysis request
        content.append({
            "type": "text",
            "text": """
Based on the transcript and visual frames, provide a comprehensive analysis of this pitch.

Please structure your feedback in the following sections:

1. **OVERALL IMPRESSION** - Your initial reaction and overall assessment

2. **STRENGTHS** - What worked well in this pitch (3-5 specific points)

3. **AREAS FOR IMPROVEMENT** - What needs work (3-5 specific points with actionable suggestions)

4. **CONTENT & MESSAGE**
   - Clarity of problem and solution
   - Value proposition strength
   - Market opportunity presentation
   - Business model clarity

5. **DELIVERY & PRESENTATION**
   - Body language and confidence
   - Pace and tone
   - Slide quality (if visible)
   - Visual aids effectiveness

6. **RECOMMENDATIONS** - Top 3 actionable next steps to improve this pitch

7. **SCORE** - Rate the pitch on a scale of 1-10 with brief justification

Be specific, constructive, and actionable in your feedback.
"""
        })

        return content

    def _parse_feedback(self, analysis_text: str) -> Dict:
        """
        Parse the feedback text into structured sections
        """
        sections = {}
        current_section = "intro"
        current_content = []

        for line in analysis_text.split('\n'):
            line = line.strip()
            if not line:
                continue

            # Check if this is a section header
            if line.startswith('#') or line.isupper() and len(line) < 50:
                # Save previous section
                if current_content:
                    sections[current_section] = '\n'.join(current_content)
                    current_content = []

                # Start new section
                section_name = line.replace('#', '').strip().lower()
                current_section = section_name.replace(' ', '_')
            else:
                current_content.append(line)

        # Save last section
        if current_content:
            sections[current_section] = '\n'.join(current_content)

        return sections
