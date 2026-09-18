"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight, Check, Clapperboard, Film, Image as ImageIcon, Infinity,
  Music2, Play, Sparkles, UploadCloud, WandSparkles, Zap, LockKeyhole
} from "lucide-react";

type Style = "Cinematic" | "Dark" | "Luxury" | "Love" | "Street" | "Concert";

const visualStyles: {name: Style; desc: string; emoji: string}[] = [
  { name: "Cinematic", desc: "Movie-grade lighting & camera", emoji: "🎬" },
  { name: "Dark", desc: "Moody, dramatic, high contrast", emoji: "🌑" },
  { name: "Luxury", desc: "Premium cars, fashion & nightlife", emoji: "💎" },
  { name: "Love", desc: "Warm, romantic & emotional", emoji: "❤️" },
  { name: "Street", desc: "Urban, raw & energetic", emoji: "🏙️" },
  { name: "Concert", desc: "Stage lights, crowd & performance", emoji: "🎤" }
];

function fmt(seconds: number) {
  if (!seconds || Number.isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [duration, setDuration] = useState(0);
  const [style, setStyle] = useState<Style>("Cinematic");
  const [ratio, setRatio] = useState("16:9");
  const [prompt, setPrompt] = useState("");
  const [freeAvailable, setFreeAvailable] = useState(true);
  const [status, setStatus] = useState<"idle"|"working"|"done"|"error">("idle");
  const [message, setMessage] = useState("");

  const imageInput = useRef<HTMLInputElement>(null);
  const audioInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/usage").then(r => r.json()).then(d => {
      setFreeAvailable(Boolean(d.freeAvailable));
    }).catch(() => {});
  }, []);

  const imagePreview = useMemo(() => image ? URL.createObjectURL(image) : "", [image]);
  const isOverFive = duration > 300;
  const isFree = Boolean(audio && duration > 0 && duration <= 300 && freeAvailable);
  const paymentNeeded = Boolean(audio && (!freeAvailable || isOverFive));

  function onAudio(file: File | null) {
    setAudio(file);
    setDuration(0);
    if (!file) return;

    const el = document.createElement("audio");
    el.preload = "metadata";
    el.src = URL.createObjectURL(file);
    el.onloadedmetadata = () => {
      setDuration(el.duration || 0);
      URL.revokeObjectURL(el.src);
    };
  }

  async function checkout() {
    setStatus("working");
    setMessage("Opening secure payment…");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({duration})
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Payment could not start.");
      location.href = data.url;
    } catch (e: any) {
      setStatus("error");
      setMessage(e?.message || "Payment could not start.");
    }
  }

  async function generateFree() {
    if (!image || !audio) return;

    setStatus("working");
    setMessage("AI Director is analyzing your song and visual…");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
          hasImage: true,
          hasAudio: true,
          duration,
          style,
          ratio,
          prompt,
          paid: false
        })
      });
      const data = await res.json();

      if (res.status === 402) {
        setFreeAvailable(false);
        setStatus("idle");
        setMessage(data.message);
        return;
      }

      if (!res.ok) throw new Error(data.error || "Generation failed.");

      setFreeAvailable(false);
      setStatus("done");
      setMessage("Your free daily video request was accepted. Real AI rendering provider can now be connected to this workflow.");
    } catch (e: any) {
      setStatus("error");
      setMessage(e?.message || "Something went wrong.");
    }
  }

  const canSubmit = Boolean(image && audio && duration > 0 && status !== "working");

  return (
    <main>
      <nav>
        <div className="brand">
          <div className="logo"><Clapperboard size={20}/></div>
          <span>LNK <b>AI VIDEO</b></span>
        </div>
        <div className="navlinks">
          <a href="#studio">Studio</a>
          <a href="#how">How it works</a>
          <a href="#rules">Free plan</a>
        </div>
        <a className="navcta" href="#studio">Create video <ArrowRight size={15}/></a>
      </nav>

      <section className="hero">
        <div className="glow one"/>
        <div className="glow two"/>
        <div className="eyebrow"><Sparkles size={14}/> AI MUSIC VIDEO GENERATOR</div>
        <h1>Your music.<br/><span>Your image.</span><br/>AI makes the video.</h1>
        <p>Upload your song and image. AI handles the visual direction, scene ideas, camera movement and final music-video concept.</p>

        <div className="heroActions">
          <a className="primary" href="#studio"><WandSparkles size={18}/> Create your free video</a>
          <a className="secondary" href="#how"><Play size={16}/> How it works</a>
        </div>

        <div className="freeRule">
          <div className="freeIcon"><Infinity/></div>
          <div>
            <b>1 FREE MUSIC VIDEO EVERY DAY</b>
            <span>Up to 5 minutes. No subscription required.</span>
          </div>
        </div>
      </section>

      <section className="studioSection" id="studio">
        <div className="sectionHead">
          <div><small>AI STUDIO</small><h2>Create your music video</h2></div>
          <div className={freeAvailable ? "statusBadge available" : "statusBadge used"}>
            {freeAvailable ? <><Zap size={14}/> FREE VIDEO AVAILABLE</> : <><LockKeyhole size={14}/> FREE VIDEO USED TODAY</>}
          </div>
        </div>

        <div className="studio">
          <div className="left">
            <h3><span>1</span> Upload your image and music</h3>

            <div className="uploads">
              <button className={"upload " + (image ? "filled" : "")} onClick={() => imageInput.current?.click()}>
                <input ref={imageInput} hidden type="file" accept="image/png,image/jpeg,image/webp" onChange={e => setImage(e.target.files?.[0] || null)} />
                {imagePreview
                  ? <img src={imagePreview} alt="Uploaded preview"/>
                  : <><div className="uploadIcon"><ImageIcon/></div><b>Upload image</b><small>JPG, PNG or WEBP</small></>}
                {image && <i>{image.name}</i>}
              </button>

              <button className={"upload " + (audio ? "filled" : "")} onClick={() => audioInput.current?.click()}>
                <input ref={audioInput} hidden type="file" accept="audio/*" onChange={e => onAudio(e.target.files?.[0] || null)} />
                <div className="uploadIcon"><Music2/></div>
                <b>{audio ? "Music uploaded" : "Upload music"}</b>
                <small>{audio ? `${audio.name} • ${fmt(duration)}` : "MP3, WAV, M4A or AAC"}</small>
                {duration > 0 && <i className={isOverFive ? "warn" : "ok"}>
                  {isOverFive ? "Over 5:00 — paid video" : "Eligible for daily free video"}
                </i>}
              </button>
            </div>

            <h3><span>2</span> Pick the visual direction</h3>
            <div className="styles">
              {visualStyles.map(s => (
                <button key={s.name} className={"style " + (style === s.name ? "active" : "")} onClick={() => setStyle(s.name)}>
                  <div className="emoji">{s.emoji}</div>
                  <div><b>{s.name}</b><small>{s.desc}</small></div>
                  {style === s.name && <Check className="check" size={15}/>}
                </button>
              ))}
            </div>

            <h3><span>3</span> Describe your idea <em>optional</em></h3>
            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Example: night drive through neon city, cinematic rain, emotional close-ups, slow camera, powerful chorus..."
            />
          </div>

          <aside className="right">
            <div className="preview">
              <div className="previewBar"><span>PREVIEW</span><span>{ratio}</span></div>
              <div className="screen">
                {imagePreview ? <img src={imagePreview} alt="Preview"/> : <Film size={48}/>}
                <div className="play"><Play fill="currentColor" size={17}/></div>
              </div>
            </div>

            <label className="settingLabel">Video format</label>
            <div className="segments">
              {["16:9","9:16","1:1"].map(r => (
                <button key={r} className={ratio === r ? "active" : ""} onClick={() => setRatio(r)}>{r}</button>
              ))}
            </div>

            <div className="policyBox" id="rules">
              <Sparkles size={20}/>
              <div>
                <b>{isFree ? "This video is FREE" : paymentNeeded ? "Paid generation" : "Daily free video"}</b>
                <span>
                  {!audio ? "Upload a song to check eligibility."
                  : isOverFive ? "This track is longer than 5 minutes."
                  : freeAvailable ? "You still have today's free generation."
                  : "Today's free generation has already been used."}
                </span>
              </div>
            </div>

            <button
              className={"generate " + (paymentNeeded ? "pay" : "")}
              disabled={!canSubmit}
              onClick={paymentNeeded ? checkout : generateFree}
            >
              {status === "working"
                ? "Processing…"
                : paymentNeeded
                  ? <><LockKeyhole size={18}/> Continue to payment</>
                  : <><WandSparkles size={18}/> Generate FREE video</>}
            </button>

            {message && <p className={"message " + status}>{message}</p>}

            <p className="fineprint">Free allowance: 1 completed music video per day, maximum 5:00. Extra videos are paid.</p>
          </aside>
        </div>
      </section>

      <section className="how" id="how">
        <small>HOW IT WORKS</small>
        <h2>From a song to a visual story.</h2>
        <div className="steps">
          <article><div>01</div><UploadCloud/><h3>Upload</h3><p>Add your music and one main photo or cover image.</p></article>
          <article><div>02</div><Sparkles/><h3>AI directs</h3><p>AI plans the look, scene movement, transitions and camera style.</p></article>
          <article><div>03</div><Film/><h3>Export</h3><p>Generate the final version for YouTube, TikTok, Reels or Shorts.</p></article>
        </div>
      </section>

      <section className="rules">
        <div className="rulesCard">
          <div>
            <small>FREE EVERY DAY</small>
            <h2>One full music video. Every day.</h2>
            <p>Your first eligible generation of the day is free when the uploaded song is 5 minutes or shorter. After that, extra videos are paid.</p>
          </div>
          <div className="ruleList">
            <span><Check/> 1 free generation per day</span>
            <span><Check/> Up to 5:00 song length</span>
            <span><Check/> 16:9, 9:16 and 1:1</span>
            <span><Check/> No subscription required</span>
          </div>
        </div>
      </section>

      <footer>
        <div className="brand"><div className="logo"><Clapperboard size={18}/></div><span>LNK AI VIDEO</span></div>
        <span>AI-powered music video studio</span>
      </footer>
    </main>
  );
}
