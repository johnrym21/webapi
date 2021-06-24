# webapi

the idea behind this project is to connect 2 systems and to be able to communicate with each other

the api receives a request with a json object that has an 64-bytes based image and sends it to a robot called abbyy using it's APIs to do an OCR on the image and callect the data from it

then the robot creates a .json object with the results after the process is finished the code will collect the .json object using FTP and sends it back.

Using a defferent route the code will check if a previous .json object was created and will get the answer from the robot to avoid license usage.
