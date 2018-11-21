from pygments.lexers import JavascriptLexer
from pygments import lex
from pygments.token import Token
from pygments.token import String, string_to_tokentype

lexer = JavascriptLexer()

#File
filepath = 't.js'

#File open
fp = open(filepath).read()

#Code insertion
tokens = lex(fp, lexer)
code = []
for x in tokens:
    code.append(x)


def menu():
        print('\n--------- Crawler JS ---------\n')
        print('Press (1,2,3,4,5,6,7,8) to choose\n')
        print('1. Functions\n2. Variables \n3. Reserved Keywords\n4. Builtin \n5. Operators \n6. Constants \n7. Literals \n8. Full Lexer File ')
        x = input("> ")

        if x == '1':
        elif x == '2':
        elif x == '3':
        elif x == '4':
        elif x == '5':
        elif x == '6':
        elif x == '7':
        elif x == '8':
                Lexerfile()
        else:
                print("Error, please enter a valid number. \n")
                menu()


def Lexerfile():
        '''print("------------------------------------ CoffeeScriptLexer -------------------------------\n")
        print(list(JavascriptLexer().get_tokens(code)))
        print("\n-----------------------------------------------------------\n")
        print(list(JavascriptLexer().get_tokens_unprocessed(code[:5])))
        print(code)'''

#------------------------------------ CoffeeScriptLexer // Por atributo ----------------------------------------------------

#Imprimir el atibuto según el Token

def getVars():
        cont = 0
        cont2=0
        print('\n ------------------- variables definidas por var --------------------\n')
        for i in code:
                if i[1] == 'var':
                        print(code[cont+2][1])
                cont += 1
        print("\n")
        print('\n ------------------- variables definidas por Let --------------------\n')
        for j in code: 
                if j[1] == 'let':
                        print(code[cont2+2][1])
                cont2 += 1
        print("\n")


                



menu()


#print(code)
#formatter = HtmlFormatter(full=True, linenos=True)


#print("------------------------------------ JavascriptLexer -------------------------------\n")
#print(list(JavascriptLexer().get_tokens(code)))
#print("-------------------------------- TypeScriptLexer -----------------------------------\n")
#print(list(TypeScriptLexer().get_tokens(code)))
#print("---------------------------------- ObjectiveJLexer ---------------------------------\n")
#print(list(ObjectiveJLexer().get_tokens(code)))

#file2 = open("save.html", "w")

#file2.write(code)

#http://pygments.org/docs/tokens/
