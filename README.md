## dependencies  
npm install
npm init -y (if no package.json)  
npm install express  
npm install express cors dotenv  


## running the api locally  
  node server.js  

## Docker Setup
  docker build -t *imagename* .  
  docker run -d -p *port:port* --name *imagename*

  **this config is made for supabase type of setup**
## .env format
  PORT=3000  
  DB_USER=postgres  
  DB_PASSWORD=**your supabase db password**  
  DB_HOST=db.**supabase_project_id**.supabase.co  
  DB_PORT=5432  
  DB_NAME=postgres  
  DATABASE_URL=postgresql://postgres:**supabase_db_password**@db.**supabase_project_id**.supabase.co:5432/postgres  
  SUPABASE_URL=https://**supabase_project_id**.supabase.co  
  SUPABASE_SERVICE_ROLE_KEY=**supabase_service_role_key**  