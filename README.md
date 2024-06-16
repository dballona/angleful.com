createdb boilerplate_development
psql -d angleful_development -a -f db/seed.sql

# Features I need to implement


1. Set up flow:
- Start with sign up (email + password or LinkedIn);
Offer manual or import from Linkedin: 

Manual:
- Profile information (first name, last name, city, country, contact details);
- Work experience (title, company, start/end years);
- Education (University and degree);

LinkedIn:
- Search by profile (name + company or username)
- Review each section (Profile info, Work experience, education)


# Benchmarks

## Standard Resume (set up)
- Work (Just title and company)
- Education (Just school and degree)
- About (First name, last name, Summary)
- Profile


LinkedIn search by profile (name + company or username) is pretty cool

Review score is also pretty cool (ranging from A to D):
- Impact: Impact optimizes your resume to stand out. It helps you balance how much to include and how to write clearly and convincingly.
- Completeness: Employers expect your resume to include the degree of each item in your education section.