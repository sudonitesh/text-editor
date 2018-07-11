# text-editor
A hosted text-editor that can be used to share the typed text through url and get html code from the typed text. 

# To Develop 
<pre>
  $ npm i
  $ nodemon
  <p>connect using a driver via the standard MongoDB URI of your own from mlab or use locally</p>
        -> app.js file
        line:18 -> var db = require('monk')(process.env.MONGODB_URI || 'mongodb://<dbuser>:<dbpassword>@ds129321.mlab.com:29321/collection-name');
        
        ->router/editor.js file
        line:5 -> var db = require('monk')('mongodb://<dbuser>:<dbpassword>@ds129321.mlab.com:29321/collection-name');      

        

</pre>

# To use Live 
<pre>
Go to: https://warm-island-53824.herokuapp.com/
    
    -> To get Source Code of the text typed, click on "Source" button.
    -> To share the text through URL, click on "Get Link" and "Copy to Clipboard" on Redirected page. 
        You can send the Copied URL to anyone with the same formatting... 
</pre>
