# RizzCards - Functional Requirements Document 📱

## 1. Product Overview
RizzCards is a mobile app that allows users to create, customize, and share digital pickup line cards. The app transforms simple pickup lines into shareable, customizable digital cards with optional voice recordings.

## 2. Target Audience
- Primary: Young adults (18-35) active on social media
- Secondary: Content creators and influencers
- Tertiary: Anyone looking for creative ways to break the ice

## 3. Core Features (MVP)

### 3.1 Browse Feature
- **Line Library**
  - Pre-loaded with 50 curated pickup lines
  - Categories:
    - Sweet 🥰
    - Saucy 🌶️
    - Silly 🤪
    - Situationship 💭
  - Simple search/filter functionality
  - "Line of the Day" feature

### 3.2 Card Creation
- **Basic Card Designer**
  - Select pickup line from library
  - Choose from 10 background designs
  - Select from 5 font styles
  - Add basic emoji reactions
  - Simple text positioning
  - Preview functionality

### 3.3 Sharing
- Native share functionality
  - Direct to Instagram DM
  - Share via text message
  - Copy shareable link
  - Save to camera roll
- Generate unique short URLs (rizz.cards/xyz)

### 3.4 Local Storage
- Save favorite pickup lines
- Store recently created cards
- Cache recent designs

## 4. Future Features (Post-MVP)

### 4.1 Voice Features
- Record voice delivery
- Add background music
- Voice filters/effects
- "Bruhtish Mode" special voice effects

### 4.2 Premium Features
- Custom card backgrounds
- Exclusive pickup lines
- Special fonts
- Verified creator badge
- Remove watermark

### 4.3 Social Features
- User profiles
- Like/save others' cards
- Follow creators
- Share to profile
- Community submissions

### 4.4 E-commerce
- Print & ship physical cards
- Custom merchandise
- Gift packages

## 5. Technical Requirements

### 5.1 Platform
- iOS (Primary)
- Android (Secondary)
- Built with React Native + Expo

### 5.2 Performance
- App size < 50MB
- Load time < 3 seconds
- Card generation < 2 seconds
- Share generation < 1 second

### 5.3 Offline Functionality
- Browse pre-loaded lines
- Create basic cards
- Queue shares for when online

## 6. UI/UX Requirements

### 6.1 Design System
- Modern, playful aesthetic
- Consistent color scheme
- Accessible typography
- Clear hierarchy
- Intuitive navigation

### 6.2 Navigation Structure
```
Home
├── Browse
│   ├── Categories
│   ├── Search
│   └── Line of the Day
├── Create
│   ├── Line Selection
│   ├── Card Designer
│   └── Preview/Share
└── Profile
    ├── Favorites
    ├── Created Cards
    └── Settings
```

### 6.3 Interactions
- Smooth transitions
- Haptic feedback
- Gesture controls
- Progressive disclosure
- Clear success/error states

## 7. MVP Timeline
```
Week 1 (Days 1-3)
├── Basic app setup
├── Navigation structure
├── Static line library
└── Basic card component

Week 1 (Days 4-7)
├── Card customization
├── Share functionality
├── Local storage
├── UI polish
└── Testing & submission
```

## 8. Success Metrics
- App store rating > 4.5
- Share completion rate > 80%
- Card creation time < 1 minute
- Return user rate > 40%
- Daily active users growth

## 9. Monetization Strategy
### 9.1 Phase 1 (Launch)
- Free app with basic features
- Premium card designs ($0.99)
- Remove watermark ($1.99)

### 9.2 Phase 2 (Growth)
- Monthly subscription
- Physical card printing
- Creator partnerships
- Brand collaborations 