from googlevoice import Voice
from googlevoice.util import input
import cgi, cgitb, re

voice = Voice()
voice.login()

def py_send(number, message, phoneNumber, phonePattern):
    
    # Create instance of FieldStorage 
    form = cgi.FieldStorage() 

    # Get data from fields
    phoneNumber= form.getvalue('number')
    text = form.getvalue('message')

    phonePattern = re.compile(r'(\d{3})\D*(\d{3})\D*(\d{4})\D*(\d*)$')
    if(phonePattern.match(phoneNumber)
        voice.send_sms(phoneNumber, text)
    
   