# STORY-TO-SCRIPT SKILL
## Master Specification — Version 1.0 (Draft)

**Status:** Draft — Discussion and Approval Pending

## 1. Skill Overview

**Skill Name:** Story-to-Script Skill

**Purpose:** કોઈપણ પ્રકારના Source માંથી માહિતીનું ઊંડાણપૂર્વક વિશ્લેષણ કરીને, પસંદ કરેલી Video Duration અનુસાર, ચોક્કસ માહિતી પર આધારિત Hindi Short-Form Video Script બનાવવી.

આ Skill નો હેતુ માત્ર Summary બનાવવાનો નથી. તેણે Source સમજવો, મહત્વપૂર્ણ માહિતી ઓળખવી, યોગ્ય Story Angle પસંદ કરવો, Story Flow બનાવવો, Script લખવી અને Output ની ગુણવત્તા ચકાસવી.

આ Skill ભવિષ્યમાં અલગથી ઉપયોગ કરી શકાય તેવી હોવી જોઈએ અને અન્ય Content Creation Skills સાથે જોડાઈ શકે તેવી રીતે Design થવી જોઈએ.

## 2. Supported Source Types

Skill ને શક્ય હોય ત્યાં સુધી નીચેના પ્રકારના Sources સાથે કામ કરવા માટે Design કરવી:

- News Articles
- Documentary Transcripts
- Film Stories અને Synopses
- Historical Events
- Science અને Technology Content
- Research Papers અને Reports
- Educational Content
- Biographies
- Business Case Studies
- General Informational Articles
- User-provided Stories
- Multiple Related Sources

Source Text, URL અથવા Document સ્વરૂપે હોઈ શકે છે. Audio અને Video Processing ભવિષ્યમાં અલગથી સપોર્ટ ઉમેરવામાં આવે ત્યારે જ ઉપલબ્ધ માનવા.

જો URL Access ન થઈ શકે અથવા Document વાંચી ન શકાય, તો Skill એ Access થઈ ગયો હોવાનો દાવો ન કરવો. જરૂરી હોય તો User ને Text Paste કરવા અથવા વાંચી શકાય તેવો Document આપવા જણાવવું.

## 3. Core Operating Principles

1. Source પહેલાં સમજવો, પછી Script લખવી.
2. Internal Analysis અને Final Script Generation ને અલગ તબક્કા તરીકે રાખવા.
3. User ને સામાન્ય રીતે Final Script જ બતાવવી; Internal Analysis બતાવવી નહીં.
4. Source માંથી મળેલા Facts અને AI ના Interpretations વચ્ચે તફાવત રાખવો.
5. પુરાવા વગર નવી ઘટનાઓ, આંકડા, Quotes, Motives અથવા Conclusions બનાવવાં નહીં.
6. Duration પ્રમાણે માહિતીની પસંદગી બદલવી; માત્ર Script ટૂંકી કે લાંબી ન કરવી.
7. દરેક Part માં એક સ્પષ્ટ મુખ્ય વિચાર રાખવો.
8. Story Flow સ્વાભાવિક, સમજાય એવો અને બિનપુનરાવર્તિત હોવો જોઈએ.
9. Script સરળ, સ્વાભાવિક Hindi માં Devanagari લિપિમાં હોવી જોઈએ.
10. Visual Suggestions અને On-screen Text Script સાથે સુસંગત હોવા જોઈએ.
11. Output આપતાં પહેલાં Quality Validation કરવી.
12. Source અપૂરતો હોય અથવા કોઈ મહત્વપૂર્ણ બાબત ચકાસી ન શકાય, તો તેને કલ્પનાથી ન ભરવી.
13. આ Skill નું અસ્તિત્વ અથવા Specification હોવું એ કાર્યરત Software Implementation નો પુરાવો નથી.

## 4. Input Specification

### 4.1 Required Input

- Source Content અથવા Source સુધી Access કરવાની યોગ્ય રીત.

### 4.2 Optional Input

- Video Duration
- Target Audience
- Preferred Story Angle
- Tone અથવા Style
- Platform
- કોઈ ખાસ વિષય પર Focus
- એકથી વધુ Sources
- User દ્વારા આપેલી વધારાની સૂચનાઓ

### 4.3 Default Behavior

