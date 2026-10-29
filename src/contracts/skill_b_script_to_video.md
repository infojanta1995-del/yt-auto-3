# SCRIPT-TO-VIDEO PROMPT ENGINEERING
## Complete Skill Definition & Functional Logic — Version 1.0

**Document Type:** AI Function / Skill Specification  
**Category:** AI Content Creation, Video Generation, Prompt Engineering  
**Primary Use Case:** તૈયાર Video Script ને AI Video Generator માટે Detailed Video Generation Prompts માં રૂપાંતરિત કરવી.  
**Target Platforms:** Google Flow અને અન્ય AI Video Generation Platforms.  
**Language Support:** Gujarati, Hindi, English અને અન્ય ભાષાઓ માટે વિસ્તરણક્ષમ.  
**Implementation Status:** Design Specification — Implementation Pending.

---

# 1. Skill નો પરિચય (Skill Overview)

## 1.1 Skill નું નામ

**Script-to-Video Prompt Engineering**

## 1.2 Skill શું કરે છે?

આ Skill તૈયાર Video Script ને Input તરીકે લે છે, Script ના દરેક Part નો હેતુ સમજે છે અને તે Part ને Visual Scene માં રૂપાંતરિત કરે છે.

ત્યારબાદ તે દરેક Scene માટે નીચેની વિગતો નક્કી કરે છે:

- Video માં શું દેખાવું જોઈએ?
- મુખ્ય Subject શું હશે?
- Subject શું Action કરશે?
- Scene નું Environment કેવું હશે?
- Camera ક્યાં હશે અને કેવી રીતે Move કરશે?
- Lighting અને Color Style કેવો હશે?
- Visuals નો Mood કેવો હશે?
- Scene કેટલા સમય સુધી ચાલશે?
- Voiceover માં કયા શબ્દો બોલાશે?
- Background Music અને Sound Effects કેવા હશે?
- બીજા Clips સાથે Visual Continuity કેવી રીતે જળવાશે?
- AI Video Generator ને કઈ બાબતો સ્પષ્ટ રીતે સૂચવવી જોઈએ?
- Final Prompt માં કઈ માહિતી ફરજિયાત હોવી જોઈએ?

આ બધી વિગતોને એક સુવ્યવસ્થિત Prompt માં જોડીને Final Output આપવામાં આવે છે.

## 1.3 Skill નું મુખ્ય લક્ષ્ય

Skill નું મુખ્ય લક્ષ્ય છે:

**Script માં રહેલી માહિતી અને વાર્તાના હેતુને જાળવી રાખીને તેને AI Video Generation માટે સ્પષ્ટ, દૃશ્યાત્મક, સમયબદ્ધ અને ટેક્નિકલ રીતે ઉપયોગી સૂચનાઓમાં ફેરવવી.**

આ Skill પોતે Video Generate કરતી નથી. તેનું મુખ્ય કામ Video Generator ને આપવા માટે Prompts તૈયાર કરવાનું છે.

Video Generation, Voice Generation, Music Generation અને Final Video Editing અલગ Functions હોઈ શકે છે.

---

# 2. Skill ની Scope અને Boundaries

આ વિભાગ મહત્વનો છે, કારણ કે App બનાવતી વખતે કયા કામ આ Skill ના છે અને કયા કામ બીજા Functions ના છે તે સ્પષ્ટ હોવું જોઈએ.

## 2.1 Skill ના મુખ્ય કામ

1. તૈયાર Script પ્રાપ્ત કરવી.
2. Script ના Parts ઓળખવા.
3. દરેક Part નો Storytelling Purpose સમજવો.
4. Script માં રહેલી મુખ્ય ઘટનાઓ, Objects અને Concepts ઓળખવા.
5. Script ને Visual Scenes માં ફેરવવી.
6. Scenes ને ઉપલબ્ધ સમય પ્રમાણે ગોઠવવી.
7. Camera, Lighting, Environment અને Visual Style નક્કી કરવાં.
8. Voiceover અને Audio સંબંધિત સૂચનાઓ ઉમેરવી.
9. અલગ Clips વચ્ચે Continuity જાળવવી.
10. Final AI Video Prompts તૈયાર કરવા.
11. Prompts ની Completeness અને Consistency તપાસવી.
12. Output ને User અથવા App દ્વારા નક્કી કરેલા Format માં આપવો.

## 2.2 Skill ના મૂળભૂત કામમાં શું સામેલ નથી?

આ Function ને સ્પષ્ટ રીતે નીચેના કામથી અલગ રાખવો જોઈએ:

- મૂળ Source Article શોધવો અથવા Research કરવો.
- Source Article માંથી નવી Script લખવી.
- Script ને Rewrite કરવી અથવા તેનું ભાષાંતર કરવું.
- AI Video Generator ને વાસ્તવમાં ચલાવવો.
- Generated Video ની સફળતાની ખાતરી આપવી.
- Final Video નું Editing અને Rendering કરવું.
- Video માટે Copyright અથવા Platform Policy Approval ની ખાતરી આપવી.

આ કામ માટે અલગ Functions બનાવી શકાય છે.

જો User માત્ર તૈયાર Script આપે, તો આ Skill એ સામાન્ય રીતે એ Script ને જ Input માનવી જોઈએ. User એ અલગથી ન કહ્યું હોય તો તેણે મૂળ Source Article નું ફરીથી Analysis કરવું કે Script ફરીથી લખવી નહીં.

---

# 3. Skill નું Input System

Input એટલે Skill ને કામ કરવા માટે આપવામાં આવતી માહિતી.

Skill નું પરિણામ Input ની ગુણવત્તા અને ઉપલબ્ધ વિગતો પર આધારિત રહેશે.

## 3.1 Required Input

### A. Video Script

આ Skill નું સૌથી મહત્વનું Input છે.

ઉદાહરણ:

Part 1:
“અંતરિક્ષના રહસ્યો શોધનાર NASA નો Telescope હવે પોતાનું Mission પૂરું કરી રહ્યો છે.”

Part 2:
“સૂર્યની વધતી પ્રવૃત્તિના કારણે વાતાવરણનો ખેંચાણ વધ્યો અને Telescope ની Orbital Altitude ઘટવા લાગી.”

Script માં એક Part હોઈ શકે છે અથવા અનેક Parts હોઈ શકે છે.

### B. Script Part Structure

Script નીચેના કોઈપણ Format માં હોઈ શકે છે:

- Part 1, Part 2, Part 3 જેવા અલગ Sections.
- Scene 1, Scene 2 જેવા Scene Labels.
- સમય પ્રમાણે વહેંચાયેલી Script.
- Paragraph અથવા Voiceover Text.
- Structured Data Format.

જો Script પહેલેથી Parts માં વહેંચાયેલી હોય, તો Skill એ શક્ય હોય ત્યાં સુધી એ જ Structure જાળવવી જોઈએ.

જો Script માં કોઈ Part Labels ન હોય, તો Skill તેને કેવી રીતે Process કરવી તે નક્કી કરી શકે છે; પરંતુ Script ને ફરીથી વહેંચવા માટે ઉપલબ્ધ Duration અને User ની સૂચનાઓ ધ્યાનમાં લેવી જોઈએ.

## 3.2 Optional Input

