# SEO ENGINE SKILL
## Complete Functional Specification, Business Logic, Processing Workflow & Validation Rules

**Skill Name:** YouTube SEO Engine  
**Skill Type:** Project-Aware Content Analysis and SEO Generation  
**Primary Purpose:** YouTube videos, especially Shorts, mate source-based, script-aware, accurate ane relevant SEO package generate karvo.  
**Version:** 1.0 — Functional Specification  
**Language Support:** Gujarati, Hindi, Hinglish, English ane biji supported languages.  
**Main Principle:** Current project no data j use karvo. Bija project ni story, analysis ke script ni details mix na karvi.

---

# 1. SEO ENGINE NU MAIN PURPOSE

SEO Engine nu kaam fakt title, description ane tags lakhvanu nathi.

Enu actual kaam aa chhe:

1. Current project ne identify karvo.
2. Project ma available original source ane Source Analysis shodhvu.
3. E j project ni generated script ane Script Analysis shodhvu.
4. Banney analyses ni completeness ane consistency check karvi.
5. Source mathi factual information identify karvi.
6. Script mathi hook, story flow, key moments ane audience interest identify karva.
7. Source ane script vachche na factual differences detect karva.
8. YouTube SEO mate relevant keywords identify karva.
9. Title, description, hashtags, tags ane disclaimer generate karva.
10. Darekh output source ane script na actual content sathe match thay chhe ke nahi te validate karvu.
11. Final result copy-paste-ready format ma aapvo.
12. Output sathe internally traceability rakhvi, etle kai detail kyathi aavi te samji shakay.

### Expected result

User ek video mate source ane script prepare kare. Banne nu analysis current project ma save thayelu hoy. Pachhi user SEO Engine run kare to engine e saved analysis no upyog kari complete YouTube SEO package generate kare.

User e same source ane script nu analysis fari generate karavvu jaruri na hovu joie, jo required analysis already available, valid ane current hoy.

---

# 2. CORE INPUTS

SEO Engine ne processing mate niche na data ni jarur padse.

## 2.1 Project ID

Darek project no unique identifier hovo joie.

Example:

- Project A: NASA Swift Telescope
- Project B: Artificial Intelligence
- Project C: Historical Mystery

Engine e project ID na basis par data retrieve karvo.

**Rule:** Project A nu source analysis Project B na SEO generation ma kyarey use na karvu, sivay ke user explicitly cross-project reference approve kare.

Project nu naam ek sarakhu hoy to pan unique Project ID thi data verify karvo.

## 2.2 Original Source

Original source ma aa vastu hoi shake:

- Article
- Research report
- News report
- Documentary transcript
- Official announcement
- User-provided text
- Research notes
- Multiple source documents
- URLs athva uploaded files

Source ni metadata ma, available hoy to, aa details rakhvi:

- Source ID
- Project ID
- Source title
- Source type
- Original text athva document reference
- Source URL
- Publisher athva organization
- Publication date
- Source access date
- Source version
- Source status

Badhi fields darek source mate mandatory nathi. Je information available na hoy tene invent na karvi.

## 2.3 Source Analysis

Source Analysis e original source mathi extract ane interpret kareli structured information chhe.

SEO Engine e available hoy to aa analysis reuse karvu.

Expected analysis fields:

1. Main topic
2. Primary subject/entity
3. Important people, organizations ane places
4. Important dates
5. Main events
6. Key facts
7. Technical terms
8. Main cause ane effect
9. Important numbers ane measurements
10. Confirmed information
11. Uncertain information
12. Source limitations
13. Possible misunderstandings
14. Sensitive factual claims
15. Source citations athva source-text references
16. Main search topics
17. Related search concepts
18. Analysis version ane status

Source Analysis no matlab source na facts ane context ne samajvo chhe. E source ma je nathi te fact tarike add karvanu nathi.

## 2.4 Generated Script

Current project ma generated video script.

Script sathe available hoy to aa metadata pan retrieve karvi:

- Script ID
- Project ID
- Script version
- Script language
- Video format
- Target duration
- Scene/part structure
- Voiceover
- On-screen text
- Hook
- Ending/CTA
- Script status

Udaharan tarike, Shorts script ma chaar scenes hoy ane darek scene aath seconds no hoy, to engine e script ni actual structure samajvi.

## 2.5 Script Analysis

Script Analysis e generated script mathi samajeli structured information chhe.

Expected fields:

1. Main topic
2. Central story
3. Opening hook
4. Audience curiosity point
5. Main subject/entity
6. Key events
7. Scene-wise content
8. Important claims
9. Emotional tone
10. Audience intent
11. Video format
12. Intended audience
13. Main takeaway
14. Ending ane CTA
15. Script ma use thayela keywords
16. Potentially misleading wording
17. Script ma missing context
18. Source sathe verify karvana claims
19. Analysis version ane status

Script Analysis no purpose source analysis repeat karvo nathi. Te video actually shu kahe chhe, kai rite present kare chhe ane audience ne shu samjave chhe te samajva mate chhe.

## 2.6 SEO Configuration

User athva app configuration mathi available hoy to:

- Platform: YouTube
- Format: Shorts, long-form athva other
- Target language
- Target audience
- Primary country/market
- Channel niche
- Brand terminology
- Preferred title style
- Preferred description style
- Required disclaimer
- AI-generated visual disclosure information
- Maximum output limits
- User-specific formatting rules

Configuration na male to reasonable defaults use kari shakay. Pan unsupported information assume na karvi.

---

# 3. PROJECT DATA RETRIEVAL LOGIC

SEO generation karta pehla engine e current project no relevant data retrieve karvo.

### Processing sequence

