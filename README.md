# React Review - Using Fetch to Post (and also, what is CORS again?)

  Let's use the cocktail API from the React Boozer lab to practice making a post request from a React app, and to review how the CORS set up in the API allows us to make this post.

## What does CORS allow us to do?

  In Rails, we used active record to grab data from a database and render the information in a template view. With React, our database and views are decoupled, so we must use fetch requests to get and post data stored in our API.

  For security reasons, requests to our API made from outside its domain must get special permission in order to respond. CORS, or Cross-Origin Resource Sharing, allows these resources to be accessed from an outside domain. The cocktails API we are using allows get and post requests from all (AKA ```*```) origins.

  This is enabled in the API's cors.rb file:

```ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```

Basically, if a fetch request is made, the resource being accessed must approve of the request in order for it to happen. The cocktail API approves of all get and post requests.

## Building a fetch request

  1. A get or post fetch request always contains the argument of a path of the resource to fetch.

  ```javascript
  fetch('http://localhost:3000/api/v1/cocktails')
  ```

  2. To make a **post** request, we must include a second argument in the fetch, which allows us to make the customizations we need to successfully post, including the new cocktail data we'd like to add to our API. This second argument, also known as the init object, has many different customizations. See <a href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch">MDN</a> for a full list. Here are the options we are applying to our cocktail request:

    - Method is the type of request we are making. In this case, it's a post request, since we're sending data from a form to create a new cocktail in the backend.
    - Headers should be an object. Here, 'content' is the type of data being sent from frontend to our api, which in this case is json. 'Accept' specifies the media type that we accept to be returned on a successful response.
    - Body is a stringified version of an object. The object has been formatted to have the name of our new resource, cocktail, pointing to another object, which contains the cocktail's name and description.
```javascript
fetch('http://localhost:3000/api/v1/cocktails', {
  method: "POST",
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify( {cocktail: this.state} )
})
```

This fetch request will return a promise. (And a successful response!) From there we can parse json from our response data and access our key/value pairs just like we are using a normal JavaScript object.
```javascript
fetch('http://localhost:3000/api/v1/cocktails', {
  method: "POST",
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify( {cocktail: this.state} )
})
.then(res => res.json())
.then(data => console.log(data))
```
Of course, for this fetch request to work, our Rails API must be set up to create a new cocktail when it receives a post request to '/cocktails.' We must grab the cocktail params in our API, create a new cocktail, and in this case, we're rendering json of the freshly crafted cocktail!

<img src='/public/successful_post.png' />