| Input | તેનો ઉપયોગ |
|---|---|
| Video Platform | Google Flow અથવા અન્ય Generator માટે Prompt Style નક્કી કરવા. |
| Aspect Ratio | 9:16, 16:9, 1:1 વગેરે. |
| Clip Duration | દરેક Video Clip કેટલો લાંબો હોવો જોઈએ. |
| Total Video Duration | આખા Video ની લંબાઈ. |
| Video Category | Documentary, Educational, Cinematic, Horror, Comedy વગેરે. |
| Visual Style | Realistic, 3D, Animation, Sci-fi વગેરે. |
| Narrator Gender | Male, Female અથવા અન્ય પસંદગી. |
| Narrator Language | Hindi, Gujarati, English વગેરે. |
| Narrator Voice | Calm, Deep, Energetic, Serious વગેરે. |
| Music Preference | Dramatic, Ambient, Emotional, Upbeat વગેરે. |
| Sound Effects | જરૂરી SFX અને તેમની Timing. |
| Reference Images | Visual Appearance માટેના References. |
| Character References | Characters નો દેખાવ જાળવવા માટે. |
| Object References | કોઈ ચોક્કસ Vehicle, Product, Telescope વગેરેનો દેખાવ જાળવવા માટે. |
| Color Palette | Video માં ઉપયોગમાં લેવાના મુખ્ય રંગો. |
| Camera Style | Static, Tracking, Handheld, Dolly, Crane વગેરે. |
| Audience | Video કોના માટે બનાવવામાં આવે છે. |
| Negative Constraints | શું દેખાડવું નહીં અથવા કઈ બાબતો ટાળવી. |
| Prompt Language | Final Prompt કઈ ભાષામાં જોઈએ. |
| Output Format | Plain Text, Structured JSON, Table અથવા અન્ય Format. |
| Continuity Settings | Clips વચ્ચે કઈ બાબતો સરખી રાખવી. |
| Accuracy Requirements | Factual, Scientific અથવા Historical Accuracy માટેની જરૂરિયાત. |

## 3.3 Input Missing હોય ત્યારે શું કરવું?

દરેક Optional Input માટે User ને પ્રશ્ન પૂછવો જરૂરી નથી.

Skill એ નક્કી કરવું જોઈએ કે કઈ માહિતી વિના કામ આગળ વધી શકે છે.

ઉદાહરણ:

- Aspect Ratio ન આપ્યું હોય અને Reels માટે Prompt બનાવવાનું કહ્યું હોય, તો 9:16 પસંદ કરી શકાય.
- Video Platform ન આપ્યું હોય, તો Platform-Neutral Prompt બનાવી શકાય.
- Narrator Gender ન આપ્યું હોય, તો તેને પોતાની રીતે નક્કી કરતાં પહેલાં Default Preference અથવા User ની અગાઉની સૂચના તપાસવી જોઈએ.
- Duration ન આપ્યું હોય, તો એક યોગ્ય Default લાગુ કરી શકાય અથવા તે મહત્વપૂર્ણ હોય તો User ને પૂછવું જોઈએ.
- Script ઉપલબ્ધ ન હોય, તો Script માગવી જરૂરી છે.

**મુખ્ય નિયમ:** જરૂરી માહિતી Missing હોય ત્યારે ખોટી વિગતો ઘડવાને બદલે પ્રશ્ન પૂછવો અથવા સ્પષ્ટ Default પસંદ કરવો.

---

# 4. Skill નું Output System

આ Skill નું મુખ્ય Output એક અથવા વધુ Video Generation Prompts છે.

દરેક Prompt માં જરૂરી વિગતોનું એક સુવ્યવસ્થિત Structure હોવું જોઈએ.

## 4.1 Final Output ના મુખ્ય Sections

### 1. Part Information
- Part Number.
- Scene Number.
- Script Part.
- Scene નો Storytelling Purpose.

### 2. Video Specifications
- Aspect Ratio.
- Duration.
- Resolution Preference, જો જરૂરી હોય.
- Visual Style.
- Frame Orientation.

### 3. Scene Description
- Location.
- Environment.
- Main Subject.
- Supporting Objects.
- Subject ની Position.
- Foreground, Midground અને Background.

### 4. Action Description
- Scene માં શું બને છે?
- Subject શું કરે છે?
- Action કયા ક્રમમાં બને છે?
- Action ની શરૂઆત અને અંત કેવી રીતે થાય છે?

### 5. Camera Direction
- Camera Angle.
- Camera Distance.
- Camera Movement.
- Focus.
- Framing.
- Transition, જો જરૂરી હોય.

### 6. Lighting and Visual Design
- Key Light.
- Ambient Light.
- Shadows.
- Color Palette.
- Contrast.
- Visual Atmosphere.

### 7. Timing
- Scene ના અલગ સમયખંડ.
- Action ની શરૂઆત.
- મુખ્ય Visual Event.
- Ending Frame.

### 8. Audio Direction
- Voiceover Text.
- Narrator Characteristics.
- Background Music.
- Sound Effects.
- Audio Timing.
- Audio Continuity.

### 9. Continuity
- Character અથવા Object Appearance.
- Color Grading.
- Camera Style.
- Narrator Voice.
- Music Identity.
- Previous અને Next Clip સાથે Connection.

### 10. Constraints
- શું ટાળવું.
- Unwanted Visual Artifacts.
- અનાવશ્યક Text અથવા Logos.
- Scientific અથવા Historical Accuracy સંબંધિત મર્યાદાઓ.

### 11. Final Prompt
ઉપરની તમામ સંબંધિત વિગતોને જોડીને તૈયાર કરાયેલ Prompt, જે પસંદ કરેલા Video Generator માં ઉપયોગ કરી શકાય.

### 12. Validation Report
- Required Fields હાજર છે કે નહીં.
- Script નો અર્થ જળવાયો છે કે નહીં.
- Duration યોગ્ય છે કે નહીં.
- Contradictory Instructions છે કે નહીં.
- Continuity Requirements સામેલ છે કે નહીં.
- કોઈ મહત્વપૂર્ણ Input Missing છે કે નહીં.

---

# 5. Core Processing Logic

આ Skill નું મુખ્ય Logic નીચેના તબક્કાઓમાં વહેંચાયેલું છે.

## Step 1: Input Parsing

સૌપ્રથમ Skill ને મળેલી Script અને Instructions ને વાંચીને અલગ-અલગ Fields માં ગોઠવવામાં આવે છે.

ઉદાહરણ:

Input:

“Part 2: સૂર્યની વધતી પ્રવૃત્તિના કારણે Atmospheric Drag વધ્યો અને Telescope ની ઊંચાઈ ઘટવા લાગી. દરેક Video 8 Seconds નો હોવો જોઈએ. Format 9:16 હોવું જોઈએ.”

આને નીચે મુજબ સમજી શકાય:

- Script Part: Part 2.
- Main Event: Atmospheric Drag વધવો.
- Result: Telescope ની Altitude ઘટવી.
- Duration: 8 Seconds.
- Aspect Ratio: 9:16.

આ તબક્કાનો હેતુ User ની Instructions ને ઓળખવાનો છે; હજી Visual Prompt બનાવવાનો નથી.

## Step 2: Script Part Analysis

દરેક Part નો મુખ્ય હેતુ સમજવામાં આવે છે.

સામાન્ય Storytelling Purposes:

- Hook.
- Context.
- Explanation.
- Discovery.
- Conflict.
- Transformation.
- Emotional Moment.
- Reveal.
- Conclusion.
- Call to Action.

આ Categories Fixed નથી. કોઈ Part માં એક કરતાં વધુ હેતુ હોઈ શકે છે.

ઉદાહરણ:

જો Script માં લખ્યું હોય કે “Telescope ની ઊંચાઈ ઘટવા લાગી”, તો તેનો મુખ્ય હેતુ ઘટના સમજાવવાનો હોઈ શકે છે.

જો Script માં લખ્યું હોય કે “આ Telescope એ બ્રહ્માંડની રહસ્યમય ઘટનાઓ વિશે નવી માહિતી આપી”, તો તેનો હેતુ Discovery અથવા Scientific Achievement દર્શાવવાનો હોઈ શકે છે.

**મહત્વનો નિયમ:** Part નો હેતુ ઓળખતી વખતે Script માં ન હોય તેવી નવી ઘટના ઉમેરવી નહીં.

## Step 3: Key Information Extraction

દરેક Part માંથી નીચેની માહિતી ઓળખવામાં આવે છે:

- Main Subject.
- Main Action.
- Location.
- Cause.
- Effect.
- Important Object.
- Scientific Concept.
- Emotional Tone.
- Critical Facts.
- Visual Opportunities.

ઉદાહરણ:

Script: “સૂર્યની વધતી પ્રવૃત્તિએ પૃથ્વીના વાતાવરણનો ખેંચાણ વધાર્યો.”

