import { Track } from "livekit-client";
import { useEffect, useState, useRef } from "react";

const normalizeFrequencies = (frequencies: Float32Array) => {
  const normalizeDb = (value: number) => {
    const minDb = -100;
    const maxDb = -10;
    let db = 1 - (Math.max(minDb, Math.min(maxDb, value)) * -1) / 100;
    db = Math.sqrt(db);

    return db;
  };

  // Normalize all frequency values
  return frequencies.map((value) => {
    if (value === -Infinity) {
      return 0;
    }
    return normalizeDb(value);
  });
};

export const useMultibandTrackVolume = (
  track?: Track,
  bands: number = 5,
  loPass: number = 100,
  hiPass: number = 600,
) => {
  const [frequencyBands, setFrequencyBands] = useState<Float32Array[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    if (!track?.mediaStream) {
      return;
    }

    // Only create new audio context if we don't have one
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const ctx = audioContextRef.current;
    
    // Clean up previous source if it exists
    if (sourceRef.current) {
      sourceRef.current.disconnect();
    }

    sourceRef.current = ctx.createMediaStreamSource(track.mediaStream);
    analyserRef.current = ctx.createAnalyser();
    analyserRef.current.fftSize = 2048;
    sourceRef.current.connect(analyserRef.current);

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Float32Array(bufferLength);

    const updateVolume = () => {
      if (!analyserRef.current) return;
      
      analyserRef.current.getFloatFrequencyData(dataArray);
      let frequencies: Float32Array = new Float32Array(dataArray.length);
      for (let i = 0; i < dataArray.length; i++) {
        frequencies[i] = dataArray[i];
      }
      frequencies = frequencies.slice(loPass, hiPass);

      const normalizedFrequencies = normalizeFrequencies(frequencies);
      const chunkSize = Math.ceil(normalizedFrequencies.length / bands);
      const chunks: Float32Array[] = [];
      for (let i = 0; i < bands; i++) {
        chunks.push(
          normalizedFrequencies.slice(i * chunkSize, (i + 1) * chunkSize),
        );
      }

      setFrequencyBands(chunks);
    };

    const interval = setInterval(updateVolume, 10);

    return () => {
      clearInterval(interval);
      if (sourceRef.current) {
        sourceRef.current.disconnect();
      }
    };
  }, [track, bands, loPass, hiPass]); // Remove track.mediaStream from dependencies

  return frequencyBands;
};
