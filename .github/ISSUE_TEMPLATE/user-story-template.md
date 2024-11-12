---
name: User Story template
about: This a user story template
title: ''
labels: user story
assignees: ''

---

# User Story Template

## Title Format
[User Story] As a [user type], I want to [action] so that [benefit]

## Description
### User Story
As a [user type]
I want to [action]
So that [benefit]

### Acceptance Criteria
- [ ] Criteria 1
- [ ] Criteria 2
- [ ] Criteria 3

### Requirements
- Functional Requirements:
  - FR1: [Requirement description]
  - FR2: [Requirement description]
  
- Non-Functional Requirements:
  - NFR1: [Requirement description]
  - NFR2: [Requirement description]

### Related Tasks
- [ ] Task 1 (#issue-number)
- [ ] Task 2 (#issue-number)

### Technical Notes
- Any technical considerations
- Architecture decisions
- Dependencies

### Definition of Done
- [ ] All acceptance criteria met
- [ ] Code reviewed
- [ ] Tests written and passing
- [ ] Documentation updated

---

# Example User Story

## Title
[User Story] As a registered user, I want to reset my password so that I can regain access to my account

## Description
### User Story
As a registered user
I want to reset my password
So that I can regain access to my account when I forget my password

### Acceptance Criteria
- [ ] User can initiate password reset from login page
- [ ] Reset link is sent to registered email
- [ ] Link expires after 24 hours
- [ ] New password must meet security requirements

### Requirements
- Functional Requirements:
  - FR1: System must send reset email within 1 minute
  - FR2: Password must be at least 8 characters long
  - FR3: Password must include special characters
  
- Non-Functional Requirements:
  - NFR1: Reset email delivery success rate > 99%
  - NFR2: Password reset process completes in < 3 minutes

### Related Tasks
- [ ] Create password reset UI (#123)
- [ ] Implement email service integration (#124)
- [ ] Add password validation logic (#125)
- [ ] Update API endpoints (#126)