Extracted Information:

- Main Cause: વધેલી Solar Activity.
- Environment: પૃથ્વીનું વાતાવરણ.
- Physical Effect: Atmospheric Drag માં વધારો.
- Affected Object: Space Telescope.
- Visual Opportunity: Earth અને Orbit માં ફરતું Telescope.
- Accuracy Requirement: Solar Activity અને Orbital Decay વચ્ચેનો સંબંધ ખોટી રીતે રજૂ ન થવો જોઈએ.

આ પ્રક્રિયા Script ના મુખ્ય અર્થને જાળવી રાખવામાં મદદ કરે છે.

## Step 4: Script-to-Visual Translation

આ Skill નો સૌથી મહત્વનો તબક્કો છે.

Script માં રહેલા શબ્દો અથવા Concepts ને યોગ્ય Visual Representation માં ફેરવવામાં આવે છે.

ઉદાહરણ:

| Script Concept | સંભવિત Visual Representation |
|---|---|
| Space Telescope | વૈજ્ઞાનિક ઉપકરણ ધરાવતું Spacecraft. |
| Earth Orbit | પૃથ્વીની આસપાસ ફરતું Spacecraft. |
| Atmospheric Drag | વાતાવરણમાં વધતા Drag ને સમજાવતું Scientific Visualization. |
| Gamma-Ray Burst | તેજસ્વી Cosmic Energy Event નું Visualization. |
| Black Hole | આસપાસના પદાર્થ પર ગુરુત્વાકર્ષણની અસર દર્શાવતું Visualization. |
| Mission Ending | Spacecraft ના અંતિમ Operational Phase ને દર્શાવતું દૃશ્ય. |
| Scientific Legacy | Data Analysis અથવા બ્રહ્માંડના અભ્યાસને દર્શાવતું દૃશ્ય. |

અહીં બે પ્રકારના Visuals વચ્ચે તફાવત રાખવો જરૂરી છે:

**A. Direct Visual:** Script માં જે વસ્તુનો ઉલ્લેખ છે તે જ બતાવવી.

**B. Explanatory Visual:** કોઈ Concept ને સમજાવવા માટે Scientific Visualization, Diagram અથવા Symbolic Scene બતાવવી.

ઉદાહરણ તરીકે, Atmospheric Drag આંખે સીધો દેખાતો પદાર્થ નથી. તેથી તેને દર્શાવવા માટે યોગ્ય Scientific Visualization ઉપયોગમાં લઈ શકાય.

પરંતુ Visualization ને વાસ્તવિક Footage તરીકે રજૂ ન કરવી જોઈએ, જો તે ખરેખર Footage ન હોય.

## Step 5: Visual Selection and Scene Design

દરેક Part માટે નક્કી કરવામાં આવે છે કે તેમાં કયા Visual Elements હોવા જોઈએ.

આ તબક્કામાં નીચેના પ્રશ્નોના જવાબ શોધવામાં આવે છે:

1. મુખ્ય Subject શું છે?
2. Subject ક્યાં સ્થિત છે?
3. આસપાસનું Environment કેવું છે?
4. મુખ્ય Action શું છે?
5. દર્શકનું ધ્યાન કઈ વસ્તુ પર હોવું જોઈએ?
6. કયો Background યોગ્ય રહેશે?
7. દૃશ્ય Realistic, Animated કે Stylized હોવું જોઈએ?
8. કોઈ Visual Concept સમજાવવા માટે વધારાના Elements જરૂરી છે?
9. Visuals Script ની હકીકતો સાથે સુસંગત છે?
10. Scene ને સમજવા માટે દર્શકને પૂરતો સમય મળશે?

એક જ Part માં ઘણા અલગ Concepts હોય, તો તેમને એક જ Frame માં ઠાંસવાને બદલે અલગ Shots અથવા સમયખંડમાં ગોઠવી શકાય.

## Step 6: Duration and Timeline Planning

Video ની કુલ Duration ને આધારે Scene Timing નક્કી કરવામાં આવે છે.

ઉદાહરણ તરીકે, 8-Second Clip માટે આ પ્રકારનું Timeline Planning હોઈ શકે:

| સમય | Visual Function |
|---|---|
| 0–2 Seconds | Scene Establishment. |
| 2–5 Seconds | Main Action અથવા મુખ્ય ઘટના. |
| 5–7 Seconds | Important Visual Detail અથવા Reveal. |
| 7–8 Seconds | Ending Frame અથવા Next Clip સાથે Connection. |

આ માત્ર ઉદાહરણ છે; દરેક Clip માટે એકસરખું Timing લાગુ કરવું જરૂરી નથી.

જો Scene માં એક જ Continuous Action હોય, તો તેને ચાર અલગ Shots માં વહેંચવાની જરૂર નથી.

જો Script માં ઘણા ઝડપી Events હોય, તો યોગ્ય Shot Changes જરૂરી બની શકે છે.

### Timing Logic

Skill એ તપાસવું જોઈએ:

- દરેક Action માટે પૂરતો સમય છે?
- Voiceover ની લંબાઈ Duration માં સમાઈ શકે છે?
- એક જ Clip માં બહુ બધા Events તો નથી?
- Camera Movement અને Subject Action વચ્ચે વિરોધાભાસ તો નથી?
- Ending Frame ને સમજવા માટે પૂરતો સમય છે?

**મહત્વનો નિયમ:** 8 Seconds માટે બનાવેલા Prompt માં 8 Seconds કરતાં વધુ સમય લે તેવી અતિશય જટિલ Action Sequence ન ઉમેરવી.

Voiceover ની વાસ્તવિક બોલવાની ઝડપ અને Video Duration વચ્ચે મેળ બેસાડવો પણ જરૂરી છે. માત્ર Duration લખવાથી Voiceover ચોક્કસ રીતે સમાઈ જશે તેની ખાતરી થતી નથી.

## Step 7: Camera Direction

Visual Scene ને વધુ ચોક્કસ બનાવવા માટે Camera સંબંધિત Instructions ઉમેરવામાં આવે છે.

### A. Camera Angle

- Eye-Level.
- Low Angle.
- High Angle.
- Top-Down.
- Bird's-Eye View.
- Over-the-Shoulder.
- Point-of-View.

### B. Camera Distance

- Extreme Wide Shot.
- Wide Shot.
- Medium Shot.
- Close-Up.
- Extreme Close-Up.

### C. Camera Movement

- Static Shot.
- Slow Push-In.
- Pull-Back.
- Pan.
- Tilt.
- Tracking Shot.
- Dolly Movement.
- Crane Movement.
- Orbiting Camera.
- Controlled Handheld Movement.

### D. Focus and Framing

- Main Subject પર Focus.
- Depth of Field.
- Foreground અને Background Separation.
- Subject Position.
- Leading Lines.
- Negative Space.

### Camera Selection Logic

Camera Movement ફક્ત સુંદરતા માટે પસંદ કરવો નહીં. તે Scene ના હેતુને અનુરૂપ હોવો જોઈએ.

ઉદાહરણ:

- Telescope ની નજીકની વિગતો માટે Slow Push-In.
- Spacecraft ની ગતિ Follow કરવા Tracking Shot.
- આખું Earth Environment બતાવવા Wide Shot.
- Mission ના અંતે Emotional Closure માટે Slow Pull-Back.

એક જ ટૂંકા Clip માં ખૂબ બધા Camera Movements ઉમેરવાથી Output અસ્થિર થઈ શકે છે. તેથી જરૂરી હોય ત્યાં એક મુખ્ય Camera Movement પસંદ કરવો.

## Step 8: Lighting and Color Design

દરેક Scene માટે યોગ્ય Lighting અને Color Direction નક્કી કરવામાં આવે છે.

### Lighting Elements

- Key Light.
- Fill Light.
- Rim Light.
- Ambient Light.
- Backlight.
- Practical Light Sources.
- Atmospheric Glow.
- Hard અથવા Soft Shadows.

### Color Elements

- Main Color Palette.
- Contrast.
- Saturation.
- Warm અથવા Cool Tones.
- Highlight Colors.
- Shadow Tones.