જો User એ Duration ન આપી હોય, તો Skill એ નક્કી કરેલી Default Duration વાપરવી અથવા એક વાર સ્પષ્ટતા માગવી. Default Duration હજી મંજૂર કરવાની બાકી છે.

જો User એ Audience અથવા Tone ન આપ્યો હોય, તો મંજૂર કરેલા Default Rules પ્રમાણે આગળ વધવું. આ Defaults હજી નક્કી કરવાના બાકી છે.

## 5. Complete Processing Pipeline

Skill એ નીચેના ક્રમમાં કામ કરવું:

1. Input Validation
2. Source Reading અને Content Extraction
3. Content Type Detection
4. Deep Story Analysis
5. Fact અને Evidence Mapping
6. Story Angle Identification
7. Story Angle Selection
8. Audience અને Duration Planning
9. Story Structure Planning
10. Hindi Script Generation
11. Visual Suggestions Generation
12. On-screen Text Generation
13. Quality Validation
14. Error Correction અને Revalidation
15. Final Output

દરેક Step ની જવાબદારી અલગથી સ્પષ્ટ હોવી જોઈએ, ભલે Implementation દરમિયાન કેટલીક Steps એક જ Software Function દ્વારા ચલાવવામાં આવે.

## 6. Stage 1 — Input Validation

ચકાસવાના મુદ્દા:

- Source ખાલી તો નથી?
- Source વાંચી શકાય છે?
- URL ખરેખર Access કરી શકાય છે?
- Document માંથી જરૂરી Text Extract થયો છે?
- Source અધૂરો છે?
- એકથી વધુ Sources વચ્ચે કોઈ સંબંધ છે?
- Content માં Duplicate અથવા અસંબંધિત ભાગો છે?
- ઉપલબ્ધ માહિતી પરથી User નું કામ કરી શકાય છે?

જો Source ઉપલબ્ધ ન હોય, તો તેની માહિતી બનાવી ન લેવી.

જો Source ખૂબ ટૂંકો અથવા અસ્પષ્ટ હોય, તો ઉપલબ્ધ માહિતી પ્રમાણે મર્યાદિત Script બનાવી શકાય કે User પાસેથી વધુ માહિતી માગવી તે મંજૂર કરેલા Rules પ્રમાણે નક્કી કરવું.

## 7. Stage 2 — Content Type Detection

Skill એ એક અથવા એકથી વધુ લાગુ પડતા Content Types ઓળખવા:

- News
- Documentary
- Film Story
- History
- Science
- Technology
- Research
- Biography
- Business Case Study
- Educational Content
- General Information
- Mixed Content

Content Type પ્રમાણે Specialized Analysis બદલાશે.

એક જ Source માં અનેક પ્રકારના Content હોય તો માત્ર એક Category પસંદ કરીને અન્ય સંબંધિત પાસાં અવગણવા નહીં.

જો Category સ્પષ્ટ ન હોય, તો Core Analysis ચાલુ રાખીને જરૂરી Specialized Analysis ઉપલબ્ધ માહિતી પ્રમાણે પસંદ કરવું.

## 8. Stage 3 — Deep Story Analysis

### 8.1 Main Topic

- Source નો મુખ્ય વિષય શું છે?
- મુખ્ય ઘટના, વિચાર, પાત્ર, સમસ્યા અથવા શોધ કઈ છે?
- મુખ્ય અને સહાયક વિષયો વચ્ચે શું તફાવત છે?

### 8.2 Core Message

- Source નો મુખ્ય સંદેશ શું છે?
- તે શું સમજાવવા માગે છે?
- મુખ્ય નિષ્કર્ષ કયો છે?
- એકથી વધુ સંદેશ હોય તો કયો સૌથી સંબંધિત છે?

### 8.3 Background અને Context

- ઘટના અથવા વિચારની શરૂઆત કેવી રીતે થઈ?
- કઈ પરિસ્થિતિઓએ તેને પ્રભાવિત કર્યો?
- પહેલાં શું બન્યું હતું?
- Story સમજવા માટે કઈ Background Information જરૂરી છે?

### 8.4 Key Facts

દરેક મહત્વપૂર્ણ Fact માટે શક્ય હોય ત્યાં સુધી ઓળખવું:

