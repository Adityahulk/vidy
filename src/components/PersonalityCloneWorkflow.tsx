import React, { useState, useEffect } from 'react';
import { Upload, Mic, Video, Loader, Check, AlertCircle, Play } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../lib/api';
import { db, VoiceClone } from '../lib/db';

type Step = 'voice-check' | 'voice-clone' | 'video-upload' | 'script-input' | 'generating' | 'completed';

interface WorkflowState {
  step: Step;
  voiceClone: VoiceClone | null;
  videoFile: File | null;
  videoUrl: string | null;
  script: string;
  generationId: string | null;
  outputUrl: string | null;
  estimatedCost: number | null;
  error: string | null;
}

export default function PersonalityCloneWorkflow() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<VoiceClone[]>([]);
  const [state, setState] = useState<WorkflowState>({
    step: 'voice-check',
    voiceClone: null,
    videoFile: null,
    videoUrl: null,
    script: '',
    generationId: null,
    outputUrl: null,
    estimatedCost: null,
    error: null,
  });

  const [voiceCloneForm, setVoiceCloneForm] = useState({
    name: '',
    audioFiles: [] as File[],
  });

  useEffect(() => {
    if (user) {
      loadVoiceClones();
    }
  }, [user]);

  const loadVoiceClones = async () => {
    if (!user) return;
    try {
      const voices = await db.voiceClones.getAll(user.id);
      setAvailableVoices(voices);

      const activeVoice = voices.find(v => v.is_active);
      if (activeVoice) {
        setState(prev => ({ ...prev, voiceClone: activeVoice }));
      }
    } catch (error) {
      console.error('Failed to load voice clones:', error);
    }
  };

  const handleCreateVoiceClone = async () => {
    if (!user || voiceCloneForm.audioFiles.length === 0) return;

    setLoading(true);
    setState(prev => ({ ...prev, error: null }));

    try {
      const response = await api.cloneVoice(voiceCloneForm.name, voiceCloneForm.audioFiles);

      const voiceClone = await db.voiceClones.create({
        user_id: user.id,
        voice_id: response.voice_id,
        name: response.name,
        description: response.description,
        is_active: true,
      });

      setState(prev => ({ ...prev, voiceClone, step: 'video-upload' }));
      setAvailableVoices(prev => [voiceClone, ...prev]);
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message }));
    } finally {
      setLoading(false);
    }
  };

  const handleSelectExistingVoice = async (voiceId: string) => {
    if (!user) return;

    const voice = availableVoices.find(v => v.id === voiceId);
    if (!voice) return;

    await db.voiceClones.setActive(voiceId, user.id);
    setState(prev => ({ ...prev, voiceClone: voice, step: 'video-upload' }));
  };

  const handleVideoUpload = async (file: File) => {
    setLoading(true);
    setState(prev => ({ ...prev, error: null }));

    try {
      const { url } = await api.uploadVideo(file);
      setState(prev => ({ ...prev, videoFile: file, videoUrl: url, step: 'script-input' }));
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message }));
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!user || !state.voiceClone || !state.videoUrl || !state.script) return;

    setLoading(true);
    setState(prev => ({ ...prev, error: null, step: 'generating' }));

    try {
      const estimateData = {
        input: [
          { type: 'video' as const, url: state.videoUrl },
          {
            type: 'text' as const,
            provider: {
              ElevenLabs: {
                name: 'elevenlabs',
                voiceId: state.voiceClone.voice_id,
                script: state.script,
              },
            },
          },
        ],
        model: 'sync-2',
        options: { sync_mode: 'loop' },
      };

      const costEstimate = await api.estimateCost(estimateData);
      setState(prev => ({ ...prev, estimatedCost: costEstimate.estimatedGenerationCost }));

      const generation = await api.createGeneration(estimateData);

      const dbGeneration = await db.generations.create({
        user_id: user.id,
        generation_id: generation.id,
        voice_clone_id: state.voiceClone.id,
        video_url: state.videoUrl,
        script: state.script,
        model: 'sync-2',
        status: generation.status,
        output_url: null,
        output_duration: null,
        estimated_cost: costEstimate.estimatedGenerationCost,
        service_type: 'personality-clone',
        metadata: { sync_mode: 'loop' },
      });

      setState(prev => ({ ...prev, generationId: generation.id }));

      await api.pollGenerationStatus(generation.id, async (status) => {
        await db.generations.update(dbGeneration.id, {
          status: status.status,
          output_url: status.output_url,
          output_duration: status.output_duration,
        });

        if (status.status === 'COMPLETED' && status.output_url) {
          setState(prev => ({
            ...prev,
            outputUrl: status.output_url,
            step: 'completed',
          }));
          setLoading(false);
        }
      });
    } catch (error: any) {
      setState(prev => ({ ...prev, error: error.message, step: 'script-input' }));
      setLoading(false);
    }
  };

  const resetWorkflow = () => {
    setState({
      step: 'voice-check',
      voiceClone: state.voiceClone,
      videoFile: null,
      videoUrl: null,
      script: '',
      generationId: null,
      outputUrl: null,
      estimatedCost: null,
      error: null,
    });
  };

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400">Please sign in to use Personality Clone</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {state.error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-400 font-medium">Error</p>
            <p className="text-red-300 text-sm">{state.error}</p>
          </div>
        </div>
      )}

      {state.step === 'voice-check' && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Voice Clone Setup</h2>
            <p className="text-slate-400">Choose an existing voice clone or create a new one</p>
          </div>

          {availableVoices.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Your Voice Clones</h3>
              <div className="space-y-3">
                {availableVoices.map((voice) => (
                  <button
                    key={voice.id}
                    onClick={() => handleSelectExistingVoice(voice.id)}
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:border-blue-500/50 transition-all text-left flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <Mic className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-white font-medium">{voice.name}</p>
                        {voice.description && <p className="text-slate-400 text-sm">{voice.description}</p>}
                      </div>
                    </div>
                    {voice.is_active && (
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">Active</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Create New Voice Clone</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Voice Clone Name</label>
                <input
                  type="text"
                  value={voiceCloneForm.name}
                  onChange={(e) => setVoiceCloneForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="My Professional Voice"
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Upload Audio Samples (min 2 files)
                </label>
                <input
                  type="file"
                  multiple
                  accept="audio/*"
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setVoiceCloneForm(prev => ({ ...prev, audioFiles: files }));
                  }}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                />
                {voiceCloneForm.audioFiles.length > 0 && (
                  <p className="text-slate-400 text-sm mt-2">{voiceCloneForm.audioFiles.length} files selected</p>
                )}
              </div>

              <button
                onClick={handleCreateVoiceClone}
                disabled={loading || !voiceCloneForm.name || voiceCloneForm.audioFiles.length < 2}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Creating Voice Clone...</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5" />
                    <span>Create Voice Clone</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {state.step === 'video-upload' && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">Voice Clone Ready</h2>
            <p className="text-slate-400">Now upload your video</p>
          </div>

          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-8 text-center">
            <Video className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Upload Video</h3>
            <p className="text-slate-400 mb-6">Upload the video you want to lip-sync with your voice</p>

            <input
              type="file"
              accept="video/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleVideoUpload(file);
              }}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
            />

            {loading && (
              <div className="mt-6 flex items-center justify-center space-x-2 text-blue-400">
                <Loader className="w-5 h-5 animate-spin" />
                <span>Uploading video...</span>
              </div>
            )}
          </div>
        </div>
      )}

      {state.step === 'script-input' && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <Check className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">Video Uploaded</h2>
            <p className="text-slate-400">Enter your script</p>
          </div>

          <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Script</label>
            <textarea
              value={state.script}
              onChange={(e) => setState(prev => ({ ...prev, script: e.target.value }))}
              placeholder="Enter the text you want your personality clone to speak..."
              rows={8}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none resize-none"
            />

            <button
              onClick={handleGenerateVideo}
              disabled={loading || !state.script.trim()}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Play className="w-5 h-5" />
              <span>Generate Video</span>
            </button>
          </div>
        </div>
      )}

      {state.step === 'generating' && (
        <div className="text-center py-12">
          <Loader className="w-16 h-16 text-blue-400 animate-spin mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-white mb-2">Generating Your Video</h2>
          <p className="text-slate-400 mb-4">This may take a few minutes...</p>
          {state.estimatedCost && (
            <p className="text-slate-500 text-sm">Estimated cost: ${state.estimatedCost.toFixed(2)}</p>
          )}
        </div>
      )}

      {state.step === 'completed' && state.outputUrl && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <Check className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">Video Generated!</h2>
            <p className="text-slate-400">Your personality clone video is ready</p>
          </div>

          <div className="bg-slate-800/30 border border-slate-700 rounded-xl overflow-hidden">
            <video
              src={state.outputUrl}
              controls
              className="w-full aspect-video bg-black"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={resetWorkflow}
              className="flex-1 bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-600 transition-all"
            >
              Create Another
            </button>
            <a
              href={state.outputUrl}
              download
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all text-center"
            >
              Download Video
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