### Lighting Selection Logic

Lighting એ Scene ના Environment અને Mood સાથે મેળ ખાતી હોવી જોઈએ.

ઉદાહરણ:

Space Telescope માટે:

- Dark Space Background.
- Earth Limb પર Sunlight.
- Spacecraft ની Edges પર Rim Lighting.
- Metallic Surfaces પર Controlled Highlights.

આ સૂચનાઓ Visual ને વધુ સ્પષ્ટ બનાવી શકે છે, પરંતુ દરેક AI Generator આ Lighting ને બરાબર જ રજૂ કરશે તેની ખાતરી નથી.

## Step 9: Visual Style Selection

Skill એ User ની પસંદગી અથવા Project Requirements મુજબ Visual Style પસંદ કરવી જોઈએ.

ઉદાહરણ:

- Photorealistic.
- Cinematic Documentary.
- Scientific Visualization.
- 3D Animation.
- Stylized Animation.
- Futuristic Sci-Fi.
- Minimalist Motion Graphics.

એક જ Video Series માં અલગ Styles હોય તો તે ખાસ હેતુ માટે જ હોવી જોઈએ.

ઉદાહરણ તરીકે, Realistic Spacecraft Footage સાથે Scientific Visualization નો ઉપયોગ કરી શકાય, પરંતુ બંને વચ્ચે Visual Language સુસંગત હોવી જોઈએ.

## Step 10: Voiceover Direction

જો Script માં Voiceover હોય, તો તેને Prompt માં યોગ્ય રીતે સામેલ કરવી.

Voiceover Specification માં નીચેની બાબતો હોઈ શકે:

- Exact Voiceover Text.
- Language.
- Narrator Gender, જો નક્કી કરેલું હોય.
- Voice Tone.
- Speaking Pace.
- Emotional Delivery.
- Pronunciation Requirements.
- Voice Consistency.
- Voiceover Timing.

ઉદાહરણ:

“Use the exact provided Hindi voiceover. Maintain the same male narrator identity, deep but clear voice, measured documentary delivery, and consistent pronunciation across all clips.”

### Voiceover Logic

1. Script ના શબ્દો જાળવવા.
2. User એ મંજૂરી ન આપી હોય તો Voiceover Rewrite ન કરવી.
3. Voiceover ની લંબાઈ Duration સાથે સરખાવવી.
4. જરૂરી હોય તો Speaking Pace અંગે સૂચના આપવી.
5. બધા Clips માં Narrator ની ઓળખ જાળવવી.

**મહત્વની મર્યાદા:** માત્ર Prompt માં “same narrator” લખવાથી દરેક અલગ Generation માં ખરેખર એક જ Voice Identity મળશે તેની ખાતરી નથી. Voice Consistency માટે Reference Audio, એક જ Voice Model અથવા અલગ Voiceover Track વધુ વિશ્વસનીય હોઈ શકે છે.

## Step 11: Background Music and Sound Effects

દરેક Part માટે Audio Direction તૈયાર કરવામાં આવે છે.

### Background Music Parameters

- Genre.
- Mood.
- Intensity.
- Tempo.
- Instrumentation.
- Build-Up.
- Ending.
- Transition Between Clips.

### Sound Effects Parameters

- Event-Specific SFX.
- Environmental Ambience.
- Impact Sounds.
- Mechanical Sounds.
- Whooshes.
- Transition Sounds.

Sound Effects Script માં દર્શાવેલી ઘટના સાથે સંબંધિત હોવા જોઈએ.

ઉદાહરણ તરીકે, Space Scene માં અનાવશ્યક રીતે મોટા Explosions અથવા અવાસ્તવિક Sounds ઉમેરવાથી Scene નો અર્થ બદલાઈ શકે છે.

### Audio Priority

જો Voiceover મુખ્ય હોય, તો Background Music એ Voiceover ને ઢાંકી ન દેવી જોઈએ.

જરૂર પડે ત્યારે Editing માં Music Ducking, Volume Automation અને Audio Mixing નો ઉપયોગ કરી શકાય.

**મહત્વપૂર્ણ:** જો Video Generator માં Audio Generation ઉપલબ્ધ ન હોય અથવા યોગ્ય રીતે નિયંત્રિત ન થઈ શકે, તો Music અને Voiceover માટે અલગ Audio Instructions તૈયાર કરવી.

## Step 12: Continuity Management

Continuity એટલે અલગ Clips ને જોડ્યા પછી તે એક જ Video Series ના ભાગ લાગે તે માટે જરૂરી સુસંગતતા.

આ Skill માટે Continuity એક મુખ્ય Feature છે.

### A. Visual Continuity

- Subject નો દેખાવ.
- Object ની Design.
- Color Palette.
- Lighting Style.
- Visual Realism.
- Camera Style.
- Environment.

### B. Audio Continuity

- Narrator Voice.
- Background Music Identity.
- Loudness.
- Audio Transition.
- Narration Style.

### C. Narrative Continuity

- Part નો અર્થ અગાઉના Part સાથે જોડાયેલો હોવો.
- અગાઉની ઘટના સાથે વિરોધાભાસ ન હોવો.
- આગળના Part માટે યોગ્ય Ending હોવી.
- અનાવશ્યક Repetition ટાળવી.

### D. Transition Continuity

- Matching Camera Direction.
- Similar Composition.
- Motion Continuity.
- Match Cut.
- Fade Transition.
- Visual Bridge.

દરેક Part માટે Transition જરૂરી નથી. પરંતુ જ્યારે Clips એક સતત Story દર્શાવતા હોય, ત્યારે તેમની વચ્ચે યોગ્ય Connection રાખવો જોઈએ.

### Continuity State

App માં એક Shared Project State રાખી શકાય, જેમાં નીચેની વિગતો સંગ્રહિત થાય:

- Project Visual Style.
- Main Subject Description.
- Character અથવા Object References.
- Color Palette.
- Camera Language.
- Narrator Configuration.
- Music Configuration.
- Previous Clip નું Ending Frame.
- Next Clip માટે જરૂરી Starting Conditions.

આ State દરેક Prompt બનાવતી વખતે Reference તરીકે ઉપયોગમાં લેવાય.

જો User પછી Visual Style બદલે, તો તે બદલાવ કયા Clips પર લાગુ પડે છે તે સ્પષ્ટ કરવું જોઈએ.

## Step 13: Constraints and Negative Instructions

Prompt માં માત્ર શું કરવું તે જ નહીં, પણ કઈ બાબતો ટાળવી તે પણ જરૂરી હોઈ શકે છે.

ઉદાહરણ:

- Avoid Unnecessary Text Overlays.
- Avoid Unrequested Logos.
- Avoid Unrelated Objects.
- Avoid Unnatural Object Deformation.
- Avoid Inconsistent Spacecraft Design.
- Avoid Unintended Camera Shake.
- Avoid Contradictory Lighting.
- Avoid Unsupported Scientific Claims.

### Constraint Selection Logic

દરેક Prompt માં લાંબી Negative Prompt List આપવી જરૂરી નથી.

માત્ર તે Restrictions ઉમેરવી જોઈએ જે:

1. User એ સ્પષ્ટ રીતે આપી હોય.
2. Scene ની જરૂરિયાત માટે મહત્વપૂર્ણ હોય.
3. સામાન્ય Generation Errors અટકાવવામાં મદદરૂપ થાય.
4. બીજા Instructions સાથે વિરોધાભાસ ન કરતી હોય.

કોઈ ચોક્કસ Generator માં Negative Prompt Field ન હોય, તો Restrictions ને Main Prompt માં Natural Language તરીકે સામેલ કરી શકાય.

---

# 6. Prompt Assembly Engine

અગાઉના તમામ તબક્કાઓ પછી Skill Final Prompt બનાવે છે.

Prompt Assembly એટલે બધા સંબંધિત Elements ને યોગ્ય ક્રમમાં ગોઠવીને એક સ્પષ્ટ Instruction તૈયાર કરવી.

## 6.1 Prompt Assembly Order