1. Active Project ID melavo.
2. E project no latest valid Source Analysis retrieve karo.
3. E j project no latest valid Script Analysis retrieve karo.
4. Banney analyses kai source ane script versions sathe linked chhe te check karo.
5. Required source ane script records available chhe ke nahi te check karo.
6. Analysis stale, incomplete athva mismatched chhe ke nahi te check karo.
7. Pachhi j SEO generation start karo.

### Data selection rules

**Rule A — Same project**

Badha input records active Project ID sathe match thava joie.

**Rule B — Correct source version**

Source Analysis e current source version represent karto hovo joie.

**Rule C — Correct script version**

Script Analysis e current script version represent karto hovo joie.

**Rule D — Analysis reuse**

Jo relevant analysis already available, complete ane current hoy to tene reuse karvo.

**Rule E — Reanalysis**

Jo source athva script change thai gayi hoy, pan analysis old version ni hoy, to old analysis ne automatically current na manvi.

**Rule F — Missing data**

Jo required analysis missing hoy to available workflow pramane analysis function call karvo athva user ne missing information vishe janavvu.

**Rule G — No false access claims**

Engine ne koi saved analysis access na hoy to tene access chhe evo claim na karvo.

---

# 4. ANALYSIS VERSIONING ANE DEPENDENCY LOGIC

Aa section bahu important chhe, karan ke source ane script darek video ma alag hoi shake chhe.

Darek analysis e input version sathe linked hovi joie.

Example:

- Source S1 — Version 1
- Source Analysis SA1 — Based on S1 Version 1
- Script SC1 — Version 1
- Script Analysis SCA1 — Based on SC1 Version 1
- SEO Output SEO1 — Based on SA1 ane SCA1

Have jo script edit thai ne Version 2 bane, to Script Analysis Version 1 ne automatically current na manvi.

### Dependency rules

| Change | Shu karvu |
|---|---|
| Source ma edit | Source Analysis stale mark karvi |
| Source Analysis ma edit | Dependents ne revalidate karva |
| Script ma edit | Script Analysis stale mark karvi |
| Script Analysis ma edit | SEO fari validate karvu athva regenerate karvu |
| Title preference ma edit | Title regenerate/revise karvo |
| Disclaimer preference ma edit | Disclaimer revise karvo |
| Hashtag count ma edit | Hashtag output fari validate karvo |
| Project switch | Navo project data retrieve karvo |

### Important distinction

Analysis stale hovu etle tene delete karvi jaruri nathi. Te history mate preserve kari shakay, pan current SEO generation ma use karta pehla validate karvi.

### Recommended metadata

Darek analysis record ma:

- `project_id`
- `analysis_id`
- `input_record_id`
- `input_version`
- `analysis_status`
- `created_at`
- `updated_at`
- `analysis_version`

Darek SEO result ma:

- `project_id`
- `source_analysis_id`
- `script_analysis_id`
- `source_version`
- `script_version`
- `seo_generation_version`

Aa fields traceability mate chhe; exact database design development darmiyan decide kari shakay.

---

# 5. SOURCE ANALYSIS MATHI KAI INFORMATION LEVANI?

Source Analysis mathi SEO Engine e information ne alag-alag categories ma divide karvi.

## 5.1 Core facts

Story samajva mate essential facts.

Example:

NASA Swift Observatory nu scientific mission end thai rahyu chhe.

## 5.2 Named entities

- Organization
- Person
- Product
- Spacecraft
- Location
- Event
- Scientific project

Aa names title, description ane keywords ma useful bani shake chhe.

## 5.3 Important dates ane numbers

Example:

- Launch year
- Incident date
- Measurements
- Duration
- Quantity
- Technical values

Numbers copy karta pehla context check karvo.

## 5.4 Cause-and-effect relationship

Example:

Solar activity ma vadharo → upper atmosphere par effect → atmospheric drag ma vadharo → satellite ni orbital altitude ma ghatado.

Engine e aa relationship accurately preserve karvo.

## 5.5 Confirmed vs uncertain claims

Facts ne tran groups ma classify kari shakay:

- Confirmed by available evidence
- Uncertain athva qualified
- Not supported by available source

Uncertain claim ne confirmed fact jevi language ma present na karvi.

## 5.6 Important terminology

Source ma use thayela scientific ane technical words preserve karva.

Example:

- Atmospheric drag
- Orbital altitude
- Gamma-ray burst
- Re-entry

Relevant English terms ne Hindi athva Gujarati explanation sathe description ma use kari shakay.

## 5.7 Searchable entities

Source ma je entity central chhe, tena official name ane common search name identify karva.

Example:

- Neil Gehrels Swift Observatory
- Swift Telescope
- NASA Swift

Aa badha terms ne automatically identical na manva; context pramane correct relationship establish karvo.

---

# 6. SCRIPT ANALYSIS MATHI KAI INFORMATION LEVANI?

Script Analysis SEO ne actual video sathe match karave chhe.

## 6.1 Main hook

Video ni opening ma audience nu attention kai rite capture karay chhe?

Examples:

- Question
- Unexpected event
- Surprising fact
- Mystery
- Important discovery

SEO Engine e hook ne samajvo, pan title ma misleading claim na karvo.

## 6.2 Main topic

Video primarily kai subject vishe chhe?

Title ane description nu main focus aa topic sathe match thavu joie.

## 6.3 Key moments

Script ma kaya moments important chhe?

Examples:

- Discovery
- Incident
- Cause
- Consequence
- Final outcome

Description ma aa moments ne relevant order ma summarize kari shakay.

## 6.4 Audience curiosity

Audience video ma shu janva mage?

Example:

“Satellite ni orbit kem ghatati gayi?”

Aa question title athva description ma use kari shakay, jo video tenu jawab aape.

## 6.5 Script-specific terminology

Script ma je names, numbers ane phrases prominent hoy te candidate keywords bani shake chhe.

Pan script ma koi keyword bolay chhe etle te automatically SEO mate valuable chhe evu nathi.

## 6.6 CTA