- શું બન્યું?
- કોણ અથવા શું સંબંધિત છે?
- ક્યારે બન્યું?
- ક્યાં બન્યું?
- કયા આંકડા અથવા માપ ઉપલબ્ધ છે?
- Source માં તે માહિતી ક્યાં આપવામાં આવી છે?
- માહિતી સ્પષ્ટ Fact છે, Attribution સાથેનો Claim છે કે Interpretation છે?

### 8.5 Causes અને Motivations

- ઘટના શા માટે બની?
- મુખ્ય કારણો કયા છે?
- કયા નિર્ણયો લેવામાં આવ્યા?
- કોઈ વ્યક્તિ અથવા સંસ્થાના હેતુ વિશે Source શું કહે છે?
- કયા કારણો સ્પષ્ટ છે અને કયા માત્ર અનુમાન છે?

પુરાવા વગર કોઈ વ્યક્તિના હેતુ અથવા વિચાર વિશે નિશ્ચિત દાવો ન કરવો.

### 8.6 Process અને Mechanism

જ્યાં લાગુ પડે ત્યાં:

- પ્રક્રિયા કેવી રીતે કામ કરે છે?
- મુખ્ય Steps કયા છે?
- કયા Components અથવા Factors મહત્વપૂર્ણ છે?
- એક Step પછી બીજો Step કેવી રીતે આવે છે?
- કઈ સમજૂતી અથવા ઉદાહરણ જરૂરી છે?

### 8.7 Conflict અને Turning Points

જ્યાં લાગુ પડે ત્યાં:

- મુખ્ય સમસ્યા અથવા Conflict શું છે?
- Story માં શું બદલાયું?
- કઈ ઘટના Story ને નવી દિશા આપે છે?
- કયો Turning Point સૌથી મહત્વપૂર્ણ છે?
- ઘટના પહેલાં અને પછી શું તફાવત પડ્યો?

Conflict અથવા Twist ન હોય તો તેને કૃત્રિમ રીતે બનાવવો નહીં.

### 8.8 Timeline અને Sequence

- ઘટનાઓ કયા ક્રમમાં બની?
- તારીખો અથવા સમય ઉપલબ્ધ છે?
- કોઈ ઘટનાનો ક્રમ અસ્પષ્ટ છે?
- કયો ક્રમ Story ને વધુ સ્પષ્ટ બનાવે છે?

### 8.9 Impact અને Consequences

- ઘટનાથી શું બદલાયું?
- કોના પર અસર પડી?
- તાત્કાલિક અને લાંબા ગાળાની અસરો કઈ છે?
- કયા પરિણામો Source દ્વારા સમર્થિત છે?
- કયા પરિણામો અનિશ્ચિત છે?

### 8.10 Interesting Details

- કઈ Detail ખાસ મહત્વપૂર્ણ છે?
- કઈ માહિતી સામાન્ય સમજમાં વધારો કરે છે?
- કઈ તુલના અથવા ઉદાહરણ ઉપયોગી છે?
- કઈ Detail ટૂંકી Video માટે સૌથી યોગ્ય છે?

માત્ર આશ્ચર્ય પેદા કરવા માટે અપ્રમાણિત અથવા ભ્રામક Detail પસંદ ન કરવી.

### 8.11 Limitations અને Unknowns

- Source શું જણાવતો નથી?
- કઈ બાબત અસ્પષ્ટ છે?
- કયા દાવા માટે વધારાના પુરાવાની જરૂર છે?
- કોઈ વિરોધાભાસ છે?
- ઉપલબ્ધ માહિતીથી કયો નિષ્કર્ષ કાઢી શકાય નહીં?

### 8.12 Specialized Analysis

Content Type પ્રમાણે વધારાની તપાસ:

**News:** ઘટના, તારીખ, સ્થળ, સંબંધિત વ્યક્તિઓ, Attribution અને અસર.

**Film Story:** Characters, Goals, Relationships, Conflict, Plot Progression અને Resolution.

**History:** Timeline, Historical Context, મુખ્ય વ્યક્તિઓ, કારણો અને પરિણામો.

**Science:** Scientific Concept, Mechanism, Evidence, Research Findings અને Limitations.

**Technology:** સમસ્યા, Technology નો Mechanism, ઉપયોગો, લાભો અને મર્યાદાઓ.