ભલામણ કરેલો ક્રમ:

1. Output Format અને Duration.
2. Scene નો હેતુ.
3. Main Subject અને Environment.
4. મુખ્ય Action.
5. Timeline અને Shot Sequence.
6. Camera Direction.
7. Lighting અને Visual Style.
8. Audio Direction.
9. Continuity Requirements.
10. Constraints.

આ ક્રમ ફરજિયાત નથી. પસંદ કરેલા Video Generator માટે વધુ યોગ્ય Structure હોય તો તેનો ઉપયોગ કરી શકાય.

## 6.2 Master Prompt Template

દરેક Clip માટે નીચેનો Template ઉપયોગમાં લઈ શકાય:

**VIDEO SPECIFICATIONS**
- Aspect Ratio: [Aspect Ratio]
- Duration: [Clip Duration]
- Style: [Visual Style]
- Orientation: [Portrait/Landscape/Square]

**SCENE PURPOSE**
- [Part નો Storytelling Purpose]

**SCENE DESCRIPTION**
- Main Subject: [Subject]
- Environment: [Environment]
- Main Action: [Action]
- Supporting Elements: [Elements]

**TIMELINE**
- [Time Range 1]: [Visual Event]
- [Time Range 2]: [Visual Event]
- [Time Range 3]: [Visual Event]
- [Ending]: [Final Visual State]

**CAMERA**
- Shot Type: [Shot Type]
- Movement: [Camera Movement]
- Framing: [Composition]
- Focus: [Focus Details]

**LIGHTING AND COLOR**
- Lighting: [Lighting Direction]
- Color Palette: [Colors]
- Mood: [Mood]
- Visual Treatment: [Style]

**AUDIO**
- Voiceover: [Exact Script]
- Narrator: [Voice Characteristics]
- Music: [Music Direction]
- SFX: [Sound Effects]
- Audio Continuity: [Audio Rules]

**CONTINUITY**
- [Shared Project Style]
- [Object/Character Consistency]
- [Previous/Next Clip Connection]

**CONSTRAINTS**
- [Negative Instructions]
- [Accuracy Requirements]

**FINAL GENERATION INSTRUCTION**
- [ઉપરની સૂચનાઓને એક સુસંગત Final Prompt માં જોડેલી આવૃત્તિ]

આ Template એક Starting Point છે. દરેક Clip માં દરેક Field ભરવી જરૂરી નથી. જો કોઈ Field Scene માટે લાગુ પડતી ન હોય, તો તેને છોડી શકાય.

---

# 7. Prompt Validation Engine

Final Prompt તૈયાર થયા પછી Skill એ તેની તપાસ કરવી જોઈએ.

આ તબક્કો જરૂરી છે, કારણ કે માત્ર લાંબો Prompt એટલે સારો Prompt નહીં.

## 7.1 Required Validation Checks

### Check 1: Script Fidelity

શું Prompt Script ના મૂળ અર્થને જાળવે છે?

- કોઈ મુખ્ય ઘટના છૂટી ગઈ?
- કોઈ નવી ઘટના ખોટી રીતે ઉમેરાઈ?
- કોઈ Fact બદલાઈ ગયો?
- Visual Script ના અર્થથી અલગ છે?

### Check 2: Format Compliance

- Aspect Ratio સાચો છે?
- Duration યોગ્ય છે?
- Orientation યોગ્ય છે?
- User એ માંગેલા બધા Required Fields હાજર છે?

### Check 3: Visual Clarity

- Main Subject સ્પષ્ટ છે?
- Main Action સ્પષ્ટ છે?
- Environment ઓળખી શકાય છે?
- અનાવશ્યક Visual Clutter તો નથી?

### Check 4: Temporal Feasibility

- Action Duration માં સમાઈ શકે છે?
- Voiceover બોલવા માટે પૂરતો સમય છે?
- Timeline માં Contradictions નથી?
- એક જ સમયે અસંગત Camera Movements તો નથી?

### Check 5: Continuity

- Subject નું Description અગાઉના Part સાથે મેળ ખાય છે?
- Color Style અને Camera Language સુસંગત છે?
- Narrator અને Music Instructions સરખી છે?
- Ending અને Opening વચ્ચે યોગ્ય Connection છે?

### Check 6: Audio Compatibility

- Voiceover Text યોગ્ય છે?
- Narrator Configuration યોગ્ય છે?
- Music Voiceover ને ઢાંકી ન દે તેવી સૂચના છે?
- Audio Instructions પસંદ કરેલા Generator ની ક્ષમતાઓ સાથે સુસંગત છે?

### Check 7: Platform Compatibility

- પસંદ કરેલા Generator માટે Prompt Format યોગ્ય છે?
- Generator માં જરૂરી Features ઉપલબ્ધ છે?
- Reference Images અથવા Audio નો ઉપયોગ શક્ય છે?
- કોઈ Instruction Unsupported Feature પર આધારિત તો નથી?

### Check 8: Safety and Accuracy

- અનાવશ્યક જોખમી વિગતો છે?
- વૈજ્ઞાનિક અથવા ઐતિહાસિક દાવા ખોટી રીતે રજૂ થાય છે?
- Visuals ને વાસ્તવિક Footage તરીકે ગેરસમજવાની શક્યતા છે?
- કોઈ Policy અથવા Platform Restriction ધ્યાનમાં લેવાની છે?

## 7.2 Validation Result

Validation Engine નીચેના પ્રકારના Results આપી શકે:

- **PASS:** Prompt માં કોઈ મહત્વની સમસ્યા મળી નથી.
- **PASS WITH WARNINGS:** Prompt ઉપયોગી છે, પરંતુ કેટલીક મર્યાદાઓ અથવા સંભવિત સમસ્યાઓ છે.
- **NEEDS REVISION:** કોઈ જરૂરી Field Missing છે અથવા Prompt માં મહત્વનો વિરોધાભાસ છે.
- **NEEDS USER INPUT:** યોગ્ય Prompt બનાવવા માટે જરૂરી માહિતી ઉપલબ્ધ નથી.

આ Status Prompt ની આંતરિક તપાસ દર્શાવે છે. તે Generated Video સફળ થશે તેની ખાતરી નથી.

---

# 8. Error Handling and Edge Cases

App માં Skill વાસ્તવિક રીતે ઉપયોગમાં લેવાય ત્યારે અલગ-અલગ પ્રકારની સમસ્યાઓ આવી શકે છે.

## 8.1 Script Missing

**Problem:** User એ Prompt માંગ્યો છે, પરંતુ Script આપી નથી.

**Logic:** Script વિના Script-to-Video Conversion કરી શકાતું નથી.

**Action:** User ને Script આપવા જણાવવું.

## 8.2 Duration Missing

**Problem:** Clip Duration નક્કી નથી.

**Logic:** Duration જરૂરી છે કે Default પસંદ કરી શકાય તે તપાસવું.

**Action:** Project Default લાગુ કરવો અથવા User ને એક સ્પષ્ટ પ્રશ્ન પૂછવો.

## 8.3 Voiceover ખૂબ લાંબું છે

**Problem:** 8 Seconds માં Script ના બધા શબ્દો સ્વાભાવિક રીતે બોલી શકાય તેમ નથી.

**Logic:** અંદાજિત Speaking Rate અને શબ્દોની સંખ્યા તપાસવી.

**Action:**
- User ને વધુ Duration સૂચવવી.
- વધુ Clips માં વહેંચવાની ભલામણ કરવી.
- User ની મંજૂરીથી જ Voiceover ટૂંકું કરવું.

મૂળ Script ને મંજૂરી વિના બદલવી નહીં.

## 8.4 Script માં Contradictory Facts

**Problem:** Script ના બે Parts માં વિરોધાભાસી માહિતી છે.

**Logic:** બંને માહિતી ઓળખવી અને કઈ સાચી છે તે પોતાની રીતે નક્કી ન કરવું.

**Action:** User ને સ્પષ્ટતા માટે પૂછવું અથવા બંને દાવાઓને Verification Required તરીકે ચિહ્નિત કરવું.