Script na ending ma follow, subscribe athva biji action hoy to description ma relevant CTA include kari shakay.

Unrelated CTA add na karvo.

---

# 7. SOURCE ANALYSIS ANE SCRIPT ANALYSIS NE COMBINE KARVANI LOGIC

Aa SEO Engine no core reasoning step chhe.

Source Analysis ane Script Analysis alag responsibilities fulfill kare chhe.

**Source Analysis:** Shu factual rite supported chhe?

**Script Analysis:** Video shu kahe chhe ane audience ne kai rite present kare chhe?

SEO Engine e banne ne combine kari ne answer karvu:

1. Video no actual subject shu chhe?
2. Source mathi kai facts important chhe?
3. Script ma kai facts prominently present chhe?
4. Main hook shu chhe?
5. Video nu promise shu chhe?
6. Kai keywords subject sathe relevant chhe?
7. Title script na promise ne accurately represent kare chhe?
8. Description ma source ane script banne reflect thay chhe?
9. Koi misleading claim, exaggeration athva unsupported conclusion chhe?
10. Koi important qualification omit thai rahi chhe?

## 7.1 Combined content map

SEO generate karta pehla internal content map banavvo.

| Field | Source Analysis | Script Analysis | Final SEO Use |
|---|---|---|---|
| Main topic | Fact-based topic | Video focus | Title ane description |
| Primary entity | Official entity | Script ma featured entity | Title, keywords |
| Main event | Supported event | Story no central event | Title, opening |
| Cause | Evidence-based cause | Script explanation | Description |
| Important number | Verified value | Script ma mentioned value | Description, keywords |
| Audience hook | Source mathi optional | Script mathi main hook | Title |
| Consequence | Supported outcome | Script ending | Description |
| Technical terms | Accurate terminology | Script vocabulary | Keywords, tags |
| CTA | Usually applicable nathi | Script ma available hoy | Description |
| Uncertainty | Source ni limitation | Script ma wording | Disclaimer/qualification |

Aa mapping no matlab badhi information badha outputs ma mukvi nahi. Pratyek information ne suitable output ma j use karvi.

---

# 8. FACTUAL CONFLICT DETECTION

Source ane script vachche contradiction hoy to engine e tene ignore na karvi.

Example:

Source: Satellite atmospheric re-entry ni expected process ma chhe.

Script: Satellite guaranteed rite residential area par crash thashe.

Aa banne statements equivalent nathi.

### Conflict-handling rules

1. Source evidence ane available authoritative records sathe factual claim compare karvo.
2. Script ma exaggerated wording identify karvi.
3. Unsupported claim ne fact tarike SEO ma reproduce na karvo.
4. Script ni core story ne unnecessarily badalvi nahi.
5. Claim important hoy ane correct answer available na hoy to clarification athva verification require karvi.
6. Minor wording issue hoy to safe, accurate alternative use kari shakay.
7. Source pote uncertain hoy to uncertainty preserve karvi.

### Conflict categories

- Date mismatch
- Name mismatch
- Number mismatch
- Event mismatch
- Cause-and-effect mismatch
- Overstated outcome
- Unsupported prediction
- Missing qualification
- Contradictory source records

### Priority

Factual accuracy ne keyword optimization karta higher priority aapvi.

SEO Engine no goal sensational claim thi clicks melavvano nathi. Goal relevant audience ne video shu aape chhe te clearly samjhavvano chhe.

---

# 9. SEO INTENT ANE CONTENT POSITIONING

Engine e video ne samajvu ke audience aa video shu karva mate search kari shake chhe.

Potential search intents:

1. **Informational:** Koi event shu chhe?
2. **Explanatory:** Aa kem thayu?
3. **News-oriented:** Latest event shu chhe?
4. **Educational:** Scientific concept samajvo.
5. **Entity-based:** Specific telescope, person, organization athva project vishe janvu.
6. **Curiosity-based:** Unexpected event pachhal nu reason janvu.

Aa intent current source ane script mathi infer karvo.

User e target audience specify kari hoy to tene preference tarike use karvi. Target audience specify na hoy to reasonable audience infer kari shakay, pan inference ne confirmed user preference na manvi.

---

# 10. KEYWORD RESEARCH LOGIC

Keywords source ane script mathi generate thava joie, pan final selection relevance par depend kare.

## 10.1 Primary keyword

Video na central subject ne identify karto main keyword.

Example:

`NASA Swift Telescope`

## 10.2 Secondary keywords

Main topic sathe strongly related terms.

Example:

- Neil Gehrels Swift Observatory
- Swift Observatory
- NASA Swift mission

## 10.3 Supporting keywords

Video ma explain thata concepts.

Example:

- Atmospheric drag
- Solar activity
- Satellite re-entry

## 10.4 Long-tail keywords

Specific question athva phrase je audience search kari shake.

Example:

- Why is NASA Swift Telescope returning to Earth?
- NASA Swift Observatory mission ending
- Satellite atmospheric drag explained

Aa examples keyword candidates chhe. Live search data vagar engine e tene verified high-volume queries tarike label na karva.

## 10.5 Language variants

Target audience pramane:

- English keywords
- Hindi keywords
- Gujarati keywords
- Hinglish phrases
- Official names in original spelling

Badhi languages ma keywords add karva compulsory nathi. Je audience ane video sathe relevant hoy te j select karva.

## 10.6 Keyword scoring

Darek candidate keyword mate internal relevance score calculate kari shakay.

Suggested factors:

- Topic relevance
- Source support
- Script presence
- Entity importance
- Search intent match
- Language/audience match
- Redundancy penalty

Example scoring model:

`Keyword Score = Relevance + Entity Importance + Script Match + Search Intent Match - Redundancy Penalty`

Implementation ma weights configurable hova joie. Aa score internal ranking mate chhe; actual YouTube search volume athva ranking nu measurement nathi.

