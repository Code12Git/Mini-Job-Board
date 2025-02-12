
# Mini Job Board - Next.js 15 (App Router)

## Overview

This project is a Mini Job Board built using Next.js 15 (App Router). It integrates Server Actions for backend logic and uses Neon DB (PostgreSQL) for database management. The app is fully responsive, leveraging Tailwind CSS for styling and TypeScript for type safety. The UI is enhanced using the shadcn/ui library for faster development.

### Features

- Candidate Flow (/candidate)

- Job Listings Page (/candidate/jobs):

- Displays a list of job posts fetched from the backend.

- Includes search and filtering options (category, location, salary range).

- Job Details Page (/candidate/jobs/[id]):

- Shows detailed job information (title, description, company, etc.).

- Allows candidates to apply for the job.

- Apply Now Feature (/candidate/apply/[jobId]):

- A form to submit candidate details (name, email, resume link, cover letter).

- Uses Server Actions for form submission.

- Company Flow (/company)
- Job Dashboard (/company/jobs):

- Displays all job posts created by the company.

- Allows companies to manage job posts (edit, delete).

- Post a Job (/company/jobs/new):

- A form to create new job posts with fields like title, description, category, location, and salary range.

- Uses Server Actions for job submission.

- Manage Applications (/company/jobs/[id]/applications):

- Displays applications submitted for a specific job post.

### Tech Stack
Frontend:

- Next.js 15 (App Router)

- TypeScript

- Tailwind CSS

- shadcn/ui (UI Library)

Backend:

- Next.js Server Actions

- Neon DB (PostgreSQL)

- Prisma

Deployment:

- Vercel (Frontend + Backend APIs)

### Database Design

Tables
jobs Table:

- id (Primary Key)

- title (Job Title)

- description (Job Description)

- category (Job Category)

- location (Job Location)

- salary (Salary Range)

- type (Job Type: Full-time, Part-time, Remote, etc.)

- createdAt (Timestamp)

applications Table:

- id (Primary Key)

- jobId (Foreign Key referencing jobs.id)

- name (Candidate Name)

- email (Candidate Email)

- resumeLink (Link to Resume)

- coverLetter (Cover Letter)

- createdAt (Timestamp)

API Endpoints
Core API Endpoints (via Server Actions)
- POST /api/jobs

Create a new job post.

- GET /api/jobs

Fetch all job posts.

- GET /api/jobs/:id

Fetch job details by ID.

- POST /api/applications

Submit a job application.

### Setup Instructions

Prerequisites

- Node.js (v18 or higher)

- PostgreSQL (via Neon DB)

- Vercel CLI (for deployment)

### Steps

- Clone the Repository:


  ```
  git clone https://github.com/Code12Git/mini-job-board.git
  cd mini-job-board
  Install Dependencies:
  ```

- Install Package.json

  ```
  npm install

  ```

- Set Up Environment Variables:

- Create a .env file in the root directory and add the following:


  ```
  DATABASE_URL=your-neon-db-connection-string
  ```

- Run the Development Server:

  ```
  npm run dev
  ```

### Deploy to Vercel:


- Install Vercel CLI:


  ```
  npm install -g vercel
  Deploy the app:
  ```


- vercel
Candidate Flow

- Job Listings Page:
  Job Listings Page

- Job Details Page:
  Job Details Page

- Apply Now Form:
  Apply Now Form

Company Flow
- Job Dashboard:
  Job Dashboard

- Post a Job Form:
  Post a Job Form

- Manage Applications:
  Manage Applications

### Contributing
Contributions are welcome! Please follow these steps:

- Fork the repository.

- Create a new branch (git checkout -b feature/your-feature).

- Commit your changes (git commit -m 'Add some feature').

- Push to the branch (git push origin feature/your-feature).

- Open a pull request.

### License
This project is licensed under the MIT License. See the LICENSE file for details.

### Acknowledgments

- Next.js for the powerful framework.

- Neon DB for the PostgreSQL database.

- Tailwind CSS for the utility-first CSS framework.

- shadcn/ui for the UI components.

### Contact
- For any questions or feedback, feel free to reach out:

- Email: saxenasaksham46@gmail.com

- GitHub: Code12Git

### Roadmap

- Implement Candidate Flow.

- Implement Company Flow.

- Add authentication (optional).

- Add pagination for job listings.

- Enhance filtering and search functionality.

Thank you for checking out the Mini Job Board! 🚀
