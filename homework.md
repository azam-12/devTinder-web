### DevTinder Web

- Create a vite + React application
- Remove unecessary code and create a hello world application
- Install Tailwind CSS 
- Install Daisy UI
- Add navbar component to App.jsx
- Create a Navbar.jsx separate component file
- Install react-router-dom
- Create BrowswerRouter > Routes > Route=/ Body > RouteChildren
- Create an outlet in your Body Component
- Create a Login Page
- Install axios
- CORS - install cors in backend => add middleware with configurations: origin, credentials: true
- Whenever you are making API call so pass axios => { withCredentials: true }  
- Install react-redux + @reduxjs/toolkit - https://redux-toolkit.js.org/tutorials/quick-start
- configureStore => Provider => createSlice => add reducer to store
- Add redux devtools in chrome
- Login and see if your data comes properly in the store
- Navbar should update as soon as user logs in
- Refactor our code to add constants file + create a components folder
- You should no be able to access other routes without login
- If token is not present redirect user to login page



Body 
    Navbar
    Route=/ => Feed
    Route=/login    => Login
    Route=/connections  => Connections
    Route=/profile  => Profile