**Research:** Research Question, Method, Sample અથવા Data, Findings, Limitations અને Conclusions.

**Biography:** વ્યક્તિની પૃષ્ઠભૂમિ, મુખ્ય ઘટનાઓ, નિર્ણયો અને યોગદાન.

**Business Case Study:** સમસ્યા, નિર્ણય, Strategy, Execution, પરિણામ અને શીખ.

આ Specialized Checklists પ્રારંભિક સૂચનો છે. Final Scope મંજૂર કર્યા પછી જ તેને સ્થિર નિયમો માનવા.

## 9. Stage 4 — Fact અને Evidence Mapping

દરેક મહત્વપૂર્ણ દાવાને શક્ય હોય ત્યાં સુધી તેના Source Evidence સાથે જોડવો.

Evidence Reference માં ઉપલબ્ધતા પ્રમાણે નીચેનું હોઈ શકે:

- Source Text નો સંબંધિત ભાગ
- Section અથવા Heading
- Page Number
- Timestamp
- URL અથવા Document Reference

દરેક Claim ને Internal રીતે નીચે જેવી Category આપી શકાય:

- Source-supported
- Attributed Claim
- Interpretation
- Uncertain
- Unknown
- Contradictory Evidence

આ Categories ના ચોક્કસ નિયમો હજી મંજૂર કરવાના બાકી છે.

મુખ્ય સિદ્ધાંત: Source માં કોઈ દાવો લખેલો હોવો એ દાવો સ્વતંત્ર રીતે સાચો સાબિત થયો હોવા સમાન નથી.

જ્યાં External Fact-Checking ઉપલબ્ધ ન હોય, ત્યાં સ્વતંત્ર ચકાસણી પૂર્ણ થઈ હોવાનો દાવો ન કરવો.

## 10. Stage 5 — Story Angle Selection

એક જ Source માંથી અલગ-અલગ Stories બનાવી શકાય છે.

Skill એ સંભવિત Angles ઓળખીને પસંદ કરેલી Duration અને User ના હેતુ માટે સૌથી યોગ્ય Angle પસંદ કરવો.

પસંદગી માટેના સૂચિત માપદંડ:

1. Source સાથેની સુસંગતતા
2. Fact આધારની મજબૂતી
3. Audience માટેની ઉપયોગિતા
4. રસપ્રદતા અને Curiosity
5. Duration માં સમજાવી શકાય તેવી ક્ષમતા
6. Story Flow ની સ્પષ્ટતા
7. જરૂરી Context માટે ઉપલબ્ધ જગ્યા
8. ભ્રામક Sensationalism ટાળવાની ક્ષમતા

Angle પસંદ કરવા માટે ચોક્કસ Scoring Formula હજી નક્કી કરવાનું બાકી છે.

## 11. Stage 6 — Duration અને Part Planning

દરેક Part માટે લક્ષિત Duration: 8 Seconds.

પ્રારંભિક મંજૂર કરાયેલા Structure પ્રમાણે:

- 24 Seconds: 3 Parts
- 32 Seconds: 4 Parts
- 40 Seconds: 5 Parts
- 48 Seconds: 6 Parts
- 56 Seconds: 7 Parts

Structure:

- પ્રથમ Part: Hook
- વચ્ચેના Parts: Story
- છેલ્લો Part: Ending

60 Seconds માટે અલગ નિર્ણય જરૂરી છે, કારણ કે તે 8 Seconds ના સમાન Parts માં બરાબર વહેંચાતું નથી.

Duration પ્રમાણે માહિતીની પસંદગી બદલવી. ટૂંકી Video માં મુખ્ય મુદ્દાઓ રાખવા અને લાંબી Video માં વધારાની સંબંધિત વિગતો ઉમેરી શકાય.

કોઈપણ Duration માં માત્ર સમય ભરવા માટે અનાવશ્યક માહિતી ઉમેરવી નહીં.

## 12. Stage 7 — Story Structure Planning

Script લખતા પહેલાં Internal Story Plan તૈયાર કરવો.

Plan માં:

- Selected Story Angle
- મુખ્ય Message
- શરૂઆતમાં રજૂ કરવો જરૂરી પ્રશ્ન અથવા મુદ્દો
- જરૂરી Background
- Facts નો Logical Sequence
- મહત્વપૂર્ણ Turning Points, જો લાગુ પડે
- મુખ્ય પરિણામ અથવા નિષ્કર્ષ
- દરેક Part નો હેતુ
- દરેક Part માટે પસંદ કરેલી માહિતી

