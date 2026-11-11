# Master Resume Library — Jeff Ge
Version 1.1 | Compiled 2026-11-11
> Usage rules: single source of truth. Never tailor this file to a JD — branch from it
> per application. All metrics carry their measurement basis; unknowns stay as [TBD].

---

## 1. Identity & Positioning

- Official current title: **AI Specialist, HKBN**
  - Alternate for mainland/technical JDs: "AI Engineer / Algorithm & Backend R&D".
- Submitted positioning statement (kept verbatim as candidate's preferred voice):
  > "I transform multimodal large language models into high-impact business solutions,
  > driving revenue growth and operational efficiency through scalable AI deployment."
- Fact-grounded alternates (for JDs where substance-first reading matters):
  - Technical-first: "AI Specialist with 3+ years shipping production LLM/GraphRAG systems. Sole owner of TenderAI, a multi-tenant tender intelligence platform (LlamaIndex + Neo4j + FastAPI) used daily by 80+ colleagues."
  - Presales-first: "AI Specialist bridging LLM engineering and enterprise go-to-market: built and operate a production GraphRAG platform (TenderAI) while advising 1,500+ SME customers on AI solution evaluation and adoption."
  - Rule when tailoring: pick one; do not merge into a longer hybrid.

## 2. Employment Timeline (user-confirmed, 2026-11-11)

| Period | Company | Title |
|---|---|---|
| 2025.11 – Present | HKBN, Hong Kong | AI Specialist |
| 2023.04 – 2025.10 | ASTRI, Hong Kong | AI Engineer |
| 2022.07 – 2022.09 | BOC Fintech, Shanghai | Risk Modeling Intern |

> Note: previous CV listed 2025.12 / 2025-11 / 2022-06. This table supersedes the CV.
> Cross-check against HR records before submission, as background checks use HR dates.

## 3. HKBN — Technical: TenderAI (flagship, production, sole owner)

**Problem**: sales colleagues struggle with daily tenders; management lacks visibility into bid win rates.
**Solution**: tender intelligence platform managing the bidding process end-to-end — proposal weakness analysis, auto-generated proposal outlines, and a management dashboard for tender success rates.

**Stack**: FastAPI (backend) · LlamaIndex (RAG) · Vue3 (frontend) · Neo4j (graph + vectors) · PostgreSQL (service data) · broad evaluation of open-source LLMs · deploys on Linux/Windows/macOS/Docker.

**Metrics** (as confirmed 2026-11-11):
- Retrieval accuracy: 94%+ (evaluation-set basis to be stated in interviews, not on CV unless asked)
- Latency: depends on LLM provider and host performance — no latency-reduction claim
- Corpus: thousands of tender-related documents
- Users: 80+ internal, active production
- Efficiency: ~20% research-time saving (internal colleague survey) (est.), partially offset by incremental LLM API cost — honest net-ROI framing if asked

**Hard problems solved (interview-grade detail)**:
1. Tenant-safe GraphRAG on shared Neo4j + vector store without cross-tender leakage: auth gates, post-retrieval project filters, non-expanding project resolution, bounded community hops, APPEARS_IN / BELONGS_TO provenance edges.
2. Stale Celery indexing leaving projects stuck — [TBD: root cause + fix]
3. Vision-fallback PDF ingestion for scanned bid documents — [TBD: OCR/VLM fallback chain]
4. FastAPI SSE streaming Event-loop blocking under concurrency — async offloading of sync I/O-bound generators via thread pool; X-Forwarded-For validation + rate limiting.

## 4. HKBN — Presales & Consulting

- Directly support 1,500+ SME customers (with team) consulting on AI adoption cases — headline-scale number, keep in both HK and mainland versions.
- Individual cases / vendor-eval specifics: not separately quantifiable from user's vantage point.
  Rule when tailoring: use the aggregate scope statements below; never invent per-client outcomes.
  - "Acted as first-line AI consultation contact for SME customers, scoping use cases and assessing solution feasibility."
  - "Evaluated third-party AI products and vendors against customer requirements; advised management on adoption decisions and localized deployment options."

## 5. ASTRI (2023.04 – 2025.10)

- HKMA anti-money-laundering network analytics: financial-entity graph model in Neo4j, community detection + node similarity algorithms, interactive network visualization system. Impact metric [TBD].
- ChatDoc for HKPF & Airport Authority: model-agnostic conversational RAG core, backend services, user-feedback data loop.
- UIE-based NER for ESG metric extraction serving Deloitte annual-report automation: packaged as service API; F1 [TBD].
- Stable Diffusion pipeline (ComfyUI + ControlNet + task-specific LoRA): automated batch generation of custom backgrounds; stock-material cost saving [TBD].
- Individual-vs-team contribution split: as stated in CV above; [TBD] if interviewers press.

## 6. BOC Fintech, Shanghai — Intern (2022.07 – 2022.09)

- Property/IP valuation modeling for risk pricing: data sourcing and cleaning, feature engineering, LightGBM tiered (high/mid/low net-worth) modeling.

## 7. Education

- The Hong Kong Polytechnic University — M.Sc. Data Science & Analytics, 2021.09 – 2023.03
- Hohai University (Project 211), Nanjing — B.Sc. Information & Computing Science, 2017.09 – 2021.06 [TBD: GPA if strong]

## 8. Skills — defense-level tagged (updated 2026-11-11)

- **30-min interview defensible**: Python (FastAPI, PyTorch, Pandas), LlamaIndex, RAG architecture, agent orchestration & intent routing, Neo4j + graph algorithms, PostgreSQL/SQL, Milvus, Docker, Linux/Git, Stable Diffusion/ComfyUI/ControlNet/LoRA, LightGBM
- **Newly confirmed additions**: MCP, agent frameworks, open-source Llama-family model ops, vLLM inference serving
- **Demoted — exposure only**: Kubernetes (used a few times; keep off the main skill block, or as "Exposure: K8s")
- **Borderline**: Java, C++ — keep only if user confirms defense level for a specific JD

## 9. Competitions & Awards

- Huawei CTF (2022): elliptic-curve discrete crypto over finite fields; RSA key recovery (p/q factorization → Euler's totient → private key d → FLAG).
- Credit Suisse CodeIT Hackathon (2022): 7th of 24 university teams; English-medium, Git-based collaboration.

## 10. Remaining Open Items

- [ ] Cross-check employment dates against HR/background-check records (table above is user-asserted)
- [ ] Celery stale-index fix details; OCR/VLM fallback chain details
- [ ] ASTRI three impact metrics (HKMA %, UIE F1, SD cost-saving %) — CV still holds placeholders; fill or delete before any submission
- [ ] GPA (if strong), language proficiency phrasing, publishable links (GitHub/LinkedIn)