## 10.7 Keyword exclusions

Aa terms exclude athva down-rank karva:

- Video sathe unrelated trending terms
- Unsupported celebrity names
- Unrelated current events
- Misleading high-volume phrases
- Repeated keyword variations je koi extra meaning add na kare
- Script ma absent ane topic sathe unrelated claims

---

# 11. TITLE GENERATION ENGINE

Title no goal: video no subject clearly batavvo, relevant curiosity create karvi ane content sathe accurate match rakhvo.

## 11.1 Title inputs

- Main topic
- Primary entity
- Script hook
- Main event
- Search intent
- Target language
- Platform format
- Verified facts
- Misleading wording restrictions

## 11.2 Title construction logic

Possible structures:

**Structure A — Hook + entity**

`[Curiosity question] | [Main subject]`

**Structure B — Event + explanation**

`[Main event] kem thayu?`

**Structure C — Entity + important event**

`[Entity] nu mission kem samapt thayu?`

**Structure D — Question + key concept**

`[Main question]? [Relevant concept]`

Structure selection script na hook ane video content pramane thavi joie.

## 11.3 Hook preservation

User kahe ke title script na hook jevo j hovo joie, to original hook ne priority aapvi.

Pan factual correction jaruri hoy to unsupported claim preserve na karvo.

Engine be fields internally rakhishake:

- Original script hook
- SEO-safe title hook

## 11.4 Title validation

Title check karo:

- Main topic identify thay chhe?
- Primary entity relevant chhe?
- Video title na question no jawab aape chhe?
- Title factual rite supported chhe?
- Important qualification omit thai nathi?
- Unnecessary repetition chhe?
- Target language match kare chhe?
- Platform ni current title-length guidance comply kare chhe?
- Hashtag add karvo relevant chhe ke nahi?

## 11.5 Title output

Default ma ek recommended title aapvo.

Multiple alternatives user e specifically mangya hoy athva configuration ma enable hoy to j additional titles generate karva.

---

# 12. DESCRIPTION GENERATION ENGINE

Description video na content ne clear ane readable rite explain kare.

## 12.1 Description structure

### Section 1 — Opening hook

Video no main question athva important event short opening ma explain karvo.

### Section 2 — Main context

Subject shu chhe ane audience e aa video kem samajvo joie te batavvu.

### Section 3 — Main explanation

Script ma cover thata important facts ane cause-and-effect relationships explain karva.

### Section 4 — Video coverage

Video ma kaya points explain thay chhe te short bullets ma aapi shakay.

### Section 5 — Final takeaway

Story nu accurate outcome athva important conclusion.

### Section 6 — Disclaimer

User ni requirements ane actual production process pramane relevant disclaimer.

### Section 7 — Hashtags

Relevant ane limited hashtags.

Aa sections optional configuration thi adjust thai shake. Darek description ma badha sections compulsory nathi.

## 12.2 Description accuracy

Description ma evu promise na karvu je video ma cover thatu nathi.

Example:

Jo video fakt satellite ni orbital decline explain kare chhe, to description ma detailed technical investigation cover thay chhe evo claim na karvo.

## 12.3 Description readability

- Short paragraphs
- Clear wording
- Natural keyword placement
- Limited repetition
- Unnecessary keyword stuffing avoid karvu
- Important details ne logical order ma rakhvi
- Audience ne misleading information na aapvi

## 12.4 Description output

Description copy-paste-ready block ma aapvi.

SEO Engine ni internal notes, source-confidence scores athva analysis instructions description ni andar include na karva, sivay ke user specifically kahe.

---

# 13. DISCLAIMER ENGINE

Disclaimer user ni instruction ane actual video production details par depend kare.

## 13.1 Source disclaimer

Jo content user-provided source, research articles athva documentary materials par based hoy to description ma accurate statement aapi shakay.

Example:

“આ વિડિયો ઉપલબ્ધ જાહેર સ્ત્રોતોમાંથી મળેલી માહિતીના આધારે તૈયાર કરવામાં આવ્યો છે.”

Aa statement fakt actual process sathe match thatu hoy tyare use karvu.

## 13.2 AI-assisted production disclaimer

Script, voiceover, visuals ke editing ma AI tools use thaya hoy to actual workflow pramane disclosure wording banavvi.

Example:

“આ વિડિયોની સ્ક્રિપ્ટ અને વિઝ્યુઅલ પ્રસ્તુતિ તૈયાર કરવામાં AI-assisted tools નો ઉપયોગ કરવામાં આવ્યો છે.”

Jo AI-generated scenes actual footage nathi, to explanatory reconstruction ni clarification aapi shakay.

## 13.3 YouTube disclosure distinction

Description ma disclaimer lakhvo ane YouTube platform nu altered/synthetic-content disclosure setting select karvu e be alag vastu chhe.

Engine e current platform policy check karvi joie jyare relevant hoy. Realistic synthetic scenes, real events na altered depictions athva platform policy ma specified cases mate disclosure jaruri hoi shake.

Fakt AI-generated script hoy etle badha cases ma platform disclosure mandatory chhe evu assume na karvu.

## 13.4 Disclaimer safety rules

- “100% verified” jeva unsupported claims na karva.
- Source na hoy to specific source list invent na karvi.
- AI use thayu na hoy to AI disclaimer automatically add na karvo.
- Disclaimer no upyog factual errors justify karva na karvo.
- User e specific disclaimer aapyo hoy to ene preserve kari required edits j karva.

---

# 14. HASHTAG GENERATION ENGINE

Hashtags video na actual topic sathe relevant hova joie.

## 14.1 Hashtag selection

Candidate hashtags aa categories mathi aavi shake:

- Main entity
- Main topic
- Content category
- Target language
- Video format

Example:

`#NASA #SpaceNews #SpaceFacts #YouTubeShorts`