દરેક Part આગળના Part સાથે સંબંધિત હોવો જોઈએ.

Story Structure Source ના પ્રકાર અને પસંદ કરેલા Angle પ્રમાણે બદલાઈ શકે છે.

## 13. Stage 8 — Hindi Script Generation

Script Hindi ભાષામાં અને Devanagari લિપિમાં હોવી જોઈએ.

### Hook Rules

- પ્રથમ Part માં આવવો જોઈએ.
- Curiosity પેદા કરવી જોઈએ.
- Source આધારિત હોવો જોઈએ.
- ખોટો અથવા અતિશયોક્તિભર્યો દાવો ન કરવો.
- બાકીની Story સાથે સંબંધિત હોવો જોઈએ.

### Story Rules

- દરેક Part માં એક મુખ્ય વિચાર રાખવો.
- Facts યોગ્ય ક્રમમાં રજૂ કરવા.
- જરૂરી Context સામેલ કરવો.
- અનાવશ્યક Repetition ટાળવું.
- સરળ અને સ્વાભાવિક ભાષા વાપરવી.
- Source નો અર્થ બદલવો નહીં.
- કલ્પિત Facts ઉમેરવા નહીં.

### Ending Rules

- છેલ્લો Part Ending હોવો જોઈએ.
- Story નો મુખ્ય મુદ્દો પૂર્ણ કરવો.
- યોગ્ય Conclusion અથવા Resolution આપવું.
- Source માં ન હોય તેવું ભવિષ્યનું પરિણામ બનાવવું નહીં.
- દરેક Ending માં જબરદસ્તી પ્રશ્ન, Moral અથવા Call to Action ઉમેરવો નહીં.

### Voiceover Timing

દરેક Part માટે આશરે 8 Seconds નો Voiceover લખવો.

માત્ર Word Count પરથી ચોક્કસ Timing નક્કી થતી નથી. બોલવાની ઝડપ, વિરામ અને ઉચ્ચાર પ્રમાણે સમય બદલાય છે.

Voiceover માટે યોગ્ય Word-Count Target અને Timing Test પદ્ધતિ હજી નક્કી કરવાની બાકી છે.

## 14. Stage 9 — Visual Suggestions

દરેક Part માટે સંબંધિત Visual Suggestions આપવી.

Visual Suggestions માં શક્ય હોય ત્યાં સુધી:

- Visual Type
- બતાવવાનો મુખ્ય વિષય
- જરૂરી Action અથવા Scene
- Voiceover સાથેનો સંબંધ
- જરૂરી હોય ત્યાં Text, Diagram અથવા Animation નો વિચાર

વાસ્તવિક Footage ઉપલબ્ધ હોવાનો દાવો ત્યારે જ કરવો જ્યારે તેની ખરાઈ થઈ હોય.

જો ચોક્કસ ઘટના માટે વિશ્વસનીય Visual ઉપલબ્ધ ન હોય, તો સંબંધિત Generic Visual, Diagram અથવા સ્પષ્ટ રીતે ઓળખી શકાય તેવી Reconstruction સૂચવી શકાય.

AI-generated Reconstruction ને વાસ્તવિક Historical અથવા Documentary Footage તરીકે ભ્રામક રીતે રજૂ ન કરવી.

## 15. Stage 10 — On-screen Text

દરેક Part માટે ટૂંકું On-screen Text આપવું.

નિયમો:

- મુખ્ય Fact, Keyword, Date અથવા Number પર Focus.
- Voiceover ને Support કરવું.
- આખું Voiceover ફરીથી લખવું નહીં.
- ખોટા અથવા અપ્રમાણિત આંકડા ઉમેરવા નહીં.
- વાંચવામાં સરળ અને ટૂંકું રાખવું.
- શક્ય હોય ત્યાં એક જ Screen પર અતિશય Text ટાળવું.

ચોક્કસ Character Limit અને Visual Design Rules હજી નક્કી કરવાના બાકી છે.

## 16. Stage 11 — Output Format

દરેક Part માટે સૂચિત Output Structure:

