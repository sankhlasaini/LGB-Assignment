# LBG-Assignment

NODE VERSION : 8.12.0

Steps to Run the Code

# Install dependency
- command:  npm install

# Start the server
- command:  node server

# REST API's can be accessed on localhost:3001/

 GET  : /getProduct
 
 This will take 2 Query Params and retrun concatination of params.
 
 POST : /uploadFile

 This will take File as request and save to into /storage folder.
 
 GET : /getNonRepeatingChar

 This will take 1 Query Param as String and retrun First Non Repeating Char of given String.
 
 GET : /webCrawler
 
 This will take 1 Query Param as WEB URL type String and retrun List of URL's and Images.
 
 # For File Output
 readFile() Function will read the file Given and Display its Result(A dummy file is available in storage 'wc.txt')
 
 # Testing
 test.js has been included for Test Cases using mocha and chai
 - command:  npm Test
