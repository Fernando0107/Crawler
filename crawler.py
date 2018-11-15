from pygments import highlight
from pygments.lexers import JavascriptLexer
from pygments.formatters import HtmlFormatter
#from pygments.lexers import guess_lexer, guess_lexer_for_filename #Guess lexers
#from pygments.lexers import (get_lexer_by_name, get_lexer_for_filename, get_lexer_for_mimetype)  # look up

#File
filepath = 'ex.js'

#File open 
fp = open(filepath) 
lines = fp.readlines()

#Code insertion
code = ''
for i in lines:
    code = code + i
#print(code)
formatter = HtmlFormatter(full=True, linenos=True)

print (list(JavascriptLexer().get_tokens(code)))

#file2 = open("save.html", "w")

#file2.write(code)