**Part Number:**  
**Part Type:** Hook / Story / Ending  
**Duration:** 8 Seconds  
**Hindi Voiceover:**  
**Visual Suggestions:**  
**On-screen Text:**

બધા Parts પછી પસંદ કરેલી કુલ Duration અને Part Count બતાવી શકાય.

Final Interface માં Copy Part, Copy All અને Regenerate જેવા વિકલ્પો ઉમેરવા માટે વિચારણા થઈ શકે છે. આ UI Features છે; તે Skill ની Core Logic નો ફરજિયાત ભાગ નથી.

Title, Caption અને Hashtags હજી મંજૂર થયેલા નથી.

## 17. Stage 12 — Quality Validation

Final Output આપતાં પહેલાં નીચેની બાબતો તપાસવી:

1. Part Count યોગ્ય છે.
2. દરેક Part માટે Duration યોગ્ય છે.
3. પ્રથમ Part Hook છે.
4. છેલ્લો Part Ending છે.
5. Story Flow Logical છે.
6. Script પસંદ કરેલા Angle સાથે સુસંગત છે.
7. મુખ્ય Facts Source સાથે સુસંગત છે.
8. અપ્રમાણિત દાવાઓને Confirmed Facts તરીકે રજૂ કર્યા નથી.
9. અનાવશ્યક Repetition નથી.
10. Voiceover બોલી શકાય એવો છે.
11. Hindi સરળ અને સ્વાભાવિક છે.
12. Visual Suggestions સંબંધિત છે.
13. On-screen Text સાચું અને ટૂંકું છે.
14. Ending નવી માહિતી બનાવતું નથી.
15. પસંદ કરેલી Duration મુજબ જરૂરી માહિતીની પસંદગી થઈ છે.

## 18. Error Correction

જો Validation નિષ્ફળ જાય:

1. નિષ્ફળ Check ઓળખવો.
2. સંબંધિત Part અથવા સમગ્ર Script સુધારવી.
3. ફરી Validation કરવી.
4. મર્યાદિત Attempts સુધી સુધારો કરવો.
5. ત્યાર પછી પણ નિષ્ફળતા રહે તો Error અથવા જરૂરી સ્પષ્ટતા બતાવવી.

Retry Limit અને Error Messages હજી નક્કી કરવાના બાકી છે.

Skill એ Validation સફળ થઈ હોવાનો દાવો ત્યારે જ કરવો જ્યારે જરૂરી Checks ખરેખર કરવામાં આવ્યા હોય.

## 19. Internal Analysis vs User-visible Output

Internal Analysis માં હોઈ શકે:

- Content Type
- Main Topic અને Core Message
- Key Facts
- Evidence References
- Story Angles
- Angle Selection
- Story Plan
- Fact Uncertainty
- Duration Plan
- Validation Results

સામાન્ય User-visible Output:

- Part Number અને Type
- Hindi Voiceover
- Visual Suggestions
- On-screen Text
- Total Duration અને Part Count

Internal Analysis સામાન્ય રીતે બતાવવી નહીં. Debugging અથવા ખાસ Analysis Report માટે અલગ Mode ઉમેરવો કે નહીં તે ભવિષ્યમાં નક્કી કરી શકાય.

## 20. Skill Boundaries

આ Skill ની જવાબદારી:

- Source સમજવું
- Story Analysis કરવું
- યોગ્ય Angle પસંદ કરવો
- Story Plan બનાવવો
- Hindi Script લખવી
- Visual Suggestions અને On-screen Text આપવું
- Output Validate કરવું

નીચેની જવાબદારીઓ અલગ Skills તરીકે રાખી શકાય:

- Source Acquisition અને Downloading
- Advanced Document અથવા Video Transcription
- Independent External Fact-Checking
- Image અને Video Generation
- Voiceover Generation
- Video Editing
- Publishing અને Scheduling
- Analytics અને Performance Optimization

આ અલગ Skills સાથે Integration કરવાનું હજી ભવિષ્યનું કામ છે.

## 21. Testing Plan

દરેક મુખ્ય Source Type પર અલગ Tests બનાવવાના રહેશે.

Test Cases માં આવરી લેવું:

