
# Masterplan: EliteArena - Core Public Experience

## Part A: Global Navigation Bar

### A.1. Overview & Objective
The Navigation Bar is the primary means of site-wide navigation. It provides clear, consistent access to key platform sections, adapting its content based on user authentication status and role. Its design is clean, modern, and unobtrusive.

### A.2. Core Elements & Layout (Desktop First)
*   **Container:** Full-width, top of the page, with subtle shadow and border.
*   **Left Section:** "EliteArena" Logo with gradient badge and text (links to Home Page).
*   **Center/Right Section:** Primary Navigation Links that change based on user role.
*   **Far Right Section:** User-specific actions (Login/Signup or User Profile dropdown).

### A.3. Navigation States & Link Variations

#### A.3.1. State: Logged Out (Guest View)
*   **Logo:** (Links to Home)
*   **Menu Items:** `Home`, `Challenges`, `Sponsors` (info/signup link)
*   **Action Items:** `Login`, `Signup` (button)

#### A.3.2. State: Logged In as "Builder"
*   **Logo:** (Links to Home/Builder Dashboard)
*   **Menu Items:** `Home`, `Challenges`, `My Dashboard`, `My Submissions`
*   **Action Items:** Profile Dropdown (`View Profile`, `Settings`, `Logout`)

#### A.3.3. State: Logged In as "Sponsor"
*   **Logo:** (Links to Home/Sponsor Dashboard)
*   **Menu Items:** `Home`, `Challenges`, `My Dashboard`, `Create Challenge`
*   **Action Items:** Profile Dropdown (`View Profile`, `Settings`, `Logout`)

### A.4. Visual Style
*   **Feel:** Clean, modern, professional with a tech-focused aesthetic.
*   **Colors:** Indigo and purple gradient for brand elements, neutral white background.
*   **Typography:** Sans-serif with clear hierarchy and consistent sizing.
*   **Spacing:** Appropriate padding and spacing between elements.
*   **Active States:** Clear indication of current page with color and font weight.

### A.5. Mobile Responsiveness
*   **Collapsed View:** Hamburger menu icon for smaller screens.
*   **Expanded View:** Vertical list of navigation items with adequate touch targets.
*   **User Actions:** Consistently accessible at the bottom of the mobile menu.
*   **Transition:** Smooth show/hide animation for the mobile menu.

---

## Part B: Home Page (MVP)

### B.1. Overview & Objective
The main landing page clearly articulates EliteArena's value proposition, directs Builders and Sponsors to appropriate next steps, and establishes a professional, exciting tone for the platform.

### B.2. Page Structure & Essential Sections

#### B.2.1. Hero Section
*   **Background:** Gradient from indigo to purple for a modern tech feel.
*   **Content:**
    *   **Headline:** "Showcase Your AI Skills. Compete. Get Noticed."
    *   **Sub-headline:** "Join challenges, build impactful AI solutions, and connect with innovative companies."
    *   **CTA Buttons:** Two prominent buttons for "I'm a Builder" and "I'm a Sponsor" user paths.

#### B.2.2. "How It Works" Section
*   **Layout:** Two-column grid showcasing value propositions.
*   **For Builders:** 
    *   Icon-based list of benefits: real-world challenges, portfolio building, industry recognition.
    *   CTA to "Explore Challenges".
*   **For Sponsors:** 
    *   Icon-based list of benefits: finding innovative solutions, accessing talent pool, discovering approaches.
    *   CTA to "Learn About Sponsoring".

#### B.2.3. Featured Challenges Section
*   **Layout:** Three-column grid of challenge cards.
*   **Challenge Card Components:** 
    *   Sponsor logo and name.
    *   Challenge title with appropriate truncation.
    *   Brief description (3 lines maximum).
    *   Tags for difficulty and category.
    *   Prize amount and deadline.
    *   "View Challenge" link.
*   **Section Header:** With "View All Challenges" link.

#### B.2.4. Final Call to Action
*   **Background:** Same gradient as hero for visual consistency.
*   **Content:** "Ready to Join EliteArena?" with brief description.
*   **CTAs:** Sign up buttons for both user roles.

### B.3. Visual Style
*   **Color Scheme:** Indigo and purple gradients for branded sections, white/light gray backgrounds for content sections.
*   **Card Design:** Clean white cards with subtle shadows and hover states.
*   **Imagery:** Minimal use of images, focusing on typography and layout.
*   **Iconography:** Simple, consistent icons to illustrate points.

### B.4. Mobile Responsiveness
*   **Stacking:** Elements stack vertically on smaller screens.
*   **Grid Adjustments:** Two-column features section becomes single column; three-column challenge grid becomes single column.
*   **Spacing:** Increased vertical spacing between stacked elements.
*   **Button Sizing:** Full-width buttons on mobile for easier tapping.

---

## Part C: Challenges Listing Page

### C.1. Overview & Objective
The Challenges page allows users to browse and discover all active challenges on EliteArena, with filtering options to find relevant opportunities.

