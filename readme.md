## API Routes: 

1. /api/users:  
    * /:id (get) – get user data by user id  
    * /:id (put) (requires token) – edit user data by id
    *  /:id (delete) (requires token) – delete user by id
    * /register (post) – add a user  
    * /login  (post): – get token
```
for /register and /login, the user data must be in the request body, in the form:   
{   
“email”: “example@something.com”,  
“password”: “password”  
}    
```

```
/login and /register send back a token in the response headers, in a field called ‘token’
```
     
```     
the token must always be sent in the 'authorization' field in the headers as such: req.headers.authorization
```
2. /api/entries:

    * / (get) (requires token) – get all entries of the logged in user   
    * /:id (get) (requires token) – get a single entry by its id   
    * /:id (delete) (requires token) – delete an entry by its id  
­  
    * / (post) (requires token) – add an entry  
    * /:id (put) (requires token) – edit an existing entry  

```
for post and put, the entry data must be sent in the request body, in the form:  
{  
	"url": "https://www.youtube.com/watch?v=O0MxA9xi_Vk",  
	“time”: 45,  
	“title”: “some title”,  
	"notes": "33333"  
}
```

