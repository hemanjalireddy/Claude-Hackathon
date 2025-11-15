import { useState, useRef } from 'react'
import { Upload, Video, X } from 'lucide-react'
import axios from 'axios'

type PersonaType = 'investor' | 'advisor' | 'healthcare' | 'edtech' | 'tech'

interface VideoUploaderProps {
  persona: PersonaType
  onAnalysisStart: () => void
  onAnalysisComplete: (result: any) => void
  isAnalyzing: boolean
}

export default function VideoUploader({
  persona,
  onAnalysisStart,
  onAnalysisComplete,
  isAnalyzing
}: VideoUploaderProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([])
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('video/')) {
        setError('Please select a valid video file')
        return
      }
      setVideoFile(file)
      setVideoPreview(URL.createObjectURL(file))
      setError(null)
    }
  }

  // Start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })

      // Try different mimeTypes with audio codecs for better compatibility
      let options: MediaRecorderOptions = { mimeType: 'video/webm;codecs=vp9,opus' }

      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = { mimeType: 'video/webm;codecs=vp8,opus' }
      }
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = { mimeType: 'video/webm' }
      }
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = { mimeType: 'video/mp4' }
      }

      const mediaRecorder = new MediaRecorder(stream, options)

      mediaRecorderRef.current = mediaRecorder
      const chunks: Blob[] = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' })
        const file = new File([blob], 'recorded-pitch.webm', { type: 'video/webm' })
        setVideoFile(file)
        setVideoPreview(URL.createObjectURL(blob))
        setRecordedChunks(chunks)

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop())
      }

      // Show preview
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      mediaRecorder.start()
      setIsRecording(true)
      setError(null)
    } catch (err) {
      setError('Unable to access camera/microphone. Please check permissions.')
      console.error(err)
    }
  }

  // Stop recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      // Clear video preview
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
        videoRef.current.srcObject = null
      }
    }
  }

  // Remove video
  const handleRemoveVideo = () => {
    setVideoFile(null)
    setVideoPreview(null)
    setRecordedChunks([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Submit for analysis
  const handleAnalyze = async () => {
    if (!videoFile) return

    onAnalysisStart()
    setError(null)

    const formData = new FormData()
    formData.append('video', videoFile)
    formData.append('persona', persona)

    try {
      const response = await axios.post(
        'http://localhost:8000/api/analyze-pitch',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          timeout: 300000 // 5 minutes timeout
        }
      )

      onAnalysisComplete(response.data)
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to analyze pitch. Please try again.')
      console.error('Analysis error:', err)
    }
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-700/50">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-100 mb-2">Upload or Record Your Pitch</h2>
        <p className="text-slate-400">Capture your presentation for expert analysis</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {!videoFile ? (
        <div className="space-y-4">
          {/* Upload Option */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="group border-2 border-dashed border-slate-600 rounded-xl p-12 text-center cursor-pointer hover:border-indigo-500 hover:bg-slate-700/30 transition-all duration-300"
          >
            <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 mb-4 group-hover:scale-110 transition-transform duration-300">
              <Upload className="w-8 h-8 text-white" />
            </div>
            <p className="text-lg font-semibold text-slate-200 mb-2">Click to upload video</p>
            <p className="text-sm text-slate-400">MP4, MOV, WebM up to 100MB</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={isAnalyzing}
            />
          </div>

          {/* Record Option */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-800 text-slate-400 font-medium">OR</span>
            </div>
          </div>

          {isRecording ? (
            <div className="space-y-4">
              <div className="relative bg-black rounded-xl overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-auto min-h-[400px] object-contain"
                />
                <div className="absolute top-4 left-4 flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-full animate-pulse">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                  <span className="font-semibold">Recording...</span>
                </div>
              </div>
              <button
                onClick={stopRecording}
                className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-bold hover:from-red-600 hover:to-pink-700 transition-all shadow-lg shadow-red-500/30 flex items-center justify-center space-x-2"
              >
                <div className="w-4 h-4 bg-white rounded-sm"></div>
                <span>Stop Recording</span>
              </button>
            </div>
          ) : (
            <button
              onClick={startRecording}
              disabled={isAnalyzing}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold hover:from-indigo-600 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Video className="w-5 h-5" />
              <span>Record Pitch</span>
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {/* Video Preview */}
          <div className="relative rounded-xl overflow-hidden bg-black border-2 border-slate-700">
            <video
              src={videoPreview || undefined}
              controls
              className="w-full"
            />
            <button
              onClick={handleRemoveVideo}
              disabled={isAnalyzing}
              className="absolute top-4 right-4 p-2 bg-red-500/90 backdrop-blur-sm text-white rounded-full hover:bg-red-600 transition-all shadow-lg disabled:opacity-50"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full py-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-indigo-500/40 relative overflow-hidden group"
          >
            {isAnalyzing && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            )}
            <span className="relative z-10 flex items-center justify-center space-x-2">
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Analyzing Your Pitch...</span>
                </>
              ) : (
                <span>Analyze My Pitch</span>
              )}
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
