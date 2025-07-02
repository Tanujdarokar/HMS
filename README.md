# HMS
SE Project
Smart Cancer Treatment and Tracking Software: Software 
Documentation 
1. Context: 
Cancer remains one of the leading causes of death globally. Managing and tracking 
cancer treatment manually can lead to missed appointments, incorrect medication 
doses, and uncoordinated care. This software project addresses the need for an 
intelligent, digital system to manage patient data, diagnosis details, treatment plans, 
doctor notes, and test reports for improved cancer care outcomes. The system will be 
used by hospitals, oncologists, nurses, and patients to streamline cancer treatment 
management.


3. Information: 
The software stores and manages data related to: 
• Patient profiles (personal and medical data) 
• Diagnosis records (cancer type, stage, and test results) 
• Treatment plans (chemo, surgery, radiation) 
• Doctor round notes and reports 
• Medication reminders and notifications 
• Billing and insurance details 
• Role-based access: doctors, nurses, patients, and admin 
It uses MongoDB for database storage, Node.js + Express.js for backend services, and 
HTML/CSS/JavaScript for the frontend interface.


5. Objectives: 
• Provide a digital cancer treatment tracking platform 
• Improve coordination between medical staff and patients 
• Maintain centralized records with easy access 
• Send automated alerts/reminders for medicine and checkups 
• Enable role-based access to ensure data privacy 
• Offer a scalable structure for AI features in the future 
6. Functions: 
• Secure user login with role-based dashboards 
• Add/view/edit/delete patient records 
• Upload diagnostic reports and access them 
• Assign and track treatment plans 
• Doctors record notes during ward rounds 
• Generate bills and payment reports 
• Notify patients about medication and appointments


7. Performance: 
• Backend handles multiple requests using Express.js efficiently 
• Database optimized with indexes for faster queries 
• Secure API design using JWT for authentication 
• Responsive frontend interface for all screen sizes 
• Asynchronous operations prevent UI blocking 
• Designed for future scaling with cloud compatibility

 
8. Problem Decomposition: 
• Frontend: Form handling, page routing, UI for dashboard and records 
• Backend API: CRUD operations for patients, diagnosis, treatments, and users 
• Authentication: User roles, login tokens, protected routes 
• Database Models: Mongoose schemas for patients, doctors, treatments, 
reports 
• Notifications: Trigger-based alert system using date fields 
• Billing Module: Calculates based on treatments, stay duration, and services 
• File Uploads: Handles storing and retrieving diagnostic files 
This document outlines the complete technical and functional breakdown of the Smart 
Cancer Treatment and Tracking Software to assist in development, demonstration, and 
future enhancement planning. 