## 8.5 બહુ જટિલ Scene

**Problem:** એક જ 8-Second Clip માં ઘણા Objects, Camera Movements અને Events સામેલ છે.

**Logic:** Scene Complexity તપાસવી.

**Action:** Scene ને સરળ બનાવવી અથવા અલગ Clips માં વહેંચવાની ભલામણ કરવી. Script નો અર્થ જાળવવો.

## 8.6 Continuity Reference Missing

**Problem:** અગાઉના Clip ની Reference Image ઉપલબ્ધ નથી.

**Logic:** Textual Continuity Description દ્વારા કેટલું જાળવી શકાય તે નક્કી કરવું.

**Action:** સમાન Subject Description, Color Palette અને Camera Style નો ઉપયોગ કરવો. શક્ય હોય તો User ને Reference Frame ઉમેરવાનું સૂચવવું.

## 8.7 Unsupported Generator Feature

**Problem:** User એવો Camera Control અથવા Audio Feature માંગે છે જે પસંદ કરેલા Generator માં ઉપલબ્ધ ન હોય.

**Logic:** Platform Capability તપાસવી, જો વિશ્વસનીય માહિતી ઉપલબ્ધ હોય.

**Action:** Supported Alternative આપવી અથવા તે Feature ની મર્યાદા સ્પષ્ટ કરવી.

## 8.8 User Existing Prompt માં ફેરફાર માંગે

**Problem:** Prompt તૈયાર થઈ ગયા પછી User Duration, Lighting અથવા Voiceover બદલવા કહે છે.

**Logic:** માત્ર બદલાયેલા Field ને Update કરવું અને સંબંધિત Fields ફરીથી Validate કરવાં.

**Action:** બધા Parts ફરીથી બનાવવાની જરૂર ન હોય તો માત્ર અસરગ્રસ્ત Parts સુધારવા.

---

# 9. Complete Worked Example

આ વિભાગ બતાવે છે કે Skill વાસ્તવમાં કેવી રીતે કામ કરે છે.

## 9.1 Input

**Script Part:**

“સૂર્યની વધતી પ્રવૃત્તિના કારણે પૃથ્વીના વાતાવરણનો ખેંચાણ વધ્યો અને Swift Telescope ની Orbital Altitude ઘટવા લાગી.”

**User Instructions:**
- 8 Seconds.
- 9:16 Vertical.
- Cinematic Space Visuals.
- Smooth Camera Movement.
- Male Hindi Narrator.
- Background Music.
- અન્ય Parts સાથે Visual Continuity.

## 9.2 Step-by-Step Analysis

**Step A — Story Purpose**

ઘટના સમજાવવી: Telescope ની Orbital Altitude કેમ ઘટી રહી હતી.

**Step B — Main Subject**

Swift Space Telescope.

**Step C — Environment**

પૃથ્વીની આસપાસનું અવકાશ અને વાતાવરણ.

**Step D — Main Action**

Telescope ની Orbital Altitude ઘટતી હોવાનો Visual.

**Step E — Scientific Representation**

Solar Activity અને Atmospheric Drag વચ્ચેનો સંબંધ સમજાવતું Scientific Visualization.

**Step F — Camera**

Spacecraft ને Follow કરતો Smooth Tracking Shot.

**Step G — Lighting**

પૃથ્વીની ધાર પર Sunlight અને Telescope પર Subtle Rim Lighting.

**Step H — Timeline**

- 0–2 Seconds: Earth અને Telescope સ્થાપિત કરવું.
- 2–5 Seconds: Telescope ને Orbit માં Follow કરવું અને તેની ઘટતી Altitude સમજાવવી.
- 5–7 Seconds: Atmospheric Drag ને સમજાવતું Subtle Scientific Visualization.
- 7–8 Seconds: Telescope અને Earth નો એવો Frame કે જે આગળના Clip સાથે જોડાઈ શકે.

**Step I — Audio**

Exact Hindi Voiceover, નિર્ધારિત Male Narrator અને અગાઉના Part સાથે સુસંગત Music.

**Step J — Continuity**

પહેલાના Clip માં Telescope જેવું દેખાતું હતું તે જ Design, સમાન Color Grading અને Camera Style જાળવવા.

## 9.3 Final Prompt Example

**VIDEO FORMAT:** Generate an 8-second, 9:16 vertical cinematic space documentary clip.

**SCENE PURPOSE:** Explain the increasing atmospheric drag and the resulting decline in the Swift Space Telescope's orbital altitude.

**VISUAL SCENE:** Show the Swift Space Telescope orbiting Earth. Maintain a consistent spacecraft design and realistic proportions. Establish Earth's curved horizon and the thin atmospheric layer. Show the spacecraft moving along its orbital path, with a restrained scientific visualization of atmospheric drag. Keep the visuals grounded in the supplied script; do not depict unsupported explosions or unrelated events.

**TIMELINE:**
- 0–2 seconds: Establish Earth from space, with the Swift Telescope clearly visible in orbit.
- 2–5 seconds: Smoothly track the spacecraft as it continues along its orbital path. Visually communicate a gradual reduction in orbital altitude without exaggerating the movement.
- 5–7 seconds: Introduce a subtle atmospheric visualization to help explain the drag concept. Keep it clearly illustrative rather than presenting invisible atmospheric forces as literal visible objects.
- 7–8 seconds: End on a clear view of the spacecraft against Earth's horizon, leaving a composition that can connect to the next clip.

**CAMERA:** Use a controlled cinematic tracking shot with smooth motion, a wide establishing view, and clear subject framing. Avoid abrupt camera changes or excessive shake.

**LIGHTING AND COLOR:** Use natural sunlight along Earth's horizon, subtle rim lighting on the spacecraft, a deep-space background, realistic highlights, and a consistent cool-toned cinematic color grade.

**VOICEOVER:** Use the exact provided Hindi voiceover. Maintain the same male narrator identity, clear pronunciation, and measured documentary delivery used throughout the series. Fit the narration naturally within the 8-second duration without changing the supplied words.

**BACKGROUND MUSIC:** Continue the established cinematic space-documentary music. Keep the music below the narration and maintain continuity with the preceding and following clips.

**CONTINUITY:** Match the established spacecraft appearance, color palette, lighting approach, camera style, narrator voice, and music identity from the other clips. Preserve a clean ending frame suitable for an edit.

**CONSTRAINTS:** Avoid unrelated objects, unrequested logos, unnecessary text overlays, exaggerated orbital movement, inconsistent spacecraft design, and unsupported scientific claims. Treat atmospheric effects as explanatory visualization.

## 9.4 Output કેમ વધુ ઉપયોગી બન્યું?

મૂળ Script માત્ર ઘટના સમજાવે છે.

Final Prompt તેમાં ઉમેરે છે:

- કયો Subject દેખાશે.
- Scene ક્યાં બનશે.
- Subject શું કરશે.
- Visuals કયા ક્રમમાં આવશે.
- Camera કેવી રીતે Move કરશે.
- Lighting કેવી હશે.
- Audio કેવી રીતે રજૂ થશે.
- અગાઉના અને આગળના Clips સાથે શું જાળવવું.
- કઈ અનિચ્છનીય બાબતો ટાળવી.

આ જ Script-to-Video Prompt Engineering નું મુખ્ય કાર્ય છે.

---

# 10. Multi-Part Video Management

જ્યારે User ચાર, દસ કે વીસ Parts ધરાવતી Script આપે, ત્યારે દરેક Prompt ને સંપૂર્ણપણે અલગ રીતે બનાવવાથી Continuity ની સમસ્યા ઊભી થઈ શકે છે.

તેથી Skill ને બે સ્તરે કામ કરવું જોઈએ.

## 10.1 Project-Level Planning

આ સમગ્ર Video માટેની Shared Settings છે.

ઉદાહરણ:

- Project Name.
- Topic.
- Overall Visual Style.
- Default Aspect Ratio.
- Default Clip Duration.
- Narrator Profile.
- Music Profile.
- Color Palette.
- Character/Object Descriptions.
- Global Constraints.