### C.2. Page Structure & Essential Sections

#### C.2.1. Page Header
*   **Background:** Consistent gradient header with page title.
*   **Content:** "Explore AI Challenges" heading with brief descriptive text.

#### C.2.2. Filters
*   **Layout:** Right-aligned dropdown filters above the challenge grid.
*   **Filter Options:**
    *   **Category:** NLP, Computer Vision, Data Analysis, etc.
    *   **Difficulty:** Beginner, Intermediate, Advanced.
*   **Behavior:** Immediate filtering when selections change.
*   **Empty State:** Message when no challenges match filters with reset option.

#### C.2.3. Challenge Cards Grid
*   **Layout:** Responsive grid of challenge cards (3 columns on desktop, 2 on tablet, 1 on mobile).
*   **Card Design:** Consistent with Featured Challenges on Home Page.
    *   **Header:** Sponsor logo and name, challenge title.
    *   **Body:** Brief description, tags (difficulty, category, "Ending Soon" if applicable).
    *   **Footer:** Prize amount, deadline date, "View Challenge" link.
*   **Visual Cues:** Special styling for challenges ending soon.

### C.3. Visual Style
*   **Continuity:** Visual language consistent with Home Page.
*   **Focus:** Clean, scannable layout prioritizing challenge information.
*   **Interactive Elements:** Clear hover states for cards and filters.

### C.4. Mobile Responsiveness
*   **Filter Placement:** Filters stack vertically on mobile.
*   **Card Width:** Full-width cards on mobile for maximum readability.
*   **Touch Targets:** Appropriately sized interactive elements.

---

## Part D: Challenge Detail Page

### D.1. Overview & Objective
The Challenge Detail page provides comprehensive information about a specific challenge and accommodates a submission interface for authenticated Builders.

### D.2. Page Structure & Essential Sections

#### D.2.1. Navigation
*   **Back Link:** "Back to Challenges" to facilitate easy navigation.
*   **Header:** Consistent gradient header with challenge title and sponsor information.

#### D.2.2. Key Details Block
*   **Layout:** Three-column grid showing essential information.
*   **Content:**
    *   **Deadline:** Formatted date.
    *   **Prize:** Amount and any conditions.
    *   **Tags:** Difficulty, category, and status badges.

#### D.2.3. Tabbed Information
*   **Tab Interface:** Three tabs for organizing content.
    *   **Description:** Full challenge overview and context.
    *   **Requirements:** Technical specifications and evaluation criteria.
    *   **Resources:** Links to helpful materials (datasets, guidelines, etc.).
*   **Content Area:** Clean, well-formatted text with appropriate headings and lists.

#### D.2.4. Submission Area
*   **Container:** Right-column card for CTA.
*   **States:**
    *   **Guest/Not Logged In:** Login/Signup prompts.
    *   **Builder (Challenge Active):** "Submit Your Solution" button with deadline reminder.
    *   **Builder (Challenge Closed):** Status message with alternative suggestions.
    *   **Sponsor:** View-only state with submission statistics.

### D.3. Visual Style
*   **Layout:** Two-column layout (content and sidebar) on desktop.
*   **Typography:** Enhanced readability for detailed content.
*   **Content Organization:** Clear visual hierarchy with headings, lists, and spacing.

### D.4. Mobile Responsiveness
*   **Layout Changes:** Sidebar moves below main content on mobile.
*   **Tab Interface:** Maintains tab structure but with full-width tabs.
*   **Content Formatting:** Preserved hierarchy with adjusted spacing.

---

## Overall Cohesion & User Flow

### Design System Consistency
*   **Color Palette:** Consistent use of indigo and purple gradients for branded sections.
*   **Typography:** Hierarchical type system with consistent sizing across pages.
*   **Component Reuse:** Shared components like challenge cards, navigation, buttons.
*   **Spacing System:** Consistent padding and margins throughout the interface.

### User Journeys
1. **Guest Exploration Path:**
   * Home > Challenges List > Challenge Detail > Signup/Login prompt
   
2. **Builder Participation Path:**
   * Home > Challenges List > Challenge Detail > Submit Solution

3. **Sponsor Management Path:**
   * Home > Create Challenge (for sponsors) or Contact (for potential sponsors)

### Responsive Design Strategy
*   **Mobile-First Approach:** All components designed to work on small screens first.
*   **Breakpoints:** Consistent breakpoints applied across all pages.
*   **Navigation Adaptation:** Consistent mobile menu behavior throughout.
*   **Touch-Friendly:** All interactive elements sized appropriately for touch.

---

## Implementation Notes

The design prioritizes clarity, consistency, and user flow while maintaining a modern, professional aesthetic appropriate for a technical platform. All components are built with reusability and scalability in mind, allowing for future expansion while maintaining the established design language.

The visual hierarchy consistently guides users toward their primary actions, whether that's exploring challenges, submitting solutions, or creating new challenges. The responsive design ensures a seamless experience across all device types without compromising functionality or visual appeal.
