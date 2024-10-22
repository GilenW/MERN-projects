the architecture aligns with a MERN (MongoDB, Express, React, Node.js) stack. The project is divided into three main components: frontend, backend, and database layer. The middleware is used to secure routes and protect sensitive data.
Project Architecture Overview

1. Directory Structure Overview

The project is divided into multiple components:

	•	Frontend: Located under platform/backend/frontend/. Uses React for the client-side interface and Redux for state management.
	•	Backend: Located under platform/backend/. Built with Node.js and Express.js, which exposes RESTful APIs.
	•	Database Layer: Uses MongoDB for storing user, post, and profile information.
	•	Middleware: Contains authentication middleware to secure routes (auth.js).

2. Detailed Layer Breakdown

Frontend (React + Redux)

Location: platform/backend/frontend/

	•	src/actions: Contains Redux action creators for features like auth, posts, profile, and alert.
	•	src/components: Contains UI components divided into logical modules:
	•	auth: Login and Register forms.
	•	dashboard: Dashboard to display user profiles and experience.
	•	post and posts: Manage individual posts and the posts listing.
	•	profile-forms: Forms to add or edit profiles and experiences.
	•	profiles: Display a list of profiles and profile details.
	•	layout: Navbar, landing page, and alert components.
	•	src/reducers: Reducers that update Redux store state.
	•	src/store.js: Configures the Redux store.
	•	PrivateRoute.js: Protects private routes based on authentication status.

Backend (Express + Node.js)

Location: platform/backend/

	•	routes/api: Defines REST API endpoints for:
	•	auth.js: Authentication and login.
	•	posts.js: CRUD operations for posts.
	•	profile.js: User profiles and experience.
	•	users.js: User registration.
	•	models/: Mongoose schemas for User, Post, and Profile.
	•	middleware/auth.js: Verifies JWT tokens for protected routes.
	•	config/db.js: Connects the application to MongoDB.
	•	server.js: Entry point for the backend server.

3. API Flow

	•	Authentication: Login and token generation using JWT.
	•	Route: POST /api/auth
	•	Middleware: Secures routes with auth.js.
	•	Post Management: Users can create, delete, like, and comment on posts.
	•	Route Example: POST /api/posts
	•	Reducer Action: Updates state with GET_POSTS, ADD_POST, etc.
	•	Profile Management: Users can create or edit their profiles, and list other users’ profiles.
	•	Route Example: GET /api/profile/me

4. Data Flow Example

	1.	User logs in via the Login component.
	2.	Redux action (login) dispatches an API call to /api/auth.
	3.	Backend responds with a JWT token stored in localStorage.
	4.	Subsequent API requests include the JWT token in headers.
	5.	Redux reducers update the global state, reflecting the user’s login status and data.