Aa fakt example chhe; darek project ma aa j hashtags use karvana nathi.

## 14.2 Hashtag validation

Check karo:

- Topic sathe relevant chhe?
- Correct spelling chhe?
- Duplicate chhe?
- Misleading chhe?
- Excessive quantity chhe?
- Current YouTube hashtag policies comply kare chhe?

Hashtag count ane formatting configurable hova joie.

## 14.3 Hashtag priority

Pehla primary topic na hashtags, pachhi relevant category ane language hashtags.

Unrelated trending hashtags use na karva.

---

# 15. TAG GENERATION ENGINE

Tags ane hashtags ne ek j vastu na manvi.

Tags YouTube Studio na tag field mate comma-separated keywords chhe.

## 15.1 Tag categories

1. Exact main entity
2. Common entity variation
3. Related topic
4. Technical term
5. Main event
6. Search-intent phrase
7. Target-language variation
8. Common spelling variation, jo relevant hoy

## 15.2 Tag generation rules

- Exact primary topic include karvo.
- Related names include karva, jo supported hoy.
- English ane target-language variants useful hoy to add karva.
- Duplicate tags remove karva.
- Unrelated terms remove karva.
- Title ane description ni important terminology sathe consistency rakhvi.
- Keyword stuffing avoid karvu.

## 15.3 Tag ranking

Tags ne relevance pramane order ma arrange karva.

Suggested order:

1. Main subject
2. Official entity name
3. Common subject name
4. Main event
5. Important technical terms
6. Relevant audience-language terms

## 15.4 Tag output

Default output comma-separated copy-paste string hovu joie.

Tags actual ranking improve karse evi guarantee aapvi nahi. Tags no role platform na current guidance pramane samjavvo.

---

# 16. SEO PACKAGE NA ADDITIONAL COMPONENTS

Core output sivay niche na components optional chhe.

## 16.1 Searchable keyword list

Keywords ne separate group ma aapi shakay:

- Primary keywords
- Secondary keywords
- Long-tail phrases
- Language variants

## 16.2 Thumbnail text suggestions

Aa component fakt user e thumbnail text mangyu hoy athva SEO workflow ma enabled hoy tyare execute karvo.

Thumbnail text:

- Short
- Readable
- Video hook sathe aligned
- Factual rite defensible
- Title ni exact unnecessary repetition vagar

Thumbnail text SEO package no optional component chhe, compulsory output nathi.

## 16.3 Pinned comment

Optional. User e mangyu hoy to j generate karvo.

## 16.4 Category suggestions

Optional. Video na actual content pramane relevant YouTube category suggest kari shakay.

## 16.5 Chapter suggestions

Primarily long-form videos mate useful. Shorts mate generally unnecessary, unless user explicitly requests them.

## 16.6 Source references

Internal traceability mate source references preserve karva.

User e source links mangya hoy to description ma factual claims support karta relevant links include kari shakay. Sources invent na karva.

---

# 17. PLATFORM POLICY ANE CURRENT INFORMATION CHECK

YouTube ni policies ane recommendations time sathe badlai shake chhe.

Etle SEO Engine ma be types na rules separate rakhva.

### Stable rules

- Topic relevance
- Factual accuracy
- Script-title consistency
- Duplicate keyword removal
- Correct project isolation
- Clear writing

### Changeable platform rules

- Title ane description limits
- Hashtag handling
- AI disclosure requirements
- Platform-specific formatting
- Metadata restrictions

Changeable rules ne hard-code kari ne permanently correct manva karta configurable policy layer athva verified current documentation thi maintain karva.

Live search volume available na hoy to keyword ne “high search volume” tarike label na karvo.

---

# 18. SEO GENERATION PIPELINE

Recommended execution pipeline aa chhe.

## Stage 1 — Project identification

Input: Project ID

Action:
- Active project identify karo.
- Project status verify karo.
- Relevant source ane script records locate karo.

Output: Project context.

## Stage 2 — Analysis retrieval

Action:
- Source Analysis retrieve karo.
- Script Analysis retrieve karo.
- Input versions ane links verify karo.

Output: Validated analysis records.

## Stage 3 — Completeness validation

Action:
- Main topic available chhe?
- Primary entity identify thay chhe?
- Script hook available chhe?
- Key facts available chhe?
- Important uncertainties available chhe?
- Source ane script versions match kare chhe?

Output: Validation status.

## Stage 4 — Content reconciliation

Action:
- Source ane script ni facts compare karo.
- Mismatches identify karo.
- Unsupported claims flag karo.
- Correct wording establish karo.

Output: Reconciled content map.

## Stage 5 — SEO intent determination

Action:
- Video informational chhe ke news-oriented?
- Main audience question shu chhe?
- Primary keyword shu chhe?
- Video nu actual promise shu chhe?

Output: SEO intent profile.

## Stage 6 — Keyword candidate generation

Action:
- Source entities mathi terms extract karo.
- Script hook mathi search phrases derive karo.
- Related concepts add karo.
- Language variants identify karo.

Output: Candidate keyword list.

## Stage 7 — Keyword filtering and ranking

Action:
- Relevance score calculate karo.
- Unsupported terms remove karo.
- Duplicates remove karo.
- Misleading terms exclude karo.

Output: Ranked keywords.

## Stage 8 — Title generation

Action:
- Script hook ane primary entity use karo.
- Relevant title structure select karo.
- Factual accuracy validate karo.

Output: Recommended title.

## Stage 9 — Description generation

Action:
- Hook
- Context
- Key facts
- Explanation
- Conclusion
- Applicable disclaimer
- Hashtags

Output: Complete description.

## Stage 10 — Tag and hashtag generation

Action:
- Relevant terms select karo.
- Redundancy remove karo.
- Correct formatting apply karo.

Output: Copy-paste tags ane hashtags.