## 10.2 Clip-Level Planning

આ દરેક Part માટે અલગ હોય છે.

ઉદાહરણ:

- Part Number.
- Scene Purpose.
- Main Action.
- Scene Environment.
- Camera Movement.
- Local Lighting.
- Timeline.
- Exact Voiceover.
- Ending Frame.

## 10.3 Shared vs Local Instructions

**Shared Instructions:** બધા Clips માં સમાન રહેતી બાબતો.

**Local Instructions:** ચોક્કસ Clip માટે જ લાગુ પડતી બાબતો.

આ બંનેને અલગ રાખવાથી એક Part માં Camera Movement બદલાય ત્યારે આખા Project ની Visual Style અનાવશ્યક રીતે બદલાઈ જતી નથી.

## 10.4 Clip Dependencies

દરેક Clip ને Previous અને Next Clip સાથે સંબંધિત કરી શકાય.

ઉદાહરણ:

- Part 1 → Part 2: Telescope ની ગતિ ચાલુ રહે.
- Part 2 → Part 3: Space Telescope થી Scientific Discovery તરફ Transition.
- Part 3 → Part 4: Scientific Achievement થી Mission Conclusion તરફ Transition.

દરેક Connection માટે Explicit Visual Match જરૂરી નથી. ક્યારેક માત્ર Storytelling અને Audio Continuity પૂરતી હોય છે.

---

# 11. Suggested Internal Data Structure

ભવિષ્યમાં App બનાવતી વખતે આ Skill ના Inputs અને Outputs ને Structured Format માં રાખવાથી તેને Maintain અને Update કરવું સરળ બને છે.

નીચેનો JSON એક Conceptual Data Model છે, કોઈ Executable Implementation નથી.

```json
{
  "skill": {
    "name": "Script-to-Video Prompt Engineering",
    "version": "1.0"
  },
  "project": {
    "title": "Swift Telescope Reel",
    "platform": "Google Flow",
    "aspect_ratio": "9:16",
    "visual_style": "Cinematic Space Documentary",
    "continuity": {
      "narrator_profile": "Consistent male Hindi narrator",
      "music_profile": "Continuous cinematic background music",
      "color_palette": "Consistent cool-toned space palette"
    }
  },
  "clip": {
    "part_number": 2,
    "duration_seconds": 8,
    "script_text": "Provided Hindi voiceover text",
    "story_purpose": "Explain orbital altitude decline",
    "main_subject": "Swift Space Telescope",
    "main_action": "Show decreasing orbital altitude",
    "environment": "Earth orbit",
    "camera": {
      "shot_type": "Wide tracking shot",
      "movement": "Smooth tracking"
    },
    "lighting": {
      "style": "Natural sunlight with subtle rim lighting"
    },
    "audio": {
      "voiceover": "Exact supplied script",
      "music": "Consistent cinematic music"
    },
    "constraints": [
      "Avoid unrelated objects",
      "Preserve spacecraft design",
      "Avoid unsupported scientific claims"
    ]
  },
  "validation": {
    "script_fidelity": "pending",
    "duration_check": "pending",
    "continuity_check": "pending",
    "platform_compatibility": "pending"
  }
}
```

આ Data Structure ને પછી Database Schema, API Contract અથવા Internal Function Parameters માં ફેરવી શકાય.

---

# 12. Suggested Function Architecture

App માં આ Skill ને એક જ મોટા Function તરીકે અથવા અનેક નાના Functions ના સંયોજન તરીકે Implement કરી શકાય.

વધુ Maintainable Architecture માટે નાના Functions નો અભિગમ ઉપયોગી થઈ શકે છે.

## Function 1 — `parse_script_input()`

**હેતુ:** Script અને User Instructions ને ઓળખીને Structured Input તૈયાર કરવું.

**Input:** Script, User Preferences, Project Settings.

**Output:** Parsed Script Parts અને Configuration.

## Function 2 — `analyze_script_part()`

**હેતુ:** દરેક Part નો હેતુ અને મુખ્ય માહિતી ઓળખવી.

**Input:** એક Script Part.

**Output:** Story Purpose, Main Subject, Action, Key Facts અને Tone.

## Function 3 — `map_script_to_visuals()`

**હેતુ:** Script ના Concepts ને યોગ્ય Visual Representation માં ફેરવવા.

**Input:** Analyzed Script Part.

**Output:** Scene Description અને Visual Elements.

## Function 4 — `plan_scene_timeline()`

**હેતુ:** ઉપલબ્ધ Duration પ્રમાણે Visual Events ગોઠવવા.

**Input:** Scene Description, Clip Duration.

**Output:** Time-Based Shot Plan.

## Function 5 — `design_cinematic_direction()`

**હેતુ:** Camera, Lighting, Composition, Color અને Visual Style નક્કી કરવાં.

**Input:** Scene Plan અને Project Style.

**Output:** Cinematic Direction.

## Function 6 — `configure_audio_direction()`

**હેતુ:** Voiceover, Narrator, Music અને Sound Effects સંબંધિત સૂચનાઓ તૈયાર કરવી.

**Input:** Script Text અને Audio Preferences.

**Output:** Audio Specification.

## Function 7 — `manage_visual_continuity()`

**હેતુ:** Project-Level Settings અને Clip-Level Details વચ્ચે Consistency જાળવવી.

**Input:** Project State, Current Clip, Previous Clip Details.

**Output:** Continuity Instructions.

## Function 8 — `assemble_video_prompt()`

**હેતુ:** બધા સંબંધિત Components ને એક Final Prompt માં જોડવા.

**Input:** Scene Plan, Cinematic Direction, Audio Specification, Continuity Rules.

**Output:** Final Video Generation Prompt.

## Function 9 — `validate_video_prompt()`

**હેતુ:** Final Prompt ની Completeness, Consistency અને Constraints તપાસવા.

**Input:** Final Prompt અને Project Settings.

**Output:** Validation Report, Warnings અથવા Revision Requirements.

## Function 10 — `revise_video_prompt()`

**હેતુ:** User ના Feedback મુજબ Prompt માં ફેરફાર કરવો.

**Input:** Existing Prompt, User Feedback.

**Output:** Revised Prompt અને Updated Validation.

આ Function Names સૂચિત નામો છે. App ની Programming Language અને Architecture મુજબ તેને બદલી શકાય છે.

---

# 13. End-to-End Execution Flow

આ Skill નું સંપૂર્ણ Processing Flow નીચે મુજબ છે:

```text
START
  |
  v
Receive Script + User Instructions
  |
  v
Parse Inputs and Preferences
  |
  v
Is a usable script available?
  | No
  +----> Request Script
  |
 Yes
  |
  v
Identify Script Parts
  |
  v
Analyze Purpose and Key Information
  |
  v
Map Script Concepts to Visuals
  |
  v
Design Scenes and Actions
  |
  v
Plan Timeline and Shot Sequence
  |
  v
Define Camera, Lighting and Visual Style
  |
  v
Define Voiceover and Audio Direction
  |
  v
Apply Project Continuity
  |
  v
Assemble Final Prompts
  |
  v
Validate Prompts
  |
  +---- Missing critical information?
  |          |
  |          Yes
  |          v
  |    Ask or Flag for Revision
  |
  v
Return Prompts + Validation Report
  |
  v
END
```

આ Flow માં User Feedback આવે તો સંબંધિત તબક્કા પર પાછા જઈને Prompt સુધારી શકાય.

---

# 14. Skill નું Quality Scoring System

App માં Prompt Quality ને માપવા માટે Scoring System બનાવી શકાય.

આ Score Generated Video ની Quality નહીં, પરંતુ Prompt ની રચના અને Completeness માપશે.

| Evaluation Category | Suggested Weight |
|---|---:|
| Script Fidelity | 25% |
| Visual Clarity | 20% |
| Duration and Timeline Feasibility | 15% |
| Cinematic Direction | 10% |
| Audio Specification | 10% |
| Continuity | 10% |
| Constraint and Platform Compatibility | 10% |
| **Total** | **100%** |

દરેક Category ને 0 થી 100 સુધી Score આપી શકાય.