- લાંબો News Article
- ટૂંકી News Report
- Film Synopsis
- Historical Story
- Technology Explanation
- Research Paper
- એકથી વધુ Sources
- અધૂરો Source
- વિરોધાભાસ ધરાવતી માહિતી
- અપ્રમાણિત Claim
- ખૂબ ટૂંકી Video Duration
- લાંબી Video Duration
- Source Access Failure

દરેક Test માટે અપેક્ષિત Input, Expected Behavior, Actual Output, Pass/Fail Status અને નોંધો રાખવી.

Testing થયા વગર Skill ને Fully Tested જાહેર ન કરવી.

## 22. Acceptance Criteria

Skill ને સફળ માનવા માટે:

- તે Source ને યોગ્ય રીતે Process કરી શકે.
- Content Type પ્રમાણે યોગ્ય Analysis કરી શકે.
- મહત્વપૂર્ણ Facts ને Source સાથે જોડવાનો પ્રયાસ કરે.
- Source-supported માહિતી અને Interpretation વચ્ચે તફાવત રાખે.
- પસંદ કરેલી Duration પ્રમાણે યોગ્ય Part Structure બનાવે.
- પ્રથમ Part Hook અને છેલ્લો Part Ending રાખે.
- સ્વાભાવિક Hindi Script આપે.
- દરેક Part માટે Visual Suggestions અને On-screen Text આપે.
- Repetition અને Unsupported Claims માટે Validation કરે.
- Error અથવા અધૂરા Source ને યોગ્ય રીતે Handle કરે.
- મંજૂર કરેલા Test Cases પાસ કરે.

આ Criteria માટે ચોક્કસ Thresholds અને Scoring Rules હજી મંજૂર કરવાના બાકી છે.

## 23. Future Integration Contract

ભવિષ્યમાં આ Skill ને અલગ Workflow માં જોડવા માટે નીચેના Interface ને પ્રસ્તાવિત કરી શકાય.

**Input:**
- Source Content
- Optional Duration
- Optional Audience
- Optional Tone
- Optional User Instructions

**Internal Processing:**
- Validation
- Analysis
- Evidence Mapping
- Angle Selection
- Story Planning
- Script Generation
- Quality Checks

**Output:**
- Structured Parts
- Hindi Voiceover
- Visual Suggestions
- On-screen Text
- Duration અને Part Count
- Validation Status

આ માત્ર Conceptual Contract છે. ચોક્કસ Data Schema, API અને Software Architecture પછી નક્કી થશે.

## 24. Development Status

- Skill Name: Defined
- Purpose: Defined
- Processing Pipeline: Drafted
- Analysis Categories: Drafted
- Duration Structure: Partially Defined
- Input Defaults: Pending
- Angle Scoring: Pending
- Timing Rules: Pending
- Output Schema: Drafted
- Validation Rules: Drafted
- Testing: Not Started
- Implementation: Not Started
- Integration: Not Started

Status ને વાસ્તવિક પુરાવા પ્રમાણે જ બદલવો.

## 25. Instructions for Any AI Continuing This Project

આ Document ને Story-to-Script Skill માટેના પ્રારંભિક Master Specification તરીકે ઉપયોગ કરવો.

આગળ કામ કરતી વખતે:

1. આ Document અને તેની Approval Status વાંચવી.
2. Draft Rules ને મંજૂર થયેલા Rules તરીકે ન માનવા.
3. User સાથે એક સમયે એક મહત્વપૂર્ણ નિર્ણય પર ચર્ચા કરવી.
4. User ની સ્પષ્ટ મંજૂરી વગર Core Logic બદલવી નહીં.
5. કોઈ Function અમલમાં મૂકવામાં આવ્યું છે અથવા Test થયું છે એવો દાવો પુરાવા વગર ન કરવો.
6. દરેક મંજૂર ફેરફાર Document માં Update કરવો.
7. નવી Version અને Change Log જાળવવા.
8. આ Skill ને બીજી Skills સાથે જોડતા પહેલાં Input/Output Compatibility ચકાસવી.
9. જ્યાં માહિતી અથવા નિયમ નક્કી ન હોય ત્યાં સ્પષ્ટ રીતે Pending તરીકે નોંધવું.
10. કોઈ બાબત અસ્પષ્ટ હોય તો અનુમાન કરીને Final Decision લેવાને બદલે User ને પૂછવું.

**End of Master Specification — Version 1.0 (Draft)**