## Stage 11 — Final validation

Action:
- Source consistency
- Script consistency
- Factual accuracy
- Language consistency
- Policy compliance
- Formatting
- Missing fields

Output: Validated SEO package.

## Stage 12 — Save and trace

Action:
- SEO output save karo, jo app ma saving enabled hoy.
- Used analysis IDs ane versions record karo.
- Generation status store karo.

Output: Traceable SEO result.

---

# 19. FINAL SEO VALIDATION CHECKLIST

SEO result user ne aapta pehla engine e niche ni checklist evaluate karvi.

## Project validation

- [ ] Correct Project ID use thayu.
- [ ] Bija project no data mix nathi thayo.
- [ ] Correct source version use thai.
- [ ] Correct script version use thai.
- [ ] Analysis records available ane valid chhe.

## Source validation

- [ ] Main facts source analysis sathe match kare chhe.
- [ ] Dates ane numbers verify thayela chhe.
- [ ] Names correct chhe.
- [ ] Uncertain claims ne certainty tarike present nathi karya.
- [ ] Unsupported details add nathi karya.

## Script validation

- [ ] Title main hook sathe match kare chhe.
- [ ] Description video na actual content ne explain kare chhe.
- [ ] Script ma absent events add nathi karya.
- [ ] Video je promise kare chhe te deliver kare chhe.
- [ ] CTA relevant chhe.

## SEO validation

- [ ] Primary keyword clearly identifiable chhe.
- [ ] Secondary keywords relevant chhe.
- [ ] Keywords natural language ma use thayela chhe.
- [ ] Title misleading nathi.
- [ ] Description readable chhe.
- [ ] Hashtags relevant chhe.
- [ ] Tags duplicate athva unrelated nathi.

## Disclaimer validation

- [ ] Disclaimer actual production process sathe match kare chhe.
- [ ] AI use vishe unsupported statement nathi.
- [ ] Synthetic visuals ni clarification relevant hoy to aapeli chhe.
- [ ] Platform disclosure ne description disclaimer thi alag treat karyu chhe.

## Output validation

- [ ] Title separate copy-paste block ma chhe.
- [ ] Description separate block ma chhe.
- [ ] Tags comma-separated chhe.
- [ ] Hashtags clearly identifiable chhe.
- [ ] User e na mangeli extra deliverables include nathi kari.

---

# 20. ERROR HANDLING

Engine e missing data ane invalid data handle karva mate defined behavior hovu joie.

## Case A — Source Analysis missing

Action:
- Available workflow ma source analysis function invoke karo.
- Source access na hoy to missing data report karo.
- Analysis already thai gayu hoy evo claim na karvo.

## Case B — Script Analysis missing

Action:
- Script Analysis generate karva supported workflow invoke karo, athva required data mango.
- Analysis available na hoy to limitation clearly batavo.

## Case C — Source Analysis stale

Action:
- Source version compare karo.
- Stale analysis ne current tarike use na karo.
- Reanalysis athva revalidation required mark karo.

## Case D — Script Analysis stale

Action:
- Current script version verify karo.
- Stale script analysis ne regenerate athva revalidate karo.

## Case E — Source ane script conflict

Action:
- Conflict identify karo.
- Unsupported claim SEO ma reproduce na karo.
- Material conflict unresolved hoy to user ne clarification mate pucho.

## Case F — Keywords mate insufficient evidence

Action:
- Supported core keywords use karo.
- Unsupported search-volume claims na karo.
- Jarur hoy to web research require karo.

## Case G — SEO generation failure

Action:
- Error status record karo.
- Available inputs preserve karo.
- User ne clear error reason aapo.
- Partial output aapo to tene partial tarike label karo.

## Case H — Project ID missing

Action:
- Current active project context available chhe ke nahi te check karo.
- Ambiguity resolve na thay to project identify karva user ne pucho.
- Random project select na karo.

---

# 21. RECOMMENDED FUNCTION ARCHITECTURE

SEO Engine ne ek moti indivisible function banavva karta multiple logical functions ma divide karvu better chhe.

Actual code language ane database architecture development darmiyan decide kari shakay.

## Function 1 — `get_current_project_context()`

**Purpose:** Active project ni identity ane metadata retrieve karvi.

Input:
- Project ID athva active-project reference

Output:
- Project ID
- Project metadata
- Project status

## Function 2 — `get_source_analysis(project_id)`

**Purpose:** Current project nu valid Source Analysis retrieve karvu.

Output:
- Source Analysis ID
- Source version
- Analysis status
- Extracted facts
- Source references

## Function 3 — `get_script_analysis(project_id)`

**Purpose:** Current project nu valid Script Analysis retrieve karvu.

Output:
- Script Analysis ID
- Script version
- Main hook
- Main topic
- Key events
- Audience intent
- Important claims

## Function 4 — `validate_analysis_versions()`

**Purpose:** Analyses current source ane script sathe match kare chhe ke nahi te check karvu.

Output:
- Valid / stale / missing status
- Required actions

## Function 5 — `reconcile_source_and_script()`

**Purpose:** Source ane script na claims compare karva.

Output:
- Confirmed facts
- Script-supported facts
- Conflicts
- Uncertain claims
- Safe wording suggestions

## Function 6 — `build_content_map()`

**Purpose:** SEO generation mate consolidated content representation banavvu.

Output:
- Main topic
- Primary entity
- Hook
- Main event
- Key facts
- Conclusion
- Search intent
- Restrictions

## Function 7 — `generate_keyword_candidates()`

**Purpose:** Relevant keyword candidates generate karva.

Output:
- Primary keyword candidates
- Secondary keywords
- Long-tail queries
- Language variants

## Function 8 — `rank_and_filter_keywords()`

**Purpose:** Keywords ne relevance pramane rank karva ane irrelevant terms remove karva.

Output:
- Ranked keyword list
- Exclusion reasons

