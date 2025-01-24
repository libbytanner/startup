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

## CSS Notes

Prefers id's over classes  
put a border around all elements (*) for debugging
