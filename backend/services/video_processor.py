import cv2
import base64
from pathlib import Path
import subprocess
import os
import shutil
from typing import List, Tuple
from faster_whisper import WhisperModel


class VideoProcessor:
    def __init__(self):
        # Initialize Whisper model (runs locally, no API key needed)
        # Using 'base' model for balance between speed and accuracy
        # Options: tiny, base, small, medium, large
        self.whisper_model = WhisperModel("base", device="cpu", compute_type="int8")

        # Check if FFmpeg is available
        self.ffmpeg_path = shutil.which("ffmpeg")
        if not self.ffmpeg_path:
            print("WARNING: FFmpeg not found in PATH. Audio transcription will fail.")
            print("Please install FFmpeg: https://ffmpeg.org/download.html")
            print("Or use Chocolatey: choco install ffmpeg")

    async def process_video(self, video_path: str) -> Tuple[List[str], str]:
        """
        Process video to extract frames and transcribe audio
        Returns: (list of base64 encoded frames, transcript text)
        """
        frames = await self.extract_frames(video_path)
        transcript = await self.transcribe_audio(video_path)
        return frames, transcript

    async def extract_frames(self, video_path: str, max_frames: int = 10) -> List[str]:
        """
        Extract key frames from video and encode as base64
        """
        frames_b64 = []

        cap = cv2.VideoCapture(video_path)
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        fps = int(cap.get(cv2.CAP_PROP_FPS))

        # Extract frames at regular intervals
        if total_frames == 0:
            cap.release()
            return frames_b64

        # Sample frames evenly throughout the video
        frame_interval = max(1, total_frames // max_frames)

        frame_count = 0
        while len(frames_b64) < max_frames:
            ret, frame = cap.read()
            if not ret:
                break

            if frame_count % frame_interval == 0:
                # Resize frame to reduce size
                frame = cv2.resize(frame, (640, 480))

                # Encode frame as JPEG
                _, buffer = cv2.imencode('.jpg', frame)

                # Convert to base64
                frame_b64 = base64.b64encode(buffer).decode('utf-8')
                frames_b64.append(frame_b64)

            frame_count += 1

        cap.release()
        return frames_b64

    async def transcribe_audio(self, video_path: str) -> str:
        """
        Extract and transcribe audio from video using Whisper (local, no API key)
        """
        # Check if FFmpeg is available
        if not self.ffmpeg_path:
            error_msg = "FFmpeg is not installed or not in PATH. Please install FFmpeg to enable audio transcription."
            print(f"ERROR: {error_msg}")
            return f"[{error_msg}]"

        # Extract audio from video
        audio_path = video_path.replace(Path(video_path).suffix, ".wav")

        try:
            # Use ffmpeg to extract audio
            ffmpeg_cmd = [
                self.ffmpeg_path, "-i", video_path,
                "-vn",  # no video
                "-acodec", "pcm_s16le",  # audio codec
                "-ar", "16000",  # sample rate
                "-ac", "1",  # mono
                audio_path,
                "-y"  # overwrite
            ]

            result = subprocess.run(
                ffmpeg_cmd,
                check=True,
                capture_output=True,
                text=True
            )

            # Transcribe using Whisper
            segments, info = self.whisper_model.transcribe(audio_path, beam_size=5)

            # Combine all segments into full transcript
            transcript = " ".join([segment.text for segment in segments])

            # Cleanup audio file
            if os.path.exists(audio_path):
                os.remove(audio_path)

            return transcript.strip()

        except subprocess.CalledProcessError as e:
            error_detail = e.stderr if e.stderr else str(e)
            print(f"FFmpeg error: {error_detail}")
            return f"[Audio transcription failed - FFmpeg error: {error_detail}]"
        except FileNotFoundError as e:
            print(f"File not found error: {str(e)}")
            return "[FFmpeg not found. Please install FFmpeg and add it to your PATH.]"
        except Exception as e:
            print(f"Transcription error: {str(e)}")
            return f"[Audio transcription failed: {str(e)}]"
