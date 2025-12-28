import React, { useState, useRef } from 'react';
import { Icons } from './Icons';
import { Testimonial } from '../types';

interface TestimonialRecorderProps {
  onSubmit: (testimonial: Testimonial) => void;
  onCancel: () => void;
}

const TestimonialRecorder: React.FC<TestimonialRecorderProps> = ({ onSubmit, onCancel }) => {
  const [mode, setMode] = useState<'initial' | 'recording' | 'preview'>('initial');
  const [isRecording, setIsRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setMode('recording');
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const startRecording = () => {
    if (!streamRef.current) return;
    
    chunksRef.current = []; // Reset chunks
    const mediaRecorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
      stopCamera();
      setMode('preview');
      setIsRecording(false);
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setMode('preview');
    }
  };

  const handleSubmit = () => {
    if (!videoUrl || !name || !location) {
      alert("Please fill in your name and location.");
      return;
    }

    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      name,
      location,
      videoUrl,
      date: new Date().toLocaleDateString()
    };
    
    onSubmit(newTestimonial);
  };

  const reset = () => {
    stopCamera();
    setVideoUrl(null);
    chunksRef.current = [];
    setMode('initial');
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl border border-slate-200 max-w-lg mx-auto w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-slate-800">Share Your Experience</h3>
        <button onClick={onCancel} className="text-slate-400 hover:text-slate-600">
          <Icons.X className="h-6 w-6" />
        </button>
      </div>

      {mode === 'initial' && (
        <div className="space-y-4">
          <p className="text-slate-600 mb-6">Record a quick video or upload one to tell us what you think about our service.</p>
          
          <button 
            onClick={startCamera}
            className="w-full py-4 bg-slate-900 text-white rounded-lg font-bold flex items-center justify-center hover:bg-slate-800 transition"
          >
            <Icons.Camera className="h-6 w-6 mr-3" />
            Record Video
          </button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">Or</span>
            </div>
          </div>

          <label className="w-full py-4 bg-white border-2 border-dashed border-slate-300 text-slate-700 rounded-lg font-bold flex items-center justify-center cursor-pointer hover:border-amber-500 hover:text-amber-500 transition">
            <Icons.UploadCloud className="h-6 w-6 mr-3" />
            Upload Video File
            <input type="file" accept="video/*" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
      )}

      {mode === 'recording' && (
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
            <video ref={videoRef} className="w-full h-full object-cover" muted playsInline />
            {isRecording && (
              <div className="absolute top-4 right-4 flex items-center space-x-2 bg-red-600 px-3 py-1 rounded-full text-white text-xs animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span>Recording</span>
              </div>
            )}
          </div>
          
          <div className="flex space-x-4">
            {!isRecording ? (
              <button 
                onClick={startRecording}
                className="w-16 h-16 bg-red-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center hover:bg-red-700 transition"
              >
                <div className="w-6 h-6 bg-white rounded-full"></div>
              </button>
            ) : (
              <button 
                onClick={stopRecording}
                className="w-16 h-16 bg-white border-4 border-red-600 rounded-full shadow-lg flex items-center justify-center hover:bg-slate-100 transition"
              >
                <Icons.StopCircle className="h-8 w-8 text-red-600" />
              </button>
            )}
          </div>
          <button onClick={reset} className="text-sm text-slate-500 underline">Cancel Recording</button>
        </div>
      )}

      {mode === 'preview' && videoUrl && (
        <div className="space-y-4">
          <video src={videoUrl} controls autoPlay className="w-full rounded-lg bg-black aspect-video" />
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="Kampala"
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-2">
            <button 
              onClick={reset}
              className="flex-1 py-3 border border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-50 transition flex justify-center items-center"
            >
              <Icons.Trash2 className="h-5 w-5 mr-2" />
              Retake
            </button>
            <button 
              onClick={handleSubmit}
              className="flex-1 py-3 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition shadow-md"
            >
              Submit Video
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialRecorder;