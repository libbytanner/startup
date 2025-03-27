# CS 260 Notes

[My startup](http://soundscope.click)

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## AWS Notes

I think it is super useful that you can enter * as the record name when creating a record so any subdomain will route to where you want it to. 

AWS -- IP Address  

Route 53 -- Through AWS, but where you lease a domain name.  

To enable HTTPS and allow a secure a connection, use Caddy to :80 and yourdomainname to your domain name

Use commands:
-shells into production environment server  
`ssh -i [key pair file] ubuntu@[domainname]`  
-Edit Caddy's configuration  
`cd ~`,
`vi Caddyfile`

## HTML Notes
class notes:  
Structural language -- used for accessibility, so make sure you use it properly

The head does not get rendered - the body does

HTML is like a tree -- body and head are different nodes  

Prefer relative over absolute links  

div -- division  
span -- inline division  

Characters & entities -- to render an &, use &amp, ' &apos  
Input -- form element.

delivereable notes:  
`<link rel="icon" href="icon.ico">`  
From what I'm aware, this is supposed to enable you to change the icon that appears on the tab with your website, but I couldn't quite get it to work. 

`<hr>` and `<br>` can help create structure visually when still in the HTML phase  

I've found it kind of hard to focus solely on the structure, but I think it helped to try to think of doing everything vertically. 

## CSS Notes

Prefers id's over classes  
put a border around all elements (*) for debugging

Classes are really useful when you want several objects to have the same properties.  

Justify is used when you are working with a flex or grid element. This took me a while to figure out for some reason. 

To override set colors from a bootstrap element, just put !important next to the declaration in your css. Cool!  

@media to create media queries, which make your app responsive, change the layout for different screen sizes.  

I really played around with using flex elements, they are very powerful for achieving the desired design.  

## React Notes

Helps consolidate code in a way, less duplicated code. It is very helpful in cleaning up the directory.  

Adding routing is also super helpful, it is so cool that you can turn it into a single page app so simply. 

It is helpful to remember that React creates a table of states, and React's job is to change and update the states. 

Login functionality -- create a js authorization state class, then just write functions line "onLogin" and "onLogout" in which you change the authorization state, which then routes to a different page.  

Hooks manage state-- with hooks you can change the state of different components  
Per my understanding, useState allows you to set and change the state, and useEffect allows you to run a function when the state changes. By default, useEffect runs every time the component is rendered, but you can declare when to run it.  
Note from cs260 GitHub: "Hooks must be called at the top scope of the function and cannot be called inside of a loop or conditional. This restriction ensures that hooks are always called in the same order when a component is rendered"  

## Service Notes  

Dubug backend in vscode, frontend in browser.  

I never knew how authentication works. First, when creating or verifying a user, you find if there is a user with the provided username and password, and the stored password is an encrypted version, and it is encrypted using hashing. I find the security aspect of this pretty interesting. The user is then generated a token, which is stored in a cookie, which will authorize them to access the rest of the app.   

I figured out that with data you want to keep from the client side, you can put it in a .env file, and import the values. If you put the .env into gitignore, they won't be pushed to Github. I still am not quite sure how to keep it completely hidden from the frontend.  
-- i figured this out. Store them in the database!!  

Backend service and Frontend are separate files. The frontend makes calls to the backend, which can also make calls to third party endpoints. You can also call third party endpoints from the frontend. 


MAILINATOR  

## Database Notes  

There are different database services that do different things, MongoDB stores objects as JSON.  

Query database in a separate file, then call those functions from your service endpoints. 

To query the database, use filters like $lt, $gte, etc. You can find, insert, and update JSON objects within the database. 

Its pretty easy to switch from memory to database, MongoDB is easy to use. 

## WebSocket Notes

Not necessarily websocket but I'm just realizing this. You can have a state variable in your parent component, and then to change it in a child component, pass in a function that changes it as a prop.  

WebSocket Model: With HTTP, you have a user on a browser and a server, the user sends requests to the server, and the server sends a response (if all goes well). With WebSocket, you can enable real-time communication between different users, you upgrade the protocol? 

Set up websocket to listen for messages, when you get a message, recieveMessage,

A handler is essentially a function you want run in the case of a new message (in the simon example)