Weighted Score માટે:

**Final Score = તમામ Category ના Score × તેમના Weight નો સરવાળો.**

ઉદાહરણ તરીકે, જો Script Fidelity નો Score 90 હોય, તો તેનું Weighted Contribution 90 × 0.25 = 22.5 થાય.

આ Score System માત્ર એક સૂચન છે. તેને વાસ્તવિક ઉપયોગમાં મૂકતાં પહેલાં Test Cases અને User Feedback દ્વારા Calibrate કરવું જોઈએ.

ખાસ કરીને Script Fidelity અને Platform Compatibility જેવા મુદ્દાઓને ફક્ત AI ના અંદાજ પર આધારિત રાખવા કરતાં શક્ય હોય ત્યાં Rule-Based Checks અને Reliable Platform Information નો ઉપયોગ કરવો જોઈએ.

---

# 15. Testing Strategy

Skill ને App માં Implement કરતાં પહેલાં વિવિધ પ્રકારની Scripts પર Test કરવી જોઈએ.

## Test Case A — Simple Script

એક Subject અને એક Action ધરાવતી Script.

**Expected Result:** સરળ, સ્પષ્ટ અને અનાવશ્યક વિગતો વગરનો Prompt.

## Test Case B — Complex Script

ઘણા Subjects અને Events ધરાવતી Script.

**Expected Result:** યોગ્ય Scene Planning, જરૂરી Shot Changes અને યોગ્ય Duration Allocation.

## Test Case C — Long Voiceover

8 Seconds કરતાં લાંબી Voiceover ધરાવતી Script.

**Expected Result:** Duration Warning અથવા User ને વિકલ્પ.

## Test Case D — Multi-Part Series

ચાર કે તેથી વધુ Parts ધરાવતી Script.

**Expected Result:** Shared Project Settings અને Clip-Specific Prompts વચ્ચે Consistency.

## Test Case E — Missing Preferences

Aspect Ratio, Camera Style અથવા Audio Preferences આપવામાં ન હોય.

**Expected Result:** યોગ્ય Defaults અથવા જરૂરી હોય ત્યારે Clarification.

## Test Case F — Contradictory Instructions

ઉદાહરણ તરીકે, User એક જ Shot માં Camera Static પણ રાખવા કહે અને એ જ Shot માં સતત Orbiting Camera Movement પણ માંગે.

**Expected Result:** વિરોધાભાસ ઓળખવો અને યોગ્ય Clarification અથવા Alternative આપવી.

## Test Case G — Scientific Content

વૈજ્ઞાનિક ઘટનાઓ ધરાવતી Script.

**Expected Result:** મૂળ Script નો અર્થ જાળવવો, કલ્પિત Visuals ને Explanatory Visualization તરીકે રજૂ કરવાં અને નવા Facts ન ઘડવા.

## Test Case H — Revision Request

User કહે કે “Lighting બદલો, પરંતુ Voiceover અને Camera Movement એ જ રાખો.”

**Expected Result:** માત્ર સંબંધિત Field બદલવી અને બાકીની સૂચનાઓ જાળવવી.

---

# 16. Security, Privacy and Safety Considerations

App માં આ Skill વાપરતી વખતે નીચેના મુદ્દા ધ્યાનમાં લેવા જોઈએ.

## Input Handling

- User ના Script Text ને વિશ્વસનીય Source Instruction તરીકે નહીં, પરંતુ Processing માટેના Content તરીકે જોવું.
- Script માં લખાયેલ કોઈ અનિચ્છિત Instruction ને App ના System Rules ઉપર પ્રાધાન્ય ન આપવું.
- Uploaded Reference Files ને સંબંધિત Task માટે જ ઉપયોગમાં લેવા.

## Data Privacy

- Script અને Reference Assets કેટલા સમય સુધી સંગ્રહિત રહેશે તે નક્કી કરવું.
- User ને Project Delete કરવાનો વિકલ્પ આપવો.
- Sensitive Content માટે યોગ્ય Access Controls રાખવા.
- Voice References અથવા Personal Images હોય તો તેમની Handling સ્પષ્ટ રાખવી.

## Safety and Content Restrictions

- પસંદ કરેલા Video Platform ના લાગુ પડતા Rules નું પાલન કરવું.
- Dangerous અથવા Disallowed Content માટે જરૂરી Checks રાખવા.
- Scientific અથવા Historical Content માં ભ્રામક દાવાઓ ટાળવા.
- Real Footage અને Generated Visualization વચ્ચે જરૂરી તફાવત જાળવવો.

આ Skill નું Safety Validation એ એક સહાયક તપાસ છે; તે તમામ જોખમો શોધી શકશે અથવા દરેક Platform ની મંજૂરીની ખાતરી આપશે એવું માનવું નહીં.

---

# 17. Future App Integration

આ Skill ને ભવિષ્યમાં તમારી App ના મોટા Workflow નો એક ભાગ બનાવી શકાય.

ઉદાહરણ તરીકે:

**Function A — Source-to-Script**

Source Material માંથી Script બનાવે.

**Function B — Script-to-Video Prompt Engineering**

તૈયાર Script ને Detailed Video Prompts માં ફેરવે.

**Function C — Video Generation**

તૈયાર Prompts ને Video Generator સુધી પહોંચાડે અને Clips મેળવે.

**Function D — Voiceover Generation**

Script પરથી Voiceover બનાવે.

**Function E — Audio Generation**

Music અને Sound Effects તૈયાર કરે.

**Function F — Video Assembly**

Generated Clips, Voiceover, Music અને Transitions ને જોડે.

**Function G — Quality Review**

Final Video અને Prompt Output ની તપાસ કરે.

આ બધા Functions અલગ રાખવાથી દરેક Function ને સ્વતંત્ર રીતે સુધારવું, Test કરવું અને ભવિષ્યમાં બીજી Services સાથે જોડવું સરળ બને છે.

આ માત્ર સંભવિત Architecture છે. કયા Functions તમારી App માં ખરેખર જરૂરી છે તે App ના Overall Purpose અને Requirements નક્કી થયા પછી નક્કી કરવું જોઈએ.

---

# 18. Skill ની Final Definition

**Script-to-Video Prompt Engineering એ એક AI-Assisted Content Transformation Skill છે, જે User દ્વારા આપવામાં આવેલી તૈયાર Video Script અને તેની Production Requirements ને Analyze કરીને દરેક Script Part માટે Structured, Cinematically Directed, Time-Aware અને Continuity-Aware AI Video Generation Prompts તૈયાર કરે છે.**

આ Skill Script ના મૂળ અર્થને જાળવે છે, યોગ્ય Visual Representations પસંદ કરે છે, Scene Timing અને Camera Direction નક્કી કરે છે, Audio અને Continuity સંબંધિત સૂચનાઓ ઉમેરે છે અને Final Prompt ને Completeness, Consistency તથા Platform Compatibility માટે Validate કરે છે.

તેનું મુખ્ય Output Video નહીં, પરંતુ Video Generate કરવા માટે ઉપયોગમાં લઈ શકાય તેવી વિગતવાર Prompt Specification છે.

---

# 19. One-Line Function Description

**Input:** તૈયાર Video Script + User Preferences + Project Settings.

**Process:** Script Analysis → Visual Mapping → Scene Planning → Cinematic Direction → Audio Direction → Continuity → Prompt Assembly → Validation.

**Output:** દરેક Script Part માટે Detailed AI Video Generation Prompt અને Validation Report.

**Core Objective:** Script ને એવી સ્પષ્ટ Visual અને Production Instructions માં ફેરવવી કે AI Video Generator ને જરૂરી દૃશ્ય, Action, Camera, Lighting, Audio અને Continuity અંગે શક્ય તેટલી સ્પષ્ટ દિશા મળે.

**Suggested Internal Function Name:** `script_to_video_prompt_engineering()`

**Suggested App Module Name:** `Script-to-Video Prompt Engine`

**Specification Version:** 1.0

**Status:** Ready for App Architecture Discussion and Technical Implementation Planning.