## Function 9 — `generate_title()`

**Purpose:** Hook, primary entity ane factual context na basis par title generate karvo.

Output:
- Recommended title
- Optional internal rationale
- Validation status

## Function 10 — `generate_description()`

**Purpose:** Structured YouTube description generate karvi.

Output:
- Opening hook
- Context
- Main explanation
- Conclusion
- Applicable disclaimer
- Hashtags

## Function 11 — `generate_hashtags()`

**Purpose:** Relevant hashtags generate ane validate karva.

Output:
- Hashtag list
- Formatted hashtag string

## Function 12 — `generate_tags()`

**Purpose:** YouTube Studio mate comma-separated tags generate karva.

Output:
- Ordered tag list
- Copy-paste string

## Function 13 — `validate_seo_package()`

**Purpose:** Final package ni accuracy, consistency ane formatting check karvi.

Output:
- Validation status
- Issues
- Warnings
- Approved output athva revision request

## Function 14 — `save_seo_result()`

**Purpose:** Final output ane input traceability save karvi.

Output:
- SEO record ID
- Used analysis IDs
- Version references
- Save status

Aa function architecture logical recommendation chhe. Darek function ne alag server endpoint banavvo compulsory nathi. Implementation ma related functions combine pan kari shakay.

---

# 22. RECOMMENDED DATA STRUCTURE

SEO result ma structured data rakhvu useful chhe.

Illustrative JSON structure:

```json
{
  "project_id": "PROJECT_ID",
  "seo_status": "draft",
  "input_references": {
    "source_analysis_id": "SOURCE_ANALYSIS_ID",
    "script_analysis_id": "SCRIPT_ANALYSIS_ID",
    "source_version": 1,
    "script_version": 1
  },
  "content_map": {
    "main_topic": "",
    "primary_entity": "",
    "script_hook": "",
    "main_event": "",
    "confirmed_facts": [],
    "uncertain_claims": [],
    "search_intent": ""
  },
  "seo_output": {
    "title": "",
    "description": "",
    "primary_keywords": [],
    "secondary_keywords": [],
    "hashtags": [],
    "tags": [],
    "disclaimer": ""
  },
  "validation": {
    "project_match": true,
    "analysis_versions_valid": true,
    "source_consistency": true,
    "script_consistency": true,
    "policy_check_status": "not_checked",
    "warnings": []
  }
}
```

Aa illustrative schema chhe. Actual implementation ma validation status ne boolean athva richer object tarike model kari shakay. Real project IDs, analysis IDs ane versions database mathi aavva joie; example values ne real records na manva.

---

# 23. USER-FACING OUTPUT FORMAT

Default ma user ne SEO Engine aa format ma result aape.

## 1. YouTube Title

Ek recommended title, copy-paste-ready.

## 2. YouTube Description

Complete description, copy-paste-ready.

## 3. Disclaimer

Description ma already included hoy to duplicate disclaimer alagthi aapvani jarur nathi, sivay ke user e separate field mangyu hoy.

## 4. Primary Keywords

Main search terms.

## 5. Secondary Keywords

Related search terms.

## 6. Hashtags

Relevant hashtags.

## 7. YouTube Tags

Comma-separated, copy-paste-ready tags.

## 8. Validation Notes

Fakt important warnings, jem ke:
- Source/script mismatch
- Unverified current claim
- Missing analysis
- AI disclosure consideration

Badhi internal reasoning user ne default ma show karvani jarur nathi. Detailed audit mode enable hoy to vadhu explanation aapi shakay.

---

# 24. QUALITY SCORING

Optional internal quality score implement kari shakay.

Suggested dimensions:

| Dimension | Shu check karvu |
|---|---|
| Factual accuracy | Claims available evidence sathe match kare chhe? |
| Source alignment | Main facts source analysis sathe consistent chhe? |
| Script alignment | SEO actual video ne represent kare chhe? |
| Keyword relevance | Keywords main topic sathe related chhe? |
| Readability | Title ane description clear chhe? |
| Metadata consistency | Title, description, hashtags ane tags aligned chhe? |
| Policy compliance | Relevant platform rules check thaya chhe? |
| Traceability | Output na input analysis references available chhe? |

Aa dimensions ne configurable weights sathe score kari shakay.

**Important:** Internal SEO quality score YouTube ranking score nathi. Engine 90/100 aape to eno matlab video search ma 90/100 ranking melavshe evo nathi.

---

# 25. SEO ENGINE MA SU NA HOVU JOIE?

Aa negative requirements explicitly define karvi jaruri chhe.

Engine e:

1. Bija project nu source analysis use na karvu.
2. Bija project ni script details current SEO ma mix na karvi.
3. Missing source facts invent na karva.
4. Script na exaggerated claim ne automatic factual truth na manvo.
5. Search volume data vagar high-volume keyword claim na karvo.
6. YouTube ranking ni guarantee na aapvi.
7. Unrelated trending hashtags add na karva.
8. Unnecessary keywords thi description bharvi nahi.
9. User e na mangyu hoy to thumbnail image, pinned comment athva extra package generate na karvo.
10. Analysis missing hoy to analysis access chhe evo claim na karvo.
11. Stale analysis ne current tarike use na karvi.
12. AI disclosure requirements vishe blanket assumption na karvi.
13. Current platform policy check karya vagar changing rules ne permanently correct na manva.
14. SEO output ne verified external research tarike describe na karvu jo external verification thayu na hoy.

---

# 26. SECURITY, PRIVACY ANE DATA ISOLATION

App multi-project athva multi-user hoy to project isolation critical chhe.

Requirements:

