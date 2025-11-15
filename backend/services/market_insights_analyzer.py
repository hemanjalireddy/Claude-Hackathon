"""
Market Insights Analyzer Service

Analyzes startup market landscape including:
- Customer segmentation and persona generation
- Competitor landscape mapping (direct, adjacent, indirect)
- Market gap identification
- Strategic positioning insights
- ASCII visualizations

Uses Claude AI and web search (max 3 calls) for comprehensive analysis.
"""

import anthropic
from typing import Dict, List, Optional, Any
import json
import re
import requests
from bs4 import BeautifulSoup
import time


class MarketInsightsAnalyzer:
    def __init__(self, anthropic_api_key: str):
        self.anthropic_client = anthropic.Anthropic(api_key=anthropic_api_key)
        self.model = "claude-sonnet-4-20250514"
        self.web_search_count = 0
        self.max_web_searches = 3

    def perform_web_search(self, query: str, num_results: int = 5) -> List[Dict[str, str]]:
        """
        Perform web search to gather market intelligence.
        Uses DuckDuckGo HTML search (no API key required).

        Returns list of search results with title, snippet, and URL.
        """
        if self.web_search_count >= self.max_web_searches:
            print(f"Web search limit reached ({self.max_web_searches} searches)")
            return []

        try:
            self.web_search_count += 1
            print(f"Performing web search {self.web_search_count}/{self.max_web_searches}: {query}")

            # Use DuckDuckGo HTML search
            search_url = f"https://html.duckduckgo.com/html/?q={requests.utils.quote(query)}"
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }

            response = requests.get(search_url, headers=headers, timeout=10)
            response.raise_for_status()

            soup = BeautifulSoup(response.text, 'html.parser')
            results = []

            # Parse search results
            result_divs = soup.find_all('div', class_='result')[:num_results]

            for div in result_divs:
                title_elem = div.find('a', class_='result__a')
                snippet_elem = div.find('a', class_='result__snippet')

                if title_elem:
                    title = title_elem.get_text(strip=True)
                    url = title_elem.get('href', '')
                    snippet = snippet_elem.get_text(strip=True) if snippet_elem else ''

                    results.append({
                        'title': title,
                        'snippet': snippet,
                        'url': url
                    })

            print(f"Found {len(results)} search results")
            return results

        except Exception as e:
            print(f"Web search error: {e}")
            return []

    async def analyze_customer_segments(
        self,
        startup_idea: str,
        ideal_customer: str,
        problem_solving: str,
        industry: str,
        geographic_regions: str
    ) -> List[Dict[str, Any]]:
        """
        Identify and analyze distinct customer segments.
        """
        prompt = f"""You are a market segmentation expert. Analyze the startup and identify 2-3 distinct customer segments.

Startup: {startup_idea}
Ideal Customer: {ideal_customer}
Problem: {problem_solving}
Industry: {industry}

For each segment:
1. Name (3-5 words)
2. Brief description (1 sentence)
3. Market size: Small/Medium/Large
4. 3 key characteristics

Return ONLY valid JSON:
[
  {{
    "name": "Segment Name",
    "description": "One sentence description",
    "size": "Small/Medium/Large",
    "key_characteristics": ["char 1", "char 2", "char 3"]
  }}
]

Be concise and specific."""

        try:
            response = self.anthropic_client.messages.create(
                model=self.model,
                max_tokens=1200,
                messages=[{"role": "user", "content": prompt}]
            )

            content = response.content[0].text
            # Extract JSON from markdown code blocks if present
            json_match = re.search(r'```(?:json)?\s*(\[.*?\])\s*```', content, re.DOTALL)
            if json_match:
                content = json_match.group(1)

            segments = json.loads(content)
            return segments

        except Exception as e:
            print(f"Error analyzing customer segments: {e}")
            return []

    async def generate_customer_personas(
        self,
        startup_idea: str,
        ideal_customer: str,
        problem_solving: str,
        segments: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        """
        Generate detailed customer personas (NOT interview questions).
        Creates realistic persona profiles based on segments.
        """
        prompt = f"""Create 2-3 customer personas for this startup.

Startup: {startup_idea}
Problem: {problem_solving}

For each persona:
1. Name (e.g., "Tech-Savvy Sarah")
2. Demographics (1 sentence: age, job, location)
3. Psychographics (1 sentence: values, motivations)
4. 3 pain points
5. 3 goals

Return ONLY valid JSON:
[
  {{
    "name": "Persona Name",
    "demographics": "One sentence",
    "psychographics": "One sentence",
    "pain_points": ["point 1", "point 2", "point 3"],
    "goals": ["goal 1", "goal 2", "goal 3"]
  }}
]

Be concise and realistic."""

        try:
            response = self.anthropic_client.messages.create(
                model=self.model,
                max_tokens=1500,
                messages=[{"role": "user", "content": prompt}]
            )

            content = response.content[0].text
            # Extract JSON from markdown code blocks if present
            json_match = re.search(r'```(?:json)?\s*(\[.*?\])\s*```', content, re.DOTALL)
            if json_match:
                content = json_match.group(1)

            personas = json.loads(content)
            return personas

        except Exception as e:
            print(f"Error generating customer personas: {e}")
            return []

    async def map_competitors(
        self,
        startup_idea: str,
        industry: str,
        known_competitors: str,
        unique_value: str,
        geographic_regions: str
    ) -> Dict[str, List[Dict[str, Any]]]:
        """
        Map competitive landscape: direct, adjacent, and indirect competitors.
        Uses web search to discover real competitors.
        """
        # Perform web search for competitors
        search_query = f"{industry} companies {geographic_regions or ''} competitors"
        search_results = self.perform_web_search(search_query, num_results=8)

        search_context = "\n".join([
            f"- {r['title']}" for r in search_results[:5]
        ]) if search_results else "None"

        prompt = f"""Map competitors for this startup.

Startup: {startup_idea}
Industry: {industry}
Known Competitors: {known_competitors or 'None'}

Web Results:
{search_context}

Identify:
1. Direct (2-3): Similar solutions, same market
2. Adjacent (2-3): Related spaces
3. Indirect (2-3): Alternative solutions

Return ONLY valid JSON:
{{
  "direct": [
    {{
      "name": "Company",
      "description": "Brief 1 sentence",
      "strengths": ["str 1", "str 2", "str 3"],
      "weaknesses": ["weak 1", "weak 2", "weak 3"]
    }}
  ],
  "adjacent": [
    {{
      "name": "Company",
      "description": "Brief",
      "relevance": "Short relevance"
    }}
  ],
  "indirect": [
    {{
      "name": "Solution",
      "description": "Brief",
      "relevance": "Short relevance"
    }}
  ]
}}

Be concise. Use real companies from web results."""

        try:
            response = self.anthropic_client.messages.create(
                model=self.model,
                max_tokens=2000,
                messages=[{"role": "user", "content": prompt}]
            )

            content = response.content[0].text
            # Extract JSON from markdown code blocks if present
            json_match = re.search(r'```(?:json)?\s*(\{.*?\})\s*```', content, re.DOTALL)
            if json_match:
                content = json_match.group(1)

            competitors = json.loads(content)
            return competitors

        except Exception as e:
            print(f"Error mapping competitors: {e}")
            return {"direct": [], "adjacent": [], "indirect": []}

    async def identify_market_gaps(
        self,
        startup_idea: str,
        problem_solving: str,
        industry: str,
        competitors: Dict[str, List[Dict[str, Any]]],
        unique_value: str
    ) -> List[str]:
        """
        Identify market opportunities and gaps based on competitive analysis.
        """
        prompt = f"""Identify 3-4 market opportunities for this startup.

Startup: {startup_idea}
Problem: {problem_solving}
Unique Value: {unique_value or 'Not specified'}

Competitors: {len(competitors.get('direct', []))} direct found

Return ONLY valid JSON array:
["Opportunity 1 (1 sentence)", "Opportunity 2", "Opportunity 3"]

Be specific and actionable."""

        try:
            response = self.anthropic_client.messages.create(
                model=self.model,
                max_tokens=800,
                messages=[{"role": "user", "content": prompt}]
            )

            content = response.content[0].text
            # Extract JSON from markdown code blocks if present
            json_match = re.search(r'```(?:json)?\s*(\[.*?\])\s*```', content, re.DOTALL)
            if json_match:
                content = json_match.group(1)

            gaps = json.loads(content)
            return gaps

        except Exception as e:
            print(f"Error identifying market gaps: {e}")
            return []

    async def generate_positioning_insights(
        self,
        startup_idea: str,
        unique_value: str,
        business_model: str,
        segments: List[Dict[str, Any]],
        competitors: Dict[str, List[Dict[str, Any]]],
        market_gaps: List[str]
    ) -> str:
        """
        Generate strategic positioning recommendations.
        """
        prompt = f"""Provide concise positioning strategy for this startup.

Startup: {startup_idea}
Unique Value: {unique_value or 'Not specified'}
Model: {business_model or 'Not specified'}

Segments: {len(segments)}
Direct Competitors: {len(competitors.get('direct', []))}

Cover:
1. Positioning strategy (2 sentences)
2. Key differentiation (2 sentences)
3. Go-to-market approach (2 sentences)

Be specific and actionable. Max 150 words total."""

        try:
            response = self.anthropic_client.messages.create(
                model=self.model,
                max_tokens=800,
                messages=[{"role": "user", "content": prompt}]
            )

            return response.content[0].text

        except Exception as e:
            print(f"Error generating positioning insights: {e}")
            return "Unable to generate positioning insights."

    async def analyze_market(
        self,
        startup_idea: str,
        ideal_customer: str,
        problem_solving: str,
        industry: str,
        known_competitors: Optional[str] = None,
        unique_value: Optional[str] = None,
        business_model: Optional[str] = None,
        geographic_regions: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Perform comprehensive market insights analysis.

        Returns complete analysis including:
        - Customer segments
        - Customer personas
        - Competitor landscape
        - Market gaps
        - Positioning insights
        - Visualizations
        """
        print("Starting comprehensive market analysis...")
        self.web_search_count = 0  # Reset counter

        try:
            # Step 1: Analyze customer segments
            print("Analyzing customer segments...")
            segments = await self.analyze_customer_segments(
                startup_idea, ideal_customer, problem_solving, industry, geographic_regions or ""
            )

            # Step 2: Generate customer personas
            print("Generating customer personas...")
            personas = await self.generate_customer_personas(
                startup_idea, ideal_customer, problem_solving, segments
            )

            # Step 3: Map competitive landscape (uses 1 web search)
            print("Mapping competitive landscape...")
            competitors = await self.map_competitors(
                startup_idea, industry, known_competitors or "", unique_value or "", geographic_regions or ""
            )

            # Step 4: Identify market gaps
            print("Identifying market opportunities...")
            market_gaps = await self.identify_market_gaps(
                startup_idea, problem_solving, industry, competitors, unique_value or ""
            )

            # Step 5: Generate positioning insights
            print("Generating strategic positioning insights...")
            positioning = await self.generate_positioning_insights(
                startup_idea, unique_value or "", business_model or "", segments, competitors, market_gaps
            )

            result = {
                "customer_segments": segments,
                "customer_personas": personas,
                "competitors": competitors,
                "market_gaps": market_gaps,
                "positioning_insights": positioning
            }

            print(f"Market analysis complete! Used {self.web_search_count} web searches.")
            return result

        except Exception as e:
            print(f"Error in market analysis: {e}")
            raise e
