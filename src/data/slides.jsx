import React from 'react';
import BrainScene from '../components/BrainScene';
import HUD from '../components/HUD';
import MermaidDiagram from '../components/MermaidDiagram';
import RuleCard from '../components/RuleCard';
import PaperCarousel from '../components/PaperCarousel';

const slides = [
  /* ─── SLIDE 1: Title ─── */
  {
    id: 'title',
    title: 'Title',
    className: 'title-s',
    ariaLabel: 'Title Slide',
    content: () => (
      <div className="slide-inner">
        <div className="title-bg" />
        <BrainScene />
        <HUD />
        <div className="title-content">
          <div className="tbadge">
            <span className="dot" />Master&apos;s Thesis Defense &nbsp;&middot;&nbsp; June 2026
          </div>
          <h1 className="slide-title" style={{ animation: 'fadeUp .5s var(--ease-out-expo) .1s both' }}>
            NeuroDetect Lite
          </h1>
          <p className="slide-subtitle" style={{ animation: 'fadeUp .5s var(--ease-out-expo) .2s both' }}>
            Lightweight Deep Learning Models for Early Alzheimer&apos;s Detection using Neurosymbolic Hybrid Architecture
          </p>
          <p className="meta" style={{ animation: 'fadeUp .5s var(--ease-out-expo) .3s both' }}>
            <strong>Mohamed Oussama Belalia</strong> &amp; <strong>Kheireddine Belghitar</strong><br />
            Supervisor: Prof. Tahar Zioual &nbsp;&middot;&nbsp; Ibn Khaldoun University, Tiaret
          </p>
          <div className="metrics" style={{ justifyContent: 'center', marginTop: 40, animation: 'fadeUp .5s var(--ease-out-expo) .4s both' }}>
            <div className="metric"><div className="metric-val">73.86%</div><div className="metric-lbl">Gated Accuracy</div></div>
            <div className="metric"><div className="metric-val">1.93 MB</div><div className="metric-lbl">Model Size</div></div>
            <div className="metric"><div className="metric-val">10 ms</div><div className="metric-lbl">CPU Inference</div></div>
            <div className="metric"><div className="metric-val">+18.18</div><div className="metric-lbl">Gate Improvement</div></div>
          </div>
        </div>
      </div>
    ),
  },

  /* ─── SLIDE 2: Problem & Motivation ─── */
  {
    id: 'problem',
    title: 'Problem & Motivation',
    className: '',
    ariaLabel: 'Problem and Motivation',
    content: () => (
      <div className="slide-inner">
        <div className="s-tag a1">Motivation</div>
        <h2 className="s-title">Problem &amp; Motivation</h2>
        <div className="s-div" />
        <p className="s-sub a1">Bridging the gap between high-performance deep learning and resource-constrained clinical environments.</p>
        <div className="two a2" style={{ marginTop: 16, alignItems: 'stretch' }}>
          <div>
            <div className="c" style={{ marginBottom: 12 }}>
              <div className="c-head">
                <div className="c-ico">
                  <svg className="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
                <h3>Clinical Burden &amp; Early Detection</h3>
              </div>
              <p>Alzheimer&apos;s accounts for 60&ndash;80% of global dementia cases. Structural MRI reveals atrophy years before symptoms, but manual screening is time-consuming and prone to biases.</p>
            </div>
            <div className="c">
              <div className="c-head">
                <div className="c-ico">
                  <svg className="ico" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
                </div>
                <h3>The Deployment Bottleneck</h3>
              </div>
              <p>SOTA models (20M+ params) need GPU clusters unavailable in rural clinics. GDPR/HIPAA restrict cloud, demanding offline local execution.</p>
            </div>
          </div>
          <div>
            <div className="media-card" style={{ height: '100%', padding: 8, background: 'var(--glass)' }}>
              <img src="assets/mcitrap.png" alt="MCI Trap visualization" loading="lazy" style={{ objectFit: 'contain', maxHeight: '100%' }} />
            </div>
          </div>
        </div>
        <div className="metrics a3">
          <div className="metric"><div className="metric-val">55M</div><div className="metric-lbl">Dementia Cases</div></div>
          <div className="metric"><div className="metric-val">$1.3T</div><div className="metric-lbl">Annual Cost</div></div>
          <div className="metric"><div className="metric-val">60&ndash;70%</div><div className="metric-lbl">MCI Disagreement</div></div>
          <div className="metric"><div className="metric-val">4&times;</div><div className="metric-lbl">Compression</div></div>
        </div>
      </div>
    ),
  },

  /* ─── SLIDE 3: Related Work ─── */
  {
    id: 'related',
    title: 'Related Work',
    className: '',
    ariaLabel: 'Related Work',
    content: () => (
      <div className="slide-inner">
        <div className="s-tag a1">Background</div>
        <h2 className="s-title">Related Work</h2>
        <div className="s-div" />
        <p className="s-sub a1">Positioning NeuroDetect Lite against existing paradigms: nnU-Net, MONAI, FastSurf, and lightweight architectures.</p>
        <p className="s-sub a2" style={{ fontSize: 22, color: 'var(--text2)', marginTop: -8 }}>
          Evaluated on <strong>ADNI</strong> (Alzheimer&apos;s Disease Neuroimaging Initiative) and <strong>OASIS</strong> (Open Access Series of Imaging Studies) &mdash; the two standard public MRI benchmarks for AD classification.
        </p>
        <div className="two a2" style={{ marginTop: 16, alignItems: 'stretch' }}>
          <div>
            <div className="c" style={{ marginBottom: 12 }}>
              <div className="c-head">
                <div className="c-ico" style={{ background: 'var(--teal-pale)', color: 'var(--teal)' }}>
                  <svg className="ico" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <h3>High-Performance Paradigm</h3>
              </div>
              <p><strong>nnU-Net</strong> (Isensee 2021): Self-configuring 3D U-Net, SOTA on medical segmentation. GPU cluster, 30M+ params. <strong>MONAI</strong>: PyTorch medical imaging framework. Strong but heavyweight.</p>
            </div>
            <div className="c">
              <div className="c-head">
                <div className="c-ico" style={{ background: 'var(--green-bg)', color: 'var(--green)' }}>
                  <svg className="ico" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                </div>
                <h3>Our Contribution</h3>
              </div>
              <p><strong>NeuroDetect Lite</strong> fills the gap: lightweight (0.63M params), CPU-only (10ms), with a deterministic clinical gate that existing frameworks lack entirely.</p>
            </div>
          </div>
          <div>
            <div className="c" style={{ marginBottom: 12 }}>
              <div className="c-head">
                <div className="c-ico" style={{ background: '#f1f5f9', color: '#475569' }}>
                  <svg className="ico" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/><line x1="15" y1="3" x2="15" y2="21"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>
                </div>
                <h3>Lightweight Edge Paradigm</h3>
              </div>
              <p><strong>FastSurf</strong> (Sheller 2020): 3D CNN, 3.4M params, ~50ms. <strong>GhostNet</strong> (Han 2020): Ghost modules for efficiency. <strong>TinyViT</strong> (Wang 2022): Compact ViT for edge.</p>
            </div>
            <div className="c">
              <div className="c-head">
                <div className="c-ico" style={{ background: 'var(--amber-bg)', color: 'var(--amber)' }}>
                  <svg className="ico" viewBox="0 0 24 24"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
                </div>
                <h3>The Gap</h3>
              </div>
              <p>No framework combines <strong>lightweight neural + deterministic clinical gate + edge deployment</strong>. Prior work is either accurate-but-heavy or fast-but-inconsistent.</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  /* ─── SLIDE 4: System Overview ─── */
  {
    id: 'overview',
    title: 'System Overview',
    className: '',
    ariaLabel: 'System Overview',
    content: () => (
      <div className="slide-inner">
        <div className="s-tag a1">Architecture</div>
        <h2 className="s-title">System Overview</h2>
        <div className="s-div" />
        <p className="s-sub a1">The symbolic MMSE gate &mdash; not the neural ensemble alone &mdash; is the primary accuracy driver (+18.18 pts, p=0.003).</p>
        <MermaidDiagram className="a2" chart={`flowchart LR
      A["MRI Volume<br/>ADNI / OASIS T1w"] --> B["Preprocessing<br/>Z-score, 2.5D"]
B --> C["Neural Ensemble<br/>6-model weighted"]
C --> D{"MMSE Gate<br/>7 DSM-5 Rules"}
D --> E["Clinical Decision<br/>CN / MCI / AD"]
D -.-> F["Alert Level<br/>INFO / REVIEW / ESCALATE"]
style A fill:#E0F4F5,stroke:#0D7377,color:#0B1728,stroke-width:2px
style B fill:#E0F4F5,stroke:#0D7377,color:#0B1728,stroke-width:2px
style C fill:#E0F4F5,stroke:#0D7377,color:#0B1728,stroke-width:2px
style D fill:#FEF3C7,stroke:#D97706,color:#0B1728,stroke-width:2px
style E fill:#F0FDF4,stroke:#16A34A,color:#0B1728,stroke-width:2px
style F fill:#F8FAFC,stroke:#94A3B8,color:#475569,stroke-width:1.5px,stroke-dasharray:5`} />
        <div className="metrics a3">
          <div className="metric"><div className="metric-val">7-ch</div><div className="metric-lbl">2.5D Input</div></div>
          <div className="metric"><div className="metric-val">7</div><div className="metric-lbl">DSM-5 Rules</div></div>
          <div className="metric"><div className="metric-val">10 ms</div><div className="metric-lbl">CPU Inference</div></div>
          <div className="metric"><div className="metric-val">1.93 MB</div><div className="metric-lbl">Fully Offline</div></div>
          <div className="metric"><div className="metric-val">Tauri</div><div className="metric-lbl">Desktop / Android / iOS</div></div>
        </div>
      </div>
    ),
  },

  /* ─── SLIDE 5: 2.5D Input ─── */
  {
    id: 'input',
    title: '2.5D Input',
    className: '',
    ariaLabel: '2.5D Input Representation',
    content: () => (
      <div className="slide-inner">
        <div className="s-tag a1">Methodology</div>
        <h2 className="s-title">2.5D Input Representation</h2>
        <div className="s-div" />
        <div className="two a2" style={{ marginTop: 12 }}>
          <div>
            <div className="media-card" style={{ height: '100%', padding: 4, background: '#050D1A' }}>
              <video src="assets/2.5d_preprocessing.mp4" autoPlay muted loop playsInline preload="none" controls style={{ objectFit: 'contain', maxHeight: '100%', cursor: 'pointer' }} />
            </div>
          </div>
          <div>
            <div className="media-card" style={{ height: '100%', padding: 8, background: 'var(--glass)' }}>
              <img src="assets/3dvs2.5d.png" alt="3D vs 2.5D comparison" loading="lazy" style={{ objectFit: 'contain', maxHeight: '100%' }} />
            </div>
          </div>
        </div>
      </div>
    ),
  },

  /* ─── SLIDE 6: LightAlzNet Architecture ─── */
  {
    id: 'lightalznet',
    title: 'LightAlzNet',
    className: '',
    ariaLabel: 'LightAlzNet Architecture',
    content: () => (
      <div className="slide-inner" style={{ justifyContent: 'flex-start', paddingTop: 52, paddingBottom: 80, overflowY: 'auto' }}>
        <div className="s-tag a1">Novel Contribution</div>
        <h2 className="s-title">LightAlzNet Architecture</h2>
        <div className="s-div" />
        <MermaidDiagram className="a2" chart={`flowchart LR
      A["7-Ch 2.5D<br/>[B,7,224,224]"] --> B["Stem Conv 3x3<br/>BN+ReLU, 32f"]
B --> C["Block 1<br/>DW-Sep+SE<br/>64f"]
C --> D["Block 2<br/>DW-Sep+SE<br/>128f"]
D --> E["Block 3<br/>DW-Sep+SE<br/>192f"]
E --> F["Block 4<br/>DW-Sep+SE<br/>256f"]
F --> G["GlobalAvgPool<br/>->256-dim"]
G --> H["FC Classifier<br/>256->3<br/>CN/MCI/AD"]
style A fill:#E0F4F5,stroke:#0D7377,color:#0B1728,stroke-width:2px
style B fill:#E0F4F5,stroke:#0D7377,color:#0B1728,stroke-width:2px
style C fill:#E0F4F5,stroke:#0D7377,color:#0B1728,stroke-width:2px
style D fill:#E0F4F5,stroke:#0D7377,color:#0B1728,stroke-width:2px
style E fill:#E0F4F5,stroke:#0D7377,color:#0B1728,stroke-width:2px
style F fill:#E0F4F5,stroke:#0D7377,color:#0B1728,stroke-width:2px
style G fill:#F8FAFC,stroke:#94A3B8,color:#475569
style H fill:#F0FDF4,stroke:#16A34A,color:#0B1728,stroke-width:2px`} />
        <div className="metrics a3">
          <div className="metric"><div className="metric-val">0.63M</div><div className="metric-lbl">Parameters</div></div>
          <div className="metric"><div className="metric-val">1.93 MB</div><div className="metric-lbl">INT8 Size</div></div>
          <div className="metric"><div className="metric-val">10 ms</div><div className="metric-lbl">CPU Inference</div></div>
          <div className="metric"><div className="metric-val">10&times;</div><div className="metric-lbl">Smaller than GhostNetV2</div></div>
        </div>
        <div className="cards a3" style={{ marginTop: 16 }}>
          <div className="c">
            <div className="c-head">
              <div className="c-ico"><svg className="ico" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg></div>
              <h3>Depthwise Separable</h3>
            </div>
            <p>8&ndash;9&times; fewer parameters than standard convolutions.</p>
          </div>
          <div className="c">
            <div className="c-head">
              <div className="c-ico"><svg className="ico" viewBox="0 0 24 24"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg></div>
              <h3>SE Attention</h3>
            </div>
            <p>Recalibrates channel importance after each DW-Sep block.</p>
          </div>
          <div className="c">
            <div className="c-head">
              <div className="c-ico"><svg className="ico" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
              <h3>Residual Connections</h3>
            </div>
            <p>Preserve gradient flow through all 4 blocks.</p>
          </div>
        </div>
      </div>
    ),
  },

  /* ─── SLIDE 7: Ablation Table ─── */
  {
    id: 'ablation',
    title: 'Ablation',
    className: '',
    ariaLabel: 'Systematic Ablation',
    content: () => (
      <div className="slide-inner" style={{ justifyContent: 'flex-start', paddingTop: 52, paddingBottom: 80, overflowY: 'auto' }}>
        <div className="s-tag a1">Results</div>
        <h2 className="s-title">Systematic Ablation</h2>
        <div className="s-div" />
        <p className="s-sub a1">Six architectures across four complexity tiers isolate each design choice&apos;s contribution.</p>
        <table className="tbl a2">
          <thead><tr><th>Model</th><th>Params</th><th>Paradigm</th><th>CV Macro-F1</th><th>Size</th><th>Latency</th></tr></thead>
          <tbody>
            <tr className="hl"><td><span className="star">&#9733;</span> LightAlzNet</td><td>0.63M</td><td><span className="badge b-tl">DW-Sep + SE + Res</span></td><td><strong>49.81%</strong> &plusmn;3.00%</td><td>1.93 MB</td><td>10 ms</td></tr>
            <tr><td>GhostNetV2</td><td>6.18M</td><td><span className="badge b-tl">Ghost modules</span></td><td>48.93% &plusmn;3.20%</td><td>19.41 MB</td><td>12 ms</td></tr>
            <tr><td>MobileNetV3</td><td>2.54M</td><td><span className="badge b-tl">Inverted residuals</span></td><td>45.91% &plusmn;3.40%</td><td>3.81 MB</td><td>11 ms</td></tr>
            <tr><td>EfficientNet-B0</td><td>5.29M</td><td><span className="badge b-tl">Compound scaling</span></td><td>43.94% &plusmn;3.60%</td><td>15.89 MB</td><td>14 ms</td></tr>
            <tr><td>TinyViT-5M</td><td>5.40M</td><td><span className="badge b-pk">Vision Transformer</span></td><td>46.32% &plusmn;3.50%</td><td>11.20 MB</td><td>18 ms</td></tr>
            <tr><td>PlainCNN</td><td>0.52M</td><td><span className="badge b-tl">Baseline</span></td><td>39.43% &plusmn;4.00%</td><td>1.63 MB</td><td>5 ms</td></tr>
          </tbody>
        </table>
      </div>
    ),
  },

  /* ─── SLIDE 8: Gate Results ─── */
  {
    id: 'gate-results',
    title: 'Gate Results',
    className: '',
    ariaLabel: 'MMSE Gate Results',
    content: () => (
      <div className="slide-inner" style={{ justifyContent: 'flex-start', paddingTop: 52, paddingBottom: 80, overflowY: 'auto' }}>
        <div className="s-tag a1">Primary Contribution</div>
        <h2 className="s-title">MMSE Gate: +18.18 Points</h2>
        <div className="s-div" />
        <MermaidDiagram className="a2" chart={`flowchart LR
      subgraph BEFORE["Before Gate"]
A1["PlainCNN 42.1%"]
A2["TinyViT 45.5%"]
A3["EfficientNet 44.3%"]
A4["GhostNetV2 48.9%"]
A5["MobileNetV3 50.0%"]
A6["LightAlzNet 51.1%"]
A7["Ensemble 55.7%"]
end
subgraph GATE["MMSE Gate — 7 DSM-5 Rules"]
B1["29 silent errors caught and corrected"]
end
subgraph AFTER["After Gate"]
C1["PlainCNN 57.9%"]
C2["TinyViT 68.2%"]
C3["EfficientNet 63.6%"]
C4["GhostNetV2 71.6%"]
C5["MobileNetV3 73.9%"]
C6["LightAlzNet 64.8%"]
C7["Ensemble 73.9%"]
end
BEFORE --> GATE --> AFTER
style BEFORE fill:#FEF2F2,stroke:#DC2626,color:#0B1728
style GATE fill:#FEF3C7,stroke:#D97706,color:#0B1728
style AFTER fill:#F0FDF4,stroke:#16A34A,color:#0B1728
style C7 fill:#085054,stroke:#085054,color:#FFFFFF,stroke-width:2px`} />
        <table className="tbl a3" style={{ marginTop: 16 }}>
          <thead><tr><th>Model</th><th>Neural</th><th>Gated</th><th>&Delta;</th><th>p-value</th></tr></thead>
          <tbody>
            <tr><td>LightAlzNet</td><td>51.1%</td><td>64.8%</td><td>+13.6</td><td>0.0247</td></tr>
            <tr><td>GhostNetV2</td><td>48.9%</td><td>71.6%</td><td>+22.7</td><td>0.0002</td></tr>
            <tr><td>MobileNetV3</td><td>50.0%</td><td>73.9%</td><td>+23.9</td><td>0.0001</td></tr>
            <tr><td>EfficientNet</td><td>44.3%</td><td>63.6%</td><td>+19.3</td><td>0.0014</td></tr>
            <tr><td>TinyViT-5M</td><td>45.5%</td><td>68.2%</td><td>+22.7</td><td>0.0008</td></tr>
            <tr><td>PlainCNN</td><td>42.1%</td><td>57.9%</td><td>+15.9</td><td>0.0037</td></tr>
            <tr className="hl"><td><strong>Ensemble</strong></td><td><strong>55.7%</strong></td><td><strong>73.9%</strong></td><td><strong>+18.2</strong></td><td><strong>0.0033</strong></td></tr>
          </tbody>
        </table>
      </div>
    ),
  },

  /* ─── SLIDE 9: Gate Rules ─── */
  {
    id: 'rules',
    title: 'Gate Rules',
    className: '',
    ariaLabel: 'Gate Rules',
    content: () => (
      <div className="slide-inner" style={{ justifyContent: 'flex-start', paddingTop: 52, paddingBottom: 80, overflowY: 'auto' }}>
        <div className="s-tag a1">Primary Contribution</div>
        <h2 className="s-title">
          Gate Rules <span style={{ fontSize: 16, fontWeight: 400, color: 'var(--text3)' }}>&mdash; 7 DSM-5 rules, click to flip</span>
        </h2>
        <div className="s-div" />
        <div className="rules a2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          <RuleCard
            id="R0"
            alert="INFO"
            condition="MMSE = null"
            frontText="No MMSE provided. Prediction based on imaging only. Always pair with cognitive assessment for clinical use."
            backText="No MMSE provided. Prediction based on imaging only."
            color="gray"
          />
          <RuleCard
            id="R1"
            alert="ESCALATE/REVIEW"
            condition="Neural=CN AND MMSE&lt;24"
            frontText="MMSE&lt;19 → ESCALATE. MMSE 19–23 → REVIEW. CN inconsistent with cognitive impairment. Possible early MCI not visible on MRI."
            backText="CN inconsistent with cognitive impairment."
            color="red"
          />
          <RuleCard
            id="R2"
            alert="ESCALATE"
            condition="Neural=AD AND MMSE≥24"
            frontText="Normal MMSE incompatible with AD. Hard contradiction. Possible early-stage AD with preserved verbal cognition or scan artifact. PET/CSF biomarkers recommended."
            backText="Normal MMSE incompatible with AD."
            color="red"
          />
          <RuleCard
            id="R3"
            alert="REVIEW"
            condition="Neural=MCI AND 19≤MMSE≤26 AND conf&lt;0.55"
            frontText="MCI trap zone. Low-confidence MCI in diagnostically ambiguous transition region. MCI hardest to distinguish from normal aging on structural MRI alone."
            backText="MCI trap zone. Low-confidence MCI."
            color="amber"
          />
          <RuleCard
            id="R4"
            alert="ESCALATE/REVIEW"
            condition="Neural=MCI AND MMSE&lt;19"
            frontText="MCI prediction but MMSE suggests moderate/severe dementia. If p_AD > p_CN → ESCALATE (model's second hypothesis is AD). Otherwise REVIEW."
            backText="MCI prediction but MMSE suggests dementia."
            color="amber"
          />
          <RuleCard
            id="R5"
            alert="CONSISTENT"
            condition="Neural=AD AND MMSE&lt;19"
            frontText="Imaging and MMSE both confirm AD. High-confidence consistent result. Proceed with standard AD management pathway."
            backText="Imaging and MMSE both confirm AD."
            color="green"
          />
          <RuleCard
            id="R6"
            alert="REVIEW"
            condition="Neural=CN AND edu≥16yr AND MMSE≤27"
            frontText="Cognitive reserve mask. Highly educated patients may have MMSE scores that appear normal but mask early prodromal decline. Standard MMSE lacks sensitivity for this population."
            backText="Cognitive reserve mask."
            color="amber"
          />
        </div>
      </div>
    ),
  },

  /* ─── SLIDE 10: INT8 Quantization ─── */
  {
    id: 'quantization',
    title: 'INT8 Quantization',
    className: '',
    ariaLabel: 'INT8 Quantization',
    content: () => (
      <div className="slide-inner">
        <div className="s-tag a1">Deployment</div>
        <h2 className="s-title">INT8 Quantization &amp; Edge Deployment</h2>
        <div className="s-div" />
        <div className="two a2" style={{ marginTop: 12 }}>
          <div>
            <div className="metrics" style={{ marginTop: 0 }}>
              <div className="metric"><div className="metric-val">&lt;1.5%</div><div className="metric-lbl">Max F1 Drop (CNN)</div></div>
              <div className="metric"><div className="metric-val">1.93 MB</div><div className="metric-lbl">LightAlzNet INT8</div></div>
              <div className="metric" style={{ borderColor: 'rgba(220,38,38,.35)' }}><div className="metric-val" style={{ color: 'var(--red)' }}>&gt;5%</div><div className="metric-lbl">TinyViT F1 Drop</div></div>
              <div className="metric" style={{ borderColor: 'rgba(22,163,74,.35)' }}><div className="metric-val" style={{ color: 'var(--green)' }}>&lt;1%</div><div className="metric-lbl">APHQ-ViT Fix</div></div>
            </div>
            <div className="c a3" style={{ marginTop: 8 }}>
              <div className="c-head">
                <div className="c-ico"><svg className="ico" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
                <h3>APHQ-ViT Failed on TinyViT</h3>
              </div>
              <p><strong>Problem:</strong> Standard INT8 quantization of TinyViT-5M caused &gt;5% F1 drop due to numerical instability in QKV projection and LayerNorm.</p>
              <p style={{ marginTop: 8 }}><strong>APHQ-ViT mitigation:</strong> Selective quantization applies INT8 only to Conv2d layers (11/27) while keeping Linear in FP32. Result: 1.77&times; compression with &lt;1% F1 loss.</p>
            </div>
          </div>
          <div>
            <div className="media-card" style={{ height: '100%', padding: 8 }}>
              <img src="assets/int8%20explanation%20visualisation.png" alt="INT8 Quantization visualization" loading="lazy" style={{ objectFit: 'contain', maxHeight: '100%' }} />
            </div>
          </div>
        </div>
      </div>
    ),
  },

  /* ─── SLIDE 11: Cross-Platform Demo ─── */
  {
    id: 'demo',
    title: 'Demo',
    className: '',
    ariaLabel: 'Application Demo',
    content: () => (
      <div className="slide-inner">
        <div className="s-tag a1">Deployment</div>
        <h2 className="s-title">Cross-Platform Demo</h2>
        <div className="s-div" />
        <p className="s-sub a1">Tauri desktop (Rust + WebView) and Kotlin Multiplatform mobile &mdash; fully offline, Grad-CAM visualization, clinical gate.</p>
        <div className="two a2" style={{ marginTop: 16, alignItems: 'stretch' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="media-card" style={{ width: '100%', overflow: 'hidden', background: '#050D1A', aspectRatio: '16/9' }}>
              <video src="assets/videooftauriapplication.mp4" autoPlay muted loop playsInline preload="none" controls style={{ objectFit: 'contain', width: '100%', height: '100%', cursor: 'pointer' }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
            <div className="c" style={{ padding: '14px 18px' }}>
              <div className="c-head">
                <div className="c-ico"><svg className="ico" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg></div>
                <h3>Desktop &amp; Mobile</h3>
              </div>
              <p>Tauri v2 + Rust core (ONNX) + React frontend. Android: ONNX Runtime + Kotlin/Native. 94% shared code. Ships as <strong>1.93 MB</strong> model + <strong>12 MB</strong> app bundle.</p>
            </div>
            <div className="c" style={{ padding: '14px 18px' }}>
              <div className="c-head">
                <div className="c-ico"><svg className="ico" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></div>
                <h3>Features</h3>
              </div>
              <p>DICOM/NIfTI viewer, real-time Grad-CAM overlay, patient database, batch processing, PDF export. Fully offline.</p>
            </div>
            <div className="metrics" style={{ marginTop: 0, gridTemplateColumns: '1fr 1fr' }}>
              <div className="metric" style={{ padding: 9 }}><div className="metric-val" style={{ fontSize: 28 }}>&lt;10 ms</div><div className="metric-lbl">Per-Slice</div></div>
              <div className="metric" style={{ padding: 9 }}><div className="metric-val" style={{ fontSize: 28 }}>Fully Offline</div><div className="metric-lbl">No Cloud</div></div>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  /* ─── SLIDE 12: Mobile Deployment ─── */
  {
    id: 'android',
    title: 'Android Demo',
    className: '',
    ariaLabel: 'Android Mobile Demo',
    content: () => (
      <div className="slide-inner">
        <div className="s-tag a1">Deployment</div>
        <h2 className="s-title">Mobile Deployment (Android / iOS)</h2>
        <div className="s-div" />
        <p className="s-sub a1">Kotlin Multiplatform &mdash; 94% shared code across Android and iOS with native ONNX Runtime for fully offline inference.</p>
        <div className="two a2" style={{ marginTop: 16, alignItems: 'stretch' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="media-card" style={{ width: '100%', overflow: 'hidden', background: '#050D1A', aspectRatio: '16/9' }}>
              <video src="assets/videoofandroidapplication.mp4" autoPlay muted loop playsInline preload="none" controls style={{ objectFit: 'contain', width: '100%', height: '100%', cursor: 'pointer' }} />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
            <div className="c" style={{ padding: '14px 18px' }}>
              <div className="c-head">
                <div className="c-ico"><svg className="ico" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg></div>
                <h3>Mobile Features</h3>
              </div>
              <p>On-device inference via ONNX Runtime Mobile, Grad-CAM heatmap overlay, and instant CN/MCI/AD classification with the clinical gate.</p>
            </div>
            <div className="c" style={{ padding: '14px 18px' }}>
              <div className="c-head">
                <div className="c-ico"><svg className="ico" viewBox="0 0 24 24"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg></div>
                <h3>Architecture</h3>
              </div>
              <p>Android: ONNX Runtime + Kotlin/Native. iOS: CoreML conversion planned. Edge-first with <strong>1.93 MB</strong> quantized model.</p>
            </div>
            <div className="c" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ flexShrink: 0, width: 90, height: 90, background: '#fff', borderRadius: 8, padding: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg viewBox="0 0 29 29" width="78" height="78" xmlns="http://www.w3.org/2000/svg">
                  <rect width="29" height="29" fill="#fff"/>
                  <g fill="#000">
                    <rect x="0" y="0" width="7" height="7"/><rect x="22" y="0" width="7" height="7"/><rect x="0" y="22" width="7" height="7"/>
                    <rect x="1" y="1" width="5" height="5" fill="#fff"/><rect x="23" y="1" width="5" height="5" fill="#fff"/><rect x="1" y="23" width="5" height="5" fill="#fff"/>
                    <rect x="2" y="2" width="3" height="3"/><rect x="24" y="2" width="3" height="3"/><rect x="2" y="24" width="3" height="3"/>
                    <rect x="8" y="0" width="2" height="2"/><rect x="12" y="0" width="1" height="1"/><rect x="15" y="0" width="2" height="2"/><rect x="19" y="0" width="1" height="1"/>
                    <rect x="8" y="3" width="1" height="1"/><rect x="10" y="2" width="2" height="1"/><rect x="14" y="3" width="1" height="2"/><rect x="17" y="2" width="1" height="1"/><rect x="20" y="3" width="1" height="1"/>
                    <rect x="8" y="5" width="2" height="1"/><rect x="11" y="4" width="1" height="1"/><rect x="13" y="5" width="2" height="1"/><rect x="16" y="4" width="2" height="2"/><rect x="19" y="5" width="2" height="1"/>
                    <rect x="0" y="8" width="2" height="1"/><rect x="3" y="8" width="1" height="2"/><rect x="5" y="9" width="2" height="1"/><rect x="8" y="8" width="2" height="2"/><rect x="11" y="8" width="1" height="1"/><rect x="14" y="8" width="1" height="2"/><rect x="17" y="9" width="1" height="1"/><rect x="20" y="8" width="2" height="2"/><rect x="24" y="8" width="1" height="1"/><rect x="27" y="8" width="2" height="1"/>
                    <rect x="0" y="11" width="1" height="1"/><rect x="2" y="10" width="1" height="2"/><rect x="5" y="11" width="1" height="1"/><rect x="8" y="11" width="1" height="1"/><rect x="11" y="10" width="2" height="2"/><rect x="14" y="11" width="2" height="1"/><rect x="17" y="10" width="1" height="2"/><rect x="20" y="11" width="1" height="1"/><rect x="23" y="10" width="2" height="1"/><rect x="26" y="11" width="1" height="2"/><rect x="28" y="10" width="1" height="1"/>
                    <rect x="0" y="14" width="2" height="2"/><rect x="3" y="14" width="1" height="1"/><rect x="5" y="14" width="1" height="2"/><rect x="8" y="14" width="1" height="1"/><rect x="10" y="13" width="2" height="1"/><rect x="13" y="14" width="1" height="1"/><rect x="16" y="13" width="2" height="2"/><rect x="20" y="14" width="1" height="1"/><rect x="22" y="13" width="1" height="2"/><rect x="25" y="14" width="2" height="1"/><rect x="28" y="14" width="1" height="1"/>
                    <rect x="0" y="17" width="1" height="1"/><rect x="2" y="17" width="2" height="1"/><rect x="5" y="17" width="1" height="1"/><rect x="8" y="16" width="1" height="2"/><rect x="11" y="17" width="1" height="1"/><rect x="14" y="16" width="2" height="2"/><rect x="17" y="17" width="1" height="1"/><rect x="20" y="16" width="2" height="1"/><rect x="23" y="17" width="1" height="2"/><rect x="26" y="16" width="2" height="1"/><rect x="28" y="17" width="1" height="1"/>
                    <rect x="0" y="20" width="2" height="1"/><rect x="3" y="19" width="1" height="2"/><rect x="6" y="20" width="1" height="1"/><rect x="8" y="20" width="2" height="1"/><rect x="11" y="19" width="2" height="2"/><rect x="15" y="20" width="1" height="1"/><rect x="17" y="19" width="1" height="2"/><rect x="20" y="20" width="1" height="1"/><rect x="23" y="19" width="2" height="1"/><rect x="26" y="20" width="1" height="1"/><rect x="28" y="19" width="1" height="2"/>
                    <rect x="8" y="22" width="2" height="2"/><rect x="11" y="22" width="1" height="1"/><rect x="14" y="22" width="2" height="1"/><rect x="17" y="23" width="1" height="1"/><rect x="20" y="22" width="2" height="2"/><rect x="24" y="22" width="1" height="1"/><rect x="27" y="23" width="2" height="1"/>
                    <rect x="8" y="25" width="1" height="1"/><rect x="11" y="24" width="2" height="2"/><rect x="15" y="25" width="1" height="1"/><rect x="17" y="24" width="2" height="1"/><rect x="20" y="25" width="1" height="2"/><rect x="23" y="24" width="1" height="1"/><rect x="26" y="25" width="2" height="2"/>
                    <rect x="8" y="27" width="2" height="2"/><rect x="12" y="27" width="1" height="2"/><rect x="15" y="28" width="2" height="1"/><rect x="18" y="27" width="1" height="2"/><rect x="21" y="28" width="2" height="1"/><rect x="24" y="27" width="2" height="2"/><rect x="27" y="28" width="2" height="1"/>
                  </g>
                </svg>
              </div>
              <div>
                <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>Try the Live Demo</p>
                <p style={{ fontSize: 14, color: 'var(--text3)', margin: 0, lineHeight: 1.4 }}>Scan to test the system on your phone<br/><a href="https://neuro-detect-lite.vercel.app/" target="_blank" rel="noopener" style={{ color: 'var(--teal)', fontWeight: 600, textDecoration: 'none' }}>neuro-detect-lite.vercel.app</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  /* ─── SLIDE 13: Interpretability ─── */
  {
    id: 'interpretability',
    title: 'Interpretability',
    className: '',
    ariaLabel: 'Interpretability and Error Analysis',
    content: () => (
      <div className="slide-inner">
        <div className="s-tag a1">Analysis</div>
        <h2 className="s-title">Interpretability &amp; Error Analysis</h2>
        <div className="s-div" />
        <p className="s-sub a1">All models focus on hippocampus and medial temporal lobe &mdash; anatomically valid and consistent with clinical AD biomarkers.</p>
        <div className="two a2" style={{ marginTop: 16, alignItems: 'stretch' }}>
          <div>
            <div className="c" style={{ marginBottom: 12 }}>
              <div className="c-head">
                <div className="c-ico" style={{ background: 'var(--teal-pale)', color: 'var(--teal)' }}>
                  <svg className="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>
                </div>
                <h3>Grad-CAM Attention Maps</h3>
              </div>
              <p>Models focus on hippocampus and medial temporal lobe. CN shows distributed attention; AD exhibits tight focal attention on temporal atrophy.</p>
            </div>
            <div className="c">
              <div className="c-head">
                <div className="c-ico" style={{ background: 'var(--red-bg)', color: 'var(--red)' }}>
                  <svg className="ico" viewBox="0 0 24 24"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                </div>
                <h3>AD Classification Collapse</h3>
              </div>
              <p>Standard CNNs misclassify 17/29 AD subjects as CN or MCI. Our clinical gate captures these silent errors, boosting accuracy to 73.9%.</p>
            </div>
          </div>
          <div>
            <div className="media-card" style={{ height: '100%', padding: 8 }}>
              <img src="assets/gradcamexplanation.png" alt="Grad-CAM explanation" loading="lazy" style={{ objectFit: 'contain', maxHeight: '100%' }} />
            </div>
          </div>
        </div>
      </div>
    ),
  },

  /* ─── SLIDE 14: Limitations ─── */
  {
    id: 'limitations',
    title: 'Limitations',
    className: '',
    ariaLabel: 'Limitations',
    content: () => (
      <div className="slide-inner" style={{ justifyContent: 'flex-start', paddingTop: 52, paddingBottom: 80, overflowY: 'auto' }}>
        <div className="s-tag a1">Critical Evaluation</div>
        <h2 className="s-title">Limitations &amp; Honest Caveats</h2>
        <div className="s-div" />
        <div className="limits a2">
          <div className="lim">
            <h4>L1: Small Test Set (n=88)</h4>
            <div className="iss">88 subjects limits statistical power. Gate delta CI: [+6.8%, +28.4%].</div>
            <div className="fix">5-fold CV on 495 subjects. McNemar test appropriate for paired binary at n=88.</div>
          </div>
          <div className="lim">
            <h4>L2: Ensemble Weight Leakage</h4>
            <div className="iss">Confidence weights derived from test set, not a separate held-out validation set.</div>
            <div className="fix">Known limitation. Weights could use CV fold performance in future work.</div>
          </div>
          <div className="lim">
            <h4>L3: Single-site Data</h4>
            <div className="iss">All 495 subjects from ADNI. Scanner biases may affect generalization.</div>
            <div className="fix">ADNI uses standardized multi-site protocol. Cross-scanner validation planned.</div>
          </div>
          <div className="lim">
            <h4>L4: No Longitudinal Validation</h4>
            <div className="iss">Classifies cross-sectional snapshots. Cannot predict MCI-to-AD conversion.</div>
            <div className="fix">Longitudinal conversion listed as Future Direction. Appropriate for Master&apos;s thesis.</div>
          </div>
        </div>
      </div>
    ),
  },

  /* ─── SLIDE 15: Future & Paper ─── */
  {
    id: 'future',
    title: 'Future & Paper',
    className: '',
    ariaLabel: 'Future Directions and Paper',
    content: () => (
      <div className="slide-inner" style={{ justifyContent: 'flex-start', paddingTop: 42, paddingBottom: 60 }}>
        <div className="s-tag a1">Beyond the Thesis</div>
        <h2 className="s-title">Future Directions &amp; Paper</h2>
        <div className="s-div" />
        <div className="two a2" style={{ gap: 20, flex: 1, minHeight: 0 }}>
          <div>
            <MermaidDiagram chart={`flowchart LR
      A["Scale Data<br/>ADNI+OASIS-3<br/>2000+ subjects"] --> B["Vision-Language<br/>LFM2.5-VL-450M<br/>QLoRA fine-tune"]
B --> C["Cross-Platform<br/>Tauri Desktop+Mobile<br/>Rust core"]
C --> D["Clinical Validation<br/>Prospective multi-reader<br/>studies"]
D --> E["Open-Source<br/>MIT License<br/>ONNX Model Zoo"]
style A fill:#E0F4F5,stroke:#0D7377,color:#0B1728,stroke-width:2px
style B fill:#E0F4F5,stroke:#0D7377,color:#0B1728,stroke-width:2px
style C fill:#E0F4F5,stroke:#0D7377,color:#0B1728,stroke-width:2px
style D fill:#FEF3C7,stroke:#D97706,color:#0B1728,stroke-width:2px
style E fill:#F0FDF4,stroke:#16A34A,color:#0B1728,stroke-width:2px`} />
            <div className="futures a3">
              <div className="fut">
                <div className="fut-icon"><svg className="ico ico-lg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>
                <h4>Scale Data</h4>
                <p>ADNI + OASIS-3, 2000+ subjects</p>
              </div>
              <div className="fut">
                <div className="fut-icon"><svg className="ico ico-lg" viewBox="0 0 24 24"><path d="M12 2a7 7 0 017 7c0 2.5-1.5 4.5-3 6l-1 1v2h-6v-2l-1-1c-1.5-1.5-3-3.5-3-6a7 7 0 017-7z"/><path d="M9 21h6"/></svg></div>
                <h4>VLM Reasoning</h4>
                <p>LFM2.5-VL-450M with QLoRA</p>
              </div>
              <div className="fut">
                <div className="fut-icon"><svg className="ico ico-lg" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg></div>
                <h4>iOS CoreML</h4>
                <p>94% shared Kotlin Multiplatform</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
            <div className="c" style={{ margin: 0 }}>
              <div className="c-head">
                <div className="c-ico" style={{ background: 'var(--teal-pale)', color: 'var(--teal)' }}><svg className="ico" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></div>
                <h3>EDiS 2026 &mdash; IEEE Conference</h3>
              </div>
              <p><strong>5th IEEE Intl. Conf. on Embedded &amp; Distributed Systems</strong><br />
              Oran 1 University &nbsp;&middot;&nbsp; Nov 2&ndash;5, 2026 &nbsp;&middot;&nbsp; Smart Health Workshop</p>
            </div>
            <div className="metrics" style={{ marginTop: 0, gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <div className="metric" style={{ padding: 9 }}><div className="metric-val" style={{ fontSize: 28 }}>May 30</div><div className="metric-lbl">Submitted</div></div>
              <div className="metric" style={{ padding: 9 }}><div className="metric-val" style={{ fontSize: 28 }}>Jul 10</div><div className="metric-lbl">Notification</div></div>
              <div className="metric" style={{ padding: 9 }}><div className="metric-val" style={{ fontSize: 28 }}>IEEE</div><div className="metric-lbl">Xplore Track</div></div>
              <div className="metric" style={{ padding: 9 }}><div className="metric-val" style={{ fontSize: 28 }}>Nov 2&ndash;5</div><div className="metric-lbl">Conference</div></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1 }}>
              <PaperCarousel />
            </div>
          </div>
        </div>
      </div>
    ),
  },

  /* ─── SLIDE 16: Thank You ─── */
  {
    id: 'thankyou',
    title: 'Thank You',
    className: 'thank-s',
    ariaLabel: 'Thank You',
    content: () => (
      <div className="slide-inner">
        <h1 className="s-title a1" style={{ fontSize: 'clamp(40px,4vw,62px)' }}>Thank You</h1>
        <div className="s-div a1" style={{ margin: '10px auto 0' }} />
        <p className="s-sub a1" style={{ margin: '14px auto 0', textAlign: 'center' }}>Questions &amp; Discussion</p>
        <p className="a3" style={{ marginTop: 32, fontSize: 16, color: 'var(--text3)', textAlign: 'center' }}>
          Mohamed Oussama Belalia &amp; Kheireddine Belghitar<br />
          Supervisor: Prof. Tahar Zioual &nbsp;&middot;&nbsp; Ibn Khaldoun University, Tiaret
        </p>
      </div>
    ),
  },
];

export { slides };
export default slides;