- Project access permissions validate karvi.
- User ne access na hoy te project nu data retrieve na karvu.
- Project ID par database-level filtering karvi.
- Saved analysis ni provenance preserve karvi.
- User data ne unrelated project ma automatically reuse na karvu.
- Cross-project reuse mate explicit permission ane defined logic rakhvu.
- Logs ma unnecessary sensitive information store na karvi.
- Delete athva archive operations ne project data-retention rules pramane handle karva.

Project isolation fakt prompt instruction par depend na hovu joie. Application ane database layer par pan enforce thavu joie.

---

# 27. TEST CASES

SEO Engine implement karta pehla aa scenarios test karva.

### Test 1 — Source ane script banne current chhe

Expected:
- Existing analyses reuse thay.
- SEO package generate thay.
- Input references preserve thay.

### Test 2 — Source Analysis missing chhe

Expected:
- Analysis workflow invoke thay athva missing data error male.
- Unsupported facts invent na thay.

### Test 3 — Script edit thai chhe

Expected:
- Old Script Analysis stale mark thay.
- Current analysis generate/revalidate thay.
- SEO current script par based hoy.

### Test 4 — Wrong project ni analysis available chhe

Expected:
- Analysis reject thay.
- Current project ni correct analysis retrieve thay.
- Cross-project data mixing na thay.

### Test 5 — Script ma exaggerated claim chhe

Expected:
- Claim flag thay.
- Title ane description ma misleading certainty avoid thay.

### Test 6 — Keyword unrelated chhe

Expected:
- Keyword remove athva down-rank thay.

### Test 7 — AI visuals use thaya nathi

Expected:
- AI-generated visuals no false disclaimer add na thay.

### Test 8 — External search data available nathi

Expected:
- Relevant keyword suggestions aave.
- Search volume vishe unsupported claims na thay.

### Test 9 — User only title mange chhe

Expected:
- Fakat title output thay, sivay ke app configuration ma bija fields mandatory hoy.

### Test 10 — User complete SEO package mange chhe

Expected:
- Title, description, keywords, hashtags, tags ane applicable disclaimer generate thay.

### Test 11 — Source ma uncertainty chhe

Expected:
- Description ma appropriate qualification preserve thay.

### Test 12 — Source version update thay chhe

Expected:
- Old Source Analysis stale thay.
- Old analysis current SEO mate automatically reuse na thay.

---

# 28. ACCEPTANCE CRITERIA

SEO Engine function successful tyare ganay jyare:

1. Te correct current project ne identify kare.
2. Existing valid Source Analysis reuse kare.
3. Existing valid Script Analysis reuse kare.
4. Source ane script versions validate kare.
5. Factual mismatch detect kare.
6. Current content mathi keywords derive kare.
7. Title script na hook sathe match kare.
8. Description source facts ane script content sathe match kare.
9. Relevant tags ane hashtags generate kare.
10. Disclaimer actual production process sathe match kare.
11. Copy-paste-ready output aape.
12. SEO output na source-analysis ane script-analysis references preserve kare.
13. Missing data athva uncertainty hide na kare.
14. Bija project nu data mix na kare.
15. SEO ranking ni guarantee na aape.
16. Final result ma unnecessary components add na kare.

---

# 29. COMPLETE FUNCTION LOGIC — PSEUDOCODE

Niche overall execution logic chhe.

```text
FUNCTION run_seo_engine(project_id, user_preferences):

    1. Validate project_id.
       If invalid:
           Return project identification error.

    2. Load current project context.

    3. Retrieve Source Analysis for this project.

    4. Retrieve Script Analysis for this project.

    5. Validate that both analyses belong to the same project.

    6. Validate source and script versions.

    7. If an analysis is missing or stale:
           Invoke supported analysis workflow
           OR return a clear missing-data status.

    8. Build the factual content map from Source Analysis.

    9. Build the story and hook map from Script Analysis.

   10. Compare source facts against script claims.

   11. Identify:
           Confirmed facts
           Uncertain claims
           Contradictions
           Unsupported claims
           Required qualifications

   12. If a material conflict remains unresolved:
           Do not silently invent a resolution.
           Request clarification or return a flagged draft.

   13. Determine the primary topic and search intent.

   14. Generate keyword candidates.

   15. Rank and filter the keyword candidates.

   16. Generate the recommended title.

   17. Generate the description.

   18. Generate applicable disclaimer wording.

   19. Generate relevant hashtags.

   20. Generate comma-separated YouTube tags.

   21. Validate all outputs against:
           Source Analysis
           Script Analysis
           User preferences
           Platform requirements

   22. If validation fails:
           Revise the affected fields
           OR return a clear warning.

   23. Format the final SEO package.

   24. Save the result if persistence is enabled.

   25. Record source and script analysis references.

   26. Return the SEO package and validation status.
```

---

# 30. FINAL DESIGN PRINCIPLE

SEO Engine ni design ma sauthi important separation aa chhe:

**Analysis functions content samje chhe. SEO functions e content ne YouTube metadata ma convert kare chhe. Validation functions ensure kare chhe ke final metadata accurate ane relevant rahe.**

Etle SEO Engine e original source nu analysis farithi banavvani jarur nathi jo valid Source Analysis already available hoy. E j rite, Script Analysis already current hoy to script ne farithi analyse karvani jarur nathi.

Pan source ke script update thai hoy, analysis missing hoy athva version mismatch hoy to engine e old analysis blindly reuse na karvi.

Aa architecture thi darek nava project mate alag source ane alag script handle kari shakay, analyses reuse kari shakay ane final SEO package ne traceable, consistent ane maintainable banavi shakay.

**Recommended core workflow:**

`Project Context → Source Analysis Retrieval → Script Analysis Retrieval → Version Validation → Content Reconciliation → Keyword Selection → Title Generation → Description Generation → Tags & Hashtags → Final Validation → Save & Return`

Aa SEO Engine ni functional skill specification chhe. Actual app development ma have darek function na input schema, output schema, database model, API boundaries, permissions ane execution details alagthi define kari shakay.
