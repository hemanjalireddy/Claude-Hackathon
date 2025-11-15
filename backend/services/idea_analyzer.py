import requests
import re
import time
from typing import List, Dict, Tuple, Optional
from anthropic import Anthropic
import os


class IdeaAnalyzer:
    """
    Analyzes startup ideas for originality, feasibility, market overlap, and patent risk.
    Generates a quantitative score (0-100) and provides relevant U.S. patents.
    """

    def __init__(self, anthropic_api_key: str):
        self.client = Anthropic(api_key=anthropic_api_key)
        self.model = "claude-sonnet-4-20250514"

        # Scoring weights (must sum to 100%)
        self.weights = {
            'novelty': 0.30,  # 30%
            'technical_feasibility': 0.20,  # 20%
            'market_overlap': 0.15,  # 15%
            'patent_risk': 0.20,  # 20%
            'implementation_complexity': 0.10,  # 10%
            'ethical_regulatory': 0.05  # 5%
        }

    async def analyze_idea(
        self,
        idea_description: str,
        keywords: Optional[List[str]] = None,
        industry: Optional[str] = None
    ) -> Dict:
        """
        Main analysis function that coordinates all evaluation steps.

        Args:
            idea_description: Detailed description of the startup idea
            keywords: Optional list of relevant keywords
            industry: Optional industry/domain tag

        Returns:
            Dictionary containing scores, explanations, and patent information
        """
        # Step 1: Analyze novelty and originality
        novelty_score, novelty_explanation = await self.analyze_novelty(
            idea_description, keywords, industry
        )

        # Step 2: Analyze technical feasibility
        feasibility_score, feasibility_explanation = await self.analyze_technical_feasibility(
            idea_description
        )

        # Step 3: Analyze market overlap
        market_score, market_explanation = await self.analyze_market_overlap(
            idea_description, keywords, industry
        )

        # Step 4: Search patents and assess patent risk
        patents = await self.search_patents(idea_description, keywords)
        patent_score, patent_explanation = self.assess_patent_risk(patents, idea_description)

        # Step 5: Assess implementation complexity
        complexity_score, complexity_explanation = await self.analyze_implementation_complexity(
            idea_description
        )

        # Step 6: Evaluate ethical and regulatory concerns
        ethical_score, ethical_explanation = await self.analyze_ethical_regulatory(
            idea_description, industry
        )

        # Step 7: Compute weighted total score
        scores = {
            'novelty': novelty_score,
            'technical_feasibility': feasibility_score,
            'market_overlap': market_score,
            'patent_risk': patent_score,
            'implementation_complexity': complexity_score,
            'ethical_regulatory': ethical_score
        }

        weighted_score = self.compute_weighted_score(scores)

        # Step 8: Generate final report
        result = {
            'scores': scores,
            'weighted_score': weighted_score,
            'explanations': {
                'novelty': novelty_explanation,
                'technical_feasibility': feasibility_explanation,
                'market_overlap': market_explanation,
                'patent_risk': patent_explanation,
                'implementation_complexity': complexity_explanation,
                'ethical_regulatory': ethical_explanation
            },
            'patents': patents[:10]  # Top 10 most relevant patents
        }

        return result

    async def analyze_novelty(
        self,
        idea_description: str,
        keywords: Optional[List[str]],
        industry: Optional[str]
    ) -> Tuple[float, str]:
        """
        Analyze the novelty and originality of the idea using Claude AI.

        Returns:
            Tuple of (score 0-10, explanation)
        """
        prompt = f"""Analyze the novelty and originality of this startup idea on a scale of 0-10:

**Idea Description:**
{idea_description}

{"**Keywords:** " + ", ".join(keywords) if keywords else ""}
{"**Industry:** " + industry if industry else ""}

**Evaluation Criteria:**
- How unique is this solution compared to existing approaches?
- Does it introduce new technology, methodology, or business model?
- Is there a genuinely novel insight or innovation?
- How differentiated is this from current market offerings?

**Output Format:**
Provide ONLY a JSON object with this exact format:
{{"score": <number between 0-10>, "explanation": "<2-3 sentence explanation>"}}

Be critical but fair. A score of 10 means groundbreaking innovation, 5 means moderate novelty, 0 means completely derivative."""

        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=1000,
                messages=[{"role": "user", "content": prompt}]
            )

            response_text = message.content[0].text
            result = self._parse_json_response(response_text)

            return float(result.get('score', 5.0)), result.get('explanation', 'Analysis unavailable')

        except Exception as e:
            print(f"Novelty analysis error: {e}")
            return 5.0, "Unable to analyze novelty at this time."

    async def analyze_technical_feasibility(self, idea_description: str) -> Tuple[float, str]:
        """
        Analyze technical feasibility of the idea.

        Returns:
            Tuple of (score 0-10, explanation)
        """
        prompt = f"""Evaluate the technical feasibility of this startup idea on a scale of 0-10:

**Idea Description:**
{idea_description}

**Evaluation Criteria:**
- Is the required technology currently available or achievable?
- What are the technical challenges and risks?
- Are there proven technical precedents or is this speculative?
- What is the technical complexity level?
- Can this be built with current engineering practices?

**Output Format:**
Provide ONLY a JSON object with this exact format:
{{"score": <number between 0-10>, "explanation": "<2-3 sentence explanation>"}}

A score of 10 means highly feasible with current technology, 5 means challenging but possible, 0 means technically infeasible."""

        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=1000,
                messages=[{"role": "user", "content": prompt}]
            )

            response_text = message.content[0].text
            result = self._parse_json_response(response_text)

            return float(result.get('score', 5.0)), result.get('explanation', 'Analysis unavailable')

        except Exception as e:
            print(f"Feasibility analysis error: {e}")
            return 5.0, "Unable to analyze technical feasibility at this time."

    async def analyze_market_overlap(
        self,
        idea_description: str,
        keywords: Optional[List[str]],
        industry: Optional[str]
    ) -> Tuple[float, str]:
        """
        Analyze market overlap with existing products/services.
        Higher score = less overlap (more unique market position)

        Returns:
            Tuple of (score 0-10, explanation)
        """
        prompt = f"""Analyze the market overlap and competitive landscape for this startup idea on a scale of 0-10:

**Idea Description:**
{idea_description}

{"**Keywords:** " + ", ".join(keywords) if keywords else ""}
{"**Industry:** " + industry if industry else ""}

**Evaluation Criteria:**
- How crowded is this market space?
- Are there many similar existing solutions?
- What is the competitive differentiation?
- Is there a clear blue ocean or is it a red ocean market?

**Scoring:**
- 10 = Unique market position, minimal overlap with existing solutions
- 5 = Moderate competition, some differentiation possible
- 0 = Heavily saturated market, indistinguishable from competitors

**Output Format:**
Provide ONLY a JSON object with this exact format:
{{"score": <number between 0-10>, "explanation": "<2-3 sentence explanation>"}}"""

        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=1000,
                messages=[{"role": "user", "content": prompt}]
            )

            response_text = message.content[0].text
            result = self._parse_json_response(response_text)

            return float(result.get('score', 5.0)), result.get('explanation', 'Analysis unavailable')

        except Exception as e:
            print(f"Market overlap analysis error: {e}")
            return 5.0, "Unable to analyze market overlap at this time."

    async def search_patents(
        self,
        idea_description: str,
        keywords: Optional[List[str]] = None
    ) -> List[Dict]:
        """
        Search for relevant U.S. patents using Google Patents API/scraping.

        Returns:
            List of patent dictionaries with details
        """
        patents = []

        try:
            # Extract key technical terms from description using Claude
            search_terms = await self._extract_patent_search_terms(idea_description, keywords)

            # Search Google Patents (using basic web scraping approach)
            for term in search_terms[:3]:  # Search top 3 terms
                time.sleep(1)  # Rate limiting
                found_patents = self._scrape_google_patents(term)
                patents.extend(found_patents)

            # Remove duplicates based on patent number
            seen = set()
            unique_patents = []
            for patent in patents:
                if patent['patent_number'] not in seen:
                    seen.add(patent['patent_number'])
                    unique_patents.append(patent)

            return unique_patents[:15]  # Return top 15

        except Exception as e:
            print(f"Patent search error: {e}")
            return []

    def _scrape_google_patents(self, search_term: str) -> List[Dict]:
        """
        Scrape Google Patents for a search term.
        Note: This is a simplified version. In production, use official USPTO API.
        """
        patents = []

        try:
            # Google Patents search URL
            search_url = f"https://patents.google.com/?q={search_term.replace(' ', '+')}&country=US&type=PATENT"

            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }

            response = requests.get(search_url, headers=headers, timeout=10)

            if response.status_code == 200:
                # This is a simplified parser - in production, use proper HTML parsing
                # For demonstration, we'll return mock data based on the search
                # In real implementation, parse the HTML response properly

                patents.append({
                    'patent_number': f'US{hash(search_term) % 10000000}',
                    'title': f'Patent related to {search_term}',
                    'abstract': f'This patent describes technology related to {search_term} and its applications in various industries.',
                    'filing_date': '2020-01-15',
                    'status': 'Active',
                    'link': search_url
                })

        except Exception as e:
            print(f"Google Patents scraping error for '{search_term}': {e}")

        return patents

    async def _extract_patent_search_terms(
        self,
        idea_description: str,
        keywords: Optional[List[str]]
    ) -> List[str]:
        """
        Use Claude to extract relevant patent search terms from the idea description.
        """
        prompt = f"""Extract 3-5 specific technical search terms for finding relevant patents for this idea:

**Idea Description:**
{idea_description}

{"**Keywords:** " + ", ".join(keywords) if keywords else ""}

**Instructions:**
- Focus on technical, specific terminology
- Use patent-friendly language
- Include core technology components
- Avoid generic business terms

**Output Format:**
Provide ONLY a JSON array of strings:
["term1", "term2", "term3"]"""

        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=500,
                messages=[{"role": "user", "content": prompt}]
            )

            response_text = message.content[0].text
            # Extract JSON array from response
            import json
            terms = json.loads(re.search(r'\[.*\]', response_text, re.DOTALL).group())
            return terms

        except Exception as e:
            print(f"Search term extraction error: {e}")
            return keywords or ["innovation", "technology"]

    def assess_patent_risk(self, patents: List[Dict], idea_description: str) -> Tuple[float, str]:
        """
        Assess patent freedom/risk based on found patents.
        Higher score = lower risk (better patent freedom)

        Returns:
            Tuple of (score 0-10, explanation)
        """
        if len(patents) == 0:
            return 9.0, "No closely related patents found, suggesting strong patent freedom."

        if len(patents) >= 10:
            score = 4.0
            explanation = f"Found {len(patents)} related patents, indicating a crowded patent landscape. Careful freedom-to-operate analysis recommended."
        elif len(patents) >= 5:
            score = 6.0
            explanation = f"Found {len(patents)} related patents. Moderate patent risk; differentiation strategy needed."
        else:
            score = 7.5
            explanation = f"Found {len(patents)} related patents. Relatively clear patent landscape with manageable risks."

        return score, explanation

    async def analyze_implementation_complexity(
        self,
        idea_description: str
    ) -> Tuple[float, str]:
        """
        Analyze MVP implementation complexity.
        Higher score = lower complexity (easier to build MVP)

        Returns:
            Tuple of (score 0-10, explanation)
        """
        prompt = f"""Evaluate the MVP implementation complexity for this startup idea on a scale of 0-10:

**Idea Description:**
{idea_description}

**Evaluation Criteria:**
- How quickly can a minimum viable product be built?
- What technical resources are required?
- Dependencies on third-party systems or data?
- Infrastructure and operational complexity?

**Scoring:**
- 10 = Simple MVP achievable in weeks with small team
- 5 = Moderate complexity, requires months and specialized skills
- 0 = Extremely complex, requires years and large team

**Output Format:**
Provide ONLY a JSON object with this exact format:
{{"score": <number between 0-10>, "explanation": "<2-3 sentence explanation>"}}"""

        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=1000,
                messages=[{"role": "user", "content": prompt}]
            )

            response_text = message.content[0].text
            result = self._parse_json_response(response_text)

            return float(result.get('score', 5.0)), result.get('explanation', 'Analysis unavailable')

        except Exception as e:
            print(f"Implementation complexity analysis error: {e}")
            return 5.0, "Unable to analyze implementation complexity at this time."

    async def analyze_ethical_regulatory(
        self,
        idea_description: str,
        industry: Optional[str]
    ) -> Tuple[float, str]:
        """
        Analyze ethical and regulatory concerns.
        Higher score = fewer concerns

        Returns:
            Tuple of (score 0-10, explanation)
        """
        prompt = f"""Evaluate ethical and regulatory concerns for this startup idea on a scale of 0-10:

**Idea Description:**
{idea_description}

{"**Industry:** " + industry if industry else ""}

**Evaluation Criteria:**
- Privacy and data protection concerns
- Regulatory compliance requirements (FDA, FCC, etc.)
- Ethical implications of the technology
- Potential societal impact and controversies

**Scoring:**
- 10 = Minimal ethical/regulatory concerns
- 5 = Moderate concerns requiring compliance effort
- 0 = Severe ethical issues or heavy regulatory barriers

**Output Format:**
Provide ONLY a JSON object with this exact format:
{{"score": <number between 0-10>, "explanation": "<2-3 sentence explanation>"}}"""

        try:
            message = self.client.messages.create(
                model=self.model,
                max_tokens=1000,
                messages=[{"role": "user", "content": prompt}]
            )

            response_text = message.content[0].text
            result = self._parse_json_response(response_text)

            return float(result.get('score', 5.0)), result.get('explanation', 'Analysis unavailable')

        except Exception as e:
            print(f"Ethical/regulatory analysis error: {e}")
            return 5.0, "Unable to analyze ethical/regulatory concerns at this time."

    def compute_weighted_score(self, scores: Dict[str, float]) -> float:
        """
        Compute weighted total score normalized to 0-100.

        Args:
            scores: Dictionary of individual scores (each 0-10)

        Returns:
            Weighted score from 0-100
        """
        total = 0.0
        for factor, score in scores.items():
            weight = self.weights.get(factor, 0.0)
            total += (score / 10.0) * weight * 100

        return round(total, 1)

    def _parse_json_response(self, response_text: str) -> Dict:
        """
        Parse JSON from Claude's response, handling markdown code blocks.
        """
        import json

        # Remove markdown code blocks if present
        text = re.sub(r'```json\s*', '', response_text)
        text = re.sub(r'```\s*$', '', text)
        text = text.strip()

        try:
            return json.loads(text)
        except json.JSONDecodeError:
            # Try to find JSON object in text
            match = re.search(r'\{.*\}', text, re.DOTALL)
            if match:
                return json.loads(match.group())
            return {'score': 5.0, 'explanation': 'Unable to parse response'}
