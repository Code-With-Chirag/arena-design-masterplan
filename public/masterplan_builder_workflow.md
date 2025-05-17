
# Masterplan: EliteArena - Builder Workflow

## Part A: Builder Dashboard

### A.1. Overview & Objective
The Builder Dashboard is the primary landing spot for authenticated Builders. It should provide a quick, personalized overview of their engagement with EliteArena, focusing on active challenges and recent activity for the MVP.

### A.2. Page Structure & Essential Sections (MVP)
*   **Page Title:** e.g., "Welcome back, [Builder Name]!" or "Your Dashboard"
*   **(Global Navigation Bar will be present)**

#### A.2.1. Overview Panel / Key Stats (Simplified for MVP)
*   **Objective:** At-a-glance summary.
*   **Content Ideas (Choose 2-3 for MVP):**
    *   `Current Level / XP (Placeholder):` Display "Level 1" or basic XP count (e.g., "0 XP"). This sets the stage for the future Level-Up system, even if non-functional in MVP.
    *   `Active Challenges Count:` Number of challenges the builder is currently (conceptually) "participating in" or has shown interest in. *MVP simplification: This might just be a static prompt like "Find Your Next Challenge!" if tracking active participation isn't built yet.*
    *   `Recent Submissions Count:` Number of submissions made in the last X days/weeks, or total submissions.

#### A.2.2. "Active Challenges" Section (Simplified)
*   **Objective:** Quick links to challenges they might be working on or interested in.
*   **Content (MVP):**
    *   If direct tracking of "joined" challenges isn't in MVP: A prominent CTA like `[ Explore Active Challenges ]` linking to the Challenges Listing Page.
    *   *Future: A list/cards of challenges the builder has explicitly joined or started working on.*

#### A.2.3. "Recent Submissions" Snippet
*   **Objective:** Quick access to their latest submissions.
*   **Layout:** A short list (2-3 items).
*   **Content (per item):**
    *   Challenge Title (linked to the Challenge Detail Page or their submission detail on "My Submissions" page)
    *   Submission Date
    *   Status (e.g., "Submitted," "Under Review")
*   **CTA:** `[ View All Submissions ]` (Links to the My Submissions Page)

### A.3. Visual Style & UX
*   **Feel:** Motivating, organized, personalized.
*   **Data Visualization (Minimal for MVP):** Simple numerical stats. Avoid complex charts for now.
*   Clear CTAs for primary actions (exploring challenges, viewing submissions).

### A.4. Mobile Responsiveness
*   Sections stack cleanly. Key information remains prominent. Easy navigation.

---

## Part B: Submit Solution Form/Section

### B.1. Overview & Objective
This is the form/interface used by a Builder to submit their solution to a specific, open challenge. It's typically accessed from the "Challenge Detail Page." The design must be clear, guide the user through the required inputs, and confirm submission.

### B.2. Context
*   This form appears when a Builder clicks "Submit Your Solution" on an open Challenge Detail Page.
*   The Challenge Title should be clearly visible (e.g., "Submitting to: [Challenge Title]").

### B.3. Form Structure & Essential Fields (MVP)
*   **Section Title:** e.g., "Submit Your Solution for [Challenge Title]"
*   **Input Fields:**
    *   `Project Link (Required):` (URL input)
        *   Helper text: "e.g., Link to your GitHub repository, Google Drive folder, etc."
    *   `Pitch Deck Link (Optional for MVP):` (URL input)
        *   Helper text: "e.g., Link to your Google Slides, Canva presentation, PDF."
    *   `Demo Video Link (Optional for MVP):` (URL input)
        *   Helper text: "e.g., Link to your YouTube, Vimeo, Loom video."
    *   `Notes for Sponsor (Optional):` (Textarea)
        *   Helper text: "Any additional information or comments for the sponsor reviewing your submission."
*   **Submission Guidelines / Checklist (Briefly display or link to):**
    *   Remind users of key requirements if possible (e.g., "Ensure your repository is public or you've granted access."). For MVP, this can be static text.
*   **Submit Button:** `[ Submit Solution ]` (Disabled until required fields are valid).
*   **Cancel/Back Button:** `[ Cancel ]` or `[ Back to Challenge ]` (Returns to Challenge Detail Page).

### B.4. Post-Submission Feedback
*   **Success Message:** Upon successful submission:
    *   Clear confirmation: e.g., "Your solution has been submitted successfully!"
    *   Information: "You can view your submission status on your 'My Submissions' page."
    *   CTA: `[ View My Submissions ]` or `[ Back to Challenge Details ]`.
*   **Error Message:** If submission fails, provide a clear error message.

### B.5. Visual Style & UX
*   **Feel:** Clear, focused, trustworthy. Minimize distractions during submission.
*   **Guidance:** Helper text for each field is important.
*   **Validation:** Inline validation for URL formats, required fields.
*   **Progress (Implied):** The act of filling the form is progress. For MVP, no complex multi-step wizard needed.

### B.6. Mobile Responsiveness
*   Form fields are easily accessible and fillable. Helper text is readable. Buttons are tappable.

---

## Part C: My Submissions Page (Builder's View)

### C.1. Overview & Objective
Allow Builders to view a comprehensive list of all their submissions (to various challenges), track their status, and potentially access details of their submission or the original challenge.

### C.2. Page Structure & Essential Elements
*   **Page Title:** e.g., "My Submissions"
*   **(Global Navigation Bar will be present)**

#### C.2.1. Filters/Sorting (Optional for MVP, but useful)
*   `Filter by Status:` (Dropdown: Submitted, Under Review, Evaluated, Awarded - if statuses are well-defined)
*   `Sort by:` (Date Submitted, Challenge Name)
*   *For MVP, a simple chronological list (newest first) is acceptable.*

#### C.2.2. Submissions List/Table
*   **Layout:** Each submission as a row in a table or a distinct card in a list.
*   **Columns/Information per Submission:**
    *   `Challenge Title:` (Linked to the original Challenge Detail Page)
    *   `Submitted On:` (Date/Time)
    *   `Status:` (e.g., "Submitted," "Under Review," "Evaluated," "Winner," "Feedback Available") - Visually distinct tags/badges for status are good.
    *   `Project Link:` (Display the link they submitted)
    *   `Actions (Optional for MVP):`
        *   `View Details:` (Could link to a read-only view of their submission form, or back to the challenge)
        *   *(Future: `Edit Submission` - if allowed before a deadline, `Withdraw Submission`)*

#### C.2.3. Empty State
*   If the builder has no submissions yet:
    *   Message: e.g., "You haven't made any submissions yet."
    *   CTA: `[ Explore Challenges to Get Started ]` (Links to Challenges Listing Page).

### C.3. Visual Style & UX
*   **Feel:** Informative, organized, empowering.
*   **Clarity:** Easy to scan and find specific submissions. Statuses should be immediately obvious.
*   Use of table structure or well-defined cards for readability.

### C.4. Mobile Responsiveness
*   Table columns may need to be condensed or re-stacked for smaller screens. Cards should stack vertically. Ensure all key information is accessible.

---

**Overall Cohesion & User Flow:**
Ensure a seamless visual and interactive experience for the Builder. From the Dashboard, they should easily navigate to submit a solution (via a Challenge Detail page) and then track it on their "My Submissions" page. The visual language should be consistent.

**Final Check:**
Does this masterplan provide a clear and comprehensive blueprint for the core Builder Workflow in EliteArena? Are the needs of the Builder user addressed effectively for these components?
